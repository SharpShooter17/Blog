import React from 'react'
import Api from './Api';
import { Link } from 'react-router-dom'

export class ChangeUserRole extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      roles: []
    }
    this.handleOnChangeUserRole = this.handleOnChangeUserRole.bind(this);
  }
  componentWillMount(){
    Api.getUsers().then(function(response){
      this.setState({
        users: response.data.results
      })
    }.bind(this))
    Api.getRoles().then(function(response){
      this.setState({
        roles: response.data.results
      })
    }.bind(this))
  }
  handleOnChangeUserRole(e){
    var userId = e.target.parentNode.parentNode.firstChild.firstChild.nextSibling.innerHTML;
    var roleId = e.target.value
    Api.changeUserRole(userId, roleId);
  }
  render(){
    return (
      <div className="row">
        <div className="col">
          <h3 className="p-3">Zmiana praw użytkownika</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nick</th>
                <th>Email</th>
                <th>Rola</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map( function(user) { return (<tr key={user.user_id.toString()}>
                  <td><span>#</span><span className="userId">{user.user_id}</span></td>
                  <td><Link to={'/User/'+user.nick}>{user.nick}</Link></td>
                  <td>{user.email}</td>
                  <td>
                  <select onChange={this.handleOnChangeUserRole} name="role" className="form-control">
                    {this.state.roles.map( function(role) {
                      if (user.role == role.name) {
                        return (<option key={role.role_id.toString() + user.user_id.toString()} selected="" value={role.role_id}>{role.name}</option>)
                      } else {
                        return (<option key={role.role_id.toString() + user.user_id.toString()} value={role.role_id}>{role.name}</option>)
                    }
                    })}
                  </select>
                  </td>
                </tr>
              )}.bind(this))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
export default ChangeUserRole
