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
      role: '',
      blogs: []
    }
  }

  componentWillMount(){
    Api.getUserDetails(this, this.state.nick);
    Api.getUserBlogs(this);
  }

  render(){
    return (
      <div>
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
        <div className="row">
          <div className="col">
            <h3 className="p-3">Blogi użytkownika:</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Data utworzenia</th>
                  <th>Kategoria bloga</th>
                </tr>
              </thead>
              <tbody>
              {this.state.blogs.map( blog => <tr>
                  <td><Link to={'/User/'+this.props.match.params.user+'/'+blog.name}>{blog.name}</Link></td>
                  <td>{blog.creation_date}</td>
                  <td>{blog.blog_category_id}</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default User
