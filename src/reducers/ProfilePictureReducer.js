import {UPLOAD_START, IN_PROGRESS, UPLOAD_ERROR, UPDATE_PROFILE_PICTURE} from "../actions/types";

const initialState = {
    isUploading: false,
    progress: 0,
    error: ''
};

export default function ProfilePictureReducer(state = initialState, action) {
    switch (action.type) {
        case UPLOAD_START:
            return {...state, isUploading: true, progress: 0};
        case IN_PROGRESS:
            return {...state, progress: action.payload};
        case UPLOAD_ERROR:
            return {...state, isUploading: false, error: action.payload};
        case UPDATE_PROFILE_PICTURE:
            return {...state, isUploading: false, progress: 100};
        default:
            return state;
    }
}
