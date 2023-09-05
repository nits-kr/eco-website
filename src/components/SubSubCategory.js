import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
//import EditValues from "./EditValues";
import EditSubSubCategory from "./EditSubSubCategory";
import { useDeleteSubSubCategoryListMutation } from "../services/Post";

function SubSubCategory() {
  const [deleteSubSubCategory, res] = useDeleteSubSubCategoryListMutation();
  const [startDate, setStartDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [subSubCategoryList, setSubSubCategoryList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
  });
  const [newCategory, setNewCategory] = useState([]);
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const url =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subSubCategory/subSubCategoryList";
  const url2 =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subSubCategory/subSubCategorySearch";
  useEffect(() => {
    subSubCategoryManagementList();
  }, []);
  const subSubCategoryManagementList = () => {
    axios
      .post(url)
      .then((response) => {
        setSubSubCategoryList(response?.data?.results?.list?.reverse());
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
        setSubSubCategoryList([]);
        await Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            subSubCategoryManagementList();
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
            setSubSubCategoryList(filteredUsers);
          }
        });
      }
      setSubSubCategoryList(filteredUsers);
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
        subSubCategoryName_en: searchQuery,
      });
      const { error, results } = response.data;
      if (error) {
        setSubSubCategoryList([]);
        Swal.fire({
          title: "Error!",
          // text: error.response.data,
          text: "Error searching for products. Data is not found",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            subSubCategoryManagementList();
          }
        });
        // throw new Error("Error searching for products. Data is not found.");
      } else {
        setSubSubCategoryList(
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
    setSubSubCategory({ ...subSubCategory, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subSubCategory/createSubSubCategory",
        {
          subSubCategoryName_en: subSubCategory.nameEn,
          subSubCategoryName_ar: subSubCategory.nameAr,
          category_Id: subSubCategory.categoryId,
          subCategory_Id: subSubCategory.categoryId1,
        }
      )
      .then((response) => {
        console.log(response?.data?.results?.saveSubSubCategory);
        if (!response.data.error) {
          Swal.fire({
            icon: "success",
            title: "Sub Sub Category Created",
            text: "The Sub Sub Category has been created successfully.",
          });
          handleSave();
          setTimeout(() => {
            window?.location?.reload();
          }, 500);
        } else {
          alert("Errors in response!");
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
          `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subCategory/selectCategory/${subSubCategory.categoryId}`
        );
        setSubCategories(response.data.results.categoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [subSubCategory.categoryId]);
  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subSubCategory/subSubCategoryList"
      );

      setSubSubCategoryList(response?.data?.results?.list.reverse());
      console.log("sub sub category data", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("sub subCategory list", subSubCategory);
  useEffect(() => {
    handleSave();
  }, []);

  const handleUpdate = (item) => {
    console.log(item);
    setNewCategory({
      nameEn: item?.subSubCategoryName_en,
      nameAr: item?.subSubCategoryName_ar,
      id: item?._id,
      id1: item?.category_Id,
      id2: item?.subCategory_Id,
    });
  };

  return (
    <>
      {/* <Sidebar/> */}
      <div
        className="tab-pane fade"
        id="nav-contact"
        role="tabpanel"
        aria-labelledby="nav-contact-tab"
      >
        <div className="row p-4 mx-0">
          <div className="col-12 mb-4 inner_design_comman border">
            <div className="row comman_header justify-content-between">
              <div className="col-auto">
                <h2>Add New Sub Sub Category</h2>
              </div>
            </div>
            <form
              className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
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
                  value={subSubCategory.categoryId}
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
                  value={subSubCategory.categoryId1}
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
              <div className="form-group col">
                <label htmlFor="">
                  Enter Sub Sub Category Name (En)
                  <span className="required-field text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nameEn"
                  id="nameEn"
                  value={subSubCategory.nameEn}
                  onChange={handleInputChange}
                  required
                  // minLength="3"
                />
              </div>
              <div className="form-group col">
                <label htmlFor="">
                  Enter Sub Sub Category Name (Ar)
                  <span className="required-field text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nameAr"
                  id="nameAr"
                  value={subSubCategory.nameAr}
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
                <h2>Sub Sub Categories List</h2>
              </div>
              <div className="col-3">
                <form
                  className="form-design"
                  action=""
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
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <i className="far fa-search" onClick={handleSearch1}></i>
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
                        <th>Sub Sub Category Name (EN)</th>
                        <th>Sub Sub Category Name (AR)</th>
                        {/* <th>SHIPMENT SERVICE</th> */}
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subSubCategoryList?.map((value, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{value.category_Id?.categoryName_en}</td>
                          <td>{value?.subCategory_Id?.subCategoryName_en}</td>
                          <td>{value?.subSubCategoryName_en}</td>
                          <td>{value?.subSubCategoryName_ar}</td>
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
                              data-bs-target="#staticBackdrop5"
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
                                    deleteSubSubCategory(value?._id);
                                    Swal.fire(
                                      "Deleted!",
                                      `${value?.subSubCategoryName_en}  item has been deleted.`,
                                      "success"
                                    ).then(() => {
                                      subSubCategoryManagementList();
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
      <EditSubSubCategory newCategory={newCategory} />
    </>
  );
}
export default SubSubCategory;
