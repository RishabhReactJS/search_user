import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestRepo, selectUser } from '../action';
import Tabs from './Tabs';
import _ from 'lodash';
import './Users.css';

class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userDa: this.props.searchList,
      iteratees: 'login',
      order: 'asc',
      collapseVisible: false,
      currentPage: 1,
      userPerPage: 5,
      currentUser: []
    };
  }


  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.searchList !== state.userDa) {
      return {
        userDa: props.searchList
      };
    }
    // if(props.searchList !== undefined){
    //   props.searchList.map(userName => 
    //           props.selectUser(userName.login)
    //   )
    // }
    return null;
  }

  // componentDidMount() {
  //   const { currentPage, userPerPage } = this.state;

  //   // Logic for displaying current user
  //   const indexOfLastUser = currentPage * userPerPage;
  //   const indexOfFirstUser = indexOfLastUser - userPerPage;

  //   let sortedData = this.state.userDa;
  //   const iteratees = this.state.iteratees;
  //   const order = this.state.order;
  //   sortedData = _.sortBy(sortedData, [iteratees], [order]);

  //   const currentUser = sortedData.slice(indexOfFirstUser, indexOfLastUser);

  //   this.setState({
  //     currentUser
  //   })
  // }

  handleClickNext(event, currentUser) {
    console.log(currentUser);
    currentUser.map(user => (
      this.props.selectUser(user.login)
    ))
    

    this.setState({
      currentPage: Number(event.target.id)
    });

  }

  sortDataP(targetV) {
    console.log(targetV);
    if (targetV === 'NameA') {
      this.setState({
        iteratees: 'login',
        order: 'asc'
      })

    }
    else if (targetV === 'NameD') {
      this.setState({
        iteratees: 'login',
        order: 'desc'
      })
    }
    else if (targetV === 'FollowersA') {
      this.setState({
        iteratees: 'login',
        order: 'asc'
      })

    }
    else {
      this.setState({
        iteratees: 'login',
        order: 'desc'
      })
    }
  }

  render() {
    const { currentPage, userPerPage } = this.state;

    // Logic for displaying current user
    const indexOfLastUser = currentPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;

    let sortedData = this.state.userDa;
    const iteratees = this.state.iteratees;
    const order = this.state.order;
    sortedData = _.sortBy(sortedData, [iteratees], [order]);

    const currentUser = sortedData.slice(indexOfFirstUser, indexOfLastUser);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(sortedData.length / userPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={(event) => this.handleClickNext(event, currentUser)}
        >
          {number}
        </li>
      );
    });

    return (
      <div className="AboutDiv">
        <Tabs sortDataFun={(targetV) => this.sortDataP(targetV)} />
        {console.log("this.state.userD")}
        {console.log(this.state.userD)}
        <ul>
          {currentUser != undefined
            ? currentUser.map(userD => (
              <li key={userD.id}>
                <div className="userDataDiv">
                  <img className="usrImg" src={userD.avatar_url} />
                  <div className="userDetails">
                    <h3>{userD.login}</h3>
                    <p>Profile URL: {userD.url}</p>
                    <p>Followers URL: {userD.followers_url}</p>
                  </div>
                </div>
              </li>
            ))
            : null}
        </ul>
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.user,
  userRepo: state.repo,
  searchList: state.items,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      selectUser,
      requestRepo
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Users);