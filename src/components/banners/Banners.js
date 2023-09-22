import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  useDeleteCategoryBottomBannerMutation,
  useDeleteCategoryMiddleBannerMutation,
  useDeleteCategoryScrollBannerMutation,
  useDeleteCategorySideBannerMutation,
  useDeleteCategoryTopBannerMutation,
  useGetBannerListQuery,
  useGetCatogaryBottomBannerListQuery,
  useGetCatogaryMiddleBannerListQuery,
  useGetCatogaryScrollBannerListQuery,
  useGetCatogarySideBannerListQuery,
} from "../../services/Post";
import Spinner from "../Spinner";

function Banners(props) {
  const [loading, setLoading] = useState(true);
  const { data: bannerAll } = useGetBannerListQuery();
  const { data: sideBanner } = useGetCatogarySideBannerListQuery();
  const { data: bottomBanner } = useGetCatogaryBottomBannerListQuery();
  const { data: middleBanner } = useGetCatogaryMiddleBannerListQuery();
  const { data: scrollBanner } = useGetCatogaryScrollBannerListQuery();
  const [deleteTopBanner] = useDeleteCategoryTopBannerMutation();
  const [deleteMiddleBanner] = useDeleteCategoryMiddleBannerMutation();
  const [deleteBottomBanner] = useDeleteCategoryBottomBannerMutation();
  const [deleteSideBanner] = useDeleteCategorySideBannerMutation();
  const [deleteScrollBanner] = useDeleteCategoryScrollBannerMutation();
  const [bannerList, setBannerList] = useState([]);
  const [sideBannerList, setSideBannerList] = useState([]);
  const [bottomBannerList, setBottomBannerList] = useState([]);
  const [middleBannerList, setMiddleBannerList] = useState([]);
  const [scrollBannerList, setScrollBannerList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const [addBanner, setAddBanner] = useState(true);
  const [bannerToShow, setBannerToShow] = useState([]);
  const [sideBannerToShow, setSideBannerToShow] = useState([]);
  const [bottomBannerToShow, setBottomBannerToShow] = useState([]);
  const [middleBannerToShow, setMiddleBannerToShow] = useState([]);
  const [scrollBannerToShow, setScrollBannerToShow] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  console.log("selectedValue", selectedValue);
  const [showModal, setShowModal] = useState(false);
  console.log("selectedOptions", selectedOptions);
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
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");

  useEffect(() => {
    if (sideBanner) {
      console.log(sideBanner);
      props.setProgress(10);
      setLoading(true);
      setTimeout(() => {
        setSideBannerList(sideBanner?.results?.bannerList?.slice()?.reverse());
        setLoading(false);
        props.setProgress(100);
      }, 1000);
    }
  }, [sideBanner]);
  useEffect(() => {
    if (bottomBanner) {
      console.log(bottomBanner);
      props.setProgress(10);
      setLoading(true);
      setTimeout(() => {
        setBottomBannerList(
          bottomBanner?.results?.bannerList?.slice()?.reverse()
        );
        setLoading(false);
        props.setProgress(100);
      }, 1000);
    }
  }, [bottomBanner]);

  useEffect(() => {
    if (bannerAll) {
      console.log(bannerAll);
      props.setProgress(10);
      setLoading(true);
      setTimeout(() => {
        setBannerList(bannerAll?.results?.bannerList?.slice()?.reverse());
        setLoading(false);
        props.setProgress(100);
      }, 1000);
    }
  }, [bannerAll]);
  useEffect(() => {
    if (middleBanner) {
      console.log(middleBanner);
      props.setProgress(10);
      setLoading(true);
      setTimeout(() => {
        setMiddleBannerList(
          middleBanner?.results?.bannerList?.slice()?.reverse()
        );
        setLoading(false);
        props.setProgress(100);
      }, 1000);
    }
  }, [middleBanner]);
  useEffect(() => {
    if (scrollBanner) {
      console.log(scrollBanner);
      props.setProgress(10);
      setLoading(true);
      setTimeout(() => {
        setScrollBannerList(
          scrollBanner?.results?.bannerList?.slice()?.reverse()
        );
        setLoading(false);
        props.setProgress(100);
      }, 1000);
    }
  }, [scrollBanner]);
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

  const handleonSaveTop = async (event) => {
    // event.preventDefault();
    try {
      const data = new FormData();
      if (subCategory.subCategoryId) {
        data.append("subSubCategory_Id", subCategory.categoryId2);
      }
      if (subCategory.categoryId1) {
        data.append("subCategory_Id", subCategory.categoryId1);
      }
      data.append("category_Id", subCategory.categoryId);
      data.append("categoryBanner", formData.bannerPic);

      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/home/homeScreen/category-banner",
        data
      );

      if (!response.data.error) {
        Swal.fire({
          icon: "success",
          title: "Banner Created",
          text: "The Banner has been created successfully.",
        });
        // setSubCategory({
        //   nameEn: "",
        //   nameAr: "",
        //   categoryId: "",
        //   subCategoryPic: null,
        // });
        // subCategoryManagementList();
        setTimeout(() => {
          window?.location?.reload();
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleonSaveBottom = async (event) => {
    // event.preventDefault();
    try {
      const data = new FormData();
      if (subCategory.subCategoryId) {
        data.append("subSubCategory_Id", subCategory.categoryId2);
      }
      if (subCategory.categoryId1) {
        data.append("subCategory_Id", subCategory.categoryId1);
      }
      data.append("category_Id", subCategory.categoryId);
      data.append("bottomBanner", formData.bannerPic);

      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/home/homeScreen/bottom-banner",
        data
      );

      if (!response.data.error) {
        Swal.fire({
          icon: "success",
          title: "Banner Created",
          text: "The Banner has been created successfully.",
        });
        // setSubCategory({
        //   nameEn: "",
        //   nameAr: "",
        //   categoryId: "",
        //   subCategoryPic: null,
        // });
        // subCategoryManagementList();
        setTimeout(() => {
          window?.location?.reload();
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleonSaveSide = async (event) => {
    // event.preventDefault();
    try {
      const data = new FormData();
      if (subCategory.subCategoryId) {
        data.append("subSubCategory_Id", subCategory.categoryId2);
      }
      if (subCategory.categoryId1) {
        data.append("subCategory_Id", subCategory.categoryId1);
      }
      data.append("category_Id", subCategory.categoryId);
      data.append("sideBanner", formData.bannerPic);

      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/home/homeScreen/side-banner",
        data
      );

      if (!response.data.error) {
        Swal.fire({
          icon: "success",
          title: "Banner Created",
          text: "The Banner has been created successfully.",
        });
        // setSubCategory({
        //   nameEn: "",
        //   nameAr: "",
        //   categoryId: "",
        //   subCategoryPic: null,
        // });
        // subCategoryManagementList();
        setTimeout(() => {
          window?.location?.reload();
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleonSaveMiddle = async (event) => {
    // event.preventDefault();
    try {
      const data = new FormData();
      if (subCategory.subCategoryId) {
        data.append("subSubCategory_Id", subCategory.categoryId2);
      }
      if (subCategory.categoryId1) {
        data.append("subCategory_Id", subCategory.categoryId1);
      }
      data.append("category_Id", subCategory.categoryId);
      data.append("middleBanner", formData.bannerPic);

      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/home/homeScreen/middle-banner",
        data
      );

      if (!response.data.error) {
        Swal.fire({
          icon: "success",
          title: "Banner Created",
          text: "The Banner has been created successfully.",
        });
        // setSubCategory({
        //   nameEn: "",
        //   nameAr: "",
        //   categoryId: "",
        //   subCategoryPic: null,
        // });
        // subCategoryManagementList();
        setTimeout(() => {
          window?.location?.reload();
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleonSaveScroll = async (event) => {
    // event.preventDefault();
    try {
      const data = new FormData();
      if (subCategory.subCategoryId) {
        data.append("subSubCategory_Id", subCategory.categoryId2);
      }
      if (subCategory.categoryId1) {
        data.append("subCategory_Id", subCategory.categoryId1);
      }
      data.append("category_Id", subCategory.categoryId);
      data.append("scrollBanner", formData.bannerPic);

      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/home/homeScreen/scroll-banner",
        data
      );

      if (!response.data.error) {
        Swal.fire({
          icon: "success",
          title: "Banner Created",
          text: "The Banner has been created successfully.",
        });
        // setSubCategory({
        //   nameEn: "",
        //   nameAr: "",
        //   categoryId: "",
        //   subCategoryPic: null,
        // });
        // subCategoryManagementList();
        setTimeout(() => {
          window?.location?.reload();
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/category/list"
      );
      setCategories(response?.data?.results?.list);
      console.log(response?.data?.results?.list);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subCategory/selectCategory/${subCategory.categoryId}`
        );
        setSubCategories(response.data.results.categoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [subCategory.categoryId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/category/subSubCategory/selectSubCategory/${subCategory.categoryId1}`
        );
        setSubSubCategories(response.data.results.subCategoryData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [subCategory.categoryId1]);

  const handleTypes = () => {
    setAddBanner(false);
  };

  const handleUpdate = (item) => {
    setBannerToShow(item?.categoryBanner[0] || null);
  };
  const handleUpdateSide = (item) => {
    setSideBannerToShow(item?.sideBanner[0] || null);
  };
  const handleUpdateBottom = (item) => {
    setBottomBannerToShow(item?.bottomBanner[0] || null);
  };
  const handleUpdateMiddle = (item) => {
    setMiddleBannerToShow(item?.middleBanner[0] || null);
  };
  const handleUpdateScroll = (item) => {
    setScrollBannerToShow(item?.scrollBanner[0] || null);
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
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

  const handleBannersApi = () => {
    if (selectedValue === "Top") {
      handleonSaveTop();
      console.log("Top");
    } else if (selectedValue === "Bottom") {
      handleonSaveBottom();
      console.log("Bottom");
    } else if (selectedValue === "Middle") {
      handleonSaveMiddle();
      console.log("Middle");
    } else if (selectedValue === "Scrolling") {
      handleonSaveScroll();
      console.log("Scrolling ");
    } else if (selectedValue === "Side") {
      handleonSaveSide();
      console.log("Side");
    }
  };

  return (
    <>
      {loading}
      <Sidebar Dash={"Home-Screen-banners"} />
      <div className="admin_main">
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
                            <option value="Top">Top Banner</option>
                            <option value="Bottom">Bottom Banner</option>
                            <option value="Side">Side Banner</option>
                            <option value="Middle">Middle Banner</option>
                            <option value="Scrolling">Scrolling Banner</option>
                          </select>
                        </form>
                      </div>
                      <div className="col-xxl-4">
                        {addBanner ? (
                          <span className="col-auto d-flex justify-content-end mt-3">
                            <Link
                              to="#"
                              title="First Select Banner Type"
                              // data-bs-toggle="modal"
                              // data-bs-target="#staticBackdrop"
                              className="btn btn-primary"
                              style={{
                                cursor: "not-allowed",
                              }}
                              disabled
                            >
                              <FontAwesomeIcon icon={faPlus} /> Upload Category
                              Banner
                            </Link>
                          </span>
                        ) : (
                          <span className="col-auto d-flex justify-content-end mt-3">
                            <Link
                              to="#"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              className="btn btn-primary"
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
                        <strong className=" fs-4">Top Banners</strong>
                      </div>
                      {/* <hr /> */}
                      <div className="col-12 comman_table_design px-0">
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Category Name</th>
                                <th>Media</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            {loading ? (
                              <div
                                className="d-flex align-items-end justify-content-end "
                                style={{ marginLeft: "250px" }}
                              >
                                <Spinner />
                              </div>
                            ) : (
                              <tbody>
                                {(bannerList || [])?.map((item, index) => (
                                  <tr key={index}>
                                    <td> {index + 1} </td>
                                    <td>
                                      {" "}
                                      {item?.category_Id?.categoryName_en}{" "}
                                    </td>
                                    <td>
                                      <img
                                        className="table_img"
                                        src={item?.categoryBanner[0]}
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
                                              deleteTopBanner(item?._id);
                                              Swal.fire(
                                                "Deleted!",
                                                `${item?.category_Id?.categoryName_en}  item has been deleted.`,
                                                "success"
                                              ).then(() => {
                                                const updatedOfferList =
                                                  bannerList.filter(
                                                    (offer) =>
                                                      offer._id !== item?._id
                                                  );
                                                setBannerList(updatedOfferList);
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
                    <div className="row mt-5">
                      <div className=" d-flex justify-content-start align-items-center my-1">
                        <strong className=" fs-4">Side Banners</strong>
                      </div>
                      {/* <hr /> */}
                      <div className="col-12 comman_table_design px-0">
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Category Name</th>
                                <th>Media</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            {loading ? (
                              <div
                                className="d-flex align-items-end justify-content-end "
                                style={{ marginLeft: "250px" }}
                              >
                                <Spinner />
                              </div>
                            ) : (
                              <tbody>
                                {(sideBannerList || [])?.map((item, index) => (
                                  <tr key={index}>
                                    <td> {index + 1} </td>
                                    <td>
                                      {" "}
                                      {item?.category_Id?.categoryName_en}{" "}
                                    </td>
                                    <td>
                                      <img
                                        className="table_img"
                                        src={item?.sideBanner[0]}
                                        alt=""
                                      />
                                    </td>
                                    <td>
                                      <Link
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop3"
                                        className="comman_btn table_viewbtn me-2"
                                        to=""
                                        onClick={() => {
                                          handleUpdateSide(item);
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
                                              deleteSideBanner(item?._id);
                                              Swal.fire(
                                                "Deleted!",
                                                `${item?.category_Id?.categoryName_en}  item has been deleted.`,
                                                "success"
                                              ).then(() => {
                                                const updatedOfferList =
                                                  sideBannerList.filter(
                                                    (offer) =>
                                                      offer._id !== item?._id
                                                  );
                                                setSideBannerList(
                                                  updatedOfferList
                                                );
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
                    <div className="row mt-5">
                      <div className=" d-flex justify-content-start align-items-start my-1">
                        <strong className=" fs-4">Middle Banners</strong>
                      </div>
                      {/* <hr /> */}
                      <div className="col-12 comman_table_design px-0">
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Category Name</th>
                                <th>Media</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            {middleBannerList?.length > 0 ? (
                              loading ? (
                                <tbody>
                                  <tr>
                                    <td colSpan="4" className="text-center">
                                      <div className="d-flex align-items-end justify-content-center">
                                        <Spinner />
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              ) : (
                                <tbody>
                                  {(middleBannerList || []).map(
                                    (item, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                          {item?.category_Id?.categoryName_en}
                                        </td>{" "}
                                        <td>
                                          <img
                                            className="table_img"
                                            src={item?.middleBanner[0]}
                                            alt={
                                              item?.category_Id?.categoryName_en
                                            }
                                          />
                                        </td>
                                        <td>
                                          <Link
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop5"
                                            className="comman_btn table_viewbtn me-2"
                                            to=""
                                            onClick={() => {
                                              handleUpdateMiddle(item);
                                            }}
                                          >
                                            View
                                          </Link>
                                          <Link
                                            className="comman_btn2 table_viewbtn"
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
                                                  deleteMiddleBanner(item?._id);
                                                  Swal.fire(
                                                    "Deleted!",
                                                    `${item?.category_Id?.categoryName_en}  item has been deleted.`,
                                                    "success"
                                                  ).then(() => {
                                                    const updatedOfferList =
                                                      middleBannerList.filter(
                                                        (offer) =>
                                                          offer._id !==
                                                          item?._id
                                                      );
                                                    setMiddleBannerList(
                                                      updatedOfferList
                                                    );
                                                  });
                                                }
                                              });
                                            }}
                                          >
                                            Delete
                                          </Link>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              )
                            ) : (
                              // If bottomBannerList is empty, display a message
                              <tbody>
                                <tr>
                                  <td colSpan="4" className="text-center">
                                    <strong>No Bottom Banner found.</strong>
                                  </td>
                                </tr>
                              </tbody>
                            )}
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className=" d-flex justify-content-start align-items-start my-1">
                        <strong className=" fs-4">Scroll Banners</strong>
                      </div>
                      {/* <hr /> */}
                      <div className="col-12 comman_table_design px-0">
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Category Name</th>
                                <th>Media</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            {scrollBannerList?.length > 0 ? (
                              loading ? (
                                <tbody>
                                  <tr>
                                    <td colSpan="4" className="text-center">
                                      <div className="d-flex align-items-end justify-content-center">
                                        <Spinner />
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              ) : (
                                <tbody>
                                  {(scrollBannerList || []).map(
                                    (item, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                          {item?.category_Id?.categoryName_en}
                                        </td>{" "}
                                        <td>
                                          <img
                                            className="table_img"
                                            src={item?.scrollBanner[0]}
                                            alt={
                                              item?.category_Id?.categoryName_en
                                            }
                                          />
                                        </td>
                                        <td>
                                          <Link
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop7"
                                            className="comman_btn table_viewbtn me-2"
                                            to=""
                                            onClick={() => {
                                              handleUpdateScroll(item);
                                            }}
                                          >
                                            View
                                          </Link>
                                          <Link
                                            className="comman_btn2 table_viewbtn"
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
                                                  deleteScrollBanner(item?._id);
                                                  Swal.fire(
                                                    "Deleted!",
                                                    `${item?.category_Id?.categoryName_en}  item has been deleted.`,
                                                    "success"
                                                  ).then(() => {
                                                    const updatedOfferList =
                                                      scrollBannerList.filter(
                                                        (offer) =>
                                                          offer._id !==
                                                          item?._id
                                                      );
                                                    setScrollBannerList(
                                                      updatedOfferList
                                                    );
                                                  });
                                                }
                                              });
                                            }}
                                          >
                                            Delete
                                          </Link>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              )
                            ) : (
                              // If bottomBannerList is empty, display a message
                              <tbody>
                                <tr>
                                  <td colSpan="4" className="text-center">
                                    <strong>No Bottom Banner found.</strong>
                                  </td>
                                </tr>
                              </tbody>
                            )}
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className=" d-flex justify-content-start align-items-start my-1">
                        <strong className=" fs-4">Bottom Banners</strong>
                      </div>
                      {/* <hr /> */}
                      <div className="col-12 comman_table_design px-0">
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Category Name</th>
                                <th>Media</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            {bottomBannerList?.length > 0 ? (
                              loading ? (
                                <tbody>
                                  <tr>
                                    <td colSpan="4" className="text-center">
                                      <div className="d-flex align-items-end justify-content-center">
                                        <Spinner />
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              ) : (
                                <tbody>
                                  {(bottomBannerList || []).map(
                                    (item, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                          {item?.category_Id?.categoryName_en}
                                        </td>{" "}
                                        <td>
                                          <img
                                            className="table_img"
                                            src={item.bottomBanner[0]}
                                            alt={
                                              item?.category_Id?.categoryName_en
                                            }
                                          />
                                        </td>
                                        <td>
                                          <Link
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop4"
                                            className="comman_btn table_viewbtn me-2"
                                            to=""
                                            onClick={() => {
                                              handleUpdateBottom(item);
                                            }}
                                          >
                                            View
                                          </Link>
                                          <Link
                                            className="comman_btn2 table_viewbtn"
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
                                                  deleteBottomBanner(item?._id);
                                                  Swal.fire(
                                                    "Deleted!",
                                                    `${item?.category_Id?.categoryName_en}  item has been deleted.`,
                                                    "success"
                                                  ).then(() => {
                                                    const updatedOfferList =
                                                      bottomBannerList.filter(
                                                        (offer) =>
                                                          offer._id !==
                                                          item?._id
                                                      );
                                                    setBottomBannerList(
                                                      updatedOfferList
                                                    );
                                                  });
                                                }
                                              });
                                            }}
                                          >
                                            Delete
                                          </Link>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              )
                            ) : (
                              // If bottomBannerList is empty, display a message
                              <tbody>
                                <tr>
                                  <td colSpan="4" className="text-center">
                                    <strong>No Bottom Banner found.</strong>
                                  </td>
                                </tr>
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
                Add Primary Banner Image
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
                    {/* <span className="head_spann">Home Screen 1</span> */}
                    {/* <div className="check_toggle">
                      <input
                        type="checkbox"
                        defaultChecked=""
                        name="check1"
                        id="check1"
                        className="d-none"
                      />
                      <label htmlFor="check1" />
                    </div> */}
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
                              style={{ height: "auto" }}
                            />
                          ) : (
                            <>
                              <img
                                src="..."
                                className="img-fluid"
                                alt="..."
                                style={{ height: "auto" }}
                              />{" "}
                              <div>720 X 250</div>
                            </>
                          )}
                          {/* <img src="..." className="img-fluid" alt="..." />{" "}
                          <div>720 X 250</div> */}
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
                    <div className="form-group col-12 mt-2">
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

                  <div className="row">
                    <hr
                      style={{
                        borderTop: "1px solid #6c757d",
                        margin: "10px 0",
                      }}
                    />

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
                        style={{ fontSize: "15px" }}
                        onClick={handleBannersApi}
                        // onClick={handleonSave}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="comman_btn2 table_viewbtn ms-1"
                        style={{ fontSize: "15px" }}
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
      {console.log("showModal", showModal)}

      <div
        className="modal fade reply_modal"
        id="staticBackdrop3"
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
                            src={sideBannerToShow}
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

      <div
        className="modal fade reply_modal"
        id="staticBackdrop4"
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
                            src={bottomBannerToShow}
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
      <div
        className="modal fade reply_modal"
        id="staticBackdrop5"
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
                            src={middleBannerToShow}
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
      <div
        className="modal fade reply_modal"
        id="staticBackdrop7"
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
                            src={scrollBannerToShow}
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
