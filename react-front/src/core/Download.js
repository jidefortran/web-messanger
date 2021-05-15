import React, { Component } from 'react';
import download from "../images/download.jpg";
import "../App.scss";
class Download extends Component {
    render() {
        return (
            <div className="container">
            <div className="download_title" style = {{border:0}}> Download the POETREE App on your App Store </div>

                <img src={download} />
            </div>
        );
    }
}

export default Download;
