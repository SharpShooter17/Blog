<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BlogCategoryController extends CI_Controller
{

  public function __construct() {
    parent::__construct();
    $this->load->model('BlogDB/blog_category');
  }

  public function getCategories() {
    $result = $this->blog_category->getCategories();
    echo json_encode($result);
  }

}


?>
