import {isLogedInYes,isLogedInNO} from './actionTypes';
import { isLogedInAction } from './types';

export const setIsLogedInYes = (isLoggedIn: boolean): isLogedInAction => ({
    type: isLogedInYes,
    payload: { loggedIn: isLoggedIn } 
  });
  
  export const setIsLogedInNo = (isLoggedIn: boolean): isLogedInAction => ({
    type: isLogedInNO,
    payload: { loggedIn: isLoggedIn } 
  });