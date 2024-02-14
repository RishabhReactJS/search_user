import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestRepo, selectUser } from "../../action";
import Tabs from "../Tabs";
import _ from "lodash";
import "./Users.css";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDa: this.props.searchList,
      iteratees: "login",
      order: "asc",
      collapseVisible: false,
      currentPage: 1,
      userPerPage: 10,
      currentUser: [],
    };
    this.scrollContainerRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.searchList !== state.userDa) {
      return {
        userDa: props.searchList,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      // Use the snapshot value to scroll to the top
      this.scrollContainerRef.current.scrollTop = snapshot;
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Capture the current scroll position before the update
    if (prevState.currentPage !== this.state.currentPage) {
      return 0;
    }
    return null;
  }

  getUserDetails(userLogin) {
    this.props.history.push("/profile");
    this.props.selectUser(userLogin);
  }

  handleClickNext(event) {
    event.persist()
    this.setState((prevState) => {
      return {
        ...prevState,
        currentPage: Number(event.target.id),
      };
    });
  }

  sortDataP(targetV) {
    console.log(targetV);
    if (targetV === "NameA") {
      this.setState({
        iteratees: "login",
        order: "asc",
      });
    } else if (targetV === "NameD") {
      this.setState({
        iteratees: "login",
        order: "desc",
      });
    } else if (targetV === "FollowersA") {
      this.setState({
        iteratees: "login",
        order: "asc",
      });
    } else {
      this.setState({
        iteratees: "login",
        order: "desc",
      });
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
    const { history } = this.props;
    console.log('in history>>> ', this.props)
    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li key={number} id={number} onClick={this.handleClickNext.bind(this)}>
          {number}
        </li>
      );
    });

    return (
      <div className="AboutDiv">
        <Tabs
          selectedPage={this.state.currentPage}
          sortDataFun={(targetV) => this.sortDataP(targetV)}
        />
        <ul className="userList" ref={this.scrollContainerRef}>
          {currentUser !== undefined
            ? currentUser.map((userD) => (
                <li
                  onClick={this.getUserDetails.bind(this, userD.login)}
                  key={userD.id}
                >
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
          <li>Pages : </li>
          {renderPageNumbers}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user,
  userRepo: state.repo,
  searchList: state.items,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      selectUser,
      requestRepo,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Users);
