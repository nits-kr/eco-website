import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
//import { useHistory } from 'react-router-dom';
import VerificationModal from "./VerificationModal";
import Sidebar from "./Sidebar";
function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("Nc@1234");
  const [newPassword, setNewPassword] = useState("Nc@1234");
  const [confirmPassword, setConfirmPassword] = useState("Nc@1234");
  const [errorMessage, setErrorMessage] = useState("");
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const handleOldPassword = (event) => {
    setOldPassword(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  //const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/user/reset-password/64630e21b12d35894a9bbe0c/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDYzMGUyMWIxMmQzNTg5NGE5YmJlMGMiLCJpYXQiOjE2ODQ0NzYzODMsImV4cCI6MTY4NDczNTU4M30.oUvDW8VaMBRKlwTJR5uG35q_VQbJffq_e464EA-M9iM",
        {
          password: newPassword,
          confirmPassword: confirmPassword,
        }
      );
      setErrorMessage("");
      Swal.fire({
        title: "Password Changed!",
        text: "Your password has been changed successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/verificationModal";
          //history.push("/verificationModal");
        }
      });
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <>
    <Sidebar/>
      <div className="admin_main" id="verificationModalBtn">
        <div className="admin_main_inner">
          <div className="admin_panel_data height_adjust">
            <div className="row">
              <div className="col-12 editprofile design_outter_comman shadow">
                <div className="row comman_header justify-content-between">
                  <div className="col-auto">
                    <h2>Change Password</h2>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <form
                      className="row form-design justify-content-center position-relative mx-0 p-4"
                      onSubmit={handleSubmit}
                    >
                      <div className="form-group col-12">
                        <label htmlFor="">Old Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={oldPassword}
                          onChange={handleOldPassword}
                          name="oldPassword"
                          id="oldPassword"
                        />
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor="">New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={newPassword}
                          onChange={handlePasswordChange}
                          name="newPassword"
                          id="newPassword"
                        />
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor="">Confirm New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          name="confirmPassword"
                          id="confirmPassword"
                        />
                      </div>
                      {errorMessage && (
                        <div className="form-group col-12">
                          <p className="text-danger">{errorMessage}</p>
                        </div>
                      )}
                      <div className="form-group col-12 text-center">
                        <button type="submit" className="comman_btn" id="verificationModalBtn">
                          Save
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

      {/* <!-- Modal --> */}
      <VerificationModal />
    </>
  );
}

export default ChangePassword;
