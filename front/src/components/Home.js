import React, { Component } from 'react';
import Api from './Api';
import {Link} from 'react-router-dom'

export class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      articles: []
    }
  }

  componentWillMount(){
    Api.getLastestArticles(this, 20, 1, 2000);
  }

  render() {
    return (
      <div>
        <h1 className="p-5">Strona główna</h1>
        <hr />
        <h3 className="p-3">Ostatnie artykuły</h3>
        {this.state.articles.map(
          article =>
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-12 bg-dark">
                  <div className="p-4">
                    <h4 className="text-light"><b>{<Link to={'/User/' + article.nick + '/' + article.blog + '/' + article.article_id}>{article.title}</Link>}</b></h4>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-3 p-1 bg-secondary text-light">
                  <span>Kategoria bloga: <strong>{article.blogCategory}</strong></span><br />
                  <span>Nazwa Bloga: <strong><Link to={'/User/' + article.nick + '/'+ article.blog}>{article.blog}</Link></strong></span><br />
                  <span>Z kategorii: <strong>{article.kategoria}</strong></span><br />
                  <span>Autor: <strong><Link to={'/User/' + article.nick}>{article.nick}</Link></strong></span><br />
                  <span>Data dodania: <strong>{article.date}</strong></span><br />
                </div>
                <div className="col lead bg-light">
                  <article>
                    <p className="p-3">
                      {article.content}
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Home
