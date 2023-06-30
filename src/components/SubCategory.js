import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import EditValues from "./EditValues";

function SubCategory() {
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    subCategoryPic: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [newCategory, setNewCategory] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubCategory({ ...subCategory, [name]: value });
  };

  const handleFileChange = (event) => {
    setSubCategory({ ...subCategory, subCategoryPic: event.target.files[0] });
    console.log("picture", event.target.files[0]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subCategory/subCategorySearch",
          {
            subCategoryName_en: searchQuery,
          }
        );
        const { error, results } = response.data;
        if (error) {
          throw new Error("Error searching for products.");
        } else {
          setSubCategoryList(results.categoryData);
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
      setSubCategoryList([]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("subCategoryName_en", subCategory.nameEn);
      data.append("subCategoryName_ar", subCategory.nameAr);
      data.append("category_Id", subCategory.categoryId);
      data.append("subCategoryPic", subCategory.subCategoryPic);

      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subCategory/createSubCategory",
        data
      );

      if (!response.data.error) {
        alert("Subcategory created!");
        setSubCategory({
          nameEn: "",
          nameAr: "",
          categoryId: "",
          subCategoryPic: null,
        });
        setSubCategoryList((prevList) => [...prevList, response.data.results]);
        // fetchData(); // Fetch updated subcategory list after creating a new subcategory
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subCategory/selectCategory"
      );
      setCategories(response.data.results.categoryData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subCategory/SubCategoryList"
      );
      setSubCategoryList(response?.data?.results?.list?.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSave();
  }, []);

  const handleUpdate = (id, nameEn, nameAr) => {
    console.log(nameEn, nameAr, id);
    setNewCategory({
      id,
      nameEn: nameEn,
      nameAr: nameAr,
    });
  };

  console.log("subcategory", subCategory);
  return (
    <>
      {/* <Sidebar/> */}
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
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <div className="form-group col-12">
                <label htmlFor="">Select Category</label>
                <select
                  className="select form-control"
                  size={15}
                  name="categoryId"
                  id="selectCategory"
                  value={subCategory.categoryId}
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
              <div className="form-group col">
                <label htmlFor="">Enter Sub Category Name (En)</label>
                <input
                  type="text"
                  className="form-control"
                  name="nameEn"
                  id="nameEn"
                  value={subCategory.nameEn}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col">
                <label htmlFor="">Enter Sub Category Name (Ar)</label>
                <input
                  type="text"
                  className="form-control"
                  name="nameAr"
                  id="nameAr"
                  value={subCategory.nameAr}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group col-auto">
                <div className="form-group mb-0 col choose_file position-relative">
                  <span>Upload Image</span>
                  <label
                    htmlFor="upload-video"
                    style={{ marginTop: "-1px", height: "63%" }}
                  >
                    <i className="fal fa-camera me-1"></i>
                    Choose File{" "}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="uploadImage"
                    id="uploadImage"
                    onChange={handleFileChange}
                    style={{ marginLeft: "10px", width: "95%" }}
                  />
                </div>
              </div>
              <div className="form-group col-auto">
                <button type="submit" className="comman_btn2">
                  Save
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
                        <th>Sub Category Name (EN)</th>
                        <th>Sub Category Name (AR)</th>
                        <th>Media</th>
                        <th>SHIPMENT SERVICE</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subCategoryList?.map((value, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{value?.category_Id?.categoryName}</td>
                          <td>{value?.subCategoryName_en}</td>
                          <td>{value.subCategoryName_ar}</td>
                          <td>
                            <img
                              className="table_img"
                              src={value?.subCategoryPic}
                              alt=""
                            />
                          </td>
                          <td>
                            <form className="table_btns d-flex align-items-center">
                              <div className="check_toggle">
                                <input
                                  defaultChecked
                                  type="checkbox"
                                  name={`s${index}`}
                                  id={`s${index}`}
                                  className="d-none"
                                />
                                <label htmlFor={`s${index}`}></label>
                              </div>
                            </form>
                          </td>
                          <td>
                            <form className="table_btns d-flex align-items-center">
                              <div className="check_toggle">
                                <input
                                  defaultChecked
                                  type="checkbox"
                                  name={`r${index}`}
                                  id={`r${index}`}
                                  className="d-none"
                                />
                                <label htmlFor={`r${index}`}></label>
                              </div>
                            </form>
                          </td>
                          <td>
                            <Link
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop4"
                              className="comman_btn2 table_viewbtn"
                              to=""
                              onClick={() =>
                                handleUpdate(
                                  value._id,
                                  value.subCategoryName,
                                  value.subCategoryName
                                )
                              }
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
      <EditValues newCategory={newCategory} />
    </>
  );
}

export default SubCategory;
