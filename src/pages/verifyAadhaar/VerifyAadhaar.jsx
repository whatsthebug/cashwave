import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Divider, Drawer } from "antd";
import NewCustomer from "../registerUser/NewCustomer";
import { FormContext } from "../../Contexts/FormContext";
import CustomButton from "../../components/CustomButton";
const VerifyAadhar = ({ onClose }) => {
  const [otp, setOtp] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [custInfo, setCustInfo] = React.useState(false);
  const [custDetails,setCustDetails] = React.useState({name:"",dob:""})
  const { baseUrl } = React.useContext(FormContext)

  const showError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };
  const onCloseCustInfo = () => {
    setCustInfo(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post(
        `${baseUrl}/Hospitals/adhaarVerify`,
        {
          otp: otp,
          refid: JSON.parse(localStorage.getItem("refid")),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: "include",
        }
      );
      if (response.data.status === "Valid") {
        setCustInfo(true);
        setCustDetails({name:response.data.message.name,dob:response.data.message.dob})
      }
    } catch (err) {
      showError(err.response.data.message);
    }
    setSubmitting(false);
  };

  const handleChange = (e) => {
    setOtp(e.target.value);
  };
  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        open={!custInfo}
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
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:ml-7 mt-8 font-Poppins">
            <span className="text-2xl 2xl:text-3xl font-bold mt-4">
              Verify Aadhar Number
            </span>
            <span className="text-[14px] md:text-lg m font-normal mt-4">
              Enter the otp code that is sent to your phone number associated
              with aadhar number.
            </span>
          </div>
          <div className="block mt-5 md:ml-7">
            <input
              type="text"
              name="otp"
              className="w-[80vw] md:w-[575px] h-[35px] font-Poppins p-2 text-base md:text-lg text-blue border-1 border-solid border-blue placeholder-blue bg-lightBlue outline-none border-x-0 border-t-0"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full block absolute bottom-3 right-0">
            <Divider className="bg-blue mr-auto" />
            <div className="flex w-full justify-end mr-8 pb-4">
              <CustomButton
                firstButton="CANCEL"
                secondButton="NEXT"
                firstButtonHandleClick={onClose}
                secondButtonHandleClick={false}
                isSubmit={true}
              />
            </div>
          </div>
        </form>
      </Drawer>
      {custInfo && <NewCustomer onClose={onCloseCustInfo} custDetails={custDetails}/>}
      {submitting && (
        <div className="fixed inset-0 bg-gray-500 opacity-75 z-50"></div>
      )}
      <ToastContainer />
    </>
  );
};

export default VerifyAadhar;
