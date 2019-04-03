import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {listPosts, savePost} from '../actions';
import Post from './Post';


class PostsList extends Component {
    state = {
        newPost: ''
    };

    componentDidMount() {
        this.props.listPosts();
    }

    renderPosts() {
        if (this.props.posts) {
            return (
                this.props.posts.map(item => (
                    <li key={item.uid} className="list-group-item">
                        <Post author={item.author} post={item.post}/>
                    </li>)));
        }
        return <li className="list-group-item"><label>Nenhum post publicado</label></li>;
    }

    sendNewPost() {
        this.props.savePost({author: this.props.username, post: this.state.newPost});
        this.setState({newPost: ''});
    }

    render() {
        return (
            <div className="col">
                <ul className="list-group">
                    <li className="list-group-item">
                            <textarea onChange={(event) => this.setState({newPost: event.target.value})}
                                      value={this.state.newPost} className="form-control" rows="3"/>
                        <button onClick={this.sendNewPost.bind(this)} className="btn btn-primary">Enviar</button>
                    </li>
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }

}


const mapStateToProps = state => {
    const {username} = state.userInfo;
    const posts = _.map(state.posts, (val, uid) => {
        return {...val, uid}
    });
    return {posts, username};
};

export default connect(mapStateToProps, {listPosts, savePost})(PostsList);
