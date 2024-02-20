import React, { createContext, useState } from "react";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
  };
  const baseUrl = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_DEV;
  console.log("basee url is ",baseUrl)
  console.log("env is ",process.env.REACT_APP_ENV)

  return (
    <FormContext.Provider value={{ isFormSubmitted, handleFormSubmit, baseUrl }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };