
import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutMode,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  showRightSidebarAction,
} from "../../store/slices/layout";

//SimpleBar
import SimpleBar from "simplebar-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./rightbar.scss";

//Import images
import layout1 from "../../assets/images/layouts/layout-1.png";
import layout2 from "../../assets/images/layouts/layout-2.png";
import layout3 from "../../assets/images/layouts/layout-3.png";

//constants
import {
  layoutTypes,
  layoutWidthTypes,
  topBarThemeTypes,
  leftSidebarTypes,
  leftSideBarThemeTypes,
  layoutModeTypes,
} from "../../constants/layout";

const RightSidebar = props => {

  const dispatch = useDispatch();
  const {
    layoutType,
    layoutMode,
    layoutWidth,
    topbarTheme,
    leftSidebarType,
    showRightSidebar,
    leftSidebarTheme,
  } = useSelector((state) => state.layout);




  return (
    <React.Fragment>
      <div className="right-bar" id="right-bar">
        <SimpleBar style={{ height: "900px" }}>
          <div data-simplebar className="h-100">
            <div className="rightbar-title px-3 py-4">
              <Link
                to="#"
                onClick={e => {
                  e.preventDefault();
                  dispatch(showRightSidebarAction(!showRightSidebar))
               
                }}
                className="right-bar-toggle float-end"
              >
                <i className="mdi mdi-close noti-icon" />
              </Link>
              <h5 className="m-0">Settings</h5>
            </div>

            <hr className="my-0" />

            <div className="p-4">
              <div className="radio-toolbar">
                <span className="mb-2 d-block">Layouts</span>
                <input
                  type="radio"
                  id="radioVertical"
                  name="radioFruit"
                  value={layoutTypes.VERTICAL}
                  checked={layoutType === layoutTypes.VERTICAL}
                  onChange={e => {
                    if (e.target.checked) {
                      dispatch(changeLayout(e.target.value))
                    }
                  }}
                />
                <label className="me-1" htmlFor="radioVertical">Vertical</label>
                <input
                  type="radio"
                  id="radioHorizontal"
                  name="radioFruit"
                  value={layoutTypes.HORIZONTAL}
                  checked={layoutType === layoutTypes.HORIZONTAL}
                  onChange={e => {
                    if (e.target.checked) {
                      dispatch(changeLayout(e.target.value))
                    }
                  }}
                />
                <label htmlFor="radioHorizontal">Horizontal</label>
              </div>

              <hr className="mt-1" />

              {/* Layout Mode */}
              <div className="radio-toolbar">
                <span className="mb-2 d-block">Layout Mode</span>
                <input
                  type="radio"
                  id="radioLightmode"
                  name="radioMode"
                  value={layoutModeTypes.LIGHTMODE}
                  checked={layoutModeTypes === layoutModeTypes.LIGHTMODE}
                  onChange={e => {
                    if (e.target.checked) {
                      dispatch(changeLayoutMode(e.target.value))
                    }
                  }}
                />
                <label className="me-1" htmlFor="radioLightmode">Light</label>

                <input
                  type="radio"
                  id="radioDarkMode"
                  name="radioMode"
                  value={layoutModeTypes.DARKMODE}
                  checked={layoutModeTypes === layoutModeTypes.DARKMODE}
                  onChange={e => {
                    if (e.target.checked) {
                      dispatch(changeLayoutMode(e.target.value))
                    }
                  }}
                />
                <label htmlFor="radioDarkMode">Dark</label>
              </div>
              <hr className="mt-1" />
              <div className="radio-toolbar">
                <span className="mb-2 d-block" id="radio-title">
                  Layout Width
                </span>
                <input
                  type="radio"
                  id="radioFluid"
                  name="radioWidth"
                  value={layoutWidthTypes.FLUID}
                  checked={layoutWidth === layoutWidthTypes.FLUID}
                  onChange={e => {
                    if (e.target.checked) {
                      dispatch(changeLayoutWidth(e.target.value))
                    }
                  }}
                />
                <label className="me-1" htmlFor="radioFluid">Fluid</label>
                <input
                  type="radio"
                  id="radioBoxed"
                  name="radioWidth"
                  value={layoutWidthTypes.BOXED}
                  checked={layoutWidth === layoutWidthTypes.BOXED}
                  onChange={e => {
                    if (e.target.checked) {
                      dispatch(changeLayoutWidth(e.target.value))
                    }
                  }}
                />
                <label htmlFor="radioBoxed" className="me-2">
                  Boxed
                </label>
              </div>
              <hr className="mt-1" />

              <div className="radio-toolbar">
                <span className="mb-2 d-block" id="radio-title">
                  Topbar Theme
                </span>
                <input
                  type="radio"
                  id="radioThemeLight"
                  name="radioTheme"
                  value={topBarThemeTypes.LIGHT}
                  checked={topbarTheme === topBarThemeTypes.LIGHT}
                  onChange={e => {
                    if (e.target.checked) {
                      dispatch(changeTopbarTheme(e.target.value))
                    }
                  }}
                />
                <label className="me-1" htmlFor="radioThemeLight">Light</label>
                <input
                  type="radio"
                  id="radioThemeDark"
                  name="radioTheme"
                  value={topBarThemeTypes.DARK}
                  checked={topbarTheme === topBarThemeTypes.DARK}
                  onChange={e => {
                    if (e.target.checked) {
                      dispatch(changeTopbarTheme(e.target.value))
                    }
                  }}
                />
                <label className="me-1" htmlFor="radioThemeDark">Dark</label>
              </div>

              {layoutType === "vertical" ? (
                <React.Fragment>
                  <hr className="mt-1" />
                  <div className="radio-toolbar">
                    <span className="mb-2 d-block" id="radio-title">
                      Left Sidebar Type{" "}
                    </span>
                    <input
                      type="radio"
                      id="sidebarDefault"
                      name="sidebarType"
                      value={leftSidebarTypes.DEFAULT}
                      checked={leftSidebarType === leftSidebarTypes.DEFAULT}
                      onChange={e => {
                        if (e.target.checked) {
                          dispatch(changeSidebarType(e.target.value))
                        }
                      }}
                    />
                    <label className="me-1" htmlFor="sidebarDefault">Default</label>
                    <input
                      type="radio"
                      id="sidebarCompact"
                      name="sidebarType"
                      value={leftSidebarTypes.COMPACT}
                      checked={leftSidebarType === leftSidebarTypes.COMPACT}
                      onChange={e => {
                        if (e.target.checked) {
                          dispatch(changeSidebarType(e.target.value))
                        }
                      }}
                    />
                    <label className="me-1" htmlFor="sidebarCompact">Compact</label>
                    <input
                      type="radio"
                      id="sidebarIcon"
                      name="sidebarType"
                      value={leftSidebarTypes.ICON}
                      checked={leftSidebarType === leftSidebarTypes.ICON}
                      onChange={e => {
                        if (e.target.checked) {
                          dispatch(changeSidebarType(e.target.value))
                        }
                      }}
                    />
                    <label className="me-1" htmlFor="sidebarIcon">Icon</label>
                  </div>

                  <hr className="mt-1" />

                  <div className="radio-toolbar">
                    <span className="mb-2 d-block" id="radio-title">
                      Left Sidebar Color Options
                    </span>
                    <input
                      type="radio"
                      id="leftsidebarThemelight"
                      name="leftsidebarTheme"
                      value={leftSideBarThemeTypes.LIGHT}
                      checked={leftSidebarTheme === leftSideBarThemeTypes.LIGHT}
                      onChange={e => {
                        if (e.target.checked) {
                          dispatch(changeSidebarTheme(e.target.value))
                        }
                      }}
                    />
                    <label className="me-1" htmlFor="leftsidebarThemelight">Light</label>
                    <input
                      type="radio"
                      id="leftsidebarThemedark"
                      name="leftsidebarTheme"
                      value={leftSideBarThemeTypes.DARK}
                      checked={leftSidebarTheme === leftSideBarThemeTypes.DARK}
                      onChange={e => {
                        if (e.target.checked) {
                          dispatch(changeSidebarTheme(e.target.value))
                        }
                      }}
                    />
                    <label className="me-1" htmlFor="leftsidebarThemedark">Dark</label>
                  </div>
                  <hr className="mt-1" />
                </React.Fragment>
              ) : null}

              <h6 className="text-center">Choose Layouts</h6>

              <div className="mb-2">
                <Link to="#" target="_blank">
                  <img src={layout1} className="img-fluid img-thumbnail" alt="" />
                </Link>
              </div>

              <div className="mb-2">
                <Link to="#" target="_blank">
                  <img src={layout2} className="img-fluid img-thumbnail" alt="" />
                </Link>
              </div>

              <div className="mb-2">
                <Link to="#" target="_blank">
                  <img src={layout3} className="img-fluid img-thumbnail" alt="" />
                </Link>
              </div>

              <Link
                to="#"
                className="btn btn-primary btn-block mt-3"
                target="_blank"
              >
                <i className="mdi mdi-cart ms-1" /> Purchase Now
              </Link>
            </div>
          </div>
        </SimpleBar>
      </div>
      <div className="rightbar-overlay"></div>
    </React.Fragment>
  );
};


export default withTranslation()(RightSidebar);
