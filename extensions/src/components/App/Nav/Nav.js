import React, { Component } from 'react'

import './Nav.css';
export default class Nav extends Component {

  render() {
      const myWidth = 33;
    return (
      <div id="navBar">
        <ul>
          {this.props.navItems.map((item) => (
            <li
              className={
                this.props.activeItem === item ? "activeItem" : "inactive"
              }
              key={item}
              onClick={(event) => this.props.updateActiveItem(event)}
              id={item}
              style={{ width: '' + myWidth + '%'}}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
