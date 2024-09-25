
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.services";

export const login = createAsyncThunk(
    "auth/login",
    async (item, thunkAPI) => {
        try {
            const data = await AuthService.login(item);
            return { user: data };
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue({ message });
        }
    }
);

export const hospitalLogin = createAsyncThunk(
    "auth/hospitalLogin",
    async (item, thunkAPI) => {
        try {
            const data = await AuthService.hospitalLogin(item);
            return { user: data };
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue({ message });
        }
    }
);




export const logout = createAsyncThunk("auth/logout", async () => {
    AuthService.removeUserDetails(); 
});

const initialState = {
    loading: false,
    error: "",
    user: AuthService.getUserDetails() || null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = "";
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            });
    },
});

const { reducer } = authSlice;
export default reducer;
