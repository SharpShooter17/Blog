<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Article extends CI_Model
{
  public $blog_id;
  public $date;
  public $category_id;
  public $content;

  public function getFormat(){
    return '%Y-%m-%d %h:%i:%s';
  }

  public function addArticle($blog_id, $date, $category_id, $content){
    $this->blog_id = $blog_id;
    $this->date = $date;
    $this->category_id = $category_id;
    $this->content = $content;

    return $this->db->insert('article', $this) ? 1 : 0;
  }

}

?>
