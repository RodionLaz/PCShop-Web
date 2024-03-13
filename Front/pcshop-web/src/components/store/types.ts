export  interface IisLogedIn {
    loggedIn: boolean
}

export type IisLogedInState = {
    isLogedInS:IisLogedIn
}

export type isLogedInAction ={
    type:string
    payload:IisLogedIn
}

export type DispatchType = (args: isLogedInAction) => isLogedInAction;