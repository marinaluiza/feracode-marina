import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProfilePicture from "./components/ProfilePicture";
import PostsList from "./components/PostsList";
import {loadUserInfo} from "./actions/index";
import CoverPhoto from "./components/CoverPhoto";

class App extends Component {
    componentDidMount() {
        this.props.loadUserInfo();
    }

    render() {
        return(
            <div className="container">
                <CoverPhoto />
                <div className="row justify-content-md-center ">
                    <ProfilePicture />
                    <PostsList/>
                </div>
            </div>
        );
    }
}

export default connect(null, {loadUserInfo})(App);