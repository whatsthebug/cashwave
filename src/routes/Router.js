import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "../pages/auth/Auth";
import HospitalInfo from "../pages/HospitalInfo/Info";
import HospitalLocation from "../pages/HospitalLocation/HospitalLocation";
import AddAccount from "../pages/addAccount/AddAccount";
import Home from "../pages/Home/Home";
import HospitalHome from "../pages/HospitalPage/HospitalHome";
import Settlements from "../pages/Settlements/Settlements";
// import Treatments from '../pages/Treatments/Treatments'
import Customers from "../pages/customers/Customers";
import Transaction from "../pages/Transactions/Transaction";
import Setting from "../pages/Settings/Setting";
import Repayment from "../pages/Repayments/Repayments";
import CustomerRegistration from "../pages/customerRegistration/CustomerRegistration";
const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("token") ? true : false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const SmallScreenRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Auth />} />
      <Route exact path="/addhospinfo" element={<HospitalInfo />} />
      <Route exact path="/addhosploc" element={<HospitalLocation />} />
      <Route exact path="/addaccount" element={<AddAccount />} />
      <Route exact path="/settlements" element={<Settlements />} />
      {/* <Route exact path="/custregister" element={<PrivateRoute />}> */}
        <Route exact path="/custregister" element={<CustomerRegistration />} />
      {/* </Route> */}
      {/* <Route exact path="/cred" element={<ThankYou/>} /> */}
    </Routes>
  );
};
const Router = () => {
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    handleResize();

    return () => {
      handleResize();
    };
  }, []);

  return (
    <div>
      <BrowserRouter>
        {isSmallScreen ? (
          <SmallScreenRoutes />
        ) : (
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Auth />} />
            <Route exact path="/addhospinfo" element={<HospitalInfo />} />
            <Route exact path="/addhosploc" element={<HospitalLocation />} />
            <Route exact path="/addaccount" element={<AddAccount />} />
            <Route exact path="/settlements" element={<Settlements />} />
            {/* <Route exact path="/treatments" element={<Treatments/>}/> */}
            {/* <PrivateRoute exact path="/dashboard" element={HospitalHome} isAuthenticated={isAuthenticated}/> */}
            <Route exact path="/dashboard" element={<PrivateRoute />}>
              <Route exact path="/dashboard" element={<HospitalHome />} />
            </Route>
            <Route exact path="/repayments" element={<PrivateRoute />}>
              <Route exact path="/repayments" element={<Repayment />} />
            </Route>
            <Route exact path="/customers" element={<PrivateRoute />}>
              <Route exact path="/customers" element={<Customers />} />
            </Route>
            <Route exact path="/transactions" element={<PrivateRoute />}>
              <Route exact path="/transactions" element={<Transaction />} />
            </Route>
            <Route exact path="/settings" element={<PrivateRoute />}>
              <Route exact path="/settings" element={<Setting />} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default Router;
