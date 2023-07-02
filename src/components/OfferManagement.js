import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useCreateOfferMutation } from "../services/Post";
import { useGetOfferListQuery } from "../services/Post";
import { useUpdateOfferMutation } from "../services/Post";
import { useDeleteOfferMutation } from "../services/Post";
import { useSearchOfferMutation } from "../services/Post";
import Sidebar from "./Sidebar";
function OfferManagement() {
  const [createOffer, responseInfo] = useCreateOfferMutation();
  const [updateOffer] = useUpdateOfferMutation();
  // const [deleteOffer, response] = useDeleteOfferMutation();
  const [searchOffer] = useSearchOfferMutation();
  const offerListItems = useGetOfferListQuery();
  const [productName, setProductName] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [itemId, setItemId] = useState("");
  const [deleteOffer, response] = useDeleteOfferMutation();

  const handleDeleteOffer = async (offerId) => {
    try {
      await deleteOffer(offerId);
      offerListItems.refetch();
      Swal.fire({
        title: "Offer Deleted",
        text: "The offer has been deleted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      // Handle error if necessary
    }
  };
  useEffect(() => {
    if (responseInfo.isSuccess) {
      offerListItems.refetch();
      Swal.fire({
        title: "Offer list updated!",
        text: "The offer has been Updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
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
  const handleSaveChanges2 = (e) => {
    e.preventDefault();
    const newOffer = {
      title: title,
    };
    searchOffer(newOffer);
  };
  // const handleSaveChanges1 = (e) => {
  //   e.preventDefault();
  //   console.log("handleSaveChanges1", itemId);
  //   const editOffer = {
  //     id: itemId,
  //     title: title,
  //     code: code,
  //     Discount: discount,
  //     // productName: productName,
  //     product_Id: "6482bea984e5342a120adbde",
  //   };
  //   updateOffer(editOffer);
  // };
  const handleSaveChanges1 = async (e) => {
    e.preventDefault();
    console.log("handleSaveChanges1", itemId);
    const editOffer = {
      id: itemId,
      title: title,
      code: code,
      Discount: discount,
      product_Id: "6482bea984e5342a120adbde",
    };
    try {
      await updateOffer(editOffer);
      offerListItems.refetch();
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
  
  return (
    <>
      <Sidebar />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row offer-management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman mb-4 shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>Add New Offer</h2>
                      </div>
                    </div>
                    <form
                      className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                      action=""
                    >
                      <div className="form-group col-6">
                        <label htmlFor="">Product Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="productName"
                          id="productName"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-0 col">
                        <label htmlFor="">Code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="code"
                          id="code"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-0 col">
                        <label htmlFor="">Discount</label>
                        <input
                          type="text"
                          className="form-control"
                          name="discount"
                          id="discount"
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-0 col-auto">
                        <button
                          className="comman_btn2"
                          onClick={handleSaveChanges}
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
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                            <i className="far fa-search" />
                          </div>
                        </form>
                      </div>
                    </div>
                    <form
                      className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                      action=""
                      onSubmit={handleSaveChanges2}
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
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {offerListItems?.data?.results?.list
                                ?.slice()
                                .reverse()
                                ?.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td> {index + 1} </td>
                                      <td> {item?.product_Id?.productName} </td>
                                      <td> {item?.title} </td>
                                      <td> {item?.code} </td>
                                      <td> {item?.Discount} </td>
                                      <td>
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
                                      </td>
                                      <td>
                                        <Link
                                          className="comman_btn table_viewbtn"
                                          data-bs-toggle="modal"
                                          data-bs-target="#edittoffer"
                                          to="#"
                                          onClick={() => setItemId(item?._id)}
                                        >
                                          Edit
                                        </Link>
                                        <Link
                                          className="comman_btn2 table_viewbtn ms-2"
                                          to="#"
                                          onClick={() => {
                                            handleDeleteOffer(item?._id);
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
              >
                <div className="form-group col-6">
                  <label htmlFor="">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
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
                    value={code}
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
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    name="name"
                    id="name"
                  />
                </div>
                <div className="form-group mb-0 col-auto">
                  <button className="comman_btn2" onClick={handleSaveChanges1}>
                    Add
                  </button>
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
