import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Api from './Api'

export class User extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      nick: props.match.params.user,
      id: '',
      email: '',
      role: ''
    }
  }

  componentWillMount(){
    Api.getUserDetails(this, this.state.nick);
  }

  render(){
    return (
      <div className="row">
        <div className="col">
          <h2 className="p-3">Użytkownik:</h2>
          <hr />
          <span>ID: {this.state.id}</span><br />
          <span>Nick: {this.state.nick} </span><br />
          <span>Email: {this.state.email}</span><br />
          <span>Rola: {this.state.role}</span><br />
        </div>
      </div>
    );
  }
}

export default User
