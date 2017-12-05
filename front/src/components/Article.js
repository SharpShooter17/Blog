import React from 'react'
import { Link } from 'react-router-dom'
import Api from './Api'
import Cookies from 'js-cookie'
import '../css/chip.css'

export class Article extends React.Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.getArticleContent = this.getArticleContent.bind(this);
    this.getArticleTags = this.getArticleTags.bind(this);

    this.state = {
      content: '',
      date: '',
      title: '',
      author: '',
      category: '',
      blog: '',
      msg: '',
      comments: [],
      characters: 300,
      tags: []
    }
  }

  getComments(){
    Api.getComments(this.props.match.params.article)
    .then(function(response){
      this.setState({
        comments: response.data.results
      })
    }.bind(this))
  }

  getArticle(){
    const article = Api.getArticle(this.props.match.params.article)
    article.then(function(response) {
      this.setState({
        date: response.data.article.date,
        title: response.data.article.title,
        author: response.data.article.nick,
        blog: response.data.article.blog,
        category: response.data.article.category
      })
    }.bind(this))
  }

  getArticleTags(){
    Api.getArticleTags(this.props.match.params.article)
    .then(function(response){
      this.setState({
        tags: response.data.results
      })
    }.bind(this))
  }

  componentWillMount(){
    this.getArticle();
    this.getComments();
    this.getArticleContent();
    this.getArticleTags();
  }

  getArticleContent() {
    Api.getArticleContent(this.props.match.params.article)
    .then( function(response) {
      this.setState({
        content: response.data
      })
    }.bind(this))
  }

  componentDidMount(){

  }

  handleSubmit(e){
    e.preventDefault();
    Api.addComment(this.props.match.params.article, e.target.comment.value)
    .then(function(response){
      this.setState({
        msg: response.data.response
      })
      if (response.data.response == 'true'){
        this.clearForm();
        this.getComments();
        this.setState({
          msg: ''
        })
      } else if (response.data.response == 'Comment is too short') {
        this.setState({
          msg: 'Komentarz jest za krótki'
        })
      } else {
        this.setState({
          msg: 'Nie udało się dodać komentarza. Spróbuj jescze raz!'
        })
      }
    }.bind(this))
  }

  clearForm(){
    document.getElementById('comment').value = "";
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
          <div className="col" id="articleContent" dangerouslySetInnerHTML={{__html: this.state.content}} />
        </div>
        <div className="row">
          <div className="col">
            <h4 className="p-2">Tagi</h4>
            <hr />
            {this.state.tags.map(t => <div className="chip">{t.tag}</div> )}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3 className="p-3">Komentarze</h3>
            <hr />
            {Cookies.get('logged') == 'true' ?
            <form onSubmit={this.handleSubmit} className="form-horizontal">
              <fieldset>

              <legend>Dodaj komentarz</legend>

              <div className="form-group">
                <label className="col control-label" htmlFor="comment">Komentarz</label>
                <div className="col">
                  <textarea require="" rows="5" placeholder="Twój komentarz" maxLength="300" className="form-control" id="comment" name="comment"></textarea>
                </div>
              </div>

              <div className="form-group">
                <label className="col control-label" htmlFor="submit"></label>
                <div className="col">
                  <button onClick={event => {this.onSubmit;}} id="submit" name="submit" className="btn btn-success">Skomentuj</button>
                </div>
              </div>

              </fieldset>
              <span className="text-danger">{this.state.msg}</span>
            </form>
            : ''}
            {this.state.comments.map(comment => <div className="m-4">
                <div className="row bg-secondary">
                  <div className="col p-3">
                    <span><Link className="text-warning" to={'/User/' + comment.nick}>{comment.nick}</Link></span>
                    <span> {comment.date}</span>
                  </div>
                </div>
                <div className="row bg-light">
                  <div className="col p-3">
                    <p>{comment.comment}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
