import React, { Component } from "react";
import Table from "./Table";
import Footer from "./footer";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <div style={{ height: "50px" }}>Hello World</div>
        <div style={{ display: "flex" }}>
          <Table />
        </div>
        <Footer />
      </div>
    );
  }
}
