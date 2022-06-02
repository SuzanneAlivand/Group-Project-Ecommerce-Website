import styled from "styled-components";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./styles/pagination.css";

const PaginationDiv = ({ setCurrentItems, items }) => {
  const [pageCount, setPageCount] = useState(0); 
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12; 

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage; //the final index of a product (on the last page)
    setCurrentItems(items.slice(itemOffset, endOffset));

    //total # of products/divided by number of items displayed per page
    setPageCount(Math.ceil(items.length / itemsPerPage)); 
  }, [itemOffset, itemsPerPage, items]);

  //we set a new offset after each click on a pagination number 
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
};

export default PaginationDiv;
