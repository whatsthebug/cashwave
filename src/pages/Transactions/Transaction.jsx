import React from "react";
import Sidebar from "../../components/Sidebar";
import "./transaction.css";
import { Divider, Drawer, Progress, Spin } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../Contexts/FormContext";
import { BsSearch } from "react-icons/bs";
import CustomerIdDrawer from "./CustomerIdDrawer";
import Viewer from "react-viewer";
import { Document, Page } from "react-pdf";
import Footer from "../../components/Footer";
import CustomButton from "../../components/CustomButton";
import GenerateInvoice from "../../components/generateInvoice";
import "react-toastify/dist/ReactToastify.css";

const Transaction = () => {
  const [selectCustomer, setSelectCustomer] = React.useState(false); //for displaying select Customer drawer
  const [showCustomerdDtails, setShowCustomerdDtails] = React.useState(false); //to display Customer details
  const [showTreatments, setShowTreatments] = React.useState(false); //to display treatments drawer
  const [showPlans, setShowPlans] = React.useState(false); //to display plans drawer
  const [showSubmit, setShowSubmit] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);
  const [approvedCust, setApprovedCust] = React.useState([]);
  const [custDetails, setCustDetails] = React.useState(null);
  const [treatments, setTreatments] = React.useState([]);
  const [selectedTreatment, setSelectedTreatment] = React.useState({
    code: "",
    name: "",
  });
  const [custIdDrawer, setCustIdDrawer] = React.useState(false);
  const [showInvoice, setShowInvoice] = React.useState(false);
  const [cost, setCost] = React.useState("");
  const [id, setId] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState("");
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [selectedMonth, setSelectedMonth] = React.useState(null);
  const [selectPlan, setSelectPlan] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [eligible, setEligible] = React.useState(false);
  const [selectedId, setselectedId] = React.useState(null);
  const [amounts, setAmounts] = React.useState({
    settled: "0",
    unsettled: "0",
  });
  const { baseUrl } = React.useContext(FormContext);
  const [submitting, setSubmitting] = React.useState(false);
  const [particularTransaction, setParticularTransaction] =
    React.useState(null);
  let navigate = useNavigate();

  const handleTreatments = async () => {
    setShowTreatments(true);
    setShowCustomerdDtails(false);
    const response = await axios.get(`${baseUrl}/Hospitals/gettreatements`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: "include",
    });
    const data = response.data;
    setTreatments(data.data);
  };
  const handleCustomerDetails = async (id) => {
    setShowCustomerdDtails(true);
    setSelectCustomer(false);
    try {
      const response = await axios.get(
        `${baseUrl}/Hospitals/selectCustomer?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: "include",
        }
      );
      setId(id);
      const data = response.data;
      console.log(data);
      setEligible(data.elegible);
      setCustDetails(data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const onCloseCustIdDrawer = () => {
    setCustIdDrawer(false);
    setParticularTransaction(null);
  };

  const onClose = () => {
    setSelectCustomer(false);
    setShowSubmit(false);
  };
  const onCloseCustomerDetails = () => {
    setSelectCustomer(true);
    setCustDetails(null);
    setShowCustomerdDtails(false);
  };

  const onCloseTreatments = () => {
    setShowTreatments(false);
    setShowCustomerdDtails(true);
    setShowInvoice(false);
  };
  const onClosePlans = () => {
    setShowPlans(false);
    setShowTreatments(true);
  };

  const handleInvoiceClick = () => {
    setShowTreatments(false);
    setShowInvoice(true);
  };
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await axios.post(
        `${baseUrl}/Hospitals/selectplan/`,
        {
          phone: custDetails.phone,
          days: selectPlan[selectedMonth].days,
          totalInterest: Math.round(selectPlan[selectedMonth].totalInterest),
          convinienceFee: Math.round(selectPlan[selectedMonth].convinienceFee),
          totalPayable: Math.round(selectPlan[selectedMonth].totalPayable),
          totalReceivable: Math.round(
            selectPlan[selectedMonth].totalReceivable
          ),
          lenderTransferAmount: Math.round(
            selectPlan[selectedMonth].lenderTransferAmount
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: "include",
        }
      );
      const data = response.data;
      if (data.status === "success") {
        setShowSubmit(true);
        setShowPlans(false);
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Hospitals/gettransactions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: "include",
      });

      const data = response.data;
      console.log(data);
      setTransactions(data.data);
      setAmounts({ settled: data.settled, unsettled: data.unsettled });
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  const handlePlans = async () => {
    setShowPlans(true);
    setShowTreatments(false);
    try {
      const response = await axios.get(`${baseUrl}/Hospitals/getinterests`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: "include",
      });
      const data = response.data;
      setSelectPlan(data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = treatments.find(
      (treatment) => treatment.code == selectedValue
    );

    if (selectedOption) {
      const updatedTreatment = {
        code: selectedOption.code,
        name: selectedOption.name,
      };
      setSelectedTreatment(updatedTreatment);
    }
  };

  const getParticularTransaction = async (id) => {
    var Id = String(id).split("#").join("");
    try {
      const response = await axios.get(
        `${baseUrl}/Hospitals/selecttransactions?trnId=%23${Id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: "include",
        }
      );

      const data = response.data;
      console.log(data.data);
      setParticularTransaction(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitTreatments = async (event) => {
    event.preventDefault();
    console.log(selectedTreatment);
    setSubmitting(true);
    const formdata = new FormData();
    formdata.append("invoice", selectedFile);
    formdata.append("id", id);
    formdata.append("treatmentCode", selectedTreatment.code);
    formdata.append("treatmentCost", cost);
    // formdata.append("treatmentName", selectedTreatment.name);
    try {
      const response = await axios.post(
        `${baseUrl}/Hospitals/transactioninitiate`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: "include",
        }
      );
      const data = response.data;
      console.log(data);
      if (data.status === "Success") {
        handlePlans();
        setSubmitting(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        position: "top-right",
      });
      setSubmitting(false);
    }
  };
  const handleClick = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Hospitals/getaprooved`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: "include",
      });
      const data = response.data;
      console.log(data);
      setApprovedCust(data.data);
    } catch (err) {
      console.error(err);
    }
  };
  React.useEffect(() => {
    fetchTransactions();
    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/Hospitals/searchAprooved?phone=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: "include",
          }
        );
        const data = response.data;
        setApprovedCust(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (searchQuery.trim() !== "") {
      handleSearch();
    } else {
      handleClick();
    }
  }, [searchQuery]);

  return (
    <>
      <div className="relative flex w-full font-poppins">
        <div className="fixed top-0 bottom-0">
          <Sidebar />
        </div>
        <div className="w-full mt-[30px] 2xl:ml-[220px] xl:ml-[195px]">
          <div
            className="grid grid-cols-3 items-center px-[48px] 2xl:px-[68px]"
            style={{ gridTemplateColumns: "350px auto 180px" }}
          >
            <div className="flex flex-row 2xl:max-w-[450px] max-w-[350px] w-full text-black">
              <div className="flex flex-col items-start justify-center pr-4">
                <span className="text-base font-normal 2xl:text-lg">
                  Settled Amount
                </span>
                <span className="text-xl font-bold 2xl:text-2xl ">
                  <span>₹</span>
                  <span className={`${loading ? "shimmer bg-lightBlue" : ""}`}>
                    {amounts.settled}
                  </span>
                </span>
              </div>
              <div className="flex flex-col items-start justify-center pr-1">
                <span className="text-base font-normal 2xl:text-lg ">
                  Unsettled Amount
                </span>
                <span className="text-xl font-bold 2xl:text-2xl ">
                  <span>₹</span>
                  <span className={`${loading ? "shimmer bg-lightBlue" : ""}`}>
                    {amounts.unsettled}
                  </span>
                </span>
              </div>
            </div>
            <div className=" flex ml-auto mr-5  max-w-[550px] 2xl:max-w-[600px] w-full h-[32px]   rounded-lg border-1 border-solid border-aliceblue bg-transparent justify-start items-center">
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
                    // localStorage.setItem("token", null);
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
            <div className="flex px-[40px] 2xl:px-[60px] pb-6">
              <table cellSpacing="0" className="w-full mt-4">
                <thead>
                  <tr className="border-solid 2xl:text-lg text-base border-1 border-aliceblue bg-lightBlue rounded-lg h-[50px]">
                    <td className="flex items-center w-full pl-[10px] max-w-[20px] 2xl:w-[30px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-circle-dashed"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="#306FC7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="text-blue"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
                        <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
                        <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
                        <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
                        <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
                        <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
                        <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
                        <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
                      </svg>
                    </td>
                    <td className="max-w-[150px] w-full">Transaction ID</td>
                    <td className="pr-4 2xl:max-w-[160px] max-w-[200px] w-full relative flex items-center">
                      <span className="absolute justify-start align-middle left-14 2xl:left-10">
                        Name
                      </span>
                    </td>
                    <td className="max-w-[100px] w-full relative flex items-center">
                      <span className="justify-start w-full absolute left-[-2.8rem] 2xl:left-1 align-middle">
                        Phone No
                      </span>
                    </td>
                    {/* <td className="pr-6 2xl:pr-2 max-w-[200px]  w-full">
                      Treatment
                    </td> */}
                    <td className="max-w-[100px]  w-full relative flex items-center">
                      <span className="absolute justify-start w-full 2xl:left-4 -left-3">
                        Amount
                      </span>
                    </td>
                    <td className="pl-2 max-w-[140px] w-full">Date</td>
                    <td className="pr-6 max-w-[80px] xl:max-w-[100px] w-full">
                      <span className="mr-auto">Status</span>
                    </td>
                  </tr>
                </thead>
                <tbody className="text-xl bg-white border-2 border-solid rounded-lg border-aliceblue">
                  <tr
                    className={`text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] -mt-1 shimmer`}
                  >
                    <td colSpan="8"></td>
                  </tr>
                  <tr
                    className={`text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-4 shimmer`}
                  >
                    <td colSpan="8"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex px-[40px] 2xl:px-[60px] pb-6">
              <table cellSpacing="0" className="w-full mt-4">
                <thead>
                  <tr className="border-solid 2xl:text-lg text-base border-1 border-aliceblue bg-lightBlue rounded-lg h-[50px]">
                    <td className="flex items-center w-full pl-[10px] max-w-[20px] 2xl:w-[30px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-circle-dashed"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="#306FC7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="text-blue"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
                        <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
                        <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
                        <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
                        <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
                        <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
                        <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
                        <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
                      </svg>
                    </td>
                    <td className="max-w-[150px] w-full">Transaction ID</td>
                    <td className="pr-4 2xl:max-w-[160px] max-w-[200px] w-full relative flex items-center">
                      <span className="absolute justify-start align-middle left-14 2xl:left-10">
                        Name
                      </span>
                    </td>
                    <td className="max-w-[100px] w-full relative flex items-center">
                      <span className="justify-start w-full absolute left-[-2.8rem] 2xl:left-1 align-middle">
                        Phone No
                      </span>
                    </td>
                    {/* <td className="pr-6 2xl:pr-2 max-w-[200px]  w-full">
                      Treatment
                    </td> */}
                    <td className="max-w-[100px]  w-full relative flex items-center">
                      <span className="absolute justify-start w-full 2xl:left-4 -left-3">
                        Amount
                      </span>
                    </td>
                    <td className="pl-2 max-w-[140px] w-full">Date</td>
                    <td className="pr-6 max-w-[80px] xl:max-w-[100px] w-full">
                      <span className="mr-auto">Status</span>
                    </td>
                  </tr>
                </thead>
                <tbody className="text-base bg-white border-solid rounded-lg 2xl:text-lg border-1 border-aliceblue">
                  {transactions.length > 0 ? (
                    transactions
                      .slice()
                      .reverse()
                      .map((transaction, index) => (
                        <tr
                          className={` border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] ${
                            index === 0 ? "-mt-1" : "mt-4"
                          }`}
                          key={transaction.trnId}
                        >
                          {transaction.status ? (
                            <td className="pl-3 flex items-center pr-2 w-full max-w-[20px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="#306FC7"
                                  d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                                />
                              </svg>
                            </td>
                          ) : (
                            <td className="pl-3 pr-2 flex items-center w-full max-w-[20px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="#306FC7"
                                  d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                                />
                              </svg>
                            </td>
                          )}
                          <td
                            className="pr-2 max-w-[100px] w-full cursor-pointer"
                            style={{ color: "#416EC1" }}
                            onClick={() => {
                              setCustIdDrawer(true);
                              setselectedId(transaction.trnId);
                              getParticularTransaction(transaction.trnId);
                            }}
                          >
                            {transaction.trnId || ""}
                          </td>
                          <td className=" pl-4 max-w-[150px] 2xl:max-w-[200px] w-full truncate">
                            {transaction.customerId &&
                            transaction.customerId.name
                              ? transaction.customerId.name
                              : ""}
                          </td>
                          <td className="pr-4  max-w-[100px] w-full">
                            {transaction.customerId &&
                            transaction.customerId.phone
                              ? transaction.customerId.phone
                              : ""}
                          </td>
                          {/* <td className="max-w-[160px] 2xl:max-w-[200px] w-full">
                            <div className="flex  truncate text-blue text-center items-center border-solid border-1 border-blue bg-lightBlue rounded-2xl h-[40px] px-3 ">
                              <span className="m-auto">
                                {transaction.treatmentName
                                  ? transaction.treatmentName
                                  : ""}
                              </span>
                            </div>
                          </td> */}
                          <td className="max-w-[100px] w-full">
                            <span>₹{transaction.hospitalAmount || ""}</span>
                          </td>
                          <td className=" max-w-[140px] w-full truncate">
                            {new Date(transaction.date).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </td>
                          {transaction.status ? (
                            <td className="text-green  max-w-[120px] w-full">
                              Processed
                            </td>
                          ) : transaction.lenderStatus ? (
                            <td className="text-yellowgreen max-w-[120px]  w-full">
                              Processing
                            </td>
                          ) : (
                            <td className="text-red pr-5 max-w-[100px] w-full">
                              Pending
                            </td>
                          )}
                        </tr>
                      ))
                  ) : (
                    <div className="flex w-full justify-center items-end pt-[200px] text-lg 2xl:text-xl">
                      Nothing to display.
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <button
            className="border text-white text-2xl bg-blue border-solid w-[80px] h-[80px] border-blue rounded-full cursor-pointer bottom-12 fixed right-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            type="button"
            onClick={() => {
              handleClick();
              setSelectCustomer(!selectCustomer);
            }}
          >
            +
          </button>
          {custIdDrawer && (
            <CustomerIdDrawer
              onClose={onCloseCustIdDrawer}
              open={custIdDrawer}
              transaction={particularTransaction}
            />
          )}
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            open={selectCustomer}
            key="right"
            width={700}
            className="border-2 border-t-0 border-b-0 border-r-0 border-solid border-aliceblue font-Poppins"
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
                Select Customer
              </span>
            </div>
            <div className=" flex w-[600px] h-[37px] ml-5 mt-6 rounded-lg border-solid border-1 border-aliceblue bg-transparent justify-center items-center">
              <div className="flex ml-1">
                <BsSearch size={24} color="#306FC7" />
              </div>
              <div className="flex items-center justify-start">
                <input
                  type="search"
                  className="block text-lg w-[550px] px-2 py-[0.20rem] leading-[1.6] border-none outline-none placeholder:text-aliceblue "
                  id="searchBar"
                  placeholder="Search.."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 p-5 mt-5 align-middle">
              {approvedCust ? (
                approvedCust
                  .slice()
                  .reverse()
                  .map((customer) => (
                    <div className="flex w-[600px] py-3 border-1 border-solid border-aliceblue bg-lightBlue rounded-lg ">
                      {/* <div className="flex w-[75px] h-[75px] ml-[20px] flex-row items-start rounded-full overflow-hidden ">
                        <img
                          className="w-[75px] h-[75px]"
                          src={`${process.env.REACT_APP_API_URL_IMAGE}/${customer.profileImage}`}
                          alt="user"
                        />
                      </div> */}
                      <div className="flex flex-col items-center justify-center px-6 text-left">
                        <span className="mr-auto text-base font-semibold 2xl:text-lg">
                          {customer.name || ""}
                        </span>
                        <span className="mr-auto text-sm 2xl:text-base">
                          {customer.phone}
                        </span>
                      </div>
                      <div className="flex justify-center items-center max-w-[20px] w-full ml-auto mr-11">
                        <span
                          className="text-right ml-auto cursor-pointer max-w-[15px] w-full"
                          onClick={() => handleCustomerDetails(customer._id)}
                        >
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
                      </div>
                    </div>
                  ))
              ) : (
                <>
                  <div className="fixed inset-0 z-50 bg-gray-500 opacity-100"></div>
                  <div className="flex items-center justify-center w-full my-auto transition ease-in delay-300 ">
                    <Spin size="large" />
                  </div>
                </>
              )}
            </div>
          </Drawer>
          <Drawer
            placement="right"
            closable={false}
            onClose={onCloseCustomerDetails}
            open={showCustomerdDtails}
            key="rightCustomerDetails"
            width={700}
            className="border-2 border-t-0 border-b-0 border-r-0 border-solid border-aliceblue "
          >
            <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
              <svg
                className="w-8 h-8 text-black cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={onCloseCustomerDetails}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
            <div className="flex flex-row mt-3 ml-5">
              <span className="mt-4 text-2xl font-extrabold 2xl:text-3xl">
                Customer Details
              </span>
            </div>
            {custDetails === null ? (
              <>
                <div className="fixed inset-0 z-50 bg-gray-500 opacity-100"></div>
                <div className="flex items-center justify-center w-full h-full transition ease-in delay-300 ">
                  <Spin size="large" />
                </div>
              </>
            ) : (
              <div>
                <div className="flex w-[600px] py-8 flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5 relative">
                  <div className="flex flex-row w-full">
                    {/* <div className="flex w-[75px] h-[75px] ml-[20px] items-start rounded-full overflow-hidden">
                      <img
                        className="w-[75px] h-[75px] "
                        src={`${process.env.REACT_APP_API_URL_IMAGE}/${custDetails.profileImage}`}
                        alt="user"
                      />
                    </div> */}
                    <div className="flex flex-col pl-3 m-4">
                      <span className="mr-auto text-base font-semibold text-left 2xl:text-lg">
                        {custDetails.name ? custDetails.name : ""}
                      </span>
                      <span className="text-sm font-normal 2xl:text-base">
                        {custDetails.phone}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col w-full mt-8 text-base 2xl:text-lg">
                    <div className="flex flex-row justify-around">
                      <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                        <span className="m-1 mr-auto font-semibold text-left ">
                          Addressline 1
                        </span>
                        <span className="m-1 mr-auto font-normal ">
                          {custDetails.customerLocation.line1}
                        </span>
                      </div>
                      <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                        <span className="m-1 mr-auto font-semibold text-left ">
                          Addressline 2
                        </span>
                        <span className="m-1 mr-auto font-normal">
                          {custDetails.customerLocation.line2}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row justify-around w-full mt-10">
                      <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                        <span className="m-1 mr-auto font-semibold text-left ">
                          State
                        </span>
                        <span className="m-1 mr-auto text-lg font-normal">
                          {custDetails.customerLocation.state}
                        </span>
                      </div>
                      <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                        <span className="m-1 mr-auto font-semibold text-left">
                          Pincode
                        </span>
                        <span className="m-1 mr-auto font-normal text-left">
                          {custDetails.customerLocation.pincode}
                        </span>
                      </div>
                    </div>
                    {/* <div className="flex flex-row justify-around w-full mt-10">
                      <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                        <span className="m-1 mr-auto font-semibold text-left ">
                          Marital Status
                        </span>
                        <span className="m-1 mr-auto font-normal ">
                          {custDetails.maritialStatus}
                        </span>
                      </div>
                      <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                        <span className="m-1 mr-auto font-semibold text-left ">
                          Aadhar No
                        </span>
                        <span className="m-1 mr-auto font-normal text-left">
                          {custDetails.aadhaar}
                        </span>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="pb-[100px]">
                  <div className="flex flex-row mt-3 ml-5">
                    <div className="block">
                      <span className="mr-auto text-2xl font-extrabold text-left 2xl:text-3xl">
                        Credit Limit
                      </span>
                    </div>
                    <div className="block p-5 ml-auto mr-3 text-left">
                      <span className="text-[10px] 2xl:text-sm font-normal">
                        Available Limit-₹
                        {custDetails.creditLimit - custDetails.creditUsed}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center w-full">
                    <div className="relative block">
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
                            fontSize: "12px",
                            color: "#000",
                            marginTop: "18px",
                          }}
                        >
                          ₹{custDetails.creditUsed}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-row w-full mt-1">
                    <div className="block 2xl:text-sm text-[10px] ml-2 ">
                      ₹ 00
                    </div>
                    <div className="block ml-auto 2xl:text-sm text-[10px] ">
                      ₹{custDetails.creditLimit}
                    </div>
                  </div>
                  <div className="flex flex-row mt-5 ml-5 ">
                    <div className="block">
                      <span className="mr-auto text-2xl font-extrabold text-left 2xl:text-3xl">
                        Ongoing Transactions
                      </span>
                    </div>
                  </div>
                  {custDetails.creditUsed ? (
                    <div className="w-[600px] h-[55px] bg-lightBlue border-1 border-solid border-blue rounded-lg flex flex-row items-center ml-6 mt-6">
                      <span className="ml-5 text-base 2xl:text-lg">
                        Transaction ID -{custDetails?.pendingTransaction?.trnId}
                      </span>
                      <span className="ml-auto mr-5 text-base text-red 2xl:text-lg">
                        Pending
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-row w-full mt-8 mb-[120px] justify-center items-center">
                      <div className="block text-lg 2xl:text-xl">
                        No Ongoing Transactions
                      </div>
                    </div>
                  )}
                </div>
                {!eligible ? (
                  <div className="w-[600px] h-[55px] bg-lightYellow border-1 border-solid border-yellow rounded-lg flex flex-row items-center ml-6 mt-[45px] mb-[100px] relative">
                    <span className="ml-5 text-xl text-yellow">
                      Not eligible because of the ongoing pending transactions.
                    </span>
                  </div>
                ) : null}
              </div>
            )}
            {/* <hr className="mr-auto bg-blue left-0 bottom-[80px] w-full"/> */}
            <div className="w-[99.7%] block absolute bottom-0 right-0 bg-white ml-0">
              <Divider className="mt-0 mr-auto bg-blue" />
              <div className="flex justify-end w-full pb-4 mr-8">
                <CustomButton
                  firstButton="CANCEL"
                  secondButton="NEXT"
                  firstButtonHandleClick={onCloseCustomerDetails}
                  secondButtonHandleClick={handleTreatments}
                  isSubmit={false}
                />
              </div>
              {/* <div className="flex justify-end ">
                <button
                  className=" bg-white text-blue border-solid border-1 border-aliceblue rounded-xl w-[150px] h-[55px] mx-2 mb-3 cursor-pointer transition duration-300 ease-in-out hover:bg-lightBlue"
                  onClick={onCloseCustomerDetails}
                >
                  <span className="text-xl font-bold">CANCEL</span>
                </button>
                <button
                  className={` bg-blue text-white border-solid border-1 border-lightBlue rounded-xl w-[150px] h-[55px] mx-5 mb-3 bottom-3 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue ${
                    !eligible ? "opacity-67 cursor-not-allowed hover:bg-blue" : ""
                  }`}
                  onClick={handleTreatments}
                  disabled={!eligible}
                >
                  <span className="text-xl font-bold">NEXT</span>
                </button>
              </div> */}
            </div>
          </Drawer>
          <Drawer
            placement="right"
            closable={false}
            onClose={onCloseTreatments}
            open={showTreatments}
            key="rightTreatments"
            width={700}
            className="border-2 border-t-0 border-b-0 border-r-0 border-solid border-aliceblue "
          >
            <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
              <svg
                className="w-8 h-8 text-black cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={onCloseTreatments}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
            {/* <div className="block mt-8 ml-5">
              <span className="mt-4 text-2xl font-extrabold 2xl:text-3xl">
                Select Invoice
              </span>
            </div> */}
            <form onSubmit={handleSubmitTreatments}>
              {/* <div className="flex w-[600px] h-[55px] p-5">
                <select
                  id="treatment"
                  name="name"
                  className="block w-full px-4 text-lg font-normal text-left rounded-lg outline-none 2xl:text-xl border-aliceblue border-1 bg-lightBlue text-blue"
                  // onClick={selectTreatments}
                  defaultValue=""
                  value={selectedTreatment.code}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Treatment</option>
                  {treatments &&
                    treatments?.map((treatment) => (
                      <option key={treatment.code} value={treatment.code}>
                        {treatment.name}
                      </option>
                    ))}
                </select>
              </div> */}
              <div className="block mt-5 ml-5">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-extrabold 2xl:text-2xl">
                    Upload Invoice
                  </span>
                  <button
                    className="px-4 py-2 text-white cursor-pointer bg-aliceblue"
                    onClick={handleInvoiceClick}
                  >
                    Generate invoice
                  </button>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center border-solid border-1 rounded-lg mr-auto ml-auto bg-lightBlue border-aliceblue mt-7 w-[600px] h-[200px]">
                {previewUrl ? (
                  previewUrl.endsWith(".pdf") ? (
                    <Document file={previewUrl}>
                      <Page pageNumber={1} />
                    </Document>
                  ) : (
                    <img src={previewUrl} alt="Preview" />
                  )
                ) : (
                  <label
                    htmlFor="invoice"
                    className="text-lg font-normal cursor-pointer 2xl:text-xl text-blue"
                  >
                    Choose File
                  </label>
                )}
                <input
                  type="file"
                  id="invoice"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setSelectedFile(file);
                    const reader = new FileReader();
                    reader.onload = () => {
                      setPreviewUrl(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }}
                  required
                />
              </div>
              <div className="block mt-12 ml-5">
                <span className="text-xl font-extrabold 2xl:text-2xl">
                  Invoice Cost
                </span>
              </div>
              <div className="block mt-5 ml-7">
                <span className="text-xl text-blue">₹</span>
                <input
                  type="number"
                  className="w-[575px] h-[50px] mx-3 2xl:text-xl text-lg text-blue border-1 border-solid border-blue placeholder-blue bg-lightBlue border-x-0 border-t-0 outline-none"
                  placeholder="Invoice Cost"
                  onChange={(e) => {
                    const newCost = e.target.value;
                    if (newCost > custDetails.creditLimit) {
                      toast.error(
                        "Invoice cost can't exceed the credit limit!",
                        { position: "top-right" }
                      );
                    }
                    setCost(newCost);
                  }}
                  required
                />
              </div>

              {/* <hr className="mr-auto bg-blue left-0 bottom-[80px] w-full"/> */}
              <div className="absolute right-0 block w-full bottom-3">
                <Divider className="mr-auto bg-blue" />
                <div className="flex justify-end w-full pb-4 mr-8">
                  <CustomButton
                    firstButton="CANCEL"
                    secondButton="NEXT"
                    firstButtonHandleClick={onCloseTreatments}
                    secondButtonHandleClick={() => setShowPlans(true)}
                    isSubmit={false}
                  />
                </div>
                {/* <div className="flex justify-end ">
                  <button
                    className=" bg-white text-blue border-solid border-1 border-aliceblue rounded-xl w-[150px] h-[55px] mx-2 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-lightBlue"
                    onClick={onCloseTreatments}
                  >
                    <span className="text-xl font-bold">CANCEL</span>
                  </button>
                  <button
                    className=" bg-blue text-white border-solid border-1 border-lightBlue rounded-xl w-[150px] h-[55px] mx-5 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue"
                    type="submit"
                    // onClick={()=>setShowPlans(true)}
                  >
                    <span className="text-xl font-bold">NEXT</span>
                  </button>
                </div> */}
              </div>
            </form>
          </Drawer>

          <GenerateInvoice
            showInvoice={showInvoice}
            setShowInvoice={setShowInvoice}
            setShowTreatments={setShowTreatments}
            custDetails={custDetails}
          />

          {submitting && (
            <div className="fixed inset-0 z-50 bg-gray-500 opacity-100"></div>
          )}
          <Drawer
            placement="right"
            closable={false}
            onClose={onClosePlans}
            open={showPlans}
            key="rightPlans"
            width={700}
            className="border-2 border-t-0 border-b-0 border-r-0 border-solid border-aliceblue"
          >
            <div className="relative w-full h-screen">
              <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
                <svg
                  className="w-8 h-8 text-black cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={onClosePlans}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </div>
              <div className="block mt-8 ml-5">
                <span className="mt-4 text-2xl font-extrabold 2xl:text-3xl">
                  Select Plans
                </span>
              </div>
              <div className="grid font-Poppins grid-cols-2 w-[600px] gap-7 p-5 mb-">
                <div
                  className={`flex flex-col w-[260px] h-[170px] bg-lightBlue rounded-lg justify-center items-center cursor-pointer ${
                    selectedMonth === "fifteen"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedMonth("fifteen")}
                >
                  <span className="text-xl 2xl:text-2xl text-blue">
                    15 Days
                  </span>
                  <span className="text-sm 2xl:text-base ">1% interest</span>
                  {/* <span className="text-sm 2xl:text-base">per month</span> */}
                </div>
                <div
                  className={`flex flex-col w-[260px] h-[170px]  bg-lightBlue rounded-lg justify-center items-center cursor-pointer ${
                    selectedMonth === "thirty"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedMonth("thirty")}
                >
                  <span className="text-xl 2xl:text-2xl text-blue">
                    30 Days
                  </span>
                  <span className="text-sm 2xl:text-base">2% interest</span>
                </div>
                <div
                  className={`flex flex-col w-[260px] h-[170px] bg-lightBlue rounded-lg justify-center items-center cursor-pointer ${
                    selectedMonth === "fourtyFive"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedMonth("fourtyFive")}
                >
                  <span className="text-xl 2xl:text-2xl text-blue">
                    45 Days
                  </span>
                  <span className="text-sm 2xl:text-base">3% interest</span>
                </div>
                <div
                  className={`flex flex-col w-[260px] h-[170px] bg-lightBlue rounded-lg justify-center items-center cursor-pointer ${
                    selectedMonth === "sixty"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedMonth("sixty")}
                >
                  <span className="text-xl 2xl:text-2xl text-blue">
                    60 Days
                  </span>
                  <span className="text-sm 2xl:text-base">4% interest</span>
                </div>
                <div
                  className={`flex flex-col w-[260px] h-[170px] bg-lightBlue rounded-lg justify-center items-center cursor-pointer ${
                    selectedMonth === "seventyFive"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedMonth("seventyFive")}
                >
                  <span className="text-xl 2xl:text-2xl text-blue">
                    75 Days
                  </span>
                  <span className="text-sm 2xl:text-base">5% interest</span>
                </div>
                <div
                  className={`flex flex-col w-[260px] h-[170px] bg-lightBlue rounded-lg justify-center items-center cursor-pointer ${
                    selectedMonth === "ninety"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedMonth("ninety")}
                >
                  <span className="text-xl 2xl:text-2xl text-blue">
                    90 Days
                  </span>
                  <span className="text-sm 2xl:text-base">6% interest</span>
                </div>
              </div>

              <div className="block ml-5">
                <span className="mt-4 text-2xl font-extrabold 2xl:text-3xl">
                  Amount Payable
                </span>
              </div>
              <div className="flex w-[580px] py-4 justify-around items-center font-Poppins border-1 border-solid border-aliceblue bg-lightBlue rounded-lg mt-5 ml-5 ">
                <div className="flex flex-col ml-10 mr-auto text-lg 2xl:text-xl text-blue">
                  <span className="mb-3">Invoice Cost</span>
                  {/* <span className="mb-3">Total Interest</span>
                    <span className="mb-3">Convenience Fee</span> */}
                  {/* <span className="mb-2">EMI</span> */}
                  <span className="mb-2 text-black">Total Payable</span>
                </div>
                <div className="flex flex-col ml-auto mr-10 text-lg 2xl:text-xl text-blue">
                  <span className="mb-3 ">
                    ₹{selectedMonth ? selectPlan.invoiceCost : "0"}
                  </span>
                  {/* <span className="mb-3 ">
                      
                      {selectedMonth
                        ? selectPlan[selectedMonth].totalInterest
                        : "0"}%
                    </span>
                    <span className="mb-3 ">
                      ₹
                      {selectedMonth
                        ? selectPlan[selectedMonth].convinienceFee
                        : "0"}
                    </span> */}
                  {/* <span className="mb-3 ">
                      ₹
                      {selectedMonth
                        ? Math.round(selectPlan[selectedMonth].emi)
                        : "0"}
                    </span> */}
                  <span className="mb-2 text-black">
                    ₹
                    {selectedMonth
                      ? selectPlan[selectedMonth].totalPayable
                      : "0"}
                  </span>
                </div>
              </div>
              <div className="block mt-4 ml-5">
                <span className="mt-4 text-2xl font-extrabold 2xl:text-3xl">
                  Amount Receivable
                </span>
              </div>
              <div className="pb-[150px]">
                <div className="flex w-[580px] py-4  justify-around items-center font-Poppins border-1 border-solid border-aliceblue bg-lightBlue rounded-lg mt-5 ml-5 ">
                  <div className="flex flex-col ml-10 mr-auto text-lg 2xl:text-xl text-blue">
                    <span className="mb-3">Invoice Amount</span>
                    <span className="mb-3">Total Interest</span>
                    <span className="mb-3">Convenience Fee</span>
                    <span className="mb-3 text-black">Total Receivable</span>
                  </div>
                  <div className="flex flex-col ml-auto mr-10 text-lg 2xl:text-xl text-blue">
                    <span className="mb-3 ">
                      ₹{selectedMonth ? selectPlan.invoiceCost : "0"}
                    </span>
                    <span className="mb-3 ">
                      -
                      {selectedMonth
                        ? selectPlan[selectedMonth].totalInterest
                        : "0"}
                      %
                    </span>
                    <span className="mb-3 ">
                      -
                      {selectedMonth
                        ? selectPlan[selectedMonth].convinienceFee
                        : "0"}
                      %
                    </span>
                    <span className="mb-2 text-black">
                      ₹
                      {selectedMonth
                        ? selectPlan[selectedMonth].totalReceivable
                        : "0"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <hr className="mr-auto bg-blue left-0 bottom-[80px] w-full"/> */}
            <div className="w-[99.7%] block absolute bottom-0 right-0 bg-white ml-0">
              <Divider className="mt-0 mr-auto bg-blue" />
              <div className="flex justify-end w-full pb-4 mr-8">
                <CustomButton
                  firstButton="CANCEL"
                  secondButton="DONE"
                  firstButtonHandleClick={onClosePlans}
                  secondButtonHandleClick={() => setShowSubmit(true)}
                  isSubmit={false}
                />
              </div>
              {/* <div className="flex justify-end ">
                <button
                  className=" bg-white text-blue border-solid border-1 border-aliceblue rounded-xl w-[150px] h-[55px] mx-2 mb-3 cursor-pointer transition duration-300 ease-in-out hover:bg-lightBlue"
                  onClick={onClosePlans}
                >
                  <span className="text-xl font-bold">CANCEL</span>
                </button>
                <button
                  className=" bg-blue text-white border-solid border-1 border-lightBlue rounded-xl w-[150px] h-[55px] mx-5 mb-3 bottom-3 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue"
                  onClick={handleSubmit}
                >
                  <span className="text-xl font-bold">NEXT</span>
                </button>
              </div> */}
            </div>
          </Drawer>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            open={showSubmit}
            key="rightSubmit"
            width={700}
            className="border-2 border-t-0 border-b-0 border-r-0 border-solid border-aliceblue"
          >
            <div className="relative w-full">
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
              <div className="flex w-full justify-center pt-[80px] space-y-5 font-Poppins">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-[250px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#306FC7"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold 2xl:text-3xl">
                    Congratulations
                  </span>
                  <span className="w-[350px] break-words text-xl 2xl:text-2xl text-center">
                    Thanks for choosing Cashwave as your financial partner.
                  </span>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
      <footer className="bottom-0 absolute right-0 2xl:left-[226px] left-[198px] ">
        <Footer />
      </footer>
      <ToastContainer />
    </>
  );
};

export default Transaction;
