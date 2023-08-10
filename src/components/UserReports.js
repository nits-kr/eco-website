import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";

export default function UserReports(props) {
  console.log("UserReports(props)", props);
  const [reporterList, setReporterList] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");
  const fetchStaffList = async () => {
    try {
      const response = await axios.post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/reporter/reporter/list"
      );
      setReporterList(response?.data?.results?.list?.reverse());
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchStaffList();
  }, []);

  useEffect(() => {
    handleSearch1();
  }, [props?.searchQuery]);
  const handleSearch1 = async (e) => {
    // e.preventDefault();
    if (props?.searchQuery) {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/reporter/reporter/search",
          {
            reporter: props?.searchQuery,
          }
        );
        const { error, results } = response.data;
        if (error) {
          setReporterList([]);
          Swal.fire({
            title: "Error!",
            // text: error.response.data,
            text: "Error searching for products. Data is not found",
            icon: "error",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              fetchStaffList();
            }
          });
          // throw new Error("Error searching for products.Data are Not Found");
        } else {
          setReporterList(results?.repoterData);
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
      setReporterList([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/reporter/reporter/list",
        {
          from: startDate,
          to: endDate,
        }
      )
      .then((response) => {
        const list = response?.data?.results?.list?.reverse();
        if (list && list.length > 0) {
          Swal.fire({
            title: "List Found!",
            text: "list is available for the selected date.",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              setReporterList(list);
            }
          });
          // setReporterList(list);
        } else {
          setReporterList([]);
          Swal.fire({
            icon: "warning",
            title: "No data found!",
            text: "There is no list between the selected dates.",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              fetchStaffList();
            }
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleId = (id) => {
    // alert(id);
  };
  return (
    <>
      {/* <Sidebar/> */}
      <div
        className="tab-pane fade show active"
        id="nav-home"
        role="tabpanel"
        aria-labelledby="nav-home-tab"
      >
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
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="form-group mb-0 col-5">
                <label htmlFor="">To</label>
                <input
                  type="date"
                  className="form-control"
                  name="toDate"
                  id="toDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="form-group mb-0 col-auto">
                <button
                  type="submit"
                  className="comman_btn2"
                  disabled={startDate > endDate}
                >
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
                              to={`/userDetails/${data._id}`}
                              onClick={() => handleId(data?._id)}
                            >
                              View
                            </Link>
                            {/* <Link
                              className="comman_btn ms-1 table_viewbtn"
                              to=""
                            >
                              Notify
                            </Link> */}
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
  );
}
