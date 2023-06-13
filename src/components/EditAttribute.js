import React, { useState, useEffect } from 'react'
import axios from "axios";

function EditAttribute() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [editAttributes, setEditAttributes] = useState({
    nameEn: '',
    nameAr: '',
    categoryId: '',
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditAttributes({ ...editAttributes, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/createAttribute', { name: editAttributes })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/selectCategory"
        );
        setCategories(response.data.results.categoryData);
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
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/selectSubcategory"
        );
        setSubCategories(response.data.results.subCategoryData);
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
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/selectSubSubCategory"
        );
        setSubSubCategories(response.data.results.subSubCategoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div
        className="modal fade Edit_modal"
        id="staticBackdrop3"
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
                  <select className="select form-control" size={15} name="categoryId" id="selectCategory" value={editAttributes.categoryId}
                    onChange={handleInputChange}>
                    {Array.isArray(categories) && categories.map(category => (
                      <option key={category._id} value={category._id}>{category.categoryName}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Select Sub Category</label>
                  <select className="select form-control" size={15} name="categoryId1" id="selectSubCategory" value={editAttributes.categoryId1}
                    onChange={handleInputChange}>
                    {Array.isArray(subCategories) && subCategories.map(subCategory => (
                      <option key={subCategory._id} value={subCategory._id}>{subCategory.subCategoryName}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-12">
                  <label htmlFor="">Select Sub Sub Category</label>
                  <select className="select form-control" size={15} name="categoryId2" id="selectSubSubCategory" value={editAttributes.categoryId2}
                    onChange={handleInputChange}>
                    {Array.isArray(subSubCategories) && subSubCategories.map(subSubCategory => (
                      <option key={subSubCategory._id} value={subSubCategory._id}>{subSubCategory.subCategoryName}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Attribute Name (En)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={editAttributes.nameEn}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Attribute Name (Ar)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={editAttributes.nameAr}
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
      {/* <div
        className="modal fade Edit_modal"
        id="staticBackdrop3"
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
              >
                <div className="form-group col-6">
                  <label htmlFor="">Select Category</label>
                  <select
                    className="select form-control"
                    multiple
                    name=""
                    id=""
                  >
                    <option defaultValue="1">Lorem</option>
                    <option defaultValue="2">ipsum</option>
                    <option defaultValue="3">Lorem</option>
                    <option defaultValue="1">Lorem</option>
                    <option defaultValue="2">ipsum</option>
                    <option defaultValue="3">Lorem</option>
                  </select>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Select Sub Category</label>
                  <select
                    className="select form-control"
                    multiple
                    name=""
                    id=""
                  >
                    <option defaultValue="1">Lorem</option>
                    <option defaultValue="2">ipsum</option>
                    <option defaultValue="3">Lorem</option>
                    <option defaultValue="1">Lorem</option>
                    <option defaultValue="2">ipsum</option>
                    <option defaultValue="3">Lorem</option>
                  </select>
                </div>
                <div className="form-group col-12">
                  <label htmlFor="">Select Sub Sub Category</label>
                  <select
                    className="select form-control"
                    multiple
                    name=""
                    id=""
                  >
                    <option defaultValue="1">Lorem</option>
                    <option defaultValue="2">ipsum</option>
                    <option defaultValue="3">Lorem</option>
                    <option defaultValue="1">Lorem</option>
                    <option defaultValue="2">ipsum</option>
                    <option defaultValue="3">Lorem</option>
                  </select>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Attribute Name (En)</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Lorem"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Attribute Name (Ar)</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="لوريم"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group mb-0 col-auto">
                  <button className="comman_btn2">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default EditAttribute
