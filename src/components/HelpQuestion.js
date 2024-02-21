import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useCreateQuestionMutation } from "../services/Post";
import { useForm } from "react-hook-form";
import classNames from "classnames";

export default function HelpQuestion() {
  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  const [createQuestion] = useCreateQuestionMutation();
  const [questions, setQuestions] = useState({
    question: "",
    question1: "",
    message: "",
    message1: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuestions({ ...questions, [name]: value });
  };
  const handleOnAdd = async (data) => {
    // event.preventDefault();
    const alldata = {
      Question: data.questionEn,
      Answer: data.answerEn,
      Question_ar: data.questionAr,
      Answer_ar: data.answerAr,
      ecomAdmintoken: ecomAdmintoken,
    };

    const res = await createQuestion(alldata);
    if (res) {
      setQuestions(res?.data?.results?.questionData);
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
    }
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
              <form
                className="form-design row mx-0 py-2"
                action=""
                onSubmit={handleSubmit(handleOnAdd)}
              >
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
                  <label htmlFor="questionEn">Question</label>
                  <input
                    className={classNames("form-control", {
                      "is-invalid": errors.questionEn,
                    })}
                    type="text"
                    id="questionEn"
                    name="questionEn"
                    placeholder="Please Enter Your Question"
                    {...register("questionEn", {
                      required: "Question(En) is required!",
                      pattern: {
                        value: /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/,
                        message: "Special Character not allowed!",
                      },

                      maxLength: {
                        value: 100,
                        message: "Max length is 100 characters!",
                      },
                    })}
                  />
                  {errors.questionEn && (
                    <small className="errorText mx-1 fw-bold text-danger">
                      {errors.questionEn.message}*
                    </small>
                  )}
                </div>
                <div className="form-group col-6 text-end">
                  <label className="text-end" htmlFor="questionAr">
                    Question
                  </label>
                  <input
                    className="form-control text-end"
                    type="text"
                    id="questionAr"
                    name="questionAr"
                    placeholder="الرجاء إدخال سؤالك"
                    {...register("questionAr", {
                      required: "Question(Ar) is required!",
                      pattern: {
                        value: /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/,
                        message: "Special Character not allowed!",
                      },

                      maxLength: {
                        value: 100,
                        message: "Max length is 100 characters!",
                      },
                    })}
                  />
                  {errors.questionAr && (
                    <small className="errorText mx-1 fw-bold text-danger">
                      {errors.questionAr.message}*
                    </small>
                  )}
                </div>
                <div className="form-group col-6">
                  <label htmlFor="answerEn">Answer</label>

                  <textarea
                    className="form-control"
                    name="answerEn"
                    id="answerEn"
                    style={{ height: "150px" }}
                    // value={questions.message}
                    {...register("answerEn", {
                      required: "Answer (EN) is required",

                      pattern: {
                        value: /^(?=.*[a-zA-Z]).{50,}$/s,
                        message:
                          "Please enter at least 50 characters with at least one letter.",
                      },
                    })}
                  />
                  {errors?.answerEn && (
                    <small className="errorText mx-1 fw-bold text-danger">
                      {errors?.answerEn?.message}
                    </small>
                  )}
                </div>
                <div className="form-group col-6 text-end">
                  <label className="text-end" htmlFor="answerAr">
                    Answer
                  </label>

                  <textarea
                    className="form-control text-end"
                    name="answerAr"
                    id="answerAr"
                    style={{ height: "150px" }}
                    // value={questions.message1}
                    {...register("answerAr", {
                      required: "Answer (Ar) is required",

                      pattern: {
                        value: /^(?=.*[a-zA-Z]).{50,}$/s,
                        message:
                          "Please enter at least 50 characters with at least one letter.",
                      },
                    })}
                  />
                  {errors?.answerAr && (
                    <small className="errorText mx-1 fw-bold text-danger">
                      {errors?.answerAr?.message}
                    </small>
                  )}
                </div>
                <div className="form-group col-12 text-center mb-0">
                  <button
                    type="submit"
                    className="comman_btn"
                    // onClick={handleOnAdd}
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
