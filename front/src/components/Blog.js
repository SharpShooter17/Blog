import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Api from './Api'

export class Blog extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: props.match.params.blog,
      nick: '',
      last_modification: '',
      creation_date: '',
      blog_id: '',
      articles: [],
      blog_category_id: '',
      blog_category: ''
    }
  }

  componentWillMount(){
    Api.getBlogDetails(this, this.state.name);
  }

  render(){
    return(
      <div className="row">
        <div className="col">
          <h2 className="p-5 let">
            {this.state.name}
            <small> - {this.state.blog_category}</small>
          </h2>
          <hr />
          <span>Data utworzenia: {this.state.creation_date}</span><br />
          <span>Autor: <Link to={'/User/' + this.state.nick}>{this.state.nick}</Link></span><br />
        </div>
      </div>
    );
  }
}

export default Blog
