import React from "react";
import Sidebar from "../../components/Sidebar";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import NewProduct from "./newProduct/NewProduct";
import Options from "./addOptions/Options";
import { FormContext } from "../../Contexts/FormContext";
import { Drawer, Progress, Spin } from "antd";

import axios from "axios";

const Products = () => {
  const [drawers, setDrawers] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [prodDetails, setProdDetails] = React.useState(null);
  const [showProdDetails, setShowProdDetails] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState("");
  const { isFormSubmitted } = React.useContext(FormContext);
  const { baseUrl } = React.useContext(FormContext);

  let navigate = useNavigate();

  const onCloseAadhaar = () => {
    setDrawers(false);
  };

  const onClose = () => {
    setShowProdDetails(false);
    setProdDetails(null);
  };

  const handleClick = async (id) => {
    setShowProdDetails(true);
    console.log(id);
    console.log(prodDetails);
    try {
      const response = await axios.get(
        `${baseUrl}/Products/selectProducts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: "include",
        }
      );
      const data = response.data;
      console.log(data);
      setProdDetails(data.product);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    console.log(process.env.REACT_APP_ENV);
    try {
      const response = await axios.get(`${baseUrl}/Products/getallproducts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: "include",
      });
      setLoading(false);
      const data = response.data;
      setProducts(data.data);
    } catch (err) {
      console.error(err);
    }
  };
  React.useEffect(() => {
    fetchProducts();
    if (isFormSubmitted) {
      setDrawers(false);
      fetchProducts();
    }
    /*eslint-disable */
  }, [isFormSubmitted]);

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="relative flex w-full">
      <div className="fixed top-0 bottom-0">
        <Sidebar />
      </div>
      <div className="w-full mt-[39px] 2xl:ml-[220px] ml-[195px]">
        <div
          className="grid grid-cols-3 px-[40px] 2xl:px-[68px]"
          style={{ gridTemplateColumns: "200px auto 180px" }}
        >
          <div className="flex mr-auto text-black">
            <span className="text-2xl font-bold text-left 2xl:text-3xl">
              Products
            </span>
          </div>
          <div className=" flex ml-auto mr-5 max-w-[550px] 2xl:max-w-[600px] w-full h-[32px] mt-[6.5px]  rounded-lg border-1 border-solid border-aliceblue bg-transparent justify-start items-center">
            <div className="flex ml-2">
              <BsSearch size={24} color="#306FC7" />
            </div>
            <div className="flex flex-grow pr-3">
              <input
                type="search"
                className="block text-sm 2xl:text-base w-full px-2 py-[0.20rem] leading-[1.6] border-none outline-none placeholder:text-aliceblue "
                id="searchBar"
                placeholder="Search.."
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          <div
            className="flex w-[180px] justify-start items-center ml-auto"
            style={{ flex: "0 0 180px" }}
          >
            <div className="flex text-lg border-solid border-transparent w-[180px] h-[32px] ">
              <div
                className="flex w-[50%] h-[32px] 2xl:text-sm text-sm justify-evenly items-center rounded-l-lg bg-black text-white cursor-pointer"
                onClick={() => {
                  navigate("/settings");
                  sessionStorage.setItem("selectedSettingTab", "profile");
                }}
              >
                <div className="flex max-w-[20px] w-full ml-1 mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_305_165)">
                      <path
                        d="M13.9999 12.8333C16.5772 12.8333 18.6666 10.744 18.6666 8.16667C18.6666 5.58934 16.5772 3.5 13.9999 3.5C11.4226 3.5 9.33325 5.58934 9.33325 8.16667C9.33325 10.744 11.4226 12.8333 13.9999 12.8333Z"
                        stroke="white"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 24.5V22.1667C7 20.929 7.49167 19.742 8.36683 18.8668C9.242 17.9917 10.429 17.5 11.6667 17.5H16.3333C17.571 17.5 18.758 17.9917 19.6332 18.8668C20.5083 19.742 21 20.929 21 22.1667V24.5"
                        stroke="white"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_305_165">
                        <rect width="28" height="28" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="flex mr-2">Profile</div>
              </div>
              <div
                className="flex w-[50%] h-[32px] 2xl:text-sm text-sm justify-evenly rounded-r-lg items-center bg-blue text-white cursor-pointer"
                onClick={() => {
                  navigate("/login");
                  localStorage.removeItem("token");
                }}
              >
                <div className="flex ml-2 mr-1">
                  <img
                    src={require("../../image/logout.png")}
                    className="w-full max-w-[15px]"
                    alt="logout"
                  />
                </div>
                <div className="flex mr-2">Logout</div>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 align-middle py-[40px] px-[40px] 2xl:px-[68px] gap-5">
            <div className="flex max-w-[765px] w-full h-[90px] border-1 border-solid border-aliceblue bg-white rounded-lg items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300">
              {/* <div className="w-[55px] h-[55px] ml-[20px] rounded-full shimmer" /> */}
              <div className="flex flex-col items-start justify-center p-6">
                <div className="w-[180px] h-[20px] mb-1 shimmer" />
                <div className="w-[150px] h-[18px] shimmer" />
              </div>
              <div className="flex flex-col items-center content-end justify-center ml-auto mr-11">
                <div className="w-[30px] h-[30px] shimmer" />
              </div>
            </div>
            <div className="flex max-w-[765px] w-full h-[90px] border-1 border-solid border-aliceblue bg-white rounded-lg items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300">
              {/* <div className="w-[55px] h-[55px] ml-[20px] rounded-full shimmer" /> */}
              <div className="flex flex-col items-start justify-center p-6">
                <div className="w-[180px] h-[20px] mb-1 shimmer" />
                <div className="w-[150px] h-[18px] shimmer" />
              </div>
              <div className="flex flex-col items-center content-end justify-center ml-auto mr-11">
                <div className="w-[30px] h-[30px] shimmer" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2  align-middle py-[40px] px-[40px] 2xl:px-[68px] gap-5">
            {products ? (
              filteredProducts
                .slice()
                .reverse()
                .map((product, index) => (
                  <div
                    className={`flex max-w-[765px] w-full h-[90px] border-1 border-solid border-aliceblue bg-lightBlue rounded-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300`}
                    onClick={() => handleClick(product.productCode)}
                    key={index}
                  >
                    {/* <div className="flex w-[55px] mt-[20px] ml-[20px] flex-row items-start rounded-full overflow-hidden">
                      <img
                        src={
                          customer.profileImage
                            ? `${process.env.REACT_APP_API_URL_IMAGE}/${customer.profileImage}`
                            : "./user.png"
                        }
                        alt="profilePic"
                        className="w-[55px] h-[55px] rounded-full"
                      />
                    </div> */}
                    <div className="flex flex-col items-center justify-center p-6 text-left">
                      <span className="mr-auto text-lg font-semibold text-left 2xl:text-xl">
                        {product.productName}
                      </span>
                      <span className="2xl:text-lg text-[16px] mr-auto">
                        {product.productCategory}
                      </span>
                    </div>
                    <div className="flex flex-col items-center content-end justify-center ml-auto mr-11">
                      <span className="text-right ml-auto w-[15px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="#306FC7"
                            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                          />
                        </svg>
                      </span>
                      {/* {customer.status ? (
                          <div className="text-green">Approved</div>
                        ) : (
                          <div className="text-red">Pending</div>
                        )} */}
                    </div>
                  </div>
                ))
            ) : (
              <div className="flex w-full justify-center items-end pt-[200px] pl-[200px] text-lg 2xl:text-xl">
                No Products found.
              </div>
            )}
          </div>
        )}
        <button
          className="border text-white text-2xl bg-blue border-solid w-[80px] h-[80px] border-blue rounded-full cursor-pointer bottom-12 fixed right-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          type="button"
          onClick={() => setDrawers(true)}
        >
          +
        </button>
        {drawers && <Options onClose={onCloseAadhaar} />}

        <Drawer
          placement="right"
          closable={false}
          onClose={onClose}
          open={showProdDetails}
          key="rightCustomerDetails"
          width={700}
        >
          <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
            <svg
              className="w-8 h-8 text-black cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={onClose}
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <line x1="18" y1="6" x2="6" y2="18" />{" "}
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <div className="flex flex-row mt-3 ml-5">
            <span className="mt-4 text-2xl font-extrabold 2xl:text-3xl">
              Product Details
            </span>
          </div>
          {prodDetails === null ? (
            <>
              <div className="fixed inset-0 z-50 bg-gray-500 opacity-100"></div>
              <div className="flex items-center justify-center w-full h-full transition ease-in delay-300 ">
                <Spin size="large" />
              </div>
            </>
          ) : (
            <div>
              <div className="flex max-w-[600px] py-8 mb-8 h-full flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5">
                <div className="flex flex-row w-full">
                  <div className="flex flex-row w-full">
                    <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                      <span className="m-1 mr-auto text-base font-semibold text-left 2xl:text-lg ">
                        Product Name
                      </span>
                      <span className="m-1 mr-auto text-base font-normal 2xl:text-lg">
                        {prodDetails ? prodDetails.productName : "-"}
                      </span>
                    </div>
                    <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-9">
                      <span className="m-1 mr-auto text-base font-semibold text-left 2xl:text-lg">
                        Product Code
                      </span>
                      <span className="m-1 mr-auto text-base font-normal 2xl:text-lg">
                        {prodDetails ? prodDetails.productCode : "-"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative flex flex-col w-full mt-8 text-base 2xl:text-lg">
                  <div className="flex flex-row justify-around">
                    <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                      <span className="2xl:text-[18px] text-base text-left font-semibold mr-auto m-1 ">
                        MRP Price
                      </span>
                      <span className="m-1 mr-auto font-normal">
                        ₹{prodDetails ? prodDetails.mrpPrice : "-"}
                      </span>
                    </div>
                    <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                      <span className="mt-1 mr-auto text-base font-semibold text-left 2xl:text-lg">
                        Retail Price
                      </span>
                      <span className="mt-2 mr-auto font-normal ">
                        ₹{prodDetails ? prodDetails.retailPrice : "-"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row justify-around mt-10">
                    <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                      <span className="m-1 mr-auto font-semibold text-left">
                        Product Category
                      </span>
                      <span className="m-1 mr-auto font-normal ">
                        {prodDetails ? prodDetails.productCategory : "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default Products;

//
