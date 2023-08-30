import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import { useGetContentListQuery } from "../services/Post";
import { useUpdateContentMutation } from "../services/Post";
import { useCreateContentMutation } from "../services/Post";

function ContentManagement() {
  const [createContent, responseInfo] = useCreateContentMutation();
  const contentListItems = useGetContentListQuery();
  const [contentList, setContentList] = useState([]);
  const [update, res] = useUpdateContentMutation();
  const [titleEn, setTitleEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [titleEn2, setTitleEn2] = useState("");
  const [descriptionEn2, setDescriptionEn2] = useState("");
  const [titleAr2, setTitleAr2] = useState("");
  const [descriptionAr2, setDescriptionAr2] = useState("");
  const [itemId, setItemId] = useState([]);
  const [titleEn3, setTitleNameEn3] = useState("");
  const [descriptionEn3, setDescriptionEn3] = useState("");
  const [titleAr3, setTitleNameAr3] = useState("");
  const [descriptionAr3, setDescriptionAr3] = useState("");
  console.log("content item id ", itemId);
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  useEffect(() => {
    const reversedList =
      contentListItems?.data?.results?.list?.slice().reverse() ?? [];
    setContentList(reversedList);
    // subContent();
  }, [contentListItems]);
  // const subContent = () => {
  //   const reversedList =
  //     contentListItems?.data?.results?.list?.slice().reverse() ?? [];
  //   setContentList(reversedList);
  // };

  const handleSaveChanges1 = async (e) => {
    e.preventDefault();
    console.log("handleSaveChanges1", itemId);
    const editAddress = {
      id: itemId,
      title: titleEn,
      Description: descriptionEn,
    };
    try {
      await update(editAddress);
      Swal.fire({
        icon: "success",
        title: "Changes Saved",
        text: "The Content has been updated successfully.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the Content.",
      });
    }
  };
  const handleSaveChanges2 = async (e) => {
    e.preventDefault();
    console.log("handleSaveChanges1", itemId);
    const editAddress = {
      id: itemId,
      title_ar: titleAr,
      Description_ar: descriptionAr,
    };
    try {
      await update(editAddress);
      Swal.fire({
        icon: "success",
        title: "Changes Saved",
        text: "The Content has been updated successfully.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the Content.",
      });
    }
  };
  const handleItem = (item) => {
    setTitleEn2(item?.title || "");
    setDescriptionEn2(item?.Description || "");
  };
  const handleSaveChanges = (e) => {
    e.preventDefault();
    const newContact = {
      title: titleEn3,
      title_ar: titleAr3,
      Description: descriptionEn3,
      Description_ar: descriptionAr3,
    };
    createContent(newContact);
    Swal.fire({
      title: "Changes Saved",
      text: "The Content has been created successfully.",
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
      <Sidebar Dash={"content-management"} />
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
                  + Create Content
                </Link>
              </div>
              {contentList?.map((data, index) => (
                <div className="col-12 mb-5" key={index}>
                  <div className="row">
                    <div className="col-md-6 d-flex align-items-stretch">
                      <div className="row content_management_box me-0">
                        <h2>{data.title}</h2>
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
                        <p>{data?.Description}</p>
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
                        <p>{data?.Description_ar}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
                    id="questions"
                    name="questions"
                    defaultValue={titleEn2}
                    onChange={(e) => setTitleEn(e.target.value)}
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="quesstioon">Description</label>
                  <textarea
                    className="form-control"
                    name="answers"
                    id="answers"
                    style={{ height: "150px" }}
                    defaultValue={descriptionEn2}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                  />
                </div>
                <div className="form-group col-12 text-center mb-0">
                  <button
                    type="submit"
                    className="comman_btn2"
                    onClick={handleSaveChanges1}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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
                    onClick={handleSaveChanges2}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Create Information */}
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
                Create Content
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
                    Enter Content Heading (En)
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
                    Enter Content Heading (Ar)
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

export default ContentManagement;
