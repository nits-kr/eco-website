import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SubCategory from "./SubCategory";
import SubSubCategory from "./SubSubCategory";
import Attribute from "./Attribute";
//import EditValues from "./EditValues";
import EditCategory from "./EditCategory";
import Value from "./Value";
import EditSubCategory from "./EditSubCategory";
//import EditSubSubCategory from "./EditSubSubCategory";
import EditAttribute from "./EditAttribute";
import Swal from 'sweetalert2';


function CategoryManagement() {
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [formData, setFormData] = useState({ nameEn: '', nameAr: '', categoryPic: null });
  const [newCategory, setNewCategory] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.post('http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/category/search-category', {
          categoryName: searchQuery
        });
        const { error, results } = response.data;
        if (error) {
          throw new Error('Error searching for products.');
        } else {
          setCategoryList(results.categoryData);
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } else {
      setCategoryList([]);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, categoryPic: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append('categoryName', formData.nameEn);
      data.append('categoryPic', formData.categoryPic);
      const response = await axios.post('http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/category/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token-user': localStorage.getItem('token')
        }
      });
      console.log(response.data.results.saveCategory);
      if (!response.data.error) {
        alert('List saved!');
        handleSave();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/category/list', null, {
        headers: {
          'x-auth-token-user': localStorage.getItem('token')
        }
      });
      setCategoryList(response.data.results.list.reverse());
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSave();
  }, []);

  const handleUpdate = (nameEn, nameAr, categoryPic, id) => {
    console.log(nameEn, nameAr, categoryPic, id)
    setNewCategory({
      nameEn: nameEn,
      nameAr: nameAr,
      categoryPic: categoryPic,
      id
    })
  };


  return (
    <>
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
                                  onSubmit={handleSubmit}
                                >
                                  <div className="form-group mb-0 col">
                                    <label htmlFor="name-en">
                                      Enter Category Name (En)
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"

                                      name="nameEn"
                                      id="name-en"
                                      value={formData.nameEn}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="form-group mb-0 col">
                                    <label htmlFor="name-ar">
                                      Enter Category Name (Ar)
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"

                                      name="nameAr"
                                      id="name-ar"
                                      value={formData.nameAr}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="form-group mb-0 col choose_file position-relative">
                                    <span>Upload Image</span>
                                    <label htmlFor="upload-video">
                                      <i className="fal fa-camera me-1"></i>
                                      Choose File{" "}
                                    </label>
                                    <input
                                      type="file"
                                      className="form-control"

                                      name="upload-video"
                                      id="upload-video"
                                      onChange={handleFileChange}
                                      style={{ marginLeft: '15px', width: '95%' }}
                                    />
                                  </div>
                                  <div className="form-group mb-0 col-auto">
                                    <button className="comman_btn2" type="submit">
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
                                    <form className="form-design" onSubmit={handleSearch}>
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
                                            <th>Category Name (En)</th>
                                            <th>Category Name (Ar)</th>
                                            <th>Media</th>
                                            <th>SHIPMENT SERVICE</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {categoryList.map(
                                            (category, index) => (
                                              <tr key={category._id}>
                                                <td>{index + 1}</td>
                                                <td>{category.categoryName}</td>
                                                <td>{category.categoryName}</td>
                                                <td>
                                                  <img
                                                    className="table_img"
                                                   // src={`http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/${category.categoryPic}`}
                                                    
                                                     src={category.categoryPic}
                                                    alt=""
                                                  />
                                                </td>
                                                <td>
                                                  <form className="table_btns d-flex align-items-center">
                                                    <div className="check_toggle">
                                                      <input
                                                        defaultChecked={
                                                          category.shipmentService
                                                        }
                                                        type="checkbox"
                                                        name={`shipment_service_${category._id}`}
                                                        id={`shipment_service_${category._id}`}
                                                        className="d-none"
                                                      />
                                                      <label
                                                        htmlFor={`shipment_service_${category._id}`}
                                                      ></label>
                                                    </div>
                                                  </form>
                                                </td>
                                                <td>
                                                  <form className="table_btns d-flex align-items-center">
                                                    <div className="check_toggle">
                                                      <input
                                                        defaultChecked={
                                                          category.status
                                                        }
                                                        type="checkbox"
                                                        name={`status_${category._id}`}
                                                        id={`status_${category._id}`}
                                                        className="d-none"
                                                      />
                                                      <label
                                                        htmlFor={`status_${category._id}`}
                                                      ></label>
                                                    </div>
                                                  </form>
                                                </td>
                                                <td>
                                                  <Link
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop"
                                                    className="comman_btn2 table_viewbtn"
                                                    to=""
                                                    onClick={() => handleUpdate(category.categoryName, category.categoryName, category.categoryPic, category._id)}
                                                  >
                                                    Edit
                                                  </Link>
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <SubCategory />
                          <SubSubCategory />
                          <Attribute />
                          <Value />
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
      {/* <!-- Modal --> */}
      <EditCategory newCategory={newCategory} />
      {/* <!-- Modal --> */}
      <EditSubCategory />
      {/* <!-- Modal --> */}
      {/* <EditSubSubCategory /> */}
      {/* <!-- Modal --> */}
      <EditAttribute />
      {/* <!-- Modal --> */}
      {/* <EditValues newCategory={newCategory}/> */}
    </>
  );
}

export default CategoryManagement;