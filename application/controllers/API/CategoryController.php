<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CategoryController extends CI_Controller {
  public function __construct(){
    parent::__construct();
    $this->load->model('BlogDB/category');
    $this->load->model('BlogDB/statements');
  }

  public function getBlogCategories($blog_id) {
    $result = $this->category->getBlogCategories($blog_id);
    header('Content-Type: application/json');
    echo json_encode($result);
  }

  public function addCategory($blog_id, $name) {
    $result = $this->category->addCategory($blog_id, $name);
    header('Content-Type: application/json');
    echo $this->statements->getJson($result);
  }
}
?>
