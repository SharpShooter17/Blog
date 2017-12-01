import React, {Component} from 'react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
export class ControlPanel extends Component {
  render() {
    if (Cookies.get('logged') == 'true'){
      return (
        <div>
          <h1>Panel sterowania</h1>
          <hr />
          <p>
            Witaj w panelu sterowania. <br />
            <ul>
              <li><a href="#addBlog">Dodaj nowy blog</a></li>
              <li><a href="#addCategory">Dodaj kategorię</a></li>
              <li><a href="#addArticle">Dodaj artykuł</a></li>
              <li className="text-danger"><a href="#removeBlog">Usuń blog</a></li>
              <li className="text-danger"><a href="#removeCategory">Usuń kategorię</a></li>
              <li className="text-danger"><a href="#removeBlog">Usuń artykuł</a></li>
            </ul>
          </p>
        </div>
      )
    } else {
      return (<Redirect to="/" />)
    }
  }
}
