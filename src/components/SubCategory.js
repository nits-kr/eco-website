import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import EditValues from "./EditValues";
import { useUpdateSubCategoryMutation } from "../services/Post";
import Spinner from "./Spinner";

function SubCategory(props) {
  const [loading, setLoading] = useState(false);
  const [update, res] = useUpdateSubCategoryMutation();
  const [itemId, setItemId] = useState("");
  const [editSubCategoryNameEn, setEditSubCategoryNameEn] = useState("");
  const [editSubCategoryNameAr, setEditSubCategoryNameAr] = useState("");
  console.log("update sub category", update);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryNew, setCategoryNew] = useState([]);
  const [subCategory, setSubCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    subCategoryId: "",
    subCategoryPic: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [newCategory, setNewCategory] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubCategory({ ...subCategory, [name]: value });
  };

  const handleFileChange = (event) => {
    setSubCategory({ ...subCategory, subCategoryPic: event.target.files[0] });
    console.log("picture", event.target.files[0]);
  };

  const userList2 = async () => {
    if (!startDate1) return;
    try {
      const { data } = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subCategory/SubCategoryList",
        {
          startDate1,
        }
      );
      const filteredUsers = data?.results?.list?.filter(
        (user) =>
          new Date(user?.createdAt?.slice(0, 10)).toISOString().slice(0, 10) ===
          new Date(startDate1).toISOString().slice(0, 10)
      );
      if (filteredUsers.length === 0) {
        Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
      setSubCategoryList(filteredUsers);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  useEffect(() => {
    userList2();
  }, [startDate1]);

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
        // setSubCategoryList((prevList) => [...prevList, response.data.results]);
        // fetchData(); // Fetch updated subcategory list after creating a new subcategory
        handleSave();
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
    // props.setProgress(10);
    // setLoading(true);
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subCategory/SubCategoryList"
      );
      setSubCategoryList(response?.data?.results?.list?.reverse());
    } catch (error) {
      console.error(error);
    }
    // props.setProgress(100);
    // setLoading(false);
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

  const handleSaveChanges1 = async (e) => {
    e.preventDefault();
    console.log("handleSaveChanges1", itemId);
    const editAddress = {
      id: itemId,
      subCategoryName_en: editSubCategoryNameEn,
      subCategoryName_ar: editSubCategoryNameAr,
      category_Id: subCategory.categoryId,
    };
    // const editAddress = new FormData();
    // editAddress.append("id", itemId);
    // editAddress.append("subCategoryName_en", editSubCategoryNameEn);
    // editAddress.append("subCategoryName_en", editSubCategoryNameAr);
    // editAddress.append("subCategoryPic", subCategory.subCategoryPic);
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
  return (
    <>
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
                        {category.categoryName_en}
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
                          <td>{value?.category_Id?.categoryName_en}</td>
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
                              data-bs-target="#staticBackdrop10"
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
      <div
        className="modal fade Edit_modal"
        id="staticBackdrop10"
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
                Edit Sub Category
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
              >
                {/* <div className="form-group col-12">
                  <label htmlFor="">Select Category</label>
                  <select
                    className="select form-control"
                    multiple
                    name="categoryId"
                  id="selectCategory"
                  value={subCategory.categoryId}
                  onChange={handleInputChange}
                  >
                    <option defaultValue="1">Lorem</option>
                    <option defaultValue="2">ipsum</option>
                    <option defaultValue="3">Lorem</option>
                    <option defaultValue="1">Lorem</option>
                    <option defaultValue="2">ipsum</option>
                    <option defaultValue="3">Lorem</option>
                  </select>
                </div> */}
                <div className="form-group col-12">
                  <label htmlFor="">Select Category</label>
                  <select
                    className="select form-control"
                    size={15}
                    name="categoryId"
                    id="categoryId"
                    value={subCategory.categoryId}
                    onChange={handleInputChange}
                    // onChange={(e) => setCategoryNew(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Enter Subcategory Category Name (En)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nameEn"
                    id="nameEn"
                    defaultValue=""
                    onChange={(e) => setEditSubCategoryNameEn(e.target.value)}
                    // onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Enter Sub Category Name (Ar)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nameAr"
                    id="nameAr"
                    defaultValue=""
                    onChange={(e) => setEditSubCategoryNameAr(e.target.value)}
                    // onChange={(e) => setEditSubCategoryName(e.target.value)}
                    // onChange={handleInputChange}
                  />
                </div>

                <div className="form-group col-12 choose_file position-relative">
                  <span>Upload Image</span>
                  <label htmlFor="upload_video">
                    <i className="fal fa-camera me-1"></i>Choose File{" "}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    defaultValue=""
                    name="uploadImage"
                    id="uploadImage"
                    onChange={(e) => handleFileChange(e, "uploadImage")}
                    // onChange={handleFileChange}
                  />
                </div>
                <div className="form-group mb-0 col-auto">
                  <button className="comman_btn2" onClick={handleSaveChanges1}>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <EditValues newCategory={newCategory} /> */}
    </>
  );
}

export default SubCategory;
