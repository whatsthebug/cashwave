import React from "react";
import Sidebar from "../../components/Sidebar";
import { DatePicker, Drawer, Spin } from "antd";
import axios from "axios";
import "../../styles/Shimmering.css";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FormContext } from "../../Contexts/FormContext";
import { BsSearch } from "react-icons/bs";

const Treatments = () => {
  const [showTreatmentsDetails, setShowTreatmentsDetails] =
    React.useState(false);
  const [treatments, setTreatments] = React.useState(null);
  const [selectedTreatment, setSelectedTreatment] = React.useState({
    name: "",
    code: "",
  });
  const [loading, setLoading] = React.useState(true);
  const [datePicker, setDatePicker] = React.useState(false);
  const currentDate = new Date();
  const [startDate, setStartDate] = React.useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  );
  const [endDate, setEndDate] = React.useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  );
  const [patients, setPatients] = React.useState("");
  const { baseUrl } = React.useContext(FormContext);
  let navigate = useNavigate();
  const showError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };
  const handleTreatmentsDetails = (code, name) => {
    setShowTreatmentsDetails(true);
    setSelectedTreatment({ name: name, code: code });
    setStartDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    );
    setEndDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    );
    // fetchParticularTreatment();
  };
  const onCloseTreatmentsDetails = () => {
    setShowTreatmentsDetails(false);
    setPatients("");
    setStartDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    );
    setEndDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    );
    setDatePicker(false);
  };
  const formatDate = (inputDateStr) => {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const inputDate = new Date(inputDateStr);
    inputDate.setUTCHours(inputDate.getUTCHours() + 5);
    inputDate.setUTCMinutes(inputDate.getUTCMinutes() + 30);
    const day = inputDate.getUTCDate();
    const month = months[inputDate.getUTCMonth()];
    const year = inputDate.getUTCFullYear();

    return `${day}-${month}-${year}`;
  };
  const fetchTreatments = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Hospitals/gettreatements`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: "include",
      });
      const data = response.data;
      console.log(data);
      setTreatments(data.data);
      setLoading(false);
    } catch (err) {
      showError(err.response.data.message);
    }
  };
  const backendFormatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    dateObj.setUTCHours(dateObj.getUTCHours() + 5);
    dateObj.setUTCMinutes(dateObj.getUTCMinutes() + 30);
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const fetchParticularTreatment = async () => {
    console.log(backendFormatDate(startDate));
    try {
      const response = await axios.get(
        `${baseUrl}/Hospitals/gettreatmentdetails/?code=${
          selectedTreatment.code
        }&startDate=${backendFormatDate(startDate)}&endDate=${backendFormatDate(
          endDate
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: "include",
        }
      );
      const data = response.data;
      console.log(data);
      setPatients(data.data);
    } catch (err) {
      console.error(err);
    }
  };
  React.useEffect(() => {
    if (startDate && endDate) {
      setDatePicker(false);
    }
    fetchTreatments();
    console.log(startDate);
    if (startDate && endDate) {
      setDatePicker(false);
    }
    if (showTreatmentsDetails) {
      fetchParticularTreatment();
    }
  }, [selectedTreatment]);

  return (
    <div className="flex w-full relative">
      <div className="fixed top-0 bottom-0">
        <Sidebar />
      </div>
      <div className="w-full mt-[30px] 2xl:ml-[220px] xl:ml-[195px]">
        <div className="grid grid-cols-3  px-[68px]" style={{ gridTemplateColumns: "200px auto 180px" }}>
          <div className="flex text-black mr-auto">
            <span className="text-2xl 2xl:text-3xl font-bold text-left">
              Treatments
            </span>
          </div>
          <div className=" flex ml-auto mr-5 2xl:mt-2 max-w-[550px] 2xl:max-w-[600px] w-full h-[32px] mt-1  rounded-lg border-1 border-solid border-aliceblue bg-transparent justify-start items-center">
            <div className="flex ml-2">
            <BsSearch size={24} color="#306FC7"/>
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
          <div className="flex w-[180px] justify-start items-center ml-auto" style={{ flex: "0 0 180px" }}>
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
                  localStorage.setItem("token", "");
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
          // <Loading />
          <div className="grid grid-cols-2 align-middle py-[40px] px-[68px] gap-5">
            <div className="flex max-w-[765px] h-[90px] border-1 border-solid border-aliceblue bg-white rounded-lg items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300">
              <div className="w-[55px] h-[55px] ml-[20px] rounded-full shimmer" />
              <div className="flex flex-col justify-center items-center p-5">
                <div className="w-[180px] h-[20px] mb-1 shimmer" />
                <div className="w-[150px] h-[18px] shimmer" />
              </div>
              <div className="flex flex-col content-end justify-center items-center ml-auto mr-11">
                <div className="w-[30px] h-[30px] shimmer" />
              </div>
            </div>
            {/* Create another shimmer block with the same format for the second item */}
            <div className="flex max-w-[765px] h-[90px] pr-5 border-1 border-solid border-aliceblue bg-white rounded-lg items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300">
              <div className="w-[55px] h-[55px] ml-[20px] rounded-full shimmer" />
              <div className="flex flex-col justify-center items-center p-5">
                <div className="w-[180px] h-[20px] mb-1 shimmer" />
                <div className="w-[150px] h-[18px] shimmer" />
              </div>
              <div className="flex flex-col content-end justify-center items-center ml-auto mr-11">
                <div className="w-[30px] h-[30px] shimmer" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 align-middle py-[40px] px-[68px] gap-5">
            {treatments &&
              treatments.map((treatment) => (
                <div
                  className="flex max-w-[765px] h-[90px] border-1 border-solid border-aliceblue bg-lightBlue rounded-lg items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300"
                  key={treatment.id}
                >
                  <div className="flex w-[55px] h-[55px] ml-[20px] border-2 border-solid border-aliceblue rounded-full flex-row justify-center items-center">
                    <img src={require("./nose.png")} alt="nose" />
                  </div>
                  <div className="flex flex-col justify-center items-center p-5 ">
                    <span className="text-xl text-left font-semibold mr-auto">
                      {treatment.name}
                    </span>
                    <span className="text-lg">
                      Treatment Code: {treatment.code}
                    </span>
                  </div>
                  <div className="flex flex-col content-end justify-center items-center ml-auto mr-11 max-w-[15px] w-full">
                    <span
                      className="text-right ml-auto max-w-[15px] w-full"
                      onClick={() =>
                        handleTreatmentsDetails(treatment.code, treatment.name)
                      }
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
              ))}
          </div>
        )}
        <Drawer
          placement="right"
          closable={false}
          onClose={onCloseTreatmentsDetails}
          open={showTreatmentsDetails}
          key="rightTreatments"
          width={700}
          className=" relativeborder-solid border-2 border-aliceblue border-t-0 border-b-0 border-r-0 "
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
              onClick={onCloseTreatmentsDetails}
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <line x1="18" y1="6" x2="6" y2="18" />{" "}
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <div className="block ml-5 mt-8 font-Poppins">
            <span className="2xl:text-3xl text-2xl font-bold mt-4">
              Treatment Details
            </span>
          </div>
          <div className="flex w-[600px] h-[95px] ml-5 mt-5 border-1 border-solid border-aliceblue bg-lightBlue rounded-lg items-center font-Poppins">
            <div className="flex w-[50px] h-[50px] ml-[20px] border-1 border-solid border-aliceblue rounded-full flex-row justify-center items-center">
              <img src={require("./nose.png")} alt="nose" />
            </div>
            <div className="flex flex-col justify-center items-center p-5 ">
              <span className="2xl:text-lg text-base text-left font-semibold mr-auto">
                {selectedTreatment.name}
              </span>
              <span className="2xl:text-base text-sm">
                Treatment Code - {selectedTreatment.code}
              </span>
            </div>
          </div>
          <div className="block ml-5 mt-8 font-Poppins">
            <span className="text-2xl 2xl:text-3xl font-bold mt-4">
              Treatment Summary
            </span>
          </div>
          <div className="flex flex-row relative">
            <div
              className="block text-left ml-6"
              onClick={() => setDatePicker(!datePicker)}
            >
              <span>
                {startDate &&
                  endDate &&
                  `${new Date(startDate).toLocaleDateString()} - ${new Date(
                    endDate
                  ).toLocaleDateString()}\t\t`}
              </span>
              {!datePicker && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  className="ml-2"
                >
                  <path
                    id="Vector"
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            {datePicker && (
              <div className="flex flex-row absolute top-0 left-[150px] w-full h-full z-10 ">
                <div className="flex flex-col ml-5 mt-4">
                  <span className="2xl:text-lg text-base font-bold mb-2">
                    Start Date:
                  </span>
                  <DatePicker
                    selected={
                      startDate
                        ? moment(startDate, "YYYY-MM-DD").toDate()
                        : null
                    }
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yy"
                    placeholderText="Select start date"
                    className="border-1 border-solid border-aliceblue rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col ml-5 mt-4">
                  <span className="text-base 2xl:text-lg font-bold mb-2">
                    End Date:
                  </span>
                  <DatePicker
                    selected={
                      endDate ? moment(endDate, "YYYY-MM-DD").toDate() : null
                    }
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select end date"
                    className="border-1 border-solid border-aliceblue rounded-md p-2"
                  />
                </div>
              </div>
            )}
            <div className="block mr-6 mt-1 font-Poppins 2xl:text-base  text-sm ml-auto">
              <span>Total Treatments {patients ? patients.length : 0}</span>
            </div>
          </div>
          <div
            className={`${datePicker ? "mt-[80px]" : "mt-3"} relative w-full`}
          >
            {patients ? (
              patients.map((patient) => (
                <div
                  className={`flex flex-row mt-3 ml-6 border-solid border-1 border-aliceblue bg-lightBlue w-[600px] h-[52px] rounded-lg items-center font-Poppins`}
                >
                  <span className="2xl:text-lg text-base mr-auto ml-3">
                    {patient.name}
                  </span>
                  <span className="2xl:text-lg text-base ml-auto mr-3">
                    {" "}
                    {formatDate(patient.date)}
                  </span>
                </div>
              ))
            ) : (
              <>
                <div className="fixed inset-0 bg-gray-500 opacity-100 z-50"></div>
                <div className=" flex justify-center items-center w-full h-full transition ease-in delay-300 ">
                  <Spin size="large" />
                </div>
              </>
            )}
          </div>
        </Drawer>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Treatments;
