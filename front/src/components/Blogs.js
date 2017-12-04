import React from 'react'
import { Link } from 'react-router-dom'
import Api from './Api'

export class Blogs extends React.Component {
  constructor(props){
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      blogs: [],
      blog_categories: []
    }
  }
  componentWillMount(){
    Api.getBlogCategories(this);
    this.getBlogs(0);

  }

  getBlogs(category){
    Api.getBlogs(category).then(function(response){
      this.setState({
        blogs: response.data.results
      })
    }.bind(this))
  }

  handleOnChange(e){
    this.getBlogs(e.target.value);
  }

  render(){
    return (
      <div>
        <div className="row p-3">
          <div className="col">
            <form className="form-horizontal">
              <fieldset>

              <legend>Wybierz kategorię</legend>

              <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="selectCategory"></label>
              <div className="col-md-4">
                <select onChange={this.handleOnChange} id="selectCategory" name="selectCategory" className="form-control">
                  <option value="0">Wszystkie kategorie</option>
                  {this.state.blog_categories.map(category => <option value={category.blog_category_id}>{category.name}</option>)}
                </select>
              </div>
              </div>

              </fieldset>
            </form>

          </div>
        </div>
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
      </div>
    )
  }
}
export default Blogs
