import React, { Component } from "react";

class RoleChange extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div onChange={e => this.props.updateRole(event.target.value)}>
        <input type="radio" value="Admin" name="gender" /> Admin
        <input type="radio" value="Editor" name="gender" /> Editor
        <input type="radio" value="Viewer" name="gender" /> Viewer
      </div>
    );
  }
}

export default RoleChange;
