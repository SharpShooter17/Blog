<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
class ArticleController extends CI_Controller {
  public function __construct() {
    parent::__construct();
    $this->load->model('BlogDB/article');
    $this->load->model('BlogDB/statements');
    $this->load->model('token');
    $this->load->model('BlogDB/blog');
    $this->load->helper('date');
  }

  public function addArticle(){
    $user = $this->input->post('token');
    $user = $this->token->tokenIsValid($user);

    if (is_numeric($user)){
      if ($user == -1){
        echo $this->statements->getJson(-1);
        return;
      }
    }

    $blog_id = $this->input->post('blog_id');
    $category_id = $this->input->post('category_id');
    $title =  $this->input->post('title');
    $content =  $this->input->post('content');

    if (!$this->blog->userHasBlog($user, $blog_id)){
      echo $this->statements->getJson(7);
      return;
    }

    $format = $this->article->getFormat();
    $time = mdate($format, time());
    $result = $this->article->addArticle($blog_id, $time, $category_id, $title, $content);
    header('Content-Type: application/json');
    echo $this->statements->getJson($result);
  }

  public function getArticles($blog_id){
    header('Content-Type: application/json');
    echo json_encode($this->article->getArticles($blog_id));
  }

  public function getContent($article_id){
    header('Content-Type: application/json');
    echo json_encode($this->article->getContent($article_id));
  }

  public function getLastArticles($count, $page){

      header('Content-Type: application/json');
      echo json_encode($this->article->getLastArticles($count, $page));
  }
}

?>
