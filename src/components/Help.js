import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { useDeleteHelpManagementListMutation } from "../services/Post";

function Help() {
  const [deleteHelp, response] = useDeleteHelpManagementListMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [helpList, setHelpList] = useState([]);
  const [category, setCategory] = useState({
    categoryNameEn: "",
    categoryNameAr: "",
  });

  const [subCategory, setSubCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const url =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/help/help/list";
  const url2 =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/help/help/helpSearch";
  useEffect(() => {
    fetchHelpList();
  }, []);
  const fetchHelpList = async () => {
    const { data } = await axios.post(url);
    setHelpList(data.results.list.reverse());
  };
  const handleCategoryInputChange = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubCategoryInputChange = (event) => {
    const { name, value } = event.target;
    setSubCategory({ ...subCategory, [name]: value });
  };

  useEffect(() => {
    handleSearch1();
  }, [searchQuery]);

  const handleSearch1 = async () => {
    try {
      const url1 = searchQuery !== "" ? url2 : url;
      const response = await axios.post(url1, {
        categoryName: searchQuery,
      });
      const { error, results } = response.data;
      if (error) {
        setHelpList([]);
        Swal.fire({
          title: "Error!",
          // text: error.response.data,
          text: "Error searching for products. Data is not found",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            fetchHelpList();
          }
        });
        // throw new Error("Error searching for products. Data is not found.");
      } else {
        setHelpList(
          searchQuery !== "" ? results?.searchData : results?.list?.reverse()
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
        setHelpList([]);
        await Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            fetchHelpList();
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
            setHelpList(filteredUsers);
          }
        });
      }
      setHelpList(filteredUsers);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  useEffect(() => {
    userList2();
  }, [startDate1]);

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .post(url, {
        from: startDate,
        to: endDate,
      })
      .then((response) => {
        const list = response?.data?.results?.list?.reverse();
        if (list && list.length > 0) {
          Swal.fire({
            title: "List Found!",
            text: "list is available for the selected date.",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              setHelpList(list);
            }
          });
          // setHelpList(list);
        } else {
          setHelpList([]);
          Swal.fire({
            icon: "warning",
            title: "No data found!",
            text: "There is no list between the selected dates.",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              fetchHelpList();
            }
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/help/help/createHelp",
        {
          categoryName: category.categoryNameEn,
          subCategoryName: subCategory.nameEn,
          categoryName_ar: category.categoryNameAr,
          subCategoryName_ar: subCategory.nameAr,
        }
      );
      console.log(response.data.results.helpData);
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
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/help/help/list"
      );
      setHelpList(response.data.results.list.reverse());
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Sidebar Dash={"help"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row help&support-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>Add New Help Category </h2>
                      </div>
                    </div>
                    <form
                      className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                      onSubmit={handleSubmit}
                    >
                      <div className="form-group col-6">
                        <label htmlFor="">
                          Category (En)
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="categoryNameEn"
                          id="categoryNameEn"
                          value={category.categoryNameEn}
                          onChange={handleCategoryInputChange}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="">
                          Category (Ar)
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="categoryNameAr"
                          id="categoryNameAr"
                          value={category.categoryNameAr}
                          onChange={handleCategoryInputChange}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group mb-0 col">
                        <label htmlFor="">
                          Sub Category (En)
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="nameEn"
                          id="nameEn"
                          value={subCategory.nameEn}
                          onChange={handleSubCategoryInputChange}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group mb-0 col">
                        <label htmlFor="">
                          Sub Category (Ar)
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="nameAr"
                          id="nameAr"
                          value={subCategory.nameAr}
                          onChange={handleSubCategoryInputChange}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group mb-0 col-auto">
                        <button className="comman_btn2">Add</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>Help</h2>
                      </div>
                      <div className="col-3 Searchbox">
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
                          onChange={(e) => setStartDate1(e.target.value)}
                        />
                      </div>
                    </div>
                    <form
                      className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                      action=""
                      onSubmit={handleSearch}
                    >
                      <div className="form-group mb-0 col-5">
                        <label htmlFor="">From</label>
                        <input
                          type="date"
                          className="form-control"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-0 col-5">
                        <label htmlFor="">To</label>
                        <input
                          type="date"
                          className="form-control"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-0 col-auto">
                        <button
                          className="comman_btn2"
                          disabled={startDate > endDate}
                        >
                          Search
                        </button>
                      </div>
                    </form>
                    <div className="row">
                      <div className="col-12 comman_table_design px-0">
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Category (En)</th>
                                <th>Category (Ar)</th>
                                <th>Sub Category (En)</th>
                                <th>Sub Category (Ar)</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {helpList.map((value, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{value?.categoryName}</td>
                                  <td>{value?.categoryName_ar}</td>
                                  <td>{value?.subCategoryName}</td>
                                  <td>{value?.subCategoryName_ar}</td>
                                  <td>
                                    <Link
                                      className="comman_btn table_viewbtn me-2"
                                      to="/help-view"
                                    >
                                      View
                                    </Link>
                                    <Link
                                      className="comman_btn2 table_viewbtn"
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
                                            deleteHelp(value?._id);
                                            Swal.fire(
                                              "Deleted!",
                                              `${value?.categoryName}  item has been deleted.`,
                                              "success"
                                            ).then(() => {
                                              fetchHelpList();
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Help;
