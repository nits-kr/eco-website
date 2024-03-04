import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar";
// import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import {
  useAddNewVariantMutation,
  useAttributesListMutation,
  useBrandListMutation,
  useCreateProductMutation,
  useEditProductListMutation,
  useGetCategoryListMutation,
  useGetCategoryListQuery,
  useGetSelectCategoryListQuery,
  useProductDetailsMutation,
  useSubCategoryListMutation,
  useSubSubCategoryListMutation,
  useValueListMutation,
  useValueListforAttributesMutation,
} from "../../services/Post";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";

function Products(props) {
  const [loader, setLoader] = useState(false);

  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  const ml = useSelector((data) => data?.local?.header);

  const { data: categoryListdata, refetch: fetchcategoryListData } =
    useGetSelectCategoryListQuery({
      ecomAdmintoken,
    });

  const [getSubCategory] = useSubCategoryListMutation();
  const [getSubSubCategory] = useSubSubCategoryListMutation();
  const [getAttributes] = useAttributesListMutation();
  const [getValues] = useValueListforAttributesMutation();
  const [getBrands] = useBrandListMutation();
  const [createProduct] = useCreateProductMutation();
  const [addVariant] = useAddNewVariantMutation();
  const [productDetails] = useProductDetailsMutation();
  const [updateProduct] = useEditProductListMutation();

  const [varientId, setVarientId] = useState("");
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

  const location = useLocation();
  let id = location.state?.id;

  console.log("state id", id);

  console.log("varientId", varientId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    formState: { errors: errors2 },
    trigger2,
  } = useForm();

  const [variantDetails, setvariantDetails] = useState("");

  const handleVarient = (item) => {
    setShowAddButton2(true);

    setvariantDetails(item);

    setVarientId(item?._id);
    reset2({
      SKUEn: item?.SKU,
      SKUAr: item?.SKU_ar,
      stockQuantity: item?.stockQuantity,
      Price: item?.Price,
      oldPrice: item?.oldPrice,
      dollar: item?.dollarPrice,
    });
  };

  useEffect(() => {
    if (id) {
      handleProductDetails(id);
      setShowAddButton(true);
    }
  }, [id]);

  const [details, setDetails] = useState("");

  console.log("details", details);

  const handleProductDetails = async (id) => {
    const res = await productDetails({ ecomAdmintoken, id });
    console.log("res", res);
    if (res?.data?.message === "Success") {
      setDetails(res?.data?.results?.details);
      const productData = res?.data?.results?.details;
      reset({
        categoryId: productData?.category_Id?._id,
        categoryId1: productData?.subCategory_Id?._id,
        // categoryId3: productData?.subSubcategory_Id?._id,
        // brandId1: productData?.brand_Id?._id,
        productNameEn: productData?.productName_en,
        productNameAr: productData?.productName_ar,
        productType: productData?.productType,
        DescriptionEn: productData?.Description,
        DescriptionAr: productData?.Description_ar,
        shortDescriptionEn: productData?.careInstuctions,
        shortDescriptionAr: productData?.careInstuctions_ar,
        additionalInfoEn: productData?.AdditionalInfo,
        additionalInfoAr: productData?.AdditionalInfo_ar,
      });
    } else {
      toast.error("Error Occured!");
    }
  };

  useEffect(() => {
    if (details?.category_Id?._id) {
      handleGetSubCategory(details?.category_Id?._id);
    }
  }, [details]);

  // useEffect(() => {
  //   if (categoryListdata) {
  //     setCategories(categoryListdata?.results?.list);
  //   }
  // }, [categoryListdata]);

  useEffect(() => {
    if (categoryListdata) {
      setCategories(categoryListdata?.results?.categoryData);
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
    if (subSubCategory.categoryId || subSubCategory.categoryId1) {
      handleGetSubCategory(subSubCategory.categoryId);
      handleGrtBrandList(subSubCategory.categoryId);
      handleGetSubSubCategory(subSubCategory.categoryId1);
      handleGetAttributes(subSubCategory.categoryId);
    }
  }, [subSubCategory.categoryId, subSubCategory.categoryId1]);

  useEffect(() => {
    if (subSubCategory.attributeId) {
      handleGetValues(subSubCategory.attributeId);
    }
  }, [subSubCategory.attributeId]);
  useEffect(() => {
    if (details) {
      handleGetAttributes(details?.category_Id?._id);
    }
  }, [details]);

  const handleGetSubCategory = async (id) => {
    const res = await getSubCategory({ id, ecomAdmintoken });
    console.log("res", res);
    setSubCategories(res?.data?.results?.subCategoryData);
  };

  const handleGetSubSubCategory = async (id) => {
    const res = await getSubSubCategory({ id, ecomAdmintoken });
    console.log("res", res);
    setSubSubCategories(res?.data?.results?.subSubCategoryData);
  };

  const handleGetAttributes = async (id) => {
    const res = await getAttributes({ id, ecomAdmintoken });
    console.log("res", res);
    setAttribute(res?.data?.results?.attributeCategoryData);
  };

  const handleGetValues = async (id) => {
    const res = await getValues({ id, ecomAdmintoken });
    console.log("res", res);
    setValue(res?.data?.results?.values);
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
  const handleOnSave = async (data) => {
    // e.preventDefault();
    const alldata = new FormData();
    alldata.append("productName_en", data.productNameEn);
    alldata.append("productName_ar", data.productNameAr);
    alldata.append("productType", data.productType);
    alldata.append("slug", slug);
    alldata.append("Description", data.DescriptionEn);
    alldata.append("Description_ar", data.DescriptionAr);
    alldata.append("careInstuctions", data.shortDescriptionEn);
    alldata.append("careInstuctions_ar", data.shortDescriptionAr);
    alldata.append("AdditionalInfo", data.additionalInfoEn);
    alldata.append("AdditionalInfo_ar", data.additionalInfoAr);

    alldata.append("visibility", formData.visibility || "published");
    alldata.append("visibility_ar", formData.visibilityAr || "نشرت");
    alldata.append(
      "publishDate",
      formData.datepicker || new Date().toISOString().split("T")[0]
    );

    alldata.append(
      "category_Id",
      subSubCategory.categoryId
        ? subSubCategory.categoryId
        : details?.category_Id?._id
    );
    alldata.append(
      "Subcategory_Id",
      subSubCategory.categoryId1 || details?.Subcategory_Id?._id
    );

    if (subSubCategory.categoryId3 || details?.subSubcategory_Id?._id) {
      alldata.append(
        "subSubcategory_Id",
        subSubCategory.categoryId3 || details?.subSubcategory_Id?._id
      );
    }
    if (subSubCategory.valueId) {
      alldata.append("values_Id", subSubCategory.valueId);
    }
    if (subSubCategory.attributeId) {
      alldata.append("attribute_Id", subSubCategory.attributeId);
    }
    if (subSubCategory.brandId1 || details?.brand_Id?._id) {
      alldata.append(
        "brand_Id",
        subSubCategory.brandId1 || details?.brand_Id?._id
      );
    }
    if (selectedImage && selectedImage.length > 0) {
      selectedImage.map((item, index) => {
        alldata.append(`product_Pic`, item);
      });
    }

    setLoader(true);

    const res = id
      ? await updateProduct({ alldata, ecomAdmintoken, id }).then((res) => {
          setLoader(false);

          Swal.fire({
            title: "Product Updated!",
            text: "Your  product has been Updated successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              handleProductDetails(id);
            }
          });
        })
      : await createProduct({ alldata, ecomAdmintoken }).then((res) => {
          setLoader(false);

          setFormData(res.data.results.saveProduct);
          console.log(res.data.results.saveProduct);
          localStorage?.setItem(
            "productId",
            res?.data?.results?.saveProduct?._id
          );
          handleProductDetails(res?.data?.results?.saveProduct?._id);
          setShowAddButton(true);
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
        });
  };
  const productId = localStorage?.getItem("productId");

  console.log("subSubCategory.attributeId", subSubCategory.attributeId);

  const handleOnSave1 = async (data) => {
    console.log("data", data);
    const imageInputs = document.querySelectorAll('input[type="file"]');
    let imageSelected = false;
    imageInputs.forEach((input) => {
      if (input.files.length > 0) {
        imageSelected = true;
      }
    });

    // if (!imageSelected) {
    //   Swal.fire({
    //     title: "Error!",
    //     text: "Please upload at least one image.",
    //     icon: "error",
    //     confirmButtonColor: "#3085d6",
    //     confirmButtonText: "OK",
    //   });
    //   return;
    // }
    if (!imageSelected) {
      if (!varientId) {
        Swal.fire({
          title: "Error!",
          text: "Please upload at least one image.",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      }
      return;
    }

    const alldata = new FormData();
    alldata.append("Price", data.Price);
    alldata.append("oldPrice", data.oldPrice);
    alldata.append("dollarPrice", data.dollar);
    alldata.append("SKU", data.SKUEn);
    alldata.append("SKU_ar", data.SKUAr);
    alldata.append("stockQuantity", data.stockQuantity);

    alldata.append("values_Id", data.valueId);
    alldata.append("attribute_Id", subSubCategory.attributeId);

    if (selectedImage && selectedImage.length > 0) {
      selectedImage.forEach((item, index) => {
        alldata.append(`product_Pic${index}`, item);
      });
    }
    if (formData1.bannerPic1) {
      alldata.append("product_Pic", formData1.bannerPic1);
    }
    if (formData1.bannerPic2) {
      alldata.append("product_Pic", formData1.bannerPic2);
    }
    if (formData1.bannerPic3) {
      alldata.append("product_Pic", formData1.bannerPic3);
    }
    if (formData1.bannerPic4) {
      alldata.append("product_Pic", formData1.bannerPic4);
    }

    console.log("alldata", alldata);

    setLoader(true);

    try {
      const res = await addVariant({ alldata, ecomAdmintoken, productId });
      setLoader(false);

      if (res) {
        setFormData(res?.data?.results?.saveVarient);

        document.getElementById("variantForm").reset();

        Swal.fire({
          title: "Variant Added!",
          text: "Your new Variant has been added successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            // navigate(`/product-management-edit/${productId}`);
            handleProductDetails(productId);
            setShowAddButton(true);
            setSelectedImage("");
            setShowAddButton2(false);
          }
        });
      } else {
        // Handle failure case
        console.error("Failed to add variant");
      }
    } catch (error) {
      console.error("Error while adding variant:", error);
      // Handle error, display message, or take appropriate action
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
      <div className={`admin_main ${ml ? "admin_full" : ""}`}>
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row offer-management justify-content-center">
              <div className="col-12">
                <div className="row">
                  <div className="col-9 mb-4">
                    <div className="main_head">Add Product </div>
                  </div>

                  <div className="col-9">
                    <div className="row me-0">
                      <form
                        onSubmit={handleSubmit(handleOnSave)}
                        className="col-12 design_outter_comman mb-4 shadow"
                      >
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Basic Informations</h2>
                          </div>
                        </div>
                        <div className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between">
                          {/* Select Category */}
                          <div className="form-group col-6">
                            <label htmlFor="categoryId">Select Category</label>
                            <select
                              className={`select form-control signup_fields  mt-1 ${
                                errors.categoryId && !subSubCategory.categoryId
                                  ? "is-invalid"
                                  : ""
                              }`}
                              multiple=""
                              name="categoryId"
                              id="categoryId"
                              {...register("categoryId", {
                                required: id ? false : "Category is Required*",
                              })}
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
                            {errors.categoryId &&
                              !subSubCategory.categoryId && (
                                <small className="errorText mx-1 fw-bold text-danger">
                                  {errors.categoryId?.message}
                                </small>
                              )}
                          </div>

                          {/* Select Sub-Category */}
                          <div className="form-group col-6">
                            <label htmlFor="categoryId1">
                              Select Sub-Category
                            </label>
                            <select
                              //   className="select form-control"
                              className={`select form-control signup_fields  mt-1 ${
                                errors.categoryId1 &&
                                !subSubCategory.categoryId1
                                  ? "is-invalid"
                                  : ""
                              }`}
                              multiple=""
                              name="categoryId1"
                              id="categoryId1"
                              {...register("categoryId1", {
                                required: id
                                  ? false
                                  : "Sub Category is Required*",
                              })}
                              onChange={handleInputChange1}
                            >
                              <option value="">
                                {details?.Subcategory_Id?.subCategoryName_en ||
                                  "Select Sub Category"}{" "}
                              </option>
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
                            {errors.categoryId1 &&
                              !subSubCategory.categoryId1 && (
                                <small className="errorText mx-1 fw-bold text-danger">
                                  {errors.categoryId1?.message}
                                </small>
                              )}
                          </div>

                          {/* Select Sub-Sub-Category */}
                          <div
                            className="form-group col-6"
                            style={{
                              display:
                                subSubCategories?.length > 0 ||
                                details?.subSubcategory_Id?._id
                                  ? ""
                                  : "none",
                            }}
                          >
                            <label htmlFor="categoryId3">
                              Select Sub-Sub-Category
                            </label>
                            <select
                              className="select form-control"
                              multiple=""
                              name="categoryId3"
                              id="categoryId3"
                              {...register("categoryId3")}
                              onChange={handleInputChange3}
                            >
                              <option value="">
                                {details?.subSubcategory_Id
                                  ?.subSubCategoryName_en ||
                                  "Select Sub Sub Category"}
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

                          {/* Select Brand */}
                          <div
                            className="form-group col-6"
                            style={{
                              display:
                                brands?.length > 0 || details?.brand_Id?._id
                                  ? ""
                                  : "none",
                            }}
                          >
                            <label htmlFor="brandId1">Select Brand</label>
                            <select
                              className="select form-control"
                              multiple=""
                              name="brandId1"
                              id="brandId1"
                              {...register("brandId1")}
                              onChange={handleInputChange3}
                            >
                              <option value="">
                                {details?.brand_Id?.brandName_en ||
                                  "Select Brand"}
                              </option>
                              {Array.isArray(brands) &&
                                brands.map((brand) => (
                                  <option key={brand._id} value={brand._id}>
                                    {brand.brandName_en}
                                  </option>
                                ))}
                            </select>
                          </div>

                          {/* Product Name (En) */}
                          <div className="form-group col-6">
                            <label htmlFor="productNameEn">
                              Product Name(En){" "}
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              //   className="form-control"
                              className={`select form-control signup_fields  mt-1 ${
                                errors.productNameEn ? "is-invalid" : ""
                              }`}
                              name="productNameEn"
                              id="productNameEn"
                              {...register("productNameEn", {
                                required: "Product Name is Required*",
                                pattern: {
                                  value: /^[a-zA-Z0-9\s\-_.,'&]+$/, // Only letters, numbers, spaces, hyphens, underscores, periods, commas, single quotes, ampersands are allowed
                                  message:
                                    "Product Name can only contain letters, numbers, spaces, and basic punctuation marks",
                                },
                                minLength: {
                                  value: 2,
                                  message:
                                    "Minimium 2 letters Should be in Product Name",
                                },
                              })}
                            />
                            {errors.productNameEn && (
                              <small className="errorText mx-1 fw-bold text-danger">
                                {errors.productNameEn?.message}
                              </small>
                            )}
                          </div>

                          {/* Product Name (Ar) */}
                          <div className="form-group col-6">
                            <label htmlFor="productNameAr">
                              Product Name(Ar){" "}
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              //   className="form-control"
                              className={`select form-control signup_fields  mt-1 ${
                                errors.productNameAr ? "is-invalid" : ""
                              }`}
                              name="productNameAr"
                              id="productNameAr"
                              {...register("productNameAr", {
                                required: "Product Name is Required*",
                                // pattern: {
                                //   value: /^[a-zA-Z0-9\s\-_.,'&]+$/, // Only letters, numbers, spaces, hyphens, underscores, periods, commas, single quotes, ampersands are allowed
                                //   message:
                                //     "Product Name can only contain letters, numbers, spaces, and basic punctuation marks",
                                // },
                                pattern: {
                                  value:
                                    /^[\u0600-\u06FF\s.'",\-()&$#!@%*?<>{}[\]]{1,}[\.]{0,1}[\u0600-\u06FF\s.'",\-()&$#!@%*?<>{}[\]]{0,}$/,
                                  message:
                                    "Special characters allowed except underscore (_)",
                                },
                                minLength: {
                                  value: 2,
                                  message:
                                    "Minimium 2 letters Should be in Product Name",
                                },
                              })}
                            />
                            {errors.productNameAr && (
                              <small className="errorText mx-1 fw-bold text-danger">
                                {errors.productNameAr?.message}
                              </small>
                            )}
                          </div>

                          {/* Product Type */}
                          <div className="form-group col-12">
                            <label htmlFor="productType">
                              Product Type{" "}
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              //   className="form-control"
                              className={`select form-control signup_fields  mt-1 ${
                                errors.productType ? "is-invalid" : ""
                              }`}
                              name="productType"
                              id="productType"
                              {...register("productType", {
                                required: "Product Type is Required*",
                                pattern: {
                                  value: /^[a-zA-Z0-9\s\-_.,'&]+$/, // Modify the regex pattern as per your requirement
                                  message:
                                    "Product Type can only contain letters, numbers, spaces, and basic punctuation marks",
                                },
                                minLength: {
                                  value: 3,
                                  message:
                                    "Minimum 3 characters are required for Product Type",
                                },
                              })}
                            />
                            {errors.productType && (
                              <small className="errorText mx-1 fw-bold text-danger">
                                {errors.productType?.message}
                              </small>
                            )}
                          </div>

                          {/* Description (En) */}
                          <div className="form-group col-6">
                            <label htmlFor="DescriptionEn">
                              Description(En){" "}
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <textarea
                              name="DescriptionEn"
                              //   className="form-control"
                              className={`select form-control signup_fields  mt-1 ${
                                errors.DescriptionEn ? "is-invalid" : ""
                              }`}
                              id="DescriptionEn"
                              style={{ height: 120 }}
                              {...register("DescriptionEn", {
                                required: true,
                                minLength: 3,
                              })}
                            />
                            {errors.DescriptionEn && (
                              <small className="errorText fw-bold text-danger">
                                Description is required and must be at least 3
                                characters long
                              </small>
                            )}
                          </div>

                          {/* Description (Ar) */}
                          <div className="form-group col-6">
                            <label htmlFor="DescriptionAr">
                              Description(Ar){" "}
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <textarea
                              name="DescriptionAr"
                              //   className="form-control"
                              className={`select form-control signup_fields  mt-1 ${
                                errors.DescriptionAr ? "is-invalid" : ""
                              }`}
                              id="DescriptionAr"
                              style={{ height: 120 }}
                              {...register("DescriptionAr", {
                                required: true,
                                minLength: 3,
                              })}
                            />
                            {errors.DescriptionAr && (
                              <small className="errorText fw-bold text-danger">
                                Description is required and must be at least 3
                                characters long
                              </small>
                            )}
                          </div>

                          {/* Care Instructions (En) */}
                          <div className="form-group col-6">
                            <label htmlFor="shortDescriptionEn">
                              Care Instructions(En){" "}
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <textarea
                              name="shortDescriptionEn"
                              //   className="form-control"
                              className={`select form-control signup_fields  mt-1 ${
                                errors.shortDescriptionEn ? "is-invalid" : ""
                              }`}
                              id="shortDescriptionEn"
                              style={{ height: 120 }}
                              {...register("shortDescriptionEn", {
                                required: true,
                                minLength: 3,
                              })}
                            />
                            {errors.shortDescriptionEn && (
                              <small className="errorText fw-bold text-danger">
                                Care Instructions are required and must be at
                                least 3 characters long
                              </small>
                            )}
                          </div>

                          {/* Care Instructions (Ar) */}
                          <div className="form-group col-6">
                            <label htmlFor="shortDescriptionAr">
                              Care Instructions(Ar){" "}
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <textarea
                              name="shortDescriptionAr"
                              //   className="form-control"
                              className={`select form-control signup_fields  mt-1 ${
                                errors.shortDescriptionAr ? "is-invalid" : ""
                              }`}
                              id="shortDescriptionAr"
                              style={{ height: 120 }}
                              {...register("shortDescriptionAr", {
                                required: true,
                                minLength: 3,
                              })}
                            />
                            {errors.shortDescriptionAr && (
                              <small className="errorText fw-bold text-danger">
                                Care Instructions are required and must be at
                                least 3 characters long
                              </small>
                            )}
                          </div>

                          {/* Additional Info (En) */}
                          <div className="form-group col-6">
                            <label htmlFor="additionalInfoEn">
                              Additional Info(En){" "}
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <textarea
                              name="additionalInfoEn"
                              //   className="form-control"
                              className={`select form-control signup_fields  mt-1 ${
                                errors.additionalInfoEn ? "is-invalid" : ""
                              }`}
                              id="additionalInfoEn"
                              style={{ height: 120 }}
                              {...register("additionalInfoEn", {
                                required: true,
                                minLength: 3,
                              })}
                            />
                            {errors.additionalInfoEn && (
                              <small className="errorText fw-bold text-danger">
                                Additional Info is required and must be at least
                                3 characters long
                              </small>
                            )}
                          </div>

                          {/* Additional Info (Ar) */}
                          <div className="form-group col-6">
                            <label htmlFor="additionalInfoAr">
                              Additional Info(Ar){" "}
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <textarea
                              name="additionalInfoAr"
                              //   className="form-control"
                              className={`select form-control signup_fields  mt-1 ${
                                errors.additionalInfoAr ? "is-invalid" : ""
                              }`}
                              id="additionalInfoAr"
                              style={{ height: 120 }}
                              {...register("additionalInfoAr", {
                                required: true,
                                minLength: 3,
                              })}
                            />
                            {errors.additionalInfoAr && (
                              <small className="errorText fw-bold text-danger">
                                Additional Info is required and must be at least
                                3 characters long
                              </small>
                            )}
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
                              type="submit"
                              disabled={loader ? true : ""}
                              style={{
                                cursor: loader ? "not-allowed" : "pointer",
                              }}
                            >
                              {loader ? (
                                <Spinner
                                  style={{
                                    height: "20px",
                                    width: "20px",
                                  }}
                                />
                              ) : id ? (
                                "Update"
                              ) : (
                                "Save"
                              )}
                              {/* {id ? "Update" : "Save"} */}
                            </button>
                          </div>
                        </div>
                      </form>
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
                    </div>
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
                          <h2>Add Variant</h2>
                        </div>
                      </div>
                      <div className="col-12 design_outter_comman mb-4 ">
                        <form
                          id="variantForm"
                          className="form-design pt-3 px-2 help-support-form row align-items-end justify-content-between"
                          action=""
                          onSubmit={handleSubmit2(handleOnSave1)}
                        >
                          {/* <div className="form-group col-6">
                            <label htmlFor="attributeId">
                              {" "}
                              Select Attribute
                            </label>
                            <select
                              className={`select form-control signup_fields  mt-1 ${
                                errors2.attributeId ? "is-invalid" : ""
                              }`}
                              multiple=""
                              name="attributeId"
                              id="attributeId"
                              {...register("attributeId", {
                                required: "Attribute is Required*",
                              })}
                              onChange={handleInputChange3}
                            >
                              <option value=""> Select Attribute</option>
                              {Array.isArray(attribute) &&
                                attribute.map((category) => (
                                  <option
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {category.attributeName_en}
                                  </option>
                                ))}
                            </select>
                            {errors.attributeId && (
                              <small className="errorText mx-1 fw-bold text-danger">
                                {errors.attributeId?.message}
                              </small>
                            )}
                          </div> */}

                          <div className="form-group col-6">
                            <label htmlFor="attributeId">
                              Select Attribute
                            </label>
                            <select
                              // className="select form-control"
                              className={`select form-control signup_fields  mt-1 ${
                                errors2.attributeId &&
                                !subSubCategory.attributeId
                                  ? "is-invalid"
                                  : ""
                              }`}
                              multiple=""
                              name="attributeId"
                              id="attributeId"
                              // value={subSubCategory.valueId}
                              {...register2("attributeId", {
                                required: "Attribute is Required*",
                              })}
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
                            {errors2.attributeId &&
                              !subSubCategory.attributeId && (
                                <small className="errorText mx-0 fw-bold text-danger">
                                  {errors2.attributeId?.message}
                                </small>
                              )}
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="valueId">Select Values</label>
                            <select
                              // className="select form-control"
                              className={`select form-control signup_fields  mt-1 ${
                                errors2.valueId ? "is-invalid" : ""
                              }`}
                              multiple=""
                              name="valueId"
                              id="valueId"
                              // value={subSubCategory.valueId}
                              onChange={handleInputChange3}
                              {...register2("valueId", {
                                required: "Value is Required*",
                              })}
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
                            {errors2.valueId && (
                              <small className="errorText mx-0 fw-bold text-danger">
                                {errors2.valueId?.message}
                              </small>
                            )}
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="SKUEn">
                              SKU(En)
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className={`select form-control signup_fields  mt-1 ${
                                errors2.SKUEn ? "is-invalid" : ""
                              }`}
                              name="SKUEn"
                              id="SKUEn"
                              {...register2("SKUEn", {
                                required: "SKU (EN) is Required*",
                              })}
                            />
                            {errors2.SKUEn && (
                              <small className="errorText mx-0 fw-bold text-danger">
                                {errors2.SKUEn?.message}
                              </small>
                            )}
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
                              className={`select form-control signup_fields  mt-1 ${
                                errors2.SKUAr ? "is-invalid" : ""
                              }`}
                              name="SKUAr"
                              id="SKUAr"
                              {...register2("SKUAr", {
                                required: "SKU (AR) is Required*",
                              })}
                            />
                            {errors2.SKUAr && (
                              <small className="errorText mx-0 fw-bold text-danger">
                                {errors2.SKUAr?.message}
                              </small>
                            )}
                          </div>
                          <div className="form-group col-12">
                            <label htmlFor="stockQuantity">
                              Stock Quantity
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className={`select form-control signup_fields  mt-1 ${
                                errors2.stockQuantity ? "is-invalid" : ""
                              }`}
                              name="stockQuantity"
                              id="stockQuantity"
                              {...register2("stockQuantity", {
                                required: "Stock Quantity is Required*",
                              })}
                            />
                            {errors2.stockQuantity && (
                              <small className="errorText mx-0 fw-bold text-danger">
                                {errors2.stockQuantity?.message}
                              </small>
                            )}
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="Price">
                              Price
                              <span className="required-field text-danger">
                                *
                              </span>
                            </label>
                            <input
                              type="text"
                              className={`select form-control signup_fields  mt-1 ${
                                errors2.Price ? "is-invalid" : ""
                              }`}
                              name="Price"
                              id="Price"
                              {...register2("Price", {
                                required: "Price is Required*",
                              })}
                            />
                            {errors2.Price && (
                              <small className="errorText mx-0 fw-bold text-danger">
                                {errors2.Price?.message}
                              </small>
                            )}
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
                              className={`select form-control signup_fields  mt-1 ${
                                errors2.oldPrice ? "is-invalid" : ""
                              }`}
                              name="oldPrice"
                              id="oldPrice"
                              {...register2("oldPrice", {
                                required: "Old Price is Required*",
                              })}
                            />
                            {errors2.oldPrice && (
                              <small className="errorText mx-0 fw-bold text-danger">
                                {errors2.oldPrice?.message}
                              </small>
                            )}
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
                              className={`select form-control signup_fields  mt-1 ${
                                errors2.dollar ? "is-invalid" : ""
                              }`}
                              name="dollar"
                              id="dollar"
                              {...register2("dollar", {
                                required: "Dollar is Required*",
                              })}
                            />
                            {errors2.dollar && (
                              <small className="errorText mx-0 fw-bold text-danger">
                                {errors2.dollar?.message}
                              </small>
                            )}
                          </div>
                          <div className="form-group col-12 new_radio_design">
                            <input
                              className="d-none"
                              type="checkbox"
                              id="Enable"
                              name="returnable"
                              value="true"
                              onChange={handleInputChange}
                            />
                            <label htmlFor="Enable">Returnable </label>
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
                                {selectedImage1 || variantDetails ? (
                                  <img
                                    src={
                                      selectedImage1 ||
                                      variantDetails?.product_Pic[0]
                                    }
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
                                {selectedImage2 || variantDetails ? (
                                  <img
                                    src={
                                      selectedImage2 ||
                                      variantDetails?.product_Pic[1]
                                    }
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
                                {selectedImage3 || variantDetails ? (
                                  <img
                                    src={
                                      selectedImage3 ||
                                      variantDetails?.product_Pic[2]
                                    }
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
                                {selectedImage4 || variantDetails ? (
                                  <img
                                    src={
                                      selectedImage4 ||
                                      variantDetails?.product_Pic[3]
                                    }
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

                          <div
                            className="form-group col-4 choose_file position-relative"
                            style={{ display: varientId ? "none" : "" }}
                          >
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
                            className={`col-${varientId ? "12" : "4"} mt-${
                              varientId ? "3" : ""
                            }`}
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <button
                              // to={`/product-management-edit/${productId}`}
                              type="submit"
                              className="comman_btn mb-4"
                              // onClick={(e) => {
                              //   handleClick3();
                              //   handleOnSave1(e);
                              // }}
                              disabled={loader ? true : ""}
                              style={{
                                cursor: loader ? "not-allowed" : "pointer",
                              }}
                            >
                              {loader ? (
                                <Spinner
                                  style={{
                                    height: "20px",
                                    width: "20px",
                                  }}
                                />
                              ) : (
                                "Save"
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  ))
                : null}

              <div
                className="col-12 design_outter_comman comman_table_design px-0 shadow"
                style={{
                  display: details?.varients?.length > 0 ? "" : "none",
                }}
              >
                <div className="row comman_header justify-content-between">
                  <div
                    className="col"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <h2> Product Varients</h2>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>SKU</th>
                        <th>MRP</th>
                        <th>Old Price</th>
                        <th>Stock</th>
                        <th>Attribute</th>
                        <th>Value</th>
                        {/* <th>Action</th> */}

                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {details?.varients?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={item?.product_Pic[0]}
                                className="avatar lg rounded"
                                alt=""
                                style={{
                                  width: "5vh",
                                  height: "5vh",
                                }}
                              />
                            </td>
                            <td>
                              {details?.productName_en?.toUpperCase()?.length >
                              20
                                ? details?.productName_en
                                    .toUpperCase()
                                    .slice(0, 20) + "..."
                                : details?.productName_en?.toUpperCase() ||
                                  "N/A"}
                              {/* {item?.productName_en} */}
                            </td>

                            <td>{item?.SKU || "N/A"}</td>
                            <td>{item?.oldPrice || "N/A"}</td>
                            <td>{item?.Price || "N/A"}</td>
                            <td>
                              <span
                                className={`fs-6 badge ${
                                  item.stockQuantity === 0
                                    ? "bg-danger"
                                    : item.stockQuantity <= 10
                                    ? "bg-warning"
                                    : "bg-success"
                                }`}
                              >
                                {item?.stockQuantity || "N/A"}
                              </span>{" "}
                              {/* {variant.stockQuantity || "N/A"} */}
                            </td>
                            <td>
                              {item?.attribute_Id?.attributeName_en || "N/A"}
                            </td>
                            <td>{item?.values_Id?.valuesName_en || "N/A"}</td>
                            {/* <td>
                              <>
                                <Link
                                  className="comman_btn table_viewbtn"
                                  // to="/product-management"
                                  state={{ variantid: item?._id }}
                                  onClick={() => handleVarient(item)}
                                >
                                  View
                                </Link>
                                <Link
                                  className="comman_btn2 table_viewbtn ms-2"
                                  to="#"
                                  // onClick={() => {
                                  //   handleDeleteProduct(item._id, list);
                                  // }}
                                >
                                  Delete
                                </Link>
                              </>
                            </td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {showAddButton ? (
                <div
                  className="mt-3"
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

export default Products;
