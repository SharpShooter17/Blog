import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Api from './Api';

export class AddBlog extends React.Component{
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      blog_categories: []
    }
  }

  componentWillMount(){
    Api.getBlogCategories(this)
  }

  handleSubmit(e){
    const blogName = e.target.blogName.value;
    const blogCategory = e.target.categories.value;
    Api.addBlog(this, blogName, blogCategory);
  }

  render(){
    return(
      <div id="addBlog">
        <form onSubmit={this.handleSubmit} className="form-horizontal">
        <fieldset>

        <legend>Dodaj blog</legend>

        <div className="form-group">
        <label className="col-md-4 control-label" for="blogName">Nazwa bloga</label>
        <div className="col-md-4">
        <input id="blogName" name="blogName" type="text" placeholder="nazwa" className="form-control input-md" required="" />
        <span className="help-block">Wpisz nazwę swojego bloga</span>
        </div>
        </div>

        <div className="form-group">
        <label class="col-md-4 control-label" for="categories">Kategoria</label>
        <div class="col-md-4">
          <select id="categories" name="categories" class="form-control">
            {this.state.blog_categories.map(category => <option value={category.id}>{category.name}</option>)}
          </select>
        </div>
        </div>

        <div class="form-group">
        <label class="col-md-4 control-label" for="submit"></label>
        <div class="col-md-4">
          <button onClick={event => {this.onSubmit;}} id="button" name="button" class="btn btn-success">Stwórz blog</button>
        </div>
        </div>

        </fieldset>
        </form>
      </div>
    )
  }
}
export default AddBlog
