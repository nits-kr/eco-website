import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import {
  useAddNewVariantMutation,
  useAttributesListMutation,
  useBrandListMutation,
  useCreateProductMutation,
  useGetCategoryListQuery,
  useSubCategoryListMutation,
  useSubSubCategoryListMutation,
  useValueListMutation,
} from "../services/Post";

function ProductManagement2(props) {
  const ecomAdmintoken = useSelector((data) => data?.local?.token);

  const { data: categoryListdata } = useGetCategoryListQuery({
    ecomAdmintoken,
  });

  const [getSubCategory] = useSubCategoryListMutation();
  const [getSubSubCategory] = useSubSubCategoryListMutation();
  const [getAttributes] = useAttributesListMutation();
  const [getValues] = useValueListMutation();
  const [getBrands] = useBrandListMutation();
  const [createProduct] = useCreateProductMutation();
  const [addVariant] = useAddNewVariantMutation();

  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [formData, setFormData] = useState([]);
  const [count, setCount] = useState(0);
  console.log("count", count);
  const [showAddButton, setShowAddButton] = useState(false);
  const [showAddButton2, setShowAddButton2] = useState(false);
  console.log("slug form date", formData);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [attribute, setAttribute] = useState([]);
  const [value, setValue] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
    categoryId3: "",
    brandId1: "",
    attributeId: "",
    valueId: "",
  });
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [imageUrl1, setImageUrl1] = useState("");
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [imageUrl2, setImageUrl2] = useState("");
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [imageUrl3, setImageUrl3] = useState("");
  const [selectedImage4, setSelectedImage4] = useState(null);
  const [imageUrl4, setImageUrl4] = useState("");
  const [selectedImage5, setSelectedImage5] = useState(null);
  const [imageUrl5, setImageUrl5] = useState("");
  const [formData1, setFormData1] = useState({
    bannerPic1: null,
    bannerPic2: null,
    bannerPic3: null,
    bannerPic4: null,
    bannerPic5: null,
  });
  const categoryNameNew = categoryName.replace(/\s+/g, "");
  const subCategoryNameNew = subCategoryName.replace(/\s+/g, "");
  const slug = `www.ecommerce.com/${categoryNameNew}/${subCategoryNameNew}`;
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");

  useEffect(() => {
    if (categoryListdata) {
      setCategories(categoryListdata?.results?.list);
    }
  }, [categoryListdata]);

  const [variantCount, setVariantCount] = useState(1);

  const handleImageUpload1 = (event) => {
    const file = event.target.files[0];
    setSelectedImage1(URL.createObjectURL(file));
    setFormData1({ ...formData1, bannerPic1: event.target.files[0] });
    setImageUrl1(URL.createObjectURL(file));
  };
  const handleImageUpload2 = (event) => {
    const file = event.target.files[0];
    setSelectedImage2(URL.createObjectURL(file));
    setFormData1({ ...formData1, bannerPic2: event.target.files[0] });
    setImageUrl2(URL.createObjectURL(file));
  };
  const handleImageUpload3 = (event) => {
    const file = event.target.files[0];
    setSelectedImage3(URL.createObjectURL(file));
    setFormData1({ ...formData1, bannerPic3: event.target.files[0] });
    setImageUrl3(URL.createObjectURL(file));
  };
  const handleImageUpload4 = (event) => {
    const file = event.target.files[0];
    setSelectedImage4(URL.createObjectURL(file));
    setFormData1({ ...formData1, bannerPic4: event.target.files[0] });
    setImageUrl4(URL.createObjectURL(file));
  };

  const handleAddVariant = () => {
    setVariantCount(variantCount + 1);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    setShowAddButton(true);
  };
  const handleClick2 = () => {
    setShowAddButton2(true);
    setShowAddButton(false);
  };
  const handleClick3 = () => {
    setShowAddButton2(false);
    setShowAddButton(true);
  };

  const handleInputChange1 = (event) => {
    const { name, value } = event.target;
    setSubSubCategory({
      ...subSubCategory,
      [name]: value,
    });
    const selectedCategory = categories.find(
      (category) => category._id === value
    );
    if (selectedCategory) {
      setCategoryName(selectedCategory.categoryName_en);
      console.log(selectedCategory.categoryName_en);
    } else {
      setCategoryName("");
    }
  };
  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setSubSubCategory({
      ...subSubCategory,
      [name]: value,
    });
    const selectedSubCategory = subCategories.find(
      (subCategory) => subCategory._id === value
    );
    if (selectedSubCategory) {
      setSubCategoryName(selectedSubCategory.subCategoryName_en);
      console.log(selectedSubCategory.subCategoryName_en);
    } else {
      setSubCategoryName("");
    }
  };
  const handleInputChange3 = (event) => {
    const { name, value } = event.target;
    setSubSubCategory({
      ...subSubCategory,
      [name]: value,
    });
  };

  useEffect(() => {
    if (
      subSubCategory.categoryId ||
      subSubCategory.categoryId1 ||
      subSubCategory.attributeId
    ) {
      handleGetSubCategory(subSubCategory.categoryId);
      handleGrtBrandList(subSubCategory.categoryId);
      handleGetSubSubCategory(subSubCategory.categoryId1);
      handleGetAttributes(subSubCategory.categoryId);
      handleGetValues(subSubCategory.attributeId);
    }
  }, [
    subSubCategory.categoryId,
    subSubCategory.categoryId1,
    subSubCategory.attributeId,
  ]);

  const handleGetSubCategory = async (id) => {
    const res = await getSubCategory({ id, ecomAdmintoken });
    console.log("res", res);
    setSubCategories(res?.data?.results?.categoryData);
  };

  const handleGetSubSubCategory = async (id) => {
    const res = await getSubSubCategory({ id, ecomAdmintoken });
    console.log("res", res);
    setSubSubCategories(res?.data?.results?.subCategoryData);
  };

  const handleGetAttributes = async (id) => {
    const res = await getAttributes({ id, ecomAdmintoken });
    console.log("res", res);
    setAttribute(res?.data?.results?.subSubCategoryData);
  };

  const handleGetValues = async (id) => {
    const res = await getValues({ id, ecomAdmintoken });
    console.log("res", res);
    setValue(res?.data?.results?.attributeCategoryData);
  };

  const handleGrtBrandList = async (id) => {
    const res = await getBrands({ id, ecomAdmintoken });
    console.log("res", res);
    setBrands(res?.data?.results?.selectBrand);
  };

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
  const handleOnSave = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("productName_en", formData.productNameEn);
    data.append("productName_ar", formData.productNameAr);
    data.append("productType", formData.productType);
    data.append("slug", slug);
    data.append("Description", formData.DescriptionEn);
    data.append("Description_ar", formData.DescriptionAr);
    data.append("careInstuctions", formData.shortDescriptionEn);
    data.append("careInstuctions_ar", formData.shortDescriptionAr);
    if (formData.pageTitleEn) {
      data.append("pageTitle", formData.pageTitleEn);
    }
    if (formData.pageTitleAr) {
      data.append("pageTitle_ar", formData.pageTitleAr);
    }
    if (formData.metaDescriptionEn) {
      data.append("metaDescription", formData.metaDescriptionEn);
    }
    if (formData.metaDescriptionAr) {
      data.append("metaDescription_ar", formData.metaDescriptionAr);
    }
    if (formData.additionalInfoEn) {
      data.append("AdditionalInfo", formData.additionalInfoEn);
    }
    if (formData.additionalInfoAr) {
      data.append("AdditionalInfo_ar", formData.additionalInfoAr);
    }
    data.append("visibility", formData.visibility || "published");
    data.append("visibility_ar", formData.visibilityAr || "نشرت");
    data.append(
      "publishDate",
      formData.datepicker || new Date().toISOString().split("T")[0]
    );

    data.append("category_Id", subSubCategory.categoryId);
    data.append("Subcategory_Id", subSubCategory.categoryId1);
    if (subSubCategory.categoryId3) {
      data.append("subSubcategory_Id", subSubCategory.categoryId3);
    }
    if (subSubCategory.valueId) {
      data.append("values_Id", subSubCategory.valueId);
    }
    if (subSubCategory.attributeId) {
      data.append("attribute_Id", subSubCategory.attributeId);
    }
    if (subSubCategory.brandId1) {
      data.append("brand_Id", subSubCategory.brandId1);
    }
    if (selectedImage && selectedImage.length > 0) {
      selectedImage.map((item, index) => {
        data.append(`product_Pic`, item);
      });
    }

    const res = await createProduct({ data, ecomAdmintoken });
    if (res) {
      setFormData(res.data.results.saveProduct);
      console.log(res.data.results.saveProduct);
      localStorage?.setItem("productId", res?.data?.results?.saveProduct?._id);
      Swal.fire({
        title: "Product Created!",
        text: "Your new product has been created successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    } else {
      toast.error("Error in creating the Product");
    }
  };
  const productId = localStorage?.getItem("productId");

  const handleOnSave1 = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("Price", formData.Price);
    data.append("oldPrice", formData.oldPrice);
    data.append("dollarPrice", formData.dollar);
    data.append("SKU", formData.SKUEn);
    data.append("SKU_ar", formData.SKUAr);
    data.append("stockQuantity", formData.stockQuantity);
    if (formData.pageTitleEn) {
      data.append("pageTitle", formData.pageTitleEn);
    }
    if (formData.pageTitleAr) {
      data.append("pageTitle_ar", formData.pageTitleAr);
    }
    if (formData.metaDescriptionEn) {
      data.append("metaDescription", formData.metaDescriptionEn);
    }
    if (formData.metaDescriptionAr) {
      data.append("metaDescription_ar", formData.metaDescriptionAr);
    }
    if (subSubCategory.categoryId3) {
      data.append("subSubcategory_Id", subSubCategory.categoryId3);
    }
    if (subSubCategory.valueId) {
      data.append("values_Id", subSubCategory.valueId);
    }
    if (subSubCategory.attributeId) {
      data.append("attribute_Id", subSubCategory.attributeId);
    }
    if (subSubCategory.brandId1) {
      data.append("brand_Id", subSubCategory.brandId1);
    }
    if (selectedImage && selectedImage.length > 0) {
      selectedImage.map((item, index) => {
        data.append(`product_Pic`, item);
      });
    }
    if (formData1.bannerPic1) {
      data.append("product_Pic", formData1.bannerPic1);
    }
    // data.append("product_Pic", formData1.bannerPic1);
    if (formData1.bannerPic2) {
      data.append("product_Pic", formData1.bannerPic2);
    }
    if (formData1.bannerPic3) {
      data.append("product_Pic", formData1.bannerPic3);
    }
    if (formData1.bannerPic4) {
      data.append("product_Pic", formData1.bannerPic4);
    }

    const res = await addVariant({ data, ecomAdmintoken, productId });
    if (res) {
      setFormData(res?.data?.results?.saveVarient);

      Swal.fire({
        title: "Product Created!",
        text: "Your new product has been created successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/product-management-edit/${productId}`);
        }
      });
    } else {
    }
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

  return (
    <>
      {loading}
      <Sidebar Dash={"product-management"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row offer-management justify-content-center">
              <div className="col-12">
                <div className="row">
                  <div className="col-9 mb-4">
                    <div className="main_head">Add Product </div>
                  </div>
                  {/* <div className="col-3 text-end mb-4">
                    <button className="comman_btn2">Save</button>
                  </div> */}
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
                          {subSubCategories?.length > 0 ? (
                            <>
                              {" "}
                              <div className="form-group col-6">
                                <label htmlFor=""> Select Category</label>
                                <select
                                  className="select form-control"
                                  multiple=""
                                  name="categoryId"
                                  id="categoryId"
                                  value={subSubCategory.categoryId}
                                  onChange={handleInputChange1}
                                >
                                  <option value="">Select Category</option>
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
                              <div className="form-group col-6">
                                <label htmlFor="">Select Sub-Category</label>
                                <select
                                  className="select form-control"
                                  multiple=""
                                  name="categoryId1"
                                  id="categoryId1"
                                  value={subSubCategory.categoryId1}
                                  onChange={handleInputChange2}
                                >
                                  <option value="">Select Sub Category</option>
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
                              <div className="form-group col-6">
                                <label htmlFor="">
                                  Select Sub-Sub-Category
                                </label>
                                <select
                                  className="select form-control"
                                  multiple=""
                                  name="categoryId3"
                                  id="categoryId3"
                                  value={subSubCategory.categoryId3}
                                  onChange={handleInputChange3}
                                >
                                  <option value="">
                                    Select Sub Sub Category
                                  </option>
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
                                <label htmlFor="">Select Brand</label>
                                <select
                                  className="select form-control"
                                  multiple=""
                                  name="brandId1"
                                  id="brandId1"
                                  value={subSubCategory.brandId1}
                                  onChange={handleInputChange3}
                                >
                                  <option value="">Select Brand</option>
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
                            </>
                          ) : (
                            <>
                              <div className="form-group col-4">
                                <label htmlFor=""> Select Category</label>
                                <select
                                  className="select form-control"
                                  multiple=""
                                  name="categoryId"
                                  id="categoryId"
                                  value={subSubCategory.categoryId}
                                  onChange={handleInputChange1}
                                >
                                  <option value="">Select Category</option>
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
                              <div className="form-group col-4">
                                <label htmlFor="">Select Sub-Category</label>
                                <select
                                  className="select form-control"
                                  multiple=""
                                  name="categoryId1"
                                  id="categoryId1"
                                  value={subSubCategory.categoryId1}
                                  onChange={handleInputChange2}
                                >
                                  <option value="">Select Sub Category</option>
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
                              <div className="form-group col-4">
                                <label htmlFor="">Select Brand</label>
                                <select
                                  className="select form-control"
                                  multiple=""
                                  name="brandId1"
                                  id="brandId1"
                                  value={subSubCategory.brandId1}
                                  onChange={handleInputChange3}
                                >
                                  <option value="">Select Brand</option>
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
                            </>
                          )}

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
                              // defaultValue=""
                              name="productNameEn"
                              id="productNameEn"
                              value={formData?.productNameEn}
                              onChange={handleInputChange}
                              required
                              minLength="3"
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
                              value={formData?.productNameAr}
                              onChange={handleInputChange}
                              required
                              minLength="3"
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
                              // defaultValue=""
                              name="productType"
                              id="productType"
                              value={formData?.productType}
                              onChange={handleInputChange}
                              required
                              minLength="3"
                            />
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
                              // defaultValue={""}
                              value={formData?.DescriptionEn}
                              onChange={handleInputChange}
                              required
                              minLength="3"
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
                              // defaultValue={""}
                              value={formData?.DescriptionAr}
                              onChange={handleInputChange}
                              required
                              minLength="3"
                            />
                          </div>

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
                              value={formData?.shortDescriptionEn}
                              placeholder="Enter care Insructions..."
                              onChange={handleInputChange}
                              required
                              minLength="3"
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
                              // defaultValue={""}
                              defaultValue={formData?.shortDescriptionAr}
                              placeholder="أدخل وصفًا موجزًا"
                              onChange={handleInputChange}
                              required
                              minLength="3"
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="additionalInfoEn">
                              Additional Info(En)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <textarea
                              name="additionalInfoEn"
                              className="form-control"
                              id="additionalInfoEn"
                              style={{ height: 120 }}
                              value={formData?.additionalInfoEn}
                              placeholder="Enter Additional Informations..."
                              onChange={handleInputChange}
                              required
                              minLength="3"
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="additionalInfoAr">
                              Additional Info(Ar)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <textarea
                              name="additionalInfoAr"
                              className="form-control"
                              id="additionalInfoAr"
                              style={{ height: 120 }}
                              // defaultValue={""}
                              defaultValue={formData?.additionalInfoAr}
                              placeholder="أدخل معلومات إضافية..."
                              onChange={handleInputChange}
                              required
                              minLength="3"
                            />
                          </div>
                        </div>
                        <div className="col-12 text-end mb-4">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              className="comman_btn"
                              onClick={(e) => {
                                handleClick();
                                handleOnSave(e);
                              }}
                            >
                              Save
                            </button>
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
                              defaultChecked
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
                              // defaultChecked
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
                          {/* <div className="form-group col-12">
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
                          </div> */}
                          <div className="form-group col-12">
                            <label htmlFor="">Publish Date</label>
                            <input
                              type="date"
                              className="form-control"
                              name="datepicker"
                              id="datepicker"
                              placeholder="Select date and time"
                              value={
                                formData?.datepicker ||
                                new Date().toISOString().split("T")[0]
                              }
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
                              defaultChecked
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
                              // defaultChecked
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
                      {/* <div className="col-12 design_outter_comman mb-4 shadow">
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
                            <label htmlFor=""> Select Category</label>
                            <select
                              className="select form-control"
                              multiple=""
                              name="categoryId"
                              id="categoryId"
                              value={subSubCategory.categoryId}
                              onChange={handleInputChange1}
                            >
                              <option value="">Select Category</option>
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
                      </div> */}
                      {/* <div className="col-12 design_outter_comman mb-4 shadow">
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
                            <label htmlFor="">Select Sub-Category</label>
                            <select
                              className="select form-control"
                              multiple=""
                              name="categoryId1"
                              id="categoryId1"
                              value={subSubCategory.categoryId1}
                              onChange={handleInputChange2}
                            >
                              <option value="">Select Sub Category</option>
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
                      </div> */}
                      {/* <div className="col-12 design_outter_comman mb-4 shadow">
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
                            <label htmlFor="">Select Brand</label>
                            <select
                              className="select form-control"
                              multiple=""
                              name="brandId1"
                              id="brandId1"
                              value={subSubCategory.brandId1}
                              onChange={handleInputChange3}
                            >
                              <option value="">Select Brand</option>
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
                      </div> */}
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Slug</h2>
                          </div>
                        </div>
                        <div
                          className="form-design py-3 px-2 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group col-12">
                            <label htmlFor="Tags">
                              Slug
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="slug"
                              name="slug"
                              value={slug}
                              placeholder="Create slug"
                              onClick={() => copyToClipboard(slug)}
                              title="Copy Slug"
                              style={{ cursor: "pointer" }}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-12 design_outter_comman mb-4 shadow">
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
                              value={formData.Tags}
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
                              value={formData.TagsAr}
                              placeholder="أدخل العلامات"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div> */}
                      {/* <div className="col-12 design_outter_comman mb-4 shadow">
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
                              value={formData.color}
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
                              value={formData.colorAr}
                              onChange={handleInputChange}
                              placeholder="أدخل اللون"
                            />
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                {showAddButton2
                  ? Array.from({ length: variantCount }).map((_, index) => (
                      <div
                        className="col-12 design_outter_comman mb-4 shadow"
                        key={index}
                      >
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Pricing</h2>
                          </div>
                        </div>
                        <div className="col-12 design_outter_comman mb-4 ">
                          <div
                            className="form-design pt-3 px-2 help-support-form row align-items-end justify-content-between"
                            action=""
                          >
                            <div className="form-group col-6">
                              <label htmlFor="">Select Attribute</label>
                              <select
                                className="select form-control"
                                multiple=""
                                name="attributeId"
                                id="attributeId"
                                value={subSubCategory.attributeId}
                                onChange={handleInputChange3}
                              >
                                <option value="">Select Attribute</option>
                                {Array.isArray(attribute) &&
                                  attribute.map((subCategory) => (
                                    <option
                                      key={subCategory._id}
                                      value={subCategory._id}
                                    >
                                      {subCategory.attributeName_en}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="form-group col-6">
                              <label htmlFor="">Select Values</label>
                              <select
                                className="select form-control"
                                multiple=""
                                name="valueId"
                                id="valueId"
                                value={subSubCategory.valueId}
                                onChange={handleInputChange3}
                              >
                                <option value="">Select Values</option>
                                {Array.isArray(value) &&
                                  value.map((subCategory) => (
                                    <option
                                      key={subCategory._id}
                                      value={subCategory._id}
                                    >
                                      {subCategory.valuesName_en}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div
                          className="form-design px-3 help-support-form row align-items-end justify-content-between"
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
                              // defaultValue=""
                              name="SKUEn"
                              id="SKUEn"
                              value={formData?.SKUEn}
                              onChange={handleInputChange}
                              required
                              minLength="3"
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
                              // defaultValue=""
                              name="SKUAr"
                              id="SKUAr"
                              value={formData?.SKUAr}
                              onChange={handleInputChange}
                              required
                              minLength="3"
                            />
                          </div>
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
                              // defaultValue=""
                              name="stockQuantity"
                              id="stockQuantity"
                              value={formData?.stockQuantity}
                              placeholder="40"
                              onChange={handleInputChange}
                              required
                              // minLength="3"
                            />
                          </div>
                        </div>
                        <div
                          className="form-design px-3 help-support-form row align-items-end justify-content-between mt-4"
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
                              // defaultValue=""
                              name="Price"
                              id="Price"
                              value={formData?.Price}
                              placeholder="1499"
                              onChange={handleInputChange}
                              required
                              // minLength="3"
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
                              // defaultValue=""
                              name="oldPrice"
                              id="oldPrice"
                              value={formData?.oldPrice}
                              onChange={handleInputChange}
                              required
                              // minLength="3"
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
                              // defaultValue=""
                              name="dollar"
                              id="dollar"
                              value={formData?.dollar}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div
                          className="form-design px-3 help-support-form row align-items-end justify-content-between mt-4"
                          action=""
                        >
                          <div className="form-group col-12 new_radio_design">
                            <input
                              className="d-none"
                              type="checkbox"
                              id="Enable"
                              name="returnable"
                              value="true"
                              // checked={formData.returnable}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="Enable">Returnable </label>
                          </div>
                        </div>
                        <div
                          className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group mb-0 col-3">
                            <div className="banner-profile position-relative">
                              <div
                                className="banner-Box bg-light"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  height: "150px",
                                }}
                              >
                                {selectedImage1 ? (
                                  <img
                                    src={selectedImage1}
                                    className="img-fluid"
                                    alt="..."
                                  />
                                ) : (
                                  <>
                                    <img
                                      src="..."
                                      className="img-fluid"
                                      alt="..."
                                    />{" "}
                                    <div>150 X 150</div>
                                  </>
                                )}
                              </div>
                              <div className="p-image">
                                <label htmlFor="file1">
                                  <i className="upload-button fas fa-camera" />
                                </label>
                                <input
                                  className="form-control d-none"
                                  type="file"
                                  accept="image/*"
                                  name="file1"
                                  id="file1"
                                  onChange={(e) =>
                                    handleImageUpload1(e, "file1")
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group mb-0 col-3">
                            <div className="banner-profile position-relative">
                              <div
                                className="banner-Box bg-light"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  height: "150px",
                                }}
                              >
                                {selectedImage2 ? (
                                  <img
                                    src={selectedImage2}
                                    className="img-fluid"
                                    alt="..."
                                  />
                                ) : (
                                  <>
                                    <img
                                      src="..."
                                      className="img-fluid"
                                      alt="..."
                                    />{" "}
                                    <div>150 X 150</div>
                                  </>
                                )}
                                {/* <img src="..." className="img-fluid" alt="..." /> */}
                                {/* <div>150 X 150</div> */}
                              </div>
                              <div className="p-image">
                                <label htmlFor="file2">
                                  <i className="upload-button fas fa-camera" />
                                </label>
                                <input
                                  className="form-control d-none"
                                  type="file"
                                  accept="image/*"
                                  name="file2"
                                  id="file2"
                                  onChange={(e) =>
                                    handleImageUpload2(e, "file2")
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group mb-0 col-3">
                            <div className="banner-profile position-relative">
                              <div
                                className="banner-Box bg-light"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  height: "150px",
                                }}
                              >
                                {selectedImage3 ? (
                                  <img
                                    src={selectedImage3}
                                    className="img-fluid"
                                    alt="..."
                                  />
                                ) : (
                                  <>
                                    <img
                                      src="..."
                                      className="img-fluid"
                                      alt="..."
                                    />{" "}
                                    <div>150 X 150</div>
                                  </>
                                )}
                                {/* <img src="..." className="img-fluid" alt="..." /> */}
                                {/* <div>150 X 150</div> */}
                              </div>
                              <div className="p-image">
                                <label htmlFor="file3">
                                  <i className="upload-button fas fa-camera" />
                                </label>
                                <input
                                  className="form-control d-none"
                                  type="file"
                                  accept="image/*"
                                  name="file3"
                                  id="file3"
                                  onChange={(e) =>
                                    handleImageUpload3(e, "file3")
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group mb-0 col-3">
                            <div className="banner-profile position-relative">
                              <div
                                className="banner-Box bg-light"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  height: "150px",
                                }}
                              >
                                {selectedImage4 ? (
                                  <img
                                    src={selectedImage4}
                                    className="img-fluid"
                                    alt="..."
                                  />
                                ) : (
                                  <>
                                    <img
                                      src="..."
                                      className="img-fluid"
                                      alt="..."
                                    />{" "}
                                    <div>150 X 150</div>
                                  </>
                                )}
                                {/* <img src="..." className="img-fluid" alt="..." /> */}
                                {/* <div>150 X 150</div> */}
                              </div>
                              <div className="p-image">
                                <label htmlFor="file4">
                                  <i className="upload-button fas fa-camera" />
                                </label>
                                <input
                                  className="form-control d-none"
                                  type="file"
                                  accept="image/*"
                                  name="file4"
                                  id="file4"
                                  onChange={(e) =>
                                    handleImageUpload4(e, "file4")
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group col-4 choose_file position-relative">
                            <span>Upload Image</span>
                            <label htmlFor="gallery_images">
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
                              style={{ marginLeft: "10px" }}
                            />
                          </div>
                          <div
                            className="col-4"
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <button
                              // to={`/product-management-edit/${productId}`}
                              className="comman_btn mb-4"
                              onClick={(e) => {
                                handleClick3();
                                handleOnSave1(e);
                              }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  : // <div className="row ">
                    //   <div className="col-12 design_outter_comman comman_table_design px-0 shadow">
                    //     <div className="row comman_header justify-content-between">
                    //       <div
                    //         className="col"
                    //         style={{ display: "flex", justifyContent: "center" }}
                    //       >
                    //         <h2>Varients</h2>
                    //       </div>
                    //     </div>
                    //     <div className="table-responsive">

                    //       {loading ? (
                    //         <Spinner />
                    //       ) : (
                    //         <table className="table mb-0">
                    //           <thead>
                    //             <tr>
                    //               <th>S.No.</th>
                    //               <th>Image</th>
                    //               <th>SKU</th>
                    //               <th>MRP</th>
                    //               <th>Old Price</th>
                    //               <th>Stock</th>
                    //               <th>Attribute</th>
                    //               <th>Value</th>

                    //               <th>Action</th>
                    //             </tr>
                    //           </thead>
                    //           <tbody>
                    //             {productList?.map((item, index) => {
                    //               return (
                    //                 <React.Fragment key={item._id}>
                    //                   {item.addVarient.map(
                    //                     (variant, variantIndex) => (
                    //                       <tr key={`${item._id}-${variantIndex}`}>
                    //                         <td>{index + 1}</td>
                    //                         <td>
                    //                           {variant.product_Pic[0] ? (
                    //                             <img
                    //                               src={variant.product_Pic[0]}
                    //                               className="avatar lg rounded"
                    //                               alt=""
                    //                               style={{
                    //                                 width: "5vh",
                    //                                 height: "5vh",
                    //                               }}
                    //                             />
                    //                           ) : (
                    //                             <span>No Image</span>
                    //                           )}
                    //                         </td>
                    //                         <td>{variant.SKU || "N/A"}</td>
                    //                         <td>{variant.oldPrice || "N/A"}</td>
                    //                         <td>{variant.Price || "N/A"}</td>
                    //                         <td>
                    //                           <span
                    //                             className={`fs-6 badge ${
                    //                               variant.stockQuantity === 0
                    //                                 ? "bg-danger"
                    //                                 : variant.stockQuantity <= 10
                    //                                 ? "bg-warning"
                    //                                 : "bg-success"
                    //                             }`}
                    //                           >
                    //                             {variant.stockQuantity || "N/A"}
                    //                           </span>{" "}

                    //                         </td>
                    //                         <td>
                    //                           {variant?.attribute_Id
                    //                             ?.attributeName_en || "N/A"}
                    //                         </td>
                    //                         <td>
                    //                           {variant?.values_Id
                    //                             ?.valuesName_en || "N/A"}
                    //                         </td>

                    //                         <td>
                    //                           <Link
                    //                             className="comman_btn2 table_viewbtn"
                    //                             to={item.slug}
                    //                             target="_blank"
                    //                             rel="noopener noreferrer"
                    //                           >
                    //                             View
                    //                           </Link>
                    //                         </td>
                    //                       </tr>
                    //                     )
                    //                   )}
                    //                 </React.Fragment>
                    //               );
                    //             })}
                    //           </tbody>
                    //         </table>
                    //       )}
                    //     </div>
                    //   </div>
                    // </div>
                    null}

                {showAddButton ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginLeft: "-300px",
                    }}
                  >
                    <button className="comman_btn mt-2" onClick={handleClick2}>
                      Add Varient
                    </button>
                  </div>
                ) : null}
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

export default ProductManagement2;
