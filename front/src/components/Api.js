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

export default {getBlogCategories, getUserBlogs, getCategories, addBlog}
