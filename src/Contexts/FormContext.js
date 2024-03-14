import React, { createContext, useState, useEffect } from "react";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
  };
  const baseUrl =
    process.env.REACT_APP_ENV === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL_DEV;
  console.log("basee url is ", baseUrl);
  console.log("env is ", process.env.REACT_APP_ENV);

  // Add useEffect to reset isFormSubmitted after accessing it
  useEffect(() => {
    if (isFormSubmitted) {
      setIsFormSubmitted(false); // Reset to false after accessing
    }
  }, [isFormSubmitted]);

  return (
    <FormContext.Provider
      value={{ isFormSubmitted, handleFormSubmit, baseUrl }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
