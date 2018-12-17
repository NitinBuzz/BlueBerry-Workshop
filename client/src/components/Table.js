import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getIssues } from "../actions";

import RoleChange from "./RoleChange";
import { Products } from "../data/products";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [], normalisedData: false, role: "Admin" };
  }
  componentDidMount() {
    //this.props.actions.getIssues();
  }

  componentWillUnmount() {}

  renderAction = () => {
    if (this.state.role === "Admin") {
      return <React.Fragment>Admin </React.Fragment>;
    } else if (this.state.role === "Editor") {
      return <React.Fragment>Editor </React.Fragment>;
    } else if (this.state.role === "Viewer") {
      return <React.Fragment>Viewer </React.Fragment>;
    } else {
      return <React.Fragment>No Role </React.Fragment>;
    }
  };

  normalizeData = () => {
    let rowsEx = [];
    const actions = ["view", "edit", "delete"];
    Products.forEach(({ index, name, price }) => {
      rowsEx.push({ id: index, name: name, price: price });
    });
    this.setState({ rows: rowsEx }, () => {
      this.setState({ normalizeData: true });
    });
  };

  renderTable = () => {
    let toReturn = [];
    this.state.rows.forEach(({ id, name, price }) => {
      toReturn.push(
        <tr
          style={{
            color: "#ffffff",
            border: "1px solid #333333"
          }}
        >
          <td
            style={{
              color: "#ffffff",
              border: "1px solid #333333"
            }}
          >
            {id}
          </td>
          <td
            style={{
              color: "#ffffff",
              border: "1px solid #333333"
            }}
          >
            {name}
          </td>
          <td
            style={{
              color: "#ffffff",
              border: "1px solid #333333"
            }}
          >
            {price}
          </td>
          <td
            style={{
              color: "#ffffff",
              border: "1px solid #333333"
            }}
          >
            {this.renderAction()}
          </td>
        </tr>
      );
    });
    return toReturn;
  };

  render() {
    return (
      <div
        style={{
          padding: "20px",
          display: "flex"
        }}
      >
        {!this.state.normalizeData ? this.normalizeData() : null}
        <table
          style={{
            color: "#ffffff",
            border: "2px solid #ffffff",
            width: "600px"
          }}
        >
          <caption>BlueBerry React Workout</caption>
          <tr
            style={{
              color: "#ffffff",
              border: "2px solid #333333"
            }}
          >
            <th
              style={{
                color: "#ffffff",
                border: "2px solid #333333"
              }}
            >
              ID
            </th>
            <th
              style={{
                color: "#ffffff",
                border: "2px solid #333333"
              }}
            >
              Name
            </th>
            <th
              style={{
                color: "#ffffff",
                border: "2px solid #333333"
              }}
            >
              Price
            </th>
            <th
              style={{
                color: "#ffffff",
                border: "2px solid #333333"
              }}
            >
              Action
            </th>
          </tr>
          {this.renderTable()}
        </table>
        <div style={{ width: "200px", color: "#ffffff" }}>
          <RoleChange />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { issues: state.issues };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ getIssues }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
