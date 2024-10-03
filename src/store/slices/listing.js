
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LystingTypeService from "../../services/MasterData/listingtype.service";

export const listing = createAsyncThunk(
    "auth/listing",
    async ( thunkAPI) => {
        try {
            const data = await LystingTypeService.getListingType();
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






const initialState = {
    loading: false,
    error: "",
    listing:  null,
};

const listingSlice = createSlice({
    name: "getlisting",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listing.pending, (state) => {
                state.loading = true;
                state.error = "";
                state.listing = null;
            })
            .addCase(listing.fulfilled, (state, action) => {
                state.loading = false;
                state.error = "";
            
                state.listing = action.payload.user;
            })
            .addCase(listing.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.listing = null;
            })
            
    },
});

const { reducer } = listingSlice;
export default reducer;
