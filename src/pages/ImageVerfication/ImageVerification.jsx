import { Divider, Drawer } from "antd";
import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import CustomerLocation from "../customerLocation/CustomerLocation";
import axios from "axios";
import { FormContext } from "../../Contexts/FormContext";
import CustomButton from "../../components/CustomButton";

const ImageVerification = ({ onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [stream, setStream] = useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [custLocDrawer, setCustLocDrawer] = useState(false);

  const { baseUrl } = React.useContext(FormContext);
  const showError = (err) => {
    toast.error(err, {
      position: "top-right",
    });
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
    // eslint-disable-next-line
  }, []);

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      // Set the video stream to the video element
      videoRef.current.srcObject = newStream;
      setStream(newStream);
    } catch (error) {
      showError("Error accessing camera");
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      // Ensure that video metadata is available before capturing
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg");
      setImageData(imageData);
    }
    stopCamera()
  };

  const stopCamera = () => {
    const video = videoRef.current;
    if (video && stream) {
      stream.getTracks().forEach((track) => track.stop());
      video.srcObject = undefined;
      setStream(null);
    }
  };

  const retakePhoto = () => {
    setImageData(null);
    startCamera();
  };

  const onCloseCustLocDrawer = () => {
    setCustLocDrawer(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const blob = await (await fetch(imageData)).blob();
    const formData = new FormData();
    formData.append("profile", blob);
    try {
      const response = await axios.post(
        `${baseUrl}/Hospitals/addProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: "include",
        }
      );

      const json = response.data;
      console.log(json);

      if (json.status === "success") {
        setSubmitting(false);
        setCustLocDrawer(true);
      }
    } catch (err) {
      showError(err.response.data.message);
      setSubmitting(false);
    }
    stopCamera();
  };

  return (
    <>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        open={!custLocDrawer}
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
              Add Profile
            </span>
            <span className="text-lg 2xl:text-xl font-normal mt-4">
              Make sure customer is clearly visible in the captured photo.
            </span>
          </div>
          <div className="w-[85vw] md:w-[600px]">
            <div className="flex flex-row justify-center items-center border rounded-full bg-slate mt-10 mx-auto w-[300px] h-[300px] overflow-hidden">
              {
                imageData ? (
                  <img
                    src={imageData}
                    alt="Captured_Image"
                    style={{
                      transform: "scaleX(-1)",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                ) : (
                  <video ref={videoRef} width={640} height={280} autoPlay />
                )
              }
            </div>
            {!imageData ? (
              <div>
                <button
                  className="flex justify-center items-center bg-blue text-white text-base 2xl:text-lg font-bold border-solid border-1 border-lightBlue rounded-xl w-[200px] md:w-[300px] h-[55px] mx-auto mt-8 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue"
                  type="button"
                  onClick={captureImage}
                >
                  Capture Image
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="flex justify-center items-center bg-blue text-white text-base 2xl:text-lg font-bold border-solid border-1 border-lightBlue rounded-xl w-[200px] md:w-[300px] h-[55px] mx-auto mt-8 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue"
                  type="button"
                  onClick={retakePhoto}
                >
                  Retake Photo
                </button>
              </div>
            )}
            <canvas ref={canvasRef} style={{ display: "none" }} />
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
      {custLocDrawer && <CustomerLocation onClose={onCloseCustLocDrawer} />}
      {submitting && (
        <div className="fixed inset-0 bg-gray-500 opacity-75 z-50"></div>
      )}
      <ToastContainer />
    </>
  );
};

export default ImageVerification;
// import { Divider, Drawer } from "antd";
// import React, { useRef, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import CustomerLocation from "../customerLocation/CustomerLocation";
// import axios from "axios";
// import { FormContext } from "../../Contexts/FormContext";
// import CustomButton from "../../components/CustomButton";

// const ImageVerification = ({ onClose }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [imageData, setImageData] = useState(null);
//   const [stream, setStream] = useState(null);
//   const [submitting, setSubmitting] = React.useState(false);
//   const [custLocDrawer, setCustLocDrawer] = useState(false);
//   const [isCameraOn, setIsCameraOn] = useState(false);
//   const { baseUrl } = React.useContext(FormContext);
//   const showError = (err) => {
//     toast.error(err, {
//       position: "top-right",
//     });
//   };

//   React.useEffect(() => {
//     startCamera();

//     return () => {
//       stopCamera();
//     };
//     // eslint-disable-next-line
//   }, []);

//   const startCamera = async () => {
//     try {
//       const newStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//       });
//       videoRef.current.srcObject = newStream;
//       setStream(newStream);

//       videoRef.current.onloadedmetadata = () => {
//         if (videoRef.current.videoWidth && videoRef.current.videoHeight) {
//           canvasRef.current.width = videoRef.current.videoWidth;
//           canvasRef.current.height = videoRef.current.videoHeight;
//           setIsCameraOn(true);
//         } else {
//           console.log("Error: Video metadata not available.");
//         }
//       };
//     } catch (error) {
//       console.log("Error accessing camera:", error);
//     }
//   };

//   const captureImage = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
//     const imageData = canvas.toDataURL("image/jpeg");
//     setImageData(imageData);
//   };

//   const retakePhoto = () => {
//     setImageData(null);
//     startCamera();
//   };

//   const onCloseCustLocDrawer = () => {
//     setCustLocDrawer(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     const blob = await (await fetch(imageData)).blob();
//     const formData = new FormData();
//     formData.append("profile", blob);
//     try {
//       const response = await axios.post(`${baseUrl}/Hospitals/addProfile`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: "include",
//       });

//       const json = response.data;
//       console.log(json);

//       if (json.status === "success") {
//         setSubmitting(false);
//         setCustLocDrawer(true);
//       }
//     } catch (err) {
//       showError(err.response.data.message);
//       setSubmitting(false);
//     }
//     stopCamera();
//   };

//   const stopCamera = () => {
//     const video = videoRef.current;
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//       video.srcObject = null;
//       setStream(null);
//       setIsCameraOn(false);
//     }
//   };

//   return (
//     <>
//       <Drawer
//         placement="right"
//         closable={false}
//         onClose={onClose}
//         open={!custLocDrawer}
//         width={700}
//         className="border-solid border-2 border-aliceblue border-t-0 border-b-0 border-r-0 "
//       >
//         {submitting && (
//           <div
//             className="bg-blue h-1 absolute top-0 left-0 right-0"
//             style={{ width: "100%", animation: "loading-bar 2s infinite" }}
//           ></div>)
//         }
//         <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
//           <svg
//             className="h-8 w-8 text-black cursor-pointer"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             onClick={onClose}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M10 19l-7-7m0 0l7-7m-7 7h18"
//             />
//           </svg>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="flex flex-col ml-7 mt-8 font-Poppins">
//             <span className="text-2xl 2xl:text-3xl font-bold mt-4">
//               Add Profile
//             </span>
//             <span className="text-lg 2xl:text-xl font-normal mt-4">
//               Make sure the customer is clearly visible in the captured photo.
//             </span>
//           </div>
//           <div className="w-[600px]">
//             <div className="flex flex-row justify-center items-center border rounded-full bg-slate mt-10 mx-auto w-[300px] h-[300px] overflow-hidden">
//               {isCameraOn ? (
//                 imageData ? (
//                   <img
//                     src={imageData}
//                     alt="Captured_Image"
//                     style={{
//                       transform: "scaleX(-1)",
//                       width: "100%",
//                       height: "100%",
//                     }}
//                   />
//                 ) : (
//                   <video ref={videoRef} width={640} height={280} autoPlay />
//                 )
//               ) : null}
//             </div>
//             {!imageData ? (
//               <div>
//                 <button
//                   className="flex justify-center items-center bg-blue text-white text-base 2xl:text-lg font-bold border-solid border-1 border-lightBlue rounded-xl w-[300px] h-[55px] mx-auto mt-8 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue"
//                   type="button"
//                   onClick={captureImage}
//                 >
//                   Capture Image
//                 </button>
//               </div>
//             ) : (
//               <div>
//                 <button
//                   className="flex justify-center items-center bg-blue text-white text-base 2xl:text-lg font-bold border-solid border-1 border-lightBlue rounded-xl w-[300px] h-[55px] mx-auto mt-8 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue"
//                   type="button"
//                   onClick={retakePhoto}
//                 >
//                   Retake Photo
//                 </button>
//               </div>
//             )}
//             <canvas ref={canvasRef} style={{ display: "none" }} />
//           </div>
//           <div className="w-full block absolute bottom-3 right-0">
//             <Divider className="bg-blue mr-auto" />
//             <div className="flex w-full justify-end mr-8 pb-4">
//               <CustomButton
//                 firstButton="CANCEL"
//                 secondButton="NEXT"
//                 firstButtonHandleClick={onClose}
//                 secondButtonHandleClick={false}
//                 isSubmit={true}
//               />
//             </div>
//           </div>
//         </form>
//       </Drawer>
//       {custLocDrawer && <CustomerLocation onClose={onCloseCustLocDrawer} />}
//       {submitting && (
//         <div className="fixed inset-0 bg-gray-500 opacity-75 z-50"></div>
//       )}
//       <ToastContainer />
//     </>
//   );
// };

// export default ImageVerification;
