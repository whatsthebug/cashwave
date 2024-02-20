import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const CustPhnNum = () => {
  const [phone, setPhone] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  let navigate = useNavigate();
  const showError = () => {
    toast.error("Please try again later. Server is busy.", {
      position: "top-center",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/getOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          phone: phone,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.status === "success") {
        navigate("/verifyphnnum");
      }
    } catch (err) {
      showError();
    }
    setSubmitting(false);
  };

  const handleChange = (e) => {
    setPhone(e.target.value);
  };
  return (
    <>
      <div className="flex flex-col w-[100vw] h-screen justify-center items-center">
        {submitting && (
          <div
            className="bg-blue h-1 absolute top-0 left-0 right-0"
            style={{ width: "100%", animation: "loading-bar 2s infinite" }}
          ></div>
        )}
        <div className="flex flex-col w-[677px] h-[704px] px-6 py-4 overflow-hidden shadow-md sm:max-w-md sm:rounded-lg border-5 border-solid rounded-3xl border-blue relative">
          <div className="flex mt-[10px] flex-row justify-start items-start">
            <svg
              className="h-8 w-8 text-black cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </div>
          <div className="flex mt-[40px] flex-row justify-start items-start font-bold">
            <span className="text-4xl/[35px]">Customer's Phone Number</span>
          </div>
          <div className="flex mt-[18px] flex-row justify-start items-start">
            <span className="text-2xl/[26px] ml-2">
              We will send a code to the number you choose.
            </span>
          </div>
          <form
            className="flex flex-col flex-grow ml-2 "
            onSubmit={handleSubmit}
          >
            <div className="flex mt-[20px] flex-row items-start">
              <input
                type="number"
                name="phone"
                id="phone"
                className="block w-full mt-1 font-normal text-3xl border-blue border-1 border-t-0 border-x-0 text-left placeholder-blue outline-transparent"
                placeholder="Phone Number"
                value={phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-grow"></div>
            <div className="flex flex-row justify-center items-center mt-4">
              <button
                type="submit"
                className="text-white bg-blue cursor-pointer border-none text-2xl rounded-lg px-5 py-2.5 mr-2 mb-2 w-[594px] h-[51px]"
                disabled={submitting}
              >
                <span className=" font-['Poppins'] font-bold">GET OTP</span>
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

export default CustPhnNum;
