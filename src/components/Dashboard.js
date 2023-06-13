import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios";
import Swal from "sweetalert2";


function Dashboard() {
    const [userCounts, setUserCounts] = useState(0)
    const [recentOrderList, setRecentOrderList] = useState([])
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    
    axios.defaults.headers.common["x-auth-token-user"] =
        localStorage.getItem("token");
    useEffect(() => {
        axios.post("http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/dashboards/count/userCount")
            .then(response => {
                setUserCounts(response.data.results)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        axios
          .post("http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/agent/agent/order-list", {
            startDate,
            endDate,
          })
          .then((response) => {
            const filteredData = response.data.results.orderList.filter(
              (data) =>
                new Date(data.createdAt) >= new Date(startDate) &&
                new Date(data.createdAt) <= new Date(endDate)
            );
            setRecentOrderList(filteredData.reverse());
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      };
      const handleSearch1 = async (e) => {
        e.preventDefault();
        if (searchQuery) {
            try {
                const response = await axios.post('http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/dashboards/count/search', {
                    sellerName: searchQuery
                });
                const { error, results } = response.data;
                if (error) {
                    throw new Error('Error searching for products.Data are Not Found');
                } else {
                    setRecentOrderList(results.searchData);
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
            setRecentOrderList([]);
        }
    };
    return (
        <>
            <div className="admin_main">
                <div className="admin_main_inner">
                    <div className="admin_panel_data height_adjust">
                        <div className="row dashboard_part justify-content-center">
                            <div className="col-12">
                                <div className="row ms-3 mb-5 justify-content-center">
                                    <div className="col d-flex align-items-stretch">
                                        <Link to="/users" className="row dashboard_box box_design me-3 w-100">
                                            <div className="col-auto px-0">
                                                <span className="dashboard_icon"><i className="fas fa-user"></i></span>
                                            </div>
                                            <div className="col pe-0">
                                                <div className="dashboard_boxcontent">
                                                    <h2>Total Users</h2>
                                                    <span>{userCounts.userCount}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col d-flex align-items-stretch">
                                        <Link to="/orders" className="row dashboard_box box_design me-3 w-100">
                                            <div className="col-auto px-0">
                                                <span className="dashboard_icon"><i className="fal fa-box-full"></i></span>
                                            </div>
                                            <div className="col pe-0">
                                                <div className="dashboard_boxcontent">
                                                    <h2>Total Orders</h2>
                                                    <span>{userCounts.orderCount}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col d-flex align-items-stretch">
                                        <Link to="/offers" className="row dashboard_box box_design me-3 w-100">
                                            <div className="col-auto px-0">
                                                <span className="dashboard_icon"><i className="fal fa-gift-card"></i></span>
                                            </div>
                                            <div className="col pe-0">
                                                <div className="dashboard_boxcontent">
                                                    <h2>Total Offers</h2>
                                                    <span>500</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col d-flex align-items-stretch pe-0">
                                        <Link to="/transactions" className="row dashboard_box box_design me-0 w-100">
                                            <div className="col-auto px-0">
                                                <span className="dashboard_icon"><i className="far fa-dollar-sign"></i></span>
                                            </div>
                                            <div className="col pe-0">
                                                <div className="dashboard_boxcontent">
                                                    <h2>Total Revenue</h2>
                                                    <span>SAR 20000</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="row mx-0">
                                    <div className="col-12 design_outter_comman shadow">
                                        <div className="row comman_header justify-content-between">
                                            <div className="col">
                                                <h2>Recent Orders</h2>
                                            </div>
                                            <div className="col-3">
                                                <form className="form-design" action="" onSubmit={handleSearch1}>
                                                    <div className="form-group mb-0 position-relative icons_set">
                                                        <input type="text" className="form-control" placeholder="Search" name="name" id="name" value={searchQuery}
                                                                        onChange={(e) => setSearchQuery(e.target.value)}/>
                                                        <i className="fa fa-search" ></i>
                                                    </div>
                                                </form>
                                            </div>
                                            {/* <div className="col-auto">
                                                <input type="date" className="custom_date" />
                                            </div> */}
                                        </div>
                                        <form
                                            className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                                            action="" onSubmit={handleSearch}>
                                            <div className="form-group mb-0 col-5">
                                                <label htmlFor="">From</label>
                                                <input type="date" className="form-control" id='startDate' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                            </div>
                                            <div className="form-group mb-0 col-5">
                                                <label htmlFor="">To</label>
                                                <input type="date" className="form-control" id='endDate' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                            </div>
                                            <div className="form-group mb-0 col-auto">
                                                <button className="comman_btn2" disabled={startDate > endDate} >Search</button>
                                            </div>
                                        </form>
                                        <div className="row">
                                            <div className="col-12 comman_table_design px-0">
                                                <div className="table-responsive">
                                                    <table className="table mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th>S.No.</th>
                                                                <th>Seller Name</th>
                                                                <th>Buyer Name</th>
                                                                <th>Mobile Number</th>
                                                                <th>Order Date</th>
                                                                <th>Offer Type</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {(recentOrderList || [])?.map((order, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{order.sellerName}</td>
                                                                    <td>{order.buyerName}</td>
                                                                    <td>{order.mobileNumber}</td>
                                                                    <td>{order.createdAt}</td>
                                                                    <td>{order.offerType}</td>
                                                                    <td>
                                                                        <Link className="comman_btn2 table_viewbtn" to="/recent-order">View</Link>
                                                                    </td>
                                                                </tr>
                                                            ))}
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

        </>
    )
}

export default Dashboard
