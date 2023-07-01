import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "./Sidebar";
function ProductList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [productList, setProductList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.post(
          "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/productSearch",
          {
            productName: searchQuery,
          }
        );
        const { error, results } = response.data;
        if (error) {
          throw new Error("Error searching for products.");
        } else {
          setProductList(results.productData);
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
      setProductList([]);
    }
  };
  useEffect(() => {
    axios
      .post(
        "http://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000/admin/product/productList"
      )
      .then((response) => {
        setProductList(response?.data?.results?.list.reverse());
        console.log(response.data);
      });
  }, []);
  return (
    <>
      <Sidebar />
      <div className="admin_main_inner" style={{ marginLeft: "18%" }}>
        <div className="admin_panel_data height_adjust">
          <h6 style={{ marginLeft: "2%", marginTop: "-35px" }}>
            <Link to="" style={{ color: "grey", textDecoration: "none" }}>
              {" "}
              Dashboard /
            </Link>{" "}
            <Link to="" style={{ color: "grey", textDecoration: "none" }}>
              {" "}
              Products
            </Link>
          </h6>
          <h1 style={{ marginLeft: "2%" }}>Products List</h1>
          <span
            className="col-auto d-flex "
            style={{
              justifyContent: "flex-end",
              marginTop: "-55px",
              marginBottom: "15px",
            }}
          >
            <Link
              to="#"
              className="btn btn-secondary "
              style={{ marginRight: "10px" }}
            >
              Import
            </Link>
            <Link
              to="#"
              className="btn btn-secondary "
              style={{ marginRight: "10px" }}
            >
              Export
            </Link>
            <Link
              to="/product-management"
              className="btn btn-primary"
              style={{ marginRight: "24px" }}
            >
              Add Product
            </Link>
          </span>
          <div className="row transaction-management justify-content-center">
            <div className="col-12">
              <div className="row mx-0">
                <div className="col-12 design_outter_comman shadow">
                  <div
                    className="container"
                    style={{ width: "107%", marginLeft: "-37px" }}
                  >
                    <div className="card">
                      <div className="p-4">
                        <div className="d-flex align-items-center">
                          <Link to="">
                            <button
                              className="btn btn-sa-muted btn-sa-icon fs-exact-16"
                              data-sa-layout-sidebar-open=""
                              style={{ marginLeft: "-14px" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <path d="M7,14v-2h9v2H7z M14,7h2v2h-2V7z M12.5,6C12.8,6,13,6.2,13,6.5v3c0,0.3-0.2,0.5-0.5,0.5h-2 C10.2,10,10,9.8,10,9.5v-3C10,6.2,10.2,6,10.5,6H12.5z M7,2h9v2H7V2z M5.5,5h-2C3.2,5,3,4.8,3,4.5v-3C3,1.2,3.2,1,3.5,1h2 C5.8,1,6,1.2,6,1.5v3C6,4.8,5.8,5,5.5,5z M0,2h2v2H0V2z M9,9H0V7h9V9z M2,14H0v-2h2V14z M3.5,11h2C5.8,11,6,11.2,6,11.5v3 C6,14.8,5.8,15,5.5,15h-2C3.2,15,3,14.8,3,14.5v-3C3,11.2,3.2,11,3.5,11z"></path>
                              </svg>
                            </button>
                          </Link>
                          <div className="container">
                            <form onSubmit={handleSearch}>
                              <div className="row">
                                <div className="col">
                                  <input
                                    type="text"
                                    placeholder="Search for products here..."
                                    className="form-control form-control--search mx-auto"
                                    id="product-search"
                                    value={searchQuery}
                                    onChange={(e) =>
                                      setSearchQuery(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 comman_table_design px-0">
                      <div className="table-responsive">
                        <table className="table mb-0">
                          <thead>
                            <tr>
                              <th>
                                <input
                                  type="checkbox"
                                  name="all"
                                  id=""
                                  checked={selectAll}
                                  onChange={handleSelectAll}
                                />
                              </th>
                              <th
                                className="col-4"
                                style={{ textAlign: "left" }}
                              >
                                Product
                                <span style={{ float: "right" }}>
                                  <i
                                    className="fa fa-sort-up"
                                    aria-hidden="false"
                                    title="Sort in ascending order"
                                    style={{ marginRight: "-50%" }}
                                  ></i>
                                  <i
                                    className="fa fa-sort-down"
                                    aria-hidden="false"
                                    title="Sort in descending order"
                                  ></i>
                                </span>
                              </th>
                              <th style={{ textAlign: "left" }}>
                                Category
                                <span style={{ float: "right" }}>
                                  <i
                                    className="fa fa-sort-up"
                                    aria-hidden="true"
                                    title="Sort in ascending order"
                                    style={{ marginRight: "-50%" }}
                                  ></i>
                                  <i
                                    className="fa fa-sort-down"
                                    aria-hidden="true"
                                    title="Sort in descending order"
                                  ></i>
                                </span>
                              </th>
                              <th style={{ textAlign: "left" }}>
                                Stock
                                <span style={{ float: "right" }}>
                                  <i
                                    className="fa fa-sort-up"
                                    aria-hidden="true"
                                    title="Sort in ascending order"
                                    style={{ marginRight: "-50%" }}
                                  ></i>
                                  <i
                                    className="fa fa-sort-down"
                                    aria-hidden="true"
                                    title="Sort in descending order"
                                  ></i>
                                </span>
                              </th>
                              <th style={{ textAlign: "left" }}>
                                Price{" "}
                                <span style={{ float: "right" }}>
                                  <i
                                    className="fa fa-sort-up"
                                    aria-hidden="true"
                                    title="Sort in ascending order"
                                    style={{ marginRight: "-50%" }}
                                  ></i>
                                  <i
                                    className="fa fa-sort-down"
                                    aria-hidden="true"
                                    title="Sort in descending order"
                                  ></i>
                                </span>
                              </th>
                              <th style={{ textAlign: "left" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productList.map((product) => (
                              <tr key={product._id}>
                                <td>
                                  <Link to="">
                                    <strong>
                                      <input
                                        type="checkbox"
                                        name={product._id}
                                        id=""
                                        checked={selectAll}
                                      />
                                    </strong>
                                  </Link>
                                </td>
                                <td
                                  style={{
                                    display: "flex",
                                    alignItems: "left",
                                  }}
                                >
                                  <Link
                                    to="/product-management"
                                    style={{
                                      color: "black",
                                      display: "flex",
                                      alignItems: "left",
                                    }}
                                  >
                                    <div
                                      className="col-3"
                                      style={{
                                        display: "flex",
                                        alignItems: "left",
                                      }}
                                    >
                                      <img
                                        src={product.product_Pic[0]}
                                        className="avatar lg rounded"
                                        alt=""
                                        style={{
                                          width: "15vh",
                                          height: "15vh",
                                        }}
                                      />
                                    </div>
                                    <div
                                      className="col-9 ms-3"
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "left",
                                      }}
                                    >
                                      <div
                                        className="col-6"
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "left",
                                        }}
                                      >
                                        <strong className="text-dark-emphasis">
                                          {product.productName_en
                                            ? product.productName_en.toUpperCase()
                                            : product.productName &&
                                              product.productName.toUpperCase()}
                                        </strong>
                                        <strong className="text-body-secondary">
                                          ID: {product._id}
                                        </strong>
                                        <strong className="text-body-tertiary">
                                          SKU: {product.SKU}
                                        </strong>
                                      </div>
                                    </div>
                                  </Link>
                                </td>
                                <td style={{ textAlign: "left" }}>
                                  <Link
                                    to="/product-management"
                                    className="text-light-emphasis"
                                  >
                                    <strong>
                                      {product?.Subcategory_Id?.subCategoryName
                                        ? product?.Subcategory_Id
                                            ?.subCategoryName
                                        : product?.Subcategory_Id
                                            ?.subCategoryName_en}
                                    </strong>
                                  </Link>
                                </td>
                                <td style={{ textAlign: "left" }}>
                                  <span
                                    className={`fs-6 badge ${
                                      product.stockQuantity === 0
                                        ? "bg-danger"
                                        : product.stockQuantity <= 10
                                        ? "bg-warning"
                                        : "bg-success"
                                    }`}
                                  >
                                    {product.stockQuantity}
                                  </span>
                                </td>
                                <td
                                  style={{
                                    textAlign: "left",
                                    fontSize: "20px",
                                  }}
                                >
                                  ₹{product.Price}{" "}
                                  <del className="fs-6 ms-1 text-secondary">
                                    {" "}
                                    ₹{product?.oldPrice}{" "}
                                  </del>
                                </td>
                                <td>
                                  <div className="dropdown">
                                    <button
                                      className="dropdown-toggle"
                                      type="button"
                                      id="optionsMenu"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="fa-solid fa-ellipsis-vertical"></i>
                                    </button>
                                    <ul
                                      className="dropdown-menu"
                                      aria-labelledby="optionsMenu"
                                    >
                                      <li>
                                        <Link className="dropdown-item" to="#">
                                          Edit
                                        </Link>
                                      </li>
                                      <li>
                                        <Link className="dropdown-item" to="#">
                                          Duplicate
                                        </Link>
                                      </li>
                                      <li>
                                        <Link className="dropdown-item" to="#">
                                          Add Tag
                                        </Link>
                                      </li>
                                      <li>
                                        <Link className="dropdown-item" to="#">
                                          Remove Tag
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          to="#"
                                          style={{ backgroundColor: "red" }}
                                        >
                                          Delete
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div
                        className="pagination"
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          marginTop: "10px",
                        }}
                      >
                        <Link
                          to="#"
                          className="pagination__link pagination__link--prev disabled"
                        >
                          Previous
                        </Link>
                        <Link to="#" className="pagination__link active">
                          1
                        </Link>
                        <Link to="#" className="pagination__link">
                          2
                        </Link>
                        <Link to="#" className="pagination__link">
                          3
                        </Link>
                        <Link
                          to="#"
                          className="pagination__link pagination__link--next"
                        >
                          Next
                        </Link>
                      </div>
                      <div
                        className="table-controls"
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "-42px",
                          marginBottom: "15px",
                        }}
                      >
                        <div className="table-info">
                          <span>Showing 1 to 10 of 16 / </span>
                        </div>
                        <div className="table-divider"></div>
                        <div className="table-page-size">
                          <label>
                            Rows per page
                            <select
                              name="rows-per-page"
                              style={{ marginRight: "2px" }}
                            >
                              <option defaultValue="10">10</option>
                              <option defaultValue="25">25</option>
                              <option defaultValue="50">50</option>
                              <option defaultValue="100">100</option>
                            </select>
                          </label>
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

export default ProductList;
