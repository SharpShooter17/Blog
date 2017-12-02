import React, {Component} from 'react'
import axios from 'axios';
var querystring = require('querystring');

export const apiClient = axios.create({
  baseURL: "http://localhost:80/Blog/", //http://localhost:80/Blog/
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

export default apiClient
