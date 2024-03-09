/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Paginations from "../../ui/Pagination";
import ProductItem from "./ProductItem";
import { Player } from '@lottiefiles/react-lottie-player';
import noData from '../../assets/nodata.json'
function ProductsCatalog({
  
  setCurrentPage,
  loading,
  postPerPage,
  filteredPosts,
  setFilteredPosts,
  pagesNum,
  currentPage
}) {
  const [showPlayer, setShowPlayer] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlayer(true);
    }, 3000); // so the data not found will not be displayed at the start

    return () => clearTimeout(timer); // This will clear the timer when the component unmounts
  }, []);
  
  return (
    <div className="flex flex-col justify-center mt-7 gap-3  items-center">
      <div className="bg-stone-200 rounded-lg">
        {!loading &&  filteredPosts.length > 0  && (
          <Paginations
         
            pagesNum={pagesNum}
            filteredPosts={ filteredPosts}
            setFilteredPosts={setFilteredPosts}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </div>
      <div className=" grid grid-cols-1 place sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        { filteredPosts.length > 0 ? (
           filteredPosts.map((item) => {
            return (
              <div key={item.id}>
                <ProductItem item={item} />
              </div>
            );
          })
        ) : (
          showPlayer &&    <div className="sm:col-span-2 md:col-span-3 lg:col-span-5 mt-[210px]">
          <Player
          src={ noData}
          className="w-[430px] md:w-[800px] md:ml-[320px]"
          loop
          autoplay
        />
        </div>
        )}
      </div>
    </div>
  );
}

export default ProductsCatalog;
