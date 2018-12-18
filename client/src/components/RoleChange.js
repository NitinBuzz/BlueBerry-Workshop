import React, { Component } from "react";

class RoleChange extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="role-change"
        onChange={e => this.props.updateRole(event.target.value)}
      >
        <p> Role Selector </p>
        <br />
        <input type="radio" value="Admin" name="gender" /> Admin <br />
        <input type="radio" value="Editor" name="gender" /> Editor <br />
        <input type="radio" value="Viewer" name="gender" /> Viewer <br />
      </div>
    );
  }
}

export default RoleChange;
