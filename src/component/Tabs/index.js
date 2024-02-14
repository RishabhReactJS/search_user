import React, { Component } from "react";
import "./Tabs.css";
import { connect } from "react-redux";
import { searchFor } from "../../action";
import debounce from "../../Utils/debounce"

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.sortData = this.sortData.bind(this);
    this.searchRef = React.createRef();
  }

  componentDidMount() {
    this.props.searchFor();
  }

  debounceSearch = debounce((search) => this.sortData(search), 1000);

  sortData(e) {
    e.preventDefault();
    // console.log("in sortData >>> ", this.searchRef.current);
    console.dir(this.searchRef.current);
    const targetV = e.target.value;
    const name = e.target.name;
    let selectValue = "";
    let searchInput = "";

    if (name === "selectValue") {
      selectValue = targetV;
    }

    if (document.getElementById("SearchT").value !== undefined) {
      searchInput = document.getElementById("SearchT").value;
    }

    if (selectValue === "FollowersD") {
      this.props.searchFor(searchInput, "followers", "desc");
    } else if (selectValue === "NameD") {
      this.props.searchFor(searchInput, "login", "desc");
    } else if (selectValue === "FollowersA") {
      this.props.searchFor(searchInput, "followers", "asc");
    } else {
      this.props.searchFor(searchInput, "login", "asc");
    }
  }

  render() {
    console.log("in render >>> ", this.searchRef.current);

    return (
      <div className="tabs">
        <div>
          <span>Sort By</span>
          <select
            name="selectValue"
            className="sortSelect"
            onChange={this.sortData}
          >
            <option value="NameA">Name (A - Z)</option>
            <option value="NameD">Name (Z - A)</option>
            <option value="FollowersA">Followers ^</option>
            <option value="FollowersD">Followers</option>
          </select>
        </div>

        <input
          name="searchInput"
          className="searchBox"
          id="SearchT"
          type="text"
          placeholder="Seach Here"
          ref={this.searchRef}
          onChange={this.debounceSearch}
        />
        <div>
          <span>Current Page</span>
          <input
            className="selectedPage"
            type={"number"}
            value={this.props.selectedPage}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchList: state.items,
});

const mapDispatchToProps = (dispatch) => {
  return {
    searchFor: (search, sort, order) => {
      dispatch(searchFor(search, sort, order));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
