<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
class BlogController extends CI_Controller {
  public function __construct(){
    parent :: __construct();
    $this->load->model('BlogDB/blog');
    $this->load->model('BlogDB/statements');
    $this->load->helper('date');
    $this->load->model('token');
  }

  public function addBlog(){
    $user = $this->input->post('token');
    $user = $this->token->tokenIsValid($user);
    if (is_numeric($user)){
      if ($user == -1){
        echo $this->statements->getJson(-1);
        return;
      }
    }

    $blog_category_id = $this->input->post('category');
    $name = $this->input->post('name');
    $format = $this->blog->getFormat();
    $time = mdate($format, time());
    $result = $this->blog->addBlog($user, $blog_category_id, $name, null, $time);
    header('Content-Type: application/json');
    echo $result = $this->statements->getJson($result);
  }

  public function deleteBlog($blog_id) {
    $result = $this->blog->deleteBlog($blog_id);
    if ($result) {
      $result = $this->statements->getJson(1);
    } else {
      $result = $this->statements->getJson(0);
    }
    header('Content-Type: application/json');
    echo $result;
  }

  public function updateLastModification($blog_id){
    $format = $this->blog->getFormat();
    $time = mdate($format, time());
    $result = $this->blog->updateLastModification($blog_id, $time);

    if ($result) {
      $result = $this->statements->getJson(1);
    } else {
      $result = $this->statements->getJson(0);
    }
    header('Content-Type: application/json');
    echo $result;
  }

  public function getUserBlogs($user){
    $blogs = $this->blog->getUserBlogs($user);
    header('Content-Type: application/json');
    echo json_encode(array('results' => $blogs));
  }

  public function getBlogDetails(){
    $blog = $this->input->post('name');
    header('Content-Type: application/json');
    $querry = $this->blog->getBlogDetails($blog);
    if (count($querry) == 0){
      echo $this->statements->getJson(0);
      return;
    }
    echo json_encode(array('results' => $this->blog->getBlogDetails($blog)[0]));
  }
  public function getBlogs($category = 0){
    header('Content-Type: application/json');
    echo json_encode(array('results' => $this->blog->getBlogs($category)));
  }
  public function removeBlog($blog_id){
    $token = $this->input->post('token');
    $user = $this->token->tokenIsValid($token);
    header('Content-Type: application/json');
    if ( $user == -1 ){
      echo $this->statements->getJson($user);
      return;
    }
    $res = $this->blog->checkIfUserHasBlogAndRemove($user, $blog_id);
    echo $this->statements->getJson($res);
  }
}

?>
