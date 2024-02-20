import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Divider, Drawer } from "antd";
import ImageVerification from "../ImageVerfication/ImageVerification";
import { FormContext } from "../../Contexts/FormContext";
import CustomButton from "../../components/CustomButton";
import CreditLimit from "../../components/CreditLimit";
const VerifyPhnNum = ({ onClose, phone, verifyKey }) => {
  const [otp, setOtp] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [custProfDrawer, setCustProfDrawer] = React.useState(false);
  const { baseUrl } = React.useContext(FormContext);

  const onCloseCustProfDrawer = () => {
    setCustProfDrawer(false);
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
        `${baseUrl}/Hospitals/verifyOtp`,
        {
          verifyKey: verifyKey,
          otp: otp,
          phone: phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: "include",
        }
      );

      const json = response.data;
      console.log(json);

      if (json.status === "success") {
        setCustProfDrawer(true);
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
        open={!custProfDrawer}
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
          <div className="flex flex-col md:ml-7 mt-8 font-Poppins">
            <span className="text-2xl 2xl:text-3xl font-bold mt-4">
              Verify Phone Number
            </span>
            <span className="text-[14px] md:text-lg font-normal mt-4">
              Enter the 6-digit code that we sent to your phone number to finish
              your authentication.
            </span>
          </div>
          <div className="block mt-5 md:ml-7">
            <input
              type="text"
              name="name"
              className="w-[80vw] md:w-[575px] h-[35px] font-Poppins p-2 text-base md:text-lg text-blue border-1 border-solid border-blue placeholder-blue outline-none bg-lightBlue border-x-0 border-t-0"
              placeholder="Verify OTP"
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
                secondButtonHandleClick={() => setCustProfDrawer(true)}
                isSubmit={false}
              />
            </div>
          </div>
        </form>
      </Drawer>
      {custProfDrawer && <CreditLimit onClose={onCloseCustProfDrawer} />}
      {submitting && (
        <div className="fixed inset-0 bg-gray-500 opacity-100 z-50"></div>
      )}
      <ToastContainer />
    </>
  );
};

export default VerifyPhnNum;
