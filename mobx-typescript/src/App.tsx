import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import { observable } from "mobx";

@observer
class App extends Component {
  @observable name = " rohit kataria"
  render() {
    return (
      <div >
        <p>
          Hello World {this.name}
        </p>
      </div>
    );
  }
}

export default App;
