import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Api from './Api'

export class Blog extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: props.match.params.blog,
      nick: '',
      last_modification: '',
      creation_date: '',
      blog_id: '',
      articles: [],
      blog_category_id: '',
      blog_category: ''
    }
  }

  componentWillMount(){
    const blogDetails = Api.getBlogDetails(this.state.name);
    blogDetails.then(function(response) {
      if (typeof response.data.results !== 'undefined'){
      this.setState({
        nick: response.data.results.nick,
        name: response.data.results.name,
        last_modification: response.data.results.last_modification,
        creation_date: response.data.results.creation_date,
        blog_id: response.data.results.blog_id,
        blog_category_id: response.data.results.blog_category_id,
        blog_category: response.data.results.blogCategory
      })
      Api.getBlogArticles(this, response.data.results.blog_id);
    }}.bind(this))
  }

  componentDidMount() {
    //setInterval(this.inc, 1000);
  }

  render(){
    return(
      <div>
        <div className="row">
          <div className="col">
            <h2 className="p-5 let">
              {this.state.name}
              <small> - {this.state.blog_category}</small>
            </h2>
            <hr />
            <span>Data utworzenia: {this.state.creation_date}</span><br />
            <span>Autor: <Link to={'/User/' + this.state.nick}>{this.state.nick}</Link></span><br />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3 className="p-3">Artykuły</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Tytuł</th>
                  <th>Data dodania</th>
                  <th>Kategoria</th>
                </tr>
              </thead>
              <tbody>
              {this.state.articles.map( article => <tr>
                  <td><Link to={'/User/'+this.props.match.params.user+'/'+this.props.match.params.blog+'/'+article.article_id}>{article.title}</Link></td>
                  <td>{article.date}</td>
                  <td>{article.category}</td>
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

export default Blog
