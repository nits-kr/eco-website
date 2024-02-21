import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SubCategory from "./SubCategory";
import SubSubCategory from "./SubSubCategory";
import Attribute from "./Attribute";

import Value from "./Value";

import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import {
  useCatogaryStatusMutation,
  useCreateCategoryMutation,
  useGetCategoryListMutation,
  // useGetCategoryListQuery,
  useUpdateCategoryMutation,
} from "../services/Post";
import { useDeleteCategoryListMutation } from "../services/Post";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MDBDataTable } from "mdbreact";
import { useForm } from "react-hook-form";
import classNames from "classnames";

function CategoryManagement(props) {
  const ecomAdmintoken = useSelector((data) => data?.local?.token);

  // const { data: categoryListdata, refetch: categoryListData } =
  //   useGetCategoryListQuery({
  //     ecomAdmintoken,
  //   });
  const [categoryListdata] = useGetCategoryListMutation();
  const [updateStatus] = useCatogaryStatusMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory, response] = useDeleteCategoryListMutation();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [files, setFiles] = useState();
  const [formData, setFormData] = useState({
    categoryPic: null,
  });
  const [formData1, setFormData1] = useState({
    pic: files?.editImages,
  });
  console.log("formData1", formData1);
  console.log("formData1.pic23", formData1.pic);
  const [newCategory, setNewCategory] = useState([]);

  const [itemId, setItemId] = useState("");

  console.log("files", files);

  const handleFileChange = (event) => {
    setFormData({ ...formData, categoryPic: event?.target?.files[0] });
  };

  // const onFileSelection = (e, key) => {
  //   setFiles({ ...files, [key]: e.target.files[0] });
  // };
  const onFileSelection = (e, key) => {
    setFiles({ ...files, [key]: URL.createObjectURL(e.target.files[0]) });
    setFormData1({ ...formData1, pic: e?.target?.files[0] });
  };

  const [category, setCategory] = useState({
    columns: [
      {
        label: "S.NO.",
        field: "sn",
        sort: "asc",
        width: 150,
      },
      // {
      //   label: "CATEGORY",
      //   field: "name_cate",
      //   sort: "asc",
      //   width: 150,
      // },
      {
        label: "CATEGORY (EN)",
        field: "name_en",
        sort: "asc",
        width: 150,
      },

      {
        label: "CATEGORY (AR)",
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
    if (ecomAdmintoken) {
      handleCategoryList();
    }
  }, [ecomAdmintoken, searchQuery, startDate1]);

  const handleCategoryList = async () => {
    const data = {
      from: "",
      to: startDate1,
      search: searchQuery,
      ecomAdmintoken: ecomAdmintoken,
    };
    const res = await categoryListdata(data);
    console.log("res cate", res);
    setCategoryList(res?.data?.results?.list);
  };

  useEffect(() => {
    if (categoryList?.length > 0) {
      // setCategoryList(categoryListdata?.results?.list);
      const newRows = [];

      categoryList
        ?.slice()
        ?.reverse()
        ?.map((list, index) => {
          const returnData = {};
          returnData.sn = index + 1 + ".";
          returnData.name_cate = list?.category?.name_en;
          returnData.name_en = list?.categoryName_en;
          returnData.name_ar = list?.categoryName_ar;
          returnData.pic = (
            <div className="">
              <img className="table_img" src={list?.categoryPic} alt="" />
            </div>
          );
          returnData.status = (
            <form
              className="table_btns d-flex align-items-center"
              key={list?._id}
            >
              <div className="check_toggle">
                <input
                  className="d-none"
                  defaultChecked={list?.status}
                  type="checkbox"
                  name={`status_${list?._id}`}
                  id={`status_${list?._id}`}
                  onChange={(e) => handleCheckboxChange(e, list?._id)}
                />
                <label htmlFor={`status_${list?._id}`}></label>
              </div>
            </form>
          );
          returnData.action = (
            <>
              <Link
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropeditCat"
                className="comman_btn2 table_viewbtn me-2"
                to=""
                onClick={() => handleUpdate(list)}
              >
                Edit
              </Link>
              <Link
                className="comman_btn2 table_viewbtn"
                to="#"
                onClick={() => handleDeleteCate(list?._id)}
              >
                Delete
              </Link>
            </>
          );
          newRows.push(returnData);
        });
      setCategory({ ...category, rows: newRows });
    }
  }, [categoryList]);

  console.log("set form data pic", formData.categoryPic);
  const handleOnSave = async (data) => {
    try {
      const alldata = new FormData();
      alldata.append("categoryName_en", data.Category_name);
      alldata.append("categoryName_ar", data.Category_nameAr);
      alldata.append("categoryPic", formData.categoryPic);
      const res = await createCategory({ alldata, ecomAdmintoken });

      console.log("res,", res);
      if (res?.data?.message === "Category Create Successfully") {
        Swal.fire({
          icon: "success",
          title: "Category Created",
          text: "The category has been created successfully.",
        });
        handleCategoryList();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log("FormData1.pic:", formData1.pic);
  const onSubmit2 = async (data) => {
    try {
      const alldata = new FormData();
      alldata.append("categoryName_en", data.editCatename_en);
      alldata.append("categoryName_ar", data.editCatename_ar);

      // Log the value of formData1.pic before appending it to FormData
      console.log("FormData1.pic:", formData1.pic);

      if (formData1.pic) {
        alldata.append("categoryPic", formData1.pic);
      }

      // Log the content of the FormData object before submitting
      console.log("FormData content:", alldata);

      const res = await updateCategory({ alldata, ecomAdmintoken, itemId });

      console.log("res,", res);
      if (res?.data?.message === "Success") {
        Swal.fire({
          icon: "success",
          title: "Category Updated",
          text: "The category has been updated successfully.",
        });
        handleCategoryList();
        document?.getElementById("deletecate").click();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (item) => {
    console.log("item", item);
    setNewCategory({
      nameEn: item?.categoryName_en,
      nameAr: item?.categoryName_ar,
      categoryPic: item?.categoryPic,
      id: item?._id,
    });
    reset2({
      editCatename_en: item?.categoryName_en,
      editCatename_ar: item?.categoryName_ar,
    });
    setFiles({ editImages: item?.categoryPic });
    setItemId(item?._id);
    // setFormData1({ pic: item?.categoryPic });
  };

  const handleCheckboxChange = async (e, categoryId) => {
    e.preventDefault();
    console.log("handleSaveChanges1", categoryId);
    const newStatus = e.target.checked;

    const confirmationResult = await Swal.fire({
      title: "Confirm Status Change",
      text: "Do you want to change the status?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (confirmationResult.isConfirmed) {
      const editStatus = {
        id: categoryId,
        status: newStatus,
        ecomAdmintoken: ecomAdmintoken,
      };
      try {
        await updateStatus(editStatus);

        Swal.fire({
          title: "Changes Saved",
          text: "The Status has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
            // categoryListData();
          }
        });
      } catch (error) {}
    }
  };

  const handleDeleteCate = async (id) => {
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
        deleteCategory({ id, ecomAdmintoken });
        setTimeout(() => {
          toast.success("Item Deleted!");
          handleCategoryList();
        }, 500);
      }
    });
  };

  return (
    <>
      {loading}
      <Sidebar Dash={"categories"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row category-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Category Management</h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 px-0">
                        <nav>
                          <div
                            className="nav nav-tabs comman_tabs"
                            id="nav-tab"
                            role="tablist"
                          >
                            <button
                              className="nav-link active"
                              id="nav-home-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-home"
                              type="button"
                              role="tab"
                              aria-controls="nav-home"
                              aria-selected="true"
                            >
                              Categories
                            </button>
                            <button
                              className="nav-link"
                              id="nav-profile-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-profile"
                              type="button"
                              role="tab"
                              aria-controls="nav-profile"
                              aria-selected="false"
                            >
                              Sub Categories
                            </button>
                            <button
                              className="nav-link"
                              id="nav-contact-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-contact"
                              type="button"
                              role="tab"
                              aria-controls="nav-contact"
                              aria-selected="false"
                            >
                              Sub Sub Categories
                            </button>
                            <button
                              className="nav-link"
                              id="nav-contact1-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-contact1"
                              type="button"
                              role="tab"
                              aria-controls="nav-contact1"
                              aria-selected="false"
                            >
                              Attributes
                            </button>
                            <button
                              className="nav-link"
                              id="nav-contact2-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-contact2"
                              type="button"
                              role="tab"
                              aria-controls="nav-contact2"
                              aria-selected="false"
                            >
                              Values
                            </button>
                          </div>
                        </nav>
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
                                    <h2>Add New Category</h2>
                                  </div>
                                </div>

                                <form
                                  className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                                  onSubmit={handleSubmit(handleOnSave)}
                                  action=""
                                >
                                  <div className="form-group mb-0 col">
                                    <label htmlFor="name-en">
                                      Enter Category Name (En)
                                      <span className="required-field text-danger">
                                        *
                                      </span>
                                    </label>
                                    <input
                                      // className={
                                      //   errors.Category_name
                                      //     ? "form-control is-invalid"
                                      //     : "form-control"
                                      // }
                                      className={classNames("form-control", {
                                        "is-invalid": errors.Category_name,
                                      })}
                                      id="name-en"
                                      {...register("Category_name", {
                                        required: "Category Name is required!",
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
                                    {errors.Category_name && (
                                      <small className="errorText mx-1 text-danger">
                                        {errors.Category_name.message}*
                                      </small>
                                    )}
                                  </div>

                                  <div className="form-group mb-0 col">
                                    <label htmlFor="Category_nameAr">
                                      Enter Category Name (Ar)
                                      <span className="required-field text-danger">
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      className={classNames("form-control", {
                                        "is-invalid": errors.Category_nameAr,
                                      })}
                                      id="Category_nameAr"
                                      {...register("Category_nameAr", {
                                        required: "Category Name is required!",
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
                                    {errors.Category_nameAr && (
                                      <small className="errorText mx-1 text-danger">
                                        {errors.Category_nameAr.message}*
                                      </small>
                                    )}
                                  </div>

                                  <div className="form-group mb-0 col choose_file position-relative">
                                    <span>Upload Image</span>
                                    <label htmlFor="uploadImage">
                                      <i className="fal fa-camera me-1"></i>
                                      Choose File{" "}
                                    </label>
                                    <input
                                      type="file"
                                      // className="form-control"
                                      className={classNames("form-control", {
                                        "is-invalid":
                                          errors.uploadImage &&
                                          !formData.categoryPic,
                                      })}
                                      id="uploadImage"
                                      {...register("uploadImage", {
                                        required: "Image required!",
                                      })}
                                      style={{
                                        marginLeft: "15px",
                                        width: "95%",
                                      }}
                                      onChange={handleFileChange}
                                    />
                                    {errors.uploadImage && (
                                      <div className="invalid-feedback">
                                        {errors.uploadImage.message}*
                                      </div>
                                    )}
                                  </div>

                                  <div className="form-group mb-0 col-auto">
                                    <button
                                      className="comman_btn2"
                                      type="submit"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </form>
                              </div>
                              <div className="col-12 mb-4 inner_design_comman border">
                                <div className="row comman_header justify-content-between">
                                  <div className="col">
                                    <h2>Category List</h2>
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
                                          name="searchQuery"
                                          id="searchQuery"
                                          value={searchQuery}
                                          onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                          }
                                        />
                                        <i
                                          className="far fa-search"
                                          onClick={() => handleCategoryList()}
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
                                          data={category}
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
                          {/* <div> */}
                          <SubCategory />
                          <SubSubCategory />
                          <Attribute />
                          <Value />
                          {/* </div> */}
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
      <div
        className="modal fade Edit_modal"
        id="staticBackdropeditCat"
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
                Edit Category
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="deletecate"
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
                          src={files?.editImages}
                          className="img-fluid"
                          alt="..."
                          style={{ width: "40vh" }}
                        />{" "}
                        {/* <div>150 X 150</div> */}
                      </>
                    </div>
                    <div className="p-image">
                      <label htmlFor="editImages">
                        <i className="upload-button fas fa-camera" />
                      </label>
                      <input
                        className="form-control d-none"
                        type="file"
                        accept="image/*"
                        name="editImages"
                        id="editImages"
                        onChange={(e) => onFileSelection(e, "editImages")}
                      />
                    </div>
                  </div>
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
                      // maxLength: {
                      //   value: 20,
                      //   message: "Max length is 20 characters!",
                      // },
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
                    onChange={(e) => handleFileChange(e, "uploadImage")}
                  />
                </div> */}
                <div className="form-group mb-0 col-auto">
                  <button className="comman_btn2" type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal --> */}
      {/* <EditCategory newCategory={newCategory} /> */}
      {/* <!-- Modal --> */}
      {/* <EditSubCategory /> */}
      {/* <!-- Modal --> */}
      {/* <EditSubSubCategory /> */}
      {/* <!-- Modal --> */}
      {/* <EditAttribute /> */}
      {/* <!-- Modal --> */}
      {/* <EditValues newCategory={newCategory}/> */}
    </>
  );
}

export default CategoryManagement;
