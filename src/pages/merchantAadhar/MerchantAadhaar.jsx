import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { FormContext } from "../../Contexts/FormContext";
const MerchantAadhaar = () => {
  const [aadhaar, setAadhaar] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const { baseUrl } = React.useContext(FormContext);

  let navigate = useNavigate();
  const showError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(aadhaar);
    try {
      const response = await axios.post(
        `${baseUrl}/Hospitals/adhaarOtp`,
        {
          aadhaar: aadhaar,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const json = await response.data;
      console.log(json);
      if (json.status === "SUCCESS") {
        localStorage.setItem("refid", JSON.stringify(response.data.refid));
        navigate("/addAadhaarOtp");
      }
    } catch (err) {
      showError(err.response.data.message);
    }
    setSubmitting(false);
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
        <div className="hidden md:block lg:w-[70vw] h-full top-0 bottom-0 left-0 fixed">
          <div className="bg-blue opacity-40 inset-0 fixed"></div>
          <img
            src={require("../../image/bg_login.png")}
            alt="bgimage"
            className="w-[70vw] h-screen"
          />
        </div>
        <div className="bg-blue w-full md:w-[30vw] h-full top-0 bottom-0 overflow-auto absolute right-0">
          <div className="mt-[120px]">
            <img
              src={require("../../image/Home.png")}
              alt="curecoin"
              className="w-full max-w-[250px]"
            />
          </div>
          <div className="flex flex-col justify-center items-center mt-6">
            <span className="2xl:text-3xl text-2xl text-white font-bold">
              Merchant Aadhaar Number
            </span>
            <span className="text-base md:text-lg text-white mt-2 px-12">
              Provide Merchant Aadhaar Number.
            </span>
          </div>
          <form
            className="flex flex-col ml-2 px-8 md:px-12 pb-12 mt-6"
            onSubmit={handleSubmit}
          >
            <div className="flex mt-[20px] h-[55px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="text"
                name="aadhaar"
                id="aadhaar"
                className="block w-full my-auto ml-4 font-normal text-base md:text-lg text-left bg-transparent outline-none text-white placeholder-white border-none"
                placeholder="Aadhaar Number"
                onChange={(e) => setAadhaar(e.target.value)}
                value={aadhaar}
                required
              />
            </div>
            <div className="flex-grow"></div>
            <div className="flex flex-row justify-center items-center mt-12">
              <button
                type="submit"
                className="text-white bg-darkBlue cursor-pointer border-none text-lg 2xl:text-xl rounded-lg mr-2 mb-2 max-w-[594px] w-full h-[55px] transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 delay-150 "
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

export default MerchantAadhaar;
