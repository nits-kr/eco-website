import React, { useState } from "react";
import { default as ReactSelect } from "react-select";
// import AdminHeader from "../commonComponent.jsx/adminHeader";
// import AdminSidebar from "../commonComponent.jsx/adminSidebar";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import moment from "moment";
import { MDBDataTable } from "mdbreact";
import { useEffect } from "react";
import {
  useCreateStaffMutation,
  useGetAllStaffMutation,
  useStaffDetailsMutation,
  useStaffStatusMutation,
  useUpdateStaffMutation,
} from "../../services/Post";
import Sidebar from "../Sidebar";
import { FadeLoader } from "react-spinners";
import { useSelector } from "react-redux";
import FadeSpinner from "../allSpinners/FadeSpinner";
import { Spinner } from "react-bootstrap";

function Staff() {
  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  const ml = useSelector((data) => data?.local?.header);

  let [loading, setLoading] = useState(false);

  const [values, setValues] = useState({ from: "", to: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [sideBar, setSideBar] = useState(true);
  const [selectEditOptions1, setSelectEditOptions1] = useState([]);
  const [AddStaff] = useCreateStaffMutation();
  const [getAllStaff] = useGetAllStaffMutation();
  const [getStaffDetails] = useStaffDetailsMutation();
  const [updateStaff] = useUpdateStaffMutation();
  const [changeStaffStatus] = useStaffStatusMutation();

  const [info, setInfo] = useState([]);
  console.log("info", info);
  const [ids, setIds] = useState();
  const options = [
    { value: "dashboard", label: "Dashboard" },
    { value: "user", label: "User Management" },
    {
      value: "category",
      label: "Categories Management",
    },
    { value: "offer", label: "Offers Management" },
    { value: "order", label: "Orders Management" },
    { value: "staff", label: "Staff Management" },
    { value: "transaction", label: "Transaction Management" },
    { value: "addproduct", label: "Add New Product" },
    { value: "productlist", label: "Product List" },
    { value: "banners", label: "Banner Management" },
    { value: "brand", label: "Brand Management" },
    { value: "agent", label: "Agent Management" },
    { value: "notification", label: "Notifications Management" },
    { value: "announcement", label: "Announcements Management" },
    { value: "thoughts", label: "Thoughts Management" },
    { value: "content", label: "Content Management" },
    { value: "coupan", label: "Coupan Management" },
    { value: "information", label: "Information Management" },
    { value: "configure", label: "Configurations" },
    { value: "contactus", label: "Contact-Us" },
    { value: "help", label: "Help&Support Management" },
  ];
  const [selectOptions, setSelectOptions] = useState([]);
  const [expandedProductIndex, setExpandedProductIndex] = useState(null);
  const [accessmore, setAccessmore] = useState([]);

  const [staffId, setStaffId] = useState();
  const [staff, setStaff] = useState({
    columns: [
      {
        label: "S.NO",
        field: "sn",
        sort: "asc",
        width: 100,
      },
      {
        label: "DATE",
        field: "date",
        sort: "asc",
        width: 100,
      },
      {
        label: "STAFF NAME",
        field: "name",
        sort: "asc",
        width: 150,
      },

      {
        label: "EMAIL",
        field: "email",
        sort: "asc",
        width: 100,
      },
      {
        label: "MODULES",
        field: "module",
        sort: "asc",
        width: 150,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [],
  });

  useEffect(() => {
    getStaff();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset: reset2,
  } = useForm();

  const EditStaff = async (i) => {
    setIds(i);
    const { data } = await getStaffDetails({ i, ecomAdmintoken });
    if (!data?.error) {
      let info = data?.results?.staffMember;

      reset2({
        editName: info.staffName,
        editEmail: info.userEmail,
        // password: info[i]?.question_en.replace(/<\/?p>/g, ""),
        // confirmPassword: info[i]?.answer_en.replace(/<\/?p>/g, ""),
      });

      let types = [];
      info?.modules?.map((itm) => {
        types.push({ value: itm, label: itm });
      });
      setSelectEditOptions1({
        optionSelected: types,
      });
    }
  };

  const handleChange = (selected) => {
    setSelectOptions({
      optionSelected: selected,
    });
  };

  function togglePassword() {
    var x = document.getElementById("password-Input");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  function togglePassword2() {
    var x = document.getElementById("password-Input2");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  const onSubmit = async (data) => {
    if (
      data?.ConfirmPassword !== data?.NewPassword &&
      data?.NewPassword !== data?.ConfirmPassword
    ) {
      Swal.fire({
        title: "Error",
        text: "Confirm password should be the same as New password",
        icon: "warning",
        button: "okay",
        confirmButtonColor: "#e25829",
      });
      return;
    }

    console.log(data, selectOptions);
    setLoading(true);
    const alldata = {
      staffName: data?.name?.trim(),
      userEmail: data?.email?.trim(),
      modules: (selectOptions.optionSelected || [])?.map((item) => item?.value),
      password: data?.NewPassword,
      confirm_password: data?.ConfirmPassword,
      type: "subAdmin",
      ecomAdmintoken: ecomAdmintoken,
    };
    const response = await AddStaff(alldata);
    setLoading(false);
    console.log("response add staff", response);
    if (response?.data?.message === "Success") {
      setSelectOptions({ optionSelected: [] });

      Swal.fire({
        title: "Success",
        text: "Staff added successfully",
        icon: "success",
        confirmButtonColor: "#e25829",
      });

      getStaff();
    } else if (
      response?.error?.data?.message === "Staff with this email already exists"
    ) {
      Swal.fire({
        title: "Error",
        text: "A staff member with this email already exists. Please use a different email address.",
        icon: "error",
        confirmButtonColor: "#e25829",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "An error occurred while adding staff. Please try again.",
        icon: "error",
        confirmButtonColor: "#e25829",
      });
    }
  };

  useEffect(() => {
    getStaff();
  }, [searchQuery]);

  const getStaff = async (date) => {
    const data = {
      year: date,
      from: values.from,
      to: values.to,
      search: searchQuery,
      ecomAdmintoken: ecomAdmintoken,
    };
    await getAllStaff(data).then((res) => {
      const newRows = [];
      if (res) {
        let data = res?.data?.results?.list;
        console.log("data", data);
        setInfo(res?.data?.results?.list);
        data?.map((list, index) => {
          const returnData = {};
          returnData.sn = index + 1;
          returnData.name = list?.staffName;
          returnData.email = list?.userEmail;
          returnData.date = moment(list?.createdAt).format("L");
          // returnData.module = (
          //   <ol>
          //     {list?.access?.map((li, ind) => (
          //       <li key={ind}>{li}</li>
          //     ))}
          //   </ol>
          // );

          returnData.module = (
            <div>
              <ol>
                {list?.modules?.slice(0, 3).map((li, ind) => (
                  <li key={ind}>{li}</li>
                ))}
              </ol>
              {list?.modules?.length > 3 && (
                <button
                  type="button"
                  className="read-more-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropreportmore"
                  onClick={() => showMoreAccess(list?.modules)}
                  style={{ borderRadius: "5px" }}
                >
                  Read more...
                </button>
              )}
            </div>
          );

          returnData.status = (
            <div className="check_toggle" key={list?._id}>
              <input
                type="checkbox"
                // defaultChecked={list?.status}
                checked={list?.status}
                name="check1"
                id={list?._id}
                className="d-none"
                onClick={() => {
                  handleStaffStatus(list?._id, list?.status);
                }}
              />
              <label for={list?._id}></label>
            </div>
          );

          returnData.action = (
            <>
              <a
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                className="comman_btn2 table_viewbtn"
                onClick={() => EditStaff(list?._id)}
              >
                Edit
              </a>
            </>
          );
          newRows.push(returnData);
        });

        setStaff({ ...staff, rows: newRows });
      }
    });
  };

  const showMoreAccess = (access) => {
    setAccessmore(access);
  };

  const handleDate = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  const UserStatus = async (id) => {
    setStaffId(id);
  };
  const handleChangeEdit1 = (selected) => {
    setSelectEditOptions1({
      optionSelected: selected,
    });
  };

  const handleStaffStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      const result = await Swal.fire({
        icon: "question",
        title: "Are you sure you want to update the contact status?",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      });

      const formData = {
        status: newStatus,
        ids: id,
        ecomAdmintoken: ecomAdmintoken,
      };

      if (result.isConfirmed) {
        const response = await changeStaffStatus(formData);
        console.log("response", response);

        if (response?.data?.message === "success") {
          Swal.fire({
            icon: "success",
            title: "Staff Status Updated",
            showConfirmButton: false,
            timer: 1500,
          });

          getStaff();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.message,
          });
        }
      }
    } catch (error) {
      console.error("Error updating contact status:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred",
      });
    }
  };

  const onSubmit2 = async (data) => {
    if (
      data?.editConfirmPassword !== data?.editPassword &&
      data?.editPassword !== data?.editConfirmPassword
    ) {
      Swal.fire({
        title: "Error",
        text: "Confirm password should be the same as New password",
        icon: "warning",
        button: "okay",
        confirmButtonColor: "#e25829",
      });
      return;
    }

    const formData = {
      staffName: data?.editName?.trim(),
      userEmail: data?.editEmail?.trim(),
      password: data?.editPassword,
      confirm_password: data?.editConfirmPassword,
      ids: ids,

      modules: (selectEditOptions1.optionSelected || [])?.map(
        (item) => item?.value
      ),
      ecomAdmintoken: ecomAdmintoken,
    };

    const res = await updateStaff(formData);
    if (!res.data.error) {
      document?.getElementById("closeModal").click();
      getStaff();
      Swal.fire({
        title: res.data?.message + "!",
        icon: "success",
        confirmButtonText: "Okay",
        confirmButtonColor: "#da3c3b",
        timer: 1000,
      });
    }
  };

  const getBarClick = (val) => {
    console.log(val);
    setSideBar(val);
  };

  return (
    <>
      <Sidebar Dash={"staff"} />
      <div className={`admin_main ${ml ? "admin_full" : ""}`}>
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row staff-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow mb-4">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Add New Staff Member</h2>
                      </div>
                    </div>
                    <form
                      className="form-design py-4 px-3 help-support-form row  justify-content-between"
                      action=""
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="form-group col-4">
                        <label for="">Staff Name</label>
                        <input
                          type="text"
                          className={classNames("form-control", {
                            "is-invalid": errors.name,
                          })}
                          name="name"
                          {...register("name", {
                            required: "Name is required!",
                            pattern: {
                              value: /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/,
                              message: "Special Character not allowed!",
                            },
                            maxLength: {
                              value: 20,
                              message: "Max length is 15 characters!",
                            },
                          })}
                        />
                        {errors.name && (
                          <small className="errorText mx-1">
                            *{errors.name?.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group col-8 module">
                        <label for="">Select Module</label>
                        <ReactSelect
                          options={options}
                          isMulti
                          closeMenuOnSelect={false}
                          hideSelectedOptions={false}
                          // components={{
                          //   Option,
                          // }}
                          onChange={handleChange}
                          allowSelectAll={true}
                          value={selectOptions?.optionSelected}
                        />
                      </div>

                      <div className="form-group col-4">
                        <label for="">Email</label>
                        <input
                          type="email"
                          className={classNames("form-control", {
                            "is-invalid": errors.email,
                          })}
                          id="Email"
                          placeholder="user@gmail.com"
                          name="email"
                          {...register("email", {
                            required: "Please Enter Your Email",
                            pattern: {
                              value:
                                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: "Invalid email address",
                            },
                          })}
                        />
                        {errors.email && (
                          <small className="errorText">
                            {errors.email?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group mb-0 col">
                        <label for="">Password</label>
                        <input
                          type="password"
                          className={classNames("form-control", {
                            "is-invalid": errors.NewPassword,
                          })}
                          id="password-Input"
                          placeholder="*********"
                          name="NewPassword"
                          {...register("NewPassword", {
                            required: "Please Enter New Password",
                            pattern: {
                              value:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                              message:
                                "Password must be 8 characters including one uppercase letter, one special character and alphanumeric characters (example:anasa123@)",
                            },
                          })}
                        />
                        <input
                          type="checkbox"
                          onClick={togglePassword}
                          className="showPassCheck mt-2"
                        />
                        <small className=" showPass">Show Password</small>
                        <br />
                        {errors.NewPassword && (
                          <small className="errorText ">
                            {errors.NewPassword?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group mb-0 col">
                        <label for="">Confirm Password</label>
                        <input
                          type="password"
                          className={classNames("form-control", {
                            "is-invalid": errors.ConfirmPassword,
                          })}
                          id="password-Input2"
                          placeholder="*********"
                          name="ConfirmPassword"
                          {...register("ConfirmPassword", {
                            required: "Please Enter Confirm Password",
                            pattern: {
                              value:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                              message:
                                "Password must be 8 characters including one uppercase letter, one special character and alphanumeric characters (example:anasa123@)",
                            },
                          })}
                        />
                        <input
                          type="checkbox"
                          onClick={togglePassword2}
                          className="showPassCheck mt-2"
                        />
                        <small className=" showPass">Show Password</small>
                        <br />
                        {errors.ConfirmPassword && (
                          <small className="errorText ">
                            {errors.ConfirmPassword?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group  col-auto mt-4">
                        <button className="comman_btn2 mt-1" type="submit">
                          {loading ? (
                            <Spinner
                              style={{ height: "20px", width: "20px" }}
                            />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>Staff Management</h2>
                      </div>

                      <div className="col-3 ">
                        <form className="form-design" action="">
                          <div className="form-group mb-0 position-relative icons_set">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search"
                              name="searchQuery"
                              id="searchQuery"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <i
                              className="far fa-search"
                              onClick={(e) => getStaff(e)}
                            />
                          </div>
                        </form>
                      </div>
                      <div class="col-auto">
                        <input
                          type="date"
                          class="custom_date"
                          onChange={(e) => getStaff(e.target.value)}
                        />
                      </div>
                    </div>
                    <form
                      className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                      action=""
                    >
                      <div className="form-group mb-0 col-5">
                        <label for="">From</label>
                        <input
                          type="date"
                          className="form-control"
                          name="from"
                          value={values.from}
                          onChange={handleDate}
                        />
                      </div>
                      <div className="form-group mb-0 col-5">
                        <label for="">To</label>
                        <input
                          type="date"
                          className="form-control"
                          name="to"
                          value={values.to}
                          onChange={handleDate}
                        />
                      </div>
                      <div className="form-group mb-0 col-auto">
                        <Link
                          className="comman_btn2"
                          onClick={() => getStaff()}
                        >
                          Search
                        </Link>
                      </div>
                    </form>
                    <div className="row">
                      <div className="col-12 comman_table_design px-0">
                        <div className="table-responsive">
                          <MDBDataTable
                            bordered
                            displayEntries={false}
                            searching={false}
                            className="userDatable"
                            hover
                            data={staff}
                            noBottomColumns
                            sortable
                          />
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
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Staff Member
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closeModal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="form-design p-3 help-support-form row align-items-start justify-content-center"
                action=""
                onSubmit={handleSubmit2(onSubmit2)}
              >
                <div className="form-group col-6">
                  <label for="editName">Staff Name</label>
                  <input
                    type="text"
                    className="form-control"
                    // value="Ajay Sharma"
                    name="editName"
                    id="editName"
                    {...register2("editName")}
                  />
                </div>
                <div className="form-group col-6">
                  <label for="editEmail">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    // value="user@gmail.com"
                    name="editEmail"
                    id="editEmail"
                    {...register2("editEmail")}
                  />
                </div>
                <div className="form-group col-12">
                  <label for="">Select Module</label>

                  <ReactSelect
                    options={options}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    onChange={handleChangeEdit1}
                    allowSelectAll={true}
                    value={selectEditOptions1?.optionSelected}
                  />
                </div>
                <div className="form-group col-6">
                  <label for="editPassword">Password</label>
                  <input
                    type="text"
                    className={classNames("form-control", {
                      "is-invalid": errors2.editPassword,
                    })}
                    name="editPassword"
                    id="editPassword"
                    {...register2("editPassword", {
                      required: "Please Enter New Password",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must be 8 characters including one uppercase letter, one special character and alphanumeric characters (example:anasa123@)",
                      },
                    })}
                  />
                  {errors2.editPassword && (
                    <small className="errorText ">
                      {errors2.editPassword?.message}
                    </small>
                  )}
                </div>
                <div className="form-group col-6">
                  <label for="editConfirmPassword">Confirm Password</label>
                  <input
                    type="text"
                    className={classNames("form-control", {
                      "is-invalid": errors2.editConfirmPassword,
                    })}
                    name="editConfirmPassword"
                    id="editConfirmPassword"
                    {...register2("editConfirmPassword", {
                      required: "Please Enter Confirm Password",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must be 8 characters including one uppercase letter, one special character and alphanumeric characters (example:anasa123@)",
                      },
                    })}
                  />
                  {errors2.editConfirmPassword && (
                    <small className="errorText ">
                      {errors2.editConfirmPassword?.message}
                    </small>
                  )}
                </div>
                <div className="form-group mb-0 col-auto">
                  {" "}
                  <button className="comman_btn2">Save</button>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade reply_modal"
        id="staticBackdropreportmore"
        // data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                All Accessed Module
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-4">
              <div className="chatpart_main">
                <ol>
                  {accessmore?.map((li, ind) => (
                    <li key={ind}>{li}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Staff;
