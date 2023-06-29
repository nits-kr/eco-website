import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios";
import Sidebar from './Sidebar';

export default function UserReports() {
    const [reporterList, setReporterList] = useState('')
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    axios.defaults.headers.common["x-auth-token-user"] =
        localStorage.getItem("token");
    useEffect(() => {
        userList();
    }, []);
    const userList = async () => {
        const { data } = await axios.post("http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/reporter/reporter/list", {
            startDate,
            endDate,
        });
        const filteredUsers = data.results.list.filter(
            (user) =>
                new Date(user.createdAt) >= new Date(startDate) &&
                new Date(user.createdAt) <= new Date(endDate)
        );
        setReporterList(filteredUsers.reverse());
        console.log(data);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        userList();
    };
    return (
        <>
        <Sidebar/>
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                aria-labelledby="nav-home-tab">
                <div className="row mx-0">
                    <div className="col-12">
                        <form
                            className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                            onSubmit={handleSearch}
                        >
                            <div className="form-group mb-0 col-5">
                                <label htmlFor="">From</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="fromDate"
                                    id="fromDate"
                                    value={startDate} onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-0 col-5">
                                <label htmlFor="">To</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="toDate"
                                    id="toDate"
                                    value={endDate} onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-0 col-auto">
                                <button type="submit" className="comman_btn2" disabled={startDate > endDate}>
                                    Search
                                </button>
                            </div>
                        </form>
                        <div className="row">
                            <div className="col-12 comman_table_design px-0">
                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>S.No.</th>
                                                <th>Reporter</th>
                                                <th>Reported Against</th>
                                                <th>Reason</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(reporterList || []).map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.reporter}</td>
                                                    <td>{data.reporterAgainst}</td>
                                                    <td>{data.reason}</td>
                                                    <td>
                                                        <Link
                                                            className="comman_btn2 table_viewbtn"
                                                            to="/userDetails"
                                                        >
                                                            View
                                                        </Link>
                                                        <Link
                                                            className="comman_btn ms-1 table_viewbtn"
                                                            to=""
                                                        >
                                                            Notify
                                                        </Link>
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
        </>
    )
}
