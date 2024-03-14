import { DatePicker, Divider, Drawer } from "antd";
import React from "react";
import CustomButton from "../../../components/CustomButton";
import NewProduct from "../newProduct/NewProduct";
import FileUpload from "../fileUpload/FileUpload";

export default function Options({ onClose }) {
  // const [drawers, setDrawers] = React.useState(false);
  const [verifyOtpDrawer, setVerifyOtpDrawer] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("");

  const onCloseVerifyOtpDrawer = () => {
    setVerifyOtpDrawer(false);
  };

  const handleSubmit = (e) => {
    setVerifyOtpDrawer(true);
  };

  return (
    <>
      <div
        className={`${
          !verifyOtpDrawer ? "visible" : "invisible"
        } fixed z-50 text-white rounded-xl border-1 border-active bg-softblue bottom-36 right-4`}
      >
        <div className="p-1 ">
          <div
            className={`p-3 text-base font-medium transition-colors border cursor-pointer hover:bg-blue rounded-xl border-1 ${
              selectedOption === "single" ? "border-active" : ""
            }`}
            onClick={() => {
              setSelectedOption("single");
              handleSubmit();
            }}
          >
            Add a single product
          </div>
          <div
            className={`p-3 text-base font-medium transition-colors cursor-pointer border-1 hover:bg-blue rounded-xl ${
              selectedOption === "bulk" ? "border-active" : ""
            }`}
            onClick={() => {
              setSelectedOption("bulk");
              handleSubmit();
            }}
          >
            Bulk upload
          </div>
        </div>
      </div>
      {verifyOtpDrawer && selectedOption === "single" && (
        <NewProduct onClose={onCloseVerifyOtpDrawer} />
      )}
      {verifyOtpDrawer && selectedOption === "bulk" && (
        <FileUpload onClose={onCloseVerifyOtpDrawer} />
      )}
    </>
  );
}
