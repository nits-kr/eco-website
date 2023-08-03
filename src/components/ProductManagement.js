import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

function ProductManagement() {
  const [selectedImage, setSelectedImage] = useState([]);
  const [formData, setFormData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
    brandId1 :"",
  });
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const navigate = useNavigate();
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
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/brand-list"
        );
        setBrands(response.data.results.list);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData2();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e, key) => {
    const files = e.target.files;
    let img = [...selectedImage];
    for (const file of files) {
      img.push(file);
    }
    console.log("img", img);
    setSelectedImage(img);
  };
  const handleOnSave = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("productName_en", formData.productNameEn);
    data.append("productName_ar", formData.productNameAr);
    data.append("slug", formData.slug);
    data.append("Description", formData.DescriptionEn);
    data.append("Description_ar", formData.DescriptionAr);
    // data.append("Discount", formData.discount);
    data.append("weight", formData.weight);
    data.append("weight_ar", formData.weightAr);
    data.append("brandName", formData.brand);
    data.append("productColor", formData.color);
    data.append("productColor_ar", formData.colorAr);
    data.append("careInstuctions", formData.shortDescriptionEn);
    data.append("careInstuctions_ar", formData.shortDescriptionAr);
    data.append("Price", formData.Price);
    data.append("oldPrice", formData.oldPrice);
    data.append("dollarPrice", formData.dollar);
    data.append("SKU", formData.SKUEn);
    data.append("SKU_ar", formData.SKUAr);
    data.append("stockQuantity", formData.stockQuantity);
    data.append("pageTitle", formData.pageTitleEn);
    data.append("pageTitle_ar", formData.pageTitleAr);
    data.append("metaDescription", formData.metaDescriptionEn);
    data.append("metaDescription_ar", formData.metaDescriptionAr);
    data.append("visibility", formData.visibility);
    data.append("visibility_ar", formData.visibilityAr);
    data.append("publishDate", formData.datepicker);
    data.append("Tags", formData.Tags);
    data.append("Tags_ar", formData.TagsAr);
    data.append("category_Id", subSubCategory.categoryId);
    data.append("Subcategory_Id", subSubCategory.categoryId1);
    data.append("brand_Id", "64c25a9524e0f35295000500");
    selectedImage.map((item, index) => {
      data.append(`product_Pic`, item);
    });
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
            navigate("/products");
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
                marginTop: "-30px",
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
              {/* <button
                // to="/products"
                className="btn btn-primary"
                style={{ marginRight: "24px" }}
                onClick={handleOnSave}
              >
                Save
              </button> */}
            </span>
            <div className="row-12" style={{ marginTop: "-60px" }}>
              <form
                action=""
                className="row justify-content-between"
                onSubmit={handleOnSave}
                // style={{ marginTop: "-30px" }}
              >
                <div className="col-12 text-end">
                  <button
                    // type="submit"
                    // className="btn btn-primary mt-4"
                    className="comman_btn2 bg-primary text-light border border-none"
                    type="submit"
                    style={{
                      display: "inline-flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      marginBottom: "-40px",
                      borderRadius:"10px"
                    }}
                    // onClick={handleOnSave}
                  >
                    Save
                  </button>
                </div>

                <div className=" col-9  my-5">
                  <div className="card p-3 shadow">
                    <h3
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "103.9%",
                      }}
                    >
                      Basic Information
                    </h3>
                    <div className="form-group">
                      <label htmlFor="name">
                        <b>
                          {" "}
                          Product Name(EN)
                          <span className="required-field text-danger">*</span>
                        </b>
                      </label>
                      <input
                        type="text"
                        id="productNameEn"
                        name="productNameEn"
                        className="form-control"
                        placeholder="brandix screwdriver SCREW150"
                        value={formData.productNameEn}
                        onChange={handleInputChange}
                        required
                        minLength="3"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">
                        <b>
                          {" "}
                          Product Name(AR)
                          <span className="required-field text-danger">*</span>
                        </b>
                      </label>
                      <input
                        type="text"
                        id="productNameAr"
                        name="productNameAr"
                        className="form-control"
                        placeholder="brandix screwdriver SCREW150"
                        value={formData.productNameAr}
                        onChange={handleInputChange}
                        required
                        minLength="3"
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
                    <h5>
                      Description(EN)
                      <span className="required-field text-danger">*</span>
                    </h5>
                    <div className="form-group mb-4">
                      <textarea
                        name="DescriptionEn"
                        id="DescriptionEn"
                        className="form-control"
                        value={formData.DescriptionEn}
                        onChange={handleInputChange}
                        required
                        minLength="3"
                      ></textarea>
                    </div>
                    <h5>Description(AR)</h5>
                    <div className="form-group mb-4">
                      <textarea
                        name="DescriptionAr"
                        id="DescriptionAr"
                        className="form-control"
                        value={formData.DescriptionAr}
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
                      <h5>
                        Care Instuctions(EN)
                        <span className="required-field text-danger">*</span>
                      </h5>
                      <textarea
                        className="form-control"
                        name="shortDescriptionEn"
                        id="shortDescriptionEn"
                        rows="2"
                        defaultValue={formData.shortDescriptionEn}
                        placeholder="Enter short description"
                        onChange={handleInputChange}
                        required
                        minLength="3"
                      ></textarea>
                      <h5>Care Instuctions(AR)</h5>
                      <textarea
                        className="form-control"
                        name="shortDescriptionAr"
                        id="shortDescriptionAr"
                        rows="2"
                        defaultValue={formData.shortDescriptionAr}
                        placeholder="أدخل وصفًا موجزًا"
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="form-group my-2">
                      <h5>Weight(EN)</h5>
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
                      <h5>Weight(AR)</h5>
                      <div className="selection-section">
                        <div className="form-group">
                          <input
                            id="weightAr"
                            name="weightAr"
                            type="text"
                            className="form-control"
                            value={formData.weightAr}
                            placeholder="1 كجم"
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
                        width: "103.9%",
                      }}
                    >
                      Pricing
                    </h3>
                    <div className="d-flex justify-content-between">
                      <div
                        className="form-group"
                        style={{ marginRight: "10px" }}
                      >
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
                      <div
                        className="form-group"
                        style={{ marginRight: "10px" }}
                      >
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
                      <div
                        className="form-group"
                        style={{ marginRight: "10px" }}
                      >
                        <label htmlFor="old_price">dollarPrice</label>
                        <input
                          id="dollar"
                          name="dollar"
                          type="text"
                          className="form-control"
                          value={formData.dollar}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* <div className="form-group">
                        <label htmlFor="old_price">Discount</label>
                        <input
                          id="Discount"
                          name="Discount"
                          type="number"
                          className="form-control"
                          value={formData.discount}
                          onChange={handleInputChange}
                        />
                      </div> */}
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
                        width: "103.9%",
                      }}
                    >
                      Inventory
                    </h3>
                    {/* <h3>Inventory</h3> */}
                    <div className="d-flex flex-column">
                      <label htmlFor="sku">
                        {" "}
                        <h5>
                          {" "}
                          SKU(EN)
                          <span className="required-field text-danger">*</span>
                        </h5>
                      </label>
                      <input
                        id="SKUEn"
                        name="SKUEn"
                        type="text"
                        className="form-control mb-3"
                        value={formData.SKUEn}
                        onChange={handleInputChange}
                        required
                        minLength="3"
                      />
                      <label htmlFor="sku">
                        {" "}
                        <h5> SKU(AR)</h5>
                      </label>
                      <input
                        id="SKUAr"
                        name="SKUAr"
                        type="text"
                        className="form-control mb-3"
                        value={formData.SKUAr}
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
                    {/* <div className="table-responsive">
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
                    </div> */}
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
                          {/* {selectedImage.map((image, index) => (
                            <tr key={index}>
                              <td>
                                {image && (
                                  <img
                                    className="table_img"
                                    src={image}
                                    alt=""
                                  />
                                )}
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control border border-0"
                                  // value={formData[index]?.name || ""}
                                  // onChange={(e) =>
                                  //   setFormData((prevFormData) => ({
                                  //     ...prevFormData,
                                  //     [index]: {
                                  //       ...prevFormData[index],
                                  //       name: e.target.value,
                                  //     },
                                  //   }))
                                  // }
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
                          ))} */}
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
                      {/* <input
                        type="file"
                        className="form-control"
                        name="uploadImage"
                        id="uploadImage"
                        miltiple
                        onChange={(e) => handleFileChange(e, "uploadImage")}
                        style={{ width: "98%", marginLeft: "4px" }}
                      /> */}
                      <input
                        type="file"
                        className="form-control shadow-none"
                        defaultValue=""
                        accept="image/*"
                        name="gallery_images"
                        onChange={(e) => handleFileChange(e, "gallery_images")}
                        multiple
                      />
                    </div>
                  </div>
                  <div className="card border rounded p-3 mt-4 mb-5 shadow">
                    <h3
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "103.9%",
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
                        <h6>
                          Page Title(EN)
                          <span className="required-field text-danger">*</span>
                        </h6>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pageTitleEn"
                        name="pageTitleEn"
                        value={formData.pageTitleEn}
                        onChange={handleInputChange}
                        required
                        minLength="3"
                      />
                      <label htmlFor="page_title" className="font-weight-bold">
                        <h6>Page Title(AR)</h6>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pageTitleAr"
                        name="pageTitleAr"
                        value={formData.pageTitleAr}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group my-3">
                      <label
                        htmlFor="meta_descriptionEn"
                        className="font-weight-bold"
                      >
                        <h6>
                          Meta Description(EN)
                          <span className="required-field text-danger">*</span>
                        </h6>
                      </label>
                      <textarea
                        id="metaDescriptionEn"
                        name="metaDescriptionEn"
                        className="form-control"
                        rows="3"
                        defaultValue={formData.metaDescriptionEn}
                        onChange={handleInputChange}
                        required
                        minLength="3"
                      ></textarea>
                      <label
                        htmlFor="meta_descriptionAr"
                        className="font-weight-bold"
                      >
                        <h6>Meta Description(AR)</h6>
                      </label>
                      <textarea
                        id="metaDescriptionAr"
                        name="metaDescriptionAr"
                        className="form-control"
                        rows="3"
                        defaultValue={formData.metaDescriptionAr}
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
                        width: "114%",
                      }}
                    >
                      Vigibility(EN)
                    </h3>
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
                  <div className="card shadow p-3 my-5 bg-white rounded">
                    <h3
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "114%",
                      }}
                    >
                      Vigibility(AR)
                    </h3>
                    <div className="card-body">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="visibilityAr"
                          id="publishedAr"
                          value="نشرت"
                          // defaultValue={formData.published}
                          onChange={handleInputChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="publishedAr"
                        >
                          نشرت
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="visibilityAr"
                          id="scheduledAr"
                          value="المقرر"
                          onChange={handleInputChange}
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="scheduledAr"
                        >
                          المقرر
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="visibilityAr"
                          id="hiddenAr"
                          value="مختفي"
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="hiddenAr">
                          مختفي
                        </label>
                      </div>
                      {/* <h3 className="mt-3">Publish Date</h3>
                      <input
                        className="form-control mt-3"
                        id="datepicker"
                        name="datepicker"
                        type="date"
                        placeholder="Select date and time"
                        value={formData.datepicker}
                        onChange={handleInputChange}
                      /> */}
                    </div>
                  </div>
                  <div className="card border-blue shadow p-3 mb-5 bg-white rounded">
                    <h3
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "114%",
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
                        width: "114%",
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
                        width: "114%",
                      }}
                    >
                      <label htmlFor="">Brand</label>
                    </h3>

                    <form
                      className="form-design pt-4 px-3 help-support-form row align-items-end justify-content-between"
                      action=""
                    >
                      <div className="form-group col-12">
                        <select
                          className="select form-control w-100"
                          size={100}
                          name="brandId1"
                          id="brandId1"
                          value={subSubCategory.brandId1}
                          onChange={handleInputChange1}
                        >
                          {Array.isArray(brands) &&
                            brands.map((subCategory) => (
                              <option
                                key={subCategory._id}
                                value={subCategory._id}
                              >
                                {subCategory.brandName_en}
                              </option>
                            ))}
                        </select>
                      </div>
                    </form>
                  </div>
                  <div className="card shadow p-3 mb-5 bg-white rounded">
                    <h3
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "114%",
                      }}
                    >
                      Tags(EN)
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
                        width: "114%",
                      }}
                    >
                      Tags(AR)
                    </h3>
                    {/* <h2 className='ms-3'>Tags</h2> */}
                    <div className="card-body">
                      <input
                        type="text"
                        id="TagsAr"
                        name="TagsAr"
                        className="form-control"
                        value={formData.TagsAr}
                        placeholder="أدخل العلامات"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="card shadow p-3 mb-5 bg-white rounded">
                    <h4
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "114%",
                      }}
                    >
                      Product Color(EN)
                    </h4>
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
                  <div className="card shadow p-3 mb-5 bg-white rounded">
                    <h4
                      className="row comman_header text-light bg-danger rounded"
                      style={{
                        marginTop: "-16px",
                        marginLeft: "-16px",
                        width: "114%",
                      }}
                    >
                      Product Color(AR)
                    </h4>
                    <div className="card-body">
                      <input
                        type="text"
                        id="colorAr"
                        name="colorAr"
                        className="form-control"
                        value={formData.colorAr}
                        onChange={handleInputChange}
                        placeholder="أدخل اللون"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductManagement;
