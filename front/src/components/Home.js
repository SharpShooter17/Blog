import React, { Component } from 'react';
import Api from './Api';
import {Link, Redirect} from 'react-router-dom'

export class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      pages: []
    }
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  getLastestArticles(page){
    Api.getLastestArticles(this, 10, page, 500);
  }

  pagination(page){
    var startPage;
    if (page <= 3){
      startPage = 1;
    } else {
      startPage = page - 3;
    }
    var _pages = [];
    for (var i = 0; i < 7; i++){
      _pages[i] = i + startPage;
    }
    this.setState({
      pages: _pages
    })
  }

  componentWillMount(){
    var page = this.props.match.params.page;
    if ( page == undefined ){
      page = 1;
    }
    this.getLastestArticles(page)
    this.pagination(page);
  }

  handleOnClick(e){
    this.getLastestArticles(e.target.text);
    this.pagination(e.target.text);
  }

  render() {
    return (
      <div>
        <h1 className="p-5">Strona główna</h1>
        <hr />
        <h3 className="p-3">Ostatnie artykuły</h3>
        {this.state.articles.map(
          article =>
          <div key={article.article_id.toString()} className="row m-4">
            <div className="col-12">
              <div className="row">
                <div className="col-12 bg-dark">
                  <div className="p-4">
                    <h4 className="text-light"><b>{<Link to={'/User/' + article.nick + '/' + article.blog + '/' + article.article_id}>{article.title}</Link>}</b></h4>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-m-12 col-lg-3 p-1 bg-secondary text-light">
                  <span>Kategoria bloga: <strong>{article.blogCategory}</strong></span><br />
                  <span>Nazwa Bloga: <strong><Link to={'/User/' + article.nick + '/'+ article.blog}>{article.blog}</Link></strong></span><br />
                  <span>Z kategorii: <strong>{article.kategoria}</strong></span><br />
                  <span>Autor: <strong><Link to={'/User/' + article.nick}>{article.nick}</Link></strong></span><br />
                  <span>Data dodania: <strong>{article.date}</strong></span><br />
                </div>
                <div className="col-m-12 col-lg-9 lead bg-light" dangerouslySetInnerHTML={{__html: article.content}} />

              </div>
            </div>
          </div>
        )}

        <nav aria-label="...">
          <ul className="pagination pagination-m justify-content-center">
            {this.state.pages.map(page => (this.props.match.params.page == page) ? (
              <li key={page.toString()} className="page-item active"><span className="page-link">{page}</span></li>)
              : (<li key={page.toString()} className="page-item"><Link onClick={this.handleOnClick} to={'/Home/' + page} className="page-link">{page}</Link></li>) )}
          </ul>
        </nav>
      </div>
    );
  }
}
export default Home
