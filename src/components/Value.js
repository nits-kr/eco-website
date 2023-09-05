import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useUpdateValueMutation } from "../services/Post";
import { useDeleteValueListMutation } from "../services/Post";
function Value() {
  const [update, res] = useUpdateValueMutation();
  const [deleteValueList, re] = useDeleteValueListMutation();
  const [editValueEn, setEditValueEn] = useState("");
  const [editValueAr, setEditValueAr] = useState("");
  const [valueList, setValueList] = useState([]);
  const [itemId, setItemId] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [valueNameEn2, setValueNameEn2] = useState("");
  const [valueNameAr2, setValueNameAr2] = useState("");
  const [values, setValues] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
    categoryId2: "",
    categoryId3: "",
  });
  const url =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/values/valuesList";
  const url2 =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/values/valuesSearch";
  useEffect(() => {
    subValueManagementList();
  }, []);
  const subValueManagementList = () => {
    axios
      .post(url)
      .then((response) => {
        setValueList(response?.data?.results?.list?.reverse());
      })
      .catch((error) => {
        console.log(error.response.data);
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Failed to fetch recent order list data. Please try again later.",
        });
      });
  };

  const userList2 = async () => {
    if (!startDate1) return;
    try {
      const { data } = await axios.post(url, {
        startDate1,
      });
      const filteredUsers = data?.results?.list?.filter(
        (user) =>
          new Date(user?.createdAt?.slice(0, 10)).toISOString().slice(0, 10) ===
          new Date(startDate1).toISOString().slice(0, 10)
      );
      if (filteredUsers.length === 0) {
        setValueList([]);
        await Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            subValueManagementList();
          }
        });
      } else if (filteredUsers.length > 0) {
        await Swal.fire({
          title: "List Found!",
          text: "list is available for the selected date.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            setValueList(filteredUsers);
          }
        });
      }
      setValueList(filteredUsers);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  useEffect(() => {
    userList2();
  }, [startDate1]);

  useEffect(() => {
    handleSearch1();
  }, [searchQuery]);

  const handleSearch1 = async () => {
    try {
      const url1 = searchQuery !== "" ? url2 : url;
      const response = await axios.post(url1, {
        valuesName_en: searchQuery,
      });
      const { error, results } = response.data;
      if (error) {
        setValueList([]);
        Swal.fire({
          title: "Error!",
          // text: error.response.data,
          text: "Error searching for products. Data is not found",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            subValueManagementList();
          }
        });
        // throw new Error("Error searching for products. Data is not found.");
      } else {
        setValueList(
          searchQuery !== "" ? results?.valuesData : results?.list?.reverse()
        );
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          title: "Error!",
          text: error.response.data,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else if (error.request) {
        Swal.fire({
          title: "Error!",
          text: "Network error. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const requestBody = {
        valuesName_en: values.nameEn,
        valuesName_ar: values.nameAr,
        category_Id: values.categoryId,
        subCategory_Id: values.categoryId1,
        attribute_Id: values.categoryId3,
      };
      if (values.categoryId2) {
        requestBody.subSubCategory_Id = values.categoryId2;
      }

      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/values/createvalues",
        requestBody
      );

      console.log(response.data.results.createValues);
      if (!response.data.error) {
        Swal.fire({
          icon: "success",
          title: "Value Created",
          text: "The Value has been created successfully.",
        });
        handleSave();
        setTimeout(() => {
          window?.location?.reload();
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/values/valuesList"
      );
      setValueList(response.data.results.list.reverse());
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleSave();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/category/list"
        );
        setCategories(response.data.results.list);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subCategory/selectCategory/${values.categoryId}`
        );
        setSubCategories(response.data.results.categoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [values.categoryId]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subSubCategory/selectSubCategory/${values.categoryId1}`
        );
        setSubSubCategories(response.data.results.subCategoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [values.categoryId1]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/selectSubSubCategory/${values.categoryId}`
        );
        setAttributes(response.data.results.subSubCategoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [values.categoryId]);

  const handleSaveChanges1 = async (e) => {
    e.preventDefault();
    console.log("handleSaveChanges1", itemId);
    const editAddress = {
      id: itemId,
      valuesName_en: editValueEn,
      valuesName_ar: editValueAr,
      category_Id: values.categoryId,
      subCategory_Id: values.categoryId1,
      subSubCategory_Id: values.categoryId2,
      attribute_Id: values.categoryId3,
      // categoryName: subCategory.subCategoryId,
    };
    try {
      await update(editAddress);
      Swal.fire({
        icon: "success",
        title: "Changes Saved",
        text: "The subcategory has been updated successfully.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the subcategory.",
      });
    }
  };
  const handleItem = (item) => {
    setValueNameEn2(item?.valuesName_en || "");
    setValueNameAr2(item?.valuesName_ar || "");
    // setImage2(item?.categoryPic || "");
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
              onSubmit={handleSubmit}
            >
              <div className="form-group col-6">
                <label htmlFor="selectCategory">Select Category</label>
                <select
                  className="select form-control"
                  multiple=""
                  name="categoryId"
                  id="selectCategory"
                  value={values.categoryId}
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
                <label htmlFor="">Select Sub Category</label>
                <select
                  className="select form-control"
                  multiple=""
                  name="categoryId1"
                  id="selectSubCategory"
                  value={values.categoryId1}
                  // onChange={(e) => handleInputSubCategory(e.target.value)}
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
              </div>
              <div className="form-group col-6">
                <label htmlFor="">Select Sub Sub Category</label>
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
                </select>
              </div>
              <div className="form-group col-6">
                <label htmlFor="">Select Attribute</label>
                <select
                  className="select form-control"
                  multiple=""
                  name="categoryId3"
                  id="selectAttribute"
                  value={values.categoryId3}
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
              </div>
              <div className="form-group col">
                <label htmlFor="">
                  Enter Value Name (En)
                  <span className="required-field text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nameEn"
                  id="nameEn"
                  value={values.nameEn}
                  onChange={handleInputChange}
                  required
                  // minLength="3"
                />
              </div>
              <div className="form-group col">
                <label htmlFor="">
                  Enter Value Name (Ar)
                  <span className="required-field text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nameAr"
                  id="nameAr"
                  value={values.nameAr}
                  onChange={handleInputChange}
                  required
                  // minLength="3"
                />
              </div>
              {/* <div className="form-group col-auto">
                <button className="comman_btn">Add More Row</button>
              </div> */}
              <div className="form-group mb-0 col-12 text-center">
                <button className="comman_btn2">Save</button>
              </div>
            </form>
          </div>
          <div className="col-12 mb-4 inner_design_comman border">
            <div className="row comman_header justify-content-between">
              <div className="col">
                <h2>Values List</h2>
              </div>
              <div className="col-3">
                <form className="form-design" onSubmit={handleSearch1}>
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
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Category Name</th>
                        <th>Sub Category Name</th>
                        <th>Sub Sub Category Name</th>
                        <th>Attribute Name</th>
                        <th>Values (En)</th>
                        <th>Values (Ar)</th>
                        {/* <th>SHIPMENT SERVICE</th> */}
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(valueList || [])?.map((value, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{value?.category_Id?.categoryName_en}</td>
                          <td>{value?.subCategory_Id?.subCategoryName_en}</td>
                          <td>
                            {value?.subSubCategory_Id?.subSubCategoryName_en}
                          </td>
                          <td>{value?.attribute_Id?.attributeName_en}</td>
                          <td>{value?.valuesName_en}</td>
                          <td>{value?.valuesName_ar}</td>
                          {/* <td>
                            <form className="table_btns d-flex align-items-center">
                              <div className="check_toggle">
                                <input
                                  defaultChecked={value.shipmentService}
                                  type="checkbox"
                                  name={`shipment_service_${value._id}`}
                                  id={`shipment_service_${value._id}`}
                                  className="d-none"
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop2"
                                />
                                <label
                                  htmlFor={`shipment_service_${value._id}`}
                                ></label>
                              </div>
                            </form>
                          </td> */}
                          <td style={{ cursor: "not-allowed" }}>
                            <form className="table_btns d-flex align-items-center">
                              <div className="check_toggle">
                                <input
                                  defaultChecked={value?.status}
                                  type="checkbox"
                                  name={`status_${value._id}`}
                                  id={`status_${value._id}`}
                                  className="d-none"
                                  // data-bs-toggle="modal"
                                  // data-bs-target="#staticBackdrop3"
                                  disabled
                                />
                                <label htmlFor={`status_${value._id}`}></label>
                              </div>
                            </form>
                          </td>
                          <td>
                            <Link
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop4"
                              className="comman_btn2 table_viewbtn"
                              to=""
                              onClick={() => {
                                handleItem(value);
                                setItemId(value?._id);
                              }}
                            >
                              Edit
                            </Link>
                            <Link
                              className="comman_btn2 table_viewbtn ms-2"
                              // data-bs-toggle="modal"
                              // data-bs-target="#delete"
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
                                    deleteValueList(value?._id);
                                    Swal.fire(
                                      "Deleted!",
                                      `${value?.valuesName_en}  item has been deleted.`,
                                      "success"
                                    ).then(() => {
                                      subValueManagementList();
                                    });
                                  }
                                });
                              }}
                            >
                              Delete
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade Edit_modal"
        id="staticBackdrop4"
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
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="form-design p-3 help-support-form row align-items-end justify-content-center"
                action=""
                onSubmit={handleSubmit}
              >
                <div className="form-group col-6">
                  <label htmlFor="">Select Category</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name="categoryId"
                    id="selectCategory"
                    value={values.categoryId}
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
                  <label htmlFor="">Select Sub Category</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name="categoryId1"
                    id="categoryId1"
                    value={values.categoryId1}
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
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Select Sub Sub Category</label>
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
                  </select>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Select Attribute</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name="categoryId3"
                    id="categoryId3"
                    value={values.categoryId3}
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
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Value Name (En)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nameEn"
                    id="nameEn"
                    defaultValue={valueNameEn2}
                    // onChange={handleInputChange}
                    onChange={(e) => setEditValueEn(e.target.value)}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Value Name (Ar)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nameAr"
                    id="nameAr"
                    defaultValue={valueNameAr2}
                    // onChange={handleInputChange}
                    onChange={(e) => setEditValueAr(e.target.value)}
                  />
                </div>
                <div className="form-group mb-0 col-auto">
                  <button
                    className="comman_btn2"
                    // onClick={(event) => handleUpdate(category._id, event)}
                    onClick={handleSaveChanges1}
                  >
                    Save
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
