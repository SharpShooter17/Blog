import React from 'react'
import Api from './Api';

export default class AddArticle extends React.Component {
  constructor(props){
    super(props);

    this.updateCategory = this.updateCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      blogs: [],
      categories: [{category_id: '', name: ''}]
    }
  }

  componentWillMount(){
    Api.getUserBlogs(this);
  }

  updateCategory(e){
    Api.getCategories(this, e.target.value)
  }

  handleSubmit(e) {
    e.preventDefault();

    const blog_id = e.target.blog.value;
    const category_id = e.target.category.value;
    const title = e.target.title.value;
    const content = e.target.content.value;

    Api.addArticle(this, blog_id, category_id, title, content);
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit} className="form-horizontal">
          <fieldset>

          <legend>Dodaj artykuł</legend>

          <div className="form-group">
            <label className="col-md-4 control-label" for="blog">Blog</label>
            <div className="col-md-4">
              <select onChange={this.updateCategory} id="blog" name="blog" className="form-control" required="">
                <option value="0" selected="" disabled="">Wybierz blog</option>
                {this.state.blogs.map(blog => <option value={blog.blog_id}>{blog.name}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" for="category">Kategoria</label>
            <div className="col-md-4">
              <select id="category" name="category" className="form-control" required="">
                <option value="0" selected="" disabled="">Wybierz kategorię</option>
                {this.state.categories.map(category => <option value={category.category_id}>{category.name}</option>)}
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
              <button onClick={event => {this.onSubmit;}} id="submit" name="submit" className="btn btn-success">Dodaj artykuł</button>
            </div>
          </div>

          </fieldset>
        </form>
      </div>
    )
  }
}
