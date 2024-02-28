import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { FormContext } from "../../Contexts/FormContext";
const CompanyPan = () => {
  const [selectedFile, setSelectedFile] = React.useState("");
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  let navigate = useNavigate();
  const { baseUrl } = React.useContext(FormContext);
  const showError = () => {
    toast.error("Company Pan Not Valid", {
      position: "top-right",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formdata = new FormData();
    formdata.append("companyPan", selectedFile);
    try {
      const response = await axios.post(
        `${baseUrl}/Hospitals/addCompanyPan`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: "include",
        }
      );
      console.log(response);
      const json = response.data;
      console.log(json);

      if (json.status === "Success") {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
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
        <div className="bg-blue w-full md:w-[30vw] h-full top-0 bottom-0 overflow-hidden absolute right-0">
          <div className="mt-[120px]">
            <img
              src={require("../../image/Home.png")}
              alt="curecoin"
              className="w-full max-w-[250px]"
            />
          </div>
          <div className="flex flex-col justify-center items-center mt-6">
            <span className="2xl:text-3xl text-2xl text-white font-bold">
              Merchant Company Pan
            </span>
            <span className="text-base md:text-lg text-white mt-2 px-12">
              Verify Merchant's Company Pan.
            </span>
          </div>
          <form
            className="flex flex-col w-[80%] px-14 pb-12 "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-row justify-center items-center border rounded-lg bg-[#fffcfcd6] mt-12 w-full h-[200px] md:h-[252px]">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="h-48 w-auto" />
              ) : (
                <label
                  htmlFor="companyPan"
                  className="text-lg 2xl:text-xl font-normal text-blue cursor-pointer"
                >
                  Choose File
                </label>
              )}
              <input
                type="file"
                id="companyPan"
                className="hidden"
                onChange={handleChange}
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

export default CompanyPan;
