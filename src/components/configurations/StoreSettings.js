import React, { useState } from "react";
import Sidebar from "../Sidebar";
import CustomSwitch from "../switch/CustomSwitch";

function StoreSettings() {
  const [showAddButton, setShowAddButton] = useState(true);
  const [commissionSwitchChecked, setCommissionSwitchChecked] = useState(false);

  const handleCommissionSwitchChange = (isChecked) => {
    setCommissionSwitchChecked(isChecked);
  };
  const handleClick = () => {
    setShowAddButton(false);
  };
  const handleClick2 = () => {
    setShowAddButton(true);
  };
  return (
    <>
      <Sidebar />
      <div className="admin_main">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row offer-management justify-content-center">
              <div className="col-12">
                <div className="row">
                  <div className="col-12 text-center mb-4">
                    <button
                      className="comman_btn2 w-100"
                      style={{ backgroundColor: "#f1b44c", border: "none" }}
                    >
                      Notifications are disabled. You might miss some incoming
                      ordersenable notifications.
                    </button>
                  </div>
                  <div className="col-12">
                    <div className="row me-0">
                      <div className="col-12 design_outter_comman mb-4 shadow">
                        <div className="row comman_header justify-content-between">
                          <div className="col">
                            <h2>Basic Informations</h2>
                          </div>
                        </div>
                        <form
                          className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                          action=""
                        >
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>General Settings</strong>{" "}
                            </label>
                            <div className="" style={{ fontSize: "14px" }}>
                              To Set the global parameters based on your nature
                              of business and Country Region for your Online
                              Business.
                            </div>
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>Store Name</strong>{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue=""
                              name="name"
                              id="name"
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">Country</label>
                            {/* <form
                              className="form-design py-3 px-2 help-support-form row align-items-end justify-content-between"
                              action=""
                            > */}
                            <select
                              className="select form-control form-select"
                              aria-label="Floating label select example"
                              multiple=""
                              name=""
                              id="floatingSelect1"
                            >
                              <option value="India">Choose Your Country</option>
                              <option value="United kindom">
                                United Kingdom
                              </option>
                              <option value="Unitedstates">
                                United States
                              </option>
                              <option value="France">France</option>
                              <option value="china">China</option>
                              <option value="Spain">Spain</option>
                              <option value="Italy">Italy</option>
                              <option value="Turkey">Turkey</option>
                              <option value="Germany">Germany</option>
                              <option value="Russian Federation">
                                Russian Federation
                              </option>
                              <option value="Malaysia">Malaysia</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Austria">Austria</option>
                              <option value="Hong Kong SAR, China">
                                Hong Kong SAR, China
                              </option>
                              <option value="Ukraine">Ukraine</option>
                              <option value="Thailand">Thailand</option>
                              <option value="Saudi Arabia">Saudi Arabia</option>
                              <option value="Canada">Canada</option>
                              <option value="Singapore">Singapore</option>
                            </select>
                            {/* </form> */}
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>Country/Timezone</strong>{" "}
                            </label>
                            <div className="" style={{ fontSize: "14px" }}>
                              Choose the country and UTC Time Zone where you
                              going to operate your business.
                            </div>
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>Address</strong>{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue=""
                              name="name"
                              id="name"
                              placeholder="Type Address..."
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">Time Zone</label>
                            {/* <form
                              className="form-design py-3 px-2 help-support-form row align-items-end justify-content-between"
                              action=""
                            > */}
                            <select
                              className="select form-control form-select"
                              aria-label="Floating label select example"
                              multiple=""
                              name=""
                              id="floatingSelect1"
                            >
                              <option value="India">
                                Choose Your Time Zone
                              </option>
                              <option value="United kindom">
                                United Kingdom
                              </option>
                              <option value="Unitedstates">
                                United States
                              </option>
                              <option value="France">France</option>
                              <option value="china">China</option>
                              <option value="Spain">Spain</option>
                              <option value="Italy">Italy</option>
                              <option value="Turkey">Turkey</option>
                              <option value="Germany">Germany</option>
                              <option value="Russian Federation">
                                Russian Federation
                              </option>
                              <option value="Malaysia">Malaysia</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Austria">Austria</option>
                              <option value="Hong Kong SAR, China">
                                Hong Kong SAR, China
                              </option>
                              <option value="Ukraine">Ukraine</option>
                              <option value="Thailand">Thailand</option>
                              <option value="Saudi Arabia">Saudi Arabia</option>
                              <option value="Canada">Canada</option>
                              <option value="Singapore">Singapore</option>
                            </select>
                            {/* </form> */}
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>Delivery Multistore type</strong>{" "}
                            </label>
                            <div className="" style={{ fontSize: "14px" }}>
                              Mark this as Active if you have multiple store
                              location for order pickup.
                            </div>
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">Currency</label>
                            {/* <form
                              className="form-design py-3 px-2 help-support-form row align-items-end justify-content-between"
                              action=""
                            > */}
                            <select
                              className="select form-control form-select"
                              aria-label="Floating label select example"
                              multiple=""
                              name=""
                              id="floatingSelect1"
                            >
                              <option value="India">
                                Choose Your Currency
                              </option>
                              <option value="United kindom">
                                United Kingdom
                              </option>
                              <option value="Unitedstates">
                                United States
                              </option>
                              <option value="France">France</option>
                              <option value="china">China</option>
                              <option value="Spain">Spain</option>
                              <option value="Italy">Italy</option>
                              <option value="Turkey">Turkey</option>
                              <option value="Germany">Germany</option>
                              <option value="Russian Federation">
                                Russian Federation
                              </option>
                              <option value="Malaysia">Malaysia</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Austria">Austria</option>
                              <option value="Hong Kong SAR, China">
                                Hong Kong SAR, China
                              </option>
                              <option value="Ukraine">Ukraine</option>
                              <option value="Thailand">Thailand</option>
                              <option value="Saudi Arabia">Saudi Arabia</option>
                              <option value="Canada">Canada</option>
                              <option value="Singapore">Singapore</option>
                            </select>
                            {/* </form> */}
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">Language</label>
                            {/* <form
                              className="form-design py-3 px-2 help-support-form row align-items-end justify-content-between"
                              action=""
                            > */}
                            <select
                              className="select form-control form-select"
                              aria-label="Floating label select example"
                              multiple=""
                              name=""
                              id="floatingSelect1"
                            >
                              <option value="India">
                                Choose Your Language
                              </option>
                              <option value="United kindom">
                                United Kingdom
                              </option>
                              <option value="Unitedstates">
                                United States
                              </option>
                              <option value="France">France</option>
                              <option value="china">China</option>
                              <option value="Spain">Spain</option>
                              <option value="Italy">Italy</option>
                              <option value="Turkey">Turkey</option>
                              <option value="Germany">Germany</option>
                              <option value="Russian Federation">
                                Russian Federation
                              </option>
                              <option value="Malaysia">Malaysia</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Austria">Austria</option>
                              <option value="Hong Kong SAR, China">
                                Hong Kong SAR, China
                              </option>
                              <option value="Ukraine">Ukraine</option>
                              <option value="Thailand">Thailand</option>
                              <option value="Saudi Arabia">Saudi Arabia</option>
                              <option value="Canada">Canada</option>
                              <option value="Singapore">Singapore</option>
                            </select>
                            {/* </form> */}
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>Currency</strong>{" "}
                            </label>
                            <div className="" style={{ fontSize: "14px" }}>
                              Choose your default Currency for all the payments
                              & transactions.
                            </div>
                          </div>
                          <div className="form-group col-4">
                            {/* <label htmlFor="">
                              {" "}
                              <strong>Distance Unit</strong>{" "}
                            </label> */}
                            <CustomSwitch
                              label="Distance Unit"
                              onContent="MILES"
                              offContent="KM"
                            />
                          </div>
                          <div className="form-group col-4">
                            {/* <label htmlFor="">Remove Branding</label> */}
                            <CustomSwitch
                              label="Remove Branding"
                              onContent="YES"
                              offContent="NO"
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>Language</strong>{" "}
                            </label>
                            <div className="" style={{ fontSize: "14px" }}>
                              Set your default Language your all the users will
                              have the application interface in this language.
                            </div>
                          </div>
                          <div className="form-group col-4">
                            {/* <label htmlFor="">
                              {" "}
                              <strong>
                                Allow Vendor To Auto Accept Order
                              </strong>{" "}
                            </label> */}
                            <CustomSwitch
                              label="Allow Vendor To Auto Accept Order"
                              onContent="YES"
                              offContent="NO"
                            />
                          </div>
                          <div className="form-group col-4">
                            <CustomSwitch
                              label="Allow Vendor To Auto Cancel Order"
                              onContent="YES"
                              offContent="NO"
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>Distance Unit</strong>{" "}
                            </label>
                            <div className="" style={{ fontSize: "14px" }}>
                              What's your Distance Measurement Unit for the
                              rides/trips & deliveries choose from KM/Miles.
                            </div>
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>
                                Cash on Delivery Wallet Limit
                              </strong>{" "}
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              defaultValue=""
                              name="name"
                              id="name"
                              placeholder="0"
                            />
                            <div
                              className="text-secondary"
                              style={{ fontSize: "12px" }}
                            >
                              Cash on Delivery Wallet Balance Limit For Delivery
                              Boy
                            </div>
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong></strong>{" "}
                            </label>
                            {/* <input
                              type="text"
                              className="form-control"
                              defaultValue=""
                              name="name"
                              id="name"
                            />
                            <div className="text-secondary" style={{fontSize:"12px"}}>
                              Cash on Delivery Wallet Balance Limit For Delivery
                              Boy
                            </div> */}
                          </div>

                          <hr
                            style={{
                              borderTop: "1px solid #6c757d",
                              margin: "10px 0",
                            }}
                          />
                          <h5>
                            <strong>Payment Method</strong>{" "}
                          </h5>
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>Payment Mode</strong>{" "}
                            </label>

                            <div className="" style={{ fontSize: "14px" }}>
                              Toggle your online payments from Test mode to Live
                              mode.
                            </div>
                          </div>
                          <div className="form-group col-4">
                            {/* <label htmlFor="">
                              {" "}
                              <strong>Payment Mode</strong>{" "}
                            </label> */}
                            <CustomSwitch
                              label="Payment Mode"
                              onContent="sandbox"
                              offContent="stripe"
                            />
                            {/* <input
                              type="text"
                              className="form-control"
                              defaultValue=""
                              name="name"
                              id="name"
                            /> */}
                          </div>
                          <div className="form-group col-4"></div>

                          <hr
                            style={{
                              borderTop: "1px solid #6c757d",
                              margin: "10px 0",
                            }}
                          />

                          <h5>
                            <strong>App Url</strong>{" "}
                          </h5>
                          <div className="form-group col-4">
                            <label
                              className="text-secondary"
                              style={{ fontSize: "14px" }}
                            >
                              {" "}
                              These URL will be published on store to allow
                              customers to download and install the App in their
                              phones.
                            </label>
                            {/* <div className="" style={{ fontSize: "14px" }}>
                              These URL will be published on store to allow
                              customers to download and install the App in their
                              phones.
                            </div> */}
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>Customer App Url (Android)</strong>{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue=""
                              name="name"
                              id="name"
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>Driver App Url (Android) :</strong>{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue=""
                              name="name"
                              id="name"
                            />
                          </div>

                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>Customer App Url (Android)</strong>{" "}
                            </label>
                            <div className="" style={{ fontSize: "14px" }}>
                              Your Google Play Store link for Customer App.
                            </div>
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>Customer App Url(IOS):</strong>{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue=""
                              name="name"
                              id="name"
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>Driver App Url (IOS) :</strong>{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue=""
                              name="name"
                              id="name"
                            />
                          </div>

                          <hr
                            style={{
                              borderTop: "1px solid #6c757d",
                              margin: "10px 0",
                            }}
                          />

                          <div className="form-group col-4">
                            <h5>
                              <strong>Social Media</strong>{" "}
                            </h5>
                            <div className="" style={{ fontSize: "14px" }}>
                              Connect your customers with you social media
                              accounts also.
                            </div>
                          </div>
                          <div className="form-group col-4">
                            <p>Social Media Url.</p>
                            <div
                              className=""
                              style={{ fontSize: "14px" }}
                            ></div>
                          </div>
                          <div className="form-group col-4"></div>

                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>Facebook:</strong>{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue=""
                              name="name"
                              id="name"
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>Twitter:</strong>{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue=""
                              name="name"
                              id="name"
                            />
                          </div>
                          <div className="form-group col-4">
                            <label htmlFor="">
                              {" "}
                              <strong>Instagram:</strong>{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue=""
                              name="name"
                              id="name"
                            />
                          </div>

                          <hr
                            style={{
                              borderTop: "1px solid #6c757d",
                              margin: "10px 0",
                            }}
                          />
                          <div className="row comman_header justify-content-between">
                            <div className="col">
                              <h2>Social Media Login/Signup</h2>
                            </div>
                            <div>
                              Add your keys for social media login/sign up for
                              customer website/app.
                            </div>
                          </div>
                          <form
                            className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                            action=""
                          >
                            <div className="form-group col-4">
                              {/* <label htmlFor="">FACEBOOK</label> */}
                              <CustomSwitch
                                label="FACEBOOK"
                                onContent="ON"
                                offContent="OFF"
                              />
                            </div>
                            <div className="form-group col-4">
                              {/* <label htmlFor="">GOOGLE</label> */}
                              <CustomSwitch
                                label="GOOGLE"
                                onContent="ON"
                                offContent="OFF"
                              />
                              {/* <input
                                type="text"
                                className="form-control"
                                defaultValue=""
                                name="name"
                                id="name"
                              /> */}
                            </div>
                            <div className="form-group col-4">
                              {/* <label htmlFor="">APPLE</label> */}
                              <CustomSwitch
                                label="APPLE"
                                onContent="ON"
                                offContent="OFF"
                              />
                              {/* <input
                                type="text"
                                className="form-control"
                                defaultValue=""
                                name="name"
                                id="name"
                              /> */}
                            </div>
                          </form>

                          <hr
                            style={{
                              borderTop: "1px solid #6c757d",
                              margin: "10px 0",
                            }}
                          />

                          <div
                            className="form-group col-3"
                            style={{ marginBlockEnd: "auto" }}
                          >
                            <div className="row">
                              <h5>
                                <strong>App Key</strong>{" "}
                              </h5>
                              <div className="" style={{ fontSize: "14px" }}>
                                Keys is a encrypted alphanumeric value to access
                                the google map services in your mobile Apps.
                              </div>

                              {showAddButton ? (
                                <>
                                  <div
                                    className="mt-2"
                                    style={{ fontSize: "14px" }}
                                  >
                                    <strong className="me-1">
                                      Android Google Maps Key:
                                    </strong>
                                    This will be generated using Google
                                    Developer Account.
                                  </div>
                                  <div
                                    className="mt-2"
                                    style={{ fontSize: "14px" }}
                                  >
                                    <strong className="me-1">
                                      IOS Google Maps Key:
                                    </strong>
                                    This will be generated using App Store/Apple
                                    Developer Account.
                                  </div>
                                  <div
                                    className="mt-2"
                                    style={{ fontSize: "14px" }}
                                  >
                                    <strong className="me-1">
                                      Web Google Maps Key:
                                    </strong>
                                    This will be generated using Google
                                    Developer Account.
                                  </div>
                                  <div
                                    className="mt-2"
                                    style={{ fontSize: "14px" }}
                                  >
                                    <strong className="me-1">
                                      Server Google Maps Key:
                                    </strong>
                                    This will be generated using Google
                                    Developer Account.
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </div>
                          <div
                            className="form-group col-9"
                            style={{ marginBlockEnd: "auto" }}
                          >
                            <div className="row">
                              <div className="col-12 px-0">
                                <nav>
                                  <div
                                    className="nav nav-tabs comman_tabs"
                                    id="nav-tab"
                                    role="tablist"
                                  >
                                    <button
                                      className="nav-link active"
                                      id="nav-home-tab"
                                      data-bs-toggle="tab"
                                      data-bs-target="#nav-home"
                                      type="button"
                                      role="tab"
                                      aria-controls="nav-home"
                                      aria-selected="true"
                                      onClick={(e) => {
                                        handleClick2();
                                      }}
                                    >
                                      Google Maps
                                    </button>
                                    <button
                                      className="nav-link"
                                      id="nav-profile-tab"
                                      data-bs-toggle="tab"
                                      data-bs-target="#nav-profile"
                                      type="button"
                                      role="tab"
                                      aria-controls="nav-profile"
                                      aria-selected="false"
                                      onClick={(e) => {
                                        handleClick();
                                      }}
                                    >
                                      Mailgun
                                    </button>
                                    <button
                                      className="nav-link"
                                      id="nav-contact-tab"
                                      data-bs-toggle="tab"
                                      data-bs-target="#nav-contact"
                                      type="button"
                                      role="tab"
                                      aria-controls="nav-contact"
                                      aria-selected="false"
                                      onClick={(e) => {
                                        handleClick();
                                      }}
                                    >
                                      Twilio
                                    </button>
                                    <button
                                      className="nav-link"
                                      id="nav-firebase-tab"
                                      data-bs-toggle="tab"
                                      data-bs-target="#nav-firebase"
                                      type="button"
                                      role="tab"
                                      aria-controls="nav-firebase"
                                      aria-selected="false"
                                      onClick={(e) => {
                                        handleClick();
                                      }}
                                    >
                                      Firebase
                                    </button>
                                  </div>
                                </nav>
                                <div
                                  className="tab-content"
                                  id="nav-tabContent"
                                >
                                  <div
                                    className="tab-pane fade show active"
                                    id="nav-home"
                                    role="tabpanel"
                                    aria-labelledby="nav-home-tab"
                                  >
                                    <div className="row mx-0 p-4 product_description">
                                      <div className="col-12">
                                        <div className="row">
                                          <div className="form-group col-6">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>
                                                Android Google Maps Key
                                              </strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                          <div className="form-group col-6">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>
                                                IOS Google Maps Key
                                              </strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                          <div className="form-group col-6">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>
                                                Web Google Maps Key
                                              </strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="***********************************UCww"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                          <div className="form-group col-6">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>
                                                Server Google Maps Key
                                              </strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="***********************************cCP8"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="nav-profile"
                                    role="tabpanel"
                                    aria-labelledby="nav-profile-tab"
                                  >
                                    <div className="row mx-0 p-4 product_location">
                                      <div className="col-12">
                                        <div className="row">
                                          <div className="form-group col-4">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>
                                                MAILGUN API KEY
                                              </strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="********************************ccfe"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                          <div className="form-group col-4">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>
                                                MAILGUN DOMAIN
                                              </strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="************reations.com"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                          <div className="form-group col-4">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>MAILGUN FROM</strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="***********************eations.com>"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="nav-contact"
                                    role="tabpanel"
                                    aria-labelledby="nav-contact-tab"
                                  >
                                    <div className="row mx-0 p-4 Comments_main">
                                      <div className="col-12 py-2">
                                        <div className="row">
                                          <div className="form-group col-4">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>Account Sid</strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="*************************2ca"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                          <div className="form-group col-4">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>Auth Token</strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="*************************b797"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                          <div className="form-group col-4">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>Twilio From</strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="********2599"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="tab-pane fade"
                                    id="nav-firebase"
                                    role="tabpanel"
                                    aria-labelledby="nav-firebase-tab"
                                  >
                                    <div className="row mx-0 p-4 Comments_main">
                                      <div className="col-12 py-2">
                                        <div className="row">
                                          <div className="form-group col-4">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>API Key</strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="***********************************YWbM"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                          <div className="form-group col-4">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>Auth Domain</strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="********************.com"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                          <div className="form-group col-4">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>Project Id</strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="****apid"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                          <div className="form-group col-4">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>
                                                Storage Bucket
                                              </strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="****************.com"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                          <div className="form-group col-4">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>
                                                Messaging Sender Id
                                              </strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="********8428"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                          <div className="form-group col-4">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>App Id</strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="*************************************6d69"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                          <div className="form-group col-4">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>
                                                Measurement Id
                                              </strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="********0TWK"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                          <div className="form-group col-4">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>Client Email</strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="****************************************************.com"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                          <div className="form-group col-4">
                                            <label htmlFor="">
                                              {" "}
                                              <strong>Private Key</strong>{" "}
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************----"
                                              defaultValue=""
                                              name="name"
                                              id="name"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <hr
                            style={{
                              borderTop: "1px solid #6c757d",
                              margin: "10px 0",
                            }}
                          />

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              height: "40px",
                            }}
                          >
                            <button
                              type="button"
                              className="comman_btn2 table_viewbtn"
                              style={{ fontSize: "15px" }}
                            >
                              Delete Store
                            </button>
                            <button
                              type="button"
                              className="comman_btn table_viewbtn"
                              style={{ fontSize: "15px" }}
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>
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

export default StoreSettings;
