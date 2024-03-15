import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    login:boolean
    username:string
}

const initialState:UserState = {
    login:false,
    username:""
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        logIn: (state) => {
            state.login = true
        },
        logOut:(state) => {
            state.login = false
        }
    },

})
export const {logIn,logOut} = userSlice.actions;

export default userSlice.reducer;