import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FormContext } from "../../Contexts/FormContext";
const AddAccount = () => {
  const [bankDetails, setBankDetails] = React.useState({ accno: "", ifsc: "" });
  const [submitting, setSubmitting] = React.useState(false);
  const [confirmAccno, setConfirmAccno] = React.useState("");
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
    if (bankDetails.accno !== confirmAccno) {
      setSubmitting(false);
      toast.error("Account numbers do not match. Please try again.", {
        position: "top-right",
      });
      return;
    }
    try {
      const response = await axios.patch(
        `${baseUrl}/Hospitals/addBankAcc`,
        {
          accnumber: bankDetails.accno,
          ifsccode: bankDetails.ifsc,
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
      console.log(json);
      if (json.status === "Success") {
        navigate("/addMerchantAadhar");
      } else {
        toast.error(json.message, {
          position: "top-right",
        });
      }
    } catch (err) {
      showError(err.response.data.message);
    }
    setSubmitting(false);
  };
  const handleChange = (e) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
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
        <div className="hidden md:block w-[70vw] h-full top-0 bottom-0 left-0 fixed">
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
              Add Bank Account
            </span>
            <span className="text-sm md:text-lg 2xl:text-xl text-white mt-2 px-12">
              In order to proceed with payouts. Please add your Bank account.
            </span>
          </div>
          <form
            className="flex flex-col flex-grow ml-2 px-8 md:px-12 mt-6"
            onSubmit={handleSubmit}
          >
            <div className="flex mt-[20px] h-[55px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="number"
                name="accno"
                id="accno"
                className="block w-full my-auto ml-4 font-normal text-sm md:text-lg 2xl:text-xl text-left bg-transparent text-white outline-none placeholder-white border-none"
                placeholder="Account Number"
                value={bankDetails.accno}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex mt-[20px] h-[55px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="number"
                name="confirmAccno"
                id="confirmAccno"
                className="block w-full my-auto ml-4 font-normal text-sm md:text-lg 2xl:text-xl text-left bg-transparent outline-none text-white placeholder-white border-none"
                placeholder="Confirm Account Number"
                value={confirmAccno}
                onChange={(e) => setConfirmAccno(e.target.value)}
                required
              />
            </div>
            <div className="flex mt-[20px] h-[55px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="text"
                name="ifsc"
                id="ifsc"
                className="block w-full my-auto ml-4 font-normal text-sm md:text-lg 2xl:text-xl text-left bg-transparent outline-none text-white placeholder-white border-none"
                placeholder="IFSC Code"
                value={bankDetails.ifsc}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-grow"></div>
            <div className="flex flex-row justify-center items-center mt-12">
              <button
                type="submit"
                className="text-white bg-darkBlue cursor-pointer border-none text-lg 2xl:text-xl rounded-lg mr-2 mb-2 max-w-[594px] w-full h-[55px] transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 delay-150"
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

export default AddAccount;
