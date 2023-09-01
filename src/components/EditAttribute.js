import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import Sidebar from "./Sidebar";

function EditAttribute(props) {
  console.log("props", props);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [editAttributes, setEditAttributes] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
    categoryId2: "",
  });
  console.log("editAttributes", editAttributes);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditAttributes({ ...editAttributes, [name]: value });
  };
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setEditAttributes((prevAttributes) => ({
  //     ...prevAttributes,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .patch(
        `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/attributeUpdate/${props.newCategory.id}`,
        {
          attributeName_en: editAttributes.nameEn,
          attributeName_ar: editAttributes.nameAr,
          category_Id: editAttributes.categoryId,
          subCategory_Id: editAttributes.categoryId1,
          subSubCategory_Id: editAttributes.categoryId2,
        }
      )
      .then((response) => {
        console.log(response.data);
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
        console.error(error);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/category/list"
        );
        setCategories(response.data.results.list);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subCategory/selectCategory/${editAttributes.categoryId}`
        );
        setSubCategories(response.data.results.categoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [editAttributes.categoryId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subSubCategory/selectSubCategory/${editAttributes.categoryId1}`
        );
        setSubSubCategories(response.data.results.subCategoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {/* <Sidebar/> */}
      <div
        className="modal fade Edit_modal"
        id="staticBackdrop7"
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
                Edit Attribute
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
                onSubmit={handleSubmit}
              >
                <div className="form-group col-6">
                  <label htmlFor="">Select Category</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name="categoryId"
                    id="selectCategory"
                    value={editAttributes.categoryId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Category</option>
                    {Array.isArray(categories) &&
                      categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName_en}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Select Sub Category</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name="categoryId1"
                    id="selectSubCategory"
                    value={editAttributes.categoryId1}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Sub Category</option>
                    {Array.isArray(subCategories) &&
                      subCategories.map((subCategory) => (
                        <option key={subCategory._id} value={subCategory._id}>
                          {subCategory.subCategoryName_en}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group col-12">
                  <label htmlFor="">Select Sub Sub Category</label>
                  <select
                    className="select form-control"
                    multiple=""
                    name="categoryId2"
                    id="selectSubSubCategory"
                    value={editAttributes.categoryId2}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Sub Sub Category</option>
                    {Array.isArray(subSubCategories) &&
                      subSubCategories.map((subSubCategory) => (
                        <option
                          key={subSubCategory._id}
                          value={subSubCategory._id}
                        >
                          {subSubCategory.subSubCategoryName_en}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Attribute Name (En)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nameEn"
                    id="nameEn"
                    defaultValue={props?.newCategory?.nameEn}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Attribute Name (Ar)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nameAr"
                    id="nameAr"
                    defaultValue={props?.newCategory?.nameAr}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-0 col-auto">
                  <button className="comman_btn2">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditAttribute;
