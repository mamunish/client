import { configureStore } from "@reduxjs/toolkit"
import commonReducer from "../commonSlice"
import userReducer from "../userSlice"

export const store = configureStore({
    reducer: {
        userReducer,
        commonReducer,
    },
})