import React, { useState, useEffect } from 'react'
import axios from "axios";
import Sidebar from './Sidebar';
function EditSubCategory() {
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState({
    nameEn: '',
    nameAr: '',
    categoryId: '',
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubCategory({ ...subCategory, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/createAttribute', { name: subCategory })
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
  return (
    <>
    <Sidebar/>
      <div
        className="modal fade Edit_modal"
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
                Edit Sub Category
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
                <div className="form-group col-12">
                  <label htmlFor="">Select Category</label>
                  {/* <select
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
                  </select> */}
                  <select className="select form-control" size={15} name="categoryId" id="selectCategory" value={subCategory.categoryId}
                    onChange={handleInputChange}>
                    {Array.isArray(categories) && categories.map(category => (
                      <option key={category._id} value={category._id}>{category.categoryName}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Enter Sub Category Name (En)</label>
                  <input
                    type="text"
                    className="form-control"

                    name="name"
                    id="name"
                    value={subCategory.nameEn}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Enter Sub Category Name (Ar)</label>
                  <input
                    type="text"
                    className="form-control"

                    name="name"
                    id="name"
                    value={subCategory.nameAr}
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
                Edit Sub Category
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
                <div className="form-group col-12">
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
                  <label htmlFor="">Enter Sub Category Name (En)</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Lorem"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Enter Sub Category Name (Ar)</label>
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

export default EditSubCategory
