import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import { useGetContentListQuery } from "../services/Post";
import { useUpdateContentMutation } from "../services/Post";

function ContentManagement() {
  const contentListItems = useGetContentListQuery();
  const [update, res] = useUpdateContentMutation();
  const [titleEn, setTitleEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [titleEn2, setTitleEn2] = useState("");
  const [descriptionEn2, setDescriptionEn2] = useState("");
  const [itemId, setItemId] = useState([]);
  console.log("content item id ", itemId);
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
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
        text: "The subcategory has been updated successfully.",
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
        text: "An error occurred while updating the subcategory.",
      });
    }
  };
  const handleItem = (item) => {
    setTitleEn2(item?.title || "");
    setDescriptionEn2(item?.Description || "");
  };
  return (
    <>
      <Sidebar Dash={"content-management"}/>
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row content_management justify-content-center">
              {contentListItems?.data?.results?.list?.map((data, index) => (
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
                        <h2>معلومات عنا</h2>
                        <Link
                          className="edit_content_btn comman_btn"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop1"
                          to="#"
                        >
                          <i className="far fa-edit me-2"></i>
                          Edit
                        </Link>
                        <p>
                          لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول
                          استنكار النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك
                          التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا
                          أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل
                          هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن
                          نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا
                          لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في
                          الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن
                          نتيجة لظروف ما قد تكمن السعاده فيما نتحمله من كد وأسي.
                          و سأعرض مثال حي لهذا، من منا لم يتحمل جهد بدني شاق إلا
                          من أجل الحصول على ميزة أو فائدة؟ ولكن من لديه الحق أن
                          ينتقد شخص ما أراد أن يشعر بالسعادة التي لا تشوبها
                          عواقب أليمة أو آخر أراد أن يتجنب الألم الذي ربما تنجم
                          عنه بعض المتعة
                        </p>
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
                    defaultValue="سلامتك تهمنا"
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
                    defaultValue="لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاصأن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن"
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

export default ContentManagement;
