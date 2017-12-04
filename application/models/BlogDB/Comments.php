<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Comments extends CI_Model
{
  public $user_id;
  public $article_id;
  public $date;
  public $comment;

  public function getFormat(){
    return '%Y-%m-%d %h:%i:%s';
  }

  public function addComment($user_id, $article_id, $comment){
    $this->load->helper('date');
    $this->user_id = $user_id;
    $this->article_id = $article_id.
    $this->comment = $comment;
    $this->date = mdate($this->getFormat(), time());
    return $this->db->insert('comments', $this) ? 1 : 0;
  }

  public function getComments($article){
    $this->db->select('user.nick, comment, date');
    $this->db->from('comments');
    $this->db->join('user', 'user.user_id = comments.user_id');
    $this->db->where('article_id', $article);
    return $this->db->get()->result();
  }
}

?>
