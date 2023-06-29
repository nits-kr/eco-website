import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "./Sidebar";
function Login() {
    const userLogin = async (userEmail, password) => {
        const { data } = await axios.post("http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/user/login", {
            userEmail: userEmail,
            password: password,
        });
        console.log(data);
        if (data) {
            localStorage.removeItem("token");
            localStorage.setItem("token", data.results.token);
            Swal.fire({
                title: "Logged In!",
                text: "Your have been Logged In successfully.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    //window.location.reload(); // refresh the page after success message is closed
                    window.location.href = "/";
                }
            });
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const userEmail = document.getElementById("userEmail").value;
        const password = document.getElementById("password").value;
        userLogin(userEmail, password);
    };
    return (
        <>
        {/* <Sidebar/> */}
            <section className="login_page">
                <div className="container-fluid px-0">
                    <div className="row justify-content-start">
                        <div className="col-4">
                            <div className="login_page_form shadow">
                                <div className="row">
                                    <div className="col-12 formheader mb-4">
                                        <div className="text-center">
                                            <img src="assets/img/logo.png" alt="" />
                                        </div>
                                        <h1>Login for Admin Panel</h1>
                                        <p>Please enter your email and password</p>
                                    </div>
                                    <div className="col-12">
                                        <form className="row form-design" onSubmit={handleSubmit}>
                                            <div className="form-group col-12">
                                                <label htmlFor="userEmail">User Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="User@gmail.com"
                                                    name="userEmail"
                                                    id="userEmail"
                                                />
                                            </div>
                                            <div className="form-group col-12">
                                                <label htmlFor="password">Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="**********"
                                                    name="password"
                                                    id="password"
                                                />
                                            </div>
                                            <div className="form-group col-12">
                                                <Link className="for_got" to="/forget-password">
                                                    Forgot Password?
                                                </Link>
                                            </div>
                                            <Link to="/dashboard">
                                            <div className="form-group col-12">
                                                <button type="submit" className="comman_btn">
                                                    Submit
                                                </button>
                                            </div>
                                            </Link>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
