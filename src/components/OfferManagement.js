import React from "react";
import { Link } from "react-router-dom";
function OfferManagement() {
  return (
    <>
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
                          defaultValue=""
                          name="name"
                          id="name"
                        />
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                          name="name"
                          id="name"
                        />
                      </div>
                      <div className="form-group mb-0 col">
                        <label htmlFor="">Code</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                          name="name"
                          id="name"
                        />
                      </div>
                      <div className="form-group mb-0 col">
                        <label htmlFor="">Discount</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                          name="name"
                          id="name"
                        />
                      </div>
                      <div className="form-group mb-0 col-auto">
                        <button className="comman_btn2">Add</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-12 design_outter_comman mb-4 shadow">
                    <div className="row comman_header justify-content-between">
                      <div className="col">
                        <h2>Offers List</h2>
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
                            />
                            <i className="far fa-search" />
                          </div>
                        </form>
                      </div>
                    </div>
                    <form
                      className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                      action=""
                    >
                      <div className="form-group mb-0 col-5">
                        <label htmlFor="">From</label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="form-group mb-0 col-5">
                        <label htmlFor="">To</label>
                        <input type="date" className="form-control" />
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
                              <tr>
                                <td>1</td>
                                <td>Oneplus Nord</td>
                                <td>10% Off</td>
                                <td>1234234</td>
                                <td>10%</td>
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
                                  <a
                                    className="comman_btn table_viewbtn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edittoffer"
                                    href="javascript:;"
                                  >
                                    Edit
                                  </a>
                                  <a
                                    className="comman_btn2 table_viewbtn"
                                    href="javascript:;"
                                  >
                                    Delete
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>Oneplus Nord</td>
                                <td>10% Off</td>
                                <td>1234234</td>
                                <td>10%</td>
                                <td>
                                  <form className="table_btns d-flex align-items-center">
                                    <div className="check_toggle">
                                      <input
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        type="checkbox"
                                        defaultChecked=""
                                        name="check2"
                                        id="check2"
                                        className="d-none"
                                      />
                                      <label htmlFor="check2" />
                                    </div>
                                  </form>
                                </td>
                                <td>
                                  <a
                                    className="comman_btn table_viewbtn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edittoffer"
                                    href="javascript:;"
                                  >
                                    Edit
                                  </a>
                                  <a
                                    className="comman_btn2 table_viewbtn"
                                    href="javascript:;"
                                  >
                                    Delete
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>Oneplus Nord</td>
                                <td>10% Off</td>
                                <td>1234234</td>
                                <td>10%</td>
                                <td>
                                  <form className="table_btns d-flex align-items-center">
                                    <div className="check_toggle">
                                      <input
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        type="checkbox"
                                        defaultChecked=""
                                        name="check3"
                                        id="check3"
                                        className="d-none"
                                      />
                                      <label htmlFor="check3" />
                                    </div>
                                  </form>
                                </td>
                                <td>
                                  <a
                                    className="comman_btn table_viewbtn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edittoffer"
                                    href="javascript:;"
                                  >
                                    Edit
                                  </a>
                                  <a
                                    className="comman_btn2 table_viewbtn"
                                    href="javascript:;"
                                  >
                                    Delete
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>Oneplus Nord</td>
                                <td>10% Off</td>
                                <td>1234234</td>
                                <td>10%</td>
                                <td>
                                  <form className="table_btns d-flex align-items-center">
                                    <div className="check_toggle">
                                      <input
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        type="checkbox"
                                        defaultChecked=""
                                        name="check4"
                                        id="check4"
                                        className="d-none"
                                      />
                                      <label htmlFor="check4" />
                                    </div>
                                  </form>
                                </td>
                                <td>
                                  <a
                                    className="comman_btn table_viewbtn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edittoffer"
                                    href="javascript:;"
                                  >
                                    Edit
                                  </a>
                                  <a
                                    className="comman_btn2 table_viewbtn"
                                    href="javascript:;"
                                  >
                                    Delete
                                  </a>
                                </td>
                              </tr>
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
              <form
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OfferManagement;
