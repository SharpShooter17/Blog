import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Api from './Api';
import Cookies from 'js-cookie'

export class AddCategory extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      blogs: [],
    }
  }

  componentWillMount(){
    Api.getUserBlogs(this);
  }

  render(){
    return (
      <form class="form-horizontal">
        <fieldset>

        <legend>Dodaj kategorię</legend>

        <div class="form-group">
          <label class="col-md-4 control-label" for="blog">Blog</label>
          <div class="col-md-4">
            <select id="blog" name="blog" class="form-control">
              {this.state.blogs.map(blog => <option value={blog.blog_id}>{blog.name}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" for="category">Nazwa kategorii</label>
          <div className="col-md-4">
          <input id="category" name="category" type="text" placeholder="kategoria" className="form-control input-md" />
          <span className="help-block">Wpisz nazwę kategorii </span>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" for="submit"></label>
          <div className="col-md-4">
            <button id="submit" name="submit" className="btn btn-success">Dodaj kategorię </button>
          </div>
        </div>

        </fieldset>
      </form>
    )
  }
}

export default AddCategory
