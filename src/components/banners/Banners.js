import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  useCreateBannersMutation,
  useDeleteBannerAllListMutation,
  useGetBannerListAllQuery,
  useGetBannerListQuery,
  useGetSelectCategoryListQuery,
  useSubCategoryListMutation,
  useSubSubCategoryListMutation,
} from "../../services/Post";
// import Spinner from "../Spinner";
import { useSelector } from "react-redux";
import ButtonSpinner from "../allSpinners/ButtonSpinner";
import "../allSpinners/spinner.css";
import { Spinner } from "react-bootstrap";

function Banners(props) {
  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  const ml = useSelector((data) => data?.local?.header);
  const [loading, setLoading] = useState(true);
  const [loadings, setLoadings] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categoryListdata } = useGetSelectCategoryListQuery({
    ecomAdmintoken,
  });
  const [getSubCategory] = useSubCategoryListMutation();
  const [getSubSubCategory] = useSubSubCategoryListMutation();

  const { data: bannerAll } = useGetBannerListQuery({
    ecomAdmintoken,
  });
  const { data: bannerListAll, refetch: fetchBannerList } =
    useGetBannerListAllQuery({
      ecomAdmintoken,
      search: searchQuery,
    });

  const [addAllTypesBanner] = useCreateBannersMutation();

  const [deleteTopBanner] = useDeleteBannerAllListMutation();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const [addBanner, setAddBanner] = useState(true);
  const [bannerToShow, setBannerToShow] = useState([]);

  const [imageUrl, setImageUrl] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  console.log("selectedValue", selectedValue);
  const [showModal, setShowModal] = useState(false);
  console.log("selectedOptions", selectedOptions);
  const [selectedValueUrl, setSelectedValueUrl] = useState("");
  const [formData, setFormData] = useState({
    bannerPic: null,
  });
  const [subCategory, setSubCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    categoryId1: "",
    categoryId2: "",
    subCategoryId: "",
    subCategoryPic: null,
    bannerPic: null,
  });

  const [bannerListData, setBannerListData] = useState([]);

  useEffect(() => {
    if (bannerListAll) {
      console.log("bannerListAll", bannerListAll?.results?.banners);
      props.setProgress(10);
      setLoading(true);
      setTimeout(() => {
        setBannerListData(bannerListAll?.results?.banners);
        setLoading(false);
        props.setProgress(100);
      }, 1000);
    }
  }, [bannerListAll]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setFormData({ ...formData, bannerPic: event.target.files[0] });
    setImageUrl(URL.createObjectURL(file));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubCategory({ ...subCategory, [name]: value });
  };

  const handleonSaveAll = async (event) => {
    event.preventDefault();
    try {
      const alldata = new FormData();

      if (!formData.bannerPic) {
        Swal.fire({
          icon: "error",
          title: "No Image Selected",
          text: "Please select an image.",
        });
        return;
      }

      if (!selectedValueUrl) {
        Swal.fire({
          icon: "error",
          title: "No URL type Selected",
          text: "Please select an URL.",
        });
        return;
      }
      if (selectedValueUrl === "Category" && !subCategory.categoryId) {
        Swal.fire({
          icon: "error",
          title: "Category ID Required",
          text: "Please select a Category.",
        });
        return;
      }
      if (selectedValueUrl === "SubCategory" && !subCategory.categoryId1) {
        Swal.fire({
          icon: "error",
          title: "SubCategory ID Required",
          text: "Please select a SubCategory.",
        });
        return;
      }
      if (selectedValueUrl === "SubSubCategory" && !subCategory.categoryId2) {
        Swal.fire({
          icon: "error",
          title: "SubSubCategory ID Required",
          text: "Please select a SubSubCategory.",
        });
        return;
      }
      if (selectedValueUrl === "Product" && !subCategory.productId) {
        Swal.fire({
          icon: "error",
          title: "Product ID Required",
          text: "Please select a Product.",
        });
        return;
      }

      if (subCategory.categoryId2) {
        alldata.append("subSubCategory_Id", subCategory.categoryId2);
      }
      if (subCategory.categoryId1) {
        alldata.append("subCategory_Id", subCategory.categoryId1);
      }
      if (subCategory.product_Id) {
        alldata.append("product_Id", subCategory.product_Id);
      }

      alldata.append("URLType", selectedValueUrl);

      if (subCategory.categoryId) {
        alldata.append("category_Id", subCategory.categoryId);
      }

      alldata.append("area", selectedValue);

      alldata.append("image", formData.bannerPic);
      setLoadings(true);

      const response = await addAllTypesBanner({ alldata, ecomAdmintoken });
      setLoadings(false);
      fetchBannerList();

      document.getElementById("bannermodalclose").click();

      if (!response.data.error) {
        Swal.fire({
          icon: "success",
          title: "Banner Created",
          text: "The Banner has been created successfully.",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (categoryListdata) {
      setCategories(categoryListdata?.results?.categoryData);
    }
  }, [categoryListdata]);

  useEffect(() => {
    if (subCategory.categoryId) {
      handleGetSubCategory(subCategory.categoryId);
    }
  }, [subCategory.categoryId]);
  useEffect(() => {
    if (subCategory.categoryId1) {
      handleGetSubSubCategory(subCategory.categoryId1);
    }
  }, [subCategory.categoryId1]);

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

  const handleTypes = () => {
    setAddBanner(false);
  };

  const handleUpdate = (item) => {
    setBannerToShow(item?.image || null);
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    console.log("selectedValue", selectedValue);
    setSelectedValue(selectedValue);
    if (selectedValue !== "" && !selectedOptions.includes(selectedValue)) {
      setSelectedOptions([...selectedOptions, selectedValue]);
    }
    if (selectedValue !== "") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  console.log("selectedValueUrl", selectedValueUrl);
  const handleSelectChangeuRL = (e) => {
    const selectedValueUrl = e.target.value;
    console.log("selectedValue", selectedValueUrl);
    setSelectedValueUrl(selectedValueUrl);
  };

  const handleClick = () => {
    Swal.fire({
      title: "Select Banner Type",
      icon: "info",
      text: "Please select a banner type.",
      confirmButtonText: "OK",
    });
  };

  return (
    <>
      {loading}
      <Sidebar Dash={"Home-Screen-banners"} />
      <div className={`admin_main ${ml ? "admin_full" : ""}`}>
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row signup_management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col-auto">
                        <h2>Category Banner Management </h2>
                      </div>
                      <div className="col-3">
                        <form
                          className="form-design"
                          action=""
                          // onSubmit={handleSearch1}
                        >
                          <div className="form-group mb-0 position-relative icons_set d-none">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search"
                              name="name"
                              id="name"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <i
                              className="far fa-search"
                              // onClick={handleSearch1}
                            ></i>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="row comman_header justify-content-between">
                      <div className="col-xxl-4">
                        <form>
                          <select
                            className="form-select"
                            id="floatingSelect1"
                            aria-label="Floating label select example"
                            defaultValue=" "
                            onChange={(e) => {
                              setBanner(e.target.value);
                              handleTypes();
                              handleSelectChange(e);
                            }}
                          >
                            <option value="">Banner Type</option>
                            <option value="Top Banner">Top Banner</option>
                            <option value="Bottom Banner">Bottom Banner</option>
                            <option value="Side Banner">Side Banner</option>
                            <option value="Middle Banner">Middle Banner</option>
                            <option value="Scrolling Banner">
                              Scrolling Banner
                            </option>
                          </select>
                        </form>
                      </div>
                      <div className="col-xxl-4">
                        {addBanner ? (
                          <span className="col-auto d-flex justify-content-end mt-3">
                            <button
                              type="button"
                              to="#"
                              title="First Select Banner Type"
                              // data-bs-toggle="modal"
                              // data-bs-target="#staticBackdrop"
                              className="btn btn-primary"
                              style={{
                                cursor: "not-allowed",
                                height: "40px",
                              }}
                              // disabled
                              onClick={handleClick}
                            >
                              <FontAwesomeIcon icon={faPlus} /> Upload Category
                              Banner
                            </button>
                          </span>
                        ) : (
                          <span className="col-auto d-flex justify-content-end mt-3">
                            <Link
                              to="#"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              className="btn btn-primary"
                              style={{ height: "40px" }}
                            >
                              <FontAwesomeIcon icon={faPlus} /> Upload Category
                              Banner
                            </Link>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className=" d-flex justify-content-start align-items-center my-1">
                        <strong className=" fs-4">Banners</strong>
                      </div>
                      {/* <hr /> */}
                      <div className="col-12 comman_table_design px-0">
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>URL Type</th>
                                <th>Banner Type</th>
                                <th>Media</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            {loading ? (
                              <div
                                className="d-flex align-items-end justify-content-end "
                                style={{ marginLeft: "250px" }}
                              >
                                <ButtonSpinner />
                              </div>
                            ) : (
                              <tbody>
                                {(bannerListData || [])?.map((item, index) => (
                                  <tr key={index}>
                                    <td> {index + 1} </td>
                                    <td> {item?.URLType} </td>
                                    <td> {item?.area} </td>
                                    <td>
                                      <img
                                        className="table_img"
                                        src={item?.image}
                                        alt=""
                                      />
                                    </td>
                                    <td>
                                      <Link
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop2"
                                        className="comman_btn table_viewbtn me-2"
                                        to=""
                                        onClick={() => {
                                          handleUpdate(item);
                                          // setId1(category?._id);
                                        }}
                                      >
                                        View
                                      </Link>
                                      <Link
                                        className="comman_btn2 table_viewbtn"
                                        // data-bs-toggle="modal"
                                        // data-bs-target="#delete"
                                        to="#"
                                        onClick={() => {
                                          Swal.fire({
                                            title: "Are you sure?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText:
                                              "Yes, delete it!",
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              deleteTopBanner({
                                                id: item?._id,
                                                ecomAdmintoken,
                                              });
                                              Swal.fire(
                                                "Deleted!",
                                                `${item?.area}  item has been deleted.`,
                                                "success"
                                              ).then(() => {
                                                fetchBannerList();
                                              });
                                            }
                                          });
                                        }}
                                      >
                                        Delete
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            )}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade reply_modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add Banner Image
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="bannermodalclose"
              ></button>
            </div>
            <div className="modal-body py-4">
              <div className="chatpart_main">
                <div className="banner_sliders_box">
                  <div className="row Onboarding_box mb-4 mx-0">
                    <div className="form-group mb-0 col-12">
                      {/* <div className="form-group mb-0 col-3"> */}
                      <div className="banner-profile position-relative">
                        <div
                          className="banner-Box bg-light"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "auto",
                          }}
                        >
                          {selectedImage ? (
                            <img
                              src={selectedImage}
                              className="img-fluid"
                              alt="..."
                              style={{ height: "200px" }}
                            />
                          ) : (
                            <>
                              <img
                                src="..."
                                className="img-fluid"
                                alt="..."
                                style={{ height: "auto", minHeight: "200px" }}
                              />{" "}
                              {/* <div>720 X 250</div> */}
                            </>
                          )}
                        </div>
                        <div className="p-image">
                          <label htmlFor="file">
                            <i className="upload-button fas fa-camera" />
                          </label>
                          <input
                            className="form-control d-none"
                            type="file"
                            accept="image/*"
                            name="file"
                            id="file"
                            onChange={(e) => handleImageUpload(e, "file")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-12 mt-3">
                    <form>
                      <select
                        className="form-select"
                        id="floatingSelect1"
                        aria-label="Floating label select example"
                        defaultValue=" "
                        onChange={(e) => {
                          // setBanner(e.target.value);
                          // handleTypes();
                          handleSelectChangeuRL(e);
                        }}
                      >
                        <option value="">URL Type</option>
                        <option value="Product">Product</option>
                        <option value="Category">Category</option>
                        <option value="SubCategory">SubCategory</option>
                        <option value="SubSubCategory">SubSubCategory</option>
                        <option value="NoURL">NoURL</option>
                      </select>
                    </form>
                  </div>
                  <div className="form-group col-12 my-3">
                    <label htmlFor="" className="ms-1">
                      Category
                    </label>
                    <select
                      className="select form-control mt-2"
                      multiple=""
                      name="categoryId"
                      id="selectCategory"
                      value={subCategory.categoryId}
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
                  {subCategories?.length > 0 ? (
                    <div className="form-group col-12 ">
                      <label htmlFor="" className="ms-1">
                        Sub Category
                      </label>
                      <select
                        className="select form-control mt-2"
                        multiple=""
                        name="categoryId1"
                        id="selectSubCategory"
                        value={subCategory.categoryId1}
                        onChange={handleInputChange}
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
                  ) : null}

                  {subSubCategories?.length > 0 ? (
                    <div className="form-group col-12 mt-2 mb-2">
                      <label htmlFor="" className="ms-1">
                        Sub Sub Category
                      </label>
                      <select
                        className="select form-control mt-1"
                        multiple=""
                        name="categoryId2"
                        id="selectSubSubCategory"
                        value={subCategory.categoryId2}
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
                  ) : null}

                  <div className="row mt-3">
                    {/* <hr
                      style={{
                        borderTop: "1px solid #6c757d",
                        margin: "10px 0",
                      }}
                    /> */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "40px",
                      }}
                    >
                      <button
                        type="button"
                        className="comman_btn table_viewbtn me-1"
                        style={{
                          fontSize: "15px",
                          cursor: loadings ? "not-allowed" : "pointer",
                        }}
                        onClick={(e) => handleonSaveAll(e)}
                        // onClick={handleonSave}
                        disabled={loadings ? true : false}
                      >
                        {loadings ? (
                          // <Spinner style={{ height: "20px", width: "20px" }} />
                          <div
                            className="lds-spinner"
                            style={{ marginTop: "-25px" }}
                          >
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                            <div />
                          </div>
                        ) : (
                          "Save"
                        )}
                      </button>
                      <button
                        type="button"
                        className="comman_btn2 table_viewbtn ms-1"
                        style={{ fontSize: "15px" }}
                        onClick={() =>
                          document.getElementById("bannermodalclose").click()
                        }
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade reply_modal"
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Banner Image
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-4">
              <div className="chatpart_main">
                <div className="banner_sliders_box">
                  <div className="row Onboarding_box mb-4 mx-0">
                    <div className="form-group mb-0 col-12">
                      <div className="banner-profile position-relative">
                        <div
                          className="banner-Box bg-light"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "auto",
                          }}
                        >
                          <img
                            src={bannerToShow}
                            className="img-fluid"
                            alt="..."
                          />{" "}
                          {/* <div>720 X 250</div> */}
                        </div>
                      </div>
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

export default Banners;
