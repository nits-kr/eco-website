import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPage } from "../../app/localSlice";

const Pagination = ({ totalItems, itemsPerPage }) => {
  const localPage = useSelector((data) => data?.local?.page);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(localPage);

  console.log("currentPage", currentPage);
  console.log("localPage", localPage);
  console.log("totalItems",totalItems);

  const dispatch = useDispatch();

  const handlePageClick = (page) => {
    setCurrentPage(page);
    dispatch(setPage(page));
  };

  const renderPaginationLinks = () => {
    const links = [];

    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <Link
          key={i}
          to="#"
          className={currentPage === i ? "active" : ""}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </Link>
      );
    }

    return links;
  };

  return <div className="table_paginations">{renderPaginationLinks()}</div>;
};

export default Pagination;
