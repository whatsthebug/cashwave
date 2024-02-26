import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Divider, Drawer } from "antd";
import VerifyAadhar from "../verifyAadhaar/VerifyAadhaar";
import { FormContext } from "../../Contexts/FormContext";
import CustomButton from "../../components/CustomButton";
const Aadhar = ({ onClose }) => {
  const [aadhaar, setAadhaar] = React.useState("");
  const [verifyAadhaar, setVerifyAadhaar] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const { baseUrl } = React.useContext(FormContext);
  const onCloseVerifyAadhaar = () => {
    setVerifyAadhaar(false);
  };
  const showError = (response) => {
    toast.error(response, {
      position: "top-right",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post(
        `${baseUrl}/Hospitals/adhaarotp`,
        {
          aadhaar: aadhaar,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: "include",
        }
      );
      if (response.data.status) {
        setVerifyAadhaar(true);
        localStorage.setItem("refid", JSON.stringify(response.data.refid));
      } else {
        toast.error(response.data.message, {
          position: "top-right",
        });
      }
    } catch (err) {
      console.error(err);
      if (err.response.data.message === "Customer already registered") {
        toast.error("Customer already registered", {
          position: "top-right",
        });
      } else {
        showError(err.response.data.message);
      }
    }
    setSubmitting(false);
  };
  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        open={!verifyAadhaar}
        width={window.innerWidth < 768 ? window.innerWidth : 700}
        className="border-solid border-2 border-aliceblue border-t-0 border-b-0 border-r-0 "
      >
        {submitting && (
          <div
            className="bg-blue h-1 absolute top-0 left-0 right-0"
            style={{ width: "100%", animation: "loading-bar 2s infinite" }}
          ></div>
        )}
        <div className="flex mt-[10px] flex-row justify-start items-start md:ml-5">
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
        <form id="aadhaar" onSubmit={handleSubmit}>
          <div className="flex flex-col md:ml-7 mt-8 font-Poppins">
            <span className="text-2xl 2xl:text-3xl font-bold mt-4">
              Customer's Aadhar Number
            </span>
            <span className="text-[14px] md:text-lg font-normal mt-4">
              To proceed, please enter customer's aadhaar number.
            </span>
          </div>
          <div className="block mt-10 md:ml-7">
            <input
              type="text"
              name="name"
              className="w-[80vw] md:w-[575px] h-[35px] font-Poppins text-base p-2 md:text-lg text-blue border-1 border-solid outline-none border-blue placeholder-blue bg-lightBlue border-x-0 border-t-0"
              placeholder="Aadhaar Number"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              required
            />
          </div>
          <div className="w-full block absolute bottom-3 right-0">
            <Divider className="bg-blue mr-auto" />
            <div className="flex w-full justify-end mr-8 pb-4">
              <CustomButton
                firstButton="CANCEL"
                secondButton="VERIFY"
                firstButtonHandleClick={onClose}
                secondButtonHandleClick={false}
                isSubmit={true}
              />
            </div>
          </div>
        </form>
      </Drawer>
      {verifyAadhaar && <VerifyAadhar onClose={onCloseVerifyAadhaar} />}
      {submitting && (
        <div className="fixed inset-0 bg-gray-500 opacity-100 z-50"></div>
      )}
      <ToastContainer />
    </>
  );
};

export default Aadhar;
