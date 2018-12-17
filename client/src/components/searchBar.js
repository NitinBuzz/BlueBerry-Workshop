import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { filterIssues, tweakLoader } from '../actions';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
      loader: false
    };
  }

  handleSearch(e) {
    this.setState({ searchKey: e.target.value });
  }

  handleGoClick() {
    this.props.actions.filterIssues(this.state.searchKey, this.state.loader);
    this.setState({ searchKey: '' });
  }

  render() {
    const search =
      this.props.loader == true ? (
        <button
          style={{
            marginTop: '35px',
            marginLeft: '15px',
            backgroundColor: '#77bd7a',
            cursor: 'progress',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            float: 'right'
          }}
          type="submit"
          onClick={this.handleGoClick.bind(this)}
        >
          Loading
        </button>
      ) : (
        <button
          style={{
            marginTop: '35px',
            marginLeft: '15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            float: 'right'
          }}
          type="submit"
          onClick={this.handleGoClick.bind(this)}
        >
          Search
        </button>
      );
    return (
      <div
        style={{
          display: 'inline-block',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(' - 50 + '%, ' - 50 + '%)',
          overflow: 'hidden'
        }}
      >
        <form
          style={{ fontFamily: 'Ubuntu' }}
          onSubmit={e => e.preventDefault()}
        >
          <input
            style={{
              padding: '10px 10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginTop: '35px',
              cursor: 'text',
              fontFamily: 'Ubuntu'
            }}
            type="text"
            placeholder="Provide a keyword"
            onChange={this.handleSearch.bind(this)}
            value={this.state.searchKey}
          />

          {search}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    issues: state.issues,
    loader: state.fakeReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ filterIssues, tweakLoader }, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
