import React, {Component} from 'react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
import {apiClient} from './Api';
import axios from 'axios';

var querystring = require('querystring');


export class ControlPanel extends Component {
  constructor(props){
    super(props);

    this.addBlog = this.addBlog.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.removeBlog = this.removeBlog.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.removeArticle = this.removeArticle.bind(this);

    this.getBlogCategories = this.getBlogCategories.bind(this);
    this.getBlogs = this.getBlogs.bind(this);

    this.state = {
      content: '',
      blog_categories: [],
      blogs: [],
    }
  }

  getBlogCategories(){
    apiClient.get('/index.php?/API/BlogCategoryController/getCategories')
     .then(response => {
       this.setState({
         blog_categories: response.data.results
       })
     })
     .catch(error => {
       console.log(error);
     });
  }

  getBlogs(){
    console.log('Token:',Cookies.get('token'));
    axios.post('http://localhost/Blog/index.php?/API/BlogController/getUserBlogs', querystring.stringify({
        token: Cookies.get('token')
    }))
      .then(response => {
        this.setState({
          blogs: response.data.results
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentWillMount(){
    this.getBlogCategories();
    this.getBlogs();
  }

  render() {
    if (Cookies.get('logged') == 'true'){
      return (
        <div>
          <h1>Panel sterowania</h1>
          <hr />
          <p>
            Witaj w panelu sterowania. <br />
            <ul>
              <li><a onClick={this.addBlog} href="#addBlog">Dodaj nowy blog</a></li>
              <li><a onClick={this.addCategory} href="#addCategory">Dodaj kategorię</a></li>
              <li><a onClick={this.addArticle} href="#addArticle">Dodaj artykuł</a></li>
              <li className="text-danger"><a onClick={this.removeBlog} href="#removeBlog">Usuń blog</a></li>
              <li className="text-danger"><a onClick={this.removeCategory} href="#removeCategory">Usuń kategorię</a></li>
              <li className="text-danger"><a onClick={this.removeArticle}href="#removeArticle">Usuń artykuł</a></li>
            </ul>
          </p>
          {this.state.content}
        </div>
      )
    } else {
      return (<Redirect to="/" />)
    }
  }
  addBlog(){
    this.setState({
      content:
      <div id="addBlog">
        <form className="form-horizontal">
        <fieldset>

        <legend>Dodaj blog</legend>

        <div className="form-group">
        <label className="col-md-4 control-label" for="blogName">Nazwa bloga</label>
        <div className="col-md-4">
        <input id="blogName" name="blogName" type="text" placeholder="nazwa" className="form-control input-md" required="" />
        <span className="help-block">Wpisz nazwę swojego bloga</span>
        </div>
        </div>

        <div className="form-group">
        <label class="col-md-4 control-label" for="categories">Kategoria</label>
        <div class="col-md-4">
          <select id="categories" name="categories" class="form-control">
            {this.state.blog_categories.map(category => <option value={category.id}>{category.name}</option>)}
          </select>
        </div>
        </div>

        <div class="form-group">
        <label class="col-md-4 control-label" for="submit"></label>
        <div class="col-md-4">
          <button id="submit" name="submit" class="btn btn-success">Stwórz blog</button>
        </div>
        </div>

        </fieldset>
        </form>
      </div>
    });
  }

  addCategory() {
    this.setState ( {
      content:
      <form class="form-horizontal">
        <fieldset>

        <legend>Dodaj kategorię</legend>

        <div class="form-group">
          <label class="col-md-4 control-label" for="blog">Blog</label>
          <div class="col-md-4">
            <select id="blog" name="blog" class="form-control">
              {this.state.blogs.map(blog => <option value={blog.blog_id}>{blog.name}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" for="category">Nazwa kategorii</label>
          <div className="col-md-4">
          <input id="category" name="category" type="text" placeholder="kategoria" className="form-control input-md" />
          <span className="help-block">Wpisz nazwę kategorii </span>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" for="submit"></label>
          <div className="col-md-4">
            <button id="submit" name="submit" className="btn btn-success">Dodaj kategorię </button>
          </div>
        </div>

        </fieldset>
      </form>
    });
  }
  addArticle(){
    this.setState({
      content:
      <div>
        <form className="form-horizontal">
          <fieldset>

          <legend>Dodaj artykuł</legend>

          <div className="form-group">
            <label className="col-md-4 control-label" for="blog">Blog</label>
            <div className="col-md-4">
              <select id="blog" name="blog" className="form-control">
                <option value="1">Option one</option>
                <option value="2">Option two</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="category">Kategoria</label>
            <div className="col-md-4">
              <select id="category" name="category" className="form-control">
                <option value="1">Option one</option>
                <option value="2">Option two</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="title">Tytuł</label>
            <div className="col-md-4">
            <input id="title" name="title" type="text" placeholder="tutuł" className="form-control input-md" required="" />
            <span className="help-block">Wpisz tytuł artykułu</span>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="content">Treść</label>
            <div className="col">
              <textarea className="form-control" id="content" name="content">Treść Twojego artykułu</textarea>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="submit"></label>
            <div className="col-md-4">
              <button id="submit" name="submit" className="btn btn-success">Dodaj artykuł</button>
            </div>
          </div>

          </fieldset>
        </form>
      </div>
    })
  }
  removeBlog(){
    this.setState({
      content:
      <div>
      <h2 classNameName="text-danger">Uwaga!</h2>
      <p>
        Poniższa operacja trwale <b>usunie</b> Twój <b>blog</b>! Tej operacji nie da się odwrócić!
      </p>
      <form className="form-horizontal">
        <fieldset>

        <legend>Usuń blog</legend>

        <div className="form-group">
          <label className="col-md-4 control-label" for="blog">Wybierz blog</label>
          <div className="col-md-4">
            <select id="blog" name="blog" className="form-control">
              <option value="1">Option one</option>
              <option value="2">Option two</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" for="submit">Wciśnij aby usunąć blog</label>
          <div className="col-md-4">
            <button id="submit" name="submit" className="btn btn-danger">Usuń blog</button>
          </div>
        </div>

        </fieldset>
        </form>
        </div>
    })
  }

  removeCategory(){
    this.setState({
      content:
      <div>
        <h2 className="text-danger">Uwaga!</h2>
        <p>
          Poniższa operacja trwale <b>usunie</b> Twoją <b>kategorię</b> oraz <b>wszystkie artykuły</b> z tej kategorii!
          Tej operacji nie da się odwrócić!
        </p>
        <form className="form-horizontal">
          <fieldset>

          <legend>Usuń kategorię</legend>

          <div className="form-group">
            <label className="col-md-4 control-label" for="category">Wybierz kategorię</label>
            <div className="col-md-4">
              <select id="category" name="category" className="form-control">
                <option value="1">Option one</option>
                <option value="2">Option two</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="submit">Wciśnij aby usunąć kategorię</label>
            <div className="col-md-4">
              <button id="submit" name="submit" className="btn btn-danger">Usuń kategorię</button>
            </div>
          </div>

          </fieldset>
        </form>
      </div>
    })
  }

  removeArticle(){
    this.setState({
      content:
      <div>
        <h2 className="text-danger">Uwaga!</h2>
        <p>
          Poniższa operacja trwale <b>usunie</b> Twoją <b>kategorię</b> oraz <b>wszystkie artykuły</b> z tej kategorii!
          Tej operacji nie da się odwrócić!
        </p>
        <form className="form-horizontal">
          <fieldset>

          <legend>Usuń artykuł</legend>

          <div className="form-group">
          <label className="col-md-4 control-label" for="category">Wybierz kategorię</label>
          <div className="col-md-4">
            <select id="category" name="category" className="form-control">
              <option value="1">Option one</option>
              <option value="2">Option two</option>
            </select>
          </div>
          </div>

          <div className="form-group">
          <label className="col-md-4 control-label" for="title">Tytuł</label>
          <div className="col-md-4">
            <select id="title" name="title" className="form-control">
              <option value="1">Option one</option>
              <option value="2">Option two</option>
            </select>
          </div>
          </div>

          <div className="form-group">
          <label className="col-md-4 control-label" for="submit">Wciśnij aby usunąć artykuł</label>
          <div className="col-md-4">
            <button id="submit" name="submit" className="btn btn-danger">Usuń artykuł</button>
          </div>
          </div>

          </fieldset>
        </form>
      </div>
    });
  }
}
