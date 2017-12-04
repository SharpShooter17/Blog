import React from 'react'
import { Link } from 'react-router-dom'
import Api from './Api'

export class Blogs extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      blogs: []
    }
  }
  componentWillMount(){
    Api.getBlogs().then(function(response){
      this.setState({
        blogs: response.data.results
      })
    }.bind(this))
  }
  render(){
    return (
      <div className="row">
        <div className="col">
        <h3 className="p-3">Blogi</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Blog</th>
              <th>Autor</th>
              <th>Kategoria</th>
              <th>Data założenia</th>
            </tr>
          </thead>
          <tbody>
          {this.state.blogs.map( blog => <tr>
              <td><Link to={'/User/'+blog.author + '/' + blog.name}>{blog.name}</Link></td>
              <td><Link to={'/User/'+blog.author}>{blog.author}</Link></td>
              <td>{blog.category}</td>
              <td>{blog.creation_date}</td>
            </tr>
          )}
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}
export default Blogs
