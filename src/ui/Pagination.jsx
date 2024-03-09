/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Pagination } from "@nextui-org/react";
import { useState } from "react";

export default function Paginations({ setCurrentPage,pagesNum,searchTerm,postPerPage,setFilteredPosts ,filteredPosts}) {
  
  
  
  function handlePageChange(currentpageNumber) {
    setCurrentPage(currentpageNumber);
    const filteredData =  filteredPosts.filter((item) => {
      const searchLC = searchTerm?.trim().toLocaleLowerCase();
      if (!searchLC) return true;

      return (
        item.product?.trim().toLocaleLowerCase().includes(searchLC) ||
        (item.brand && item.brand.toLowerCase().trim().includes(searchLC))
      );
    });
    const lastPostIndex = currentpageNumber * 50;
    const firstPostIndex = lastPostIndex - postPerPage;
    if (firstPostIndex < filteredPosts.length) {
      setFilteredPosts(filteredData.slice(firstPostIndex, lastPostIndex));
    } else {
      setFilteredPosts([]);
    }

  }


  return (
    <Pagination
    
      onChange={handlePageChange}
      showControls
      color="danger"
      variant="light"
      showShadow
      boundaries={3}
      size="sm"
      total={pagesNum} 
      initialPage={1}
    />
  );
}
