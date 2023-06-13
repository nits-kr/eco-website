import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
function ThoughtsManagement() {
    const [thoughts, setThoughts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    axios.defaults.headers.common["x-auth-token-user"] =
        localStorage.getItem("token");

    useEffect(() => {
        userList();
    }, []);
    const userList = async () => {
        const { data } = await axios.post(
            "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/thougth/thougth/list");
        setThoughts(data.results.list);
        console.log(data);
    };
    const handleSearch1 = async (e) => {
        e.preventDefault();
        if (searchQuery) {
            try {
                const response = await axios.post('http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/thougth/thougth/thougthSearch', {
                    title: searchQuery
                });
                const { error, results } = response.data;
                if (error) {
                    throw new Error('Error searching for products.Data are Not Found');
                } else {
                    setThoughts(results.coupanData);
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            setThoughts([]);
        }
    };

    return (
        <>
            <div className="admin_main">
                <div className="admin_main_inner">
                    <div className="admin_panel_data height_adjust">
                        <div className="row transaction-management justify-content-center">
                            <div className="col-12">
                                <div className="row mx-0">
                                    <div className="col-12 design_outter_comman shadow">
                                        <div className="row comman_header justify-content-between">
                                            <div className="col">
                                                <h2>
                                                    Thoughts Management <span>(33)</span>
                                                </h2>
                                            </div>
                                            <div className="col-3">
                                                <form className="form-design" action="" onSubmit={handleSearch1}>
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
                                                        <i className="far fa-search"></i>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-auto">
                                                <input type="date" className="custom_date" />
                                            </div>
                                        </div>
                                        <div className="row p-4">
                                            <div className="col-12">
                                                <div className="category_btns_main">
                                                    {thoughts.map((thought) => (
                                                        <div
                                                            className="row mx-0 notification-box shadow mb-4"
                                                            key={thought._id}
                                                        >
                                                            <div className="col-2">
                                                                <div className="notification_icon notification-imgg">
                                                                    <div>
                                                                        <img
                                                                            src="assets/img/profile_img1.jpg"
                                                                            alt=""
                                                                        />
                                                                        <strong>
                                                                            <Link to="/userDetails">Ajay Sharma</Link>
                                                                        </strong>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="notification-box-content">
                                                                    <h2>{thought.title}</h2>
                                                                    <span className="">{thought.createdAt}</span>
                                                                    <p>{thought.description}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
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

export default ThoughtsManagement;
