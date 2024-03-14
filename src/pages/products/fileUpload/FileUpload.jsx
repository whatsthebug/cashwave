import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { DatePicker, Divider, Drawer } from "antd";
import { Document, Page } from "react-pdf";
import VerifyPhnNum from "../../VerifyPhnNumber/VerifyPhnNum";
import { FormContext } from "../../../Contexts/FormContext";
import CustomButton from "../../../components/CustomButton";
import State from "../../../data/States";
import CreditLimit from "../../../components/CreditLimit";
import * as XLSX from "xlsx";
import ThankYou from "../../ThankYou/ThankYou";

const FileUpload = ({ onClose }) => {
  const [bulkProducts, setBulkProducts] = React.useState([]);
  const [noFile, setNoFile] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [verifyOtpDrawer, setVerifyOtpDrawer] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const { baseUrl } = React.useContext(FormContext);
  const { handleFormSubmit } = React.useContext(FormContext);

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

    try {
      const response = await axios.post(
        `${baseUrl}/Products/bulkUpload`,
        { bulkProducts },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: "include",
        }
      );
      // sessionStorage.setItem("employmentType", info.employmentType);
      const json = response.data;
      console.log(json);

      if (json.status === "Success") {
        // setVerifyKey(json.details);
        setVerifyOtpDrawer(true);
      }

      console.log("form submission");
      handleFormSubmit();
    } catch (err) {
      console.log(err);
      showError(err.response.data.message);
    }
    setSubmitting(false);
  };

  const handleFileUpload = (event) => {
    setNoFile(false);
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setPreviewUrl(reader.result);

      if (file && !file.name.endsWith(".xlsx")) {
        toast.error("upload a .xlsx file", {
          position: "top-right",
        });
        return;
      }
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const bulkProductsObj = rows.map((row, index) => {
        return {
          productName: row[0], // Assuming productName is at index 0
          productCode: row[1].toString(), // Assuming productCode is at index 1
          mrpPrice: parseInt(row[2]), // Assuming mrpPrice is at index 2
          retailPrice: parseInt(row[3]), // Assuming retailPrice is at index 3
          productCategory: row[4], // Assuming productCategory is at index 4
        };
      });

      setBulkProducts(bulkProductsObj);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleChange = (e) => {
    handleFileUpload(e);
  };
  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        open={!verifyOtpDrawer}
        width={window.innerWidth < 768 ? window.innerWidth : 700}
        className="border-2 border-t-0 border-b-0 border-r-0 border-solid border-aliceblue "
      >
        {submitting && (
          <div
            className="absolute top-0 left-0 right-0 h-1 bg-blue"
            style={{ width: "100%", animation: "loading-bar 2s infinite" }}
          ></div>
        )}
        <div className="flex mt-[10px] flex-row justify-start items-start md:ml-5">
          <svg
            className="w-8 h-8 text-black cursor-pointer"
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
          <div className="flex flex-col mt-8 md:ml-7 font-Poppins">
            <span className="mt-4 text-2xl font-bold 2xl:text-3xl">
              Upload a file
            </span>
            <span className="text-[14px] md:text-lg font-normal mt-4">
              upload a .xlsx file for bulk uploading of products
            </span>
          </div>
          <div className="">
            {/* <div className="flex flex-row items-end w-full pr-10 mt-6 px-7">
              <input
                type="file"
                name=""
                id=""
                className="block w-full px-2 py-2 mt-1 text-base font-normal text-left border-t-0 md:text-lg text-blue border-blue border-1 border-x-0 bg-lightBlue placeholder-blue outline-transparent"
                placeholder="Product Name"
                onChange={handleChange}
                required
              />
            </div> */}
            <div className="flex flex-row justify-center items-center border-solid border-1 rounded-lg mr-auto ml-auto bg-lightBlue border-aliceblue mt-7 w-[600px] h-[200px]">
              {previewUrl ? (
                typeof previewUrl === "string" &&
                previewUrl.endsWith(".xlsx") ? (
                  <Document file={previewUrl}>
                    <Page pageNumber={1} />
                  </Document>
                ) : (
                  <img src={previewUrl} alt="Preview" />
                )
              ) : (
                <label
                  htmlFor="bulk"
                  className="text-lg font-normal cursor-pointer 2xl:text-xl text-blue"
                >
                  Choose File
                </label>
              )}
              <input
                type="file"
                id="bulk"
                className="hidden"
                onChange={handleChange}
                required
              />
            </div>

            <div className="absolute right-0 block w-full bottom-3">
              <Divider className="mr-auto bg-blue" />
              <div className="flex justify-end w-full pb-4 mr-8">
                <CustomButton
                  firstButton="CANCEL"
                  secondButton="NEXT"
                  firstButtonHandleClick={onClose}
                  secondButtonHandleClick={null}
                  isSubmit={true}
                />
              </div>
            </div>
          </div>
        </form>
      </Drawer>
      {/* {verifyOtpDrawer && <CreditLimit onClose={onCloseVerifyOtpDrawer} />} */}

      {submitting && (
        <div className="fixed inset-0 z-50 bg-gray-500 opacity-75"></div>
      )}
      <ToastContainer />
    </>
  );
};

export default FileUpload;
