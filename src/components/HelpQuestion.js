import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";

export default function HelpQuestion() {
  // const [questions, setQuestions] = useState([]);
  const [questions, setQuestions] = useState({
    question: "",
    question1: "",
    message: "",
    message1: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuestions({ ...questions, [name]: value });
  };
  const handleOnAdd = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/help/help/createQuestion",
        {
          Question: questions.question,
          Answer: questions.message,
          Question_ar: questions.question1,
          Answer_ar: questions.message1,
        }
      )
      .then((response) => {
        console.log(response.data.results.questionData);
        setQuestions(response.data.results.questionData);
        Swal.fire({
          title: "Question Created!",
          text: "Your new question has been created successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Sidebar />
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
                Add Question
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
                <div className="form-group text-center col-6 top_head">
                  <label className="text-center" htmlFor="">
                    - English -
                  </label>
                </div>
                <div className="form-group text-center col-6 top_head">
                  <label className="text-center" htmlFor="">
                    - Arabic -
                  </label>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="quesstioon">Question</label>
                  <input
                    className="form-control"
                    type="text"
                    id="question"
                    name="question"
                    placeholder="Please Enter Your Question"
                    value={questions.question}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-6 text-end">
                  <label className="text-end" htmlFor="quesstioon">
                    Question
                  </label>
                  <input
                    className="form-control text-end"
                    type="text"
                    id="question1"
                    name="question1"
                    placeholder="الرجاء إدخال سؤالك"
                    value={questions.question1}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="quesstioon">Answer</label>

                  <textarea
                    className="form-control"
                    name="message"
                    id="message"
                    style={{ height: "150px" }}
                    // value={questions.message}
                    onChange={handleInputChange}
                    defaultValue="Please Enter Your Answer"
                  />
                </div>
                <div className="form-group col-6 text-end">
                  <label className="text-end" htmlFor="quesstioon">
                    Answer
                  </label>

                  <textarea
                    className="form-control text-end"
                    name="message1"
                    id="message1"
                    style={{ height: "150px" }}
                    // value={questions.message1}
                    onChange={handleInputChange}
                    defaultValue="من فضلك أدخل إجابتك"
                  />
                </div>
                <div className="form-group col-12 text-center mb-0">
                  <button
                    type="submit"
                    className="comman_btn"
                    onClick={handleOnAdd}
                  >
                    Add
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
