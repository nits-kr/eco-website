import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SubCategory from "../SubCategory";
import SubSubCategory from "../SubSubCategory";
import Attribute from "../Attribute";
//import EditValues from "./EditValues";
import EditCategory from "../EditCategory";
import Value from "../Value";
import EditSubCategory from "../EditSubCategory";
//import EditSubSubCategory from "./EditSubSubCategory";
import EditAttribute from "../EditAttribute";
import Swal from "sweetalert2";
import Sidebar from "../Sidebar";
import Spinner from "../Spinner";
import { useCatogaryStatusMutation } from "../../services/Post";
import { useDeleteCategoryListMutation } from "../../services/Post";
import { useDeleteBrabdListMutation } from "../../services/Post";
import { useUpdateBrandMutation } from "../../services/Post";

function BrandManagement(props) {
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const [updateStatus] = useCatogaryStatusMutation();
  const [deleteCategory, response] = useDeleteCategoryListMutation();
  const [editBrand] = useUpdateBrandMutation();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [deleteBrand, res] = useDeleteBrabdListMutation();
  const [nameEn1, setNameEn1] = useState([]);
  const [nameAr1, setNameAr1] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pic1, setPic1] = useState([]);
  const [id1, setId1] = useState([]);
  localStorage?.setItem("brandId", id1);
  console.log(id1);
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    categoryPic: null,
  });
  const [category, setCategory] = useState({
    nameEn1: "",
    nameAr1: "",
    uploadImage1: null,
  });
  const [subCategory, setSubCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
    subCategoryId: "",
    subCategoryPic: null,
  });
  const handleInputChange1 = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
    console.log("edit category value:  ", value);
  };
  const handleFileChange1 = (e, key) => {
    setCategory({ ...category, uploadImage1: e.target.files[0] });
  };
  console.log(category?.uploadImage1);
  const handleUpdate1 = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("brandName_en", category?.nameEn1);
    formData.append("brandName_ar", category?.nameAr1);
    formData.append("brandPic", category?.uploadImage1);
    axios
      .post(
        `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/edit-brand/${id1}`,
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

  // const handleUpdate1 = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('brandName_en', category?.nameEn1);
  //   formData.append('brandName_ar', category?.nameAr1);
  //   formData.append('brandPic', category?.uploadImage1);

  //   try {
  //     const response = await editBrand(id1, formData);
  //     console.log(response);
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //   }
  // };

  const url =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/brand-list";
  const url2 =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/search-brand";
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
        brandName_en: searchQuery,
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
          searchQuery !== "" ? results?.brandData : results?.list?.reverse()
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
  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setSubCategory({ ...subCategory, [name]: value });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, categoryPic: event.target.files[0] });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("category_Id", subCategory.categoryId);
      data.append("brandName_en", formData.nameEn);
      data.append("brandName_ar", formData.nameAr);
      data.append("brandPic", formData.categoryPic);
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/addBrand",
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
          title: "Changes Saved",
          text: "The Brand has been added successfully.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        handleSave();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/brand-list",
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
  };

  useEffect(() => {
    handleSave();
  }, []);

  const handleUpdate = (item) => {
    setNameEn1(item?.brandName_en);
    setNameAr1(item?.brandName_ar);
    setPic1(item?.brandPic);
    // setId1(item?._id);
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
      <Sidebar Dash={"brand-management"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row category-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Brand Management</h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 px-0">
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
                                    <h2>Add New Brand</h2>
                                  </div>
                                </div>
                                <form
                                  className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                                  onSubmit={handleSubmit}
                                >
                                  {/* <div className="form-group mb-0 col-6">
                                    <label htmlFor="name-en">
                                      Enter Category Name
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
                                  </div> */}
                                  <div className="form-group mb-0 col-6">
                                    <label htmlFor="">Select Category</label>
                                    <select
                                      className="select form-control"
                                      multiple=""
                                      name="categoryId"
                                      id="selectCategory"
                                      value={subCategory.categoryId}
                                      onChange={handleInputChange2}
                                    >
                                      <option value="">Select Category</option>
                                      {Array.isArray(categories) &&
                                        categories.map((category) => (
                                          <option
                                            key={category._id}
                                            value={category._id}
                                          >
                                            {category.categoryName_en}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                  <div className="form-group mb-0 col-6">
                                    <label htmlFor="name-en">
                                      Enter Brand Name (En)
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
                                  <div className="form-group mb-0 mt-3 col">
                                    <label htmlFor="name-ar">
                                      Enter Brand Name (Ar)
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
                                  <div className="form-group mb-0 mt-3 col choose_file position-relative">
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
                                      required
                                      accept=".jpg, .jpeg, .png"
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
                                    <h2>Brand List</h2>
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
                                              <th>Brand Name (En)</th>
                                              <th>Brand Name (Ar)</th>
                                              <th>Category Name</th>
                                              <th>Media</th>
                                              {/* <th>SHIPMENT SERVICE</th> */}
                                              {/* <th>Status</th> */}
                                              <th>Action</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {(categoryList || [])?.map(
                                              (category, index) => (
                                                <tr key={category._id}>
                                                  <td>{index + 1}</td>
                                                  <td>
                                                    {category?.brandName_en}
                                                  </td>
                                                  <td>
                                                    {category?.brandName_ar}
                                                  </td>
                                                  <td> {category?.category_Id?.categoryName_en} </td>
                                                  <td>
                                                    <img
                                                      className="table_img"
                                                      src={category?.brandPic}
                                                      alt=""
                                                    />
                                                  </td>
                                                  
                                                  {/* <td>
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
                                                  </td> */}
                                                  <td>
                                                    <Link
                                                      data-bs-toggle="modal"
                                                      data-bs-target="#staticBackdrop"
                                                      className="comman_btn2 table_viewbtn me-2"
                                                      to=""
                                                      onClick={() => {
                                                        handleUpdate(category);
                                                        setId1(category?._id);
                                                      }}
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
                                                            deleteBrand(
                                                              category?._id
                                                            );
                                                            Swal.fire(
                                                              "Deleted!",
                                                              `${category?.brandName_en}  item has been deleted.`,
                                                              "success"
                                                            ).then(() => {
                                                              const updatedOfferList =
                                                                categoryList.filter(
                                                                  (offer) =>
                                                                    offer._id !==
                                                                    category?._id
                                                                );
                                                              setCategoryList(
                                                                updatedOfferList
                                                              );
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
        className="modal fade Edit_modal"
        id="staticBackdrop"
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
                Edit Brand
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
                onSubmit={handleUpdate1}
              >
                <div className="form-group col-6">
                  <label htmlFor="">Enter Brand Name (En)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nameEn1"
                    id="nameEn1"
                    defaultValue={nameEn1}
                    onChange={handleInputChange1}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Enter Brand Name (Ar)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nameAr1"
                    id="nameAr1"
                    defaultValue={nameAr1}
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
                    // defaultValue={props?.newCategory?.categoryPic}
                    name="uploadImage"
                    id="uploadImage"
                    onChange={(e) => handleFileChange1(e, "uploadImage")}
                  />
                  {pic1}
                </div>
                <div className="form-group mb-0 col-auto">
                  <button type="submit" className="comman_btn2">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BrandManagement;
