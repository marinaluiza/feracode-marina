import React, {Component} from 'react';
import firebase from '../firebase';
import FileUploader from 'react-firebase-file-uploader';
import {connect} from 'react-redux';
import {
    handleUploadStart,
    handleUploadSuccess,
    handleUploadError,
    setUsername,
    saveUsername
} from "../actions";
import profileDefault from '../resources/default-avatar.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


class ProfilePicture extends Component {
    state = {
        isEditingUsername: false,
    };

    handleUploadStart() {
        this.props.handleUploadStart();
    }

    handleUploadError(error) {
        this.props.handleUploadError(error);
    }

    handleUploadSuccess(filename) {
        this.props.handleUploadSuccess(filename);
    }

    renderUsername() {
        if (this.state.isEditingUsername) {
            return (<div className="card-body">
                <form>
                    <div className="form-group">
                        <input
                            type="text"
                            defaultValue={this.props.username}
                            onChange={(event) => this.props.setUsername({name: event.target.value})}
                            className="form-control"/>
                        <a onClick={() => {
                            this.props.saveUsername(this.props.username);
                            this.setState({isEditingUsername: false});
                        }}>
                            <FontAwesomeIcon icon="save" className="icon-username"/>
                        </a>
                    </div>
                </form>
            </div>);
        }
        return (<div className="card-body">
            <label>{this.props.username}</label>
            <a onClick={() => this.setState({isEditingUsername: true})}>
                <FontAwesomeIcon icon="pencil-alt" className="icon-username"/>
            </a>
        </div>);

    }

    loading() {
        if (this.props.isUploading) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="col col-lg-3">

                <div className="card bg-light">
                    <form>
                        <img src={this.props.profileUrl ? this.props.profileUrl : profileDefault} alt={"profile"}
                             className="img-thumbnail img-fluid"/>

                        <div className="card-img-overlay">
                            <label className="label-file">
                                <FontAwesomeIcon icon="camera" className="icon"/>
                                <FileUploader
                                    hidden
                                    accept="image/*"
                                    name="profile"
                                    storageRef={firebase.storage().ref('images/profile')}
                                    onUploadStart={this.handleUploadStart.bind(this)}
                                    onUploadError={this.handleUploadError.bind(this)}
                                    onUploadSuccess={this.handleUploadSuccess.bind(this)}
                                />
                            </label>
                        </div>
                    </form>

                </div>
                {this.loading()}
                {this.renderUsername()}

            </div>
        );
    }
}

const mapStateToProps = state => {
    const {profileUrl, username} = state.userInfo;
    const {isUploading, error} = state.profilePicture;
    return {profileUrl, isUploading, error, username};
};

export default connect(mapStateToProps, {
    handleUploadStart,
    handleUploadSuccess,
    handleUploadError,
    setUsername,
    saveUsername
})(ProfilePicture);