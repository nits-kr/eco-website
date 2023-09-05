import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import EditValues from "./EditValues";
import { useUpdateSubCategoryMutation } from "../services/Post";
import { useDeleteSubCategoryListMutation } from "../services/Post";
import Spinner from "./Spinner";

function SubCategory(props) {
  // const [update, res] = useUpdateSubCategoryMutation();
  const [deleteSubCategory, response] = useDeleteSubCategoryListMutation();
  const [itemId, setItemId] = useState("");
  const [subCategoryNameEn2, setSubCategoryNameEn2] = useState("");
  const [subCategoryNameAr2, setSubCategoryNameAr2] = useState("");
  const [image2, setImage2] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
    subCategoryId: "",
    subCategoryPic: null,
  });
  const [category, setCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId1: "",
    uploadImage: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubCategory({ ...subCategory, [name]: value });
  };

  const handleFileChange = (event) => {
    setSubCategory({ ...subCategory, subCategoryPic: event.target.files[0] });
    console.log("picture", event.target.files[0]);
  };
  const handleInputChange1 = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
    console.log("edit category value:  ", value);
  };
  const handleFileChange1 = (e, key) => {
    setCategory({ ...category, uploadImage: e.target.files[0] });
  };
  const url =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subCategory/SubCategoryList";
  const url2 =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subCategory/subCategorySearch";
  useEffect(() => {
    subCategoryManagementList();
  }, []);
  const subCategoryManagementList = () => {
    axios
      .post(url)
      .then((response) => {
        setSubCategoryList(response?.data?.results?.list?.reverse());
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
        setSubCategoryList([]);
        await Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            subCategoryManagementList();
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
            setSubCategoryList(filteredUsers);
          }
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

  useEffect(() => {
    handleSearch1();
  }, [searchQuery]);

  const handleSearch1 = async () => {
    try {
      const url1 = searchQuery !== "" ? url2 : url;
      const response = await axios.post(url1, {
        subCategoryName_en: searchQuery,
      });
      const { error, results } = response.data;
      if (error) {
        setSubCategoryList([]);
        Swal.fire({
          title: "Error!",
          // text: error.response.data,
          text: "Error searching for products. Data is not found",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            subCategoryManagementList();
          }
        });
        // throw new Error("Error searching for products. Data is not found.");
      } else {
        setSubCategoryList(
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
        Swal.fire({
          icon: "success",
          title: "Sub Category Created",
          text: "The Sub category has been created successfully.",
        });
        setSubCategory({
          nameEn: "",
          nameAr: "",
          categoryId: "",
          subCategoryPic: null,
        });
        subCategoryManagementList();
        setTimeout(() => {
          window?.location?.reload();
        }, 500);
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
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/category/list"
      );
      setCategories(response?.data?.results?.list);
      console.log(response?.data?.results?.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveChanges1 = (event) => {
    event.preventDefault();
    const formData = new FormData();
    // formData.append("subCategoryName_en", category.nameEn);
    // formData.append("subCategoryName_ar", category.nameAr);
    // formData.append("subCategoryPic", category.uploadImage);
    // formData.append("category_Id", category.categoryId1);
    if (category.nameEn) {
      formData.append("subCategoryName_en", category.nameEn);
    }

    if (category.nameAr) {
      formData.append("subCategoryName_ar", category.nameAr);
    }

    if (category.uploadImage) {
      formData.append("subCategoryPic", category.uploadImage);
    }

    if (category.categoryId1) {
      formData.append("category_Id", category.categoryId1);
    }
    axios
      .patch(
        `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subCategory/subCategoryUpdate/${itemId}`,
        formData
      )
      .then((response) => {
        console.log(response);
        if (!response.data.error) {
          Swal.fire({
            title: "Updated!",
            text: "Your have been updated the list successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleItem = (item) => {
    setSubCategoryNameEn2(item?.subCategoryName_en || "");
    setSubCategoryNameAr2(item?.subCategoryName_ar || "");
    setImage2(item?.category_Id?.categoryPic || "");
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
                  multiple=""
                  name="categoryId"
                  id="selectCategory"
                  value={subCategory.categoryId}
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
              <div className="form-group col">
                <label htmlFor="">
                  Enter Sub Category Name (En)
                  <span className="required-field text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nameEn"
                  id="nameEn"
                  value={subCategory.nameEn}
                  onChange={handleInputChange}
                  required
                  minLength="3"
                />
              </div>
              <div className="form-group col">
                <label htmlFor="">
                  Enter Sub Category Name (Ar)
                  <span className="required-field text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nameAr"
                  id="nameAr"
                  value={subCategory.nameAr}
                  onChange={handleInputChange}
                  required
                  minLength="3"
                />
              </div>

              <div className="form-group col-auto">
                <div className="form-group mb-0 col choose_file position-relative">
                  <span>Upload Image</span>
                  <label
                    htmlFor="uploadImage"
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
                    required
                    accept=".jpg, .jpeg, .png"
                  />
                  <div className="invalid-feedback">
                    Please choose a valid image file (JPG, JPEG, or PNG).
                  </div>
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
                        <th>Sub Category Name (EN)</th>
                        <th>Sub Category Name (AR)</th>
                        <th>Media</th>
                        {/* <th>SHIPMENT SERVICE</th> */}
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
                          {/* <td>
                            <form className="table_btns d-flex align-items-center">
                              <div className="check_toggle">
                                <input
                                  defaultChecked
                                  type="checkbox"
                                  name={`s${index}`}
                                  id={`s${index}`}
                                  className="d-none"
                                  data-bs-toggle="modal"
                                  data-bs-target="#staticBackdrop2"
                                />
                                <label htmlFor={`s${index}`}></label>
                              </div>
                            </form>
                          </td> */}
                          <td style={{ cursor: "not-allowed" }}>
                            <form className="table_btns d-flex align-items-center">
                              <div className="check_toggle">
                                <input
                                  defaultChecked={value?.status}
                                  type="checkbox"
                                  name={`r${index}`}
                                  id={`r${index}`}
                                  className="d-none"
                                  // data-bs-toggle="modal"
                                  // data-bs-target="#staticBackdrop3"
                                  disabled
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
                                    deleteSubCategory(value?._id);
                                    Swal.fire(
                                      "Deleted!",
                                      `${value?.subCategoryName_en}  item has been deleted.`,
                                      "success"
                                    ).then(() => {
                                      subCategoryManagementList();
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
                <div className="form-group col-12">
                  <label htmlFor="">Select Category</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name="categoryId1"
                    id="categoryId1"
                    // value={subCategory.categoryId}
                    onChange={handleInputChange1}
                    // onChange={(e) => setCategoryNew(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category?._id}>
                        {category?.categoryName_en}
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
                    defaultValue={subCategoryNameEn2}
                    // defaultValue={props.newCategory.nameEn}
                    onChange={handleInputChange1}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Enter Sub Category Name (Ar)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nameAr"
                    id="nameAr"
                    defaultValue={subCategoryNameAr2}
                    // defaultValue={props.newCategory.nameEn}
                    onChange={handleInputChange1}
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
                    // defaultValue={image2}
                    name="uploadImage"
                    id="uploadImage"
                    onChange={(e) => handleFileChange1(e, "uploadImage")}
                    // onChange={handleFileChange}
                  />
                  {image2}
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
      {/* <EditValues newCategory={newCategory} /> */}
    </>
  );
}

export default SubCategory;
