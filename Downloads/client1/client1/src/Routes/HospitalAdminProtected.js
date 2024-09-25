import React from "react";
import { Navigate, Route } from "react-router-dom";
const HospitalAdminProtected = (props) => {

 const userdatarole = "hospitaladmin"
  if (userdatarole !== "hospitaladmin") {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }
  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { HospitalAdminProtected, AccessRoute };
