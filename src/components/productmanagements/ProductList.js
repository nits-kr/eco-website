import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../Sidebar";
import Spinner from "../Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faCopy } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  useAddReccomdedMutation,
  useEditProductListMutation,
  useGetProductListSearchMutation,
} from "../../services/Post";
import { useDeleteProductListMutation } from "../../services/Post";
import { useSelector } from "react-redux";
import { useGetProductListQuery } from "../../services/Post";
import { MDBDataTable } from "mdbreact";

function ProductList(props) {
  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  // const { data: productLists, refetch: productListsData } =
  //   useGetProductListQuery({ ecomAdmintoken });

  const [productLists] = useGetProductListSearchMutation();

  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [userCounts, setUserCounts] = useState(0);
  const [recentOrderList, setRecentOrderList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [startDate1, setStartDate1] = useState("");
  const [endDate, setEndDate] = useState("");
  //   const [searchQuery, setSearchQuery] = useState("");
  const [deleteProductList, response] = useDeleteProductListMutation();
  const [addReccomded] = useAddReccomdedMutation();
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

  const [product, setProduct] = useState({
    columns: [
      {
        label: "S.NO.",
        field: "sn",
        sort: "asc",
        width: 150,
      },

      {
        label: "PRODUCT IMAGE",
        field: "pic",
        sort: "asc",
        width: 150,
      },

      {
        label: "PRODUCT NAME",
        field: "product_en",
        sort: "asc",
        width: 100,
      },

      {
        label: "CATEGORY",
        field: "cate",
        sort: "asc",
        width: 100,
      },
      {
        label: "BRAND",
        field: "brand",
        sort: "asc",
        width: 100,
      },
      {
        label: "SLUG",
        field: "slug",
        sort: "asc",
        width: 100,
      },
      {
        label: "RECOMMENDED",
        field: "status",
        sort: "asc",
        width: 100,
      },
      {
        label: "ACTION",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [],
  });

  useEffect(() => {
    if (ecomAdmintoken) {
      handleProductList();
    }
  }, [ecomAdmintoken, searchQuery, startDate1]);

  const handleProductList = async () => {
    const data = {
      from: startDate1,
      search: searchQuery,
      ecomAdmintoken: ecomAdmintoken,
    };
    const res = await productLists(data);
    console.log("res pro cate", res);
    setProductList(res?.data?.results?.list);
  };

  useEffect(() => {
    if (productList?.length > 0) {
      // setProductList(productLists?.results?.list);
      const newRows = [];

      productList?.map((list, index) => {
        const returnData = {};
        returnData.sn = index + 1 + ".";

        returnData.product_en = (
          <div
            className="col-12"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <strong className="text-dark-emphasis">
              {list?.productName_en?.toUpperCase()?.length > 20
                ? list?.productName_en.toUpperCase().slice(0, 20) + "..."
                : list?.productName_en?.toUpperCase() || "N/A"}
            </strong>
          </div>
        );
        returnData.cate = <strong>{list?.category_Id?.categoryName_en}</strong>;
        returnData.brand = list?.brand_Id?.brandName_en
          ? list?.brand_Id?.brandName_en
          : "None";
        returnData.slug = (
          <div
            style={{
              cursor: "pointer",
              color: "blue",
            }}
            title="Copy Slug"
            onClick={() => copyToClipboard(list.slug)}
          >
            {displaySlug(list.slug)}{" "}
            <span className="text-secondary">
              <FontAwesomeIcon icon={faCopy} />
            </span>
          </div>
        );
        returnData.pic = (
          <div className="">
            <img
              src={list?.varient?.product_Pic?.[0]}
              className="avatar lg rounded"
              alt=""
              style={{
                width: "10vh",
                height: "10vh",
              }}
            />
          </div>
        );
        returnData.status = (
          <strong>
            <input
              type="checkbox"
              name={`checkbox-${list.productName_en}`}
              id={list._id}
              defaultChecked={list?.Recommended === true ? "checked" : ""}
              onChange={() => handleCheckboxChange(list._id)}
            />
          </strong>
        );
        returnData.action = (
          <>
            <Link
              className="comman_btn table_viewbtn"
              to="/product-management"
              state={{ id: list?._id }}
            >
              View
            </Link>
            <Link
              className="comman_btn2 table_viewbtn ms-2"
              to="#"
              onClick={() => {
                handleDeleteProduct(list._id, list);
              }}
            >
              Delete
            </Link>
          </>
        );
        newRows.push(returnData);
      });
      setProduct({ ...product, rows: newRows });
    }
  }, [productList]);

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
    return slug?.length > 10 ? `${slug.slice(0, 10)}...` : slug;
  };

  const handleCheckboxChange = async (productId) => {
    const res = await addReccomded({ productId, ecomAdmintoken });
    console.log("res", res?.data?.results?.Recommendedproduct?.Recommended);
    if (res?.data?.results?.Recommendedproduct?.Recommended === true) {
      toast.success("Item added to recommended list!");
    } else {
      toast.error("Item removed from recommended list!");
    }
  };

  const handleDeleteProduct = async (id, product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProductList({ id, ecomAdmintoken });
        Swal.fire(
          "Deleted!",
          `${product?.productName_en} item has been deleted.`,
          "success"
        ).then(() => {
          handleProductList();
        });
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
                        <form className="form-design" action="">
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
                            <i className="fa fa-search"></i>
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
                            <MDBDataTable
                              bordered
                              displayEntries={false}
                              className="mt-0"
                              hover
                              data={product}
                              noBottomColumns
                              sortable
                              searching={false}
                            />
                            {/* <table className="table mb-0">
                              <thead>
                                <tr>
                                  <th>Product Image</th>
                                  <th>Product name</th>
                                  <th>Category</th>

                                  <th>Brand</th>
                                  <th>Slug</th>
                                  <th>Recommended</th>
                                  <th>Action</th>
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
                                          {product?.productName_en?.toUpperCase()
                                            ?.length > 20
                                            ? product.productName_en
                                                .toUpperCase()
                                                .slice(0, 20) + "..."
                                            : product.productName_en?.toUpperCase() ||
                                              "N/A"}
                                        </strong>
                                      </div>
                                    </td>
                                    <td>
                                      {" "}
                                      <strong>
                                        {product?.category_Id?.categoryName_en}
                                      </strong>
                                    </td>

                                    <td>
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
                                          defaultChecked={
                                            product?.Recommended === true
                                              ? "checked"
                                              : ""
                                          }
                                          onChange={() =>
                                            handleCheckboxChange(product._id)
                                          }
                                        />
                                      </strong>
                                    </td>
                                    <td>
                                      <Link
                                        className="comman_btn table_viewbtn"
                                        to="/product-management"
                                        state={{ id: product?._id }}
                                      >
                                        View
                                      </Link>
                                      <Link
                                        className="comman_btn2 table_viewbtn ms-2"
                                        to="#"
                                        onClick={() => {
                                          handleDeleteProduct(
                                            product._id,
                                            product
                                          );
                                        }}
                                      >
                                        Delete
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table> */}
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

export default ProductList;
