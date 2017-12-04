import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Api from './Api';
import Cookies from 'js-cookie'

export class AddCategory extends React.Component{
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      blogs: [],
      msg: ''
    }
  }

  componentWillMount(){
    Api.getUserBlogs(Cookies.get('id')).then(function(response){
      this.setState({
        blogs: response.data.results
      })
    }.bind(this));
  }

  handleSubmit(e){
    e.preventDefault()
    const blogId = e.target.blog.value;
    const name = e.target.category.value;
    Api.addCategory(this, blogId, name);
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} className="form-horizontal">
        <div className="text-success" >{ (this.state.msg == 'true') ? 'Dodano kategorie' : ''}</div>
        <fieldset>

        <legend>Dodaj kategorię</legend>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="blog">Blog</label>
          <div className="col-md-4">
            <select id="blog" name="blog" className="form-control">
              {this.state.blogs.map(blog => <option value={blog.blog_id}>{blog.name}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="category">Nazwa kategorii</label>
          <div className="col-md-4">
          <input id="category" name="category" type="text" placeholder="kategoria" className="form-control input-md" />
          <span className="help-block">Wpisz nazwę kategorii </span>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="submit"></label>
          <div className="col-md-4">
            <button onClick={event => {this.onSubmit;}} id="submit" name="submit" className="btn btn-success">Dodaj kategorię </button>
          </div>
        </div>

        </fieldset>
        <div className="text-danger">
          <span>{this.state.msg == 'true' ? '' : this.state.msg}</span>
        </div>
      </form>
    )
  }
}

export default AddCategory
