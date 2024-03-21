import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { FormContext } from "../../Contexts/FormContext";
import { Drawer, Progress, Spin } from "antd";

export default function Schemes() {
  const [scheme, setScheme] = useState([]);
  const { baseUrl } = React.useContext(FormContext);
  const [loading, setLoading] = React.useState(true);
  const [showScheme, setShowScheme] = React.useState(false);

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

  const sendScheme = async () => {
    setShowScheme(true);
  };

  const onCloseScheme = async () => {
    setShowScheme(false);
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
            {scheme ? (
              scheme
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
                            <th
                              scope="col"
                              className="py-3.5 pl-4 text-left sm:pl-0"
                            >
                              Product
                            </th>
                            <th
                              scope="col"
                              className="hidden ml-[-40px]  py-3.5 text-right sm:table-cell"
                            >
                              Code
                            </th>
                            <th
                              scope="col"
                              className="hidden  px-3 py-3.5 text-right sm:table-cell"
                            >
                              Qty
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 invisible pl-3 pr-4 text-right sm:pr-0"
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
                                className="border-solid border-b-1"
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
                                    onClick={sendScheme}
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
              ></textarea>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
