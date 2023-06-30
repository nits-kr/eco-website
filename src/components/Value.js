import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
function Value() {
  const [valueList, setValueList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [values, setValues] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
    categoryId2: "",
    categoryId3: "",
  });
  const handleSearch1 = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/values/valuesSearch",
          {
            valuesName: searchQuery,
          }
        );
        const { error, results } = response.data;
        if (error) {
          throw new Error("Error searching for products.Data are Not Found");
        } else {
          setValueList(results.valuesData);
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      setValueList([]);
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
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/values/createvalues",
        {
          valuesName: values.nameEn,
          category_Id: values.categoryId,
          subCategory_Id: values.categoryId1,
          subSubCategory_Id: values.categoryId2,
          attribute_Id: values.categoryId3,
        }
      );
      console.log(response.data.results.createValues);
      if (!response.data.error) {
        alert("Saved!");
        handleSave();
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
      setValueList(response.data.results.list);
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
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/values/selectCategory"
        );
        setCategories(response.data.results.categoryData);
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
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/selectSubCategory"
        );
        setSubCategories(response.data.results.subCategoryData);
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
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/selectSubSubcategory"
        );
        setSubSubCategories(response.data.results.subSubCategoryData);
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
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/values/selectAttribute"
        );
        setAttributes(response.data.results.attributeCategoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
    {/* <Sidebar/> */}
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
                  size={15}
                  name="categoryId"
                  id="selectCategory"
                  value={values.categoryId}
                  onChange={handleInputChange}
                >
                  {Array.isArray(categories) &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group col-6">
                <label htmlFor="">Select Sub Category</label>
                <select
                  className="select form-control"
                  size={15}
                  name="categoryId1"
                  id="selectSubCategory"
                  value={values.categoryId1}
                  // onChange={(e) => handleInputSubCategory(e.target.value)}
                  onChange={handleInputChange}
                >
                  {Array.isArray(subCategories) &&
                    subCategories.map((subCategory) => (
                      <option key={subCategory._id} value={subCategory._id}>
                        {subCategory.subCategoryName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group col-6">
                <label htmlFor="">Select Sub Sub Category</label>
                <select
                  className="select form-control"
                  size={15}
                  name="categoryId2"
                  id="selectSubSubCategory"
                  value={values.categoryId2}
                  onChange={handleInputChange}
                >
                  {Array.isArray(subSubCategories) &&
                    subSubCategories.map((subSubCategory) => (
                      <option
                        key={subSubCategory._id}
                        value={subSubCategory._id}
                      >
                        {subSubCategory.subSubCategoryName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group col-6">
                <label htmlFor="">Select Attribute</label>
                <select
                  className="select form-control"
                  size={15}
                  name="categoryId3"
                  id="selectAttribute"
                  value={values.categoryId3}
                  onChange={handleInputChange}
                >
                  {Array.isArray(attributes) &&
                    attributes.map((attribute) => (
                      <option key={attribute._id} value={attribute._id}>
                        {attribute.attributeName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group col">
                <label htmlFor="">Enter Value Name (En)</label>
                <input
                  type="text"
                  className="form-control"
                  name="nameEn"
                  id="nameEn"
                  value={values.nameEn}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col">
                <label htmlFor="">Enter Value Name (Ar)</label>
                <input
                  type="text"
                  className="form-control"
                  name="nameAr"
                  id="nameAr"
                  value={values.nameAr}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-auto">
                <button className="comman_btn">Add More Row</button>
              </div>
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

              {/* <div className="col-auto">
                <input type="date" className="custom_date" />
              </div> */}
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
                        <th>SHIPMENT SERVICE</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(valueList || [])?.map((value, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{value?.attribute_Id?.category_Id}</td>
                          <td>{value?.attribute_Id?.subCategory_Id}</td>
                          <td>{value?.attribute_Id?.subSubCategory_Id}</td>
                          <td>{value?.attribute_Id?.attributeName}</td>
                          <td>{value.valuesName}</td>
                          <td>{value.valuesName}</td>
                          <td>
                            <form className="table_btns d-flex align-items-center">
                              <div className="check_toggle">
                                <input
                                  defaultChecked={value.shipmentService}
                                  type="checkbox"
                                  name={`shipment_service_${value._id}`}
                                  id={`shipment_service_${value._id}`}
                                  className="d-none"
                                />
                                <label
                                  htmlFor={`shipment_service_${value._id}`}
                                ></label>
                              </div>
                            </form>
                          </td>
                          <td>
                            <form className="table_btns d-flex align-items-center">
                              <div className="check_toggle">
                                <input
                                  defaultChecked={value.status}
                                  type="checkbox"
                                  name={`status_${value._id}`}
                                  id={`status_${value._id}`}
                                  className="d-none"
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
                            >
                              Edit
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
    </>
  );
}

export default Value;
