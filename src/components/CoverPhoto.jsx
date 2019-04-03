import React, {Component} from 'react';
import {connect} from 'react-redux';
import coverDefault from '../resources/default_cover.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FileUploader from "react-firebase-file-uploader";
import firebase from "../firebase";
import {
    handleUploadCoverError,
    handleUploadCoverSuccess,
    handleUploadCoverStart
} from "../actions";


class CoverPhoto extends Component {
    handleUploadStart() {
        this.props.handleUploadCoverStart();
    }

    handleUploadError(error) {
        this.props.handleUploadCoverError(error);
    }

    handleUploadSuccess(filename) {
        this.props.handleUploadCoverSuccess(filename);
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
            <div>
                <div className="card bg-light">
                    <form>
                        <img src={this.props.coverUrl ? this.props.coverUrl : coverDefault} alt={"cover"}
                             className="cover-photo"/>

                        <div className="card-img-overlay">
                            <label className="label-file">
                                <FontAwesomeIcon icon="camera" className="icon"/>
                                <FileUploader
                                    hidden
                                    accept="image/*"
                                    name="profile"
                                    storageRef={firebase.storage().ref('images/cover')}
                                    onUploadStart={this.handleUploadStart.bind(this)}
                                    onUploadError={this.handleUploadError.bind(this)}
                                    onUploadSuccess={this.handleUploadSuccess.bind(this)}
                                />
                            </label>
                        </div>
                    </form>
                </div>
                {this.loading()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {coverUrl, username} = state.userInfo;
    const {isUploading, error} = state.coverPhoto;
    return {coverUrl, isUploading, error, username};
};

export default connect(mapStateToProps, {
    handleUploadCoverSuccess,
    handleUploadCoverStart,
    handleUploadCoverError
})(CoverPhoto);