import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Api from './Api';
import Cookies from 'js-cookie'

export class RemoveCategory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      blogs: [],
      categories: []
    }
    this.updateCategory = this.updateCategory.bind(this);
  }
  componentWillMount(){
    Api.getUserBlogs(Cookies.get('id')).then(function(response){
      this.setState({
        blogs: response.data.results
      })
    }.bind(this));
  }
  updateCategory(e){
    Api.getCategories(this, e.target.value)
  }
  render(){
    return (
      <div>
        <h2 className="text-danger">Uwaga!</h2>
        <p>
          Poniższa operacja trwale <b>usunie</b> Twoją <b>kategorię</b> oraz <b>wszystkie artykuły</b> z tej kategorii!
          Tej operacji nie da się odwrócić!
        </p>
        <form className="form-horizontal">
          <fieldset>

          <legend>Usuń kategorię</legend>

          <div className="form-group">
            <label className="col-md-4 control-label" for="blog">Wybierz blog</label>
            <div className="col-md-4">
              <select onChange={this.updateCategory} id="blog" name="blog" className="form-control">
                <option selected="" disabled="" value="0">Wybierz blog</option>
                {this.state.blogs.map(blog => <option value={blog.blog_id}>{blog.name}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="category">Wybierz kategorię</label>
            <div className="col-md-4">
              <select id="category" name="category" className="form-control">
                <option value="0" selected="" disabled="">Wybierz kategorię</option>
                {this.state.categories.map(category => <option value={category.category_id}>{category.name}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="submit">Wciśnij aby usunąć kategorię</label>
            <div className="col-md-4">
              <button id="submit" name="submit" className="btn btn-danger">Usuń kategorię</button>
            </div>
          </div>

          </fieldset>
        </form>
      </div>
    )
  }
}

export default RemoveCategory
