import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
const AmbulanceAdminProtected = (props) => {
  const userData = useSelector((state) => state.auth.user);
  const role= userData?.role
 
  if ( role !=="privatehospitaladmin" ) {
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

export { AmbulanceAdminProtected, AccessRoute };
