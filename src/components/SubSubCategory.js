import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useCreateSubSubCategoryMutation,
  useDeleteSubSubCategoryListMutation,
  useGetSelectCategoryListQuery,
  useGetSubSubCategoryListMutation,
  useSubCategoryListMutation,
  useUpdateSubSubCategoryMutation,
} from "../services/Post";
import { useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

function SubSubCategory() {
  const [loader, setLoader] = useState(false);

  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  const { data: categoryListdata, refetch: fetchcategoryListData } =
    useGetSelectCategoryListQuery({
      ecomAdmintoken,
    });

  const [subSubcategoryListdata] = useGetSubSubCategoryListMutation();
  const [deleteSubSubCategory, res] = useDeleteSubSubCategoryListMutation();
  const [getSubCategory] = useSubCategoryListMutation();
  const [updateSubSub] = useUpdateSubSubCategoryMutation();
  const [createSubSubCategory] = useCreateSubSubCategoryMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");

  const [subSubCategoryListDatas, setSubSubCategoryListDatas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
    editSubCateId: "",
    editSubSubCateId: "",
  });
  const [newCategory, setNewCategory] = useState([]);
  const [itemId, setItemId] = useState("");

  useEffect(() => {
    if (categoryListdata) {
      setCategories(categoryListdata?.results?.categoryData);
    }
  }, [categoryListdata]);

  useEffect(() => {
    if (subSubCategory.categoryId) {
      handleGetSubCategory(subSubCategory.categoryId);
    }
  }, [subSubCategory.categoryId]);

  const handleGetSubCategory = async (id) => {
    const res = await getSubCategory({ id, ecomAdmintoken });
    setSubCategories(res?.data?.results?.subCategoryData);
  };

  const [subSubCategories, setSubSubCategories] = useState({
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
        label: "SUB CATEGORY",
        field: "name_subcate",
        sort: "asc",
        width: 150,
      },

      {
        label: "SUB SUB CATEGORY (EN)",
        field: "name_en",
        sort: "asc",
        width: 100,
      },
      {
        label: "SUB SUB CATEGORY (AR)",
        field: "name_ar",
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
      handleSubSubCategoryList();
    }
  }, [ecomAdmintoken, searchQuery, startDate1]);

  const handleSubSubCategoryList = async () => {
    const data = {
      from: startDate1,
      search: searchQuery,
      ecomAdmintoken: ecomAdmintoken,
    };
    const res = await subSubcategoryListdata(data);
    setSubSubCategoryListDatas(res?.data?.results?.list);
  };
  useEffect(() => {
    if (subSubCategoryListDatas) {
      // setSubSubCategoryList(subSubcategoryListdata?.results?.list);
      const newRows = [];

      subSubCategoryListDatas?.map((list, index) => {
        const returnData = {};
        returnData.sn = index + 1 + ".";
        returnData.name_cate = list?.category_Id?.categoryName_en;
        returnData.name_subcate = list?.subCategory_Id?.subCategoryName_en;
        returnData.name_en = list?.subSubCategoryName_en;
        returnData.name_ar = list?.subSubCategoryName_ar;
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
                name={`status_${list._id}`}
                id={`status_${list._id}`}
                className="d-none"
                // data-bs-toggle="modal"
                // data-bs-target="#staticBackdrop3"
                disabled
              />
              <label htmlFor={`status_${list._id}`}></label>
            </div>
          </form>
        );
        returnData.action = (
          <>
            <Link
              data-bs-toggle="modal"
              data-bs-target="#staticBackdropsubsub"
              className="comman_btn2 table_viewbtn me-2"
              to=""
              onClick={() => handleUpdate(list)}
            >
              Edit
            </Link>
            <Link
              className="comman_btn2 table_viewbtn"
              to="#"
              onClick={() => handleDeleteSubSubCate(list?._id)}
            >
              Delete
            </Link>
          </>
        );
        newRows.push(returnData);
      });
      setSubSubCategories({ ...subSubCategories, rows: newRows });
    }
  }, [subSubCategoryListDatas]);

  const handleDeleteSubSubCate = async (id) => {
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
        const res = deleteSubSubCategory({ id, ecomAdmintoken });
        if (res) {
          setTimeout(() => {
            handleSubSubCategoryList();
            toast.success("Item Deleted!");
          }, 500);
        }
      }
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubSubCategory({ ...subSubCategory, [name]: value });
  };
  const handleOnSave = async (data) => {
    const alldata = {
      subSubCategoryName_en: data.subSubCategoryEn,
      subSubCategoryName_ar: data.subSubCategoryAr,
      category_Id: data.categoryId,
      subCategory_Id: data.categoryId1,
    };

    // event.preventDefault();
    setLoader(true);
    const res = await createSubSubCategory({ alldata, ecomAdmintoken });
    setLoader(false);

    if (res) {
      Swal.fire({
        icon: "success",
        title: "Sub Sub Category Created",
        text: "The Sub Sub Category has been created successfully.",
      });
      handleSubSubCategoryList();
    } else {
      alert("Errors in response!");
    }
  };

  const handleOnEdit = async (data) => {
    const alldata = {
      subSubCategoryName_en: data.subSubEn,
      subSubCategoryName_ar: data.subSubAr,
      category_Id: data.categoryId,
      subCategory_Id: data.categoryId1,
      ecomAdmintoken: ecomAdmintoken,
      id: itemId,
    };

    setLoader(true);
    // event.preventDefault();
    const res = await updateSubSub(alldata);
    setLoader(false);
    if (res) {
      Swal.fire({
        icon: "success",
        title: "Sub Sub Category Created",
        text: "The Sub Sub Category has been created successfully.",
      });
      handleSubSubCategoryList();
      document?.getElementById("deleteSubSubCate").click();
    } else {
      alert("Errors in response!");
    }
  };

  const handleUpdate = (item) => {
    setNewCategory({
      nameEn: item?.subSubCategoryName_en,
      nameAr: item?.subSubCategoryName_ar,
      id: item?._id,
      id1: item?.category_Id,
      id2: item?.subCategory_Id,
    });
    setItemId(item?._id);
    reset2({
      editCateId: item?.category_Id?._id,
      editSubCateId: item?.subCategory_Id?._id,
      subSubEn: item?.subSubCategoryName_en,
      subSubAr: item?.subSubCategoryName_ar,
    });
  };

  return (
    <>
      {/* <Sidebar/> */}
      <div
        className="tab-pane fade"
        id="nav-contact"
        role="tabpanel"
        aria-labelledby="nav-contact-tab"
      >
        <div className="row p-4 mx-0">
          <div className="col-12 mb-4 inner_design_comman border">
            <div className="row comman_header justify-content-between">
              <div className="col-auto">
                <h2>Add New Sub Sub Category</h2>
              </div>
            </div>
            <form
              className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
              action=""
              onSubmit={handleSubmit(handleOnSave)}
              // noValidate
            >
              <div className="form-group col-6">
                <label htmlFor="categoryId">Select Category</label>
                <select
                  // className="select form-control"
                  className={classNames("form-control", {
                    "is-invalid":
                      errors.categoryId && !subSubCategory.categoryId,
                  })}
                  multiple=""
                  name="categoryId"
                  id="categoryId"
                  // value={subSubCategory.categoryId}
                  {...register("categoryId", {
                    required: "Please Select Category*",
                  })}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  {Array.isArray(categories) &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName_en}
                      </option>
                    ))}
                </select>
                {errors.categoryId && !subSubCategory.categoryId && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.categoryId?.message}
                  </small>
                )}
              </div>
              <div
                className="form-group col-6"
                style={{
                  display: subCategories?.length > 0 ? "" : "none",
                }}
              >
                <label htmlFor="">Select Sub Category</label>
                <select
                  className={classNames("form-control", {
                    "is-invalid":
                      errors.categoryId1 && !subSubCategory.categoryId1,
                  })}
                  multiple=""
                  name="categoryId1"
                  id="categoryId1"
                  {...register("categoryId1", {})}
                  onChange={handleInputChange}
                >
                  <option value="">Select Sub Category</option>
                  {Array.isArray(subCategories) &&
                    subCategories.map((subCategory) => (
                      <option key={subCategory._id} value={subCategory._id}>
                        {subCategory.subCategoryName_en}
                      </option>
                    ))}
                </select>
                {errors.categoryId1 && !subSubCategory.categoryId1 && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.categoryId1?.message}
                  </small>
                )}
              </div>
              <div className="form-group col">
                <label htmlFor="subSubCategoryEn">
                  Enter Sub Sub Category Name (En)
                  <span className="required-field text-danger">*</span>
                </label>
                <input
                  className={classNames("form-control", {
                    "is-invalid": errors.subSubCategoryEn,
                  })}
                  id="subSubCategoryEn"
                  name="subSubCategoryEn"
                  {...register("subSubCategoryEn", {
                    required: "Sub Sub Category Name(En) is required!",
                    pattern: {
                      value: /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/,
                      message:
                        "Please enter only letters, spaces, and an optional dot.",
                    },

                    minLength: {
                      value: 2,
                      message: "Min length should be 2 characters!",
                    },
                    maxLength: {
                      value: 100,
                      message: "Max length is 100 characters!",
                    },
                  })}
                />
                {errors.subSubCategoryEn && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.subSubCategoryEn.message}*
                  </small>
                )}
              </div>
              <div className="form-group col">
                <label htmlFor="subSubCategoryAr">
                  Enter Sub Sub Category Name (Ar)
                  <span className="required-field text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={classNames("form-control", {
                    "is-invalid": errors.subSubCategoryAr,
                  })}
                  id="subSubCategoryAr"
                  name="subSubCategoryAr"
                  {...register("subSubCategoryAr", {
                    required: "Sub Sub Category Name(Ar) is required!",
                    // pattern: {
                    //   value:
                    //     /^[\u0600-\u06FF\s.'",\-()&$#!@%*?<>{}[\]]{1,}[\.]{0,1}[\u0600-\u06FF\s.'",\-()&$#!@%*?<>{}[\]]{0,}$/,
                    //   message:
                    //     "Special characters allowed except underscore (_)",
                    // },
                    minLength: {
                      value: 2,
                      message: "Min length should be 2 characters!",
                    },

                    maxLength: {
                      value: 100,
                      message: "Max length is 100 characters!",
                    },
                  })}
                />
                {errors.subSubCategoryAr && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.subSubCategoryAr.message}*
                  </small>
                )}
              </div>
              {/* <div className="form-group col-auto">
                <button className="comman_btn">Add More Row</button>
              </div> */}
              <div className="form-group mb-0 col-12 text-center">
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
                <h2>Sub Sub Categories List</h2>
              </div>
              <div className="col-3">
                <form
                  className="form-design"
                  action=""
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
                    data={subSubCategories}
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
      {/* <EditSubSubCategory newCategory={newCategory} /> */}
      <div
        className="modal fade Edit_modal"
        id="staticBackdropsubsub"
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
                Edit Sub Sub Category
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="deleteSubSubCate"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="form-design p-3 help-support-form row align-items-end justify-content-center"
                action=""
                onSubmit={handleSubmit2(handleOnEdit)}
              >
                <div className="form-group col-6">
                  <label htmlFor="categoryId">Select Category</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name="categoryId"
                    id="categoryId"
                    // value={category.categoryId}
                    {...register2("categoryId", {
                      // required: "Please Select Category*",
                    })}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Category</option>
                    {Array.isArray(categories) &&
                      categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName_en}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="categoryId1">Select Sub Category</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name="categoryId1"
                    id="categoryId1"
                    // value={category.categoryId1}
                    onChange={handleInputChange}
                    {...register2("categoryId1", {
                      // required: "Please Select Category*",
                    })}
                  >
                    <option value="">Select Sub Category</option>
                    {Array.isArray(subCategories) &&
                      subCategories.map((subCategory) => (
                        <option key={subCategory._id} value={subCategory._id}>
                          {subCategory.subCategoryName_en}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group col-6">
                  <label htmlFor="subSubEn">Sub Sub Category Name (En)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subSubEn"
                    id="subSubEn"
                    // defaultValue={props.newCategory.nameEn}
                    // onChange={handleInputChange}
                    {...register2("subSubEn", {
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
                </div>
                <div className="form-group col-6">
                  <label htmlFor="subSubAr">Sub Sub Category Name (Ar)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subSubAr"
                    id="subSubAr"
                    {...register2("subSubAr", {
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
                </div>
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
    </>
  );
}
export default SubSubCategory;
