import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
function Informations() {
  const [informationListItems, setInformationListItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //const [selectedItemId, setSelectedItemId] = useState(null); // New state for selected item ID


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
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleUpdate = async (e, _id) => {
    alert(_id)
    e.preventDefault();
    await axios.patch(
      `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/information/info/update/${_id}`, 
      { title:title, Description: description }
    )
    .then((response) => {
        console.log(response)
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
        console.log(error)
    });
  };
  const updateItem = (_id) => {
    alert(_id);
    //handleUpdate(_id)
    //setSelectedItemId(_id); // Set the selected item ID in the state

  };
  return (
    <>
    <Sidebar/>
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row content_management justify-content-center">
              {informationListItems.map((item, index) => {
                return (
                  <div className="col-12 mb-5" key={index}>
                    <div className="row">
                      <div className="col-md-6 d-flex align-items-stretch">
                        <div className="content_management_box me-0">
                          <h2> {item.title} </h2>
                          <Link
                            className="edit_content_btn comman_btn"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            to="javscript:;"
                            onClick={() => updateItem(item._id)}
                          >
                            <i className="far fa-edit me-2"></i>Edit
                          </Link>
                          <p>{item.Description}</p>
                        </div>
                      </div>
                      <div className="col-md-6 d-flex align-items-stretch">
                        <div className="row content_management_box ms-0 text-end right_sidebox">
                          <h2>السعر ثابت</h2>
                          <Link
                            className="edit_content_btn comman_btn"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop1"
                            to="javscript:;"
                          >
                            <i className="far fa-edit me-2"></i>Edit
                          </Link>
                          <p>
                            لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول
                            استنكار النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك
                            التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا
                            أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل
                            هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="quesstioon">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    style={{ height: "150px" }}
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </div>
                <div className="form-group col-12 text-center mb-0">
                  <button
                    type="submit"
                    className="comman_btn2"
                    onClick={() => handleUpdate()}
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
                    defaultValue="السعر ثابت"
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
                    defaultValue="لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن"
                  />
                </div>
                <div className="form-group col-12 text-center mb-0">
                  <button type="submit" className="comman_btn2">
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
