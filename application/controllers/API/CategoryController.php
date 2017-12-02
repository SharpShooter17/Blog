<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
class CategoryController extends CI_Controller {
  public function __construct(){
    parent::__construct();
    $this->load->model('BlogDB/blog');
    $this->load->model('BlogDB/category');
    $this->load->model('BlogDB/statements');
    $this->load->model('token');
  }

  public function getBlogCategories($blog_id) {
    $result = $this->category->getBlogCategories($blog_id);
    header('Content-Type: application/json');
    echo json_encode(array('results' => $result));
  }

  public function addCategory() {
    $user = $this->input->post('token');
    $user = $this->token->tokenIsValid($user);
    
    if (is_numeric($user)){
      if ($user == -1){
        echo $this->statements->getJson(-1);
        return;
      }
    }

    $blog_id = $this->input->post('blogId');
    $name = $this->input->post('category');

    if (!$this->blog->userHasBlog($user, $blog_id)){
      echo $this->statements->getJson(7);
      return;
    }

    $result = $this->category->addCategory($blog_id, $name);
    header('Content-Type: application/json');
    echo $this->statements->getJson($result);
  }
}
?>
