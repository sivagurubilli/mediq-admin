import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
const SuperAdminProtected = (props) => {
  const userData = useSelector((state) => state.auth.user);
  const role= userData?.role
 
  if ( role !=="superadmin" ) {
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

export {SuperAdminProtected, AccessRoute };
