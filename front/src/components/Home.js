import React, { Component } from 'react';
import Api from './Api';


export class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      articles: []
    }
  }

  componentWillMount(){
    Api.getLastestArticles(this, 20, 1);
  }

  render() {
    return (
      <div>
        <h1>Strona główna</h1>
        <hr />
        <h3>Ostatnie artykuły</h3>
        {this.state.articles.map(
          article =>
          <div className="article">
            <h4><b>{article.title}</b></h4>
            <span>{article.blog} - {article.kategoria} - {article.date}</span>
            <p>
              {article.content}
            </p>
          </div>
        )}
      </div>
    );
  }
}
