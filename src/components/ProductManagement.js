import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

function ProductManagement() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
  });
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const handleInputChange1 = (event) => {
    const { name, value } = event.target;
    setSubSubCategory({ ...subSubCategory, [name]: value });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subSubCategory/selectCategory"
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
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subSubCategory/selectSubCategory"
        );
        setSubCategories(response.data.results.subCategoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
    setFormData({ ...formData, [key]: e.target.files[0] });
  };
  const handleOnSave = () => {
    const data = new FormData();
    data.append("productName_en", formData.productName);
    data.append("slug", formData.slug);
    data.append("Description", formData.Description);
    // data.append("Discount", formData.discount);
    data.append("weight", formData.weight);
    data.append("brandName", formData.brand);
    data.append("productColor", formData.color);
    data.append("careInstuctions", formData.shortDescription);
    data.append("Price", formData.Price);
    data.append("oldPrice", formData.oldPrice);
    data.append("SKU", formData.SKU);
    data.append("stockQuantity", formData.stockQuantity);
    data.append("pageTitle", formData.pageTitle);
    data.append("metaDescription", formData.metaDescription);
    data.append("visibility", formData.visibility);
    data.append("publishDate", formData.datepicker);
    data.append("Tags", formData.Tags);
    data.append("category_Id", subSubCategory.categoryId);
    data.append("Subcategory_Id", subSubCategory.categoryId1);
    data.append("product_Pic", formData.uploadImage);
    // data.append("brandPic", formData.uploadImage);

    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/createProduct",
        data
      )
      .then((response) => {
        setFormData(response.data.results.saveProduct);
        console.log(response.data.results.saveProduct);
        Swal.fire({
          title: "Product Created!",
          text: "Your new product has been created successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(); // refresh the page after success message is closed
          }
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <Sidebar />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <h6 className="breadcrumb">
              <Link to="/" className="breadcrumb_link text-secondary">
                Dashboard /
              </Link>{" "}
              <Link to="/" className="breadcrumb_link text-secondary">
                Products /
              </Link>{" "}
              <Link to="/" className="breadcrumb_link text-secondary">
                Edit Product
              </Link>
            </h6>
            <h1>Edit Products</h1>
            <span
              className="col-auto d-flex"
              style={{
                justifyContent: "flex-end",
                marginTop: "-55px",
                marginBottom: "15px",
              }}
            >
              {/* <Link
                to="#"
                className="btn btn-secondary "
                style={{ marginRight: "10px" }}
              >
                Duplicate
              </Link> */}
              <Link
                to="/products"
                className="btn btn-primary"
                style={{ marginRight: "24px" }}
                onClick={handleOnSave}
              >
                Save
              </Link>
            </span>
            <div className="row-12">
              <div
                className="row justify-content-between"
                style={{ marginTop: "-30px" }}
              >
                <div className=" col-9  my-5">
                  <div className="card p-3 shadow">
                    <h3
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "103.5%",
                      }}
                    >
                      Basic Information
                    </h3>
                    <div className="form-group">
                      <label htmlFor="name">
                        <b> Name </b>
                      </label>
                      <input
                        type="text"
                        id="productName"
                        name="productName"
                        className="form-control"
                        placeholder="brandix screwdriver SCREW150"
                        value={formData.productName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="name">
                        <b> Product Type </b>
                      </label>
                      <input
                        type="text"
                        id="productType"
                        name="productType"
                        className="form-control"
                        placeholder="Simple"
                        value={formData.productType}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="slug">
                        <b>Slug</b>
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            https://example.com/product/
                          </span>
                        </div>
                        <input
                          type="text"
                          id="slug"
                          name="slug"
                          className="form-control"
                          value={formData.slug}
                          placeholder="brandix-screwdriver150"
                          onChange={handleInputChange}
                        />
                      </div>
                      <p className="mt-2">
                        Unique human-readable product identifier. No longer than
                        255 characters.
                      </p>
                    </div>
                    <h4>Description</h4>
                    <div className="form-group mb-4">
                      <textarea
                        name="Description"
                        id="Description"
                        className="form-control"
                        value={formData.Description}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <Editor
                      initialdefaultValue="<p>This is the initial content of the editor</p>"
                      apiKey="k4wjbhrsxipehw955y2hg7i3c5jb0p8j38twj2raedkrlf7x"
                      init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | bold italic backcolor | lignleft aligncenter alignright alignjustify | \bullist numlist outdent indent | removeformat | help",
                      }}
                    />

                    <div className="form-group">
                      <h3>Care Instuctions</h3>
                      <textarea
                        className="form-control"
                        name="shortDescription"
                        id="shortDescription"
                        rows="2"
                        defaultValue={formData.shortDescription}
                        placeholder="Enter short description"
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="form-group my-2">
                      <h3>Weight</h3>
                      <div className="selection-section">
                        <div className="form-group">
                          <input
                            id="weight"
                            name="weight"
                            type="text"
                            className="form-control"
                            value={formData.weight}
                            placeholder="1 kg"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border p-3 my-5 bg-white rounded shadow">
                    <h3
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "103.5%",
                      }}
                    >
                      Pricing
                    </h3>
                    <div className="d-flex justify-content-between">
                      <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                          id="Price"
                          name="Price"
                          type="text"
                          className="form-control"
                          value={formData.Price}
                          placeholder="1499"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="old_price">Old Price</label>
                        <input
                          id="oldPrice"
                          name="oldPrice"
                          type="text"
                          className="form-control"
                          value={formData.oldPrice}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="old_price">Scheduled Discount</label>
                        <input
                          id="Discount"
                          name="Discount"
                          type="text"
                          className="form-control"
                          value={formData.discount}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {/* <Link to="#" className="text-decoration-none">
                      Scheduled Discount
                    </Link> */}
                  </div>
                  <div className="card border  rounded p-3 mt-4 shadow">
                    <h3
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "103.5%",
                      }}
                    >
                      Inventory
                    </h3>
                    {/* <h3>Inventory</h3> */}
                    <div className="d-flex flex-column">
                      <label htmlFor="sku">
                        {" "}
                        <h5> SKU</h5>
                      </label>
                      <input
                        id="SKU"
                        name="SKU"
                        type="text"
                        className="form-control mb-3"
                        value={formData.SKU}
                        onChange={handleInputChange}
                      />
                      <div className="d-flex flex-row align-items-center mb-3">
                        <input type="checkbox" name="" id="" className="mr-2" />
                        <span>Enable Stock Management</span>
                      </div>
                      <label htmlFor="">
                        <h5>Stock Quantity</h5>
                      </label>
                      <input
                        type="text"
                        id="stockQuantity"
                        name="stockQuantity"
                        className="form-control"
                        value={formData.stockQuantity}
                        placeholder="40"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="card  my-5 shadow">
                    <h3
                      className="row comman_header text-light bg-danger rounded ms-0"
                      style={{ width: "100%" }}
                    >
                      Images
                    </h3>
                    {/* <h2 className="ps-2 ms-2">Images</h2> */}
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th style={{ width: "60%" }}>Alt Text</th>
                            <th>Order</th>
                            <th className="">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              {/* <img className="table_img" src="" alt="" /> */}
                              {selectedImage && (
                                <img
                                  className="table_img"
                                  src={selectedImage}
                                  alt=""
                                />
                              )}
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control border border-0"
                                value={formData.name}
                                onChange={handleInputChange}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control border border-0"
                                placeholder=""
                              />
                            </td>
                            <td className="text-danger">
                              <FontAwesomeIcon icon={faTrashCan} />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="form-group mb-0 col choose_file position-relative"
                      style={{ marginLeft: "5px", paddingBottom: "15px" }}
                    >
                      <Link>
                        {" "}
                        <span style={{ marginLeft: "5px" }}>
                          Upload New Image
                        </span>
                      </Link>
                      <label
                        htmlFor="upload-image"
                        style={{ height: "39px", marginTop: "-1px" }}
                      >
                        <i className="fal fa-camera me-1"></i>
                        Choose File{" "}
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        name="upload-image"
                        id="upload-image"
                        onChange={(e) => handleFileChange(e, "uploadImage")}
                        style={{ width: "98%", marginLeft: "4px" }}
                      />
                    </div>
                  </div>
                  <div className="card border rounded p-3 mt-4 mb-5 shadow">
                    <h3
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "103.5%",
                      }}
                    >
                      Search Engine Optimization
                    </h3>
                    {/* <h3>Search Engine Optimization</h3> */}
                    <p className="">
                      Provide information that will help improve the snippet and
                      bring your product to the top of Search Engine
                    </p>
                    <div className="form-group">
                      <label htmlFor="page_title" className="font-weight-bold">
                        <h5>Page Title</h5>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pageTitle"
                        name="pageTitle"
                        value={formData.pageTitle}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group my-3">
                      <label
                        htmlFor="meta_description"
                        className="font-weight-bold"
                      >
                        <h5>Meta Description</h5>
                      </label>
                      <textarea
                        id="metaDescription"
                        name="metaDescription"
                        className="form-control"
                        rows="3"
                        defaultValue={formData.metaDescription}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="card shadow p-3 my-5 bg-white rounded">
                    <h3
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "112%",
                      }}
                    >
                      Vigibility
                    </h3>
                    {/* <h3 style={{ marginLeft: '15px' }}>Visibility</h3> */}
                    <div className="card-body">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="visibility"
                          id="published"
                          value="published"
                          // defaultValue={formData.published}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="published">
                          Published
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="visibility"
                          id="scheduled"
                          value="scheduled"
                          onChange={handleInputChange}
                          defaultChecked
                        />
                        <label className="form-check-label" htmlFor="scheduled">
                          Scheduled
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="visibility"
                          id="hidden"
                          value="hidden"
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="hidden">
                          Hidden
                        </label>
                      </div>
                      <h3 className="mt-3">Publish Date</h3>
                      <input
                        className="form-control mt-3"
                        id="datepicker"
                        name="datepicker"
                        type="date"
                        placeholder="Select date and time"
                        value={formData.datepicker}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="card border-blue shadow p-3 mb-5 bg-white rounded">
                    <h3
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "112%",
                      }}
                    >
                      <label htmlFor="">Category</label>
                    </h3>

                    <form
                      className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                      action=""
                    >
                      <div className="form-group col-12">
                        <select
                          className="select form-control w-100"
                          size={100}
                          name="categoryId"
                          id="categoryId"
                          value={subSubCategory.categoryId}
                          onChange={handleInputChange1}
                        >
                          {Array.isArray(categories) &&
                            categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.categoryName_en}
                              </option>
                            ))}
                        </select>
                      </div>
                    </form>
                  </div>
                  <div className="card border-blue shadow p-3 mb-5 bg-white rounded">
                    <h3
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "112%",
                      }}
                    >
                      <label htmlFor="">Sub Category</label>
                    </h3>

                    <form
                      className="form-design pt-4 px-3 help-support-form row align-items-end justify-content-between"
                      action=""
                    >
                      <div className="form-group col-12">
                        <select
                          className="select form-control w-100"
                          size={100}
                          name="categoryId1"
                          id="categoryId1"
                          value={subSubCategory.categoryId1}
                          onChange={handleInputChange1}
                        >
                          {Array.isArray(subCategories) &&
                            subCategories.map((subCategory) => (
                              <option
                                key={subCategory._id}
                                value={subCategory._id}
                              >
                                {subCategory.subCategoryName_en}
                              </option>
                            ))}
                        </select>
                      </div>
                    </form>
                  </div>

                  <div className="card border-blue shadow p-3 mb-5 bg-white rounded">
                    <h3
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "112%",
                      }}
                    >
                      Brand
                    </h3>
                    {/* <h3 style={{ marginLeft: '15px' }}>Categories</h3> */}
                    <div className="card-body">
                      <form className="d-flex flex-column">
                        <input
                          type="text"
                          id="brand"
                          name="brand"
                          className="form-control mb-2"
                          placeholder="Puma"
                          value={formData.brand}
                          onChange={handleInputChange}
                        />
                      </form>
                    </div>
                  </div>
                  <div className="card shadow p-3 mb-5 bg-white rounded">
                    <h3
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "112%",
                      }}
                    >
                      Tags
                    </h3>
                    {/* <h2 className='ms-3'>Tags</h2> */}
                    <div className="card-body">
                      <input
                        type="text"
                        id="Tags"
                        name="Tags"
                        className="form-control"
                        value={formData.Tags}
                        placeholder="Enter tags"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="card shadow p-3 mb-5 bg-white rounded">
                    <h3
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "112%",
                      }}
                    >
                      Product Color
                    </h3>
                    <div className="card-body">
                      <input
                        type="text"
                        id="color"
                        name="color"
                        className="form-control"
                        value={formData.color}
                        onChange={handleInputChange}
                        placeholder="Enter Color"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductManagement;
