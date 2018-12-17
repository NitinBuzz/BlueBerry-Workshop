import React, { Component } from "react";
import ReactModal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProduct } from "../actions";

import RoleChange from "./RoleChange";

const heading = "hhhhh";
const full_description = "hhhhhhhhhhhhhhhhhhhhhhh";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [], normalisedData: false, role: "" };
  }
  componentDidMount() {
    this.props.actions.getProduct();
  }

  componentWillUnmount() {}

  updateRole = role => {
    this.setState({ role });
  };

  renderAction = product => {
    if (this.state.role === "Admin") {
      return (
        <React.Fragment>
          <button onClick={e => console.log(product.id)}>Delete</button>
        </React.Fragment>
      );
    } else if (this.state.role === "Editor") {
      return (
        <React.Fragment>
          <button onClick={e => console.log(product.id)}>Edit</button>
        </React.Fragment>
      );
    } else if (this.state.role === "Viewer") {
      return (
        <React.Fragment>
          <button disabled={true}>Delete</button>
        </React.Fragment>
      );
    } else {
      return <React.Fragment>Please Select Role </React.Fragment>;
    }
  };

  normalizeData = () => {
    let rowsEx = [];
    if (this.props.products != undefined) {
      this.props.products.forEach(({ index, name, price }) => {
        rowsEx.push({ id: index, name: name, price: price });
      });
      this.setState({ rows: rowsEx }, () => {
        this.setState({ normalizeData: true });
      });
    }
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
            {this.renderAction({ id, name, price })}
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
        <ReactModal
          isOpen={false}
          contentLabel="Example Modal"
          bodyOpenClassName="ReactModal__Body--open"
          htmlOpenClassName="ReactModal__Html--open"
          ariaHideApp={true}
          shouldFocusAfterRender={true}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          shouldReturnFocusAfterClose={true}
          role="dialog"
          aria={{
            labelledby: "heading",
            describedby: "full_description"
          }}
          data={{
            background: "green"
          }}
        />
        {!this.state.normalizeData && this.props.products != undefined
          ? this.normalizeData()
          : null}
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
          {this.props.products != undefined ? this.renderTable() : null}
        </table>
        <div style={{ width: "200px", color: "#ffffff" }}>
          <RoleChange updateRole={this.updateRole} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { products: state.products.products };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ getProduct }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
