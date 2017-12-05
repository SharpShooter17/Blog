import React from 'react'
import Api from './Api';
import Cookies from 'js-cookie'
import { Editor } from '@tinymce/tinymce-react';
import '../css/chip.css'

export default class AddArticle extends React.Component {
  constructor(props){
    super(props);

    this.updateCategory = this.updateCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagButton = this.handleTagButton.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.state = {
      blogs: [],
      categories: [{category_id: '', name: ''}],
      content: '',
      tags: []
    }

    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  handleEditorChange = (e) => {
    this.setState({
      content: e.target.getContent()
    })
  }

  componentWillMount(){
    Api.getUserBlogs(Cookies.get('id')).then(function(response){
      this.setState({
        blogs: response.data.results
      })
    }.bind(this));
  }

  updateCategory(e){
    Api.getCategories(this, e.target.value)
  }

  clearForm(){
    document.getElementById('content').value = ""
    document.getElementById('title').value = ""
  }

  handleSubmit(e) {
    e.preventDefault();

    const blog_id = e.target.blog.value;
    const category_id = e.target.category.value;
    const title = e.target.title.value;
    const content = this.state.content; //e.target.content.value;

    Api.addArticle(blog_id, category_id, title, content)
    .then( function(response) {
      if ( response.data.response == 'true' ){
        this.setState({
          msg: 'Dodano post!'
        })
        this.clearForm()
      } else {
        this.setState({
          msg: response.data.response
        })
      }
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  render(){
    //const filteredTags = this.state.tags.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS, {caseSensitive: false, fuzzy:true, sortResults: true}))
    return(
      <div>
        <form onSubmit={this.handleSubmit} className="form-horizontal">
          <fieldset>

          <legend>Dodaj artykuł</legend>

          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="blog">Blog</label>
            <div className="col-md-4">
              <select onChange={this.updateCategory} id="blog" name="blog" className="form-control" required="">
                <option value="0" selected="" disabled="">Wybierz blog</option>
                {this.state.blogs.map(blog => <option value={blog.blog_id}>{blog.name}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="category">Kategoria</label>
            <div className="col-md-4">
              <select id="category" name="category" className="form-control" required="">
                <option value="0" selected="" disabled="">Wybierz kategorię</option>
                {this.state.categories.map(category => <option value={category.category_id}>{category.name}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="title">Tytuł</label>
            <div className="col-md-4">
            <input id="title" name="title" type="text" placeholder="tutuł" className="form-control input-md" required="" />
            <span className="help-block">Wpisz tytuł artykułu</span>
            </div>
          </div>
          <span className="text-info">{this.state.msg}</span>
          <Editor
              initialValue="<p>This is the initial content of the editor</p>"
              init={{
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
              }}
              onChange={this.handleEditorChange}
            />

          <div className="form-group p-3">
            <label className="col-md-4 control-label" htmlFor="tags">Tagi</label>
            <div className="col-md-4">
              <div className="input-group">
                <input id="tagInput" name="tagInput" type="text" placeholder="np.: tag" className="form-control input-md" />
                <span className="input-group-btn">
                  <button onClick={this.handleTagButton} className="btn btn-secondary" type="button">Otaguj</button>
                </span>
              </div>
          </div>
          <div className="row">
            <div className="col p-3" id="tagContainer">
              {this.state.tags.map( tag =><div className="chip">
              <span className="tagName">{tag}</span>
              <span className="closebtn" onClick={this.removeTag}>&times;</span>
              </div> )}
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="submit"></label>
            <div className="col-md-4">
              <button onClick={event => {this.onSubmit;}} id="submit" name="submit" className="btn btn-success">Dodaj artykuł</button>
            </div>
          </div>
          </div>
          </fieldset>
        </form>
      </div>
    )
  }

  removeTag(e){
    const name = e.target.parentElement.getElementsByClassName('tagName')[0].innerHTML
    this.setState({
    tags: this.state.tags.filter( val => val !== name)
  });
  }

  handleTagButton(e){
    const item = document.getElementById('tagInput').value
    document.getElementById('tagInput').value = ""
    this.setState({
      tags: [...this.state.tags, item]
    })
  }
}
