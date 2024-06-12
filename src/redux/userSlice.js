import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	token: "",
	expire: null,
	loading: false,
	mailId: null,
	userId: null,
	profile: {
		email: "",
		userId: "",
		token: "",
		username: "",
	},
	alert: { open: false, type: " ", message: "" },
}

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setToken(state, action) {
			state.token = action.payload.token;
			state.expire = action.payload.expire;
		},
		setUserData(state, action) {
			state.profile = {
				email: action.payload.email,
				userId: action.payload.userId,
				token: action.payload.token,
				username: action.payload.username
			}

		},
		setmailID(state, action) {
			state.mailId = action.payload.mailId
		},
		setUserID(state, action) {
			state.userId = action.payload.userId
		},
		manageLogoutUser(state) {
			state.token = "";
			state.expire = "";
			state.mailId = null;
			state.profile = {
				email: "",
				userId: "",
				token: "",
				username: ""
			};
		},


	},
})

export const { setToken, setUserData, manageLogoutUser, setmailID, setUserID } = userSlice.actions

export default userSlice.reducer