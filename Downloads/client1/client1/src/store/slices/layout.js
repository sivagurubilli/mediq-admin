import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Utility functions
const changeBodyAttribute = (attribute, value) => {
  if (document.body) document.body.setAttribute(attribute, value);
};

const manageBodyClass = (cssClass, action = "toggle") => {
  switch (action) {
    case "add":
      if (document.body) document.body.classList.add(cssClass);
      break;
    case "remove":
      if (document.body) document.body.classList.remove(cssClass);
      break;
    default:
      if (document.body) document.body.classList.toggle(cssClass);
      break;
  }
};

// Thunks
export const changeLayout = createAsyncThunk(
  "layout/changeLayout",
  async (layout, { dispatch }) => {
    if (layout === "horizontal") {
      dispatch(changeTopbarTheme("light"));
      document.body.removeAttribute("data-sidebar");
      document.body.removeAttribute("data-sidebar-size");
    } else {
      dispatch(changeTopbarTheme("light"));
    }
    changeBodyAttribute("data-layout", layout);
    return layout;
  }
);

export const changeLayoutMode = createAsyncThunk(
  "layout/changeLayoutMode",
  async (layoutMode, { dispatch }) => {
    if (layoutMode === "light") {
      changeBodyAttribute("data-bs-theme", layoutMode);
      dispatch(changeTopbarTheme("light"));
    } else if (layoutMode === "dark") {
      changeBodyAttribute("data-bs-theme", layoutMode);
      dispatch(changeTopbarTheme("dark"));
    }
    return layoutMode;
  }
);

export const changeLayoutWidth = createAsyncThunk(
  "layout/changeLayoutWidth",
  async (width, { dispatch }) => {
    if (width === "boxed") {
      dispatch(changeSidebarType("icon"));
      changeBodyAttribute("data-layout-size", width);
      changeBodyAttribute("data-layout-scrollable", false);
    } else if (width === "scrollable") {
      dispatch(changeSidebarType("default"));
      changeBodyAttribute("data-layout-scrollable", true);
    } else {
      dispatch(changeSidebarType("default"));
      changeBodyAttribute("data-layout-size", width);
      changeBodyAttribute("data-layout-scrollable", false);
    }
    return width;
  }
);

export const changeSidebarTheme = createAsyncThunk(
  "layout/changeSidebarTheme",
  async (theme) => {
    changeBodyAttribute("data-sidebar", theme);
    return theme;
  }
);

export const changeSidebarType = createAsyncThunk(
  "layout/changeSidebarType",
  async ({ sidebarType, isMobile }) => {
    switch (sidebarType) {
      case "compact":
        changeBodyAttribute("data-sidebar-size", "small");
        manageBodyClass("sidebar-enable", "remove");
        manageBodyClass("vertical-collpsed", "remove");
        break;
      case "icon":
        changeBodyAttribute("data-sidebar-size", "");
        changeBodyAttribute("data-keep-enlarged", "true");
        manageBodyClass("vertical-collpsed", "add");
        break;
      case "condensed":
        manageBodyClass("sidebar-enable", "add");
        if (window.screen.width >= 992) {
          manageBodyClass("vertical-collpsed", "remove");
          manageBodyClass("sidebar-enable", "remove");
          manageBodyClass("vertical-collpsed", "add");
          manageBodyClass("sidebar-enable", "add");
        } else {
          manageBodyClass("sidebar-enable", "add");
          manageBodyClass("vertical-collpsed", "add");
        }
        break;
      default:
        changeBodyAttribute("data-sidebar-size", "");
        manageBodyClass("sidebar-enable", "remove");
        if (!isMobile) manageBodyClass("vertical-collpsed", "remove");
        break;
    }
    return { sidebarType, isMobile };
  }
);

export const changeTopbarTheme = createAsyncThunk(
  "layout/changeTopbarTheme",
  async (topbarTheme) => {
    changeBodyAttribute("data-topbar", topbarTheme);
    return topbarTheme;
  }
);

export const showRightSidebarAction = createAsyncThunk(
  "layout/showRightSidebar",
  async (isopen) => {
    if (isopen) {
      manageBodyClass("right-bar-enabled", "add");
    } else {
      manageBodyClass("right-bar-enabled", "remove");
    }
    return isopen;
  }
);

// Initial state
const initialState = {
  layoutType: "vertical",
  layoutMode: "lightmode",
  layoutWidth: "fluid",
  leftSidebarTheme: "dark",
  leftSidebarType: "default",
  topbarTheme: "light",
  showRightSidebar: false,
  isMobile: false,
  showSidebar: true,
  leftMenu: false,
};

// Slice
const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeLayout.fulfilled, (state, action) => {
        state.layoutType = action.payload;
      })
      .addCase(changeLayoutMode.fulfilled, (state, action) => {
        state.layoutMode = action.payload;
      })
      .addCase(changeLayoutWidth.fulfilled, (state, action) => {
        state.layoutWidth = action.payload;
      })
      .addCase(changeSidebarTheme.fulfilled, (state, action) => {
        state.leftSidebarTheme = action.payload;
      })
      .addCase(changeSidebarType.fulfilled, (state, action) => {
        state.leftSidebarType = action.payload.sidebarType;
        state.isMobile = action.payload.isMobile;
      })
      .addCase(changeTopbarTheme.fulfilled, (state, action) => {
        state.topbarTheme = action.payload;
      })
      .addCase(showRightSidebarAction.fulfilled, (state, action) => {
        state.showRightSidebar = action.payload;
      });
  },
});

const { reducer } = layoutSlice;
export default reducer;
