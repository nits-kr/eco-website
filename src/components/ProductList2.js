import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faCopy } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEditProductListMutation } from "../services/Post";
import { useDeleteProductListMutation } from "../services/Post";

function ProductList2(props) {
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [userCounts, setUserCounts] = useState(0);
  const [recentOrderList, setRecentOrderList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [endDate, setEndDate] = useState("");
  //   const [searchQuery, setSearchQuery] = useState("");
  const [deleteProductList, response] = useDeleteProductListMutation();
  const [editProductList] = useEditProductListMutation();
  const [productName2, setProductName2] = useState("");
  //   const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [productList, setProductList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [itemId, setItemId] = useState("");
  const [copiedSlug, setCopiedSlug] = useState(null);
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const sliderSettings = {
    dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleSearch1 = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/productSearch",
          {
            productName_en: searchQuery,
          }
        );
        const { error, results } = response.data;
        if (error) {
          throw new Error("No Product found...");
        } else {
          setProductList(results?.productData);
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(true);
          }
        });
      }
    } else {
      setProductList([]);
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
        setProductList(response?.data?.results?.list.reverse());
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

  const handleItem = (item) => {
    setProductName2(item?.productName || "");
    // setTitle2(item?.title || "");
    // setCode2(item?.code || "");
    // setDiscount2(item?.Discount || "");
  };
  const handleSaveChanges1 = async (e) => {
    e.preventDefault();
    console.log("handleSaveChanges1", itemId);
    const editOffer = {
      id: itemId,
      productName_en: "School Tables",
    };
    try {
      await editProductList(editOffer);
      // setProductList.refetch();
      // window.location.reload();
      Swal.fire({
        title: "Changes Saved",
        text: "The offer has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      // Handle error if necessary
    }
  };

  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");

  const userList2 = async () => {
    if (!startDate1) return;
    try {
      const { data } = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/productList",
        {
          startDate1,
        }
      );
      const filteredUsers = data?.results?.list?.filter(
        (user) =>
          new Date(user?.createdAt?.slice(0, 10)).toISOString().slice(0, 10) ===
          new Date(startDate1).toISOString().slice(0, 10)
      );
      if (filteredUsers.length === 0) {
        await Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
      setRecentOrderList(filteredUsers);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  useEffect(() => {
    userList2();
  }, [startDate1]);

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/productList",
        {
          startDate,
          endDate,
        }
      )
      .then((response) => {
        const filteredData = response?.data?.results?.list?.filter(
          (data) =>
            new Date(data?.createdAt) >= new Date(startDate) &&
            new Date(data?.createdAt) <= new Date(endDate)
        );
        console.log("filteredData dashboard", filteredData);
        setProductList(filteredData?.reverse());
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const copyToClipboard = async (text) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedSlug(text);
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

  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  return (
    <>
      {loading}
      <Sidebar Dash={"products"} />

      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row dashboard_part justify-content-center">
              <div className="col-12">
                <div className="col-9 mb-4">
                  <div className="main_head"> Products List</div>
                </div>
                <span
                  className="col-auto d-flex "
                  style={{
                    justifyContent: "flex-end",
                    marginTop: "-55px",
                    marginBottom: "15px",
                  }}
                >
                  <Link
                    to="#"
                    className="btn btn-secondary "
                    style={{ marginRight: "10px" }}
                  >
                    Export
                  </Link>
                  <Link
                    to="/product-management"
                    className="btn btn-primary"
                    style={{ marginRight: "24px" }}
                  >
                    Add Product
                  </Link>
                </span>
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>Product List ({productList?.length}) </h2>
                      </div>
                      <div className="col-3">
                        <form
                          className="form-design"
                          action=""
                          onSubmit={handleSearch1}
                        >
                          <div className="form-group mb-0 position-relative icons_set">
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
                              className="fa fa-search"
                              onClick={handleSearch1}
                            ></i>
                          </div>
                        </form>
                      </div>
                      {/* <div className="col-auto">
                        <input
                          type="date"
                          className="custom_date"
                          value={startDate1}
                          onChange={(e) => setStartDate1(e.target.value)}
                        />
                      </div> */}
                    </div>
                    <form
                      className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                      action=""
                      onSubmit={handleSearch}
                    >
                      <div className="form-group mb-0 col-5">
                        <label htmlFor="">From</label>
                        <input
                          type="date"
                          className="form-control"
                          id="startDate"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-0 col-5">
                        <label htmlFor="">To</label>
                        <input
                          type="date"
                          className="form-control"
                          id="endDate"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-0 col-auto">
                        <button
                          className="comman_btn2"
                          disabled={startDate > endDate}
                        >
                          Search
                        </button>
                      </div>
                    </form>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <div className="row">
                        <div className="col-12 comman_table_design px-0">
                          <div className="table-responsive">
                            <table className="table mb-0">
                              <thead>
                                <tr>
                                  <th>Product Image</th>
                                  <th>Product name</th>
                                  <th>Category</th>

                                  {/* <th>Stock</th> */}
                                  <th>Brand</th>
                                  <th>Slug</th>
                                  <th>Recommended</th>
                                  <th>Action</th>
                                  {/* <th>Action</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {(productList || [])?.map((product, index) => (
                                  <tr key={index}>
                                    <td>
                                      {" "}
                                      <img
                                        src={
                                          product?.addVarient[0]?.product_Pic[0]
                                        }
                                        className="avatar lg rounded"
                                        alt=""
                                        style={{
                                          width: "10vh",
                                          height: "10vh",
                                        }}
                                      />{" "}
                                    </td>
                                    <td>
                                      <div
                                        className="col-12"
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "left",
                                        }}
                                      >
                                        <strong className="text-dark-emphasis">
                                          {/* {product?.productName_en?.toUpperCase()?.slice(0, 20) + '...' || "N/A"} */}
                                          {product?.productName_en?.toUpperCase()
                                            ?.length > 20
                                            ? product.productName_en
                                                .toUpperCase()
                                                .slice(0, 20) + "..."
                                            : product.productName_en?.toUpperCase() ||
                                              "N/A"}
                                        </strong>
                                        {/* <strong className="text-body-tertiary">
                                          SKU: {product.SKU}
                                        </strong> */}
                                      </div>
                                    </td>
                                    <td>
                                      {" "}
                                      <strong>
                                        {product?.category_Id?.categoryName_en}
                                      </strong>
                                    </td>

                                    {/* <td>
                                      {" "}
                                      <span
                                        className={`fs-6 badge ${
                                          product.stockQuantity === 0
                                            ? "bg-danger"
                                            : product.stockQuantity <= 10
                                            ? "bg-warning"
                                            : "bg-success"
                                        }`}
                                      >
                                        {product.stockQuantity}
                                      </span>{" "}
                                    </td> */}

                                    <td>
                                      {/* {" "}
                                      ₹{product.Price}{" "}
                                      <del className="fs-6 ms-1 text-secondary">
                                        {" "}
                                        ₹{product?.oldPrice}{" "}
                                      </del>{" "} */}
                                      {product?.brand_Id?.brandName_en
                                        ? product?.brand_Id?.brandName_en
                                        : "None"}
                                    </td>
                                    <td
                                      style={{
                                        cursor: "pointer",
                                        color: "blue",
                                      }}
                                      title="Copy Slug"
                                      onClick={() =>
                                        copyToClipboard(product.slug)
                                      }
                                    >
                                      {/* {product?.slug?.slice(0, 10)}...<FontAwesomeIcon icon={faCopy} /> */}
                                      {displaySlug(product.slug)}{" "}
                                      <span className="text-secondary">
                                        <FontAwesomeIcon icon={faCopy} />
                                      </span>
                                    </td>
                                    <td>
                                      <strong>
                                        <input
                                          type="checkbox"
                                          name={`checkbox-${product.productName_en}`}
                                          id={product._id}
                                          checked={selectedProducts.includes(
                                            product._id
                                          )}
                                          onChange={() =>
                                            handleCheckboxChange(product._id)
                                          }
                                        />
                                      </strong>
                                    </td>
                                    <td>
                                      <Link
                                        className="comman_btn table_viewbtn"
                                        to={`/product-management-edit/${product?._id}`}
                                        onClick={() => {
                                          handleItem(product);
                                          setItemId(product?._id);
                                        }}
                                      >
                                        View
                                      </Link>
                                      <Link
                                        className="comman_btn2 table_viewbtn ms-2"
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
                                              deleteProductList(product?._id);
                                              Swal.fire(
                                                "Deleted!",
                                                `${product?.productName_en} item has been deleted.`,
                                                "success"
                                              ).then(() => {
                                                fetchProductList();
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
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
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

export default ProductList2;
