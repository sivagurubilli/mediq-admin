import React from "react";
import { Navigate } from "react-router-dom";
import Login1 from "../Pages/AuthenticationPages/Login";
import ForgotPassword from "../Pages/AuthenticationPages/ForgotPassword";
import ResetPassword from "../Pages/AuthenticationPages/ResetPassword";
import ListingTypePage from "../Pages/ListingType/ListingTypes";
import AddListingTypePage from "../Pages/ListingType/AddListingTypes";
import EditListingTypePage from "../Pages/ListingType/EditListingTypes";
import FirstAidCategories from "../Pages/FirstAidCategories/FirstAidCategories";
import EditFirstAidCategory from "../Pages/FirstAidCategories/EditFirstAidCategory";
import AddFirstAidCategory from "../Pages/FirstAidCategories/AddFirstAidCategories";
import FirstAID from "../Pages/FirstAid/FirstAid";
import AddFirstAid from "../Pages/FirstAid/AddFirstAid";
import EditFirstAid from "../Pages/FirstAid/EditFirstAid";
import Hospitals from "../Pages/Hospitals/Hospital";
import AddHospital from "../Pages/Hospitals/AddHospital";
import EditHospital from "../Pages/Hospitals/EditHospital";
import Amenities from "../Pages/Amenities/Amenities";
import AmbulenceTypes from "../Pages/AmbulenceTypes/AmbulenceTypes";
import AddAmenities from "../Pages/Amenities/AddAmenities";
import EditAmenities from "../Pages/Amenities/EditAmenities";
import AddAmbulenceTypes from "../Pages/AmbulenceTypes/AddAmbulenceTypes";
import EditAmbulenceTypes from "../Pages/AmbulenceTypes/EditAmbulenceTypes";
import Listing from "../Pages/Listing/Listing";
import PrivateAmbulanceAgent from "../Pages/PrivateAmbulanceAgent/PrivateAmbulanceAgent";
import AddPrivateAmbulanceAgent from "../Pages/PrivateAmbulanceAgent/CreatePrivateAmbulanceAgent";
import Crm from "../Pages/Dashboard/crm/crm";
import EditPrivateAmbulanceAgent from "../Pages/PrivateAmbulanceAgent/EditPrivateAmbulanceAgent";
import BookingManager from "../Pages/AmbulanceAdmin/BookingManager/BookingaManager";
import Ambulance from "../Pages/AmbulanceAdmin/Ambulance/Ambulance";
import Driver from "../Pages/AmbulanceAdmin/Driver/Driver";
import AddAmbulance from "../Pages/AmbulanceAdmin/Ambulance/AddAmbulance";
import AddListing from "../Pages/Listing/AddListing";
import EditListing from "../Pages/Listing/EditListing";
import BookingManagers from "../Pages/BookinManagers/BookingManager";
import AddBookingManagers from "../Pages/BookinManagers/AddBookingManager.jsx"
import EditBookingManagers from "../Pages/BookinManagers/EditBookingManager.jsx";
import WalletBalancePage from "../Pages/Booking/Wallet.jsx";
import BookingsDetails from "../Pages/Booking/Bookingsdetails.jsx";
import HospitalWalletBalance from "../Pages/HospitalAdmin/Wallet/wallet.jsx";
import HospitalBranches from "../Pages/HospitalAdmin/Branches/Branches.jsx";
import HospitalBookingManagers from "../Pages/HospitalAdmin/HospitalBookingManager.jsx";
import AddHospitalBranch from "../Pages/HospitalAdmin/Branches/AddHospitalBranch.jsx";
import HospitalProfile from "../Pages/HospitalAdmin/Profile/HospitalProfile.jsx";
import EditHospitalBranch from "../Pages/HospitalAdmin/Branches/EditHopitalaBranch.jsx";
import AdminDriver from "../Pages/Driver/Driver.jsx";
import AdminAddDriver from "../Pages/Driver/AddDriver.jsx";
import AdminEditDriver from "../Pages/Driver/EditDriver.jsx";
import EditAmbulance from "../Pages/AmbulanceAdmin/Ambulance/EditAmbulance.jsx";

