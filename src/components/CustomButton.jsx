import React from "react";

const CustomButton = ({
  firstButton,
  secondButton,
  firstButtonHandleClick,
  secondButtonHandleClick,
  isSubmit,
}) => {
  const typeButton = isSubmit ? "submit" : "button";
  return (
    <div className="flex outline-none w-[200px] h-[40px] text-[16px] font-semibold mr-6">
      <button
        className="flex w-[50%] h-[40px] justify-evenly items-center rounded-l-lg bg-black text-white cursor-pointer border-none"
        onClick={firstButtonHandleClick}
      >
        <div className="flex mr-2">{firstButton}</div>
      </button>
      {!secondButtonHandleClick ? (
        <button
          className="flex w-[50%] h-[40px] justify-evenly rounded-r-lg items-center bg-blue text-white cursor-pointer outline-none border-none"
          type={typeButton}
        >
          <div className="flex mr-2">{secondButton}</div>
        </button>
      ) : (
        <button
          className="flex w-[50%] h-[40px] justify-evenly rounded-r-lg items-center bg-blue text-white cursor-pointer outline-none border-none"
          onClick={secondButtonHandleClick}
        >
          <div className="flex mr-2">{secondButton}</div>
        </button>
      )}
    </div>
  );
};

export default CustomButton;
