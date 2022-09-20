import ACTIONS from "../actions";

const initialState = {
    isLoggedIn :false,
    accessToken:'',
    userAuth:'',
    userDetails:'',
    userPersonalTasks:'',
};

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN : return {...state, isLoggedIn:true };
        case ACTIONS.LOGOUT : return {...state, isLoggedIn:false};
        case ACTIONS.GETTOKEN : return {...state, accessToken:action.payload};
        case ACTIONS.USERAUTH : return {...state, userAuth:action.payload};
        case ACTIONS.USERDETAILS: return {...state, userDetails:action.payload};
        case ACTIONS.USERPERSONALTASKS : return {...state, userPersonalTasks:action.payload};
        default : return state
    };
};

export default userReducer;
