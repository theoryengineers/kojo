import React, { Component } from "react";
import Navbar from "../components/navbar/navbar";
import Content from "./content/content";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <Content />
      </div>
    );
  }
}

export default App;
