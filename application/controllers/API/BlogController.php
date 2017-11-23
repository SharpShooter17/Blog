<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BlogController extends CI_Controller {
  public function __construct(){
    parent :: __construct();
    $this->load->model('BlogDB/blog');
    $this->load->model('BlogDB/statements');
    $this->load->helper('date');
  }

  public function addBlog($user_id, $blog_category_id, $name){
    $format = $this->blog->getFormat();
    $time = mdate($format, time());
    $result = $this->blog->addBlog($user_id, $blog_category_id, $name, null, $time);
    header('Content-Type: application/json');
    echo $result = $this->statements->getJson($result);;
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

}

?>
