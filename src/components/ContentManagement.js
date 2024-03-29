import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import {
  useDeleteContentMutation,
  useGetContentListQuery,
} from "../services/Post";
import { useUpdateContentMutation } from "../services/Post";
import { useCreateContentMutation } from "../services/Post";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

function ContentManagement() {
  const [loader, setLoader] = useState(false);
  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  const ml = useSelector((data) => data?.local?.header);
  const [createContent, responseInfo] = useCreateContentMutation();
  const { data: contentListItems, refetch: fetchContentList } =
    useGetContentListQuery({
      ecomAdmintoken,
    });
  const [contentList, setContentList] = useState([]);
  const [update, res] = useUpdateContentMutation();
  const [deleteContent] = useDeleteContentMutation();

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

  useEffect(() => {
    const reversedList = contentListItems?.results?.list ?? [];
    setContentList(reversedList);
  }, [contentListItems]);

  const handleSaveChanges1 = async (e) => {
    e.preventDefault();
    console.log("handleSaveChanges1", itemId);
    const editAddress = {
      id: itemId,
      title: titleEn,
      Description: descriptionEn,
      ecomAdmintoken: ecomAdmintoken,
    };
    setLoader(true);
    try {
      await update(editAddress);
      setLoader(false);
      Swal.fire({
        icon: "success",
        title: "Changes Saved",
        text: "The Content has been updated successfully.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById("editModalCloseBtnEn").click();
          fetchContentList();
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
      ecomAdmintoken: ecomAdmintoken,
    };
    setLoader(true);
    try {
      await update(editAddress);
      setLoader(false);
      Swal.fire({
        icon: "success",
        title: "Changes Saved",
        text: "The Content has been updated successfully.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById("editModalCloseBtnAr").click();
          fetchContentList();
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
    setTitleAr2(item?.title_ar || "");
    setDescriptionAr2(item?.Description_ar || "");
  };
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const newContact = {
      title: titleEn3,
      title_ar: titleAr3,
      Description: descriptionEn3,
      Description_ar: descriptionAr3,
      ecomAdmintoken: ecomAdmintoken,
    };
    setLoader(true);
    const res = await createContent(newContact);
    setLoader(false);
    Swal.fire({
      title: "Changes Saved",
      text: "The Content has been created successfully.",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        document.getElementById("createcontentclose").click();
        fetchContentList();
      }
    });
  };
  return (
    <>
      <Sidebar Dash={"content-management"} />
      <div className={`admin_main ${ml ? "admin_full" : ""}`}>
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
                        <Link
                          className="edit_content_btn comman_btn text-end"
                          to="#"
                          style={{ marginLeft: "25vh" }}
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
                                deleteContent({
                                  id: data?._id,
                                  ecomAdmintoken,
                                });
                                Swal.fire(
                                  "Deleted!",
                                  "item has been deleted.",
                                  "success"
                                ).then(() => {
                                  fetchContentList();
                                });
                              }
                            });
                          }}
                        >
                          <i className="far fa-trash-alt me-2"></i>
                          Delete
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
                id="editModalCloseBtnEn"
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
                    disabled={loader ? true : false}
                    style={{
                      cursor: loader ? "not-allowed" : "pointer",
                    }}
                  >
                    {loader ? (
                      <Spinner style={{ height: "20px", width: "20px" }} />
                    ) : (
                      "Update"
                    )}
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
                id="editModalCloseBtnAr"
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
                    disabled={loader ? true : false}
                    style={{
                      cursor: loader ? "not-allowed" : "pointer",
                    }}
                  >
                    {loader ? (
                      <Spinner style={{ height: "20px", width: "20px" }} />
                    ) : (
                      "Update"
                    )}
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
                id="createcontentclose"
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
                  <button
                    type="submit"
                    className="comman_btn2 mt-4"
                    disabled={loader ? true : false}
                    style={{
                      cursor: loader ? "not-allowed" : "pointer",
                    }}
                  >
                    {loader ? (
                      <Spinner style={{ height: "20px", width: "20px" }} />
                    ) : (
                      "Create"
                    )}
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

export default ContentManagement;
