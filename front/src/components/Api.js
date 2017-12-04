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

const getUserBlogs = function(id){
  return apiClient().get('/index.php?/API/BlogController/getUserBlogs/' + id);
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
        msg: response.data.response
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
          msg: response.data.response
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

const getUserDetails = function (nick){
  return apiClient().get('/index.php?/API/UserController/getUserDetails/' + nick);
}

const getBlogDetails = function(blog){
  return axios.post(baseURL + '/index.php?/API/BlogController/getBlogDetails/', querystring.stringify({
    name: blog
  }))
}

const getBlogArticles = function(obj, blog_id){
  apiClient().get('/index.php?/API/ArticleController/getArticles/' + blog_id)
  .then(response => {
    obj.setState({
      articles: response.data.results
    })
    })
    .catch(error => {
      console.log(error);
    });
}

const getArticle = function(id){
  return apiClient().get('/index.php?/API/ArticleController/getArticle/' + id)
}

const getUsers = function() {
  return apiClient().get('/index.php?/API/UserController/getUsers');
}

const getBlogs = function(){
  return apiClient().get('/index.php?/API/BlogController/getBlogs');
}

const addComment = function(article, _comment) {
  return axios.post(baseURL + '/index.php?/API/CommentsController/addComment/', querystring.stringify({
    token: Cookies.get('token'),
    article_id: article,
    comment: _comment
  }))
}

export default {getBlogCategories, getUserBlogs, getCategories,
                addBlog, addCategory, addArticle,
                getLastestArticles, getUserDetails, getBlogDetails,
                getBlogArticles, getArticle, getUsers, getBlogs,
                addComment}
