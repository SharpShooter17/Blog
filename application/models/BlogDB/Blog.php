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
    if ( $this->exists($name, 'name') ) {
      return 2;
    }

    $this->user_id = $user_id;
    $this->blog_category_id = $blog_category_id;
    $this->name = $name;
    $this->last_modification = $last_modification;
    $this->creation_date = $creation_date;

    return $this->db->insert('blog', $this) ? 1 : 0;
  }

  public function deleteBlog($blog_id){
    $this->db->where('blog_id', $blog_id);
    $result = $this->db->delete('blog') != false;
  }

  public function updateLastModification($blog_id, $last_modification) {
    $this->db->set('last_modification', $last_modification);
    $this->db->where('blog_id', $blog_id);
    return $this->db->update('blog');
  }

  private function exists($var, $collumn){
    $this->db->select($collumn);
    $this->db->from("blog");
    $this->db->where($collumn, $var);
    $querry = $this->db->get()->result();

    if (count($querry) != 0 ) {
      return true;
    }
    return false;
  }

}

?>
