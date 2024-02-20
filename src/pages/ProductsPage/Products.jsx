import React from "react";
import ShortSidebar from "../../components/ShortSidebar";

const Products = () => {
  return (
    <>
      <div className="flex w-full">
        <ShortSidebar />
        <div className="container mt-[50px]">
          <div className="flex flex-row justify-between">
            <div className="flex text-black">
              <span className="text-3xl font-bold ml-10">Products</span>
            </div>
            <div className=" flex w-[1200px] h-[37px]  mt-1 rounded-lg border-solid border-1 border-aliceblue bg-transparent justify-start items-center relative">
              <div className="flex ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="28"
                  viewBox="0 0 26 28"
                  fill="none"
                >
                  <g clipPath="url(#clip0_305_150)">
                    <path
                      d="M10.7994 19.8333C14.833 19.8333 18.1029 16.177 18.1029 11.6667C18.1029 7.15634 14.833 3.5 10.7994 3.5C6.76575 3.5 3.49585 7.15634 3.49585 11.6667C3.49585 16.177 6.76575 19.8333 10.7994 19.8333Z"
                      stroke="#1866F9"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.2763 24.5L16.0161 17.5"
                      stroke="#1866F9"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_305_150">
                      <rect
                        width="25.0406"
                        height="28"
                        fill="white"
                        transform="translate(0.365723)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex">
                <input
                  type="search"
                  className="block text-lg w-[1150px] px-2 py-[0.20rem] leading-[1.6] border-none outline-none placeholder:text-aliceblue "
                  id="searchBar"
                  placeholder="Search.."
                />
              </div>
            </div>
            <div className="flex justify-start items-center mr-10">
              <div className="flex text-lg border-solid border-transparent  w-[258px] h-[37px] ">
                <div className="flex w-[50%] h-[37px] text-lg justify-evenly items-center rounded-l-lg bg-black text-white">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_305_158)">
                        <path
                          d="M14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.20101 19.799 3.5 14 3.5C8.20101 3.5 3.5 8.20101 3.5 14C3.5 19.799 8.20101 24.5 14 24.5Z"
                          stroke="white"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path  
                          d="M14 19.8333V19.845"
                          stroke="white"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.0001 15.75C13.9786 15.3713 14.0808 14.9958 14.2912 14.6802C14.5016 14.3645 14.8089 14.1258 15.1667 14C15.6053 13.8323 15.9989 13.5651 16.3166 13.2194C16.6343 12.8738 16.8674 12.4591 16.9976 12.008C17.1278 11.5569 17.1516 11.0818 17.0669 10.62C16.9823 10.1582 16.7916 9.72235 16.5099 9.34676C16.2283 8.97117 15.8632 8.66609 15.4436 8.45554C15.024 8.245 14.5612 8.13474 14.0917 8.13343C13.6222 8.13213 13.1588 8.23983 12.738 8.44804C12.3172 8.65625 11.9505 8.9593 11.6667 9.33332"
                          stroke="white"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_305_158">
                          <rect width="28" height="28" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex mr-6">Help</div>
                </div>
                <div className="flex w-[50%] justify-evenly rounded-r-lg items-center bg-blue text-white">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_305_165)">
                        <path
                          d="M13.9999 12.8333C16.5772 12.8333 18.6666 10.744 18.6666 8.16667C18.6666 5.58934 16.5772 3.5 13.9999 3.5C11.4226 3.5 9.33325 5.58934 9.33325 8.16667C9.33325 10.744 11.4226 12.8333 13.9999 12.8333Z"
                          stroke="white"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 24.5V22.1667C7 20.929 7.49167 19.742 8.36683 18.8668C9.242 17.9917 10.429 17.5 11.6667 17.5H16.3333C17.571 17.5 18.758 17.9917 19.6332 18.8668C20.5083 19.742 21 20.929 21 22.1667V24.5"
                          stroke="white"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_305_165">
                          <rect width="28" height="28" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex mr-6">Profile</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-10">
            <div className="flex flex-row w-full h-[50px] border-solid border-1 bg-lightBlue border-aliceblue text-xl justify-start items-center mb-3 rounded-md">
              <div className="flex px-12">
                Product Name
              </div>
              <div className="flex px-12">
                Retail Price
              </div>
              <div className="flex px-12">
                Unit
              </div>
              <div className="flex px-12">
                Schemes
              </div>
            </div>
            <div className="flex flex-row w-full h-[70px] border-solid border-1 bg-lightBlue border-aliceblue text-xl justify-start items-center rounded-md ">
        
              <div className="flex px-12 text-aliceblue">
              Bingo Mad Angles
              </div>
              <div className="flex px-12">
                3.85
              </div>
              <div className="flex px-12">
                10
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
