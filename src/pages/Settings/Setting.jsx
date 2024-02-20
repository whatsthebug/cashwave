import React from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { Divider, Drawer, Spin } from "antd";
import axios from "axios";
import { FormContext } from "../../Contexts/FormContext";
import Footer from "../../components/Footer";
import { bank, profile2, notifications, help } from "../../image";
import CustomButton from "../../components/CustomButton";

const Setting = () => {
  const [showSelected, setShowSelected] = React.useState(() => {
    return sessionStorage.getItem("selectedSettingTab") || "profile";
  });
  const [mailDrawer, setMailDrawer] = React.useState(false);
  const [otpDrawer, setOtpDrawer] = React.useState(false);
  const [nameDrawer, setNameDrawer] = React.useState(false);
  const [mailData, setMailData] = React.useState({ mail: "", otp: "" });
  const [name, setName] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false);
  const [settingData, setSettingData] = React.useState(null);
  const [verifyKey, setVerifyKey] = React.useState(null);
  const [emailVerify, setEmailVerify] = React.useState(null)
  const { baseUrl } = React.useContext(FormContext);
  let navigate = useNavigate();

  const onCloseMailDrawer = () => {
    setMailDrawer(false);
    // setMailData({ mail: "" });
  };
  const onCloseNameDrawer = () => {
    setNameDrawer(false);
  };
  const onCloseOtpDrawer = () => {
    setMailDrawer(true);
    setOtpDrawer(false);
  };
  const handleOtpDrawer = () => {
    setMailDrawer(false);
    setOtpDrawer(true);
  };
  const handleEditName = () => {
    setNameDrawer(true);
  };
  const getData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Hospitals/settings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      const data = response.data;
      setSettingData(data.data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleMailSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post(
        `${baseUrl}/Hospitals/generateEmail`,
        {
          email: mailData.mail,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      console.log(data);
      if (data.status === "success") {
        setVerifyKey(data.details);
        setEmailVerify(mailData.mail)
        setMailDrawer(false);
        setOtpDrawer(true);
      }
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(mailData.mail)
    
    try {
      const response = await axios.post(
        `${baseUrl}/Hospitals/verifyEmail`,
        {
          verifyKey: verifyKey,
          email: emailVerify,
          otp: mailData.otp,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      console.log(data);
      if (data.status === "success") {
        setOtpDrawer(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };
  const handleNameSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);    
    try {
      const response = await axios.post(
        `${baseUrl}/Hospitals/settings/inchargename`,
        {
          inchargeName:name
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      console.log(data);
      if (data.status === "success") {
        setNameDrawer(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };
  const handleTabClick = (tabName) => {
    setShowSelected(tabName);
    sessionStorage.setItem("selectedSettingTab", tabName);
    if (tabName === "help") {
      sessionStorage.setItem("selectedTab", "help");
    } else {
      sessionStorage.setItem("selectedTab", "settings");
    }
  };
  React.useEffect(() => {
    getData();
    setShowSelected(sessionStorage.getItem("selectedSettingTab") || "profile");
  }, [showSelected]);
  return (
    <>
      <div className="w-full font-poppins relative">
        <div className="fixed top-0 bottom-0">
          <Sidebar />
        </div>
        <div className="2xl:max-w-[330px] max-w-[250px] w-full ml-[200px] 2xl:ml-[220px] fixed top-0 bottom-0">
          <div className="flex flex-col  w-full h-screen bg-lightBlue">
            <div className="flex flex-row w-full mt-[55px] ml-[20px] justify-start">
              <span className="text-2xl 2xl:text-3xl font-bold ">Settings</span>
            </div>
            <div className="flex w-full justify-start text-left ml-2 mt-12">
              <ul className="font-normal text-base 2xl:text-lg leading-[70px] text-left text-black pl-0 mr-auto ml-2">
                <li
                  className={`flex flex-row w-[200px] 2xl:w-[260px] cursor-pointer items-center`}
                  onClick={() => {
                    handleTabClick("profile");
                  }}
                  style={
                    showSelected === "profile"
                      ? { backgroundColor: "#ffffff", borderRadius: 10 }
                      : {}
                  }
                >
                  {" "}
                  <div className=" flex mx-2 items-center w-[23px]">
                    <img src={profile2} alt="profile" className="w-full" />
                  </div>
                  Profile
                </li>
                <li
                  className="flex  justify-start cursor-pointer items-center"
                  onClick={() => {
                    handleTabClick("bankaccount");
                  }}
                  style={
                    showSelected === "bankaccount"
                      ? { backgroundColor: "#ffffff", borderRadius: 10 }
                      : {}
                  }
                >
                  {" "}
                  <div className=" flex items-center mx-2 w-[25px]">
                    <img src={bank} alt="bank_account" className="w-full" />
                  </div>
                  Bank Account
                </li>
                <li
                  className="flex justify-start cursor-pointer items-center"
                  onClick={() => {
                    handleTabClick("notifications");
                  }}
                  style={
                    showSelected === "notifications"
                      ? { backgroundColor: "#ffffff", borderRadius: 10 }
                      : {}
                  }
                >
                  {" "}
                  <div className="flex items-center mx-2 ml-1 w-[30px]">
                    <img
                      src={notifications}
                      alt="notifications"
                      className="w-full"
                    />
                  </div>
                  Notifications
                </li>
                <li
                  className="flex justify-start cursor-pointer items-center"
                  onClick={() => {
                    handleTabClick("help");
                  }}
                  style={
                    showSelected === "help"
                      ? { backgroundColor: "#ffffff", borderRadius: 10 }
                      : {}
                  }
                >
                  {" "}
                  <div className="flex items-center mx-2 ml-1 w-[26px]">
                    <img src={help} alt="help_centre" className="w-full" />
                  </div>
                  Help Centre
                </li>
              </ul>
            </div>
            <div className="flex justify-start fixed bottom-0 ml-6">
              <div
                className="flex w-[150px] h-[32px] bg-black text-base 2xl:text-lg justify-center items-center text-white border-1 rounded-lg absolute bottom-6 cursor-pointer"
                onClick={() => {
                  navigate("/login");
                  localStorage.removeItem("token");
                }}
              >
                <span className="mr-auto max-w-[20px] w-full ml-5 mt-2">
                  <img
                    src={require("../../image/logout.png")}
                    className="w-full h-[20px]"
                    alt="logout"
                  />
                </span>
                <span className="ml-auto mr-9">Logout</span>
              </div>
            </div>
          </div>
        </div>
        {settingData === null ? (
          <>
            <div className="fixed inset-0 bg-gray-500 opacity-100 z-50"></div>
            <div className=" flex justify-center items-center w-full h-screen transition ease-in delay-300 ">
              <Spin size="large" />
            </div>
          </>
        ) : (
          <>
            {showSelected === "profile" && (
              <div className="ml-[500px] 2xl:ml-[600px] pb-12">
                <div className="mt-[50px] text-left">
                  <span className="text-2xl 2xl:text-3xl font-bold ml-[10px]">
                    Profile
                  </span>
                </div>
                <div className="flex flex-col mt-[30px] gap-6 text-base 2xl:text-lg">
                  <div className="flex flex-col max-w-[600px] min-h-[100px] h-full justify-center border-1 border-none  bg-lightBlue rounded-xl mt-[15px]">
                    <span className="ml-[50px] mr-auto">Username</span>
                    <span className="ml-[50px] mr-auto font-bold">
                      {settingData?.profile?.username}
                    </span>
                  </div>
                  <div className="flex flex-col max-w-[600px] min-h-[100px] h-full justify-center border-1 border-none  bg-lightBlue rounded-xl mt-[10px]">
                    <span className="ml-[50px] mr-auto">Merchant Name</span>
                    <span className="ml-[50px] mr-auto font-bold">
                      {settingData?.profile?.hospitalName}
                    </span>
                  </div>
                  <div className="flex flex-col max-w-[600px] min-h-[100px] h-full justify-center border-1 border-none  bg-lightBlue rounded-xl mt-[10px]">
                    <div className="flex">
                      <span className="ml-[50px] mr-auto">Incharge Name</span>
                      <span
                        className=" text-blue ml-auto mr-4 cursor-pointer"
                        onClick={handleEditName}
                      >
                        Edit
                      </span>
                    </div>
                    <span className="ml-[50px] mr-auto font-bold">
                      {settingData?.profile?.inChargeName}
                    </span>
                  </div>
                  <div className="flex flex-col max-w-[600px] min-h-[100px] h-full justify-center border-1 border-none  bg-lightBlue rounded-xl mt-[10px]">
                    <span className="ml-[50px] mr-auto">Address</span>
                    <span className="ml-[50px] mr-auto font-bold flex-wrap">
                      {settingData?.profile?.address}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {showSelected === "bankaccount" && (
              <div className="ml-[500px] 2xl:ml-[600px] ">
                <div className="mt-[50px] text-left">
                  <span className="text-2xl 2xl:text-3xl font-bold ml-[10px]">
                    Bank Account
                  </span>
                </div>
                <div className=" flex flex-row max-w-[700px] 2xl:max-w-[900px] w-full break-words 2xl:text-lg text-base mt-[1px] ml-[10px] mr-auto text-left">
                  You will receive your settlements in the bank account below.
                  Write to care@curecoin.in or contact your Account Manager to
                  update the bank account.
                </div>
                <div className="flex flex-col mt-[30px] gap-6 text-base 2xl:text-lg">
                  <div className="flex flex-col max-w-[600px] min-h-[100px] h-full justify-center border-1 border-none bg-lightBlue rounded-xl mt-[15px]">
                    <span className="ml-[50px] mr-auto">Account Number</span>
                    <span className="ml-[50px] mr-auto font-bold">
                      {settingData?.bankAccount?.accountNumber}
                    </span>
                  </div>
                  <div className="flex flex-col max-w-[600px] min-h-[100px] h-full justify-center border-1 border-none bg-lightBlue rounded-xl mt-[15px]">
                    <span className="ml-[50px] mr-auto">IFSC Code</span>
                    <span className="ml-[50px] mr-auto font-bold">
                      SBI000567899
                    </span>
                  </div>
                </div>
              </div>
            )}
            {showSelected === "notifications" && (
              <div className="ml-[500px] 2xl:ml-[600px]">
                <div className="mt-[50px] text-left">
                  <span className="text-2xl 2xl:text-3xl font-bold ml-[10px]">
                    Notifications
                  </span>
                </div>
                <div className=" flex flex-row w-full max-w-[600px] 2xl:max-w-[700px] 2xl:text-lg text-base mt-[1px] ml-[10px] mr-auto">
                  You will receive the notifications about settlements to below
                  email id.
                </div>
                <div className="flex flex-col max-w-[600px] min-h-[100px]  justify-center border-1 border-none 2xl:text-lg text-base bg-lightBlue rounded-xl mt-[40px]">
                  <div className="flex">
                    <span className="ml-[50px] mr-auto">Email</span>
                    <span
                      className="text-blue ml-auto mr-4 cursor-pointer"
                      onClick={() => setMailDrawer(true)}
                    >
                      Edit
                    </span>
                  </div>
                  <span className="ml-[50px] mr-auto font-bold">
                    {settingData?.email}
                  </span>
                </div>
              </div>
            )}
            {showSelected === "help" && (
              <div className="ml-[500px] 2xl:ml-[600px] pb-12">
                <div className="mt-[50px] text-left">
                  <span className="text-2xl 2xl:text-3xl font-bold ml-[10px]">
                    Help Centre
                  </span>
                </div>
                <div className=" flex flex-row w-full max-w-[600px] 2xl:max-w-[700px] text-base 2xl:text-lg text-left mt-[1px] ml-[10px] mr-auto">
                  If you are facing any problem or have any query feel free to
                  reach us at help@cashwave.in or write us below.
                </div>
                <form>
                  <div className="max-w-[600px] w-full mt-[40px]">
                    <textarea
                      name="name"
                      className="w-full min-h-[400px] p-4 2xl:text-lg text-base text-black border-1 border-none placeholder-black bg-lightBlue outline-transparent"
                      placeholder="Write text here"
                      defaultValue=""
                      required
                    />
                  </div>
                  <div className="flex flex-row w-[640px] justify-end mt-7">
                    <button
                      type="submit"
                      className="w-[170px] h-[45px] 2xl:text-lg text-base ml-auto rounded-lg bg-blue text-white border-none cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
            {submitting && (
              <div className="fixed inset-0 bg-gray-500 opacity-100 z-50"></div>
            )}

            {mailDrawer && (
              <Drawer
                placement="right"
                closable={false}
                onClose={onCloseMailDrawer}
                open={mailDrawer}
                width={700}
                className="border-solid border-1 border-aliceblue border-t-0 border-b-0 border-r-0 "
              >
                {submitting && (
                  <div
                    className="bg-blue h-1 absolute top-0 left-0 right-0"
                    style={{
                      width: "100%",
                      animation: "loading-bar 2s infinite",
                    }}
                  ></div>
                )}
                <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
                  <svg
                    className="h-8 w-8 text-black cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={onCloseMailDrawer}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </div>
                <form onSubmit={handleMailSubmit}>
                  <div className="flex flex-col ml-5 mt-8 font-Poppins">
                    <span className="text-2xl 2xl:text-3xl font-bold mt-4">
                      New Email
                    </span>
                    <span className="text-lg 2xl:text-xl font-normal mt-4">
                      We will send verification code to the email you choose.
                    </span>
                  </div>
                  <div className="block mt-5 ml-7">
                    <input
                      type="email"
                      name="mail"
                      className="w-[575px] h-[50px] font-Poppins text-lg px-3 outline-none 2xl:text-xl text-blue border-1 border-solid border-blue placeholder-blue bg-lightBlue border-x-0 border-t-0"
                      placeholder="New Email"
                      value={mailData.mail}
                      onChange={(e) => setMailData({ mail: e.target.value })}
                      required
                    />
                  </div>
                  <div className="w-full block absolute bottom-3 right-0">
                    <Divider className="bg-blue mr-auto" />
                    <div className="flex w-full justify-end mr-8 pb-4">
                      <CustomButton
                        firstButton="CANCEL"
                        secondButton="NEXT"
                        firstButtonHandleClick={onCloseMailDrawer}
                        secondButtonHandleClick={false}
                        isSubmit={true}
                      />
                    </div>
                  </div>
                </form>
              </Drawer>
            )}
            {nameDrawer && (
              <Drawer
                placement="right"
                closable={false}
                onClose={onCloseNameDrawer}
                open={nameDrawer}
                width={700}
                className="border-solid border-1 border-aliceblue border-t-0 border-b-0 border-r-0 "
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
                    onClick={onCloseNameDrawer}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </div>
                <form onSubmit={handleNameSubmit}>
                  <div className="flex flex-col ml-5 mt-8 font-Poppins">
                    <span className="text-2xl 2xl:text-3xl font-bold mt-4">
                      Incharge Name
                    </span>
                  </div>
                  <div className="block mt-5 ml-7">
                    <input
                      type="text"
                      name="name"
                      className="w-[575px] h-[50px] font-Poppins px-2 outline-none text-lg 2xl:text-xl text-blue border-1 border-solid border-blue placeholder-blue bg-lightBlue border-x-0 border-t-0"
                      placeholder="New Name"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-full block absolute bottom-3 right-0">
                    <Divider className="bg-blue mr-auto" />
                    <div className="flex w-full justify-end mr-8 pb-4">
                      <CustomButton
                        firstButton="CANCEL"
                        secondButton="DONE"
                        firstButtonHandleClick={onCloseMailDrawer}
                        secondButtonHandleClick={false}
                        isSubmit={true}
                      />
                    </div>
                  </div>
                </form>
              </Drawer>
            )}
            {otpDrawer && (
              <Drawer
                placement="right"
                closable={false}
                onClose={onCloseOtpDrawer}
                open={otpDrawer}
                width={700}
                className="border-solid border-1 border-aliceblue border-t-0 border-b-0 border-r-0 "
              >
                {submitting && (
                  <div
                    className="bg-blue h-1 absolute top-0 left-0 right-0"
                    style={{
                      width: "100%",
                      animation: "loading-bar 2s infinite",
                    }}
                  ></div>
                )}
                <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
                  <svg
                    className="h-8 w-8 text-black cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={onCloseOtpDrawer}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </div>
                <form onSubmit={handleOtpSubmit}>
                  <div className="flex flex-col ml-5 mt-8 font-Poppins">
                    <span className="text-2xl 2xl:text-3xl font-bold mt-4">
                      Verification Code
                    </span>
                    <span className="text-lg 2xl:text-xl font-normal mt-4">
                      Enter the 6-digit code that we sent to your phone number
                      to finish your authentication.
                    </span>
                  </div>
                  <div className="block mt-5 ml-7">
                    <input
                      type="numeric"
                      name="otp"
                      className="w-[575px] h-[50px] font-Poppins px-2 text-lg 2xl:text-xl text-blue border-1 border-solid border-blue placeholder-blue outline-none bg-lightBlue border-x-0 border-t-0"
                      placeholder="OTP"
                      value={mailData.otp}
                      onChange={(e) => setMailData({ otp: e.target.value })}
                      required
                    />
                  </div>
                  <div className="w-full block absolute bottom-3 right-0">
                    <Divider className="bg-blue mr-auto" />
                    <div className="flex w-full justify-end mr-8 pb-4">
                      <CustomButton
                        firstButton="CANCEL"
                        secondButton="VERIFY"
                        firstButtonHandleClick={onCloseOtpDrawer}
                        secondButtonHandleClick={false}
                        isSubmit={true}
                      />
                    </div>
                  </div>
                </form>
              </Drawer>
            )}
          </>
        )}
      </div>
      <footer className="bottom-0 fixed right-0 2xl:left-[550px] left-[450px]">
        <Footer />
      </footer>
    </>
  );
};

export default Setting;
