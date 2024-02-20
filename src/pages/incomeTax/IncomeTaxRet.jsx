import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Divider, Drawer } from "antd";
import { FormContext } from "../../Contexts/FormContext";
import ThankYou from "../ThankYou/ThankYou";
const SalarySlip = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = React.useState("");
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [custSubmit, setCustSubmit] = React.useState(false);
  const {  baseUrl } = React.useContext(FormContext);

  const showError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formdata = new FormData();
    formdata.append("incometax", selectedFile);
    try {
      const response = await axios.post(
        `${baseUrl}/Hospitals/addtax`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: "include",
        }
      );

      const json = response.data;
      console.log(json);

      if (json.status === "success") {
        setSubmitting(false);
        setCustSubmit(true);
      }
    } catch (err) {
      showError(err.response.data.message);
      setSubmitting(false);
    }
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        open={!custSubmit}
        width={700}
        className="border-solid border-2 border-aliceblue border-t-0 border-b-0 border-r-0 "
      >
        {submitting && (
          <div
            className="bg-blue h-1 absolute top-0 left-0 right-0"
            style={{ width: "100%", animation: "loading-bar 2s infinite" }}
          ></div>
        )}
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
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col ml-7 mt-8 font-Poppins">
            <span className="text-2xl 2xl:text-3xl font-bold mt-4">Income Tax Return</span>
            <span className="text-lg 2xl:text-xl font-normal mt-4">
              Provide last 1 year income tax return.
            </span>
          </div>
          <div className="w-[600px]">
            <div className="flex flex-row justify-center items-center border rounded-lg bg-slate mt-10 ml-4 w-full h-[252px]">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="h-48 w-auto" />
              ) : (
                <label
                  htmlFor="incometax"
                  className="text-lg 2xl:text-xl font-normal text-blue cursor-pointer"
                >
                  Choose File
                </label>
              )}
              <input
                type="file"
                id="incometax"
                className="hidden"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="w-full block absolute bottom-3 right-0">
            <Divider className="bg-blue mr-auto" />
            <div className="flex justify-end ">
              <button
                className=" bg-white text-blue border-solid border-1 border-aliceblue rounded-xl w-[150px] h-[55px] mx-1 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-lightBlue"
                onClick={onClose}
              >
                <span className="text-base 2xl:text-lg font-bold">CANCEL</span>
              </button>
              <button
                className=" bg-blue text-white border-solid border-1 border-lightBlue rounded-xl w-[150px] h-[55px] mr-5 ml-2 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue"
                type="submit"
              >
                <span className="text-base 2xl:text-lg font-bold">NEXT</span>
              </button>
            </div>
          </div>
        </form>
      </Drawer>
      {custSubmit && <ThankYou/>}
      {submitting && (
        <div className="fixed inset-0 bg-gray-500 opacity-75 z-50"></div>
      )}
      <ToastContainer />
    </>
  );
};

export default SalarySlip;
