import React, { Component } from 'react';
import './Tabs.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchFor } from '../action';


class Tabs extends Component {
    constructor(props) {
        super(props);
        this.startSearch = this.startSearch.bind(this);
    }

    componentDidMount() {
        this.props.searchFor();
    }

    startSearch() {

        const text = document.getElementById('SearchT').value;
        if (text !== undefined)
            this.props.searchFor(text);
        else
            this.props.searchFor();

    }

    sortData(e) {
        const targetV = e.target.value;
        this.props.sortDataFun(targetV);
    }


    render() {
        return (

            <div className="tabs">

                <select className="sortSelect" onChange={ (event) => this.sortData(event) } >
                    <option value="NameA">Name (A - Z)</option>
                    <option value="NameD">Name (Z - A)</option>
                    <option value="FollowersA">Followers ^</option>
                    <option value="FollowersD">Followers</option>
                </select>

                <input
                    className="searchBox"
                    id="SearchT"
                    type="text"
                    placeholder="Seach Here"
                    onChange={this.startSearch}
                />

            </div>

        );
    }
}

const mapStateToProps = state => ({
    searchList: state.items,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        searchFor
    },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);

