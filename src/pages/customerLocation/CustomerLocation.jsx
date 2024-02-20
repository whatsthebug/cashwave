import React from "react";
import State from "../../data/States";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Divider, Drawer } from "antd";
// import CustomerEmployment from "../employementDetails/CustomerEmployment";
// import CustIncomeDetails from "../incomeDetails/CustIncomeDetails";
import { FormContext } from "../../Contexts/FormContext";
// import PanVerify from "../panCardVerification/PanVerify";
import CreditLimit from "../../components/CreditLimit";
import CustomButton from "../../components/CustomButton";
const CustomerLocation = ({ onClose }) => {
  const [location, setLocation] = React.useState({
    line1: "",
    line2: "",
    state: "",
    city: "",
    pincode: "",
    residenceType: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [custEmpDrawer, setCustEmpDrawer] = React.useState(false);
  const [cities, setCities] = React.useState([]);
  const { baseUrl } = React.useContext(FormContext)

  const onCloseCustEmpDrawer = () => {
    setCustEmpDrawer(false);
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
        `${baseUrl}/Hospitals/addcustloc`,
        {
          line1: location.line1,
          line2: location.line2,
          state: location.state,
          city: location.city,
          pincode: location.pincode,
          residenceType: location.residenceType,
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
        setCustEmpDrawer(true);
      }
    } catch (err) {
      showError(err.response.data.message);
    }
  };

  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };
  React.useEffect(() => {
    if (location.state) {
      const selectedState = State.states.find(
        (state) => state.state === location.state
      );
      setCities(selectedState ? selectedState.cities : []);
    } else {
      setCities([]);
    }
  }, [location.state]);
  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        open={!custEmpDrawer}
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
            <span className="text-2xl 2xl:text-3xl font-bold mt-4">Customer Location</span>
            <span className="text-lg 2xl:text-xl font-normal mt-4">
              Note - Location has to be same as in address proof.
            </span>
          </div>
          <div className="w-[80vw] md:w-[600px]">
            <div className="flex w-full flex-row items-end md:px-7 pr-10 mt-6">
              <input
                type="text"
                name="line1"
                id="line1"
                className="block w-full mt-1 font-normal text-lg text-blue p-2 2xl:text-xl border-blue bg-lightBlue border-1 border-t-0 border-x-0 text-left placeholder-blue outline-transparent"
                placeholder="Addressline 1"
                value={location.line1}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex w-full flex-row items-end md:px-7 pr-10 mt-6">
              <input
                type="text"
                name="line2"
                className="block w-full mt-1 font-normal text-lg p-2 2xl:text-xl text-blue border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Addressline 2"
                value={location.line2}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex w-full flex-row items-end md:px-7 pr-10 mt-6">
              <select
                id="state"
                name="state"
                className=" block w-full font-normal text-lg p-2 2xl:text-xl  border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue text-blue outline-transparent"
                value={location.state}
                onChange={handleChange}
                required
              >
                <option selected>Choose State</option>
                {State?.states.map((e, key) => {
                  return (
                    <option value={e.state} key={key}>
                      {e.state}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex w-full flex-row items-end md:px-7 pr-10 mt-6">
              <select
                id="city"
                name="city"
                className=" block w-full font-normal text-lg p-2 2xl:text-xl  border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue text-blue outline-transparent"
                value={location.city}
                onChange={handleChange}
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
            </div>
            <div className="flex w-full flex-row items-end md:px-7 pr-10 mt-6">
              <input
                type="number"
                name="pincode"
                id="pincode"
                className="block w-full mt-1 font-normal text-lg p-2 2xl:text-xl text-blue border-solid border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Pincode"
                value={location.pincode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex w-full flex-row items-end md:px-7 pr-10 mt-6">
              <select
                id="residenceType"
                name="residenceType"
                className=" block w-full font-normal text-lg 2xl:text-xl p-2  border-blue border-1 border-t-0 border-x-0 text-left  bg-lightBlue text-blue placeholder-blue outline-transparent"
                value={location.residenceType}
                onChange={handleChange}
                required
              >
                <option value="" selected disabled>
                  Residence type
                </option>
                <option value="flat">Flat</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="cottage">Cottage</option>
              </select>
            </div>
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
      {/* {custEmpDrawer &&
        sessionStorage.getItem("employmentType") === "Salaried" && (
          <CustomerEmployment onClose={onCloseCustEmpDrawer} />
        )}
      {custEmpDrawer &&
        sessionStorage.getItem("employmentType") === "Self-employed" && (
          <CustIncomeDetails onClose={onCloseCustEmpDrawer} />
        )} */}
        {
          custEmpDrawer &&  
            <CreditLimit onClose={onCloseCustEmpDrawer} />
        }
      {submitting && (
        <div className="fixed inset-0 bg-gray-500 opacity-75 z-50"></div>
      )}
      <ToastContainer />
    </>
  );
};

export default CustomerLocation;
