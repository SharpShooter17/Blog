import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Api from './Api';
import Cookies from 'js-cookie'

export class RemoveBlog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      blogs: []
    }
  }
  componentWillMount(){
    Api.getUserBlogs(Cookies.get('id')).then(function(response){
      this.setState({
        blogs: response.data.results
      })
    }.bind(this));
  }
  render(){
    return (
      <div>
        <h2 className="text-danger">Uwaga!</h2>
        <p>
          Poniższa operacja trwale <b>usunie</b> Twój <b>blog</b>! Tej operacji nie da się odwrócić!
        </p>
        <form className="form-horizontal">
          <fieldset>

          <legend>Usuń blog</legend>

          <div className="form-group">
            <label className="col-md-4 control-label" for="blog">Wybierz blog</label>
            <div className="col-md-4">
              <select id="blog" name="blog" className="form-control">
                <option selected="" value="0">Wybierz blog</option>
                {this.state.blogs.map(blog => <option value={blog.blog_id}>{blog.name}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="submit">Wciśnij aby usunąć blog</label>
            <div className="col-md-4">
              <button id="submit" name="submit" className="btn btn-danger">Usuń blog</button>
            </div>
          </div>

          </fieldset>
        </form>
      </div>
    )
  }
}
export default RemoveBlog
