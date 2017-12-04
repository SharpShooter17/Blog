import React from 'react'
import { Link } from 'react-router-dom'
import Api from './Api'
import Cookies from 'js-cookie'

export class Article extends React.Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.state = {
      content: '',
      date: '',
      title: '',
      author: '',
      category: '',
      blog: '',
      msg: '',
      comments: []
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
        content: response.data.article.content,
        date: response.data.article.date,
        title: response.data.article.title,
        author: response.data.article.nick,
        blog: response.data.article.blog,
        category: response.data.article.category
      })
    }.bind(this))
  }

  componentWillMount(){
    this.getArticle();
    this.getComments();
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
          <div className="col">
          <p>
            {this.state.content}
          </p>
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
                  <textarea className="form-control" id="comment" name="comment"></textarea>
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
