import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Divider, Drawer } from "antd";
import PanVerify from "../panCardVerification/PanVerify";
import { FormContext } from "../../Contexts/FormContext";
const CustIncomeDetails = ({ onClose }) => {
  const [incDetails, setIncDetails] = React.useState({
    monthlyTakeHomeAmount: "",
    exisitingEmi: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [custPanDrawer, setCustPanDrawer] = React.useState(false)
  const { baseUrl } = React.useContext(FormContext)

  const onCloseCustPanDrawer = () =>{
    setCustPanDrawer(false);
  }

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
        `${baseUrl}/Hospitals/addincome`,
        {
          monthlyTakeHomeAmount: incDetails.monthlyTakeHomeAmount,
          exisitingEmi: incDetails.exisitingEmi,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: "include",
        }
      );
      if (response.data.status === "success") {
        setCustPanDrawer(true)
      }
    } catch (err) {
      showError(err.response.data.message);
    }
    setSubmitting(false);
  };

  const handleChange = (e) => {
    setIncDetails({ ...incDetails, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        open={!custPanDrawer}
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
            <span className="text-2xl 2xl:text-3xl font-bold mt-4">
            Income Details
            </span>
            <span className="text-lg 2xl:text-xl font-normal mt-4">
            Tell us about customer's income details.
            </span>
          </div>
          <div className="w-[600px] ">
            <div className="flex w-full flex-row items-end px-7 pr-10 mt-6">
              <input
                type="number"
                name="monthlyTakeHomeAmount"
                id="monthlyTakeHomeAmount"
                className="block w-full mt-1 font-normal text-lg text-blue p-2 2xl:text-xl px-2 border-blue bg-lightBlue border-1 border-t-0 border-x-0 text-left placeholder-blue outline-transparent"
                placeholder="Monthly Take Home Amount"
                value={incDetails.monthlyTakeHomeAmount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex w-full flex-row items-end px-7 pr-10 mt-6">
              <input
                type="number"
                name="exisitingEmi"
                id="exisitingEmi"
                className="block w-full mt-1 font-normal text-lg text-blue p-2 2xl:text-xl px-2 border-blue bg-lightBlue border-1 border-t-0 border-x-0 text-left placeholder-blue outline-transparent"
                placeholder="Existing Monthly EMIs (If Any)"
                value={incDetails.exisitingEmi}
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
      {
        custPanDrawer && <PanVerify onClose={onCloseCustPanDrawer}/>
      }
      {submitting && (
        <div className="fixed inset-0 bg-gray-500 opacity-75 z-50"></div>
      )}
      <ToastContainer />
    </>
  );
};

export default CustIncomeDetails;
