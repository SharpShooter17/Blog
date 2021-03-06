import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Api from './Api';

export class AddBlog extends React.Component{
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      blog_categories: [],
      msg: ''
    }
  }

  componentWillMount(){
    Api.getBlogCategories(this)
  }

  handleSubmit(e){
    e.preventDefault();

    const blogName = e.target.blogName.value;
    const blogCategory = e.target.category.value;

    Api.addBlog(this, blogName, blogCategory);
  }

  render(){
    if (this.state.msg == 'true'){
      return ( <Redirect to='/ControllPanel/addCategory' /> );
    }
    return(
      <div id="addBlog">
        <form onSubmit={this.handleSubmit} className="form-horizontal">
        <fieldset>

        <legend>Dodaj blog</legend>

        <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="blogName">Nazwa bloga</label>
        <div className="col-md-4">
        <input id="blogName" name="blogName" type="text" placeholder="nazwa" className="form-control input-md" required="" />
        <span className="help-block">Wpisz nazwę swojego bloga. Każda spacja zostanie zamieniona na '_'</span>
        </div>
        </div>

        <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="categories">Kategoria</label>
        <div className="col-md-4">
          <select id="category" name="category" className="form-control">
            <option value="0" selected="" disabled="">Wybierz kategorię</option>
            {this.state.blog_categories.map(category => <option key={category.blog_category_id.toString()} value={category.blog_category_id}>{category.name}</option>)}
          </select>
        </div>
        </div>

        <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="submit"></label>
        <div className="col-md-4">
          <button onClick={event => {this.onSubmit;}} id="button" name="button" className="btn btn-success">Stwórz blog</button>
        </div>
        </div>

        </fieldset>
        </form>
        <div className="text-danger">
          <span>{this.state.msg}</span>
        </div>
      </div>
    )
  }
}
export default AddBlog
