import { Divider, Drawer } from "antd";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import CustIncomeDetails from "../incomeDetails/CustIncomeDetails";
import { FormContext } from "../../Contexts/FormContext";
const CustomerEmployment = ({ onClose }) => {
  const [employDetails, setEmployDetails] = React.useState({
    industryType: "",
    employerName: "",
    workEmail: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [custIncDrawer, setCustIncDrawer] = React.useState(false);
  const { baseUrl } = React.useContext(FormContext)

  const onCloseCustIncDrawer = () => {
    setCustIncDrawer(false);
  };
  const showError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post(
        `${baseUrl}/Hospitals/addemploy`,
        {
          industryType: employDetails.industryType,
          employerName: employDetails.employerName,
          workEmail: employDetails.workEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: "include",
        }
      );
      const json = await response.data;
      console.log(json);
      if (json.status === "success") {
        setCustIncDrawer(true);
      }
    } catch (err) {
      console.log(err)
      showError(err.response.data.message);
    }
    setSubmitting(false);
  };
  const handleChange = (e) => {
    setEmployDetails({ ...employDetails, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        open={!custIncDrawer}
        width={700}
        className="border-solid border-2 border-aliceblue border-t-0 border-b-0 border-r-0 "
      >
        {submitting && (
          <div
            className="bg-blue h-1 absolute top-0 left-0 right-0"
            style={{ width: "100%", animation: "loading-bar 2s infinite" }}
          ></div>
        )}
        <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
        <svg
            className="h-8 w-8 text-black cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={onClose}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col ml-7 mt-8 font-Poppins">
            <span className="text-2xl 2xl:text-3xl font-bold mt-4">Employment Details</span>
            <span className="text-lg 2xl:text-xl font-normal mt-4">
              Tell us about customer's employment details.
            </span>
          </div>
          <div className="w-[600px] ">
            <div className="flex w-full flex-row items-end px-7 pr-10 mt-6">
              <input
                type="text"
                name="industryType"
                id="industryType"
                className="block w-full mt-1 font-normal text-lg 2xl:text-xl text-blue p-2 border-solid border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Industry  Type"
                value={employDetails.industryType}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex w-full flex-row items-end px-7 pr-10 mt-6">
              <input
                type="text"
                name="employerName"
                id="employerName"
                className="block w-full mt-1 font-normal text-lg 2xl:text-xl  text-blue p-2 border-solid border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Employer Name"
                value={employDetails.employerName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex w-full flex-row items-end px-7 pr-10 mt-6">
              <input
                type="email"
                name="workEmail"
                id="workEmail"
                className="block w-full mt-1 font-normal text-lg 2xl:text-xl text-blue p-2 border-solid border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Work Email"
                value={employDetails.workEmail}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="w-full block absolute bottom-3 right-0">
            <Divider className="bg-blue mr-auto" />
            <div className="flex justify-end ">
              <button
                className=" bg-white text-blue border-solid border-1 border-aliceblue rounded-xl w-[150px] h-[55px] mx-1 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-lightBlue"
                onClick={onClose}
              >
                <span className="text-base 2xl:text-lg font-bold">CANCEL</span>
              </button>
              <button
                className=" bg-blue text-white border-solid border-1 border-lightBlue rounded-xl w-[150px] h-[55px] mr-5 ml-2 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue"
                type="submit"
              >
                <span className="text-base 2xl:text-lg font-bold">NEXT</span>
              </button>
            </div>
          </div>
        </form>
      </Drawer>
      {custIncDrawer && <CustIncomeDetails onClose={onCloseCustIncDrawer} />}
      {submitting && (
        <div className="fixed inset-0 bg-gray-500 opacity-75 z-50"></div>
      )}
      <ToastContainer />
    </>
  );
};

export default CustomerEmployment;
