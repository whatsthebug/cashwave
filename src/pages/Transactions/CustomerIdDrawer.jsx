import { Drawer, Spin } from "antd";
import React from "react";
import { FormContext } from "../../Contexts/FormContext";
import Lightbox from "yet-another-react-lightbox";
// import "react-18-image-lightbox/style.css";
import "yet-another-react-lightbox/styles.css";
import Download from "yet-another-react-lightbox/plugins/download";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const CustomerIdDrawer = ({ onClose, open, transaction }) => {
  const { baseUrl } = React.useContext(FormContext);
  const [openLightbox, setOpenLightbox] = React.useState(false);
  const [invoice, setInvoice] = React.useState(null);
  const handleInvoice = (img) => {
    const _invoice = `${process.env.REACT_APP_API_URL_IMAGE}/${img}`;
    setInvoice(_invoice);
    console.log(_invoice);
  };
  console.log(transaction);
  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        key="rightCustomerDetails"
        width={700}
        className="border-solid border-2 border-aliceblue border-t-0 border-b-0 border-r-0 "
      >
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
        <div className="flex flex-row ml-5 mt-3">
          <span className="text-2xl 2xl:text-3xl font-extrabold mt-4">
            Customer Details
          </span>
        </div>
        {transaction === null ? (
          <>
            <div className="fixed inset-0 bg-gray-500 opacity-100 z-50"></div>
            <div className=" flex justify-center items-center w-full h-full transition ease-in delay-300 ">
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
                    src={`${process.env.REACT_APP_API_URL_IMAGE}/${transaction?.customerData?.profileImage}`}
                    // src={require("./user.png")}
                    alt="user"
                  />
                </div> */}
                <div className="flex flex-col mx-4 mt-3 pl-3">
                  <span className="2xl:text-lg text-base text-left font-semibold mr-auto">
                    {transaction?.customerData?.name}
                  </span>
                  <span className="2xl:text-base text-sm font-normal">
                    {transaction?.customerData?.phone}
                  </span>
                </div>
              </div>
              <div className="flex flex-col mt-4 w-full 2xl:text-lg text-base">
                <div className="flex flex-row justify-around">
                  <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                    <span className=" text-left font-semibold mr-auto m-1 ">
                      Addressline 1
                    </span>
                    <span className=" font-normal mr-auto m-1">
                      {transaction?.customerData?.customerLocation?.line1}
                    </span>
                  </div>
                  <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                    <span className=" text-left font-semibold mr-auto m-1">
                      Addressline 2
                    </span>
                    <span className="font-normal mr-auto m-1">
                      {transaction?.customerData?.customerLocation?.line2}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row w-full justify-around mt-8">
                  <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                    <span className=" text-left font-semibold mr-auto m-1">
                      City
                    </span>
                    <span className="text-lg font-normal mr-auto m-1">
                      {transaction?.customerData?.customerLocation?.city}
                    </span>
                  </div>
                  <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                    <span className="text-left font-semibold mr-auto m-1">
                      State
                    </span>
                    <span className="text-left font-normal mr-auto m-1">
                      {transaction?.customerData?.customerLocation?.state}
                    </span>
                  </div>
                </div>
                {/* <div className="flex flex-row w-full justify-around mt-8">
                <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                  <span className=" text-left font-semibold mr-auto m-1">
                    PAN Card
                  </span>
                  <span className=" font-normal mr-auto m-1">
                    {transaction?.customerData?.panNumber}
                  </span>
                </div>
                <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                  <span className=" text-left font-semibold mr-auto m-1">
                    Aadhar No
                  </span>
                  <span className="text-left font-normal mr-auto m-1">
                    {transaction?.customerData?.aadhaar}
                  </span>
                </div>
              </div> */}
              </div>
            </div>
            <div className="flex flex-row ml-5 mt-3">
              <span className="text-2xl 2xl:text-3xl font-extrabold mt-4">
                Invoice Details
              </span>
              <div
                className="ml-auto px-3 mt-5 text-center flex items-center 2xl:text-lg text-base h-[30px] rounded-md border-1 border-solid border-aliceblue bg-lightBlue text-black mr-7 cursor-pointer"
                onClick={() => {
                  setOpenLightbox(!openLightbox);
                  handleInvoice(transaction?.invoiceDetails?.invoice);
                }}
              >
                <span className="">Invoice File</span>
              </div>
            </div>
            <div className="flex w-[600px] py-8 flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5 mt-6 relative">
              <div className="flex flex-col w-full 2xl:text-lg text-base">
                <div className="flex flex-row justify-around">
                  <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                    <span className=" text-left font-semibold mr-auto m-1 ">
                      Tenure
                    </span>
                    <span className=" font-normal mr-auto m-1">
                      {transaction?.invoiceDetails?.tenure} Days
                    </span>
                  </div>
                  <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                    <span className=" text-left font-semibold mr-auto m-1">
                      Total Amount
                    </span>
                    <span className="font-normal mr-auto m-1">
                      ₹{transaction?.invoiceDetails?.totalAmount}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row w-full justify-around mt-6">
                  <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                    <span className=" text-left font-semibold mr-auto m-1">
                      Date
                    </span>
                    <span className="text-lg font-normal mr-auto m-1">
                      {transaction?.invoiceDetails?.date}
                    </span>
                  </div>
                  <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                    <span className="text-left font-semibold mr-auto m-1">
                      Repayment Date
                    </span>
                    <span className="text-left font-normal mr-auto m-1">
                      {transaction?.invoiceDetails?.repaymentDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {openLightbox && (
              <div>
                <Lightbox
                  open={openLightbox}
                  slides={[{ src: invoice }]}
                  close={() => setOpenLightbox(!openLightbox)}
                  plugins={[Download, Zoom]}
                  animation={{ zoom: 500 }}
                  // zoom={{
                  //   maxZoomPixelRatio:1,
                  //   zoomInMultiplier:2,
                  //   doubleTapDelay:300,
                  //   doubleClickDelay:300,
                  //   doubleClickMaxStops:2,
                  //   keyboardMoveDistance:50,
                  //   wheelZoomDistanceFactor:100,
                  //   pinchZoomDistanceFactor:100,
                  //   scrollToZoom:false,

                  // }}
                  carousel={{
                    finite: true,
                    preload: 2,
                    imageFit: "contain",
                    padding: "16px",
                    spacing: "16px",
                  }}
                  render={{
                    buttonPrev: () => null,
                    buttonNext: () => null,
                    buttonZoom: () => true,
                  }}
                />
              </div>
            )}
            <div className="flex flex-row ml-5 mt-3">
              <span className="text-2xl 2xl:text-3xl font-extrabold mt-4">
                Transaction Details
              </span>
            </div>
            <div className="flex w-[600px] py-8 flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5 mt-6 relative">
              <div className="flex flex-col w-full 2xl:text-lg text-base">
                <div className="flex flex-row justify-around">
                  <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                    <span className=" text-left font-semibold mr-auto m-1 ">
                      Transaction ID
                    </span>
                    <span className=" font-normal mr-auto m-1 text-blue">
                      {transaction?.transactionDetails?.transactionId}
                    </span>
                  </div>
                  <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                    <span className=" text-left font-semibold mr-auto m-1">
                      Settlement State
                    </span>
                    {transaction?.transactionDetails?.settlementState ? (
                      <span className="font-normal mr-auto m-1 text-green">
                        Settled
                      </span>
                    ) : (
                      <span className="font-normal mr-auto m-1 text-red">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-row w-full justify-around mt-6">
                  <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                    <span className=" text-left font-semibold mr-auto m-1">
                      Repayment Status
                    </span>
                    {transaction?.transactionDetails?.repaymentStatus ? (
                      <span className="font-normal mr-auto m-1 text-green">
                        Settled
                      </span>
                    ) : (
                      <span className="font-normal mr-auto m-1 text-red">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default CustomerIdDrawer;
