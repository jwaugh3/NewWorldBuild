import React, { Component } from 'react';
import ProgressBar from "react-bootstrap/ProgressBar";
import MyProgressBar from './MyProgressBar/MyProgressBar';
export default class Stats extends Component {
    render() {
        return (
          <div>
            <MyProgressBar statName={"Strength"} score={26} />
            <MyProgressBar statName={"Dexterity"} score={21} />
            <MyProgressBar statName={"Intelligence"} score={89} />
            <MyProgressBar statName={"Focus"} score={14} />
            <MyProgressBar statName={"Constitution"} score={46} />
          </div>
        );
    }
}
