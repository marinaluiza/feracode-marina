import {
    UPLOAD_START_COVER,
    UPLOAD_ERROR_COVER,
    UPDATE_COVER_PHOTO
} from "../actions/types";

const initialState = {
    cover: '',
    isUploading: false,
    progress: 0,
    url: '',
    error: ''
};

export default function ProfilePictureReducer(state = initialState, action) {
    switch (action.type) {
        case UPLOAD_START_COVER:
            return {...state, isUploading: true, progress: 0};
        case UPLOAD_ERROR_COVER:
            return {...state, isUploading: false, error: action.payload};
        case UPDATE_COVER_PHOTO:
            return {...state, isUploading: false, progress: 100};
        default:
            return state;
    }
}
