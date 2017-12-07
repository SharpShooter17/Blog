import React from 'react'
import Api from './Api';
import Cookies from 'js-cookie'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import ChangeUserRole from './ChangeUserRole'

export class Administrator extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    if (Cookies.get('role') != 3){
      return (<Redirect to={'/'} />);
    } else {
      return (
        <div>
          <div className="row">
            <div className="col">
              <h1>Panel Administratora</h1>
              <hr />
              <h2 className="p-3">Menu</h2>
              <ul>
                <li><Link to={'/Administrator/ChangeUserRole'}>Zmień prawa użytkownika</Link></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col">
            <Switch>
              <Route exact path={'/Administrator/ChangeUserRole'} component={ ChangeUserRole } />
            </Switch>
            </div>
          </div>
        </div>
      )
    }
  }
}
