import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faCopy } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

function ProductManagementEdit(props) {
  const [selectedImage, setSelectedImage] = useState([]);
  const [formData, setFormData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productListItems, setProductListItems] = useState([]);
  console.log("productListItems", productListItems);

  const [subSubCategory, setSubSubCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
    brandId1: "",
  });
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("props", props);
  console.log("id", id);

  useEffect(() => {
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/productList"
      )
      .then((response) => {
        const products = response?.data?.results?.list.reverse();
        setProductList(products);

        const productWithId = products.find((item) => item._id === id);
        if (productWithId) {
          setProductListItems([productWithId]);
        } else {
          setProductListItems([]);
        }
      });
  }, [id]);

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
    // data.append("slug", formData.slug);
    data.append("Description", formData.DescriptionEn);
    data.append("Description_ar", formData.DescriptionAr);
    data.append("weight", formData.weight);
    data.append("weight_ar", formData.weightAr);
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
    // data.append("brand_Id", subSubCategory.brandId1);
    if (subSubCategory.brandId1) {
      data.append("brand_Id", subSubCategory.brandId1);
    }
    selectedImage.map((item, index) => {
      data.append(`product_Pic`, item);
    });
    axios
      .patch(
        `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/updateProduct/${id}`,
        data
      )
      .then((response) => {
        setFormData(response.data.results.updateData);
        console.log(response.data.results.updateData);
        Swal.fire({
          title: "Product Updated!",
          text: "Your new product has been Updated successfully.",
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

  const copyToClipboard = async (text) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        if (text) {
          toast.info(
            <>
              Copied To Clipboard:
              <strong>{text}</strong>
            </>,
            {
              position: "bottom-left",
            }
          );
        }
        return true;
      } catch (error) {
        console.error("Error copying to clipboard:", error);
        return false;
      }
    } else {
      console.error("Clipboard API is not supported.");
      return false;
    }
  };
  const displaySlug = (slug) => {
    return slug.length > 10 ? `${slug.slice(0, 10)}...` : slug;
  };
  return (
    <>
      <Sidebar Dash={"product-management"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row offer-management justify-content-center">
              <div className="col-12">
                <form className="row" onSubmit={handleOnSave}>
                  <div className="col-9 mb-4">
                    <div className="main_head">Edit Products</div>
                  </div>
                  <div className="col-3 text-end mb-4">
                    <button className="comman_btn2">Save</button>
                  </div>
                  <div className="col-9">
                    <div className="row me-0">
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Basic Informations</h2>
                          </div>
                        </div>
                        <div
                          className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group col-6">
                            <label htmlFor="productNameEn">
                              Product Name(En)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="productNameEn"
                              id="productNameEn"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].productName_en
                                  : ""
                              }
                              // value={formData.productNameEn}
                              onChange={handleInputChange}
                              required
                              //minLength="3"
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="productNameAr">
                              Product Name(Ar)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              // defaultValue=""
                              name="productNameAr"
                              id="productNameAr"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].productName_ar
                                  : ""
                              }
                              // value={formData.productNameAr}
                              onChange={handleInputChange}
                              required
                              //minLength="3"
                            />
                          </div>
                          <div className="form-group col-12">
                            <label htmlFor="productType">
                              Product Type
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="productType"
                              id="productType"
                              // value={formData.productType}
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].productName_en
                                  : ""
                              }
                              onChange={handleInputChange}
                              required
                              //minLength="3"
                            />
                          </div>
                          <div className="form-group col-12">
                            <label htmlFor="slug">
                              Slug
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            {/* <input
                              type="text"
                              className="form-control"
                              name="slug"
                              id="slug"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].slug
                                  : ""
                              }
                              placeholder="brandix-screwdriver150"
                              onClick={() =>
                                copyToClipboard(productListItems[0].slug)
                              }
                              readOnly
                            /> */}
                            <input
                              type="text"
                              className="form-control"
                              name="slug"
                              id="slug"
                              title="copy Slug"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].slug
                                  : ""
                              }
                              placeholder="brandix-screwdriver150"
                              onClick={() =>
                                copyToClipboard(productListItems[0].slug)
                              }
                              readOnly
                              style={{
                                cursor: "pointer",
                              }}
                            />
                            {/* <FontAwesomeIcon icon={faCopy} /> */}
                            <div className="Slug_text">
                              Unique Human-readable product identifier. No
                              Longer than 255 characters.
                            </div>
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="DescriptionEn">
                              Description(En)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <textarea
                              name="DescriptionEn"
                              className="form-control"
                              id="DescriptionEn"
                              style={{ height: 120 }}
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].Description
                                  : ""
                              }
                              // value={formData.DescriptionEn}
                              onChange={handleInputChange}
                              required
                              //minLength="3"
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="DescriptionAr">
                              Description(Ar)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <textarea
                              name="DescriptionAr"
                              className="form-control"
                              id="DescriptionAr"
                              style={{ height: 120 }}
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].Description_ar
                                  : ""
                              }
                              // value={formData.DescriptionAr}
                              onChange={handleInputChange}
                              required
                              //minLength="3"
                            />
                          </div>
                          {/* <div className="form-group col-12">
                            <label htmlFor="">
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
                            </label>
                          </div> */}
                          <div className="form-group col-6">
                            <label htmlFor="shortDescriptionEn">
                              Care Instructions(En)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <textarea
                              name="shortDescriptionEn"
                              className="form-control"
                              id="shortDescriptionEn"
                              style={{ height: 120 }}
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].careInstuctions
                                  : ""
                              }
                              // value={formData.shortDescriptionEn}
                              placeholder="Enter care Insructions..."
                              onChange={handleInputChange}
                              required
                              //minLength="3"
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="shortDescriptionAr">
                              Care Instructions(Ar)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <textarea
                              name="shortDescriptionAr"
                              className="form-control"
                              id="shortDescriptionAr"
                              style={{ height: 120 }}
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].careInstuctions_ar
                                  : ""
                              }
                              // defaultValue={formData.shortDescriptionAr}
                              placeholder="أدخل وصفًا موجزًا"
                              onChange={handleInputChange}
                              required
                              //minLength="3"
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="weight">
                              Weight(En)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              // defaultValue=""
                              name="weight"
                              id="weight"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].weight
                                  : ""
                              }
                              // value={formData.weight}
                              placeholder="1 kg"
                              onChange={handleInputChange}
                              required
                              //minLength="3"
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="weightAr">
                              Weight(Ar)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              // defaultValue=""
                              name="weightAr"
                              id="weightAr"
                              // value={formData.weightAr}
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].weight_ar
                                  : ""
                              }
                              placeholder="1 كجم"
                              onChange={handleInputChange}
                              required
                              //minLength="3"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Pricing</h2>
                          </div>
                        </div>
                        <div
                          className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group col-4">
                            <label htmlFor="Price">
                              Price
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="Price"
                              id="Price"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].Price
                                  : ""
                              }
                              // value={formData.Price}
                              placeholder="1499"
                              onChange={handleInputChange}
                              required
                              // //minLength="3"
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="oldPrice">
                              Old Price
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="oldPrice"
                              id="oldPrice"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].oldPrice
                                  : ""
                              }
                              // value={formData.oldPrice}
                              onChange={handleInputChange}
                              required
                              //minLength="3"
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="dollar">
                              Dollar Price
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="dollar"
                              id="dollar"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].dollarPrice
                                  : ""
                              }
                              // value={formData.dollar}
                              onChange={handleInputChange}
                              required
                              // //minLength="3"
                            />
                          </div>
                          {/* <div className="form-group col-6">
                            <label htmlFor="">Discount</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue=""
                              name="name"
                              id="name"
                            />
                          </div> */}
                        </div>
                      </div>
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Inventory</h2>
                          </div>
                        </div>
                        <div
                          className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group col-6">
                            <label htmlFor="SKUEn">
                              SKU(En)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="SKUEn"
                              id="SKUEn"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].SKU
                                  : ""
                              }
                              // value={formData.SKUEn}
                              onChange={handleInputChange}
                              required
                              // //minLength="3"
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="SKUAr">
                              SKU(Ar)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="SKUAr"
                              id="SKUAr"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].SKU_ar
                                  : ""
                              }
                              // value={formData.SKUAr}
                              onChange={handleInputChange}
                              required
                              // //minLength="3"
                            />
                          </div>
                          {/* <div className="form-group col-12 new_radio_design">
                            <input
                              className="d-none"
                              type="radio"
                              id="Enable"
                              name="Enable"
                            />
                            <label htmlFor="Enable">
                              Enable Stock Management{" "}
                            </label>
                          </div> */}
                          <div className="form-group col-12">
                            <label htmlFor="">
                              Stock Quantity
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="stockQuantity"
                              id="stockQuantity"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].stockQuantity
                                  : ""
                              }
                              // value={formData.stockQuantity}
                              placeholder="40"
                              onChange={handleInputChange}
                              required
                              // //minLength="3"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Images</h2>
                          </div>
                        </div>
                        <div
                          className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group col-12 choose_file position-relative">
                            <span>Upload Image</span>
                            <label htmlFor="upload_video">
                              <i className="fal fa-camera me-1" />
                              Choose File{" "}
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              defaultValue=""
                              id="gallery_images"
                              accept="image/*"
                              name="gallery_images"
                              onChange={(e) =>
                                handleFileChange(e, "gallery_images")
                              }
                              multiple
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Search Engine Optimization</h2>
                          </div>
                        </div>
                        <div
                          className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="Infor mb-4">
                            Provide Informations that will help imporove the
                            snippet and bring your product to the top of the
                            Search Engine
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="pageTitleEn">
                              Page Title(En)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="pageTitleEn"
                              id="pageTitleEn"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].pageTitle
                                  : ""
                              }
                              // value={formData.pageTitleEn}
                              onChange={handleInputChange}
                              required
                              //minLength="3"
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="pageTitleAr">
                              Page Title(Ar)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="pageTitleAr"
                              id="pageTitleAr"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].pageTitle_ar
                                  : ""
                              }
                              // value={formData.pageTitleAr}
                              onChange={handleInputChange}
                              required
                              //minLength="3"
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="metaDescriptionEn">
                              Meta Description(En)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <textarea
                              name="metaDescriptionEn"
                              className="form-control"
                              id="metaDescriptionEn"
                              style={{ height: 120 }}
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].metaDescription
                                  : ""
                              }
                              // value={formData.metaDescriptionEn}
                              onChange={handleInputChange}
                              required
                              //minLength="3"
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="metaDescriptionAr">
                              Meta Description(Ar)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <textarea
                              name="metaDescriptionAr"
                              className="form-control"
                              id="metaDescriptionAr"
                              style={{ height: 120 }}
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].metaDescription_ar
                                  : ""
                              }
                              // value={formData.metaDescriptionAr}
                              onChange={handleInputChange}
                              required
                              //minLength="3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="row ms-0">
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Visibility(En)</h2>
                          </div>
                        </div>
                        <div
                          className="form-design py-3 px-2 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group mb-2 col-12 new_radio_design">
                            <input
                              className="d-none"
                              type="radio"
                              id="published"
                              name="visibility"
                              value="published"
                              // defaultValue={formData.published}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="published">Published </label>
                          </div>
                          <div className="form-group mb-2 col-12 new_radio_design">
                            <input
                              className="d-none"
                              type="radio"
                              id="scheduled"
                              name="visibility"
                              value="scheduled"
                              onChange={handleInputChange}
                              defaultChecked
                            />
                            <label htmlFor="scheduled">Schedduled </label>
                          </div>
                          <div className="form-group col-12 new_radio_design">
                            <input
                              className="d-none"
                              type="radio"
                              id="hidden"
                              name="visibility"
                              value="hidden"
                              onChange={handleInputChange}
                            />
                            <label htmlFor="hidden">Hidden </label>
                          </div>
                          <div className="form-group col-12">
                            <label htmlFor="">Publish Date</label>
                            <input
                              type="date"
                              className="form-control"
                              // defaultValue=""
                              name="datepicker"
                              id="datepicker"
                              placeholder="Select date and time"
                              value={formData.datepicker}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Visibility(Ar)</h2>
                          </div>
                        </div>
                        <div
                          className="form-design py-3 px-2 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group mb-2 col-12 new_radio_design">
                            <input
                              className="d-none"
                              type="radio"
                              id="publishedAr"
                              name="visibilityAr"
                              value="نشرت"
                              // defaultValue={formData.published}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="publishedAr">نشرت </label>
                          </div>
                          <div className="form-group mb-2 col-12 new_radio_design">
                            <input
                              className="d-none"
                              type="radio"
                              id="scheduledAr"
                              name="visibilityAr"
                              value="المقرر"
                              onChange={handleInputChange}
                              defaultChecked
                            />
                            <label htmlFor="scheduledAr">المقرر </label>
                          </div>
                          <div className="form-group col-12 new_radio_design">
                            <input
                              className="d-none"
                              type="radio"
                              id="hiddenAr"
                              name="visibilityAr"
                              value="مختفي"
                              onChange={handleInputChange}
                            />
                            <label htmlFor="hiddenAr">مختفي </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Category</h2>
                          </div>
                        </div>
                        <div
                          className="form-design py-3 px-2 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group col-12">
                            <label htmlFor="">Category</label>
                            <select
                              className="select form-control"
                              multiple=""
                              name="categoryId"
                              id="categoryId"
                              value={subSubCategory.categoryId}
                              onChange={handleInputChange1}
                            >
                              {Array.isArray(categories) &&
                                categories.map((category) => (
                                  <option
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {category.categoryName_en}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Sub Category</h2>
                          </div>
                        </div>
                        <div
                          className="form-design py-3 px-2 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group col-12">
                            <label htmlFor="">Sub Category</label>
                            <select
                              className="select form-control"
                              multiple=""
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
                        </div>
                      </div>
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Brand</h2>
                          </div>
                        </div>
                        <div
                          className="form-design py-3 px-2 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group col-12">
                            <label htmlFor="">Brand</label>
                            <select
                              className="select form-control"
                              multiple=""
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
                        </div>
                      </div>
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Tags(En)</h2>
                          </div>
                        </div>
                        <div
                          className="form-design py-3 px-2 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group col-12">
                            <label htmlFor="Tags">
                              Tags(En)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="Tags"
                              name="Tags"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].Tags
                                  : ""
                              }
                              // value={formData.Tags}
                              placeholder="Enter tags"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Tags(Ar)</h2>
                          </div>
                        </div>
                        <div
                          className="form-design py-3 px-2 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group col-12">
                            <label htmlFor="">
                              Tags(Ar)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="TagsAr"
                              name="TagsAr"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].Tags_ar
                                  : ""
                              }
                              // value={formData.TagsAr}
                              placeholder="أدخل العلامات"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Product Color(En)</h2>
                          </div>
                        </div>
                        <div
                          className="form-design py-3 px-2 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group col-12">
                            <label htmlFor="">
                              Product Color(En)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="color"
                              name="color"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].productColor
                                  : ""
                              }
                              // value={formData.color}
                              onChange={handleInputChange}
                              placeholder="Enter Color"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Product Color(Ar)</h2>
                          </div>
                        </div>
                        <div
                          className="form-design py-3 px-2 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group col-12">
                            <label htmlFor="">
                              Product Color(Ar)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              id="colorAr"
                              name="colorAr"
                              className="form-control"
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].productColor_ar
                                  : ""
                              }
                              // value={formData.colorAr}
                              onChange={handleInputChange}
                              placeholder="أدخل اللون"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade Update_modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-4">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="row">
                <div className="col-12 Update_modal_content py-4">
                  <h2>Disable</h2>
                  <p>Are you sure you want to disable this Offer?</p>
                  <a className="comman_btn mx-2" href="javscript:;">
                    Yes
                  </a>
                  <a className="comman_btn2 mx-2 bg-red" href="javscript:;">
                    NO
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade Edit_modal"
        id="edittoffer"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Offer
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div
                className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                action=""
              >
                <div className="form-group col-6">
                  <label htmlFor="">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="Oneplus Nord"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="10% Off"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group mb-0 col">
                  <label htmlFor="">Code</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={1234234}
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group mb-0 col">
                  <label htmlFor="">Discount</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue="10%"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group mb-0 col-auto">
                  <button className="comman_btn2">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductManagementEdit;
