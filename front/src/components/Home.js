import React, { Component } from 'react';

export class Home extends Component {
  render() {
    return (
      <div>
        <h1>Strona główna</h1>
        <hr />
        Najczęściej odwiedzane:
        <ul>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>
    );
  }
}
