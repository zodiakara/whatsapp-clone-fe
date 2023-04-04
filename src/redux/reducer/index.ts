import { SET_USER_INFO } from "../actions";
import { AnyAction } from "redux";

const initialState = {
    user: null,
};

const mainReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default mainReducer;
