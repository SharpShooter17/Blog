import axios from 'axios';
import Cookies from 'js-cookie'
var querystring = require('querystring');

const baseURL = 'http://localhost:80/Blog/'

const apiClient = function() {
    return axios.create({
      baseURL: "http://localhost:80/Blog/", //http://localhost:80/Blog/
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
  }

const getBlogCategories = function(obj){
    return apiClient().get('/index.php?/API/BlogCategoryController/getCategories')
     .then(response => {
       obj.setState({
         blog_categories:  response.data.results
       })
     })
     .catch(error => {
       console.log(error);
     })
  }

const getUserBlogs = function(obj){
  axios.post(baseURL + '/index.php?/API/BlogController/getUserBlogs', querystring.stringify({
      token: Cookies.get('token')
  }))
    .then(response => {
      obj.setState({
        blogs: response.data.results
      })
    })
    .catch(function (error) {
      console.log(error);
    });
}

const getCategories = function (obj, blogId){
    apiClient().get('/index.php?/API/CategoryController/getBlogCategories/' + blogId)
    .then(response => {
      obj.setState({
        categories: response.data.results
      })
      })
      .catch(error => {
        console.log(error);
      });
  }

const addBlog = function (obj, blogName, blogCategory){
  axios.post(baseURL + '/index.php?/API/BlogController/addBlog', querystring.stringify({
      token: Cookies.get('token'),
      name: blogName,
      category: blogCategory
  }))
    .then(response => {
      obj.setState({
        msg: response.data.results
      })
    })
    .catch(function (error) {
      console.log(error);
    });
}

const addCategory = function (obj, blog_id, name){
    axios.post(baseURL + '/index.php?/API/CategoryController/addCategory', querystring.stringify({
        token: Cookies.get('token'),
        blogId: blog_id,
        category: name
    }))
      .then(response => {
        obj.setState({
          msg: response.data.results
        })
      })
      .catch(function (error) {
        console.log(error);
      });
}

const addArticle = function (obj, _blog_id, _category_id, _title, _content){
  axios.post(baseURL + '/index.php?/API/ArticleController/addArticle', querystring.stringify({
      token: Cookies.get('token'),
      blog_id: _blog_id,
      category_id: _category_id,
      title: _title,
      content: _content
  }))
    .then(response => {
      obj.setState({
        msg: response.data.results
      })
    })
    .catch(function (error) {
      console.log(error);
    });
}

const getLastestArticles = function (obj, count, page, wordsLimit){
  apiClient().get('/index.php?/API/ArticleController/getLastArticles/' + count + '/' + page + '/' + wordsLimit)
  .then(response => {
    obj.setState({
      articles: response.data
    })
    })
    .catch(error => {
      console.log(error);
    });

}

const getUserDetails = function (obj, nick){
  apiClient().get('/index.php?/API/UserController/getUserDetails/' + nick)
  .then(response => { console.log(response.data.results)
    obj.setState({
      nick: response.data.results.nick,
      id: response.data.results.user_id,
      email: response.data.results.email,
      role: response.data.results.name,
    })
    })
    .catch(error => {
      console.log(error);
    });
}

export default {getBlogCategories, getUserBlogs, getCategories,
                addBlog, addCategory, addArticle,
                getLastestArticles, getUserDetails}
