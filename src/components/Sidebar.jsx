import React from "react";
import Logo from "../image/Home.png";
import { useNavigate } from "react-router-dom";
import { BsPerson, BsQuestionCircle, BsCartCheck } from "react-icons/bs"; //BsHEart for treatments
import { MdOutlineLocalOffer } from "react-icons/md";

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = React.useState(() => {
    return sessionStorage.getItem("selectedTab") || "dashboard";
  });

  React.useEffect(() => {
    sessionStorage.setItem("selectedTab", selectedTab);
    selectedTab === "help"
      ? sessionStorage.setItem("selectedSettingTab", "help")
      : sessionStorage.setItem("selectedSettingTab", "profile");
    if (
      sessionStorage.getItem("selectedSettingTab") !== "help" &&
      sessionStorage.getItem("selectedTab") === "help"
    ) {
      sessionStorage.setItem("selectedTab", "settings");
    }
    return () => {
      sessionStorage.getItem("selectedTab");
    };
  }, [selectedTab]);

  let navigate = useNavigate();
  return (
    <>
      <div className="2xl:w-[210px] xl:w-[180px] w-full xl:text-[18px] bg-blue h-screen p-2  pt-7 duration-300 font-Poppins ">
        <div className="w-full mr-auto text-left">
          <img
            className="2xl:max-w-[165px] max-w-[150px] w-full mb-[20px] ml-2 mr-auto"
            src={Logo}
            alt="logo"
          />
        </div>
        <div
          className="flex flex-col justify-start w-full overflow-y-scroll text-left max-h-[450px]"
          id="sidebar"
        >
          <ul className="font-normal text-base 2xl:text-lg leading-[70px] text-left pl-0 mr-auto ml-0 2xl:ml-0">
            <li
              className={`flex flex-row 2xl:w-[190px] xl:w-[175px] cursor-pointer items-center text-white`}
              onClick={() => {
                setSelectedTab("dashboard");
                navigate("/dashboard");
              }}
              style={
                selectedTab === "dashboard"
                  ? {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: 10,
                    }
                  : {}
              }
            >
              {" "}
              <div className="flex items-center mx-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_305_339)">
                    <path
                      d="M12 15C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11C10.8954 11 10 11.8954 10 13C10 14.1046 10.8954 15 12 15Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.4502 11.55L15.5002 9.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.4 20C4.93815 18.8381 3.87391 17.2502 3.35478 15.4565C2.83564 13.6627 2.88732 11.7519 3.50265 9.98881C4.11797 8.22573 5.26647 6.69771 6.78899 5.6165C8.3115 4.53529 10.1326 3.95444 12 3.95444C13.8674 3.95444 15.6885 4.53529 17.211 5.6165C18.7335 6.69771 19.882 8.22573 20.4974 9.98881C21.1127 11.7519 21.1644 13.6627 20.6452 15.4565C20.1261 17.2502 19.0619 18.8381 17.6 20H6.4Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_305_339">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              Dashboard
            </li>
            <li
              className="flex items-center justify-start text-white cursor-pointer"
              onClick={() => {
                setSelectedTab("transactions");
                navigate("/transactions");
              }}
              style={
                selectedTab === "transactions"
                  ? {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: 10,
                    }
                  : {}
              }
            >
              {" "}
              <div className="flex items-center mx-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_305_351)">
                    <path
                      d="M21 17H3"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 10L3 7L6 4"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 7H21"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 20L21 17L18 14"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_305_351">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              Transactions
            </li>
            <li
              className="flex items-center justify-start text-white cursor-pointer"
              onClick={() => {
                setSelectedTab("customers");
                navigate("/customers");
              }}
              style={
                selectedTab === "customers"
                  ? {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: 10,
                    }
                  : {}
              }
            >
              {" "}
              <div className="flex items-center mx-2">
                <BsPerson size={24} className="w-full" />
              </div>
              Customers
            </li>
            <li
              className="flex items-center justify-start text-white cursor-pointer"
              onClick={() => {
                setSelectedTab("products");
                navigate("/products");
              }}
              style={
                selectedTab === "products"
                  ? {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: 10,
                    }
                  : {}
              }
            >
              <div className="flex items-center mx-2">
                <BsCartCheck size={24} className="w-full" />
              </div>
              Products
            </li>
            <li
              className="flex items-center justify-start text-white cursor-pointer"
              onClick={() => {
                setSelectedTab("schemes");
                navigate("/schemes");
              }}
              style={
                selectedTab === "schemes"
                  ? {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: 10,
                    }
                  : {}
              }
            >
              <div className="flex items-center mx-2">
                <MdOutlineLocalOffer size={24} className="w-full" />
              </div>
              Schemes
            </li>
            {/* <li
              className="flex items-center justify-start text-white cursor-pointer"
              onClick={() => {
                setSelectedTab("treatments");
                navigate("/treatments");
              }}
              style={
                selectedTab === "treatments"
                  ? {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: 10,
                    }
                  : {}
              }
            >
              {" "}
              <div className="flex items-center mx-2">
                <BsHeart size={24}/>
              </div>
              Treatments
            </li> */}
            <li
              className="flex items-center justify-start text-white cursor-pointer"
              onClick={() => {
                setSelectedTab("repayments");
                navigate("/repayments");
              }}
              style={
                selectedTab === "repayments"
                  ? {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: 10,
                    }
                  : {}
              }
            >
              {" "}
              <div className="flex items-center mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffffff"
                  width="24px"
                  height="24px"
                  viewBox="0 0 1024 1024"
                  className="icon"
                >
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm47.7-395.2l-25.4-5.9V348.6c38 5.2 61.5 29 65.5 58.2.5 4 3.9 6.9 7.9 6.9h44.9c4.7 0 8.4-4.1 8-8.8-6.1-62.3-57.4-102.3-125.9-109.2V263c0-4.4-3.6-8-8-8h-28.1c-4.4 0-8 3.6-8 8v33c-70.8 6.9-126.2 46-126.2 119 0 67.6 49.8 100.2 102.1 112.7l24.7 6.3v142.7c-44.2-5.9-69-29.5-74.1-61.3-.6-3.8-4-6.6-7.9-6.6H363c-4.7 0-8.4 4-8 8.7 4.5 55 46.2 105.6 135.2 112.1V761c0 4.4 3.6 8 8 8h28.4c4.4 0 8-3.6 8-8.1l-.2-31.7c78.3-6.9 134.3-48.8 134.3-124-.1-69.4-44.2-100.4-109-116.4zm-68.6-16.2c-5.6-1.6-10.3-3.1-15-5-33.8-12.2-49.5-31.9-49.5-57.3 0-36.3 27.5-57 64.5-61.7v124zM534.3 677V543.3c3.1.9 5.9 1.6 8.8 2.2 47.3 14.4 63.2 34.4 63.2 65.1 0 39.1-29.4 62.6-72 66.4z" />
                </svg>
              </div>
              Repayments
            </li>
            <hr className="bg-white" />
            <li
              className="flex items-center justify-start text-white cursor-pointer"
              onClick={() => {
                setSelectedTab("settings");
                navigate("/settings");
              }}
              style={
                selectedTab === "settings"
                  ? {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: 10,
                    }
                  : {}
              }
            >
              {" "}
              <div className="flex items-center mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_305_404)">
                    <path
                      d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_305_404">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              Settings
            </li>

            <div className="flex-grow"></div>
            <li
              className="flex 2xl:w-[190px] xl:w-[175px] cursor-pointer items-center text-white bottom-3 absolute"
              onClick={() => {
                setSelectedTab("help");
                navigate("/settings");
              }}
              style={
                selectedTab === "help"
                  ? {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: 10,
                    }
                  : {}
              }
            >
              <div className="flex items-center mx-2">
                <BsQuestionCircle size={24} />
              </div>
              Help Centre
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
