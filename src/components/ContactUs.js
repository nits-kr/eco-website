import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { useDeleteContactMutation } from "../services/Post";
import { useCreateContactMutation } from "../services/Post";
function ContactUs() {
  const [deleteContact, response] = useDeleteContactMutation();
  const [createContact, responseInfo] = useCreateContactMutation();
  const [contactList, setContactList] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [itemId, setItemId] = useState(null);
  const [startDate1, setStartDate1] = useState("");
  const [descriptionEn2, setDescriptionEn2] = useState("");
  const [userName, setUserName] = useState([]);
  const [email, setEmail] = useState([]);
  const [subject, setSubject] = useState([]);
  const [descriptionEn, setDescriptionEn] = useState([]);
  const [descriptionAr, setDescriptionAr] = useState([]);
  console.log("item id", itemId);
  const [viewContact, setViewContact] = useState("");
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const url =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/contact/contact/contactList";
  const url2 =
    "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/order/order/search";
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
    fetchInformationList();
  }, []);
  const fetchInformationList = async () => {
    const { data } = await axios.post(url);
    setContactList(data.results.list.reverse());
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
        setContactList([]);
        await Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            fetchInformationList();
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
            setContactList(filteredUsers);
          }
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
              setContactList(list);
            }
          });
          // setContactList(list);
        } else {
          setContactList([]);
          Swal.fire({
            icon: "warning",
            title: "No data found!",
            text: "There is no list between the selected dates.",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              fetchInformationList();
            }
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleItem = (item) => {
    setDescriptionEn2(item?.description || "");
  };
  const handleSaveChanges = (e) => {
    e.preventDefault();
    const newContact = {
      userName_en: userName,
      Email: email,
      subject: subject,
      description: descriptionEn,
    };
    createContact(newContact);
    Swal.fire({
      title: "Changes Saved",
      text: "The Contact has been created successfully.",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        // window.location.reload();
        fetchInformationList();
      }
    });
  };
  return (
    <>
      <Sidebar Dash={"contact-us"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row help&support-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman mb-4 shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>Add New Contact</h2>
                      </div>
                    </div>
                    <form
                      className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                      action=""
                      onSubmit={handleSaveChanges}
                    >
                      <div className="form-group col-4">
                        <label htmlFor="">
                          Mobile Number
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="userName"
                          id="userName"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          required
                          minLength="3"
                        />
                      </div>
                      {/* <div className="form-group col-4">
                        <label htmlFor="">
                          User Name
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="userName"
                          id="userName"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          required
                          minLength="3"
                        />
                      </div> */}
                      <div className="form-group col-4">
                        <label htmlFor="">
                          Email
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group col-4">
                        <label htmlFor="">
                          Subject
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group col-4">
                        <label htmlFor="">
                          Facebook Link
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group col-4">
                        <label htmlFor="">
                          Telegram Link
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group col-4">
                        <label htmlFor="">
                          Instagram Link
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="">
                          YouTube Link
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="">
                          LinkedIn Link
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                          minLength="3"
                        />
                      </div>
                      {/* <div className="form-group col-6">
                        <label htmlFor="">
                          Description(En)
                          <span className="required-field text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          name="descriptionEn"
                          id="descriptionEn"
                          style={{ height: "120px" }}
                          value={descriptionEn}
                          onChange={(e) => setDescriptionEn(e.target.value)}
                          required
                        ></textarea>
                      </div>
                      <div className="form-group  col-6">
                        <label htmlFor="">
                          Description(Ar)
                          <span className="required-field text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          name="descriptionAr"
                          id="descriptionAr"
                          style={{ height: "120px" }}
                          value={descriptionAr}
                          onChange={(e) => setDescriptionAr(e.target.value)}
                          required
                        ></textarea>
                      </div> */}
                      <div className="form-group mb-0 col-auto">
                        <button
                          className="comman_btn2"
                          style={{ marginLeft: "72vh" }}
                        >
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
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
                                  <td>{data.userName_en}</td>
                                  <td>{data.Email}</td>
                                  <td>{data.subject}</td>
                                  <td>{data?.description?.slice(0, 20)}...</td>
                                  <td>{data?.createdAt?.slice(0, 10)}</td>
                                  <td>
                                    <form className="table_btns d-flex align-items-center">
                                      <div className="check_toggle">
                                        <input
                                          data-bs-toggle="modal"
                                          data-bs-target="#staticBackdrop2"
                                          defaultChecked={data?.status}
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
                                      onClick={() => {
                                        handleItem(data);
                                        setItemId(data?._id);
                                      }}
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
                                            deleteContact(data?._id);
                                            Swal.fire(
                                              "Deleted!",
                                              `${data?.userName_en}  item has been deleted.`,
                                              "success"
                                            ).then(() => {
                                              fetchInformationList();
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
