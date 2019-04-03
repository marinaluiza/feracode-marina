import {
    CHANGE_USERNAME,
    LOAD_USER_INFO, UPDATE_COVER_PHOTO, UPDATE_PROFILE_PICTURE,
} from "../actions/types";

const initialState = {
    username: '',
    profileUrl: '',
    coverUrl: ''
};

export default function UserInfoReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USER_INFO:
            return {...state, username: action.payload.username};
        case CHANGE_USERNAME:
            return {...state, username: action.payload};
        case UPDATE_PROFILE_PICTURE:
            return {...state, profileUrl: action.payload};
        case UPDATE_COVER_PHOTO:
            return {...state, coverUrl: action.payload};
        default:
            return state;
    }
}
