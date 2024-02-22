import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import {
  useCreateHelpMutation,
  useDeleteHelpManagementListMutation,
  useGetHelpListQuery,
} from "../services/Post";
import { useSelector } from "react-redux";

function Help() {
  const ecomAdmintoken = useSelector((data) => data?.local?.token);

  const { data: helpListdata, refetch: fetchHelpList } = useGetHelpListQuery({
    ecomAdmintoken,
  });

  const [addHelp] = useCreateHelpMutation();
  const [deleteHelp] = useDeleteHelpManagementListMutation();
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

  useEffect(() => {
    if (helpListdata) {
      setHelpList(helpListdata?.results?.list);
    }
  }, [helpListdata]);

  const handleCategoryInputChange = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubCategoryInputChange = (event) => {
    const { name, value } = event.target;
    setSubCategory({ ...subCategory, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      categoryName: category.categoryNameEn,
      subCategoryName: subCategory.nameEn,
      categoryName_ar: category.categoryNameAr,
      subCategoryName_ar: subCategory.nameAr,
      ecomAdmintoken: ecomAdmintoken,
    };

    try {
      const response = await addHelp(data);
      console.log(response.data.results.helpData);
      if (!response.data.error) {
        alert("Saved!");
        // handleSave();
        fetchHelpList();
      }
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
                          // onSubmit={handleSearch1}
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
                              // onClick={handleSearch1}
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
                      // onSubmit={handleSearch}
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
                              {helpList
                                ?.slice()
                                ?.reverse()
                                ?.map((value, index) => (
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
                                            confirmButtonText:
                                              "Yes, delete it!",
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              deleteHelp({
                                                id: value?._id,
                                                ecomAdmintoken,
                                              });
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