const superadminRoutes = [
  {path:"/", component: <Crm /> },

  { path: "/admin", component: <Crm /> },
  { path: "/admin/dashboard", component: <Crm /> },
  { path: "/admin/listing-types", component: <ListingTypePage /> },
  { path: "/admin/add-listing-types", component: <AddListingTypePage /> },
  { path: "/admin/edit-listing-types/:id", component: <EditListingTypePage /> },  
  {path:"/admin/first-aid-categories", component: <FirstAidCategories /> },
  {path:"/admin/edit-first-aid-category/:id", component: <EditFirstAidCategory /> },
  {path:"/admin/add-first-aid-category", component: <AddFirstAidCategory /> },
  {path:"/admin/first-aid", component: <FirstAID /> },
  {path:"/admin/add-first-aid", component: <AddFirstAid /> },
  {path:"/admin/edit-first-aid/:id", component: <EditFirstAid /> },

  {path:"/admin/hospitals", component: <Hospitals /> },
  {path:"/admin/add-hospital", component: <AddHospital /> },
  {path:"/admin/edit-hospital/:id", component: <EditHospital /> },

  {path:"/admin/amenities", component: <Amenities /> },
  {path:"/admin/add-amenities", component: <AddAmenities /> },
  {path:"/admin/edit-amenities/:id", component: <EditAmenities /> },

  {path:"/admin/ambulance-types", component: <AmbulenceTypes /> },
  {path:"/admin/add-ambulance-types", component: <AddAmbulenceTypes /> },
  {path:"/admin/edit-ambulance-types/:id", component: <EditAmbulenceTypes /> },

  //private ambulance agent
  {path:"/admin/private-ambulance-agent", component: <PrivateAmbulanceAgent /> },
  {path:"/admin/add-private-abmulance-agent", component: <AddPrivateAmbulanceAgent /> },
  {path:"/admin/edit-private-abmulance-agent/:id", component: <EditPrivateAmbulanceAgent /> },

  {path:"/admin/listing/:id", component: <Listing /> },
  { path: "/admin/add-listing", component: <AddListing /> },
  { path: "/admin/edit-listing/:id", component: <EditListing /> },

  //bnooking manager
  
  {path:"/admin/booking-managers", component: <BookingManagers /> },
  { path: "/admin/add-booking-manager", component: <AddBookingManagers /> },
  { path: "/admin/edit-booking-manager/:id", component: <EditBookingManagers /> },

  //drivers
  {path:"/admin/drivers", component: <AdminDriver /> },
  { path: "/admin/add-driver", component: <AdminAddDriver /> },
  { path: "/admin/edit-driver/:id", component: <AdminEditDriver /> },

  { path: "/admin/wallet", component: <WalletBalancePage /> },
  { path: "/admin/invoices", component: <BookingsDetails /> },

  
]
const ambulanceAdminRoutes = [

  { path: "/private-ambulance", component: <Crm /> },
  { path: "/private-ambulance/booking-manager", component: <BookingManager /> },
 
  { path: "/private-ambulance/ambulance", component: <Ambulance /> },
  { path: "/private-ambulance/add-ambulance", component: <AddAmbulance /> },
  { path: "/private-ambulance/edit-ambulance/:id", component: <EditAmbulance /> },

  { path: "/private-ambulance/driver", component: <Driver /> },
  

];

const hospitaladminroutes = [
  { path: "/hospitals/", component: <Crm /> },
  { path: "/hospitals/booking-manager", component: <HospitalBookingManagers /> },
  { path: "/hospitals/wallet", component: <HospitalWalletBalance /> },
  { path: "/hospitals/branches", component: <HospitalBranches /> },
  { path: "/hospitals/add-branches", component: <AddHospitalBranch /> },
  { path: "/hospitals/edit-branches/:id", component: <EditHospitalBranch /> },

  { path: "/hospitals/profile", component: <HospitalProfile /> },

  
  

];



const publicRoutes = [
  { path: "/admin", component: <Login1 /> },
  { path: "/admin/forgot-password", component: <ForgotPassword /> },
  { path: "/admin/reset-password", component: <ResetPassword /> },
  { path: "/admin/login", component: <Login1 /> },
  { path: "/login", component: <Login1 /> },


  {
    path: "*",
    exact: true,
    component: <Navigate to="/admin/login" />,
  },
 
];

export { superadminRoutes, publicRoutes ,ambulanceAdminRoutes,hospitaladminroutes};
