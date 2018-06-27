import React, { Component } from 'react';
import './Tabs.css';
import { connect } from 'react-redux';
import { searchFor } from '../action';


class Tabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectValue: 'NameA',
            searchInput: ''
        };
    }

    componentDidMount() {
        this.props.searchFor();
    }

    startSearch() {



    }

    sortData(e) {
        e.preventDefault();
        const targetV = e.target.value;
        const name = e.target.name;
        let selectValue = '';
        let searchInput = '';

        if (name === 'selectValue') {
            selectValue = targetV;
        }


        if (document.getElementById('SearchT').value !== undefined) {
            searchInput = document.getElementById('SearchT').value;
        }


        if (selectValue === 'FollowersD') {
            this.props.searchFor(searchInput, 'followers', 'desc');
        }
        else if (selectValue === 'NameD') {
            this.props.searchFor(searchInput, 'login', 'desc');
        }
        else if (selectValue === 'FollowersA') {
            this.props.searchFor(searchInput, 'followers', 'asc');
        }
        else {
            this.props.searchFor(searchInput, 'login', 'asc');
        }
        
    }


    render() {
        return (

            <div className="tabs">

                <select name="selectValue" className="sortSelect" onChange={(event) => this.sortData(event)} >
                    <option value="NameA">Name (A - Z)</option>
                    <option value="NameD">Name (Z - A)</option>
                    <option value="FollowersA">Followers ^</option>
                    <option value="FollowersD">Followers</option>
                </select>

                <input
                    name="searchInput"
                    className="searchBox"
                    id="SearchT"
                    type="text"
                    placeholder="Seach Here"
                    onChange={(event) => this.sortData(event)}
                />

            </div>

        );
    }
}

const mapStateToProps = state => ({
    searchList: state.items,
});

const mapDispatchToProps = dispatch => {
  return {
    searchFor: (search, sort, order) => {
      dispatch(searchFor(search, sort, order))
    }
  }
}
    // bindActionCreators({
    //     searchFor
    // },
    //     dispatch
    // );

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);

