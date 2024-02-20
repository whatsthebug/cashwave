import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { DatePicker, Divider, Drawer } from "antd";
import VerifyPhnNum from "../VerifyPhnNumber/VerifyPhnNum";
import { FormContext } from "../../Contexts/FormContext";
// import { format } from "date-fns";
import CustomButton from "../../components/CustomButton";
import State from "../../data/States";
import CreditLimit from "../../components/CreditLimit";
const NewCustomer = ({ onClose, custDetails }) => {
  const [info, setInfo] = React.useState({
    name: "",
    phone: "",
    // dob: "",
    // maritialStatus: "",
    // employmentType: "",
    line1: "",
    line2: "",
    state: "",
    city: "",
    pincode: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [verifyOtpDrawer, setVerifyOtpDrawer] = React.useState(false);
  const [verifyKey, setVerifyKey] = React.useState("");
  const [cities, setCities] = React.useState([]);
  const { baseUrl } = React.useContext(FormContext);

  const onCloseVerifyOtpDrawer = () => {
    setVerifyOtpDrawer(false);
  };
  const showError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(info.dob);
    try {
      let parameters = info.dob.split("-");
      let dob = parameters[1] + "/" + parameters[0] + "/" + parameters[2];

      const response = await axios.patch(
        `${baseUrl}/Hospitals/add`,
        {
          name: info.name,
          phone: info.phone,
          dob: dob,
          maritialStatus: info.maritialStatus,
          employmentType: info.employmentType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: "include",
        }
      );
      sessionStorage.setItem("employmentType", info.employmentType);
      const json = response.data;
      console.log(json);

      if (json.status === "Success") {
        setVerifyKey(json.details);
        setVerifyOtpDrawer(true);
      }
    } catch (err) {
      console.log(err);
      showError(err.response.data.message);
    }
    setSubmitting(false);
  };
  React.useEffect(() => {
    if (info.state) {
      const selectedState = State.states.find(
        (state) => state.state === info.state
      );
      setCities(selectedState ? selectedState.cities : []);
    } else {
      setCities([]);
    }
  }, [info.state]);

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
              New Customer
            </span>
            <span className="text-[14px] md:text-lg font-normal mt-4">
              Fill up the customer detail according to aadhar card.
            </span>
          </div>
          <div className=" w-[80vw] md:w-[600px]">
            <div className="flex w-full flex-row items-end px-7 pr-10 mt-6">
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full mt-1 font-normal text-base md:text-lg text-blue  py-2 px-2 border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Name"
                value={info.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex w-full flex-row items-end px-7 pr-10 mt-6">
              <input
                type="number"
                name="phone"
                id="phone"
                className="block w-full mt-1 font-normal text-base md:text-lg text-blue  py-2 px-2 border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Phone Number"
                value={info.phone}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="flex w-full flex-row items-end px-7 pr-10 mt-6"> */}
            {/* <DatePicker
                onChange={handleChange}
                value={info.dob}
                className="block w-full mt-1 font-normal text-base md:text-lg text-blue  py-2 px-2 border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Date of Birth"
                name="dob"
              /> */}
            {/* <input
                type="date"
                name="dob"
                id="dob"
                className="block w-full mt-1 font-normal text-base md:text-lg text-blue  py-2 px-2 border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Date of Birth"
                value={info.dob}
                onChange={handleChange}
                required
              />
            </div> */}
            {/* <div className="flex w-full flex-row items-end px-7 pr-10 mt-6">
              <select
                id="maritialstatus"
                className=" block w-full font-normal text-base md:text-lg py-2 px-2 border-solid border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue text-blue outline-transparent"
                name="maritialStatus"
                value={info.maritialStatus}
                onChange={handleChange}
                // defaultValue='0'
                required
              >
                <option value="" selected disabled>
                  Maritial Status
                </option>
                <option value="married">Married</option>
                <option value="unmarried">Unmarried</option>
              </select>
            </div> */}
            {/* <div className="flex w-full flex-row items-end px-7 pr-10 mt-6">
              <select
                id="employmenttype"
                className=" block w-full font-normal text-base md:text-lg px-2 border-solid py-2 border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue text-blue outline-transparent"
                name="employmentType"
                // defaultValue='0'
                value={info.employmentType}
                onChange={handleChange}
                required
              >
                <option value="" selected disabled>
                  Employment Type
                </option>
                {/* <option value="Salaried">Salaried</option> */}
            {/* <option value="Self-employed">Self-employed</option>
              </select>
            </div>  */}
            <div className="flex w-full flex-row items-end px-7 pr-10 mt-6">
              <input
                type="text"
                name="line1"
                id="line1"
                className="block w-full mt-1 font-normal text-base md:text-lg text-blue  py-2 px-2 border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Address Line 1"
                onChange={handleChange}
                value={info.line1}
                required
              />
            </div>
            <div className="flex w-full flex-row items-end px-7 pr-10 mt-6">
              <input
                type="text"
                name="line2"
                id="line2"
                className="block w-full mt-1 font-normal text-base md:text-lg text-blue  py-2 px-2 border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Address Line 2"
                onChange={handleChange}
                value={info.line2}
                required
              />
            </div>
            <div className="flex w-full flex-row items-end px-7 pr-10 mt-6">
              <select
                id="state"
                name="state"
                className="block w-full mt-1 font-normal text-base md:text-lg text-blue  py-2 px-2 border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue placeholder-blue outline-transparent"
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
            <div className="flex w-full flex-row items-end px-7 pr-10 mt-6">
              <select
                id="city"
                name="city"
                className="block w-full mt-1 font-normal text-base md:text-lg text-blue  py-2 px-2 border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue placeholder-blue outline-transparent"
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
            </div>
            <div className="flex w-full flex-row items-end px-7 pr-10 mt-6">
              <input
                type="number"
                name="pincode"
                id="pincode"
                className="block w-full mt-1 font-normal text-base md:text-lg text-blue  py-2 px-2 border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Pincode"
                onChange={handleChange}
                value={info.pincode}
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
                  secondButtonHandleClick={() => setVerifyOtpDrawer(true)}
                  isSubmit={false}
                />
              </div>
            </div>
          </div>
        </form>
      </Drawer>
      {verifyOtpDrawer && <CreditLimit onClose={onCloseVerifyOtpDrawer} />}
      {submitting && (
        <div className="fixed inset-0 bg-gray-500 opacity-75 z-50"></div>
      )}
      <ToastContainer />
    </>
  );
};

export default NewCustomer;
