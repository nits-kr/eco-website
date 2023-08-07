import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { useCreateInformationMutation } from "../services/Post";
import Spinner from "./Spinner";
function Informations(props) {
  const [loading, setLoading] = useState(false);
  const [informationListItems, setInformationListItems] = useState([]);
  const [createInformation, responseInfo] = useCreateInformationMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleEn3, setTitleNameEn3] = useState("");
  const [descriptionEn3, setDescriptionEn3] = useState("");
  const [titleAr3, setTitleNameAr3] = useState("");
  const [descriptionAr3, setDescriptionAr3] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [itemId, setItemId] = useState("");
  const [titleEn2, setTitleEn2] = useState("");
  const [descriptionEn2, setDescriptionEn2] = useState("");
  const [titleAr2, setTitleAr2] = useState("");
  const [descriptionAr2, setDescriptionAr2] = useState("");

  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");

  useEffect(() => {
    informationList();
  }, []);
  const informationList = async () => {
    props.setProgress(10);
    setLoading(true);
    const { data } = await axios.post(
      "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/information/info/list"
    );
    setInformationListItems(data.results.list.reverse());
    setTitle(data?.results?.list[0]?.title);
    setDescription(data?.results?.list[0]?.Description);
    console.log("Information List", data);
    props.setProgress(100);
    setLoading(false);
  };
  console.log("Title", title);
  console.log("dscription", description);

  const handleUpdate = async (e) => {
    // alert(itemId);
    e.preventDefault();
    await axios
      .patch(
        `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/information/info/update/${itemId}`,
        {
          title_en: titleEn,
          Description_en: descriptionEn,
          // title_ar: titleAr,
          // Description_ar: descriptionAr,
        }
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
  const handleUpdate1 = async (e) => {
    // alert(itemId);
    e.preventDefault();
    await axios
      .patch(
        `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/information/info/update/${itemId}`,
        {
          // title_en: titleEn,
          // Description_en: descriptionEn,
          title_ar: titleAr,
          Description_ar: descriptionAr,
        }
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
    setTitleEn2(item?.title_en || "");
    setDescriptionEn2(item?.Description_en || "");
    setTitleAr2(item?.title_ar || "");
    setDescriptionAr2(item?.Description_ar || "");
  };
  const handleSaveChanges = (e) => {
    e.preventDefault();
    const newContact = {
      title_en: titleEn3,
      title_ar: titleAr3,
      Description_en: descriptionEn3,
      Description_ar: descriptionAr3,
    };
    createInformation(newContact);
    Swal.fire({
      title: "Changes Saved",
      text: "The offer has been created successfully.",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
        // informationList();
      }
    });
  };
  return (
    <>
      {loading}
      <Sidebar Dash={"informations"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row content_management justify-content-center">
              <div className="col-12 text-end mb-4">
                <Link
                  to="#"
                  className="comman_btn mb-3"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop5"
                >
                 + {" "} Create Information
                </Link>
              </div>
              {loading ? (
                <Spinner />
              ) : (
                <div className="col-12">
                  <div className="row mx-0">
                    {informationListItems?.map((data, index) => (
                      <div className="col-12 mb-5" key={index}>
                        <div className="row">
                          <div className="col-md-6 d-flex align-items-stretch">
                            <div className="row content_management_box me-0">
                              <h2>{data?.title_en}</h2>
                              <Link
                                className="edit_content_btn comman_btn"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                to="#"
                                onClick={() => {
                                  handleItem(data);
                                  setItemId(data?._id);
                                }}
                              >
                                <i className="far fa-edit me-2"></i>Edit
                              </Link>
                              <p>{data?.Description_en}</p>
                            </div>
                          </div>
                          <div className="col-md-6 d-flex align-items-stretch">
                            <div className="row content_management_box ms-0 text-end">
                              <h2> {data?.title_ar} </h2>
                              <Link
                                className="edit_content_btn comman_btn"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop1"
                                to="#"
                                onClick={() => {
                                  handleItem(data);
                                  setItemId(data?._id);
                                }}
                              >
                                <i className="far fa-edit me-2"></i>
                                Edit
                              </Link>
                              <p> {data?.Description_ar} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 
                <!-- Edit Modal --> */}
      <div
        className="modal fade Edit_help Edit_modal"
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
                Edit
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="form-design row mx-0 py-2" action="">
                <div className="form-group col-12">
                  <label htmlFor="quesstioon">Title</label>
                  <input
                    className="form-control"
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={titleEn2}
                    onChange={(e) => setTitleEn(e.target.value)}
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="quesstioon">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    style={{ height: "150px" }}
                    defaultValue={descriptionEn2}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                  />
                </div>
                <div className="form-group col-12 text-center mb-0">
                  <button
                    type="submit"
                    className="comman_btn2"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Edit Modal --> */}
      <div
        className="modal fade Edit_help Edit_modal"
        id="staticBackdrop1"
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
                Edit
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="form-design row mx-0 py-2" action="">
                <div className="form-group col-12 text-end">
                  <label className="text-end" htmlFor="quesstioon">
                    Title
                  </label>
                  <input
                    className="form-control text-end"
                    type="text"
                    id="quesstioon"
                    name="quesstioon"
                    defaultValue={titleAr2}
                    onChange={(e) => setTitleAr(e.target.value)}
                  />
                </div>
                <div className="form-group col-12 text-end">
                  <label className="text-end" htmlFor="quesstioon">
                    Description
                  </label>
                  <textarea
                    className="form-control text-end"
                    name="message"
                    id="message"
                    style={{ height: "150px" }}
                    defaultValue={descriptionAr2}
                    onChange={(e) => setDescriptionAr(e.target.value)}
                  />
                </div>
                <div className="form-group col-12 text-center mb-0">
                  <button
                    type="submit"
                    className="comman_btn2"
                    onClick={handleUpdate1}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Information */}
      <div
        className="modal fade Edit_help Edit_modal"
        id="staticBackdrop5"
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
                Create Information
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
                className="form-design help-support-form py-4 px-3 row align-items-start justify-content-center"
                action=""
                onSubmit={handleSaveChanges}
              >
                <div className="form-group mb-0 col-6">
                  <label htmlFor="">
                    Enter Thought Heading (En)
                    <span className="required-field text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue=""
                    name="titleEn3"
                    id="titleEn3"
                    value={titleEn3}
                    onChange={(e) => setTitleNameEn3(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-0 col-6">
                  <label htmlFor="">
                    Enter Thought Heading (Ar)
                    <span className="required-field text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue=""
                    name="titleAr3"
                    id="titleAr3"
                    value={titleAr3}
                    onChange={(e) => setTitleNameAr3(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">
                    Enter Text Here (En)
                    <span className="required-field text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    // name="nameEnText"
                    // id="nameEnText"
                    style={{ height: "120px" }}
                    name="descriptionEn3"
                    id="descriptionEn3"
                    value={descriptionEn3}
                    onChange={(e) => setDescriptionEn3(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">
                    Enter Text Here (Ar)
                    <span className="required-field text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    // name="nameArText"
                    // id="nameArText"
                    style={{ height: "120px" }}
                    name="descriptionAr3"
                    id="descriptionAr3"
                    value={descriptionAr3}
                    onChange={(e) => setDescriptionAr3(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="form-group col-12 text-center">
                  <button className="comman_btn2 mt-4">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Informations;
