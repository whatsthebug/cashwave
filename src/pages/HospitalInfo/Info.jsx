import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FormContext } from "../../Contexts/FormContext";

const HospitalInfo = () => {
  const [data, setData] = React.useState({
    hospitalName: "",
    inChargeName: "",
    category: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const { baseUrl } = React.useContext(FormContext);

  let navigate = useNavigate();
  const showError = (msg) => {
    toast.error(
      { msg },
      {
        position: "top-right",
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.patch(
        `${baseUrl}/Hospitals/addhospinfo`,
        {
          hospitalName: data.hospitalName,
          inChargeName: data.inChargeName,
          category: data.category,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      const json = await response.data;
      if (json.status === "Success") {
        navigate("/addhosploc");
      } else {
        toast.error("Hospital already registered!", {
          position: "top-right",
        });
      }
    } catch (json) {
      showError(json.message);
    }
    setSubmitting(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="flex w-full min-h-screen h-full font-Poppins relative">
        {submitting && (
          <div
            className="bg-blue h-1 absolute top-0 left-0 right-0"
            style={{ width: "100%", animation: "loading-bar 2s infinite" }}
          ></div>
        )}
        <div className="w-[70vw] h-full top-0 bottom-0 fixed hidden md:block">
        <div className="bg-blue opacity-40 inset-0 fixed"></div>
          <img
            src={require("../../image/bg_login.png")}
            alt="bgimage"
            className="w-[70vw] h-screen"
          />
        </div>
        <div className="bg-blue md:w-[30vw] h-full top-0 bottom-0 overflow-auto absolute right-0 w-full">
          <div className="mt-[120px]">
            <img
              src={require("../../image/Home.png")}
              alt="curecoin"
              className="max-w-[250px] w-full"
            />
          </div>
          <div className="flex flex-col justify-center items-center mt-3">
            <span className="2xl:text-3xl text-2xl text-white font-bold">
              Merchant Info
            </span>
            <span className="text-sm md:text-lg text-white mt-2 px-12">
              Tell us about your merchant and merchant category.
            </span>
          </div>
          <form
            className="flex flex-col flex-grow ml-2 px-8 md:px-12 mt-6"
            onSubmit={handleSubmit}
          >
            <div className="flex mt-[20px] h-[55px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="text"
                name="hospitalName"
                id="hospitalName"
                className="block w-full my-auto ml-4 font-normal text-base md:text-lg text-left bg-transparent outline-none text-white placeholder-white border-none"
                placeholder="Merchant Name"
                value={data.hospitalName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex mt-[20px] h-[55px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="text"
                name="inChargeName"
                id="inChargeName"
                className="block w-full my-auto ml-4 font-normal text-base md:text-lg text-left bg-transparent outline-none text-white placeholder-white border-none"
                placeholder="In Charge Name"
                value={data.inChargeName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex mt-[20px] h-[55px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <select
                id="category"
                className=" block appearance-none w-full my-auto px-4 font-normal text-base md:text-lg text-left bg-transparent outline-none  placeholder-blue border-none text-white"
                name="category"
                value={data.category}
                onChange={handleChange}
                defaultValue="0"
                required
              >
                <option value="0" selected>
                  Merchant Category
                </option>
                <option value="1" className="text-blue">
                  One
                </option>
                <option value="2" className="text-blue">
                  Two
                </option>
                <option value="3" className="text-blue">
                  Three
                </option>
                <option value="4" className="text-blue">
                  Four
                </option>
              </select>
            </div>
            <div className="flex-grow"></div>
            <div className="flex flex-row justify-center items-center mt-12">
              <button
                type="submit"
                className="text-white bg-darkBlue cursor-pointer border-none text-lg 2xl:text-xl rounded-lg mr-2 mb-2 w-full max-w-[594px] h-[55px] transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 delay-150"
                disabled={submitting}
              >
                <span className="align-center mb-4 font-['Poppins'] font-bold">
                  NEXT
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {submitting && (
        <div className="fixed inset-0 bg-gray-500 opacity-75 z-50"></div>
      )}
      <ToastContainer />
    </>
  );
};

export default HospitalInfo;
