import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <ul>
          <li className="active">Backlog</li>
          <li>In Progress</li>
          <li>Testing</li>
          <li>Complete</li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
