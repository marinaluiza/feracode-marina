import {combineReducers} from 'redux';
import PostsReducer from './PostsReducer';
import UserInfoReducer from './UserInfoReducer';
import ProfilePictureReducer from "./ProfilePictureReducer";
import CoverPhotoReducer from "./CoverPhotoReducer";

export default combineReducers({
    posts: PostsReducer,
    userInfo: UserInfoReducer,
    coverPhoto: CoverPhotoReducer,
    profilePicture: ProfilePictureReducer
});
