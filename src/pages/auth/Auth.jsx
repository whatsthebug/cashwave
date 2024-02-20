import React from "react";
// import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FormContext } from "../../Contexts/FormContext";

const Auth = () => {
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const { baseUrl } = React.useContext(FormContext)

  let navigate = useNavigate();
  const showError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`${baseUrl}/Hospitals/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.status === "Success") {
        localStorage.setItem("token", json.token);
        if(window.innerWidth < 768)
        {
          navigate("/custregister")
        }
        else if (json.navigate) {
          navigate("/dashboard");
        } else {
          navigate("/addhospinfo");
        }
      } else if (json.reply === "Not Registered") {
        toast.error("User not registered. Please Try Again!",{
          position:"top-right"
        })
      }
      else
      {
        toast.error(<>Invalid Credentials.<br/> Please Try Again!</>,{
          position:"top-right",
          allowHtml:"true"
        })
      }
    } catch (err) {
      
      showError(err.reply);
    }
    setSubmitting(false);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  React.useEffect(()=>{
    sessionStorage.removeItem('selectedTab');
  })

  return (
    <>
      <div className="flex w-full min-h-screen h-full font-Poppins relative">
        {submitting && (
          <div
            className="bg-blue h-1 absolute top-0 left-0 right-0"
            style={{ width: "100%", animation: "loading-bar 2s infinite" }}
          ></div>
        )}
        <div className="w-[70vw] h-full top-0 bottom-0 left-0 fixed hidden md:block">
          <div className="bg-blue opacity-40 inset-0 fixed"></div>
          <img
            src={require("../../image/bg_login.png")}
            alt="bgimage"
            className="w-[70vw] h-screen"
          />
        </div>
        <div className="bg-blue w-full md:w-[30vw] h-full top-0 bottom-0 overflow-auto absolute right-0">
          <div className="mt-[120px]">
            <img
              src={require("../../image/Home.png")}
              alt="cashwave"
              className="max-w-[250px] w-full"
            />
          </div>
          <div className="flex flex-col justify-center items-center mt-6">
            <span className="2xl:text-3xl text-2xl text-white font-bold">Sign In</span>
            <span className="text-sm md:text-lg text-white mt-2">
              Use your Cashwave account.
            </span>
          </div>
          <form
            className="flex flex-col flex-grow ml-2 pb-12 px-8 md:px-12"
            onSubmit={handleSubmit}
          >
            <div className="flex mt-[2rem] h-[55px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="text"
                name="username"
                id="username"
                className="block w-full my-auto ml-4 font-normal text-base md:text-lg text-left bg-transparent outline-none text-white placeholder-white border-none"
                placeholder="User Name"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex mt-[1rem] h-[55px] flex-row items-start border-1 border-solid bg-softblue  rounded-lg border-transparent">
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full my-auto ml-4 font-normal text-base md:text-lg text-left bg-transparent outline-none text-white placeholder-white border-none"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-grow"></div>
            <div className="flex flex-row justify-center items-center mt-10">
              <button
                type="submit"
                className="text-white bg-darkBlue cursor-pointer border-none text-lg 2xl:text-xl rounded-lg mr-2 mb-2 max-w-[594px] w-full h-[55px] transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 delay-150"
                disabled={submitting}
              >
                <span className="align-center mb-4 font-['Poppins'] font-bold">
                  SIGN IN
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

export default Auth;
