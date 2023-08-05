import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCreateOfferMutation } from "../services/Post";
import { useGetOfferListQuery } from "../services/Post";
import { useUpdateOfferMutation } from "../services/Post";
import { useDeleteOfferMutation } from "../services/Post";
import { useSearchOfferMutation } from "../services/Post";
import { increment } from "../app/Slice";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
function OfferManagement() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state?.user?.value);
  const state = useSelector((state) => state.user);
  // const { value, offerList, productName, productName2, title, title2, title3, startDate, endDate, code, code2, discount, discount2, itemId } = state;
  console.log("count", count);
  const [createOffer, responseInfo] = useCreateOfferMutation();
  const [updateOffer] = useUpdateOfferMutation();
  const [searchOffer, res] = useSearchOfferMutation();
  console.log("useSearchOfferMutation", res);
  const offerListItems = useGetOfferListQuery();
  const [offerList, setOfferList] = useState([]);
  const [productName, setProductName] = useState("");
  const [productName2, setProductName2] = useState("");
  const [title, setTitle] = useState("");
  const [title2, setTitle2] = useState("");
  const [title3, setTitle3] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [code, setCode] = useState("");
  const [code2, setCode2] = useState("");
  const [discount, setDiscount] = useState("");
  const [discount2, setDiscount2] = useState("");
  const [itemId, setItemId] = useState("");
  console.log("offer id", itemId);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState({
    nameEn: "",
    nameAr: "",
    categoryId: "",
    subCategoryId: "",
    subCategoryPic: null,
  });
  const [deleteOffer, response] = useDeleteOfferMutation();
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  useEffect(() => {
    setOfferList(offerListItems?.data?.results?.list ?? []);
  }, [offerListItems]);

  useEffect(() => {
    if (responseInfo.isSuccess) {
      offerListItems.refetch();
    }
  }, [responseInfo.isSuccess]);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const newOffer = {
      title: title,
      code: code,
      Discount: discount,
      product_Id: "6482bea984e5342a120adbde",
      // productName: productName,
    };
    createOffer(newOffer);
    Swal.fire({
      title: "Changes Saved",
      text: "The offer has been created successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  useEffect(() => {
    handleSaveChanges2();
  }, [title3]);

  const handleSaveChanges2 = async (e) => {
    // e.preventDefault();
    const newOffer = {
      title: title3,
    };
    try {
      const response = await searchOffer(newOffer);
      console.log("response", response);
      if (response?.data?.results?.offerData) {
        setOfferList(response?.data?.results?.offerData);
        console.log(
          "response?.data?.results?.offerData",
          response?.data?.results?.offerData
        );
      } else {
        setOfferList([]);
        Swal.fire({
          title: "No Results",
          text: "No offers found for the given search criteria.",
          icon: "info",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
            window.location.reload();
          }
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleSaveChanges1 = async (e) => {
    e.preventDefault();
    console.log("handleSaveChanges1", itemId);
    const editOffer = {
      id: itemId,
      title: title,
      code: code,
      Discount: discount,
    };
    try {
      await updateOffer(editOffer);
      Swal.fire({
        title: "Changes Saved",
        text: "The offer has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {}
  };
  const handleItem = (item) => {
    setProductName2(item?.product_Id?.productName_en || "");
    setTitle2(item?.title || "");
    setCode2(item?.code || "");
    setDiscount2(item?.Discount || "");
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubCategory({ ...subCategory, [name]: value });
  };
  useEffect(() => {
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/productList"
      )
      .then((response) => {
        setCategories(response?.data?.results?.list.reverse());
        console.log(response.data);
      });
  }, []);
  const userList = async () => {
    const { data } = await axios.post(
      "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/offer/offer-list",
      {
        from: startDate,
        to: endDate,
      }
    );
    setOfferList(data?.results?.list);
    console.log(data);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    userList();
  };

  return (
    <>
      <Sidebar Dash={"offers"} />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row offer-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman mb-4 shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2
                        // onClick={() => dispatch(increment())}
                        >
                          Add New Offer
                          {/* <span>{count} */}
                          {/* </span> */}
                        </h2>
                      </div>
                    </div>
                    <form
                      className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                      action=""
                      onSubmit={handleSaveChanges}
                    >
                      {/* <div className="form-group col-6">
                        <label htmlFor="">Product Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="productName"
                          id="productName"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </div> */}
                      <div className="form-group col-6">
                        <label htmlFor="">Select Product</label>
                        <select
                          className="select form-control"
                          size={15}
                          name="categoryId"
                          id="selectCategory"
                          value={subCategory.categoryId}
                          onChange={handleInputChange}
                        >
                          {Array.isArray(categories) &&
                            categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.productName_en}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="">
                          Title
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group mb-0 col">
                        <label htmlFor="">
                          Code
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="code"
                          id="code"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group mb-0 col">
                        <label htmlFor="">
                          Discount
                          <span className="required-field text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="discount"
                          id="discount"
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                          required
                          minLength="3"
                        />
                      </div>
                      <div className="form-group mb-0 col-auto">
                        <button
                          className="comman_btn2"
                          // onClick={handleSaveChanges}
                        >
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 design_outter_comman mb-4 shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>Offers List</h2>
                      </div>
                      <div className="col-3">
                        <form
                          className="form-design"
                          action=""
                          onSubmit={handleSaveChanges2}
                        >
                          <div className="form-group mb-0 position-relative icons_set">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search"
                              name="name"
                              id="name"
                              value={title3}
                              onChange={(e) => setTitle3(e.target.value)}
                            />
                            <i
                              className="far fa-search"
                              onClick={handleSaveChanges2}
                            />
                          </div>
                        </form>
                      </div>
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
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-0 col-5">
                        <label htmlFor="">To</label>
                        <input
                          type="date"
                          className="form-control"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-0 col-auto">
                        <button className="comman_btn2">Search</button>
                      </div>
                    </form>
                    <div className="row">
                      <div className="col-12 comman_table_design px-0">
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Product Name</th>
                                <th>Title</th>
                                <th>Code</th>
                                <th>Discount</th>
                                {/* <th>Status</th> */}
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {offerList
                                ?.slice()
                                .reverse()
                                ?.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td> {index + 1} </td>
                                      <td>
                                        {" "}
                                        {item?.product_Id?.productName_en}{" "}
                                      </td>
                                      <td> {item?.title} </td>
                                      <td> {item?.code} </td>
                                      <td> {item?.Discount} </td>
                                      {/* <td>
                                        <form className="table_btns d-flex align-items-center">
                                          <div className="check_toggle">
                                            <input
                                              data-bs-toggle="modal"
                                              data-bs-target="#staticBackdrop"
                                              type="checkbox"
                                              defaultChecked=""
                                              name="check1"
                                              id="check1"
                                              className="d-none"
                                            />
                                            <label htmlFor="check1" />
                                          </div>
                                        </form>
                                      </td> */}
                                      <td>
                                        <Link
                                          className="comman_btn table_viewbtn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#edittoffer"
                                          to="#"
                                          onClick={() => {
                                            handleItem(item);
                                            setItemId(item?._id);
                                          }}
                                        >
                                          Edit
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
                                                deleteOffer(item?._id);
                                                Swal.fire(
                                                  "Deleted!",
                                                  `${item?.title}  item has been deleted.`,
                                                  "success"
                                                ).then(() => {
                                                  window.location.reload();
                                                });
                                              }
                                            });
                                          }}
                                        >
                                          Delete
                                        </Link>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
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
                  <Link className="comman_btn mx-2" to="#">
                    Yes
                  </Link>
                  <Link className="comman_btn2 mx-2 bg-red" to="#">
                    NO
                  </Link>
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
              <form
                className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                action=""
                onSubmit={handleSaveChanges1}
              >
                {/* <div className="form-group col-6">
                  <label htmlFor="">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    // value={productName}
                    defaultValue={productName2}
                    onChange={(e) => setProductName(e.target.value)}
                    name="name"
                    id="name"
                  />
                </div> */}
                <div className="form-group col-12">
                  <label htmlFor="">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    // value={title}
                    defaultValue={title2}
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    id="title"
                  />
                </div>
                <div className="form-group mb-0 col">
                  <label htmlFor="">Code</label>
                  <input
                    type="text"
                    className="form-control"
                    // value={code}
                    defaultValue={code2}
                    onChange={(e) => setCode(e.target.value)}
                    name="code"
                    id="code"
                  />
                </div>
                <div className="form-group mb-0 col">
                  <label htmlFor="">Discount</label>
                  <input
                    type="text"
                    className="form-control"
                    // value={discount}
                    defaultValue={discount2}
                    onChange={(e) => setDiscount(e.target.value)}
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group mb-0 col-auto">
                  <button className="comman_btn2">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OfferManagement;
