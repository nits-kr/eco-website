import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../Sidebar";
// import Spinner from "../Spinner";
import {
  useCatogaryStatusMutation,
  useCreateBrandMutation,
  useGetBrandListMutation,
  useGetBrandListQuery,
  useGetCategoryListQuery,
  useGetSelectCategoryListQuery,
} from "../../services/Post";
import { useDeleteCategoryListMutation } from "../../services/Post";
import { useDeleteBrabdListMutation } from "../../services/Post";
import { useUpdateBrandMutation } from "../../services/Post";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

function BrandManagement(props) {
  const [loader, setLoader] = useState(false);

  const ecomAdmintoken = useSelector((data) => data?.local?.token);

  // const { data: brandListdata, refetch: refetchbrandList } =
  //   useGetBrandListQuery({
  //     ecomAdmintoken,
  //   });

  const [brandListdata] = useGetBrandListMutation();

  const { data: categoryListdata, refetch: fetchcategoryListData } =
    useGetSelectCategoryListQuery({
      ecomAdmintoken,
    });
  const [files, setFiles] = useState();
  const [addBrand] = useCreateBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");

  const [deleteBrand] = useDeleteBrabdListMutation();

  const [categories, setCategories] = useState([]);

  const [brandListData, setbrandListData] = useState([]);

  console.log("brandListData", brandListData);

  const [id1, setId1] = useState([]);
  localStorage?.setItem("brandId", id1);
  console.log(id1);
  const [formData, setFormData] = useState({
    uploadImage: null,
  });

  const [formData1, setFormData1] = useState({
    pic: files?.editImage,
  });

  const [category, setCategory] = useState({
    nameEn1: "",
    nameAr1: "",
    uploadImage1: null,
  });

  const handleInputChange1 = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  console.log("formData", formData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset: reset2,
  } = useForm();
  console.log(category?.uploadImage1);
  const handleUpdateBrand = async (data) => {
    const formData = new FormData();
    formData.append("brandName_en", data.editCatename_en);
    formData.append("brandName_ar", data.editCatename_ar);
    if (formData1.pic) {
      formData.append("brandPic", formData1.pic);
    }

    formData.append("category_Id", data.categoryId1);

    setLoader(true);

    const res = await updateBrand({ formData, id1, ecomAdmintoken });

    setLoader(false);
    Swal.fire({
      title: "Updated!",
      text: "Your have been updated the list successfully.",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        handleBrandList();

        document.getElementById("closebrandmodal").click();
      }
    });
  };

  useEffect(() => {
    if (categoryListdata) {
      setCategories(categoryListdata?.results?.categoryData);
    }
  }, [categoryListdata]);

  const [brand, setBrand] = useState({
    columns: [
      {
        label: "S.NO.",
        field: "sn",
        sort: "asc",
        width: 150,
      },

      {
        label: "BRAND (EN)",
        field: "brandEn",
        sort: "asc",
        width: 150,
      },

      {
        label: "BRAND (AR)",
        field: "brandAr",
        sort: "asc",
        width: 100,
      },
      {
        label: "CATEGORY",
        field: "cate",
        sort: "asc",
        width: 150,
      },

      {
        label: "Media",
        field: "pic",
        sort: "asc",
        width: 100,
      },

      {
        label: "ACTION",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [],
  });

  useEffect(() => {
    if (ecomAdmintoken) {
      handleBrandList();
    }
  }, [ecomAdmintoken, searchQuery, startDate1]);

  const handleBrandList = async () => {
    const data = {
      from: startDate1,
      search: searchQuery,
      ecomAdmintoken: ecomAdmintoken,
    };
    const res = await brandListdata(data);
    console.log("res brand cate", res);
    setbrandListData(res?.data?.results?.list);
  };

  useEffect(() => {
    if (brandListData?.length > 0) {
      const newRows = [];

      brandListData?.map((list, index) => {
        const returnData = {};
        returnData.sn = index + 1 + ".";
        returnData.cate = list?.category_Id?.categoryName_en;
        returnData.brandEn = list?.brandName_en;
        returnData.brandAr = list?.brandName_ar;
        returnData.pic = (
          <div className="">
            <img className="table_img" src={list?.brandPic} alt="" />
          </div>
        );

        returnData.action = (
          <>
            <Link
              data-bs-toggle="modal"
              data-bs-target="#staticBackdropeditBrand"
              className="comman_btn2 table_viewbtn me-2"
              to=""
              onClick={() => {
                handleUpdate(list);
                setId1(list?._id);
              }}
            >
              Edit
            </Link>
            <Link
              className="comman_btn2 table_viewbtn"
              to="#"
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteBrand({
                      categoryId: list?._id,
                      ecomAdmintoken,
                    });
                    Swal.fire(
                      "Deleted!",
                      `${list?.brandName_en} item has been deleted.`,
                      "success"
                    ).then(() => {
                      setTimeout(() => {
                        handleBrandList();
                        toast.success("Item Deleted!");
                      }, 500);
                    });
                  }
                });
              }}
            >
              Delete
            </Link>
          </>
        );
        newRows.push(returnData);
      });
      setBrand({ ...brand, rows: newRows });
    }
  }, [brandListData]);

  const handleFileChange = (event) => {
    setFormData({ ...formData, uploadImage: event.target.files[0] });
    console.log("picture", event.target.files[0]);
  };

  const onFileSelection = (e, key) => {
    setFiles({ ...files, [key]: URL.createObjectURL(e.target.files[0]) });
    setFormData1({ ...formData1, pic: e?.target?.files[0] });
  };
  const handleBrandSubmit = async (data) => {
    try {
      const alldata = new FormData();
      alldata.append("category_Id", data.categoryId);
      alldata.append("brandName_en", data.brandEn);
      alldata.append("brandName_ar", data.brandAr);
      alldata.append("brandPic", formData?.uploadImage);

      setLoader(true);

      const response = await addBrand({ alldata, ecomAdmintoken });

      setLoader(false);

      console.log(response);
      if (!response.data.error) {
        Swal.fire({
          icon: "success",
          title: "Changes Saved",
          text: "The Brand has been added successfully.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            handleBrandList();
          }
        });
        // handleSave();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (item) => {
    reset2({
      editCatename_en: item?.brandName_en,
      editCatename_ar: item?.brandName_ar,
    });
    setFiles({ editImage: item?.brandPic });
  };

  return (
    <>
      {loading}
      <Sidebar Dash={"brand-management"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row category-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Brand Management</h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 px-0">
                        <div className="tab-content" id="nav-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="nav-home"
                            role="tabpanel"
                            aria-labelledby="nav-home-tab"
                          >
                            <div className="row p-4 mx-0">
                              <div className="col-12 mb-4 inner_design_comman border">
                                <div className="row comman_header justify-content-between">
                                  <div className="col-auto">
                                    <h2>Add New Brand</h2>
                                  </div>
                                </div>
                                <form
                                  className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                                  onSubmit={handleSubmit(handleBrandSubmit)}
                                >
                                  <div className="form-group mb-0 col-6">
                                    <label htmlFor="categoryId">
                                      Select Category
                                    </label>
                                    <select
                                      className={classNames("form-control", {
                                        "is-invalid": errors.categoryId,
                                      })}
                                      multiple=""
                                      name="categoryId"
                                      id="categoryId"
                                      // value={subCategory.categoryId}
                                      // onChange={handleInputChange2}
                                      {...register("categoryId", {
                                        required: "Please Select Category*",
                                      })}
                                    >
                                      <option value="">Select Category</option>
                                      {Array.isArray(categories) &&
                                        categories.map((category) => (
                                          <option
                                            key={category._id}
                                            value={category._id}
                                          >
                                            {category.categoryName_en}
                                          </option>
                                        ))}
                                    </select>
                                    {errors.categoryId && (
                                      <small className="errorText mx-1 fw-bold text-danger">
                                        {errors.categoryId?.message}
                                      </small>
                                    )}
                                  </div>
                                  <div className="form-group mb-0 col-6">
                                    <label htmlFor="brandEn">
                                      Enter Brand Name (En)
                                      <span className="required-field text-danger">
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      // className="form-control"
                                      name="brandEn"
                                      id="brandEn"
                                      // value={formData.nameEn}
                                      // onChange={handleInputChange}
                                      // required
                                      // minLength="2"
                                      className={classNames("form-control", {
                                        "is-invalid": errors.brandEn,
                                      })}
                                      {...register("brandEn", {
                                        required: "Brand (En) is required!",
                                        pattern: {
                                          value:
                                            /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/,
                                          message:
                                            "Special Character not allowed!",
                                        },

                                        maxLength: {
                                          value: 100,
                                          message:
                                            "Max length is 100 characters!",
                                        },
                                      })}
                                    />
                                    {errors.brandEn && (
                                      <small className="errorText mx-1 fw-bold text-danger">
                                        {errors.brandEn.message}*
                                      </small>
                                    )}
                                  </div>
                                  <div className="form-group mb-0 mt-3 col">
                                    <label htmlFor="brandAr">
                                      Enter Brand Name (Ar)
                                      <span className="required-field text-danger">
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      // className="form-control"
                                      name="brandAr"
                                      id="brandAr"
                                      className={classNames("form-control", {
                                        "is-invalid": errors.brandAr,
                                      })}
                                      {...register("brandAr", {
                                        required: "Brand (Ar) is required!",
                                        pattern: {
                                          value:
                                            /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/,
                                          message:
                                            "Special Character not allowed!",
                                        },

                                        maxLength: {
                                          value: 100,
                                          message:
                                            "Max length is 100 characters!",
                                        },
                                      })}
                                    />
                                    {errors.brandAr && (
                                      <small className="errorText mx-1 fw-bold text-danger">
                                        {errors.brandAr.message}*
                                      </small>
                                    )}
                                  </div>
                                  <div className="form-group col-auto mb-0">
                                    <div className="form-group mb-0 col choose_file position-relative">
                                      <span>Upload Image</span>
                                      <label
                                        htmlFor="uploadImage"
                                        style={{
                                          marginTop: "-1px",
                                          height: "50px",
                                        }}
                                      >
                                        <i className="fal fa-camera me-1"></i>
                                        Choose File{" "}
                                      </label>
                                      <input
                                        type="file"
                                        name="uploadImage"
                                        id="uploadImage"
                                        className={classNames("form-control", {
                                          "is-invalid": errors.uploadImage,
                                        })}
                                        {...register("uploadImage", {
                                          required: "Image required!",
                                        })}
                                        onChange={handleFileChange}
                                        style={{
                                          marginLeft: "10px",
                                          width: "95%",
                                        }}
                                        // required
                                        accept=".jpg, .jpeg, .png"
                                      />

                                      <div className="invalid-feedback fw-bold">
                                        Please choose a valid image file (JPG,
                                        JPEG, or PNG).
                                      </div>
                                    </div>
                                  </div>
                                  {errors.uploadImage && (
                                    <div className="invalid-feedback fw-bold">
                                      {errors.uploadImage.message}*
                                    </div>
                                  )}

                                  <div className="form-group mb-0 col-auto">
                                    <button
                                      className="comman_btn2"
                                      type="submit"
                                      disabled={loader ? true : ""}
                                      style={{
                                        cursor: loader
                                          ? "not-allowed"
                                          : "pointer",
                                      }}
                                    >
                                      {loader ? (
                                        <Spinner
                                          style={{
                                            height: "20px",
                                            width: "20px",
                                          }}
                                        />
                                      ) : (
                                        "Save"
                                      )}
                                    </button>
                                  </div>
                                </form>
                              </div>
                              <div className="col-12 mb-4 inner_design_comman border">
                                <div className="row comman_header justify-content-between">
                                  <div className="col">
                                    <h2>Brand List</h2>
                                  </div>
                                  <div className="col-3">
                                    <form
                                      className="form-design"
                                      // onSubmit={handleSearch1}
                                    >
                                      <div className="form-group mb-0 position-relative icons_set">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search"
                                          name="name"
                                          id="name"
                                          value={searchQuery}
                                          onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                          }
                                        />
                                        <i
                                          className="far fa-search"
                                          // onClick={handleSearch1}
                                        ></i>
                                      </div>
                                    </form>
                                  </div>
                                  <div className="col-auto">
                                    <input
                                      type="date"
                                      className="custom_date"
                                      value={startDate1}
                                      onChange={(e) =>
                                        setStartDate1(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                {loading ? (
                                  <Spinner />
                                ) : (
                                  <div className="row">
                                    <div className="col-12 comman_table_design px-0">
                                      <div className="table-responsive">
                                        <MDBDataTable
                                          bordered
                                          displayEntries={false}
                                          className="mt-0"
                                          hover
                                          data={brand}
                                          noBottomColumns
                                          sortable
                                          searching={false}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade Edit_modal"
        id="staticBackdropeditBrand"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Brand
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closebrandmodal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="form-design p-3 help-support-form row align-items-end justify-content-center"
                action=""
                onSubmit={handleSubmit2(handleUpdateBrand)}
              >
                <div className="form-group col-12 mb-3">
                  <div className="banner-profile position-relative d-flex align-items-center justify-content-center">
                    <div
                      className="banner-Box bg-light"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "auto",
                        // width: "150px",
                      }}
                    >
                      <>
                        <img
                          src={files?.editImage}
                          className="img-fluid"
                          alt="..."
                          style={{ width: "40vh" }}
                        />{" "}
                        {/* <div>150 X 150</div> */}
                      </>
                    </div>
                    <div className="p-image">
                      <label htmlFor="editImage">
                        <i className="upload-button fas fa-camera" />
                      </label>
                      <input
                        className="form-control d-none"
                        type="file"
                        accept="image/*"
                        name="editImage"
                        id="editImage"
                        onChange={(e) => onFileSelection(e, "editImage")}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group col-12">
                  <label htmlFor="">Select Category</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name="categoryId1"
                    id="categoryId1"
                    onChange={handleInputChange1}
                    {...register2("categoryId1", {})}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories?.map((category) => (
                      <option key={category._id} value={category?._id}>
                        {category?.categoryName_en}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="editCatename_en">Enter Brand Name (En)</label>
                  <input
                    className={classNames("form-control", {})}
                    name="editCatename_en"
                    id="editCatename_en"
                    {...register2("editCatename_en", {
                      maxLength: {
                        value: 100,
                        message: "Max length is 100 characters!",
                      },
                    })}
                  />
                  {errors2.editCatename_en && (
                    <small className="errorText mx-1 text-danger">
                      *{errors2.editCatename_en?.message}
                    </small>
                  )}
                </div>
                <div className="form-group col-6">
                  <label htmlFor="editCatename_ar">Enter Brand Name (Ar)</label>
                  <input
                    type="text"
                    className={classNames("form-control", {})}
                    name="editCatename_ar"
                    id="editCatename_ar"
                    {...register2("editCatename_ar", {})}
                  />
                  {errors2.editCatename_ar && (
                    <small className="errorText mx-1 text-danger">
                      *{errors2.editCatename_ar?.message}
                    </small>
                  )}
                </div>

                <div className="form-group mb-0 col-auto">
                  <button
                    type="submit"
                    className="comman_btn2"
                    disabled={loader ? true : ""}
                    style={{
                      cursor: loader ? "not-allowed" : "pointer",
                    }}
                  >
                    {loader ? (
                      <Spinner
                        style={{
                          height: "20px",
                          width: "20px",
                        }}
                      />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BrandManagement;
