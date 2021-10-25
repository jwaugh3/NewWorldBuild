import React from 'react'
import Authentication from '../../util/Authentication/Authentication'
import Nav from './Nav/Nav';
import Skills from './Skills/Skills';
import Gear from './Gear/Gear';
import Stats from './Stats/Stats';

import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.Authentication = new Authentication();
    //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null.
    this.twitch = window.Twitch ? window.Twitch.ext : null;
    this.state = {
      finishedLoading: false,
      theme: "light",
      isVisible: true,
      firstWeapon: null,
      secondWeapon: null,
      navItems: ["Gear", "Stats", "Skills"],
      activeItem: "Gear",
      body: '',
    };

    this.updateActiveItem = this.updateActiveItem.bind(this);
    this.updateFirstWeapon = this.updateFirstWeapon.bind(this);
    this.updateSecondWeapon = this.updateSecondWeapon.bind(this);
  }

  updateActiveItem(event) {
    this.updateBody(event.target.id)
    this.setState({ activeItem: event.target.id });
  }

  updateFirstWeapon(weapon) {
    this.setState({ firstWeapon: weapon });
  }

  updateSecondWeapon(weapon) {
    this.setState({ SecondWeapon: weapon });
  }

  updateBody(newActive = 'Gear'){
      let myReturn = '';
      switch (newActive) {
            case 'Gear':
                myReturn = (
                  <Gear
                    head={
                      "https://cdn.nwdb.info/db/v7/icons/items/weapon/1hlongsword_widowmakert5.png"
                    }
                    chest={
                      "https://cdn.nwdb.info/db/v7/icons/items/weapon/1hlongsword_widowmakert5.png"
                    }
                    gloves={
                      "https://cdn.nwdb.info/db/v7/icons/items/weapon/1hlongsword_widowmakert5.png"
                    }
                    legs={
                      "https://cdn.nwdb.info/db/v7/icons/items/weapon/1hlongsword_widowmakert5.png"
                    }
                    boots={
                      "https://cdn.nwdb.info/db/v7/icons/items/weapon/1hlongsword_widowmakert5.png"
                    }
                    shield={
                      "https://cdn.nwdb.info/db/v7/icons/items/weapon/1hlongsword_widowmakert5.png"
                    }
                    weapon1={
                      "https://cdn.nwdb.info/db/v7/icons/items/weapon/1hlongsword_widowmakert5.png"
                    }
                    weapon2={
                      "https://cdn.nwdb.info/db/v7/icons/items/weapon/1hlongsword_widowmakert5.png"
                    }
                    necklace={
                      "https://cdn.nwdb.info/db/v7/icons/items/weapon/1hlongsword_widowmakert5.png"
                    }
                    ring={
                      "https://cdn.nwdb.info/db/v7/icons/items/weapon/1hlongsword_widowmakert5.png"
                    }
                    earring={
                      "https://cdn.nwdb.info/db/v7/icons/items/weapon/1hlongsword_widowmakert5.png"
                    }
                    bag1={
                      "https://cdn.nwdb.info/db/v7/icons/items/weapon/1hlongsword_widowmakert5.png"
                    }
                    bag2={
                      "https://cdn.nwdb.info/db/v7/icons/items/weapon/1hlongsword_widowmakert5.png"
                    }
                    bag3={
                      "https://cdn.nwdb.info/db/v7/icons/items/weapon/1hlongsword_widowmakert5.png"
                    }
                  />
                );
                break;
            case 'Stats':
                myReturn = <Stats></Stats>;
                break;
            case 'Skills':
              myReturn = <Skills></Skills>;
              break;
          default:
              myReturn = <Gear></Gear>;
              break;
      }
      this.setState({body: myReturn});
  }

  contextUpdate(context, delta) {
    if (delta.includes("theme")) {
      this.setState(() => {
        return { theme: context.theme };
      });
    }
  }

  visibilityChanged(isVisible) {
    this.setState(() => {
      return {
        isVisible,
      };
    });
  }

  componentDidMount() {
    this.updateBody();
    if (this.twitch) {
      this.twitch.onAuthorized((auth) => {
        this.Authentication.setToken(auth.token, auth.userId);
        if (!this.state.finishedLoading) {
          // if the component hasn't finished loading (as in we've not set up after getting a token), let's set it up now.

          // now we've done the setup for the component, let's set the state to true to force a rerender with the correct data.
          this.setState(() => {
            return { finishedLoading: true };
          });
        }
      });

      this.twitch.listen("broadcast", (target, contentType, body) => {
        this.twitch.rig.log(
          `New PubSub message!\n${target}\n${contentType}\n${body}`
        );
        // now that you've got a listener, do something with the result...

        // do something...
      });

      this.twitch.onVisibilityChanged((isVisible, _c) => {
        this.visibilityChanged(isVisible);
      });

      this.twitch.onContext((context, delta) => {
        this.contextUpdate(context, delta);
      });
    }

    if(!this.state.firstWeapon && !this.state.secondWeapon){
        //load the weapons
    }
  }

  componentWillUnmount() {
    if (this.twitch) {
      this.twitch.unlisten("broadcast", () =>
        console.log("successfully unlistened")
      );
    }
  }

  render() {
    if (this.state.finishedLoading && this.state.isVisible) {
      return (
        <div className="App">
          <div
            className={this.state.theme === "light" ? "App-light" : "App-dark"}
          >
            {/* <p>Test!</p> */}
            {/* <p>My token is: {this.Authentication.state.token}</p> */}
            {/* <p>My opaque ID is {this.Authentication.getOpaqueId()}.</p>
                        <div>{this.Authentication.isModerator() ? <p>I am currently a mod, and here's a special mod button <input value='mod button' type='button'/></p>  : 'I am currently not a mod.'}</div>
                        <p>I have {this.Authentication.hasSharedId() ? `shared my ID, and my user_id is ${this.Authentication.getUserId()}` : 'not shared my ID'}.</p> */}
            <Nav
              updateActiveItem={this.updateActiveItem}
              navItems={this.state.navItems}
              activeItem={this.state.activeItem}
            />
            <div className="bodyDiv">{this.state.body}</div>
          </div>
        </div>
      );
    } else {
      return <div className="App"></div>;
    }
  }
}