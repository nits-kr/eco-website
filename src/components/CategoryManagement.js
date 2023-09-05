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
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import { useCatogaryStatusMutation } from "../services/Post";
import { useDeleteCategoryListMutation } from "../services/Post";

function CategoryManagement(props) {
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const [updateStatus] = useCatogaryStatusMutation();
  const [deleteCategory, response] = useDeleteCategoryListMutation();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    categoryPic: null,
  });
  const [newCategory, setNewCategory] = useState([]);

  const url =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/category/list";
  const url2 =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/category/search-category";
  useEffect(() => {
    categoryManagementList();
  }, []);

  const categoryManagementList = async (e) => {
    axios
      .post(url)
      .then((response) => {
        setCategoryList(response?.data?.results?.list?.reverse());
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
        setCategoryList([]);
        await Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            categoryManagementList();
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
            setCategoryList(filteredUsers);
          }
        });
      }
      setCategoryList(filteredUsers);
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
        categoryName_en: searchQuery,
      });
      const { error, results } = response.data;
      if (error) {
        setCategoryList([]);
        Swal.fire({
          title: "Error!",
          // text: error.response.data,
          text: "Error searching for products. Data is not found",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            categoryManagementList();
          }
        });
        // setCategoryList([]);
        // throw new Error("Error searching for products. Data is not found.");
      } else {
        setCategoryList(
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
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, categoryPic: event.target.files[0] });
  };
  console.log("set form data pic", formData.categoryPic);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("categoryName_en", formData.nameEn);
      data.append("categoryName_ar", formData.nameAr);
      data.append("categoryPic", formData.categoryPic);
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/category/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token-user": localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data.results.saveCategory);
      if (!response.data.error) {
        Swal.fire({
          icon: "success",
          title: "Category Created",
          text: "The category has been created successfully.",
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
    props.setProgress(10);
    setLoading(true);
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/category/list",
        null,
        {
          headers: {
            "x-auth-token-user": localStorage.getItem("token"),
          },
        }
      );
      setCategoryList(response.data.results.list.reverse());
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    props.setProgress(100);
    setLoading(false);
  };

  useEffect(() => {
    handleSave();
  }, []);

  const handleUpdate = (item) => {
    // console.log("category update data", nameEn, nameAr, categoryPic, id);
    setNewCategory({
      nameEn: item?.categoryName_en,
      nameAr: item?.categoryName_ar,
      categoryPic: item?.categoryPic,
      id: item?._id,
    });
  };

  const handleCheckboxChange = async (e, categoryId) => {
    e.preventDefault();
    console.log("handleSaveChanges1", categoryId);
    const newStatus = e.target.checked;

    const confirmationResult = await Swal.fire({
      title: "Confirm Status Change",
      text: "Do you want to change the status?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (confirmationResult.isConfirmed) {
      const editStatus = {
        id: categoryId,
        status: newStatus,
      };
      try {
        await updateStatus(editStatus);
        Swal.fire({
          title: "Changes Saved",
          text: "The Status has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } catch (error) {}
    }
  };

  return (
    <>
      {loading}
      <Sidebar Dash={"categories"} />
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
                                      <span className="required-field text-danger">
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="nameEn"
                                      id="name-en"
                                      value={formData.nameEn}
                                      onChange={handleInputChange}
                                      required
                                      minLength="3"
                                    />
                                  </div>
                                  <div className="form-group mb-0 col">
                                    <label htmlFor="name-ar">
                                      Enter Category Name (Ar)
                                      <span className="required-field text-danger">
                                        *
                                      </span>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="nameAr"
                                      id="name-ar"
                                      value={formData.nameAr}
                                      onChange={handleInputChange}
                                      required
                                      minLength="3"
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
                                      style={{
                                        marginLeft: "15px",
                                        width: "95%",
                                      }}
                                      // required
                                      // accept=".jpg, .jpeg, .png"
                                    />
                                  </div>
                                  <div className="invalid-feedback">
                                    Please choose a valid image file (JPG, JPEG,
                                    or PNG).
                                  </div>
                                  <div className="form-group mb-0 col-auto">
                                    <button
                                      className="comman_btn2"
                                      type="submit"
                                    >
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
                                    <form
                                      className="form-design"
                                      onSubmit={handleSearch1}
                                    >
                                      <div className="form-group mb-0 position-relative icons_set">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search"
                                          name="name"
                                          id="name"
                                          value={searchQuery}
                                          onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                          }
                                        />
                                        <i
                                          className="far fa-search"
                                          onClick={handleSearch1}
                                        ></i>
                                      </div>
                                    </form>
                                  </div>
                                  <div className="col-auto">
                                    <input
                                      type="date"
                                      className="custom_date"
                                      value={startDate1}
                                      onChange={(e) =>
                                        setStartDate1(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                {loading ? (
                                  <Spinner />
                                ) : (
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
                                              {/* <th>SHIPMENT SERVICE</th> */}
                                              <th>Status</th>
                                              <th>Action</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {(categoryList || [])?.map(
                                              (category, index) => (
                                                <tr key={category._id}>
                                                  <td>{index + 1}</td>
                                                  <td>
                                                    {category?.categoryName_en}
                                                  </td>
                                                  <td>
                                                    {category?.categoryName_ar}
                                                  </td>
                                                  <td>
                                                    <img
                                                      className="table_img"
                                                      src={category.categoryPic}
                                                      alt=""
                                                    />
                                                  </td>
                                                  {/* <td>
                                                    <form className="table_btns d-flex align-items-center">
                                                      <div className="check_toggle">
                                                        <input
                                                          className="d-none"
                                                          data-bs-toggle="modal"
                                                          data-bs-target="#staticBackdrop2"
                                                          defaultChecked={
                                                            category.shipmentService
                                                          }
                                                          type="checkbox"
                                                          name={`shipment_service_${category._id}`}
                                                          id={`shipment_service_${category._id}`}
                                                        />
                                                        <label
                                                          htmlFor={`shipment_service_${category._id}`}
                                                        ></label>
                                                      </div>
                                                    </form>
                                                  </td> */}
                                                  <td>
                                                    <form className="table_btns d-flex align-items-center">
                                                      <div className="check_toggle">
                                                        <input
                                                          className="d-none"
                                                          // data-bs-toggle="modal"
                                                          // data-bs-target="#staticBackdrop3"
                                                          defaultChecked={
                                                            category.status
                                                          }
                                                          type="checkbox"
                                                          name={`status_${category._id}`}
                                                          id={`status_${category._id}`}
                                                          onChange={(e) =>
                                                            handleCheckboxChange(
                                                              e,
                                                              category._id
                                                            )
                                                          }
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
                                                      className="comman_btn2 table_viewbtn me-2"
                                                      to=""
                                                      onClick={() =>
                                                        handleUpdate(
                                                          // category?.categoryName_en,
                                                          // category?.categoryName_ar,
                                                          // category?.categoryPic,
                                                          // category?._id
                                                          category
                                                        )
                                                      }
                                                    >
                                                      Edit
                                                    </Link>
                                                    <Link
                                                      className="comman_btn2 table_viewbtn"
                                                      // data-bs-toggle="modal"
                                                      // data-bs-target="#delete"
                                                      to="#"
                                                      onClick={() => {
                                                        Swal.fire({
                                                          title:
                                                            "Are you sure?",
                                                          text: "You won't be able to revert this!",
                                                          icon: "warning",
                                                          showCancelButton: true,
                                                          confirmButtonColor:
                                                            "#3085d6",
                                                          cancelButtonColor:
                                                            "#d33",
                                                          confirmButtonText:
                                                            "Yes, delete it!",
                                                        }).then((result) => {
                                                          if (
                                                            result.isConfirmed
                                                          ) {
                                                            deleteCategory(
                                                              category?._id
                                                            );
                                                            Swal.fire(
                                                              "Deleted!",
                                                              `${category?.categoryName_en}  item has been deleted.`,
                                                              "success"
                                                            ).then(() => {
                                                              categoryManagementList();
                                                            });
                                                          }
                                                        });
                                                      }}
                                                    >
                                                      Delete
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
                                )}
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
