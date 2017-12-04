import React from 'react'
import { Link } from 'react-router-dom'
import Api from './Api'

export class Users extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      users: []
    }
  }
  componentWillMount(){
    Api.getUsers().then(function(response){
      this.setState({
        users: response.data.results
      })
    }.bind(this))
  }
  render(){
    return (
      <div className="row">
        <div className="col">
        <h3 className="p-3">Użytkownicy</h3>
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
          {this.state.users.map( user => <tr>
              <td>#{user.user_id}</td>
              <td><Link to={'/User/'+user.nick}>{user.nick}</Link></td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          )}
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}
export default Users
