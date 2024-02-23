import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useUpdateQuestionMutation } from "../services/Post";
import { Spinner } from "react-bootstrap";

const HelpEditModelEn = (props) => {
  const [loader, setLoader] = useState(false);
  const ecomAdmintoken = useSelector((data) => data?.local?.token);

  const { formData, setFormData, refreshList, selectedQuestionId } = props;

  const [updateQA] = useUpdateQuestionMutation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        Question: formData.questions,
        Answer: formData.answers,
        ecomAdmintoken: ecomAdmintoken,
        selectedQuestionId: selectedQuestionId,
      };
      setLoader(true);
      const response = await updateQA(data);

      console.log("response", response);
      setLoader(false);
      const updatedData = response.data.results.updateData;
      setFormData(updatedData);
      refreshList();
      {
        setFormData(updatedData);
        refreshList();
        await Swal.fire({
          title: "Question Updated!",
          text: "Your question has been updated successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });

        // window.location.reload(true);
        document?.getElementById("qenmodal").click();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <Sidebar /> */}
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
                id="qenmodal"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="form-design row mx-0 py-2"
                action=""
                onSubmit={handleFormSubmit}
              >
                <div className="form-group col-12">
                  <label htmlFor="quesstioon">Question</label>
                  <input
                    className="form-control"
                    type="text"
                    id="questions"
                    name="questions"
                    defaultValue={formData.questions}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="quesstioon">Answer</label>
                  <textarea
                    className="form-control"
                    name="answers"
                    id="answers"
                    style={{ height: "150px" }}
                    defaultValue={formData.answers}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="form-group col-12 text-center mb-0">
                  <button
                    type="submit"
                    className="comman_btn2"
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
    </>
  );
};

export default HelpEditModelEn;
