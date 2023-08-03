import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
function ThoughtsManagement() {
  const [thoughts, setThoughts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate1, setStartDate1] = useState("");
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");

  const userList2 = async () => {
    if (!startDate1) return;
    try {
      const { data } = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/thougth/thougth/list",
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
        Swal.fire({
          title: "No List Found",
          text: "No list is available for the selected date.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
      setThoughts(filteredUsers);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  useEffect(() => {
    userList2();
  }, [startDate1]);

  useEffect(() => {
    userList();
  }, []);
  const userList = async () => {
    const { data } = await axios.post(
      "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/thougth/thougth/list"
    );
    setThoughts(data.results.list);
    console.log(data);
  };
  const handleSearch1 = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/thougth/thougth/thougthSearch",
          {
            title: searchQuery,
          }
        );
        const { error, results } = response.data;
        if (error) {
          throw new Error("Error searching for products.Data are Not Found");
        } else {
          setThoughts(results.searchData);
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      setThoughts([]);
    }
  };

  return (
    <>
      <Sidebar Dash={"thoughts-management"}/>
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
                          Thoughts Management <span>({thoughts?.length})</span>
                        </h2>
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
                            <i className="far fa-search"></i>
                          </div>
                        </form>
                      </div>
                      <div className="col-auto">
                        <input
                          type="date"
                          className="custom_date"
                          value={startDate1}
                          onChange={(e) => setStartDate1(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row p-4">
                      <div className="col-12">
                        <div className="category_btns_main">
                          {thoughts?.map((thought) => (
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
                                  <span className="">
                                    {thought?.createdAt?.slice(0, 10)}
                                  </span>
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
