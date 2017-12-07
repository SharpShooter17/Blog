import React from 'react'
import { Link } from 'react-router-dom'
import Api from './Api'

export class Tag extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      articles: []
    }
  }
  componentWillMount(){
    Api.searchArticlesByTag(this.props.match.params.tag).then(function(response){
      this.setState({
        articles: response.data.results
      })
    }.bind(this))
  }
  render(){
    return (<div className="row">
      <div className="col">
        <h1 className="p-3">#{this.props.match.params.tag}</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Tytuł</th>
            <th>Data dodania</th>
            <th>Kategoria</th>
            <th>Autor</th>
            <th>Blog</th>
          </tr>
        </thead>
        <tbody>
        {this.state.articles.map( article => <tr key={article.article_id.toString()}>
                                      <td><Link to={'/User/'+ article.nick +'/'+article.blog+'/'+article.article_id}>{article.title}</Link></td>
                                      <td>{article.date}</td>
                                      <td>{article.category}</td>
                                      <td><Link to={'/User/'+ article.nick}>{article.nick}</Link></td>
                                      <td><Link to={'/User/'+ article.nick +'/'+article.blog}>{article.blog}</Link></td>
                                    </tr>
                                )}
        </tbody>
      </table>
      </div>
    </div>);
  }
}

export default Tag
