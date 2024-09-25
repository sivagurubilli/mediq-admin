import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
//constants
import { layoutTypes } from "../constants/layout";
// layouts
import NonAuthLayout from "../Layout/NonAuthLayout";
import VerticalLayout from "../Layout/VerticalLayout/index";
import {  ambulanceAdminRoutes, superadminRoutes, publicRoutes, hospitaladminroutes } from "./routes";
import Login from "../Pages/AuthenticationPages/Login";
import {SuperAdminProtected} from "./superAdminProtected"
import  {AmbulanceAdminProtected}  from "./ambulanceAdminProtected";
import { HospitalAdminProtected } from "./HospitalAdminProtected";

const getLayout = (layoutType) => {
 
  let Layout = VerticalLayout;
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = VerticalLayout;
      break;
   
    default:
      Layout = VerticalLayout;
      break;
  }
  return Layout;
};


const Index = () => {
   const userData = useSelector((state) => state.auth.user);
  const Layout = getLayout("vertiacal");
  return (
    <Routes>
      <Route>
        {  userData?.status !== 200 && publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <NonAuthLayout>
                  {route.component}
              </NonAuthLayout>
          }
            key={idx}
            exact={true}
          />
        ))}
      </Route>

      <Route>
          {superadminRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <SuperAdminProtected>
                    <Layout>{route.component}</Layout>
                </SuperAdminProtected>}
              key={idx}
              exact={true}
            />
          ))}
      </Route>
      <Route>
          {ambulanceAdminRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AmbulanceAdminProtected>
                    <Layout>{route.component}</Layout>
                </AmbulanceAdminProtected>}
              key={idx}
              exact={true}
            />
          ))}
      </Route>
      <Route>
          {hospitaladminroutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <HospitalAdminProtected>
                    <Layout>{route.component}</Layout>
                </HospitalAdminProtected>}
              key={idx}
              exact={true}
            />
          ))}
      </Route>
     

      
      
    </Routes>
  );
};

export default Index;
