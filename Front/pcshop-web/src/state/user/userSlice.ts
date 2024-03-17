import { PayloadAction, createSlice, isAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

interface UserState {
    login:boolean
    username:string
    cart:{
        items:Record<string, number>;
    }
}

const initialState: UserState = {
    login: false,
    username: "",
    cart: {
        items: {}
    }
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
        },
        saveUsername:(state,action:PayloadAction<string>) =>{
            state.username = action.payload;
        },
        clearAccount:(state) =>{
            state.login = initialState.login;
            state.username = initialState.username;
            state.cart = initialState.cart;
        },
        addToCart: (state, action: PayloadAction<string>) => {
            const itemId = action.payload;
            state.cart.items[itemId] = (state.cart.items[itemId] || 0) + 1;
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const itemId = action.payload;
            if (state.cart.items[itemId] && state.cart.items[itemId] > 0) {
                state.cart.items[itemId]--;
            }
        }
    },
})
export const {logIn,logOut,saveUsername,clearAccount,addToCart,removeFromCart} = userSlice.actions;

export default userSlice.reducer;