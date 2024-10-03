import React, { useCallback, useEffect } from 'react';
import PropTypes from "prop-types";
import withRouter from "../../components/Common/withRouter";

// import Components
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import RightSidebar from '../../components/Common/RightSideBar';

//redux
import { useSelector, useDispatch } from "react-redux";

// import { createSelector } from 'reselect';


import {
  changeLayout,
  changeLayoutMode,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  showRightSidebarAction,
} from "../../store/slices/layout";


const Layout = (props) => {
  const dispatch = useDispatch();

  const layoutState = useSelector((state) => state.layout);

  const {
    layoutMode,
    layoutWidth,
    leftSidebarType,
    topbarTheme,
    showRightSidebar,
    leftSidebarTheme,
  } = layoutState;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const toggleMenuCallback = useCallback(() => {
    if (leftSidebarType === "default") {
      dispatch(changeSidebarType("condensed", isMobile));
    } else if (leftSidebarType === "condensed") {
      dispatch(changeSidebarType("default", isMobile));
    }
  }, [dispatch, isMobile, leftSidebarType]);

  const hideRightbar = useCallback((event) => {
    var rightbar = document.getElementById("right-bar");
    if (rightbar && rightbar.contains(event.target)) {
      return;
    } else {
      dispatch(showRightSidebarAction(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (layoutMode || leftSidebarTheme || layoutWidth || leftSidebarType || topbarTheme) {
      window.dispatchEvent(new Event('resize'));
      
      dispatch(changeLayoutMode(layoutMode));
      dispatch(changeSidebarTheme(leftSidebarTheme));
      dispatch(changeLayoutWidth(layoutWidth));
      dispatch(changeSidebarType(leftSidebarType));
      dispatch(changeTopbarTheme(topbarTheme));
    }
  }, [dispatch, layoutMode, leftSidebarTheme, layoutWidth, leftSidebarType, topbarTheme]);

  const userData = useSelector((state) => state.auth.user);



  useEffect(() => {
    document.body.addEventListener("click", hideRightbar, true);
    return () => {
      document.body.removeEventListener("click", hideRightbar, true);
    };
  }, [hideRightbar]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header toggleMenuCallback={toggleMenuCallback} />
        <Sidebar
          theme={leftSidebarTheme}
          type={leftSidebarType}
          isMobile={isMobile}
        /> 
        <div className="main-content p-5">{props.children}</div>
        <Footer />
      </div>
      {showRightSidebar ? <RightSidebar /> : null}
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withRouter(Layout);
