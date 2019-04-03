import {LIST_POSTS_SUCCESS} from "../actions/types";

const initialState = {
    posts: {}
};

export default function PostsReducer(state = initialState, action) {
    switch (action.type) {
        case LIST_POSTS_SUCCESS:
            return action.payload;
        default:
            return state;
    }

}
