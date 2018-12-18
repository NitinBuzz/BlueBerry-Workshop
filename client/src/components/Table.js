import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getProduct,
  editProduct,
  deleteProduct,
  createProduct
} from "../actions";

import RoleChange from "./RoleChange";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      normalisedData: false,
      role: "Viewer",
      openModal: false,
      datum: {},
      addProductModalShow: false
    };
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
          <button
            className="button"
            onClick={() => {
              this.setState({ openModal: true, datum: product }, () => {
                console.log(
                  `modal set open true ${JSON.stringify(this.state.datum)}`
                );
              });
            }}
          >
            Edit
          </button>
          <span style={{ paddingRight: "20px" }} />
          <button
            className="button button3"
            onClick={() => {
              this.props.actions.deleteProduct({
                index: product.id,
                price: product.price,
                name: product.name
              });
              this.setState({ normalizeData: false });
            }}
          >
            Delete
          </button>
        </React.Fragment>
      );
    } else if (this.state.role === "Editor") {
      return (
        <React.Fragment>
          <button
            className="button"
            onClick={() => {
              this.setState({ openModal: true, datum: product }, () => {
                console.log(
                  `modal set open true ${JSON.stringify(this.state.datum)}`
                );
              });
            }}
          >
            Edit
          </button>
          <span style={{ paddingRight: "20px" }} />
          <button className="button button3 disabled" disabled={true}>
            Delete
          </button>
        </React.Fragment>
      );
    } else if (this.state.role === "Viewer") {
      return (
        <React.Fragment>
          <button className="button disabled" disabled={true}>
            Edit
          </button>
          <span style={{ paddingRight: "20px" }} />
          <button className="button button3 disabled" disabled={true}>
            Delete
          </button>
        </React.Fragment>
      );
    } else {
      return <React.Fragment>Please Select Role </React.Fragment>;
    }
  };

  normalizeData = () => {
    let rowsEx = [];
    if (this.props.products != undefined) {
      this.props.products.forEach(item => {
        if (item != null) {
          const { index, name, price } = item;
          rowsEx.push({ id: index, name: name, price: price });
        }
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

  renderModal = () => {
    return (
      <div className="modal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              this.setState({ openModal: false });
            }}
          >
            &times;
          </span>
          <p>Product Editor Form</p>
          <br />
          <form
            onSubmit={e => {
              e.preventDefault();
              if (this.state.datum.price && this.state.datum.name) {
                this.props.actions.editProduct({
                  index: this.state.datum.id,
                  price: this.state.datum.price,
                  name: this.state.datum.name
                });
                this.setState({ openModal: false, normalizeData: false });
              }
            }}
          >
            Product Name:
            <br />
            <input
              type="text"
              name="name"
              onChange={e => {
                this.setState({
                  datum: { ...this.state.datum, name: e.target.value }
                });
              }}
              value={this.state.datum.name}
            />
            <br />
            Price:
            <br />
            <input
              type="text"
              name="price"
              onChange={e => {
                this.setState({
                  datum: { ...this.state.datum, price: e.target.value }
                });
              }}
              value={this.state.datum.price}
            />
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  };

  renderAddModal = () => {
    return (
      <div className="modal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              this.setState({ addProductModalShow: false });
            }}
          >
            &times;
          </span>
          <p>Product Adder Form</p>
          <br />
          <form
            onSubmit={e => {
              e.preventDefault();
              if (this.state.datum.price && this.state.datum.name) {
                this.props.actions.createProduct({
                  index: this.state.rows.length + 1,
                  price: this.state.datum.price,
                  name: this.state.datum.name
                });
                this.setState({
                  addProductModalShow: false,
                  normalizeData: false
                });
              }
            }}
          >
            Product Name:
            <br />
            <input
              type="text"
              name="name"
              onChange={e => {
                this.setState({
                  datum: { ...this.state.datum, name: e.target.value }
                });
              }}
              value={this.state.datum.name}
            />
            <br />
            Price:
            <br />
            <input
              type="text"
              name="price"
              onChange={e => {
                this.setState({
                  datum: { ...this.state.datum, price: e.target.value }
                });
              }}
              value={this.state.datum.price}
            />
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div
        style={{
          padding: "20px",
          display: "flex"
        }}
      >
        {this.state.openModal ? this.renderModal() : null}
        {this.state.addProductModalShow ? this.renderAddModal() : null}
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
          {this.renderTable()}
        </table>
        <div style={{ width: "200px", color: "#ffffff" }}>
          <div className="adder">
            <button
              className="button button2"
              onClick={() => {
                this.setState({ addProductModalShow: true });
              }}
            >
              Add a Product
            </button>
          </div>
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
    actions: bindActionCreators(
      { getProduct, editProduct, deleteProduct, createProduct },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
