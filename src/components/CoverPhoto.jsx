import React, {Component} from 'react';
import {connect} from 'react-redux';
import coverDefault from '../resources/default_cover.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FileUploader from "react-firebase-file-uploader";
import firebase from "../firebase";
import {
    handleCoverProgress,
    handleUploadCoverError,
    handleUploadCoverSuccess,
    handleUploadCoverStart
} from "../actions";


class CoverPhoto extends Component {
    handleUploadStart() {
        this.props.handleUploadCoverStart();
    }

    handleProgress(progress) {
        this.props.handleCoverProgress(progress)
    }

    handleUploadError(error) {
        this.props.handleUploadCoverError(error);
    }

    handleUploadSuccess(filename) {
        this.props.handleUploadCoverSuccess(filename);
    }

    render() {
        return (
            <div className="card bg-light">
                <form>
                    <img src={this.props.coverUrl ? this.props.coverUrl : coverDefault} alt={"cover"} className="cover-photo"/>

                    <div className="card-img-overlay">
                        <label className="label-file">
                            <FontAwesomeIcon icon="camera" className="icon"/>
                            <FileUploader
                                hidden
                                accept="image/*"
                                name="profile"
                                filename="feracode-cover-picture"
                                storageRef={firebase.storage().ref('images/cover')}
                                onUploadStart={this.handleUploadStart.bind(this)}
                                onUploadError={this.handleUploadError.bind(this)}
                                onUploadSuccess={this.handleUploadSuccess.bind(this)}
                                onProgress={this.handleProgress.bind(this)}
                            />
                        </label>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {coverUrl, username} = state.userInfo;
    const {isUploading, progress, error} = state.coverPhoto;
    return {coverUrl, isUploading, progress, error, username};
};

export default connect(mapStateToProps, {handleUploadCoverSuccess, handleUploadCoverStart, handleUploadCoverError, handleCoverProgress})(CoverPhoto);