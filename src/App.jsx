/* eslint-disable no-unused-vars */


import { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Button, Input, Slider } from "@nextui-org/react";
import SpinnerL from "./ui/Spinner";
import ProductsCatalog from "./features/product/ProductsCatalog";
import { Player } from "@lottiefiles/react-lottie-player";
import errorLotti from './assets/error.json'
export default function MyComponent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [ids, setIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [pagesNumber, setPagesNumber] = useState(20);
  const [priceLowerLimit, setPriceLowerLimit] = useState(0);
  const [priceUpperLimit, setPriceUpperLimit] = useState(Infinity);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [error, setError] = useState(false);

  const postPerPage = 50;
  const apiUrl = "https://api.valantis.store:41000/";
  const password = "Valantis"; // Replace with your actual password

  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const authValue = `${password}_${currentDate}`;
  const md5Hash = CryptoJS.MD5(authValue).toString();

  const headers = {
    "X-Auth": md5Hash,
    "Content-Type": "application/json",
  };

  const requestBody = {
    method: "POST",
    action: "get_ids",
    params: { offset: 0, limit: 1000 },
  };

  useEffect(() => {
    async function fetchIds() {
      try {
        const response = await axios.post(apiUrl, JSON.stringify(requestBody), {
          headers,
        });
        setIds(response.data.result);
      } catch (error) {
      setError(true)
      }
    }

    fetchIds();
  }, []);

  useEffect(() => {

    //fetching data with params
    async function fetchData() {
      try {
        const response = await axios.post(
          apiUrl,
          JSON.stringify({
            method: "POST",
            action: "get_items",
            params: {
              ids: ids,
            },
          }),
          { headers }
        );

        const data = response.data.result;

        //removing the duplicate products

        const idToProductMap = new Map();
        data.forEach((product) => {
          if (!idToProductMap.has(product.id)) {
            idToProductMap.set(product.id, product);
          }
        });
        const uniqueProductsArray = Array.from(idToProductMap.values());
        setData(uniqueProductsArray);
        setLoading(false);
      } catch (error) {
      
        setError(true);
      }
    }

    fetchData();
  }, [ids]);

  useEffect(() => {
    try {
      const searchLC = searchTerm.trim().toLocaleLowerCase();
      const filteredPosts = data.filter((item) => {
        const itemName = item.product.trim().toLocaleLowerCase();
        const itemBrand = item.brand ? item.brand.trim().toLowerCase() : "";
        const itemPrice = item.price;

        // search and price range filter
        if (searchLC) {
          return (
            (itemName.includes(searchLC) || itemBrand.includes(searchLC)) &&
            itemPrice >= priceLowerLimit &&
            itemPrice <= priceUpperLimit
          );
        }

        return itemPrice >= priceLowerLimit && itemPrice <= priceUpperLimit;
      });

      //sorting the products
      filteredPosts.sort((a, b) =>
        sortOrder === "ascending" ? a.price - b.price : b.price - a.price
      );

      setFilteredPosts(filteredPosts);
      
      //pagination logic 

      const lastPostIndex = currentPage * postPerPage;
      const firstPostIndex = lastPostIndex - postPerPage;
      const paginatedPosts = filteredPosts.slice(firstPostIndex, lastPostIndex);
      setPaginatedPosts(paginatedPosts);

      const pagesNum = Math.ceil(filteredPosts.length / postPerPage);
      setPagesNumber(pagesNum);
     
    } catch (error) {
      setError(true);
    }
  }, [
    data,
    searchTerm,
    currentPage,
    postPerPage,
    priceLowerLimit,
    priceUpperLimit,
    sortOrder,
  ]);
  
  return (
    <div className=" flex flex-col gap-5 items-center ">
      {error && (
        <div>
          <Player
            src={errorLotti}
            className="w-[490px] md:w-[700px] md:ml-[320px]"
            loop
            autoplay
          />

          <Button
            color="danger"
            className="w-[100%] h-[70px]"
            onClick={() => window.location.reload()}
          >
            {" "}
            try again{" "}
          </Button>
        </div>
      )}
      { loading && !error ? (
        <div className="flex justify-center items-center h-screen">
          <SpinnerL />
        </div>
      ) : (
        <div>
          <div className=" flex flex-col mt-2  min-h-[100%] items-center ">
            {!error && (
              <div className="flex gap-6">
                <div>
                  <Input
                    variant="underlined"
                    color="danger"
                    label="search "
                    placeholder="E.g:cartier"
                    value={searchTerm}
                    onChange={(e) => {
                      setCurrentPage(1);
                      setSearchTerm(e.target.value);
                    }}
                    className="max-w-xs"
                  />
                </div>

                <div>
                  <Slider
                    color="danger"
                    label="Price Range"
                    step={1000}
                    minValue={1000}
                    maxValue={500000}
                    defaultValue={[50000, 250000]}
                    formatOptions={{ style: "currency", currency: "USD" }}
                    onChange={(value) => {
                      setCurrentPage(1);
                      setPriceLowerLimit(value[0]);
                      setPriceUpperLimit(value[1]);
                    }}
                    className="max-w-md mt-4 "
                  />
                </div>
                <div className="flex flex-col items-start mb-4">
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-3 bg-[#F31260] mb-2 font-bold max-w-xs mt-4  py-2 text-lg  border border-gray-200 rounded-md   "
                  >
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                  </select>
                </div>
              </div>
            )}
            {!error && (
              <div>
                <ProductsCatalog
                  postPerPage={postPerPage}
                  filteredPosts={paginatedPosts}
                  loading={loading}
                  pagesNum={pagesNumber}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  setFilteredPosts={setFilteredPosts}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
