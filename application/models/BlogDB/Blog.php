<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blog extends CI_Model {
  public $user_id;
  public $blog_category_id;
  public $name;
  public $last_modification;

  public function getFormat(){
    return '%Y-%m-%d %h:%i:%s';
  }

  public function addBlog($user_id, $blog_category_id, $name, $last_modification, $creation_date) {
    $this->user_id = $user_id;
    $this->blog_category_id = $blog_category_id;
    $this->name = $name;
    $this->last_modification = $last_modification;
    $this->creation_date = $creation_date;

    $this->db->insert('blog', $this);
  }

  public function deleteBlog($blog_id){
    $this->db->where('blog_id', $blog_id);
    $this->db->delete('blog');
  }

  public function updateLastModification($blog_id, $last_modification) {
    $this->db->set('last_modification', $last_modification);
    $this->db->where('blog_id', $blog_id);
    $this->db->update('blog');
  }

}

?>
