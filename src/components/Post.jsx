import React, {Component} from 'react';

export default (props) => {
    return (

            <div className="container-post">
                <h4>{props.author}</h4>
                <label>{props.post}</label>
            </div>
    );
}