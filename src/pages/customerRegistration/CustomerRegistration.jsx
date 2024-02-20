import React from "react";
import Aadhar from "../Aadhar/Aadhar";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { FormContext } from "../../Contexts/FormContext";
import '../../styles/Shimmering.css'
// import { Drawer, Progress, Spin } from "antd";

const CustomerRegistration = () => {
  const [customers, setCustomers] = React.useState("");
  // const [showCustomerdDtails, setShowCustomerdDtails] = React.useState(false);
  // const [custDetails, setCustDetails] = React.useState(null);
  const [drawers, setDrawers] = React.useState(false);
  const [loading, setLoading] = React.useState(true)
  const { isFormSubmitted } = React.useContext(FormContext);
  const { baseUrl } = React.useContext(FormContext)
  const onCloseAadhaar = () => {
    setDrawers(false);
  };
  const fetchCustomers = async () => {
    console.log(process.env.REACT_APP_ENV)
    try {
      const response = await axios.get(`${baseUrl}/Hospitals/getallcustomers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: "include",
      });
      setLoading(false);
      const data = response.data;
      setCustomers(data.data);
    } catch (err) {
      console.error(err);
    }
  };
  // const onClose = () => {
  //   setShowCustomerdDtails(false);
  //   setCustDetails(null);
  // };
  // const handleClick = async (id) => {
  //   setShowCustomerdDtails(true);
  //   console.log(id);
  //   console.log(custDetails);
  //   try {
  //     const response = await axios.get(
  //       `${baseUrl}/Hospitals/selectCustomers/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //         withCredentials: "include",
  //       }
  //     );
  //     const data = response.data;
  //     console.log(data);
  //     setCustDetails(data.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  React.useEffect(() => {
    fetchCustomers();
    if (isFormSubmitted) {
      setDrawers(false);
      fetchCustomers();
    }
    /*eslint-disable */
  }, [isFormSubmitted]);
  return (
    <>
      <div className="w-[95vw] pb-14 relative">
        <div className="flex flex-row w-full text-[28px] font-bold pt-4 pl-[5vw]">
          Customers
        </div>
        <div className=" flex mx-[5vw] max-w-[90vw] w-full h-[35px] mt-[10px]  rounded-lg border-1 border-solid border-aliceblue bg-transparent justify-start items-center">
          <div className="flex ml-2">
            <BsSearch size={16} color="#306FC7" />
          </div>
          <div className="flex flex-grow pr-3">
            <input
              type="search"
              className="block text-sm w-full px-[6px] py-[0.15rem] leading-[1.6] border-none outline-none placeholder:text-aliceblue "
              id="searchBar"
              placeholder="Search.."
            />
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 align-middle ml-[5vw] mt-6 gap-5">
            <div className="flex max-w-[90vw] w-full h-[90px] border-1 border-solid border-aliceblue bg-white rounded-lg items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300">
              <div className="w-[45px] h-[45px] ml-2 rounded-full shimmer" />
              <div className="flex flex-col justify-center items-center p-3">
                <div className="w-[140px] h-[20px] mb-1 shimmer" />
                <div className="w-[110px] h-[18px] shimmer mr-auto" />
              </div>
              <div className="flex flex-col content-end justify-center items-center ml-auto mr-5">
                <div className="w-[70px] h-[20px] shimmer" />
              </div>
            </div>
            <div className="flex max-w-[90vw] w-full h-[90px] border-1 border-solid border-aliceblue bg-white rounded-lg items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300">
              <div className="w-[45px] h-[45px] ml-2 rounded-full shimmer" />
              <div className="flex flex-col justify-center items-center p-3">
                <div className="w-[140px] h-[20px] mb-1 shimmer" />
                <div className="w-[110px] h-[18px] shimmer mr-auto" />
              </div>
              <div className="flex flex-col content-end justify-center items-center ml-auto mr-5">
                <div className="w-[70px] h-[20px] shimmer" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 align-middle ml-[5vw] mt-6 gap-5">
          {
            customers ?
              customers
                .slice()
                .reverse()
                .map((customer, index) => (
                  <div
                    className={`flex max-w-[90vw] w-full h-[90px] border-1 border-solid border-aliceblue bg-lightBlue rounded-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300`}
                    onClick={() => handleClick(customer._id)}
                    key={index}
                  >
                    <div className="flex w-[45px] my-auto ml-2 flex-row items-start rounded-full overflow-hidden">
                      <img
                        src={
                          customer.profileImage
                            ? `${process.env.REACT_APP_API_URL_IMAGE}/${customer.profileImage}`
                            : "./user.png"
                        }
                        alt="profilePic"
                        className="w-[45px] h-[45px] rounded-full"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center px-3 text-left">
                      <span className="text-[14px] text-left font-semibold mr-auto">
                        {customer.name}
                      </span>
                      <span className="text-[14px] mr-auto">
                        {customer.phone}
                      </span>
                    </div>
                    <div className="flex flex-col text-[14px] content-end justify-center items-center ml-auto mr-4">
                      {/* <span className="text-right ml-auto w-[15px]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#306FC7" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                      </span> */}
                      {
                        customer.status ? 
                        <div className="text-green">
                          Approved
                        </div>
                        :
                        <div className="text-red">
                          Pending
                        </div>
                      }
                    </div>
                  </div>
                ))
              : <div className="flex w-full h-screen justify-center items-end text-base">
              No customers found.
            </div>
          }
          </div>
        )}
        <button
          className="border text-white text-2xl bg-blue border-solid w-[60px] h-[60px] border-blue rounded-full cursor-pointer bottom-12 fixed right-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          type="button"
          onClick={() => setDrawers(true)}
        >
          +
        </button>
      </div>
      {/* <Drawer
          placement="right"
          closable={false}
          onClose={onClose}
          open={showCustomerdDtails}
          key="rightCustomerDetails"
          width={window.innerWidth < 768 ? window.innerWidth : 700}
        >
          <div className="flex mt-[10px] flex-row justify-start items-start">
            <svg
              className="h-8 w-8 text-black cursor-pointer"
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
          <div className="flex flex-row mt-3">
            <span className="2xl:text-3xl text-2xl  font-extrabold mt-4">
              Customer Details
            </span>
          </div>
          {custDetails === null ? (
            <>
              <div className="fixed inset-0 bg-gray-500 opacity-100 z-50"></div>
              <div className=" flex justify-center items-center w-full h-full transition ease-in delay-300 ">
                <Spin size="large" />
              </div>
            </>
          ) : (
            <div>
              <div className="flex max-w-[95vw] py-8 mt-8 h-full flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg">
                <div className="flex flex-row w-full">
                  <div className="flex w-[60px] h-[60px] ml-[20px] flex-row items-start rounded-full overflow-hidden">
                    <img
                      className="w-[60px] h-[60px] "
                      src={`${process.env.REACT_APP_API_URL_IMAGE}/${custDetails.topInfo.profileImage}`}
                      alt="user"
                    />
                  </div>
                  <div className="flex flex-col m-3 mx-5">
                    <span className="text-base 2xl:text-lg text-left font-semibold mr-auto">
                      {custDetails.topInfo.name ? custDetails.topInfo.name : ""}
                    </span>
                    <span className="2xl:text-base text-sm font-normal">
                      {custDetails.topInfo.phone
                        ? custDetails.topInfo.phone
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col w-full mt-8 text-base 2xl:text-lg relative">
                  <div className="flex flex-row justify-around">
                    <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                      <span className="2xl:text-[18px] text-base text-left font-semibold mr-auto m-1 ">
                        Addressline 1
                      </span>
                      <span className="font-normal mr-auto m-1">
                        {custDetails.topInfo.line1
                          ? custDetails.topInfo.line1
                          : ""}
                      </span>
                    </div>
                    <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                      <span className="2xl:text-lg text-base  text-left font-semibold mr-auto mt-1">
                        Addressline 2
                      </span>
                      <span className=" font-normal mr-auto mt-2">
                        {custDetails.topInfo.line2
                          ? custDetails.topInfo.line2
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row justify-around mt-10">
                    <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                      <span className="text-left font-semibold mr-auto m-1">
                        State
                      </span>
                      <span className=" font-normal mr-auto m-1">
                        {custDetails.topInfo.state
                          ? custDetails.topInfo.state
                          : ""}
                      </span>
                    </div>
                    <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                      <span className=" text-left font-semibold mr-auto mt-1">
                        Pincode
                      </span>
                      <span className="font-normal mr-auto mt-2">
                        {custDetails.topInfo.pincode
                          ? custDetails.topInfo.pincode
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row w-full justify-around mt-10">
                    <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                      <span className=" text-left font-semibold mr-auto m-1">
                        Approval Status
                      </span>
                      <span className=" font-normal mr-auto m-1">
                      {custDetails?.topInfo?.aproovedStatus ? "Approved" : "Pending"}
                      </span>
                    </div>
                    <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                      <span className=" text-left font-semibold mr-auto mt-1">
                        Aadhar No
                      </span>
                      <span className=" text-left font-normal mr-auto mt-2">
                        {custDetails.topInfo.aadhaarnumber
                          ? custDetails.topInfo.aadhaarnumber
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {custDetails.topInfo.aproovedStatus ? (
                <div>
                  <div className="flex flex-row mt-6">
                    <div className="block">
                      <span className="2xl:text-3xl text-2xl text-left font-extrabold mr-auto">
                        Credit Limit
                      </span>
                    </div>
                    <div className="block ml-auto p-4 text-left">
                      <span className="text-sm 2xl:text-base font-normal">
                        Available Limit-₹
                        {custDetails.creditLimit - custDetails.creditUsed}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row w-full justify-center items-center">
                    <div className="block relative">
                      <Progress
                        percent={
                          (custDetails.creditUsed / custDetails.creditLimit) *
                          100
                        }
                        size={window.innerWidth < 768 ? [window.innerWidth*0.9,30] :[600, 30]}
                        showInfo={false}
                      />
                      {custDetails.creditUsed > 0 &&
                      custDetails.creditUsed < custDetails.creditLimit ? (
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: `${
                              (custDetails.creditUsed /
                                custDetails.creditLimit) *
                              100
                            }%`,
                            transform: "translate(-50%, -50%)",
                            fontSize: "10px",
                            color: "#000",
                            marginTop: "20px",
                          }}
                        >
                          ₹
                          {custDetails.creditUsed}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-row w-full mt-1">
                    <div className="block text-sm 2xl:text-base ml-0">
                      ₹00
                    </div>
                    <div className="block ml-auto text-sm 2xl:text-base mr-2">
                      ₹
                      {custDetails.creditLimit}
                    </div>
                  </div>
                  <div className="flex flex-row mt-5 ">
                    <div className="block">
                      <span className="text-2xl 2xl:text-3xl text-left font-extrabold mr-auto">
                        Ongoing Transactions
                      </span>
                    </div>
                  </div>
                  {custDetails.creditUsed ? (
                    <div className="w-full h-[55px] bg-lightBlue border-1 border-solid border-blue rounded-lg flex flex-row items-center mt-6">
                      <span className="text-base ml-5">
                        Transaction ID - {custDetails.onGoingTreatments}
                      </span>
                      <span className="ml-auto mr-5 text-red text-base">
                        Pending
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-row w-full mt-8 mb-10 justify-center items-center 2xl:text-lg text-base">
                      <div className="block">No Ongoing Transactions</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-[600px] h-[55px] bg-lightYellow border-1 border-solid border-yellow rounded-lg flex flex-row items-center ml-6">
                  <span className="text-base 2xl:text-lg text-yellow ml-5">
                    The Account is under processing.
                  </span>
                </div>
              )}
            </div>
          )}
        </Drawer> */}
      {drawers && <Aadhar onClose={onCloseAadhaar} visible={drawers} />}
      <footer className="p-2 pl-[5vw] bg-lightBlue text-blue text-left bottom-0 fixed right-0 left-0 text-[10px]">
      © 2023 Copyright Storelink 
      </footer>
    </>
  )
};

export default CustomerRegistration;
