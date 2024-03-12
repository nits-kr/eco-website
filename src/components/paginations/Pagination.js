import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setPage } from "../../app/localSlice";

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  goToPageInput,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(goToPageInput || 1);

  const dispatch = useDispatch();

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  useEffect(() => {
    setCurrentPage(goToPageInput || 1);
  }, [goToPageInput]);

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
