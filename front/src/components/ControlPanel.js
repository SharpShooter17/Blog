import React, {Component} from 'react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
export class ControlPanel extends Component {
  constructor(props){
    super(props);
    this.addBlog = this.addBlog.bind(this);
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
              <li><a href="#addCategory">Dodaj kategorię</a></li>
              <li><a href="#addArticle">Dodaj artykuł</a></li>
              <li className="text-danger"><a href="#removeBlog">Usuń blog</a></li>
              <li className="text-danger"><a href="#removeCategory">Usuń kategorię</a></li>
              <li className="text-danger"><a href="#removeBlog">Usuń artykuł</a></li>
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
}
