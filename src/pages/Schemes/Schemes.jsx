import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { FormContext } from "../../Contexts/FormContext";
import { Drawer, Progress, Spin } from "antd";
import { useNavigate } from "react-router-dom";

export default function Schemes() {
  const [scheme, setScheme] = useState([]);
  const { baseUrl } = React.useContext(FormContext);
  const [loading, setLoading] = React.useState(true);
  const [showScheme, setShowScheme] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");
  const [productId, setProductId] = React.useState("");
  const [custId, setcustId] = React.useState("");

  let navigate = useNavigate();

  const [schemeDetails, setSchemeDetails] = React.useState({
    schemeTitle: "",
    schemeDesc: "",
  });

  const handleChange = async (e) => {
    setSchemeDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const findSchemes = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/Hospitals/schemes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: "include",
      });
      setScheme(data);
      setLoading(false);
    } catch (error) {
      throw error;
      setLoading(false);
    }
  };

  const sendScheme = async (prodId, custId) => {
    setProductId(prodId);
    setcustId(custId);
    setShowScheme(true);
  };

  const onCloseScheme = async () => {
    setShowScheme(false);
  };

  const filteredScheme = scheme.filter((scheme) => {
    return scheme.custName.toLowerCase().includes(searchInput.toLowerCase());
  });
  // console.log(filteredScheme);

  const updateScheme = async () => {
    try {
      await axios.put(
        `${baseUrl}/Hospitals/updateScheme?custId=${custId}&productId=${productId}`,
        schemeDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: "include",
        }
      );
    } catch (error) {
      throw error;
    } finally {
      setSchemeDetails({
        schemeTitle: "",
        schemeDesc: "",
      });
    }
  };

  useEffect(() => {
    findSchemes();
  }, []);
  return (
    <div className="relative flex w-full">
      <div className="fixed top-0 bottom-0">
        <Sidebar />
      </div>
      <div className="w-full mt-[39px] 2xl:ml-[220px] ml-[195px] ">
        <div
          className="grid grid-cols-3 px-[40px] 2xl:px-[68px]"
          style={{ gridTemplateColumns: "200px auto 180px" }}
        >
          <div className="flex mr-auto text-black">
            <span className="text-2xl font-bold text-left 2xl:text-3xl">
              Schemes
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
          <div className="grid grid-cols-2 align-middle py-[40px] px-[40px] 2xl:px-[68px] gap-5">
            {filteredScheme ? (
              filteredScheme
                .slice()
                .reverse()
                .map((customer, index) => (
                  <div
                    className={`flex flex-col max-w-[765px] w-full  border-1 border-solid border-aliceblue bg-lightBlue rounded-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300`}
                    // onClick={() => handleClick(customer._id)}
                    key={index}
                  >
                    <div className="flex flex-col items-center justify-center p-6 text-left">
                      <span className="mr-auto text-lg font-semibold text-left 2xl:text-xl">
                        {customer.custName}
                      </span>
                      <span className="2xl:text-lg text-[16px] mr-auto">
                        {customer.custPhone}
                      </span>
                    </div>
                    <div className="flex flex-col items-center content-end justify-center ml-auto mr-11">
                      {/* <span className="text-right ml-auto w-[15px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="#306FC7"
                            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                          />
                        </svg>
                      </span> */}
                    </div>
                    {/* table */}
                    <div className="flex max-w-[600px] mb-8 h-full flex-col">
                      <table className="min-w-full">
                        <thead className="text-gray-900">
                          <tr className="py-1 pl-2 pr-2 bg-gray-50">
                            <th scope="col" className="pl-4 text-left sm:pl-0">
                              Product
                            </th>
                            <th
                              scope="col"
                              className="hidden ml-[-40px]   text-right sm:table-cell"
                            >
                              Code
                            </th>
                            <th
                              scope="col"
                              className="hidden px-3 text-right sm:table-cell"
                            >
                              Qty
                            </th>
                            <th
                              scope="col"
                              className="invisible pl-3 pr-4 text-right sm:pr-0"
                            >
                              send offer
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {customer.products &&
                            customer.products.map((inventory, index) => (
                              <tr
                                key={index}
                                className="border-solid border-b-1 "
                              >
                                <td className="py-5 pl-4 pr-10 text-sm sm:pl-0 max-w-0">
                                  <div className="text-base font-medium text-gray-900">
                                    {inventory.productName}
                                  </div>
                                </td>
                                <td className="py-5 pl-4 pr-10 text-sm sm:pl-0 max-w-0">
                                  <div className="text-base font-medium text-gray-900">
                                    {inventory.productCode}
                                  </div>
                                </td>

                                <td className="table-cell px-3 py-5 text-base text-right text-gray-600">
                                  {inventory.quantity}
                                </td>

                                <td className="py-5 pl-3 pr-4 text-base text-right text-gray-600 sm:pr-0">
                                  <button
                                    className="px-2 py-1 text-white cursor-pointer bg-blue disabled:opacity-40 disabled:cursor-not-allowed"
                                    //   disabled={inventory.quantity > 5}
                                    onClick={() =>
                                      sendScheme(
                                        inventory.productId,
                                        customer.custId
                                      )
                                    }
                                  >
                                    Send scheme
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
            ) : (
              <div className="flex w-full justify-center items-end pt-[200px] pl-[200px] text-lg 2xl:text-xl">
                No customers found.
              </div>
            )}
          </div>
        )}
      </div>

      <Drawer
        placement="right"
        closable={false}
        onClose={onCloseScheme}
        open={showScheme}
        key="rightSchemeDetails"
        width={700}
      >
        <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
          <div className="flex justify-between w-full ">
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
              onClick={onCloseScheme}
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <line x1="18" y1="6" x2="6" y2="18" />{" "}
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col mt-3 ml-5">
          <span className="mt-4 text-2xl font-extrabold 2xl:text-3xl">
            Scheme Details
          </span>
          <div className="flex flex-col pr-6 mt-10 gap-y-4">
            <div className="flex flex-col gap-y-3">
              <label htmlFor="schemeTitle" className="font-semibold">
                Title
              </label>
              <input
                type="text"
                name="schemeTitle"
                id="schemeTitle"
                className="w-full p-2 text-xl font-medium focus:outline-none"
                onChange={handleChange}
                value={schemeDetails.schemeTitle}
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <label htmlFor="schemeDesc" className="font-semibold">
                Description
              </label>
              <textarea
                name="schemeDesc"
                id="schemeDesc"
                cols="30"
                rows="10"
                className="w-full p-2 text-sm font-normal focus:outline-none"
                onChange={handleChange}
                value={schemeDetails.schemeDesc}
              ></textarea>
            </div>

            <div className="w-full">
              <button
                className="px-4 py-2 text-white cursor-pointer bg-aliceblue"
                onClick={updateScheme}
              >
                Send scheme
              </button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
