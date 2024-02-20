import React from "react";
import Sidebar from "../../components/Sidebar";
import { Drawer, Progress, Spin } from "antd";
import axios from "axios";
import Aadhar from "../Aadhar/Aadhar";
import { FormContext } from "../../Contexts/FormContext";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import Footer from "../../components/Footer";
import NewCustomer from "../registerUser/NewCustomer";

const Customers = () => {
  const [showCustomerdDtails, setShowCustomerdDtails] = React.useState(false);
  const [custDetails, setCustDetails] = React.useState(null);
  const [customers, setCustomers] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [drawers, setDrawers] = React.useState(false);
  const { baseUrl } = React.useContext(FormContext);
  console.log(baseUrl);
  let navigate = useNavigate();
  const onCloseAadhaar = () => {
    setDrawers(false);
  };
  const { isFormSubmitted } = React.useContext(FormContext);
  const onClose = () => {
    setShowCustomerdDtails(false);
    setCustDetails(null);
  };
  const handleClick = async (id) => {
    setShowCustomerdDtails(true);
    console.log(id);
    console.log(custDetails);
    try {
      const response = await axios.get(
        `${baseUrl}/Hospitals/selectCustomers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: "include",
        }
      );
      const data = response.data;
      console.log(data);
      setCustDetails(data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchCustomers = async () => {
    console.log(process.env.REACT_APP_ENV);
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
      <div className="flex w-full relative">
        <div className="fixed top-0 bottom-0">
          <Sidebar />
        </div>
        <div className="w-full mt-[39px] 2xl:ml-[220px] ml-[195px]">
          <div
            className="grid grid-cols-3 px-[40px] 2xl:px-[68px]"
            style={{ gridTemplateColumns: "200px auto 180px" }}
          >
            <div className="flex text-black mr-auto">
              <span className="text-2xl 2xl:text-3xl font-bold text-left">
                Customers
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
                <div className="w-[55px] h-[55px] ml-[20px] rounded-full shimmer" />
                <div className="flex flex-col justify-center items-center p-6">
                  <div className="w-[180px] h-[20px] mb-1 shimmer" />
                  <div className="w-[150px] h-[18px] shimmer" />
                </div>
                <div className="flex flex-col content-end justify-center items-center ml-auto mr-11">
                  <div className="w-[30px] h-[30px] shimmer" />
                </div>
              </div>
              <div className="flex max-w-[765px] w-full h-[90px] border-1 border-solid border-aliceblue bg-white rounded-lg items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300">
                <div className="w-[55px] h-[55px] ml-[20px] rounded-full shimmer" />
                <div className="flex flex-col justify-center items-center p-6">
                  <div className="w-[180px] h-[20px] mb-1 shimmer" />
                  <div className="w-[150px] h-[18px] shimmer" />
                </div>
                <div className="flex flex-col content-end justify-center items-center ml-auto mr-11">
                  <div className="w-[30px] h-[30px] shimmer" />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 align-middle py-[40px] px-[40px] 2xl:px-[68px] gap-5">
              {customers ? (
                customers
                  .slice()
                  .reverse()
                  .map((customer, index) => (
                    <div
                      className={`flex max-w-[765px] w-full h-[90px] border-1 border-solid border-aliceblue bg-lightBlue rounded-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300`}
                      onClick={() => handleClick(customer._id)}
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
                      <div className="flex flex-col justify-center items-center p-6 text-left">
                        <span className="2xl:text-xl text-lg text-left font-semibold mr-auto">
                          {customer.name}
                        </span>
                        <span className="2xl:text-lg text-[16px] mr-auto">
                          {customer.phone}
                        </span>
                      </div>
                      <div className="flex flex-col content-end justify-center items-center ml-auto mr-11">
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
                  No customers found.
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
          {drawers && (
            <NewCustomer onClose={onCloseAadhaar} visible={drawers} />
          )}
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            open={showCustomerdDtails}
            key="rightCustomerDetails"
            width={700}
          >
            <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
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
            <div className="flex flex-row ml-5 mt-3">
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
                <div className="flex max-w-[600px] py-8 mb-8 h-full flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5">
                  <div className="flex flex-row w-full">
                    {/* <div className="flex w-[75px] h-[75px] ml-[20px] flex-row items-start rounded-full overflow-hidden">
                      <img
                        className="w-[75px] h-[75px] "
                        src={`${process.env.REACT_APP_API_URL_IMAGE}/${custDetails.topInfo.profileImage}`}
                        alt="user"
                      />
                    </div> */}
                    <div className="flex flex-col m-4 pl-3">
                      <span className="text-base 2xl:text-lg text-left font-semibold mr-auto">
                        {custDetails.topInfo.name
                          ? custDetails.topInfo.name
                          : ""}
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
                    {/* <div className="flex flex-row w-full justify-around mt-10">
                      <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                        <span className=" text-left font-semibold mr-auto m-1">
                          Approval Status
                        </span>
                        <span className=" font-normal mr-auto m-1">
                          {custDetails?.topInfo?.aproovedStatus
                            ? "Approved"
                            : "Pending"}
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
                    </div> */}
                  </div>
                </div>
                {custDetails.topInfo.aproovedStatus ? (
                  <div>
                    <div className="flex flex-row ml-5 mt-3">
                      <div className="block">
                        <span className="2xl:text-3xl text-2xl text-left font-extrabold mr-auto">
                          Credit Limit
                        </span>
                      </div>
                      <div className="block ml-auto p-5 mr-3 text-left">
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
                          size={[600, 30]}
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
                              fontSize: "14px",
                              color: "#000",
                              marginTop: "20px",
                            }}
                          >
                            ₹{custDetails.creditUsed}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-row w-full mt-2">
                      <div className="block text-sm 2xl:text-base ml-4">
                        ₹00
                      </div>
                      <div className="block ml-auto text-sm 2xl:text-base mr-8">
                        ₹{custDetails.creditLimit}
                      </div>
                    </div>
                    <div className="flex flex-row ml-5 mt-3 ">
                      <div className="block">
                        <span className="text-2xl 2xl:text-3xl text-left font-extrabold mr-auto">
                          Ongoing Transactions
                        </span>
                      </div>
                    </div>
                    {custDetails.creditUsed ? (
                      <div className="w-[600px] h-[55px] bg-lightBlue border-1 border-solid border-blue rounded-lg flex flex-row items-center ml-6 mt-6">
                        <span className="text-base 2xl:text-lg ml-5">
                          Transaction ID - {custDetails.onGoingTreatments}
                        </span>
                        <span className="ml-auto mr-5 text-red text-base 2xl:text-lg ">
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
          </Drawer>
        </div>
      </div>
      <footer className="bottom-0 fixed right-0 2xl:left-[226px] left-[198px] ">
        <Footer />
      </footer>
    </>
  );
};

export default Customers;
