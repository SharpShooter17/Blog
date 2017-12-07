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
    document.getElementById('title').value = ""
  }

  handleSubmit(e) {
    e.preventDefault();

    const blog_id = e.target.blog.value;
    const category_id = e.target.category.value;
    const title = e.target.title.value;
    const content = this.state.content; //e.target.content.value;
    const tags = this.state.tags;

    Api.addArticle(blog_id, category_id, title, content, tags)
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
                {this.state.blogs.map(blog => <option key={blog.blog_id.toString()} value={blog.blog_id}>{blog.name}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="category">Kategoria</label>
            <div className="col-md-4">
              <select id="category" name="category" className="form-control" required="">
                <option value="0" selected="" disabled="">Wybierz kategorię</option>
                {this.state.categories.map(category => <option key={category.category_id.toString()} value={category.category_id}>{category.name}</option>)}
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
              initialValue="<p>Tutaj wpisz treść Twojego artykułu...</p>"
              init={{
                plugins: [
                  "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
                  "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                  "table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern"
                ],

                toolbar1: "newdocument fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
                toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime preview | forecolor backcolor",
                toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft",
                content_css: [
                  '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                  '//www.tinymce.com/css/codepen.min.css'],

                menubar: false,
                toolbar_items_size: 'small',

                style_formats: [{
                  title: 'Bold text',
                  inline: 'b'
                }, {
                  title: 'Red text',
                  inline: 'span',
                  styles: {
                    color: '#ff0000'
                  }
                }, {
                  title: 'Red header',
                  block: 'h1',
                  styles: {
                    color: '#ff0000'
                  }
                }, {
                  title: 'Example 1',
                  inline: 'span',
                  classes: 'example1'
                }, {
                  title: 'Example 2',
                  inline: 'span',
                  classes: 'example2'
                }, {
                  title: 'Table styles'
                }, {
                  title: 'Table row 1',
                  selector: 'tr',
                  classes: 'tablerow1'
                }],
                height:   700,
                branding: false
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
              {this.state.tags.map( tag =><div key={tag} className="chip">
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
