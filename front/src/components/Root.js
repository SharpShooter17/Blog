import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import { Header } from './Header'
import { Home } from './Home'
import { Login } from './Login'
import { Register } from './Register'

import '../css/bootstrap.css'

export class Root extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Header />
          </div>
        </div>
        <div className="row">
        <div className="col">
          <main>
            <Switch>
              <Route exact path={'/'} component={ Home } />
              <Route exact path={'/home'} component={ Home } />
              <Route exact path={'/login'} component={ Login } />
              <Route exact path={'/register'} component={ Register } />
            </Switch>
          </main>
        </div>
        </div>
      </div>

    );
  }
}
