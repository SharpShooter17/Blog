<?php
class ArticleTagsController extends CI_Controller {
  public function __construc(){
    parent::__construc();
    $this->load->model('BlogDB/tag');
    $this->load->model('BlogDB/articletags');
    $this->load->model('token');
  }

  public function addTagsToArticle(){
    $token = $this->input->post('token');
    $article = $this->input->post('article');
  
  }

}
?>
