import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import { Header } from './Header'
import { Home } from './Home'
import { Login } from './Login'
import { Register } from './Register'
import { ControllPanel } from './ControllPanel'
import { User } from './User'
import { Blog } from './Blog'
import { Article } from './Article'
import { Users } from './Users'
import { Blogs } from './Blogs'
import { Tag } from './Tag'

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
              <Route path={'/Home/:page'} component={ Home } />
              <Route exact path={'/Login'} component={ Login } />
              <Route exact path={'/Register'} component={ Register } />
              <Route path={'/ControllPanel'} component={ ControllPanel } />
              <Route exact path={'/User/:user'} component={User} />
              <Route exact path={'/User/:user/:blog'} component={Blog} />
              <Route exact path={'/User/:user/:blog/:article'} component={Article} />
              <Route exact path={'/Users'} component={Users} />
              <Route exact path={'/Blogs'} component={Blogs} />
              <Route exact path={'/Tag/:tag'} component={Tag} />
            </Switch>
          </main>
        </div>
        </div>
      </div>
    );
  }
}
