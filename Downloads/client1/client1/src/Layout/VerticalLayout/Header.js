import React, { useState } from "react";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

//import images

import logo from "../../assets/images/lyf-logo.png"
import { useSelector } from "react-redux";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userData = useSelector((state) => state.auth.user);

  const tToggle = () => {
    const body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out...");
  };


  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box text-center">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="logo-sm-dark" height="50" width="60%" />
                </span>
                <span className="logo-lg">
                  <img src={logo} alt="logo-dark" height="50"  width="60%" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light mt-3">
                <span className="logo-sm">
                  <img src={logo} alt="logo-sm-light" height="50"  width="80%" />
                </span>
                <span className="logo-lg">
                  <img src={logo} alt="logo-light" height="40"   width="80%"/>
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-24 header-item waves-effect"
              id="vertical-menu-btn"
              onClick={tToggle}
            >
              <i className="ri-menu-2-line align-middle"></i>
            </button>

           
          </div>
          
          <div className="dropdown ms-auto d-flex">
          <div className="mt-4"><h5>{!userData?.isSuperadmin ?"Super Admin":"Hospital Admin"}</h5></div>
              <button
                className="btn font-size-24 header-item waves-effect "
                onClick={toggleDropdown}               
              >
                <i className="ri-account-circle-fill"></i> {/* Profile Icon */}
              </button>
              {dropdownOpen && (
    <div className="dropdown-menu dropdown-menu-end" style={{ position: 'absolute', zIndex: 1000 }}>
      <Link className="dropdown-item" to="/settings">
        <i className="ri-settings-2-line"></i> {("settings")}
      </Link>
      <button className="dropdown-item" onClick={handleLogout}>
        <i className="ri-logout-circle-r-line"></i> {("logout")}
      </button>
    </div>
  )}
            </div>
        
        </div>
      </header>
    </React.Fragment>
  );
};

export default withTranslation()(Header);
