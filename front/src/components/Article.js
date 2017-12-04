import React from 'react'
import { Link } from 'react-router-dom'
import Api from './Api'

export class Article extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      content: '',
      date: '',
      title: ''
    }
  }

  componentWillMount(){
    const article = Api.getArticle(this.props.match.params.article)
    article.then(function(response) {
      this.setState({
        content: response.data.article.content,
        date: response.data.article.date,
        title: response.data.article.title
      })
    }.bind(this))
  }

  render(){
    return (
      <div className="row">
        <div className="col">
          <h1 className="p-3">{this.state.title}</h1>
          <small>Data wpisu: <strong>{this.state.date}</strong></small>
          <hr />
          <p>
            {this.state.content}
          </p>
        </div>
      </div>
    )
  }
}
