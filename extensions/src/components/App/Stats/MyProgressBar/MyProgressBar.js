import React, { Component } from 'react';
import ProgressBar from "react-bootstrap/ProgressBar";

export default class MyProgressBar extends Component {
    
    render() {
        const now = 60;
        return (
          <div>
            <div>
              <label>{this.props.statName}</label>
              <ProgressBar
                now={this.props.score}
                label={`${this.props.score}`}
                max={300}
              ></ProgressBar>
            </div>
          </div>
        );
    }
}
