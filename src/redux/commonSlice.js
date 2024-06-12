import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loaderList: [],
}

export const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        addLoader: (state, action) => {
            state.loaderList = [...state.loaderList, action.payload];
        },
        removeLoader: (state, action) => {
            state.loaderList = state.loaderList.filter((x) => x !== action.payload)
        },
    },
})

export const { addLoader, removeLoader } = commonSlice.actions

export default commonSlice.reducer