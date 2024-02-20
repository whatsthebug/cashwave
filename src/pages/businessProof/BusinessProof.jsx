import { Divider, Drawer } from "antd";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import BankStatement from "../bankStatement/BankStatement";
import { FormContext } from "../../Contexts/FormContext";
import CustomButton from "../../components/CustomButton";
// import ThankYou from "../ThankYou/ThankYou";
const BusinessProof = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = React.useState("");
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [custBankDrawer, setCustBankDrawer] = React.useState(false);
  const { baseUrl } = React.useContext(FormContext)
  const showError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };
  const onCloseCustBankDrawer = () => {
    setCustBankDrawer(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formdata = new FormData();
    formdata.append("addressproof", selectedFile);
    try {
      const response = await axios.post(
        `${baseUrl}/Hospitals/addaddressprooff`,
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
        setCustBankDrawer(true);
      }
    } catch (err) {
      showError(err.response.data.message);
    }
    setSubmitting(false);
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
        open={!custBankDrawer}
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
            <span className="text-2xl 2xl:text-3xl font-bold mt-4">Business Proof</span>
            <span className="text-lg 2xl:text-xl font-normal mt-4">
              Note - Provide your business details.
            </span>
          </div>
          <div className="w-[80vw] md:w-[600px] md:px-3">
            <div className="flex flex-row justify-center items-center border rounded-lg bg-slate mt-10 w-full h-[200px] md:h-[252px] md:ml-4">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="h-48 w-auto" />
              ) : (
                <label
                  htmlFor="businessproof"
                  className="text-lg 2xl:text-xl font-normal text-blue cursor-pointer"
                >
                  Choose File
                </label>
              )}
              <input
                type="file"
                id="businessproof"
                className="hidden"
                onChange={handleChange}
                required
              />
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
      {custBankDrawer && <BankStatement onClose={onCloseCustBankDrawer}/>}
      {submitting && (
        <div className="fixed inset-0 bg-gray-500 opacity-75 z-50"></div>
      )}
      <ToastContainer />
    </>
  );
};

export default BusinessProof;
