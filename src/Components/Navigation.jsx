import React from "react";
import { withRouter } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Navigation = ({ organizationName, onOrganizationSearch }) => (
  <div className="topnav">
    <OrganizationSearch
      organizationName={organizationName}
      onOrganizationSearch={onOrganizationSearch}
    />
  </div>
);

class OrganizationSearch extends React.Component {
  state = {
    value: this.props.organizationName
  };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  onSubmit = event => {
    this.props.onOrganizationSearch(this.state.value);

    event.preventDefault();
  };

  render() {
    const { value } = this.state;

    return (
      <div className="search-container">
        <form>
          <input
            type="text"
            value={value}
            className="search"
            placeholder="Search.."
            name="search"
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Navigation);
