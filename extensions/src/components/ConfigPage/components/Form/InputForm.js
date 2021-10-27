import React, { Component, Fragment } from 'react'
import {Button, ButtonGroup, Form, Dropdown, DropdownButton} from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'regenerator-runtime/runtime'

export default class InputForm extends Component {

  state = {
    isLoading: true,
    options: [],
    weapon: [],
    selection: null,
  }

  componentDidMount = async () => {
    const searchResults = await fetch(`http://localhost:3000/api/getSearchItems/weapon`,  
      {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}}
      )
      .then(data => {
        return data.json();
      });
    this.setState({options: searchResults, isLoading: false})
  }

  handleChange(type, option){
    const changeArray = [...this.state.weapon];
    changeArray[0][type] = option.target.value;
    this.setState({weapon: changeArray});
  }

  render() {
    console.log(this.state.weapon)
    return (
      <div className="row">
        <div className="col m-2">
          <h3 className="m-2">Weapon 1</h3>
          <Typeahead
            id="weapon-search"
            labelKey="name"
            onChange={(item) => this.setState({weapon: item})}
            options={this.state.options}
            placeholder="Select weapon"
            selected={this.state.weapon}
            uncontrolled
            renderMenuItemChildren={(option) => (
              <SearchItem alt={option.name} 
                src={`https://cdn.nwdb.info/db/v7/icons/items/weapon/${option.icon.toLowerCase()}.png`}
                name={`${option.name} [T${option.tier}]`}/>
            )}
          />
          <div className="row my-1">
            <div className="col">
              <h5 className="m-1">Tier</h5>
              <Form.Select value={(this.state.weapon.length ? this.state.weapon[0].tier : '')} onChange={(option)=>this.handleChange('tier', option)} aria-label="Tier-Select">
                <option>Select tier</option>
                <option id="tier-1" value="1">Tier I</option>
                <option id="tier-2" value="2">Tier II</option>
                <option id="tier-3" value="3">Tier III</option>
                <option id="tier-4" value="4">Tier IV</option>
                <option id="tier-5" value="5">Tier V</option>
              </Form.Select>
            </div>
            <div className="col">
              <h5 className="m-1">Rarity</h5>
              <Form.Select value={(this.state.weapon.length ? this.state.weapon[0].rarity : '')} onChange={(option)=>this.handleChange('rarity', option)} aria-label="Rarity-Select">
                <option>Select rarity</option>
                <option id="tier-1" value="uncommon">Uncommon</option>
                <option id="tier-2" value="common">Common</option>
                <option id="tier-3" value="rare">Rare</option>
                <option id="tier-4" value="epic">Epic</option>
                <option id="tier-5" value="legendary">Legendary</option>
              </Form.Select>
            </div>
          </div>
        </div>
        <div className="col m-2">
          <h3 className="m-2">Preview</h3>

        </div>
      </div>
    )
  }
}

class SearchItem extends Component {
  render() {
    return (
      <div>
        <img
            alt={this.props.alt}
            src={this.props.src}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          />
        <span>{this.props.name}</span>
      </div>
    )
  }
}