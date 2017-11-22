<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ArticleController extends CI_Controller {
  public function __construct() {
    parent::__construct();
    $this->load->model('BlogDB/article');
    $this->load->model('BlogDB/statements');
    $this->load->helper('date');
  }

  public function addArticle($blog_id, $category_id, $title, $content){
    $format = $this->article->getFormat();
    $time = mdate($format, time());
    $result = $this->article->addArticle($blog_id, $time, $category_id, $title, $content);
    echo $this->statements->getJson($result);
  }

  public function getArticles($blog_id){
    echo json_encode($this->article->getArticles($blog_id));
  }

  public function getContent($article_id){
    echo json_encode($this->article->getContent($article_id));
  }

}

?>
