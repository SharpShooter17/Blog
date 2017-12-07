import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Api from './Api';
import Cookies from 'js-cookie'
export class RemoveArticle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      blogs: [],
      categories: [],
      articles: [],
      msg: []
    }
    this.updateCategory = this.updateCategory.bind(this);
    this.updateArticles = this.updateArticles.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
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
  updateArticles(e){
    Api.getArticlesByCategoryId(e.target.value)
    .then(function(response){
      this.setState({
        articles: response.data.results
      })
    }.bind(this))
  }
  removeArticle(e){
    e.preventDefault()
    Api.removeArticle(e.target.article.value).then(function(response){
      this.setState({
        msg: response.data.response
      })
    }.bind(this))
  }
  render() {
    return(
      <div>
        <h2 className="text-danger">Uwaga!</h2>
        <p>
          Poniższa operacja trwale <b>usunie</b> Twoją <b>kategorię</b> oraz <b>wszystkie artykuły</b> z tej kategorii!
          Tej operacji nie da się odwrócić!
        </p>
        <form onSubmit={this.removeArticle} className="form-horizontal">
          <fieldset>

          <legend>Usuń artykuł</legend>

          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="blog">Wybierz blog</label>
            <div className="col-md-4">
              <select onChange={this.updateCategory} id="blog" name="blog" className="form-control">
                <option selected="" disabled="" value="0">Wybierz blog</option>
                {this.state.blogs.map(blog => <option key={blog.blog_id.toString()} value={blog.blog_id}>{blog.name}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="category">Wybierz kategorię</label>
            <div className="col-md-4">
              <select onChange={this.updateArticles} id="category" name="category" className="form-control">
                <option value="0" selected="" disabled="">Wybierz kategorię</option>
                {this.state.categories.map(category => <option key={category.category_id.toString()} value={category.category_id}>{category.name}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="title">Artykuł</label>
          <div className="col-md-4">
            <select id="article" name="article" className="form-control">
              <option value="0">Wybierz artykuł</option>
              {this.state.articles.map(article => <option key={article.article_id.toString()} value={article.article_id}>{article.title}</option>)}
            </select>
          </div>
          </div>

          <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="submit">Wciśnij aby usunąć artykuł</label>
          <div className="col-md-4">
            <button onClick={event => {this.onSubmit;}} id="submit" name="submit" className="btn btn-danger">Usuń artykuł</button>
          </div>
          </div>

          </fieldset>
        </form>
        { (this.state.msg == 'true') ? <span className="text-success">Artykuł został usunięty</span> : (this.state.msg != '') ?
                                        <span className="text-danger">Artykuł nie może być usunięty - {this.state.msg}</span> : ''}
      </div>
    )
  }
}
export default RemoveArticle
