import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  useCreateAttributeMutation,
  useDeleteAttributeListMutation,
  useGetAttibutesListMutation,
  useGetSelectCategoryListQuery,
  useSubCategoryListMutation,
  useSubSubCategoryListMutation,
  useUpdateAttributeMutation,
} from "../services/Post";
import { useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

function Attribute() {
  const [loader, setLoader] = useState(false);

  const ecomAdmintoken = useSelector((data) => data?.local?.token);

  const { data: categoryListdata, refetch: fetchcategoryListData } =
    useGetSelectCategoryListQuery({
      ecomAdmintoken,
    });

  const [attributesListdata] = useGetAttibutesListMutation();
  const [getSubCategory] = useSubCategoryListMutation();
  const [getSubSubCategory] = useSubSubCategoryListMutation();
  const [createAttributes] = useCreateAttributeMutation();
  const [updateAttributes] = useUpdateAttributeMutation();

  const [deleteAttribute, res] = useDeleteAttributeListMutation();

  const [subAttributesList, setSubAttributesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [itemId, setItemId] = useState([]);
  const [newCategory, setNewCategory] = useState([]);

  const [attributes, setAttributes] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
    categoryId2: "",
  });

  console.log("attributes", attributes);

  useEffect(() => {
    if (categoryListdata) {
      setCategories(categoryListdata?.results?.categoryData);
    }
  }, [categoryListdata]);

  const handleGetSubCategory = async (id) => {
    const res = await getSubCategory({ id, ecomAdmintoken });
    console.log("res", res);
    setSubCategories(res?.data?.results?.subCategoryData);
  };
  const handleGetSubSubCategory = async (id) => {
    const res = await getSubSubCategory({ id, ecomAdmintoken });
    console.log("res", res);

    setSubSubCategories(res.data.results.subSubCategoryData);
  };

  useEffect(() => {
    if (attributes.categoryId) {
      handleGetSubCategory(attributes.categoryId);
    }
  }, [attributes.categoryId]);
  useEffect(() => {
    if (attributes.categoryId1) {
      handleGetSubSubCategory(attributes.categoryId1);
    }
  }, [attributes.categoryId1]);

  const [attribute, setAttribute] = useState({
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
        label: "SUB SUB CATEGORY",
        field: "name_subSubcate",
        sort: "asc",
        width: 150,
      },

      {
        label: "Attribute (EN)",
        field: "name_en",
        sort: "asc",
        width: 100,
      },
      {
        label: "Attribute (AR)",
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
      handleAttributesList();
    }
  }, [ecomAdmintoken, searchQuery, startDate1]);

  const handleAttributesList = async () => {
    const data = {
      from: startDate1,
      search: searchQuery,
      ecomAdmintoken: ecomAdmintoken,
    };
    const res = await attributesListdata(data);
    console.log("res sub cate", res);
    setSubAttributesList(res?.data?.results?.list);
  };

  useEffect(() => {
    if (subAttributesList) {
      // setAttributesList(attributesListdata?.results?.list);
      const newRows = [];

      subAttributesList?.map((list, index) => {
        const returnData = {};
        returnData.sn = index + 1 + ".";
        returnData.name_cate = list?.category_Id?.categoryName_en;
        returnData.name_subcate = list?.subCategory_Id?.subCategoryName_en;
        returnData.name_subSubcate =
          list?.subSubCategory_Id?.subSubCategoryName_en;
        returnData.name_en = list?.attributeName_en;
        returnData.name_ar = list?.attributeName_ar;
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
              data-bs-target="#staticBackdropattributes"
              className="comman_btn2 table_viewbtn me-2"
              to=""
              onClick={() => handleUpdate(list)}
            >
              Edit
            </Link>
            <Link
              className="comman_btn2 table_viewbtn"
              to="#"
              onClick={() => handleDeleteAttribute(list?._id)}
            >
              Delete
            </Link>
          </>
        );
        newRows.push(returnData);
      });
      setAttribute({ ...attribute, rows: newRows });
    }
  }, [subAttributesList]);

  const handleDeleteAttribute = async (id) => {
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
        deleteAttribute({ id, ecomAdmintoken });
        setTimeout(() => {
          handleAttributesList();
          toast.success("Item Deleted!");
        }, 500);
      }
    });
  };

  const handleInputChange = (event) => {
    // alert("bbbb");
    const { name, value } = event.target;
    setAttributes({ ...attributes, [name]: value });
  };

  const handleOnSave = async (data) => {
    try {
      const alldata = {
        attributeName_en: data?.attributeEn,
        attributeName_ar: data?.attributeAr,
        category_Id: data?.categoryId,
        subCategory_Id: data?.categoryId1,
      };
      if (data.categoryId2) {
        alldata.subSubCategory_Id = data.categoryId2;
      }

      setLoader(true);

      const response = await createAttributes({ alldata, ecomAdmintoken });

      setLoader(false);

      console.log("response", response);
      if (response?.data?.message === "Success") {
        toast.success("Attribute Created Successfully");
        handleAttributesList();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const handleOnEdit = async (data) => {
    console.log("data", data);
    try {
      const alldata = {
        attributeName_en: data?.attributesEn,
        attributeName_ar: data?.attributesAr,
        category_Id: data?.categoryId,
        subCategory_Id: data?.categoryId1,
        ...(data.categoryId2 && { subSubCategory_Id: data.categoryId2 }),
        ecomAdmintoken: ecomAdmintoken,
        id: itemId,
      };

      setLoader(true);

      const response = await updateAttributes(alldata);

      setLoader(false);

      console.log("response", response);
      if (response?.data?.message === "Success") {
        toast.success("Attribute Updated Successfully");
        handleAttributesList();
        document?.getElementById("deleteAttributes").click();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleUpdate = (item) => {
    console.log(item);
    setNewCategory({
      nameEn: item?.attributeName_en,
      nameAr: item?.attributeName_ar,
      id: item?._id,
      id1: item?.category_Id,
      id2: item?.subCategory_Id,
      id2: item?.subSubCategory_Id,
    });
    setItemId(item?._id);
    reset2({
      categoryId: item?.category_Id?._id,
      categoryId1: item?.subCategory_Id?._id,
      categoryId2: item?.subSubCategory_Id?._id,
      attributesEn: item?.attributeName_en,
      attributesAr: item?.attributeName_ar,
    });
  };
  return (
    <>
      {/* <Sidebar/> */}
      <div
        className="tab-pane fade"
        id="nav-contact1"
        role="tabpanel"
        aria-labelledby="nav-contact1-tab"
      >
        <div className="row p-4 mx-0">
          <div className="col-12 mb-4 inner_design_comman border">
            <div className="row comman_header justify-content-between">
              <div className="col-auto">
                <h2>Add New Attribute</h2>
              </div>
            </div>
            <form
              className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
              action=""
              onSubmit={handleSubmit(handleOnSave)}
            >
              <div className="form-group col-4">
                <label htmlFor="categoryId">Select Category</label>
                <select
                  // className="select form-control"
                  className={classNames("form-control", {
                    "is-invalid": errors.categoryId && !attributes.categoryId,
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
                {errors.categoryId && !attributes.categoryId && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.categoryId?.message}
                  </small>
                )}
              </div>
              <div className="form-group col-4">
                {/* <label htmlFor="">Select Sub Category</label>
                <select
                  className="select form-control"
                  multiple=""
                  name="categoryId1"
                  id="selectSubCategory"
                  value={attributes.categoryId1}
                  onChange={handleInputChange}
                >
                  <option value="">Select Sub Category</option>
                  {Array.isArray(subCategories) &&
                    subCategories.map((subCategory) => (
                      <option key={subCategory._id} value={subCategory._id}>
                        {subCategory.subCategoryName_en}
                      </option>
                    ))}
                </select> */}
                <label htmlFor="">Select Sub Category</label>
                <select
                  // className="select form-control"
                  className={classNames("form-control", {
                    "is-invalid": errors.categoryId1 && !attributes.categoryId1,
                  })}
                  multiple=""
                  name="categoryId1"
                  id="categoryId1"
                  // value={subSubCategory.categoryId1}
                  {...register("categoryId1", {
                    required: "Please Select Category*",
                  })}
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
                {errors.categoryId1 && !attributes.categoryId1 && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.categoryId1?.message}
                  </small>
                )}
              </div>
              <div className="form-group col-4">
                <label htmlFor="categoryId2">Select Sub Sub Category</label>
                <select
                  // className="select form-control"
                  className={classNames("form-control", {
                    "is-invalid": errors.categoryId1 && !attributes.categoryId2,
                  })}
                  multiple=""
                  name="categoryId2"
                  id="categoryId2"
                  // value={attributes.categoryId2}
                  {...register("categoryId2", {
                    required: "Please Select Category*",
                  })}
                  onChange={handleInputChange}
                >
                  <option value="">Select Sub Sub Category</option>
                  {Array.isArray(subSubCategories) &&
                    subSubCategories.map((subSubCategory) => (
                      <option
                        key={subSubCategory._id}
                        value={subSubCategory._id}
                      >
                        {subSubCategory.subSubCategoryName_en}
                      </option>
                    ))}
                </select>
                {errors.categoryId2 && !attributes.categoryId2 && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.categoryId2?.message}
                  </small>
                )}
              </div>
              <div className="form-group col">
                <label htmlFor="attributeEn">
                  Enter Attribute Name (En)
                  <span className="required-field text-danger">*</span>
                </label>
                <input
                  type="text"
                  // className="form-control"
                  className={classNames("form-control", {
                    "is-invalid": errors.attributeEn,
                  })}
                  name="attributeEn"
                  id="attributeEn"
                  {...register("attributeEn", {
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
                {errors.attributeEn && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.attributeEn.message}*
                  </small>
                )}
              </div>
              <div className="form-group col">
                <label htmlFor="attributeAr">
                  Enter Attribute Name (Ar)
                  <span className="required-field text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={classNames("form-control", {
                    "is-invalid": errors.attributeAr,
                  })}
                  name="attributeAr"
                  id="attributeAr"
                  {...register("attributeAr", {
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
                {errors.attributeAr && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.attributeAr.message}*
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
                <h2>Attribute List</h2>
              </div>
              <div className="col-3">
                <form className="form-design">
                  <div className="form-group mb-0 position-relative icons_set">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      name="searchTerm"
                      id="searchTerm"
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
                    data={attribute}
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
      {/* <EditAttribute newCategory={newCategory} /> */}
      <div
        className="modal fade Edit_modal"
        id="staticBackdropattributes"
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
                Edit Attribute
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="deleteAttributes"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="form-design p-3 help-support-form row align-items-end justify-content-center"
                action=""
                // onSubmit={handleSubmit}
                onSubmit={handleSubmit2(handleOnEdit)}
              >
                <div className="form-group col-6">
                  <label htmlFor="categoryId">Select Category</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name="categoryId"
                    id="categoryId"
                    {...register2("categoryId", {
                      // required: "Please Select Category*",
                    })}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
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
                    {...register2("categoryId1", {})}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
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

                <div
                  className="form-group col-12"
                  style={{
                    display: subSubCategories?.length > 0 ? "" : "none",
                  }}
                >
                  <label htmlFor="categoryId2">Select Sub Sub Category</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name="categoryId2"
                    id="categoryId2"
                    {...register2("categoryId2", {
                      // required: "Please Select Category*",
                    })}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  >
                    <option value="">Select Sub Sub Category</option>
                    {Array.isArray(subSubCategories) &&
                      subSubCategories.map((subSubCategory) => (
                        <option
                          key={subSubCategory._id}
                          value={subSubCategory._id}
                        >
                          {subSubCategory.subSubCategoryName_en}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group col-6">
                  <label htmlFor="attributesEn">Attribute Name (En)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="attributesEn"
                    id="attributesEn"
                    {...register2("attributesEn", {
                      maxLength: {
                        value: 100,
                        message: "Max length is 100 characters!",
                      },
                    })}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="attributesAr">Attribute Name (Ar)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="attributesAr"
                    id="attributesAr"
                    {...register2("attributesAr", {
                      maxLength: {
                        value: 100,
                        message: "Max length is 100 characters!",
                      },
                    })}
                  />
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

export default Attribute;
