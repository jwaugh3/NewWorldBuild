import React, { Component } from 'react';

import './Gear.css';

export default class Gear extends Component {
    render() {
        return (
          <div>
            <table className="gearTable gear1Table">
              <thead></thead>
              <tbody>
                <tr>
                  <td className={"activeCell itembglong1"}>
                    <img src={this.props.head} />
                  </td>
                  <td className={"activeCell itembglong3"}>
                    <img src={this.props.weapon1} />
                  </td>
                </tr>
                <tr>
                  <td className={"activeCell itembglong1"}>
                    <img src={this.props.chest} />
                  </td>
                  <td className={"activeCell itembglong4"}>
                    <img src={this.props.weapon2} />
                  </td>
                </tr>
                <tr>
                  <td className={"activeCell itembglong0"}>
                    <img src={this.props.gloves} />
                  </td>
                  <td className="inactiveCell"></td>
                </tr>
                <tr>
                  <td className={"activeCell itembglong3"}>
                    <img src={this.props.legs} />
                  </td>
                  <td className="inactiveCell"></td>
                </tr>
                <tr>
                  <td className={"activeCell itembglong3"}>
                    <img src={this.props.boots} />
                  </td>
                  <td className="inactiveCell"></td>
                </tr>
                <tr>
                  <td className={"activeCell itembglong4"}>
                    <img src={this.props.shield} />
                  </td>
                  <td className="inactiveCell"></td>
                </tr>
              </tbody>
            </table>

            <table className="gearTable gear2Table">
              <thead></thead>
              <tbody>
                <tr>
                  <td className={"activeCell itembglong3"}>
                    <img src={this.props.necklace} />
                  </td>
                  <td className={"activeCell itembglong2"}>
                    <img src={this.props.bag1} />
                  </td>
                </tr>
                <tr>
                  <td className={"activeCell itembglong4"}>
                    <img src={this.props.ring} />
                  </td>
                  <td className={"activeCell itembglong0"}>
                    <img src={this.props.bag2} />
                  </td>
                </tr>
                <tr>
                  <td className={"activeCell itembglong1"}>
                    <img src={this.props.earring} />
                  </td>
                  <td className={"activeCell itembglong2"}>
                    <img src={this.props.bag3} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
    }
}
