import { Drawer } from "antd";
import React from "react";
import { FormContext } from "../../Contexts/FormContext";

const ThankYou = ({ isCustomer }) => {
  const [submit, setSubmit] = React.useState(false);

  const { handleFormSubmit } = React.useContext(FormContext);

  const handleOnClick = () => {
    setSubmit(true);
    handleFormSubmit();
  };
  return (
    <div>
      <Drawer
        placement="right"
        closable={false}
        onClose={handleOnClick}
        open={!submit}
        key="rightSubmit"
        width={window.innerWidth < 768 ? window.innerWidth : 700}
        className="border-2 border-t-0 border-b-0 border-r-0 border-solid border-aliceblue"
      >
        <div className="relative w-full">
          <div className="flex mt-[10px] flex-row justify-start items-start md:ml-5">
            <svg
              className="w-8 h-8 text-black cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={handleOnClick}
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <line x1="18" y1="6" x2="6" y2="18" />{" "}
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <div className="flex items-center justify-center w-full font-Poppins">
            <div className="fixed flex flex-col flex-wrap items-center justify-center space-y-5 top-1/4">
              <div className="w-[200px] ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    fill="#306FC7"
                    d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                  />
                </svg>
              </div>
              <span className="font-bold w-[80vw] md:w-[400px] text-center text-2xl 2xl:text-3xl">
                {isCustomer
                  ? "Customer Registered Successfully"
                  : "Product Added Successfully"}
              </span>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ThankYou;
