import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import './App.css';
import Login from './components/Login';
import ChildList from './components/ChildList';
import ChildForm from './components/ChildForm';
import HouseList from './components/HouseList';
import HouseForm from './components/HouseForm';
import ParentList from './components/ParentList';
import ParentForm from './components/ParentForm';
import Header from './components/Header';
import LeftNav from './components/LeftNav';

class App extends Component {

  render() {
    const history = createBrowserHistory();

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
                <Route exact path="/" component={ChildList} />
                <Route exact path="/child/add" component={ChildForm} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/house" component={HouseList} />
                <Route exact path="/house/add" component={HouseForm} />
                <Route exact path="/parent" component={ParentList} />
                <Route exact path="/parent/add" component={ParentForm} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );

  }

}

export default App;
