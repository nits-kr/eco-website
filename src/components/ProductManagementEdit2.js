import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";

function ProductManagementEdit2(props) {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [formData, setFormData] = useState([]);
  const [count, setCount] = useState(0);
  console.log("count", count);
  const [showAddButton, setShowAddButton] = useState(true);
  const [showAddButton2, setShowAddButton2] = useState(false);
  console.log("slug form date", formData);
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [attribute, setAttribute] = useState([]);
  const [value, setValue] = useState([]);
  const [productListItems, setProductListItems] = useState([]);
  console.log("productListItems", productListItems);
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
  // const [selectedImage5, setSelectedImage5] = useState(null);
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
  // const slug = `www.ecommerce.com/${categoryNameNew}/${subCategoryNameNew}`;
  let slug;

  if (categoryNameNew && subCategoryNameNew) {
    slug = `www.ecommerce.com/${categoryNameNew}/${subCategoryNameNew}`;
  } else if (productListItems[0]?.slug) {
    slug = productListItems[0].slug;
  } else {
    slug = "www.ecommerce.com/default-slug";
  }

  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const { id } = useParams();
  console.log(id);
  const [variantCount, setVariantCount] = useState(1);

  const handleAddVariant = () => {
    setVariantCount(variantCount + 1);
  };
  const navigate = useNavigate();

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
          `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subCategory/selectCategory/${subSubCategory.categoryId}`
        );
        setSubCategories(response.data.results.categoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [subSubCategory.categoryId]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subSubCategory/selectSubCategory/${subSubCategory.categoryId1}`
        );
        setSubSubCategories(response.data.results.subCategoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [subSubCategory.categoryId1]);
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await axios.post(
          `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/select-brand/${productListItems[0]?.category_Id?._id}`
        );
        setBrands(response.data.results.selectBrand);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData2();
  }, [productListItems[0]?.category_Id?._id]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/attribute/selectSubSubCategory/${productListItems[0]?.category_Id?._id}`
        );
        setAttribute(response.data.results.subSubCategoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [productListItems[0]?.category_Id?._id]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/values/selectAttribute/${subSubCategory.attributeId}`
        );
        setValue(response.data.results.attributeCategoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [subSubCategory.attributeId]);
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
    data.append("slug", slug);
    data.append("Description", formData.DescriptionEn);
    data.append("Description_ar", formData.DescriptionAr);
    // data.append("weight", formData.weight);
    // data.append("weight_ar", formData.weightAr);
    // data.append("productColor", formData.color);
    // data.append("productColor_ar", formData.colorAr);
    data.append("careInstuctions", formData.shortDescriptionEn);
    data.append("careInstuctions_ar", formData.shortDescriptionAr);
    // data.append("Price", formData.Price);
    // data.append("oldPrice", formData.oldPrice);
    // data.append("dollarPrice", formData.dollar);
    // data.append("SKU", formData.SKUEn);
    // data.append("SKU_ar", formData.SKUAr);
    // data.append("stockQuantity", formData.stockQuantity);
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
    data.append("visibility", formData.visibility || "published");
    data.append("visibility_ar", formData.visibilityAr || "نشرت");
    data.append(
      "publishDate",
      formData.datepicker || new Date().toISOString().split("T")[0]
    );
    // data.append("Tags", formData.Tags);
    // data.append("Tags_ar", formData.TagsAr);
    data.append(
      "category_Id",
      subSubCategory.categoryId
        ? subSubCategory.categoryId
        : productListItems[0]?.category_Id?._id
    );
    data.append(
      "Subcategory_Id",
      subSubCategory.categoryId1
        ? subSubCategory.categoryId1
        : productListItems[0]?.Subcategory_Id?._id
    );
    if (subSubCategory.categoryId3) {
      data.append(
        "subSubcategory_Id",
        subSubCategory.categoryId3
          ? subSubCategory.categoryId3
          : productListItems[0]?.subSubcategory_Id?._id
      );
    }
    if (subSubCategory.valueId) {
      data.append("values_Id", subSubCategory.valueId);
    }
    if (subSubCategory.attributeId) {
      data.append("attribute_Id", subSubCategory.attributeId);
    }
    if (subSubCategory.brandId1 || productListItems[0]?.brand_Id?._id) {
      data.append(
        "brand_Id",
        subSubCategory.brandId1
          ? subSubCategory.brandId1
          : productListItems[0]?.brand_Id?._id
      );
    }
    if (selectedImage && selectedImage.length > 0) {
      selectedImage.map((item, index) => {
        data.append(`product_Pic`, item);
      });
    }
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/createProduct",
        data
      )
      .then((response) => {
        setFormData(response.data.results.saveProduct);
        console.log(response.data.results.saveProduct);
        localStorage?.setItem(
          "productId",
          response?.data?.results?.saveProduct?._id
        );
        Swal.fire({
          title: "Product Created!",
          text: "Your new product has been created successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            // navigate("/products");
          }
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const productId = localStorage?.getItem("productId");
  const handleOnSave1 = (e) => {
    e.preventDefault();
    const data = new FormData();
    // data.append("productName_en", formData.productNameEn);
    // data.append("productName_ar", formData.productNameAr);
    // data.append("slug", slug);
    // data.append("Description", formData.DescriptionEn);
    // data.append("Description_ar", formData.DescriptionAr);
    // data.append("weight", formData.weight);
    // data.append("weight_ar", formData.weightAr);
    // data.append("productColor", formData.color);
    // data.append("productColor_ar", formData.colorAr);
    // data.append("careInstuctions", formData.shortDescriptionEn);
    // data.append("careInstuctions_ar", formData.shortDescriptionAr);
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
    // data.append("visibility", formData.visibility || "published");
    // data.append("visibility_ar", formData.visibilityAr || "نشرت");
    // data.append(
    //   "publishDate",
    //   formData.datepicker || new Date().toISOString().split("T")[0]
    // );
    // data.append("Tags", formData.Tags);
    // data.append("Tags_ar", formData.TagsAr);
    // data.append("category_Id", subSubCategory.categoryId);
    // data.append("Subcategory_Id", subSubCategory.categoryId1);
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

    if (formData1.bannerPic2) {
      data.append("product_Pic", formData1.bannerPic2);
    }
    if (formData1.bannerPic3) {
      data.append("product_Pic", formData1.bannerPic3);
    }
    if (formData1.bannerPic4) {
      data.append("product_Pic", formData1.bannerPic4);
    }
    axios
      .post(
        `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/new-varient/${id}`,
        data
      )
      .then((response) => {
        setFormData(response.data.results.saveVarient);
        console.log(response.data.results.saveVarient);
        fetchProductList2();
        Swal.fire({
          title: "Product Created!",
          text: "Your new product has been created successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            // navigate("/products");
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

  useEffect(() => {
    props.setProgress(10);
    setLoading(true);
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/productList"
      )
      .then((response) => {
        setProductList(response?.data?.results?.list?.reverse());
        console.log(response.data);
        props.setProgress(100);
        setLoading(false);
      });
  }, []);

  const fetchProductList = () => {
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/productList"
      )
      .then((response) => {
        setProductList(response?.data?.results?.list.reverse());
        console.log(response.data);
      });
  };

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
  const fetchProductList2 = () => {
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
  };
  return (
    <>
      {loading}
      <Sidebar Dash={"products"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row offer-management justify-content-center">
              <div className="col-12">
                <div className="row">
                  <div className="col-9 mb-4">
                    <div className="main_head">Edit Product </div>
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
                          {subSubCategories.length > 0 ||
                          (productListItems[0]?.subSubcategory_Id
                            ?.subSubCategoryName_en !== null &&
                            productListItems[0]?.subSubcategory_Id
                              ?.subSubCategoryName_en !== undefined) ? (
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
                                  <option value="">
                                    {" "}
                                    {
                                      productListItems[0]?.category_Id
                                        ?.categoryName_en
                                    }{" "}
                                  </option>
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
                                  <option value="">
                                    {" "}
                                    {
                                      productListItems[0]?.Subcategory_Id
                                        ?.subCategoryName_en
                                    }{" "}
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
                                    {
                                      productListItems[0]?.subSubcategory_Id
                                        ?.subSubCategoryName_en
                                    }
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
                                  <option value="">
                                    {" "}
                                    {
                                      productListItems[0]?.brand_Id
                                        ?.brandName_en
                                    }{" "}
                                  </option>
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
                                  <option value="">
                                    {" "}
                                    {
                                      productListItems[0]?.category_Id
                                        ?.categoryName_en
                                    }{" "}
                                  </option>
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
                                  <option value="">
                                    {" "}
                                    {
                                      productListItems[0]?.Subcategory_Id
                                        ?.subCategoryName_en
                                    }{" "}
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
                                  <option value="">
                                    {
                                      productListItems[0]?.brand_Id
                                        ?.brandName_en
                                    }
                                  </option>
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
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].productName_en
                                  : ""
                              }
                              //   value={formData?.productNameEn}
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
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].productName_ar
                                  : ""
                              }
                              //   value={formData?.productNameAr}
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
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].productType
                                  : ""
                              }
                              //   value={formData?.productType}
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
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].Description
                                  : ""
                              }
                              //   value={formData?.DescriptionEn}
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
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].Description_ar
                                  : ""
                              }
                              //   value={formData?.DescriptionAr}
                              onChange={handleInputChange}
                              required
                              minLength="3"
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
                              //   value={formData?.shortDescriptionEn}
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
                              defaultValue={
                                productListItems.length > 0
                                  ? productListItems[0].careInstuctions_ar
                                  : ""
                              }
                              //   defaultValue={formData?.shortDescriptionAr}
                              placeholder="أدخل وصفًا موجزًا"
                              onChange={handleInputChange}
                              required
                              minLength="3"
                            />
                          </div>
                          {/* <div className="form-group col-6">
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
                              value={formData.weight}
                              placeholder="1 kg"
                              onChange={handleInputChange}
                              required
                              minLength="3"
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
                              value={formData.weightAr}
                              placeholder="1 كجم"
                              onChange={handleInputChange}
                              required
                              minLength="3"
                            />
                          </div> */}
                        </div>
                        <div className="col-12 text-end mb-4">
                          {/* {showAddButton ? (
                            <button
                              className="comman_btn"
                              onClick={handleAddVariant}
                            >
                              Add New variant
                            </button>
                          ) : (
                            <button
                              className="comman_btn"
                              onClick={handleClick}
                            >
                              Save
                            </button>
                          )} */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {/* <button
                              className="comman_btn"
                              onClick={handleClick}
                            >
                              Save
                            </button> */}
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

                      {/* {Array.from({ length: variantCount }).map((_, index) => (
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
                                value={formData.SKUEn}
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
                                value={formData.SKUAr}
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
                                value={formData.stockQuantity}
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
                                value={formData.Price}
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
                                value={formData.oldPrice}
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
                                value={formData.dollar}
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
                                checked={formData.returnable === "true"}
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
                                  <img src="..." class="img-fluid" alt="..." />
                                  <div>150 X 150</div>
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
                                    // onChange={(e) =>
                                    //   handleImageUpload1(e, "file1")
                                    // }
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
                                  <img src="..." class="img-fluid" alt="..." />
                                  <div>150 X 150</div>
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
                                    // onChange={(e) =>
                                    //   handleImageUpload1(e, "file1")
                                    // }
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
                                  <img src="..." class="img-fluid" alt="..." />
                                  <div>150 X 150</div>
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
                                    // onChange={(e) =>
                                    //   handleImageUpload1(e, "file1")
                                    // }
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
                                  <img src="..." class="img-fluid" alt="..." />
                                  <div>150 X 150</div>
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
                                    // onChange={(e) =>
                                    //   handleImageUpload1(e, "file1")
                                    // }
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="form-group col-12 choose_file position-relative">
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
                              />
                            </div>
                          </div>
                        </div>
                      ))} */}
                      {/* <div className="col-12 design_outter_comman mb-4 shadow">
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
                              value={formData.SKUEn}
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
                              value={formData.SKUAr}
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
                              value={formData.stockQuantity}
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
                              value={formData.Price}
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
                              value={formData.oldPrice}
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
                              value={formData.dollar}
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
                              checked={formData.returnable === "true"}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="Enable">Returnable </label>
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
                                <img src="..." class="img-fluid" alt="..." />
                                <div>150 X 150</div>
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
                                  // onChange={(e) =>
                                  //   handleImageUpload1(e, "file1")
                                  // }
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
                                <img src="..." class="img-fluid" alt="..." />
                                <div>150 X 150</div>
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
                                  // onChange={(e) =>
                                  //   handleImageUpload1(e, "file1")
                                  // }
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
                                <img src="..." class="img-fluid" alt="..." />
                                <div>150 X 150</div>
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
                                  // onChange={(e) =>
                                  //   handleImageUpload1(e, "file1")
                                  // }
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
                                <img src="..." class="img-fluid" alt="..." />
                                <div>150 X 150</div>
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
                                  // onChange={(e) =>
                                  //   handleImageUpload1(e, "file1")
                                  // }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group col-12 choose_file position-relative">
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
                            />
                          </div>
                        </div>
                      </div> */}
                      {/* <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Search Engine Optimization(optional) </h2>
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
                            <label htmlFor="pageTitleEn">Page Title(En)</label>
                            <input
                              type="text"
                              className="form-control"
                              // defaultValue=""
                              name="pageTitleEn"
                              id="pageTitleEn"
                              value={formData.pageTitleEn}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="pageTitleAr">Page Title(Ar)</label>
                            <input
                              type="text"
                              className="form-control"
                              // defaultValue=""
                              name="pageTitleAr"
                              id="pageTitleAr"
                              value={formData.pageTitleAr}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="metaDescriptionEn">
                              Meta Description(En)
                            </label>
                            <textarea
                              name="metaDescriptionEn"
                              className="form-control"
                              id="metaDescriptionEn"
                              style={{ height: 120 }}
                              // defaultValue={""}
                              value={formData.metaDescriptionEn}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="metaDescriptionAr">
                              Meta Description(Ar)
                            </label>
                            <textarea
                              name="metaDescriptionAr"
                              className="form-control"
                              id="metaDescriptionAr"
                              style={{ height: 120 }}
                              value={formData.metaDescriptionAr}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div> */}
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
                              //   defaultValue={
                              //     productListItems.length > 0
                              //       ? productListItems[0].slug
                              //       : ""
                              //   }
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
                {showAddButton2 ? (
                  Array.from({ length: variantCount }).map((_, index) => (
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
                            defaultValue={productListItems[0].SKU}
                            // value={formData.SKUEn}
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
                            defaultValue={productListItems[0].SKU_ar}
                            // value={formData.SKUAr}
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
                            defaultValue={productListItems[0].stockQuantity}
                            // value={formData.stockQuantity}
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
                            defaultValue={productListItems[0].Price}
                            // value={formData.Price}
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
                            defaultValue={productListItems[0].oldPrice}
                            // value={formData.oldPrice}
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
                            defaultValue={productListItems[0].dollarPrice}
                            // value={formData.dollar}
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
                            // checked={formData.returnable === "true"}
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
                                  class="img-fluid"
                                  alt="..."
                                />
                              ) : (
                                <>
                                  <img src="..." class="img-fluid" alt="..." />{" "}
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
                                onChange={(e) => handleImageUpload1(e, "file1")}
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
                                  class="img-fluid"
                                  alt="..."
                                />
                              ) : (
                                <>
                                  <img src="..." class="img-fluid" alt="..." />{" "}
                                  <div>150 X 150</div>
                                </>
                              )}
                              {/* <img src="..." class="img-fluid" alt="..." /> */}
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
                                onChange={(e) => handleImageUpload2(e, "file2")}
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
                                  class="img-fluid"
                                  alt="..."
                                />
                              ) : (
                                <>
                                  <img src="..." class="img-fluid" alt="..." />{" "}
                                  <div>150 X 150</div>
                                </>
                              )}
                              {/* <img src="..." class="img-fluid" alt="..." /> */}
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
                                onChange={(e) => handleImageUpload3(e, "file3")}
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
                                  class="img-fluid"
                                  alt="..."
                                />
                              ) : (
                                <>
                                  <img src="..." class="img-fluid" alt="..." />{" "}
                                  <div>150 X 150</div>
                                </>
                              )}
                              {/* <img src="..." class="img-fluid" alt="..." /> */}
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
                                onChange={(e) => handleImageUpload4(e, "file4")}
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
                            style={{ marginLeft: "12px" }}
                          />
                        </div>
                        <div
                          className="col-4"
                          style={{ display: "flex", justifyContent: "end" }}
                        >
                          <button
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

                      {/* <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <button
                          className="comman_btn mb-4"
                          onClick={handleClick3}
                        >
                          Save
                        </button>
                      </div> */}
                    </div>
                  ))
                ) : (
                  <div className="row ">
                    <div className="col-12 design_outter_comman comman_table_design px-0 shadow">
                      <div className="row comman_header justify-content-between">
                        <div
                          className="col"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <h2> Product Varients</h2>
                        </div>
                      </div>
                      <div className="table-responsive">
                        {/* <table className="table mb-0">
                          <thead>
                            <tr>
                              <th>S.No.</th>
                              <th>Image</th>
                              <th>SKU</th>
                              <th>MRP</th>
                              <th>S.P.</th>
                              <th>Stock</th>
                              <th>Weight</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productList?.map((item, index) => {
                              return (
                                <tr>
                              <td>1</td>
                              <td>
                                <img
                                  src=""
                                  className="avatar lg rounded"
                                  alt=""
                                  style={{
                                    width: "5vh",
                                    height: "5vh",
                                  }}
                                />
                              </td>
                              <td>Ajay Sharma</td>
                              <td>Ram Jain</td>
                              <td>+966 9876543210</td>
                              <td>01/07/2022</td>
                              <td>Free</td>
                              <td>
                                <a
                                  className="comman_btn2 table_viewbtn"
                                  href="recent-orders-details.html"
                                >
                                  View
                                </a>
                              </td>
                            </tr>
                              )
                            })}
                          </tbody>
                        </table> */}
                        {loading ? (
                          <Spinner />
                        ) : (
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

                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {productListItems?.map((item, index) => {
                                return (
                                  <React.Fragment key={item._id}>
                                    {item.addVarient.map(
                                      (variant, variantIndex) => (
                                        <tr key={`${item._id}-${variantIndex}`}>
                                          <td>{variantIndex + 1}</td>
                                          <td>
                                            {variant.product_Pic[0] ? (
                                              <img
                                                src={variant.product_Pic[0]}
                                                className="avatar lg rounded"
                                                alt=""
                                                style={{
                                                  width: "5vh",
                                                  height: "5vh",
                                                }}
                                              />
                                            ) : (
                                              <span>No Image</span>
                                            )}
                                          </td>
                                          <td>
                                            {/* {productListItems[0]?.productName_en?.slice(
                                              0,
                                              20
                                            ) + "..." || "N/A"} */}
                                            {productListItems[0]?.productName_en?.toUpperCase()
                                              ?.length > 20
                                              ? productListItems[0].productName_en
                                                  .toUpperCase()
                                                  .slice(0, 20) + "..."
                                              : productListItems[0].productName_en?.toUpperCase() ||
                                                "N/A"}
                                          </td>

                                          <td>{variant.SKU || "N/A"}</td>
                                          <td>{variant.oldPrice || "N/A"}</td>
                                          <td>{variant.Price || "N/A"}</td>
                                          <td>
                                            <span
                                              className={`fs-6 badge ${
                                                variant.stockQuantity === 0
                                                  ? "bg-danger"
                                                  : variant.stockQuantity <= 10
                                                  ? "bg-warning"
                                                  : "bg-success"
                                              }`}
                                            >
                                              {variant.stockQuantity || "N/A"}
                                            </span>{" "}
                                            {/* {variant.stockQuantity || "N/A"} */}
                                          </td>
                                          <td>
                                            {variant?.attribute_Id
                                              ?.attributeName_en || "N/A"}
                                          </td>
                                          <td>
                                            {variant?.values_Id
                                              ?.valuesName_en || "N/A"}
                                          </td>

                                          <td>
                                            <Link
                                              className="comman_btn2 table_viewbtn"
                                              to={item.slug}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              View
                                            </Link>
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {showAddButton ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginLeft: "-300px",
                    }}
                  >
                    <button className="comman_btn mt-4" onClick={handleClick2}>
                      Add New Varient
                    </button>
                  </div>
                ) : null}

                {/* {showAddButton ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button className="comman_btn mt-4" onClick={handleClick2}>
                      Add New Varient
                    </button>
                  </div>
                ) : null} */}
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

export default ProductManagementEdit2;
