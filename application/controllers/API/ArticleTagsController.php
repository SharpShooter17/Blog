<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');

class ArticleTagsController extends CI_Controller {
  public function __construct(){
    parent::__construct();
    $this->load->model('token');
    $this->load->model('BlogDB/articletags');
    $this->load->model('BlogDB/tag');
  }

  public function getTags(){
    echo json_encode( array('results' => $this->tag->getTags()) );
  }

  public function addTagsToArticle(){
    $token = $this->input->post('token');
    $article = $this->input->post('article');
  }
}
?>
