import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Divider, Drawer } from "antd";
// import CustAddProof from "../addressProof/CustAddProof"
import { FormContext } from "../../Contexts/FormContext";
import BusinessProof from "../businessProof/BusinessProof";
import CustomButton from "../../components/CustomButton";
const PanVerify = ({ onClose }) => {
  const [pan, setPan] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState("");
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [custAddDrawer, setCustAddDrawer] = React.useState(false)
  const { baseUrl } = React.useContext(FormContext)
  const showError = () => {
    toast.error("Pan Card Not Valid", {
      position: "top-right",
    });
  };
  const onCloseCustAddDrawer = () => {
    setCustAddDrawer(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formdata = new FormData();
    formdata.append("pannumber", pan);
    formdata.append("pan", selectedFile);
    try {
      const response = await axios.post(
        `${baseUrl}/Hospitals/addPan`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: "include",
        }
      );
      console.log(response)
      const json = response.data;
      console.log(json);

      if (json.status === "success") {
        setCustAddDrawer(true)
      }
    } catch (err) {
      console.log(err)
      showError();
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
        open={!custAddDrawer}
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
            Pan Card Verification
            </span>
            <span className="text-lg 2xl:text-xl font-normal mt-4">
            Verify customer's Pan Card.
            </span>
          </div>
          <div className="w-[80vw] md:w-[600px]">
            <div className="flex w-full flex-row items-end md:px-7 pr-10 mt-6">
              <input
                type="text"
                name="pannumber"
                className="block w-full mt-1 font-normal text-blue p-2 text-lg 2xl:text-xl border-blue border-1 border-t-0 border-x-0 text-left bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Pancard Number"
                onChange={(e) => setPan(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-row justify-center items-center border rounded-lg bg-slate mt-12 w-full h-[200px] md:h-[252px] md:ml-5 px-2">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="h-48 w-auto" />
              ) : (
                <label
                  htmlFor="pancard"
                  className="text-lg 2xl:text-xl font-normal text-blue cursor-pointer"
                >
                  Choose File
                </label>
              )}
              <input
                type="file"
                id="pancard"
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
      {
        custAddDrawer && (
          <BusinessProof onClose={onCloseCustAddDrawer}/>
        )
      }
      {submitting && (
        <div className="fixed inset-0 bg-gray-500 opacity-75 z-50"></div>
      )}
      <ToastContainer />
    </>
  );
};

export default PanVerify;
