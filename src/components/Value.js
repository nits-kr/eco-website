import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useAttributesListMutation,
  useCreateValuesMutation,
  useGetSelectCategoryListQuery,
  useGetValueListMutation,
  useSubCategoryListMutation,
  useSubSubCategoryListMutation,
  useUpdateValueMutation,
} from "../services/Post";
import { useDeleteValueListMutation } from "../services/Post";
import { useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
function Value() {
  const [loader, setLoader] = useState(false);

  const ecomAdmintoken = useSelector((data) => data?.local?.token);

  const { data: categoryListdata } = useGetSelectCategoryListQuery({
    ecomAdmintoken,
  });

  const [valueLists] = useGetValueListMutation();

  const [getSubCategory] = useSubCategoryListMutation();
  const [getSubSubCategory] = useSubSubCategoryListMutation();
  const [getAttribute] = useAttributesListMutation();
  const [createValues] = useCreateValuesMutation();
  const [update] = useUpdateValueMutation();
  const [deleteValueList, re] = useDeleteValueListMutation();

  const [subValueList, setSubValueList] = useState([]);
  const [itemId, setItemId] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");

  const [values, setValues] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
    categoryId2: "",
    categoryId3: "",
  });

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

    setSubSubCategories(res?.data?.results?.subSubCategoryData);
  };
  const handleAttributes = async (id) => {
    const res = await getAttribute({ id, ecomAdmintoken });
    console.log("res", res);

    setAttributes(res?.data?.results?.attributeCategoryData);
  };

  useEffect(() => {
    if (values.categoryId) {
      handleGetSubCategory(values.categoryId);
    }
  }, [values.categoryId]);
  useEffect(() => {
    if (values.categoryId) {
      handleAttributes(values.categoryId);
    }
  }, [values.categoryId]);
  useEffect(() => {
    if (values.categoryId1) {
      handleGetSubSubCategory(values.categoryId1);
    }
  }, [values.categoryId1]);

  const [value, setValue] = useState({
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
        label: "Attribute",
        field: "name_att",
        sort: "asc",
        width: 150,
      },

      {
        label: "Value (EN)",
        field: "name_en",
        sort: "asc",
        width: 100,
      },
      {
        label: "Value (AR)",
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
      handleValueList();
    }
  }, [ecomAdmintoken, searchQuery, startDate1]);

  const handleValueList = async () => {
    const data = {
      from: startDate1,
      search: searchQuery,
      ecomAdmintoken: ecomAdmintoken,
    };
    const res = await valueLists(data);
    console.log("res sub cate", res);
    setSubValueList(res?.data?.results?.list);
  };

  useEffect(() => {
    if (subValueList) {
      // setValueList(valueLists?.results?.list);
      const newRows = [];

      subValueList?.map((list, index) => {
        const returnData = {};
        returnData.sn = index + 1 + ".";
        returnData.name_cate = list?.category_Id?.categoryName_en;
        returnData.name_subcate = list?.subCategory_Id?.subCategoryName_en;
        returnData.name_subSubcate =
          list?.subSubCategory_Id?.subSubCategoryName_en;
        returnData.name_att = list?.attribute_Id?.attributeName_en;
        returnData.name_en = list?.valuesName_en;
        returnData.name_ar = list?.valuesName_ar;
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
              data-bs-target="#staticBackdropeditvalue"
              className="comman_btn2 table_viewbtn me-2"
              to=""
              onClick={() => handleUpdate(list)}
            >
              Edit
            </Link>
            <Link
              className="comman_btn2 table_viewbtn"
              to="#"
              onClick={() => handleDeleteValue(list?._id)}
            >
              Delete
            </Link>
          </>
        );
        newRows.push(returnData);
      });
      setValue({ ...value, rows: newRows });
    }
  }, [subValueList]);

  const handleDeleteValue = async (id) => {
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
        const res = deleteValueList({ id, ecomAdmintoken });

        setTimeout(() => {
          handleValueList();
          toast.success("Item Deleted!");
        }, 1000);
      }
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleOnSubmit = async (data) => {
    try {
      // const alldata = {
      //   valuesName_en: data.valueEn,
      //   valuesName_ar: data.valueAr,
      //   category_Id: data.categoryId,
      //   subCategory_Id: data.categoryId1,
      //   attribute_Id: data.categoryId3,
      // };
      // if (data.categoryId2) {
      //   alldata.subSubCategory_Id = data.categoryId2;
      // }
      const alldata = {
        ...(data.valueEn && { valuesName_en: data.valueEn }),
        ...(data.valueAr && { valuesName_ar: data.valueAr }),
        ...(data.categoryId && { category_Id: data.categoryId }),
        ...(data.categoryId1 && { subCategory_Id: data.categoryId1 }),
        ...(data.categoryId3 && { attribute_Id: data.categoryId3 }),
        ...(data.categoryId2 && { subSubCategory_Id: data.categoryId2 }),
      };
      setLoader(true);
      const res = await createValues({ alldata, ecomAdmintoken });
      setLoader(false);
      console.log("res", res);

      if (res?.data?.message === "Success") {
        handleValueList();
        Swal.fire({
          icon: "success",
          title: "Value Created",
          text: "The Value has been created successfully.",
        });
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleOnEdit = async (data) => {
    try {
      const alldata = {
        valuesName_en: data.valuesEn,
        valuesName_ar: data.valuesAr,
        category_Id: data.categoryId,
        subCategory_Id: data.categoryId1,
        attribute_Id: data.categoryId3,
        ...(data.categoryId2 && { subSubCategory_Id: data.categoryId2 }),
        ecomAdmintoken: ecomAdmintoken,
        id: itemId,
      };
      setLoader(true);
      const res = await update(alldata);
      setLoader(false);
      console.log("res", res);

      if (res?.data?.message === "Success") {
        handleValueList();
        document?.getElementById("deletevaluemodal").click();
        Swal.fire({
          icon: "success",
          title: "Value Updated",
          text: "The Value has been Updated successfully.",
        });
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (item) => {
    reset2({
      valuesEn: item?.valuesName_en,
      valuesAr: item?.valuesName_ar,
      categoryId: item?.category_Id?._id,
      categoryId1: item?.subCategory_Id?._id,
      categoryId2: item?.subSubCategory_Id?._id,
    });
    setItemId(item?._id);
  };
  return (
    <>
      <div
        className="tab-pane fade"
        id="nav-contact2"
        role="tabpanel"
        aria-labelledby="nav-contact2-tab"
      >
        <div className="row p-4 mx-0">
          <div className="col-12 mb-4 inner_design_comman border">
            <div className="row comman_header justify-content-between">
              <div className="col-auto">
                <h2>Add New Values</h2>
              </div>
            </div>
            <form
              className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
              action=""
              onSubmit={handleSubmit(handleOnSubmit)}
            >
              <div className="form-group col-6">
                <label htmlFor="categoryId">
                  Select Category
                  <span className="required-field text-danger">*</span>
                </label>
                <select
                  className={classNames("form-control", {
                    "is-invalid": errors.categoryId && !values.categoryId,
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
                {errors.categoryId && !values.categoryId && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.categoryId?.message}
                  </small>
                )}
              </div>
              <div className="form-group col-6">
                <label htmlFor="categoryId1">Select Sub Category</label>
                <select
                  // className="select form-control"
                  className={classNames("form-control", {
                    "is-invalid": errors.categoryId1 && !values.categoryId1,
                  })}
                  multiple=""
                  name="categoryId1"
                  id="categoryId1"
                  // value={subSubCategory.categoryId1}
                  {...register("categoryId1", {
                    // required: "Please Select Sub Category*",
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
                {errors.categoryId1 && !values.categoryId1 && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.categoryId1?.message}
                  </small>
                )}
              </div>
              <div className="form-group col-6">
                {/* <label htmlFor="">Select Sub Sub Category</label>
                <select
                  className="select form-control"
                  multiple=""
                  name="categoryId2"
                  id="selectSubSubCategory"
                  value={values.categoryId2}
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
                </select> */}
                <label htmlFor="categoryId2">Select Sub Sub Category</label>
                <select
                  // className="select form-control"
                  className={classNames("form-control", {
                    "is-invalid": errors.categoryId2 && !values.categoryId2,
                  })}
                  multiple=""
                  name="categoryId2"
                  id="categoryId2"
                  // value={attributes.categoryId2}
                  {...register("categoryId2", {
                    // required: "Please Select Category*",
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
                {errors.categoryId2 && !values.categoryId2 && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.categoryId2?.message}
                  </small>
                )}
              </div>
              <div className="form-group col-6">
                <label htmlFor="categoryId3">
                  Select Attribute
                  <span className="required-field text-danger">*</span>
                </label>
                <select
                  // className="select form-control"
                  className={classNames("form-control", {
                    "is-invalid": errors.categoryId3 && !values.categoryId3,
                  })}
                  multiple=""
                  name="categoryId3"
                  id="categoryId3"
                  value={values.categoryId3}
                  {...register("categoryId3", {
                    required: "Please Select Attribute*",
                  })}
                  onChange={handleInputChange}
                >
                  <option value="">Select Attribute</option>
                  {Array.isArray(attributes) &&
                    attributes.map((attribute) => (
                      <option key={attribute._id} value={attribute._id}>
                        {attribute.attributeName_en}
                      </option>
                    ))}
                </select>
                {errors.categoryId3 && !values.categoryId3 && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.categoryId3?.message}
                  </small>
                )}
              </div>
              <div className="form-group col">
                <label htmlFor="valueEn">
                  Enter Value Name (En)
                  <span className="required-field text-danger">*</span>
                </label>
                <input
                  type="text"
                  // className="form-control"
                  className={classNames("form-control", {
                    "is-invalid": errors.valueEn,
                  })}
                  name="valueEn"
                  id="valueEn"
                  // value={values.valueEn}
                  // onChange={handleInputChange}
                  {...register("valueEn", {
                    required: "Value (En) is required!",
                    pattern: {
                      value: /^[A-Za-z0-9\s]{1,}[\.]{0,1}[A-Za-z0-9\s]{0,}$/,
                      message:
                        "Please enter only letters, digits, spaces, and an optional dot.",
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
                {errors.valueEn && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.valueEn.message}*
                  </small>
                )}
              </div>
              <div className="form-group col">
                <label htmlFor="valueAr">
                  Enter Value Name (Ar)
                  <span className="required-field text-danger">*</span>
                </label>
                <input
                  type="text"
                  // className="form-control"
                  className={classNames("form-control", {
                    "is-invalid": errors.valueAr,
                  })}
                  name="valueEn"
                  id="valueEn"
                  {...register("valueAr", {
                    required: "Value (Ar) is required!",
                    // pattern: {
                    //   value: /^[A-Za-z0-9\s]{1,}[\.]{0,1}[A-Za-z0-9\s]{0,}$/,
                    //   message:
                    //     "Please enter only letters, digits, spaces, and an optional dot.",
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
                {errors.valueAr && (
                  <small className="errorText mx-1 fw-bold text-danger">
                    {errors.valueAr.message}*
                  </small>
                )}
              </div>

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
                <h2>Values List</h2>
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
                    data={value}
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
        id="staticBackdropeditvalue"
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
                Edit Values
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="deletevaluemodal"
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
                  className="form-group col-6"
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
                  <label htmlFor="categoryId3">Select Attribute</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name="categoryId3"
                    id="categoryId3"
                    // value={values.categoryId3}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    {...register2("categoryId3", {
                      // required: "Please Select Category*",
                    })}
                  >
                    <option value="">Select Attribute</option>
                    {Array.isArray(attributes) &&
                      attributes.map((attribute) => (
                        <option key={attribute._id} value={attribute._id}>
                          {attribute.attributeName_en}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group col-6">
                  <label htmlFor="valuesEn">Value Name (En)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="valuesEn"
                    id="valuesEn"
                    // defaultValue={valueNameEn2}
                    // onChange={handleInputChange}
                    {...register2("valuesEn", {
                      maxLength: {
                        value: 100,
                        message: "Max length is 100 characters!",
                      },
                    })}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="valuesAr">Value Name (Ar)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="valuesAr"
                    id="valuesAr"
                    {...register2("valuesAr", {
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
    </>
  );
}

export default Value;
