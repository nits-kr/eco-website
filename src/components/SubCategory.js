import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useCreateSubCategoryMutation,
  useGetSelectCategoryListQuery,
  useGetSubCategoryListMutation,
  useUpdateSubCategoryMutation,
} from "../services/Post";
import { useDeleteSubCategoryListMutation } from "../services/Post";
// import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

function SubCategory(props) {
  const [loader, setLoader] = useState(false);

  const ecomAdmintoken = useSelector((data) => data?.local?.token);

  const { data: categoryListdata, refetch: fetchcategoryListData } =
    useGetSelectCategoryListQuery({
      ecomAdmintoken,
    });

  const [subcategoryListdata] = useGetSubCategoryListMutation();

  const [deleteSubCategory] = useDeleteSubCategoryListMutation();
  const [createSubCategory] = useCreateSubCategoryMutation();
  const [updateSubCategory] = useUpdateSubCategoryMutation();
  const [itemId, setItemId] = useState("");
  const [subCategoryNameEn2, setSubCategoryNameEn2] = useState("");
  const [subCategoryNameAr2, setSubCategoryNameAr2] = useState("");
  const [image2, setImage2] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState();
  const [ids, setIds] = useState("");
  const [formData1, setFormData1] = useState({
    pic: files?.editImage,
  });

  const [subCategory, setSubCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
    subCategoryId: "",
    subCategoryPic: null,
  });
  const [category, setCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId1: "",
    uploadImage1: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [item, setItem] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubCategory({ ...subCategory, [name]: value });
  };

  const handleFileChange = (event) => {
    setSubCategory({ ...subCategory, subCategoryPic: event.target.files[0] });
  };
  const handleInputChange1 = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };
  const handleFileChange1 = (e, key) => {
    setCategory({ ...category, uploadImage1: e.target.files[0] });
  };

  const onFileSelection = (e, key) => {
    setFiles({ ...files, [key]: URL.createObjectURL(e.target.files[0]) });
    setFormData1({ ...formData1, pic: e?.target?.files[0] });
  };

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

  useEffect(() => {
    if (categoryListdata) {
      setCategories(categoryListdata?.results?.categoryData);
    }
  }, [categoryListdata]);

  const [subCategories, setSubCategories] = useState({
    columns: [
      {
        label: "S.NO.",
        field: "sn",
        sort: "asc",
        width: 150,
      },
      {
        label: "CATEGORY",
        field: "name_cate",
        sort: "asc",
        width: 150,
      },
      {
        label: "SUB CATEGORY (EN)",
        field: "name_en",
        sort: "asc",
        width: 150,
      },

      {
        label: "SUB CATEGORY (AR)",
        field: "name_ar",
        sort: "asc",
        width: 100,
      },

      {
        label: "Media",
        field: "pic",
        sort: "asc",
        width: 100,
      },
      {
        label: "STATUS",
        field: "status",
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
      handleSubCategoryList();
    }
  }, [ecomAdmintoken, searchQuery, startDate1]);

  const handleSubCategoryList = async () => {
    const data = {
      from: startDate1,
      search: searchQuery,
      ecomAdmintoken: ecomAdmintoken,
    };
    const res = await subcategoryListdata(data);
    setSubCategoryList(res?.data?.results?.list);
  };

  useEffect(() => {
    if (subCategoryList) {
      const newRows = [];

      subCategoryList?.map((list, index) => {
        const returnData = {};
        returnData.sn = index + 1 + ".";
        returnData.name_cate = list?.category_Id?.categoryName_en;
        returnData.name_en = list?.subCategoryName_en;
        returnData.name_ar = list?.subCategoryName_ar;
        returnData.pic = (
          <div className="">
            <img className="table_img" src={list?.subCategoryPic} alt="" />
          </div>
        );
        returnData.status = (
          <form className="table_btns d-flex align-items-center">
            <div className="check_toggle">
              <input
                defaultChecked={list?.status}
                type="checkbox"
                name={`r${index}`}
                id={`r${index}`}
                className="d-none"
                // data-bs-toggle="modal"
                // data-bs-target="#staticBackdrop3"
                disabled
              />
              <label htmlFor={`r${index}`}></label>
            </div>
          </form>
        );
        returnData.action = (
          <>
            <Link
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop10"
              className="comman_btn2 table_viewbtn me-2"
              to=""
              onClick={() => handleUpdate(list)}
            >
              Edit
            </Link>
            <Link
              className="comman_btn2 table_viewbtn"
              to="#"
              onClick={() => handleDeleteSubCate(list?._id)}
            >
              Delete
            </Link>
          </>
        );
        newRows.push(returnData);
      });
      setSubCategories({ ...subCategories, rows: newRows });
    }
  }, [subCategoryList]);

  const handleUpdate = (item) => {
    reset2({
      editCatename_en: item?.subCategoryName_en,
      editCatename_ar: item?.subCategoryName_ar,
      categoryId1: item?.category_Id?._id,
    });
    setFiles({ editImage: item?.subCategoryPic });
    setItemId(item?._id);
    // setFormData1({ pic: item?.categoryPic });
    setIds(item);
  };

  const handleItem = (item) => {
    setSubCategoryNameEn2(item?.subCategoryName_en || "");
    setSubCategoryNameAr2(item?.subCategoryName_ar || "");
    setImage2(item?.category_Id?.categoryPic || "");
    setItem(item);
    setItemId(item?._id);
  };

  const handleDeleteSubCate = async (id) => {
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
        deleteSubCategory({ id, ecomAdmintoken });
        setTimeout(() => {
          handleSubCategoryList();
          toast.success("Item Deleted!");
        }, 500);
      }
    });
  };

  const handleOnSave = async (data) => {
    // event.preventDefault();
    try {
      const alldata = new FormData();
      alldata.append("subCategoryName_en", data.subCategoryEn);
      alldata.append("subCategoryName_ar", data.subCategoryAr);
      alldata.append("category_Id", data.categoryId);
      alldata.append("subCategoryPic", subCategory.subCategoryPic);

      setLoader(true);

      const response = await createSubCategory({ alldata, ecomAdmintoken });
      setLoader(false);

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Sub Category Created",
          text: "The Sub category has been created successfully.",
        });
        setSubCategory({
          nameEn: "",
          nameAr: "",
          categoryId: "",
          subCategoryPic: null,
        });
        // subCategoryManagementList();
        handleSubCategoryList();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmit2 = async (data) => {
    // event.preventDefault();
    try {
      const alldata = new FormData();
      alldata.append("subCategoryName_en", data.editCatename_en);
      alldata.append("subCategoryName_ar", data.editCatename_ar);
      alldata.append("category_Id", data.categoryId1);
      if (formData1.pic) {
        alldata.append("subCategoryPic", formData1.pic);
      }

      setLoader(true);

      const response = await updateSubCategory({
        alldata,
        itemId,
        ecomAdmintoken,
      });
      setLoader(false);

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Sub Category Updated",
          text: "The Sub category has been updated successfully.",
        });
        document?.getElementById("deletesubcate").click();
        handleSubCategoryList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className="tab-pane fade"
        id="nav-profile"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
      >
        <div className="row p-4 mx-0">
          <div className="col-12 mb-4 inner_design_comman border">
            <div className="row comman_header justify-content-between">
              <div className="col-auto">
                <h2>Add New Sub Category</h2>
              </div>
            </div>
            <form
              className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
              action=""
              onSubmit={handleSubmit(handleOnSave)}
              noValidate
            >
              <div className="form-group col-12">
                <label htmlFor="categoryId">Select Category</label>
                <select
                  className={classNames("form-control", {
                    "is-invalid": errors.categoryId,
                  })}
                  multiple=""
                  name="categoryId"
                  id="categoryId"
                  {...register("categoryId", {
                    required: "Please Select Category*",
                  })}
                  // onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  {Array.isArray(categories) &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName_en}
                      </option>
                    ))}
                </select>
                {errors.categoryId && !subCategory.categoryId && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.categoryId?.message}
                  </small>
                )}
              </div>
              <div className="form-group col">
                <label htmlFor="subCategoryEn">
                  Enter Sub Category Name (En)
                  <span className="required-field text-danger">*</span>
                </label>
                <input
                  className={classNames("form-control", {
                    "is-invalid": errors.subCategoryEn,
                  })}
                  id="subCategoryEn"
                  name="subCategoryEn"
                  {...register("subCategoryEn", {
                    required: "Sub Category Name(En) is required!",
                    pattern: {
                      value: /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/,
                      message: "Special Character not allowed!",
                    },

                    maxLength: {
                      value: 100,
                      message: "Max length is 100 characters!",
                    },
                  })}
                />
                {errors.subCategoryEn && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.subCategoryEn.message}*
                  </small>
                )}
              </div>
              <div className="form-group col">
                <label htmlFor="subCategoryAr">
                  Enter Sub Category Name (Ar)
                  <span className="required-field text-danger">*</span>
                </label>
                <input
                  className={classNames("form-control", {
                    "is-invalid": errors.subCategoryAr,
                  })}
                  id="subCategoryAr"
                  name="subCategoryAr"
                  {...register("subCategoryAr", {
                    required: "Sub Category Name(Ar) is required!",
                    // pattern: {
                    //   value:
                    //     /^[\u0600-\u06FF\s.'",\-()&$#!@%*?<>{}[\]]{1,}[\.]{0,1}[\u0600-\u06FF\s.'",\-()&$#!@%*?<>{}[\]]{0,}$/,
                    //   message:
                    //     "Special characters allowed except underscore (_)",
                    // },

                    maxLength: {
                      value: 100,
                      message: "Max length is 100 characters!",
                    },
                  })}
                />
                {errors.subCategoryAr && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.subCategoryAr.message}*
                  </small>
                )}
              </div>

              <div className="form-group col-auto">
                <div className="form-group mb-0 col choose_file position-relative">
                  <span>Upload Image</span>
                  <label
                    htmlFor="uploadImage1"
                    style={{ marginTop: "-1px", height: "50px" }}
                  >
                    <i className="fal fa-camera me-1"></i>
                    Choose File{" "}
                  </label>
                  <input
                    type="file"
                    // className="form-control"
                    name="uploadImage1"
                    id="uploadImage1"
                    className={classNames("form-control", {
                      "is-invalid":
                        errors.uploadImage1 && !subCategory.subCategoryPic,
                    })}
                    // id="uploadImage1"
                    {...register("uploadImage1", {
                      required:
                        "Image required! Please choose a valid image file (JPG, JPEG, or PNG).",
                    })}
                    // style={{
                    //   marginLeft: "15px",
                    //   width: "95%",
                    // }}
                    // onChange={handleFileChange}
                    onChange={handleFileChange}
                    style={{ marginLeft: "10px", width: "95%" }}
                    required
                    accept=".jpg, .jpeg, .png"
                  />
                  {errors.uploadImage1 && (
                    <div className="invalid-feedback fw-bold">
                      <small
                        className="errorText mx-1 fw-bold text-danger"
                        style={{ marginTop: "-25px" }}
                      >
                        {errors.uploadImage1.message}*
                      </small>
                    </div>
                  )}
                  {/* <div className="invalid-feedback fw-bold">
                    Please choose a valid image file (JPG, JPEG, or PNG).
                  </div> */}
                </div>
              </div>

              <div className="form-group col-auto">
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
          <div className="col-12 mb-4 inner_design_comman border">
            <div className="row comman_header justify-content-between">
              <div className="col">
                <h2>Sub Category List</h2>
              </div>
              <div className="col-3">
                <form className="form-design">
                  <div className="form-group mb-0 position-relative icons_set">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      name="name"
                      id="name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <i className="far fa-search"></i>
                  </div>
                </form>
              </div>
              <div className="col-auto">
                <input
                  type="date"
                  className="custom_date"
                  value={startDate1}
                  onChange={(e) => setStartDate1(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 comman_table_design px-0">
                <div className="table-responsive">
                  <MDBDataTable
                    bordered
                    displayEntries={false}
                    className="mt-0"
                    hover
                    data={subCategories}
                    noBottomColumns
                    sortable
                    searching={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade Edit_modal"
        id="staticBackdrop10"
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
                Edit Sub Category
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="deletesubcate"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="form-design p-3 help-support-form row align-items-end justify-content-center"
                action=""
                onSubmit={handleSubmit2(onSubmit2)}
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
                    // value={subCategory.categoryId}
                    onChange={handleInputChange1}
                    // onChange={(e) => setCategoryNew(e.target.value)}
                    // defaultValue={item?.category_Id?.categoryName_en}
                    {...register2("categoryId1", {
                      // required: "Please Select Category*",
                    })}
                  >
                    <option value="" disabled>
                      {ids
                        ? ids?.category_Id?.categoryName_en
                        : "Select Category"}
                    </option>
                    {categories.map((category) => (
                      <option key={category._id} value={category?._id}>
                        {category?.categoryName_en}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="editCatename_en">
                    Enter Category Name (En)
                  </label>
                  <input
                    className={classNames("form-control", {
                      // "is-invalid": errors2.editCatename_en,
                    })}
                    name="editCatename_en"
                    id="editCatename_en"
                    {...register2("editCatename_en", {
                      // required: "Category Name is required!",
                      // pattern: {
                      //   value: /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/,
                      //   message: "Special Character not allowed!",
                      // },
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
                  <label htmlFor="editCatename_ar">
                    Enter Category Name (Ar)
                  </label>
                  <input
                    type="text"
                    className={classNames("form-control", {
                      // "is-invalid": errors2.editCatename_ar,
                    })}
                    name="editCatename_ar"
                    id="editCatename_ar"
                    {...register2("editCatename_ar", {
                      // required: "Category Name is required!",
                      // maxLength: {
                      //   value: 20,
                      //   message: "Max length is 20 characters!",
                      // },
                    })}
                  />
                  {errors2.editCatename_ar && (
                    <small className="errorText mx-1 text-danger">
                      *{errors2.editCatename_ar?.message}
                    </small>
                  )}
                </div>
                {/* <div className="form-group col-12 choose_file position-relative">
                  <span>Upload Image</span>
                  <label htmlFor="upload_video">
                    <i className="fal fa-camera me-1"></i>Choose File{" "}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    // defaultValue={props?.newCategory?.categoryPic}
                    name="upload_video"
                    id="upload_video"
                    onChange={(e) => handleFileChange(e, "uploadImage1")}
                  />
                </div> */}
                <div className="form-group mb-0 col-auto">
                  <button
                    className="comman_btn2"
                    type="submit"
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

      <div
        className="modal fade Update_modal"
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-4">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="row">
                <div className="col-12 Update_modal_content py-4">
                  <h2>Update</h2>
                  <p>Are you sure, Want to update this?</p>
                  <Link
                    className="comman_btn mx-2"
                    data-bs-dismiss="modal"
                    to="javscript:;"
                  >
                    Yes
                  </Link>
                  <Link
                    className="comman_btn2 mx-2 bg-red"
                    data-bs-dismiss="modal"
                    to="javscript:;"
                  >
                    NO
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade Update_modal"
        id="staticBackdrop3"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-4">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="row">
                <div className="col-12 Update_modal_content py-4">
                  <h2>Update</h2>
                  <p>Are you sure, Want to update this?</p>
                  <Link
                    className="comman_btn mx-2"
                    data-bs-dismiss="modal"
                    to="javscript:;"
                  >
                    Yes
                  </Link>
                  <Link
                    className="comman_btn2 mx-2 bg-red"
                    data-bs-dismiss="modal"
                    to="javscript:;"
                  >
                    NO
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <EditValues newCategory={newCategory} /> */}
    </>
  );
}

export default SubCategory;
