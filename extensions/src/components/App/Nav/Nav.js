import React, { Component } from 'react'

import './Nav.css';
export default class Nav extends Component {

  render() {
    return (
        <div>
            {this.props.navItems.map((item)=> (
                <div 
                    className={this.props.activeItem === item? 'activeItem': 'inactive'} 
                    key={item} 
                    onClick={(event)=>this.props.updateActiveItem(event)}
                    id={item}>
                        {item}
                    </div>
            ))}
        </div>
    );
  }
}
