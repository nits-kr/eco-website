import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
function EditCategory(props) {
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  console.log(
    "props?.newCategory?.categoryPic",
    props?.newCategory?.categoryPic
  );
  const [category, setCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    uploadImage: null,
  });
  const [categoryData, setCategoryData] = useState(props?.newCategory);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
    console.log("edit category value:  ", value);
  };
  const handleFileChange = (e, key) => {
    setCategory({ ...category, uploadImage: e.target.files[0] });
  };
  const handleUpdate = (itemId, event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("categoryName_en", category.nameEn);
    formData.append("categoryName_ar", category.nameAr);
    formData.append("categoryPic", category.uploadImage);
    axios
      .patch(
        `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/category/update/${props.newCategory.id}`,
        formData
        // {
        //   categoryName_en: category.nameEn,
        //   categoryName_ar: category.nameAr

        // }
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
  console.log(props.newCategory);
  return (
    <>
      <div
        className="modal fade Edit_modal"
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
                Edit Category
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
                className="form-design p-3 help-support-form row align-items-end justify-content-center"
                action=""
              >
                <div className="form-group col-6">
                  <label htmlFor="">Enter Category Name (En)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nameEn"
                    id="nameEn"
                    defaultValue={props.newCategory.nameEn}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Enter Category Name (Ar)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nameAr"
                    id="nameAr"
                    defaultValue={props.newCategory.nameAr}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-12 choose_file position-relative">
                  <span>Upload Image</span>
                  <label htmlFor="upload_video">
                    <i className="fal fa-camera me-1"></i>Choose File{" "}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    // defaultValue={props?.newCategory?.categoryPic}
                    name="upload_video"
                    id="upload_video"
                    onChange={(e) => handleFileChange(e, "uploadImage")}
                  />
                  {props?.newCategory?.categoryPic}
                </div>
                <div className="form-group mb-0 col-auto">
                  <button
                    className="comman_btn2"
                    onClick={(event) => handleUpdate(category._id, event)}
                  >
                    Save
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

export default EditCategory;
