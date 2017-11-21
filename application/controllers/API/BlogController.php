<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BlogController extends CI_Controller {
  public function __construct(){
    parent :: __construct();
    $this->load->model('BlogDB/blog');
    $this->load->helper('date');
  }

  public function addBlog($user_id, $blog_category_id, $name){
    $format = $this->blog->getFormat();
    $time = mdate($format, time());
    $this->blog->addBlog($user_id, $blog_category_id, $name, null, $time);
  }

  public function deleteBlog($blog_id) {
    $this->blog->deleteBlog($blog_id);
  }

}

?>
