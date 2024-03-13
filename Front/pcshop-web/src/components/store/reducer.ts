import {isLogedInYes,isLogedInNO} from './actionTypes';

const initialState = {
    loggedIn:false
};

const loginReducer = (state = initialState, action:boolean) => {
    switch(action){
        case isLogedInYes:
            return {
                ...state,
                loggedIn: true
            }
        case isLogedInNO:
            return{
                ...state,
                loggedIn:false
            }
        default:
                return state;
    }
};