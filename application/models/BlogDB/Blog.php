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

  public function getUserBlogs($user_id){
    $this->db->where('user_id', $user_id);
    return $this->db->get('blog')->result();
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

  public function userHasBlog($user_id, $blog_id){
    $this->db->select('blog_id');
    $this->db->from('blog');
    $this->db->where('user_id', $user_id);
    $results = $this->db->get()->result();
    if (count($results) != 0 ) {
      return true;
    }
    return false;
  }

  public function getBlogDetails($blog){
    $this->db->select('user.nick, blog.name, blog.last_modification, blog.creation_date, blog.blog_id, blog_category.name as blogCategory, blog_category.blog_category_id');
    $this->db->from('blog');
    $this->db->join('category', 'category.blog_id = blog.blog_id');
    $this->db->join('user', 'user.user_id = blog.user_id');
    $this->db->join('blog_category', 'blog_category.blog_category_id = blog.blog_category_id');
    $this->db->where('blog.name', $blog);
    $querry = $this->db->get()->result();
    return $querry;
  }
}

?>
