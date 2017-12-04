import React from 'react'
import { Link } from 'react-router-dom'
import Api from './Api'

export class Article extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      content: '',
      date: '',
      title: '',
      author: '',
      category: '',
      blog: '',
    }
  }

  componentWillMount(){
    const article = Api.getArticle(this.props.match.params.article)
    article.then(function(response) {
      this.setState({
        content: response.data.article.content,
        date: response.data.article.date,
        title: response.data.article.title,
        author: response.data.article.nick,
        blog: response.data.article.blog,
        category: response.data.article.category
      })
    }.bind(this))
  }

  render(){
    return (
      <div>
        <div className="row">
          <div className="col">
            <h1 className="p-3">{this.state.title}</h1>
            <hr />
          </div>
          <div className="pull-right text-right">
            <small>Autor: <Link to={'/User/' + this.state.author}>{this.state.author}</Link></small><br />
            <small>Blog: <Link to={'/User/' + this.state.author + '/' + this.state.blog}>{this.state.blog}</Link></small><br />
            <small>Kategoria: {this.state.category}</small><br />
            <small>Data wpisu: <strong>{this.state.date}</strong></small><br />
          </div>
        </div>
        <div className="row">
          <div className="col">
          <p>
            {this.state.content}
          </p>
          </div>
        </div>
      </div>
    )
  }
}
