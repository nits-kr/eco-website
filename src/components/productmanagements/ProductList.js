import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../Sidebar";
// import Spinner from "../Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faCopy } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiEdit } from "react-icons/bi";

import {
  useAddReccomdedMutation,
  useCreateInventoryMutation,
  useEditProductListMutation,
  useGetProductListSearchMutation,
} from "../../services/Post";
import { useDeleteProductListMutation } from "../../services/Post";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductListQuery } from "../../services/Post";
import { MDBDataTable } from "mdbreact";
import { Button } from "rsuite";
import { setProductId } from "../../app/localSlice";
import { Spinner } from "react-bootstrap";
import Pagination from "../paginations/Pagination";

function ProductList(props) {
  const ecomAdmintoken = useSelector((data) => data?.local?.token);
  const ml = useSelector((data) => data?.local?.header);
  const localPage = useSelector((data) => data?.local?.page);

  const [selectedRowsPerPage, setSelectedRowsPerPage] = useState(null);

  const [productLists] = useGetProductListSearchMutation();
  const [uploadInvent] = useCreateInventoryMutation();

  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");
  const [loader2, setLoader2] = useState(false);

  //   const [searchQuery, setSearchQuery] = useState("");
  const [deleteProductList, response] = useDeleteProductListMutation();
  const [addReccomded] = useAddReccomdedMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [productList, setProductList] = useState([]);
  const [totalItems, setTotalItems] = useState("");

  const [selectAll, setSelectAll] = useState(false);
  const importInput = document.getElementById("fileID");

  const [itemId, setItemId] = useState("");
  const [copiedSlug, setCopiedSlug] = useState(null);
  const [impFile, setImpFile] = useState([]);
  const [set, setSet] = useState(true);

  const [goToPageInput, setGoToPageInput] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [ux, setUx] = useState("");
  const [uE, setUE] = useState("");
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const dispatch = useDispatch();

  const sliderSettings = {
    dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const onFileSelection = (e) => {
    let file = e.target.files[0];
    setImpFile(file);
    setUx("uploaded");
  };

  const onUpload = async (e) => {
    e.preventDefault();
    setLoader2(true);
    const formData = new FormData();
    formData.append("file ", impFile);
    const res = await uploadInvent({ formData, ecomAdmintoken });

    setLoader2(false);

    if (res?.data.error) {
      setLoader2(false);
      Swal.fire({
        title: res?.data?.message,
        icon: "error",
        confirmButtonText: "okay",
      });
    }
    if (res?.error) {
      Swal.fire({
        title: "Error in File",
        icon: "error",
        confirmButtonText: "ok",
      });
      setLoader2(false);
    }
    if (res?.data.message === "Product imported successfully") {
      setLoader2(false);

      Swal.fire({
        title: "Products Imported successfully",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((res) => {
        document?.getElementById("modal-close66").click();
      });
    } else if (res?.data.message === "Error in File") {
      setLoader2(false);

      Swal.fire({
        title: "Item Number or Product Name Error in CSV",
        text: res?.data.results?.catError.map((item) => item),
        icon: "error",
        focusConfirm: false,
      });
    } else if (res?.data.message === "Error in file") {
      setLoader2(false);

      Swal.fire({
        title: "Item Number or Product Name Error in CSV",
        text: res?.data.results?.itemNumErr.map((item) => item),
        icon: "error",
        focusConfirm: false,
      });
      document.getElementById("reUpload").hidden = false;
    }
  };

  useEffect(() => {
    if (ecomAdmintoken) {
      handleProductList();
    }
  }, [
    ecomAdmintoken,
    searchQuery,
    localPage,
    selectedRowsPerPage,
    goToPageInput,
  ]);

  const handleProductList = async (e) => {
    const data = {
      from: startDate,
      to: endDate,
      search: searchQuery,
      ecomAdmintoken: ecomAdmintoken,
      pageSize:
        selectedRowsPerPage !== null ? parseInt(selectedRowsPerPage) : 10,
      page: parseInt(goToPageInput),
    };
    setLoading(true);
    const res = await productLists(data);
    setLoading(false);
    setProductList(res?.data?.results?.list);
    setTotalItems(res?.data?.results?.totalPages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProductList();
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
    return slug?.length > 10 ? `${slug.slice(0, 10)}...` : slug;
  };

  const handleCheckboxChange = async (productId) => {
    const res = await addReccomded({ productId, ecomAdmintoken });

    if (res?.data?.message === "Added to recommendation") {
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

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = productList?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleRowsPerPageChange = (event) => {
    setGoToPageInput("");
    setSelectedRowsPerPage(null);
    const selectedValue = event.target.value;
    setSelectedRowsPerPage(selectedValue);

    const parsedValue = parseInt(selectedValue, 10);
    setItemsPerPage(isNaN(parsedValue) ? 2 : parsedValue);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(goToPageInput, 10);
    if (
      !isNaN(pageNumber) &&
      pageNumber > 0 &&
      pageNumber <= Math.ceil(productList.length / itemsPerPage)
    ) {
      setCurrentPage(pageNumber);
    } else {
      console.error("Invalid page number");
    }
  };

  return (
    <>
      {loading}
      <Sidebar Dash={"products"} />

      <div className={`admin_main ${ml ? "admin_full" : ""}`}>
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
                  <button
                    // to="#"
                    data-bs-toggle="modal"
                    id="modal-toggle66"
                    data-bs-target="#staticBackdrop66"
                    className="btn btn-secondary "
                    style={{ marginRight: "10px", height: "40px" }}
                  >
                    Import New Inventory
                  </button>
                  <Link
                    to="/product-management"
                    className="btn btn-primary"
                    style={{ marginRight: "24px", height: "40px" }}
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
                      onSubmit={handleSubmit}
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
                          // onClick={(e) => handleProductList(e)}
                        >
                          Search
                        </button>
                      </div>
                    </form>
                    {loading ? (
                      <div className="d-flex align-items-center justify-content-center mb-3">
                        <Spinner />
                      </div>
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

                                  <th>Brand</th>
                                  <th>Slug</th>
                                  <th>Recommended</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(productList || [])?.map((list, index) => (
                                  <tr key={index}>
                                    <td>
                                      {" "}
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
                                          {list?.productName_en?.toUpperCase()
                                            ?.length > 20
                                            ? list?.productName_en
                                                .toUpperCase()
                                                .slice(0, 20) + "..."
                                            : list?.productName_en?.toUpperCase() ||
                                              "N/A"}
                                        </strong>
                                      </div>
                                    </td>
                                    <td>
                                      {" "}
                                      <strong>
                                        {list?.category_Id?.categoryName_en}
                                      </strong>
                                    </td>

                                    <td>
                                      {list?.brand_Id?.brandName_en
                                        ? list?.brand_Id?.brandName_en
                                        : "None"}
                                    </td>
                                    <td
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
                                    </td>
                                    <td>
                                      <strong>
                                        <input
                                          type="checkbox"
                                          name={`checkbox-${list.productName_en}`}
                                          id={list._id}
                                          defaultChecked={
                                            list?.Recommended === true
                                              ? "checked"
                                              : ""
                                          }
                                          onChange={() =>
                                            handleCheckboxChange(list._id)
                                          }
                                        />
                                      </strong>
                                    </td>
                                    <td>
                                      <>
                                        <Link
                                          className="comman_btn table_viewbtn"
                                          to="/product-management"
                                          state={{ id: list?._id }}
                                          onClick={() =>
                                            dispatch(setProductId(list?._id))
                                          }
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
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div
                              className="row tables_bottom "
                              style={{
                                display:
                                  productList?.length > 0 ? "flex" : "none",
                              }}
                            >
                              <div className="col-auto">
                                <div className="tables_bottom_left">
                                  <span>Rows per page</span>
                                  <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={selectedRowsPerPage}
                                    onChange={handleRowsPerPageChange}
                                    style={{ width: "75px" }}
                                  >
                                    <option value="" disabled>
                                      Select
                                    </option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col text-center">
                                <Pagination
                                  totalItems={productList?.length * totalItems}
                                  itemsPerPage={itemsPerPage}
                                  onPageChange={onPageChange}
                                  goToPageInput={goToPageInput}
                                />
                              </div>
                              <div className="col-auto">
                                <div className="tables_bottom_left">
                                  <span>Go to page</span>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={goToPageInput}
                                    onChange={(e) =>
                                      setGoToPageInput(e.target.value)
                                    }
                                  />
                                  <Link to="#" onClick={handleGoToPage}>
                                    <img
                                      src="assets/img/arrow_colr.png"
                                      alt=""
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
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
      <div
        className="modal fade Edit_modal"
        id="staticBackdrop66"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content "
            style={{ width: "100vh", marginLeft: "30vh" }}
          >
            <div className="modal-header ">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  window.location.reload(false);
                }}
                id="modal-close66"
                // style={{ backgroundColor: "red" }}
              />
            </div>
            <div className="modal-body">
              <form className="form-design p-3 help-support-form row align-items-end justify-content-center container">
                <div className="">
                  {set ? (
                    <div className="drop_box p-5">
                      <header>
                        <h4>Choose File here</h4>
                      </header>
                      <p>Files Supported: EXCEL</p>
                      <p className="text-dark bg-light p-2">
                        {impFile?.name}{" "}
                        <button
                          hidden
                          className="btn"
                          id="reUpload"
                          accept=".csv/*"
                          onClick={() => {
                            importInput.click();
                          }}
                        >
                          <BiEdit />
                        </button>
                      </p>
                      {/* <p className="text-danger fw-bold">uploadError</p> */}
                      <input
                        type="file"
                        accept=".csv"
                        id="fileID"
                        style={{ display: "none" }}
                        onChange={onFileSelection}
                      />
                      {ux !== "" ? (
                        <Button
                          className="comman_btn"
                          // loading={loader2}
                          style={{
                            backgroundColor: "#eb3237",
                            color: "#fff",
                            fontSize: "20px",
                            position: "relative",
                            top: "-2px",
                            cursor: loader2 ? "not-allowed" : "pointer",
                          }}
                          onClick={!loader2 ? onUpload : null}
                        >
                          {loader2 ? <Spinner /> : "Upload"}
                          {/* Upload */}
                        </Button>
                      ) : (
                        <Button
                          className="comman_btn2"
                          htmlFor=""
                          onClick={() => {
                            importInput.click();
                          }}
                        >
                          Import
                        </Button>
                      )}
                      <div className="text-secondary mt-2">
                        *Large files may take longer time.
                      </div>
                    </div>
                  ) : (
                    <div className="drop_box p-5">
                      <h1 className="fs-5">CSV Imported</h1>
                      <p> {impFile?.name} </p>
                      <button className="comman_btn mt-3">
                        Generate Passwords
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
