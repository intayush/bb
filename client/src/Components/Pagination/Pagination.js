import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Pagination = (props) => {
  const [currentPage, setcurrentPage] = useState();
  const category = useSelector((state) => state.vehicleDetails.category);

  useEffect(() => {
    gotoPage(1);
  }, [category]);

  const gotoPage = (page) => {
    let currentPage = Math.max(0, Math.min(page, totalPages));
    setcurrentPage(currentPage);
  };

  const LEFT_PAGE = "LEFT";
  const RIGHT_PAGE = "RIGHT";

  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };

  let { totalRecords = null, pageLimit = 12, pageNeighbours = 0 } = props;

  pageLimit = typeof pageLimit === "number" ? pageLimit : 12;
  totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

  pageNeighbours =
    typeof pageNeighbours === "number"
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0;

  let totalPages = Math.ceil(totalRecords / pageLimit);

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalBlocks < totalPages) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - pages.length + 1;

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...pages];
          break;
        }
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, RIGHT_PAGE];
          break;
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  let { onPageChanged = (f) => f } = props;
  let paginationData = {
    currentPage,
    totalPages: totalPages,
    pageLimit: pageLimit,
    totalRecords: totalRecords,
  };

  useEffect(() => {
    onPageChanged(paginationData);
  }, [currentPage]);

  const handleClick = (page) => (event) => {
    event.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = (event) => {
    event.preventDefault();
    gotoPage(currentPage - 1);
  };

  const handleMoveRight = (event) => {
    event.preventDefault();
    gotoPage(currentPage + 1);
  };

  if (!totalRecords || totalPages === 1) return null;

  const pages = fetchPageNumbers();

  const leftButtonClass = currentPage - pageNeighbours >= 1 ? "" : "disabled";
  const rightButtonClass =
    currentPage + pageNeighbours <= totalPages ? "" : "disabled";

  return (
    <ul className="pagination">
      <li className={leftButtonClass}>
        <a href="#!" onClick={handleMoveLeft}>
          <i className="material-icons">chevron_left</i>
        </a>
      </li>
      {pages.map((page, index) => {
        if (page === LEFT_PAGE)
          return (
            <li key={index} className="dot">
              <a href="#!">....</a>
            </li>
          );
        if (page === RIGHT_PAGE)
          return (
            <li key={index} className="dot">
              <a href="#!">....</a>
            </li>
          );
        return (
          <li key={index} className={currentPage === page ? "active" : ""}>
            <a href="#!" onClick={handleClick(page)}>
              {page}
            </a>
          </li>
        );
      })}
      <li className={rightButtonClass}>
        <a href="#!" onClick={handleMoveRight}>
          <i className="material-icons">chevron_right</i>
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
