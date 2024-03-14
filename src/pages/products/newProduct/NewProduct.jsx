import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Divider, Drawer } from "antd";
import { FormContext } from "../../../Contexts/FormContext";
import CustomButton from "../../../components/CustomButton";
import State from "../../../data/States";
import ThankYou from "../../ThankYou/ThankYou";

const NewProduct = ({ onClose }) => {
  const [info, setInfo] = useState({
    productName: "",
    productCode: "",
    mrpPrice: "",
    retailPrice: "",
    productCategory: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [verifyOtpDrawer, setVerifyOtpDrawer] = React.useState(false);
  const [onOpenPanDrawer, setOnOpenPanDrawer] = React.useState(false);
  const { baseUrl } = React.useContext(FormContext);
  const { handleFormSubmit, isFormSubmitted } = React.useContext(FormContext);

  // console.log("onOpenPanDrawer ", onOpenPanDrawer);
  const onCloseVerifyOtpDrawer = () => {
    setVerifyOtpDrawer(false);
    setOnOpenPanDrawer(false);
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
        `${baseUrl}/Products/addProduct`,
        {
          productName: info.productName,
          productCode: info.productCode,
          mrpPrice: info.mrpPrice,
          retailPrice: info.retailPrice,
          productCategory: info.productCategory,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: "include",
        }
      );
      // sessionStorage.setItem("employmentType", info.employmentType);
      const json = response.data;
      console.log(json);

      if (json.status === "Success") {
        // setVerifyKey(json.details);
        setVerifyOtpDrawer(true);
        setOnOpenPanDrawer(true);
      }

      console.log("form submission");
      handleFormSubmit();
    } catch (err) {
      console.log(err);
      showError(err.response.data.message);
    }
    setSubmitting(false);
  };
  // React.useEffect(() => {
  //   if (info.state) {
  //     const selectedState = State.states.find(
  //       (state) => state.state === info.state
  //     );
  //     setCities(selectedState ? selectedState.cities : []);
  //   } else {
  //     setCities([]);
  //   }
  // }, [info.state]);

  const formatDate = (date) => {
    return date.replace(/-/g, "/");
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        open={!verifyOtpDrawer}
        width={window.innerWidth < 768 ? window.innerWidth : 700}
        className="border-2 border-t-0 border-b-0 border-r-0 border-solid border-aliceblue "
      >
        {submitting && (
          <div
            className="absolute top-0 left-0 right-0 h-1 bg-blue"
            style={{ width: "100%", animation: "loading-bar 2s infinite" }}
          ></div>
        )}
        <div className="flex mt-[10px] flex-row justify-start items-start md:ml-5">
          <svg
            className="w-8 h-8 text-black cursor-pointer"
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
          <div className="flex flex-col mt-8 md:ml-7 font-Poppins">
            <span className="mt-4 text-2xl font-bold 2xl:text-3xl">
              Add a product
            </span>
            <span className="text-[14px] md:text-lg font-normal mt-4">
              Fill up the product details.
            </span>
          </div>
          <div className=" w-[80vw] md:w-[600px]">
            <div className="flex flex-row items-end w-full pr-10 mt-6 px-7">
              <input
                type="text"
                name="productName"
                id="productName"
                className="block w-full px-2 py-2 mt-1 text-base font-normal text-left border-t-0 md:text-lg text-blue border-blue border-1 border-x-0 bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Product Name"
                value={info.productName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-row items-end w-full pr-10 mt-6 px-7">
              <input
                type="text"
                name="productCode"
                id="productCode"
                className="block w-full px-2 py-2 mt-1 text-base font-normal text-left border-t-0 md:text-lg text-blue border-blue border-1 border-x-0 bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Product Code"
                value={info.productCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-row items-end w-full pr-10 mt-6 px-7">
              <input
                type="number"
                name="mrpPrice"
                id="mrpPrice"
                className="block w-full px-2 py-2 mt-1 text-base font-normal text-left border-t-0 md:text-lg text-blue border-blue border-1 border-x-0 bg-lightBlue placeholder-blue outline-transparent"
                placeholder="MRP Price"
                onChange={handleChange}
                value={info.mrpPrice}
                required
              />
            </div>
            <div className="flex flex-row items-end w-full pr-10 mt-6 px-7">
              <input
                type="number"
                name="retailPrice"
                id="retailPrice"
                className="block w-full px-2 py-2 mt-1 text-base font-normal text-left border-t-0 md:text-lg text-blue border-blue border-1 border-x-0 bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Retail Price"
                onChange={handleChange}
                value={info.retailPrice}
                required
              />
            </div>

            {/* <div className="flex flex-row items-end w-full pr-10 mt-6 px-7">
              <select
                id="state"
                name="state"
                className="block w-full px-2 py-2 mt-1 text-base font-normal text-left border-t-0 md:text-lg text-blue border-blue border-1 border-x-0 bg-lightBlue placeholder-blue outline-transparent"
                onChange={handleChange}
                value={info.state}
                required
              >
                <option selected disabled>
                  Choose State
                </option>
                {State?.states.map((e, key) => {
                  return (
                    <option value={e.state} key={key} className="text-blue">
                      {e.state}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-row items-end w-full pr-10 mt-6 px-7">
              <select
                id="city"
                name="city"
                className="block w-full px-2 py-2 mt-1 text-base font-normal text-left border-t-0 md:text-lg text-blue border-blue border-1 border-x-0 bg-lightBlue placeholder-blue outline-transparent"
                onChange={handleChange}
                value={info.city}
                required
              >
                <option disabled value="">
                  Choose City
                </option>
                {cities.map((city, key) => (
                  <option value={city} key={key} className="text-blue">
                    {city}
                  </option>
                ))}
              </select>
            </div> */}

            {/*<div className="flex flex-row items-end w-full pr-10 mt-6 px-7">
              <input
                type="number"
                name="pincode"
                id="pincode"
                className="block w-full px-2 py-2 mt-1 text-base font-normal text-left border-t-0 md:text-lg text-blue border-blue border-1 border-x-0 bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Pincode"
                onChange={handleChange}
                value={info.pincode}
                required
              />
        </div>*/}

            <div className="flex flex-row items-end w-full pr-10 mt-6 px-7">
              <select
                id="productCategory"
                name="productCategory"
                className="block w-full px-2 py-2 mt-1 text-base font-normal text-left border-t-0 md:text-lg text-blue border-blue border-1 border-x-0 bg-lightBlue placeholder-blue outline-transparent"
                onChange={handleChange}
                value={info.productCategory}
                required
              >
                <option disabled value="">
                  Choose Product Category
                </option>
                <option value="FMCG" className="text-blue">
                  FMCG
                </option>
                <option value="Medical" className="text-blue">
                  Medical
                </option>
              </select>
            </div>

            <div className="absolute right-0 block w-full bottom-3">
              <Divider className="mr-auto bg-blue" />
              <div className="flex justify-end w-full pb-4 mr-8">
                <CustomButton
                  firstButton="CANCEL"
                  secondButton="NEXT"
                  firstButtonHandleClick={onClose}
                  secondButtonHandleClick={null}
                  isSubmit={true}
                />
              </div>
            </div>
          </div>
        </form>
      </Drawer>
      {onOpenPanDrawer && <ThankYou isCustomer={false} />}
      {submitting && (
        <div className="fixed inset-0 z-50 bg-gray-500 opacity-75"></div>
      )}
      <ToastContainer />
    </>
  );
};

export default NewProduct;
