import React, {Component} from 'react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
export class ControlPanel extends Component {
  constructor(props){
    super(props);

    this.addBlog = this.addBlog.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.removeBlog = this.removeBlog.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.removeArticle = this.removeArticle.bind(this);

    this.state = {
      content: ''
    }
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
        <form class="form-horizontal">
        <fieldset>

        <legend>Dodaj blog</legend>

        <div class="form-group">
        <label class="col-md-4 control-label" for="blogName">Nazwa bloga</label>
        <div class="col-md-4">
        <input id="blogName" name="blogName" type="text" placeholder="nazwa" class="form-control input-md" required="" />
        <span class="help-block">Wpisz nazwę swojego bloga</span>
        </div>
        </div>

        <div class="form-group">
        <label class="col-md-4 control-label" for="categories">Kategoria</label>
        <div class="col-md-4">
          <select id="categories" name="categories" class="form-control">
            <option value="1">Option one</option>
            <option value="2">Option two</option>
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
              <option value="1">Option one</option>
              <option value="2">Option two</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="col-md-4 control-label" for="category">Nazwa kategorii</label>
          <div class="col-md-4">
          <input id="category" name="category" type="text" placeholder="kategoria" class="form-control input-md" />
          <span class="help-block">Wpisz nazwę kategorii </span>
          </div>
        </div>

        <div class="form-group">
          <label class="col-md-4 control-label" for="submit"></label>
          <div class="col-md-4">
            <button id="submit" name="submit" class="btn btn-success">Dodaj kategorię </button>
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
        <form class="form-horizontal">
          <fieldset>

          <legend>Dodaj artykuł</legend>

          <div class="form-group">
            <label class="col-md-4 control-label" for="blog">Blog</label>
            <div class="col-md-4">
              <select id="blog" name="blog" class="form-control">
                <option value="1">Option one</option>
                <option value="2">Option two</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="col-md-4 control-label" for="category">Kategoria</label>
            <div class="col-md-4">
              <select id="category" name="category" class="form-control">
                <option value="1">Option one</option>
                <option value="2">Option two</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="col-md-4 control-label" for="title">Tytuł</label>
            <div class="col-md-4">
            <input id="title" name="title" type="text" placeholder="tutuł" class="form-control input-md" required="" />
            <span class="help-block">Wpisz tytuł artykułu</span>
            </div>
          </div>

          <div class="form-group">
            <label class="col-md-4 control-label" for="content">Treść</label>
            <div class="col">
              <textarea class="form-control" id="content" name="content">Treść Twojego artykułu</textarea>
            </div>
          </div>

          <div class="form-group">
            <label class="col-md-4 control-label" for="submit"></label>
            <div class="col-md-4">
              <button id="submit" name="submit" class="btn btn-success">Dodaj artykuł</button>
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
      <h2 className="text-danger">Uwaga!</h2>
      <p>
        Poniższa operacja trwale <b>usunie</b> Twój <b>blog</b>! Tej operacji nie da się odwrócić!
      </p>
      <form class="form-horizontal">
        <fieldset>

        <legend>Usuń blog</legend>

        <div class="form-group">
          <label class="col-md-4 control-label" for="blog">Wybierz blog</label>
          <div class="col-md-4">
            <select id="blog" name="blog" class="form-control">
              <option value="1">Option one</option>
              <option value="2">Option two</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="col-md-4 control-label" for="submit">Wciśnij aby usunąć blog</label>
          <div class="col-md-4">
            <button id="submit" name="submit" class="btn btn-danger">Usuń blog</button>
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
        <form class="form-horizontal">
          <fieldset>

          <legend>Usuń kategorię</legend>

          <div class="form-group">
            <label class="col-md-4 control-label" for="category">Wybierz kategorię</label>
            <div class="col-md-4">
              <select id="category" name="category" class="form-control">
                <option value="1">Option one</option>
                <option value="2">Option two</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="col-md-4 control-label" for="submit">Wciśnij aby usunąć kategorię</label>
            <div class="col-md-4">
              <button id="submit" name="submit" class="btn btn-danger">Usuń kategorię</button>
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
        <form class="form-horizontal">
          <fieldset>

          <legend>Usuń artykuł</legend>

          <div class="form-group">
          <label class="col-md-4 control-label" for="category">Wybierz kategorię</label>
          <div class="col-md-4">
            <select id="category" name="category" class="form-control">
              <option value="1">Option one</option>
              <option value="2">Option two</option>
            </select>
          </div>
          </div>

          <div class="form-group">
          <label class="col-md-4 control-label" for="title">Tytuł</label>
          <div class="col-md-4">
            <select id="title" name="title" class="form-control">
              <option value="1">Option one</option>
              <option value="2">Option two</option>
            </select>
          </div>
          </div>

          <div class="form-group">
          <label class="col-md-4 control-label" for="submit">Wciśnij aby usunąć artykuł</label>
          <div class="col-md-4">
            <button id="submit" name="submit" class="btn btn-danger">Usuń artykuł</button>
          </div>
          </div>

          </fieldset>
        </form>
      </div>
    });
  }
}
