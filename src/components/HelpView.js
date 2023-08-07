import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HelpQuestion from "./HelpQuestion";
import HelpEditModel from "./HelpEditModel";
import HelpEditModelEn from "./HelpEditModelEn";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";

function HelpView() {
  const [helpViewList, setHelpViewList] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null); // Add selectedQuestionId state
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  useEffect(() => {
    userList();
  }, []);

  const userList = async () => {
    const { data } = await axios.post(
      "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/help/help/questionList"
    );
    setHelpViewList(data.results.listData.reverse());
    console.log(data);
  };

  const refreshList = () => {
    userList();
  };

  const handleEdit = (_id) => {
    const selectedQuestion = helpViewList.find((data) => data._id === _id);
    setSelectedQuestionId(selectedQuestion?._id); // Update selectedQuestionId state
    setFormData({
      questions: selectedQuestion?.Question || "",
      answers: selectedQuestion?.Answer || "",
      questions_ar: selectedQuestion?.Question_ar || "",
      answers_ar: selectedQuestion?.Answer_ar || "",
    });
  };

  const [formData, setFormData] = useState({
    questions: "",
    answers: "",
    questions_ar: "",
    answers_ar: "",
  });

  return (
    <>
      <Sidebar />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row help_view justify-content-center">
              <div className="col-12 design_outter_comman shadow mb-4">
                <div className="row comman_header justify-content-between">
                  <div className="col">
                    <h2>Help Category Listing</h2>
                  </div>
                  <div className="col-auto">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop1"
                      className="comman_btn2"
                    >
                      <i className="fas fa-plus me-1"></i> Add Question
                    </button>
                  </div>
                </div>
                <div className="row mx-0 py-4">
                  {(helpViewList || []).map((data, index) => (
                    <div className="col-12 mb-4" key={index}>
                      <div className="row">
                        <div className="col-6 d-flex align-items-stretch">
                          <div className="qa_box row position-relative border align-items-start">
                            <div className="col">
                              <div className="qa_box_head">
                                <span className="border"> {index + 1} </span>
                                <h2 className="ms-2">{data?.Question}</h2>
                              </div>
                            </div>
                            <div className="col-auto">
                              <Link
                                className="comman_btn2"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                to="#"
                                onClick={() => handleEdit(data?._id)}
                              >
                                <i className="far fa-edit me-1"></i> Edit
                              </Link>
                            </div>
                            <div className="col-12">
                              <div className="qa_box_content border">
                                <p> {data?.Answer} </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 d-flex align-items-stretch">
                          <div className="qa_box row position-relative border align-items-start">
                            <div className="col-auto">
                              <Link
                                className="comman_btn2"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop2"
                                to="javscript:;"
                                onClick={() => handleEdit(data?._id)}
                              >
                                <i className="far fa-edit me-1"></i> Edit
                              </Link>
                            </div>
                            <div className="col">
                              <div className="qa_box_head align-items-center text-end">
                                <h2 className="me-2">{data?.Question_ar}</h2>
                                <span className="border">{index + 1}</span>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="qa_box_content border">
                                <p>{data?.Answer_ar}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HelpEditModelEn
        refreshList={refreshList}
        handleEdit={handleEdit}
        formData={formData}
        setFormData={setFormData}
        selectedQuestionId={selectedQuestionId}
      />

      <HelpEditModel
        refreshList={refreshList}
        handleEdit={handleEdit}
        formData={formData}
        setFormData={setFormData}
        selectedQuestionId={selectedQuestionId}
      />
      <HelpQuestion />
    </>
  );
}

export default HelpView;
