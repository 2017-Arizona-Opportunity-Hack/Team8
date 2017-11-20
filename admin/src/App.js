import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import createBrowserHistory from "history/createBrowserHistory";

import * as childAction from "./actions/child";
import * as parentAction from "./actions/parent";
import * as houseAction from "./actions/house";

import "./App.css";
import Login from "./components/Login";
import ChildList from "./components/ChildList";
import ChildForm from "./components/ChildForm";
import HouseList from "./components/HouseList";
import HouseForm from "./components/HouseForm";
import ParentList from "./components/ParentList";
import ParentForm from "./components/ParentForm";
import ParentDetail from "./components/ParentDetail";
import Header from "./components/Header";
import { PrivateRoute } from "./components/PrivateRoute";
import LeftNav from "./components/LeftNav";

class App extends Component {
  componentDidMount() {
    console.log("HErEREERERERERERERER");
    this.props.parentAction.fetchParents();
    this.props.childAction.fetchChildren();
    this.props.houseAction.fetchHouses();
  }

  render() {
    const history = createBrowserHistory();

    console.log("in App >>> state.currentUser=", this.props.currentUser);

    return (
      <Router history={history}>
        <div className="container-fluid">
          <div className="row">
            <div className="col header-col">
              <Header />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 sidebar">
              <LeftNav />
            </div>
            <div className="col-md-10">
              <Switch>
                <PrivateRoute exact path="/" component={ChildList} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/child" component={ChildList} />
                <PrivateRoute exact path="/child/:id" component={ChildForm} />
                <PrivateRoute exact path="/house" component={HouseList} />
                <PrivateRoute exact path="/house/:id" component={HouseForm} />
                <PrivateRoute exact path="/parent" component={ParentList} />
                <PrivateRoute exact path="/parent/:id" component={ParentForm} />
                <PrivateRoute
                  exact
                  path="/parentDetail/:id"
                  component={ParentDetail}
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
    /*
    if (this.props.currentUser === null) {
      return (
        <Router history={history}>
          <div className="container">
            <div className="row">
              <div className="col-md-4" />
              <div className="col-md-4">
                <Switch>
                  <Route exact path="/" component={Login} />
                </Switch>
              </div>
              <div className="col-md-4" />
            </div>
          </div>
        </Router>
      );
    } else {
      if (this.props.currentUser.length === 0) {
        return (
          <Router history={history}>
            <div className="container">
              <div className="row">
                <div className="col-md-4" />
                <div className="col-md-4">
                  <Switch>
                    <Route exact path="/" component={Login} />
                  </Switch>
                </div>
                <div className="col-md-4" />
              </div>
            </div>
          </Router>
        );
      } else {
        return (
          <Router history={history}>
            <div className="container-fluid">
              <div className="row">
                <div className="col header-col">
                  <Header />
                </div>
              </div>
              <div className="row">
                <div className="col-md-2 sidebar">
                  <LeftNav />
                </div>
                <div className="col-md-10">
                  <Switch>
                    <Route exact path="/" component={HouseList} />
                    <Route exact path="/child/:id" component={ChildForm} />
                    <Route exact path="/house" component={HouseList} />
                    <Route exact path="/house/:id" component={HouseForm} />
                    <Route exact path="/parent" component={ParentList} />
                    <Route exact path="/parent/:id" component={ParentForm} />
                    <Route
                      exact
                      path="/parentDetail/:id"
                      component={ParentDetail}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </Router>
        );
      }
    }
  }
  */
  }
}

function mapStateToProps(state, props) {
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    childAction: bindActionCreators(childAction, dispatch),
    parentAction: bindActionCreators(parentAction, dispatch),
    houseAction: bindActionCreators(houseAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
