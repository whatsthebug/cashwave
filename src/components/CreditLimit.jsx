import { Divider, Drawer } from "antd";
import React from "react";
import PanVerify from "../pages/panCardVerification/PanVerify";
import { ToastContainer, toast } from "react-toastify";
import { FormContext } from "../Contexts/FormContext";
import CustomButton from "./CustomButton";
import axios from "axios";
import ThankYou from "../pages/ThankYou/ThankYou";

const CreditLimit = ({ onClose }) => {
  const [onOpenPanDrawer, setOnOpenPanDrawer] = React.useState(false);

  const handleClose = () => {
    setOnOpenPanDrawer(false);
  };
  const [submitting, setSubmitting] = React.useState(false);
  const { baseUrl } = React.useContext(FormContext);
  const showError = () => {
    toast.error("Credit Limit Not Valid", {
      position: "top-right",
    });
  };
  const [selectedCredit, setSelectedcredit] = React.useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post(
        `${baseUrl}/Hospitals/setCredit`,
        {
          creditLimit: selectedCredit,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      if (data.status === "success") {
        setOnOpenPanDrawer(true);
      }
    } catch (err) {
      console.error(err);
      showError(err.response.data.message);
    }
    setSubmitting(false);
  };
  return (
    <>
      {submitting && (
        <div
          className="bg-blue h-1 absolute top-0 left-0 right-0"
          style={{ width: "100%", animation: "loading-bar 2s infinite" }}
        ></div>
      )}
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        open={!onOpenPanDrawer}
        key="rightCredits"
        width={window.innerWidth < 768 ? window.innerWidth : 700}
      >
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
        <div className="block md:px-5 pt-10">
          <span className="text-2xl 2xl:text-3xl font-bold">
            Set Credit Limit
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="container relative pb-[120px]">
            <div className="w-full md:ml-5 mt-6">
              <div className="grid grid-cols-2 gap-5 overflow-hidden">
                <div
                  className={`flex justify-center items-center h-[15vh] md:h-[180px] w-[40vw] md:w-[250px] bg-lightBlue rounded-lg cursor-pointer ${
                    selectedCredit === "50000"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedcredit("50000")}
                >
                  <span className="text-xl 2xl:text-2xl text-blue">
                    &#8377;50,000
                  </span>
                </div>
                <div
                  className={`flex justify-center items-center h-[15vh] md:h-[180px] w-[40vw] md:w-[250px] ml-[-15px] bg-lightBlue rounded-lg cursor-pointer ${
                    selectedCredit === "100000"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedcredit("100000")}
                >
                  <span className="text-xl 2xl:text-2xl text-blue">
                    &#8377;100,000
                  </span>
                </div>
                <div
                  className={`flex justify-center items-center h-[15vh] md:h-[180px] w-[40vw] md:w-[250px] bg-lightBlue rounded-lg cursor-pointer ${
                    selectedCredit === "500000"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedcredit("500000")}
                >
                  <span className="text-xl 2xl:text-2xl text-blue">
                    &#8377;500,000
                  </span>
                </div>
                <div
                  className={`flex justify-center items-center h-[15vh] md:h-[180px] w-[40vw] md:w-[250px] ml-[-15px] bg-lightBlue rounded-lg cursor-pointer ${
                    selectedCredit === "1000000"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedcredit("1000000")}
                >
                  <span className="text-xl 2xl:text-2xl text-blue">
                    &#8377;1,000,000
                  </span>
                </div>
              </div>
              <div className="flex flex-row mt-12 ml-[-20px] justify-center relative text-xl font-bold">
                or
              </div>
              <div className="flex w-full flex-row items-end  max-w-[565px] mt-6">
                <span className="text-xl 2xl:text-2xl text-blue p-1">
                  &#8377;
                </span>
                <input
                  type="number"
                  className="block w-full mt-1 font-normal text-lg p-2 2xl:text-xl text-blue border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue placeholder-blue outline-transparent"
                  placeholder="Credit Limit"
                  value={selectedCredit}
                  onChange={(e) => setSelectedcredit(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="w-full block bg-white  absolute bottom-0 right-0 overflow-hidden">
            <Divider className="bg-blue mr-auto mt-0" />
            <div className="flex w-full justify-end mr-8 pb-4">
              <CustomButton
                firstButton="CANCEL"
                secondButton="NEXT"
                firstButtonHandleClick={onClose}
                secondButtonHandleClick={null}
                isSubmit={true}
              />
            </div>
          </div>
        </form>
      </Drawer>
      {onOpenPanDrawer && <ThankYou />}
      {submitting && (
        <div className="fixed inset-0 bg-gray-500 opacity-75 z-50"></div>
      )}
      <ToastContainer />
    </>
  );
};

export default CreditLimit;
