<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
class CommentsController extends CI_Controller {
  function __construct(){
    parent::__construct();
    $this->load->model('BlogDB/comments');
    $this->load->model('token');
    $this->load->model('BlogDB/statements');
  }

  public function addComment(){
    $token = $this->input->post('token');
    $article_id = $this->input->post('article_id');
    $comment = $this->input->post('comment');

    $user = $this->token->tokenIsValid($token);
    if (is_numeric($user)){
      if ($user == -1){
        echo $this->statements->getJson(-1);
        return;
      }
    }

    $result = $this->comments->addComment($user, $article_id, $comment);
    header('Content-Type: application/json');
    echo $this->statements->getJson($result);
  }

}

?>
