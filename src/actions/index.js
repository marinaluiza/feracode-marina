import firebase from '../firebase';
import {
    LIST_POSTS_SUCCESS,
    LOAD_USER_INFO,
    UPLOAD_ERROR,
    UPLOAD_START,
    CHANGE_USERNAME,
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
            dispatch({type: LOAD_USER_INFO, payload: snapshot.val()});

            firebase.storage().ref('images/profile').child(snapshot.val().fileProfile).getDownloadURL()
                .then(url => {
                    dispatch({type: UPDATE_PROFILE_PICTURE, payload: url});

                })
                .catch(error => console.log(error));

            firebase.storage().ref('images/cover').child(snapshot.val().fileCover).getDownloadURL()
                .then(url => {
                    dispatch({type: UPDATE_COVER_PHOTO, payload: url});
                })
                .catch(error => console.log(error));
        });
    }
};

export const handleUploadStart = () => {
    return {type: UPLOAD_START};
};

export const handleUploadError = (error) => {
    return {type: UPLOAD_ERROR, payload: error}
};

export const handleUploadSuccess = (filename) => {
    return (dispatch) => {
        firebase.storage().ref('images/profile').child(filename).getDownloadURL()
            .then(url => {
                firebase.database().ref('user').update({fileProfile: filename}).then(
                    dispatch({type: UPDATE_PROFILE_PICTURE, payload: url})
                )
            })
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

export const handleUploadCoverError = (error) => {
    return {type: UPLOAD_ERROR_COVER, payload: error}
};

export const handleUploadCoverSuccess = (filename) => {
    return (dispatch) => {
        firebase.storage().ref('images/cover').child(filename).getDownloadURL()
            .then(url => {
                    firebase.database().ref('user').update({fileCover: filename}).then(
                        dispatch({
                            type: UPDATE_COVER_PHOTO,
                            payload: url
                        })
                    )
                }
            )
    }
};