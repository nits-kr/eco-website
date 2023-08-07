import React from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import Swal from "sweetalert2";

export default function HelpEditModel(props) {
  const { formData, setFormData, refreshList, selectedQuestionId } = props;

  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   axios
  //     .patch(
  //       `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/help/help/updateQuestion/${selectedQuestionId}`,
  //       {
  //         Question_ar: formData.questions,
  //         Answer_ar: formData.answers,
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data.results);
  //       const updatedData = response.data.results.updateData;
  //       if (updatedData && updatedData.questions_ar && updatedData.answer_ar) {
  //         setFormData(updatedData);
  //         refreshList();
  //         Swal.fire({
  //           title: "Question Updated!",
  //           text: "Your question has been updated successfully.",
  //           icon: "success",
  //           confirmButtonColor: "#3085d6",
  //           confirmButtonText: "OK",
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             window.location.reload(true);
  //           }
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/help/help/updateQuestion/${selectedQuestionId}`,
        {
          Question_ar: formData.questions,
          Answer_ar: formData.answers,
        }
      );
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

        window.location.reload(true);
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
        id="staticBackdrop2"
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
              <form
                className="form-design row mx-0 py-2"
                action=""
                onSubmit={handleFormSubmit}
              >
                <div className="form-group col-12 text-end">
                  <label className="text-end" htmlFor="quesstioon">
                    Question
                  </label>
                  <input
                    className="form-control text-end"
                    type="text"
                    id="questions"
                    name="questions"
                    defaultValue={formData.questions_ar}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-12 text-end">
                  <label className="text-end" htmlFor="quesstioon">
                    Answer
                  </label>
                  <textarea
                    className="form-control text-end"
                    name="answers"
                    id="answers"
                    style={{ height: "150px" }}
                    defaultValue={formData.answers_ar}
                    onChange={handleInputChange}
                  ></textarea>
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
