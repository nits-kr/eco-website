import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { useDeleteContactMutation } from "../services/Post";
function ContactUs() {
  const [deleteContact, response] = useDeleteContactMutation();
  const [contactList, setContactList] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [itemId, setItemId] = useState(null);
  const [startDate1, setStartDate1] = useState("");
  console.log("item id", itemId);
  const [viewContact, setViewContact] = useState("");
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  useEffect(() => {
    handleView();
  }, [itemId]);

  const handleView = async (e) => {
    const { data } = await axios.post(
      `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/contact/contact/contactView/${itemId}`
    );
    setViewContact(data?.results?.contactData);
  };

  useEffect(() => {
    informationList();
  }, []);
  const informationList = async () => {
    const { data } = await axios.post(
      "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/contact/contact/contactList"
    );
    setContactList(data.results.list.reverse());
  };

  const userList2 = async () => {
    if (!startDate1) return;
    try {
      const { data } = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/contact/contact/contactList",
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
      setContactList(filteredUsers);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  useEffect(() => {
    userList2();
  }, [startDate1]);

  const userList = async () => {
    const { data } = await axios.post(
      "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/contact/contact/contactList",
      {
        startDate,
        endDate,
      }
    );
    const filteredUsers = data.results.list.filter(
      (user) =>
        new Date(user.createdAt) >= new Date(startDate) &&
        new Date(user.createdAt) <= new Date(endDate)
    );
    setContactList(filteredUsers.reverse());
    console.log(data);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    userList();
  };
  const handleDeleteContact = async (offerId) => {
    try {
      await deleteContact(offerId);
      contactList.refetch();
      Swal.fire({
        title: "Offer Deleted",
        text: "The offer has been deleted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      // Handle error if necessary
    }
  };
  return (
    <>
      <Sidebar Dash={"contact-us"}/>
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row help&support-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>Contact Us</h2>
                      </div>
                      <div className="col-3 Searchbox">
                        <form className="form-design" action="">
                          <div className="form-group mb-0 position-relative icons_set">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search"
                              name="name"
                              id="name"
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
                                <th>User Name</th>
                                <th>E-mail</th>
                                <th>Subject</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(contactList || []).map((data, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{data.userName}</td>
                                  <td>{data.Email}</td>
                                  <td>{data.subject}</td>
                                  <td>{data.description}</td>
                                  <td>{data?.createdAt?.slice(0, 10)}</td>
                                  <td>
                                    <form className="table_btns d-flex align-items-center">
                                      <div className="check_toggle">
                                        <input
                                          data-bs-toggle="modal"
                                          data-bs-target="#staticBackdrop2"
                                          defaultChecked={data.status}
                                          type="checkbox"
                                          name={`check${index}`}
                                          id={`check${index}`}
                                          className="d-none"
                                        />
                                        <label
                                          htmlFor={`check${index}`}
                                        ></label>
                                      </div>
                                    </form>
                                  </td>
                                  <td>
                                    <Link
                                      data-bs-toggle="modal"
                                      data-bs-target="#staticBackdrop"
                                      className="comman_btn table_viewbtn me-2"
                                      to="#"
                                      onClick={() => setItemId(data?._id)}
                                    >
                                      View
                                    </Link>
                                    <Link
                                      className="comman_btn2 table_viewbtn"
                                      to="#"
                                      onClick={() => {
                                        handleDeleteContact(data?._id);
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

      {/* <!-- Modal --> */}
      <div
        className="modal fade reply_modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                DESCRIPTION
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
                <p>{viewContact?.description}</p>
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
    </>
  );
}

export default ContactUs;
