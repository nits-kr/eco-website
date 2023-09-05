import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import EditAttribute from "./EditAttribute";
import { useDeleteAttributeListMutation } from "../services/Post";

function Attribute() {
  const [deleteAttribute, res] = useDeleteAttributeListMutation();
  const [attributesList, setAttributesList] = useState([]);
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
  const url =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/attributeList";
  const url2 =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/attributeSearch";

  useEffect(() => {
    subAttributeManagementList();
  }, []);

  const subAttributeManagementList = async () => {
    try {
      const response = await fetchData(url);
      setAttributesList(response?.data?.results?.list?.reverse());
    } catch (error) {
      console.log(error.response.data);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Failed to fetch recent order list data. Please try again later.",
      });
    }
  };

  const fetchData = async (url) => {
    try {
      const response = await axios.post(url);
      return response;
    } catch (error) {
      throw error;
    }
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
        setAttributesList([]);
        await Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            subAttributeManagementList();
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
            setAttributesList(filteredUsers);
          }
        });
      }
      setAttributesList(filteredUsers);
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
        attributeName_en: searchQuery,
      });
      const { error, results } = response.data;
      if (error) {
        setAttributesList([]);
        Swal.fire({
          title: "Error!",
          // text: error.response.data,
          text: "Error searching for products. Data is not found",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            subAttributeManagementList();
          }
        });
        // throw new Error("Error searching for products. Data is not found.");
      } else {
        setAttributesList(
          searchQuery !== "" ? results?.categoryData : results?.list?.reverse()
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
    setAttributes({ ...attributes, [name]: value });
  };

  const createAttribute = async (attributes) => {
    try {
      const postData = {
        attributeName_en: attributes.nameEn,
        attributeName_ar: attributes.nameAr,
        category_Id: attributes.categoryId,
        subCategory_Id: attributes.categoryId1,
      };
      if (attributes.categoryId2) {
        postData.subSubCategory_Id = attributes.categoryId2;
      }

      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/createAttribute",
        postData
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createAttribute(attributes);
      console.log(response);
      if (!response.error) {
        Swal.fire({
          icon: "success",
          title: "Attribute Created",
          text: "The Attribute has been created successfully.",
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
          `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subCategory/selectCategory/${attributes.categoryId}`
        );
        setSubCategories(response.data.results.categoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [attributes.categoryId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subSubCategory/selectSubCategory/${attributes.categoryId1}`
        );
        setSubSubCategories(response.data.results.subCategoryData);
        console.log(response.data.results.subCategoryData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [attributes.categoryId1]);

  const handleSave = async () => {
    await axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/attributeList"
      )
      .then((response) => {
        setAttributesList(response?.data?.results?.list.reverse());
        // setSubAttributesList(response?.data?.results?.list)
        console.log(response.data);
      });
  };
  useEffect(() => {
    handleSave();
  }, []);
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
              onSubmit={handleSubmit}
            >
              <div className="form-group col-4">
                <label htmlFor="">Select Category</label>
                <select
                  className="select form-control"
                  multiple=""
                  name="categoryId"
                  id="selectCategory"
                  value={attributes.categoryId}
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
              <div className="form-group col-4">
                <label htmlFor="">Select Sub Category</label>
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
                </select>
              </div>
              <div className="form-group col-4">
                <label htmlFor="">Select Sub Sub Category</label>
                <select
                  className="select form-control"
                  multiple=""
                  name="categoryId2"
                  id="categoryId2"
                  value={attributes.categoryId2}
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
              <div className="form-group col">
                <label htmlFor="">
                  Enter Attribute Name (En)
                  <span className="required-field text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nameEn"
                  id="nameEn"
                  value={attributes.nameEn}
                  onChange={handleInputChange}
                  required
                  // minLength="3"
                />
              </div>
              <div className="form-group col">
                <label htmlFor="">
                  Enter Attribute Name (Ar)
                  <span className="required-field text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nameAr"
                  id="nameAr"
                  value={attributes.nameAr}
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
                <h2>Attribute List</h2>
              </div>
              <div className="col-3" onSubmit={handleSearch1}>
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
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Category Name</th>
                        <th>Sub Category Name</th>
                        <th>Sub Sub Category Name</th>
                        <th>Attribute Name (En)</th>
                        <th>Attribute Name (Ar)</th>
                        {/* <th>SHIPMENT SERVICE</th> */}
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(attributesList || [])?.map((value, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{value?.category_Id?.categoryName_en}</td>
                          <td>{value?.subCategory_Id?.subCategoryName_en}</td>
                          <td>
                            {value?.subSubCategory_Id?.subSubCategoryName_en}
                          </td>
                          <td>{value?.attributeName_en}</td>
                          <td>{value?.attributeName_ar}</td>
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
                                  defaultChecked={value.status}
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
                              data-bs-target="#staticBackdrop7"
                              className="comman_btn2 table_viewbtn"
                              to=""
                              onClick={() =>
                                handleUpdate(
                                  // value.category_Id,
                                  // value.subCategory_Id,
                                  // value.subSubCategoryName_en,
                                  // value.subSubCategoryName_ar
                                  value
                                )
                              }
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
                                    deleteAttribute(value?._id);
                                    Swal.fire(
                                      "Deleted!",
                                      `${value?.attributeName_en}  item has been deleted.`,
                                      "success"
                                    ).then(() => {
                                      subAttributeManagementList();
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
      <EditAttribute newCategory={newCategory} />
    </>
  );
}

export default Attribute;
