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
    header('Content-Type: text/html; charset=utf-8');
    echo json_encode( array('results' => $this->tag->getTags()) );
  }

  public function getArticleTags(){
    $tags = $this->articletags->getArticleTags($id);
    header('Content-Type: text/html; charset=utf-8');
    echo json_encode($tags);
  }

  public function addTagsToArticle(){
    $token = $this->input->post('token');
    $article = $this->input->post('article');
  }
}
?>
