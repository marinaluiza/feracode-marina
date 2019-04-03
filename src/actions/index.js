import firebase from '../firebase';
import {
    IN_PROGRESS,
    LIST_POSTS_SUCCESS,
    LOAD_USER_INFO,
    UPLOAD_ERROR,
    UPLOAD_START,
    CHANGE_USERNAME,
    IN_PROGRESS_COVER,
    UPLOAD_ERROR_COVER,
    UPLOAD_START_COVER,
    UPDATE_COVER_PHOTO,
    UPDATE_PROFILE_PICTURE
} from './types';

export const listPosts = () => {
    return (dispatch) => {
        firebase.database().ref('posts').on('value', snapshot => {
            if (snapshot.val()) {
                dispatch({type: LIST_POSTS_SUCCESS, payload: snapshot.val()});
            }
        })
    }
};

export const savePost = ({author, post}) => {
    return (dispatch) => {
        firebase.database().ref('posts').push({author, post});
    }
};

export const loadUserInfo = () => {
    return (dispatch) => {
        firebase.database().ref('user').on('value', snapshot => {
            dispatch({type: LOAD_USER_INFO, payload: snapshot.val()})
        })
    }
};

export const loadProfilePicture = () => {
    return (dispatch) => {
        firebase.storage().ref('images/profile').child('feracode-profile-picture.jpg').getDownloadURL()
            .then(url => {
                if (url) {
                    dispatch({type: UPDATE_PROFILE_PICTURE, payload: url});
                }

            })
            .catch(error => console.log(error));
    }
};

export const loadCoverPhoto = () => {
    return (dispatch) => {
        firebase.storage().ref('images/cover/feracode-cover-picture.jpg').getDownloadURL()
            .then(url => {
                if (url) {
                    dispatch({type: UPDATE_COVER_PHOTO, payload: url});
                }
            })
            .catch(error => console.log(error));
    }
};

export const handleUploadStart = () => {
    return {type: UPLOAD_START};
};

export const handleProgress = (progress) => {
    return {type: IN_PROGRESS, payload: progress}
};

export const handleUploadError = (error) => {
    return {type: UPLOAD_ERROR, payload: error}
};

export const handleUploadSuccess = (filename) => {
    return (dispatch) => {
        firebase.storage().ref('images/profile').child(filename).getDownloadURL()
            .then(url => dispatch({type: UPDATE_PROFILE_PICTURE, payload: url}));
    }
};

export const setUsername = ({name}) => {
    return {type: CHANGE_USERNAME, payload: name};
};

export const saveUsername = (name) => {
    return (dispatch) => {
        firebase.database().ref('user').update({username: name})
            .then();
    }
};

export const handleUploadCoverStart = () => {
    return {type: UPLOAD_START_COVER};
};

export const handleCoverProgress = (progress) => {
    return {type: IN_PROGRESS_COVER, payload: progress}
};

export const handleUploadCoverError = (error) => {
    return {type: UPLOAD_ERROR_COVER, payload: error}
};

export const handleUploadCoverSuccess = (filename) => {
    return (dispatch) => {
        firebase.storage().ref('images/cover').child(filename).getDownloadURL()
            .then(url => dispatch({type: UPDATE_COVER_PHOTO, payload: url}));
    }
};