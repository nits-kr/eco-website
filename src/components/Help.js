import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios";
import Swal from "sweetalert2";

function Help() {
    const [searchQuery, setSearchQuery] = useState("");
    const [helpList, setHelpList] = useState([]);
    const [category, setCategory] = useState({
        categoryNameEn: '',
        categoryNameAr: ''
    });

    const [subCategory, setSubCategory] = useState({
        nameEn: '',
        nameAr: '',
        categoryId: '',
    });
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    axios.defaults.headers.common["x-auth-token-user"] =
        localStorage.getItem("token");
    const handleCategoryInputChange = (event) => {
        const { name, value } = event.target;
        setCategory({ ...category, [name]: value });
    };

    const handleSubCategoryInputChange = (event) => {
        const { name, value } = event.target;
        setSubCategory({ ...subCategory, [name]: value });
    };
    const handleSearchCategoryName = async (e) => {
        e.preventDefault();
        if (searchQuery) {
          try {
            const response = await axios.post(
              "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/help/help/helpSearch",
              {
                categoryName: searchQuery,
              }
            );
            const { error, results } = response.data;
            if (error) {
              throw new Error("Error searching for products.");
            } else {
                setHelpList(results.searchData);
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
          helpList([]);
        }
      };
    useEffect(() => {
        userList();
    }, []);
    const userList = async () => {
        const { data } = await axios.post("http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/help/help/list", {
            startDate,
            endDate,
        });
        const filteredUsers = data.results.list.filter(
            (user) =>
                new Date(user.createdAt) >= new Date(startDate) &&
                new Date(user.createdAt) <= new Date(endDate)
        );
        setHelpList(filteredUsers.reverse());
        console.log(data);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        userList();
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/help/help/createHelp",
                {
                    categoryName: category.categoryNameEn,
                    subCategoryName: subCategory.nameEn
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
                "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/help/help/list",
            );
            setHelpList(response.data.results.list.reverse());
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
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
                                                <label htmlFor="">Category (En)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="categoryNameEn"
                                                    id="categoryNameEn"
                                                    value={category.categoryNameEn}
                                                    onChange={handleCategoryInputChange}
                                                />
                                            </div>
                                            <div className="form-group col-6">
                                                <label htmlFor="">Category (Ar)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="categoryNameAr"
                                                    id="categoryNameAr"
                                                    value={category.categoryNameAr}
                                                    onChange={handleCategoryInputChange}
                                                />
                                            </div>
                                            <div className="form-group mb-0 col">
                                                <label htmlFor="">Sub Category (En)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="nameEn"
                                                    id="nameEn"
                                                    value={subCategory.nameEn}
                                                    onChange={handleSubCategoryInputChange}
                                                />
                                            </div>
                                            <div className="form-group mb-0 col">
                                                <label htmlFor="">Sub Category (Ar)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="nameAr"
                                                    id="nameAr"
                                                    value={subCategory.nameAr}
                                                    onChange={handleSubCategoryInputChange}
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
                                                <form className="form-design" action="" onSubmit={handleSearchCategoryName} >
                                                    <div className="form-group mb-0 position-relative icons_set">
                                                        <input type="text" className="form-control" placeholder="Search" name="name" id="name"
                                                        value={searchQuery}
                                                        onChange={(e) =>
                                                          setSearchQuery(e.target.value)
                                                        }
                                                        />
                                                        <i className="far fa-search"></i>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-auto">
                                                <input type="date" className="custom_date" />
                                            </div>
                                        </div>
                                        <form
                                            className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                                            action="" onSubmit={handleSearch}>
                                            <div className="form-group mb-0 col-5">
                                                <label htmlFor="">From</label>
                                                <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                                            </div>
                                            <div className="form-group mb-0 col-5">
                                                <label htmlFor="">To</label>
                                                <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                                            </div>
                                            <div className="form-group mb-0 col-auto">
                                                <button className="comman_btn2" disabled={startDate > endDate}>Search</button>
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
                                                                    <td>{value.categoryName}</td>
                                                                    <td>{value.categoryName}</td>
                                                                    <td>{value.subCategoryName}</td>
                                                                    <td>{value.subCategoryName}</td>
                                                                    <td>
                                                                        <Link className="comman_btn table_viewbtn"
                                                                         to="/help-view">View</Link>
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
    )
}

export default Help
