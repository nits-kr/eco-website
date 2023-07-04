import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import EditAttribute from "./EditAttribute";

function Attribute() {
  const [attributesList, setAttributesList] = useState([]);
  const [subAttributesList, setSubAttributesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [itemId, setItemId] = useState([])
  const [attributes, setAttributes] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
    categoryId2: "",
  });
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/attributeSearch",
          {
            attributeName_en: searchQuery,
          }
        );
        const { error, results } = response.data;
        if (error) {
          throw new Error("Error searching for products.");
        } else {
          setAttributesList(results.categoryData);
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
      setAttributesList([]);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAttributes({ ...attributes, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/createAttribute",
        {
          attributeName_en: attributes.nameEn,
          attributeName_ar: attributes.nameAr,
          category_Id: attributes.categoryId,
          subCategory_Id: attributes.categoryId1,
          subSubCategory_Id: attributes.categoryId2,
        }
      )
      .then((response) => {
        console.log(response.data);
        if (!response.data.error) {
          alert("List saved!");
          handleSave();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/selectCategory"
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
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/selectSubcategory"
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
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/selectSubSubCategory"
        );
        setSubSubCategories(response.data.results.subSubCategoryData);
        console.log(response.data.results.subSubCategoryData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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
                  size={15}
                  name="categoryId"
                  id="selectCategory"
                  value={attributes.categoryId}
                  onChange={handleInputChange}
                >
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
                  size={15}
                  name="categoryId1"
                  id="selectSubCategory"
                  value={attributes.categoryId1}
                  onChange={handleInputChange}
                >
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
                  size={15}
                  name="categoryId2"
                  id="categoryId2"
                  value={attributes.categoryId2}
                  onChange={handleInputChange}
                >
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
                <label htmlFor="">Enter Attribute Name (En)</label>
                <input
                  type="text"
                  className="form-control"
                  name="nameEn"
                  id="nameEn"
                  value={attributes.nameEn}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col">
                <label htmlFor="">Enter Attribute Name (Ar)</label>
                <input
                  type="text"
                  className="form-control"
                  name="nameAr"
                  id="nameAr"
                  value={attributes.nameAr}
                  onChange={handleInputChange}
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
              <div className="col-3" onSubmit={handleSearch}>
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
                        <th>Attribute Name (En)</th>
                        <th>Attribute Name (Ar)</th>
                        <th>SHIPMENT SERVICE</th>
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
                              data-bs-target="#staticBackdrop7"
                              className="comman_btn2 table_viewbtn"
                              to=""
                              onClick={() => setItemId(value?._id)}
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
      <EditAttribute itemId = {itemId} />
    </>
  );
}

export default Attribute;
