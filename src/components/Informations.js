import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
function Informations() {
  const [informationListItems, setInformationListItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
    const { data } = await axios.post(
      "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/information/info/list"
    );
    setInformationListItems(data.results.list.reverse());
    setTitle(data?.results?.list[0]?.title);
    setDescription(data?.results?.list[0]?.Description);
    console.log("Information List", data);
  };
  console.log("Title", title);
  console.log("dscription", description);

  const handleUpdate = async (e) => {
    alert(itemId);
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
    alert(itemId);
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
  return (
    <>
      <Sidebar Dash={"informations"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row content_management justify-content-center">
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
    </>
  );
}

export default Informations;
