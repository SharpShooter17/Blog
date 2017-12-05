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
    $this->load->model('BlogDB/articletags');
  }

  public function getCountOfArticles(){
    header('Content-Type: application/json');
    echo json_encode(array('results' => $this->article->getCountOfArticles() ));
  }

  public function addArticle(){
    $user = $_POST['token'];
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
    $tags = json_decode($this->input->post('tags'));

    if (!$this->blog->userHasBlog($user, $blog_id)){
      header('Content-Type: application/json');
      echo $this->statements->getJson(7);
      return;
    }

    $format = $this->article->getFormat();
    $time = mdate($format, time());
    $result = $this->article->addArticle($blog_id, $time, $category_id, $title, $content);
    if ($result != 0){
      $this->articletags->addTagsToArticle($result, $tags);
      $result = 1;
    }
    header('Content-Type: application/json');
    echo $this->statements->getJson($result);
  }

  public function getArticles($blog_id){
    header('Content-Type: application/json');
    $querry = $this->article->getArticles($blog_id);
    echo json_encode(array('results' => $querry));
  }

  public function getContent($article_id){
    header('Content-Type: application/json');
    echo json_encode($this->article->getContent($article_id));
  }

  public function getLastArticles($count = 20, $page = 0, $wordsLimit = null){
      header('Content-Type: application/json');
      $result = $this->article->getLastArticles($count, $page - 1);
      //var_dump($result);die();
      if ($wordsLimit != null && is_numeric($wordsLimit)){
        for ( $i = 0; $i < count($result); $i++ ){
          $dots = '';
          if ( strlen($result[$i]->content) > $wordsLimit ){
            $dots = '...';
          }
          $result[$i]->content = substr($result[$i]->content, 0, $wordsLimit) . $dots;
        }
      }
      header('Content-Type: application/json');
      echo json_encode($result);
  }

  public function getArticle($id){
    $article = $this->article->getArticle($id);
    if (count($article) == 0){
      echo $this->statements->getJson(0);
      return;
    }
    header('Content-Type: application/json');
    echo json_encode( array('article' => $article[0] ), JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE );
  }
  public function getArticleContent($id){
    header('Content-Type: text/html; charset=utf-8');
    echo $this->article->getArticleContent($id);
  }
}

?>
