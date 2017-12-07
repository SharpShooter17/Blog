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
    $this->db->select('blog.*, blog_category.name as category');
    $this->db->from('blog');
    $this->db->join('blog_category', 'blog_category.blog_category_id = blog.blog_category_id');
    $this->db->where('blog.user_id', $user_id);
    $this->db->order_by('blog.creation_date', 'DESC');
    return $this->db->get()->result();
  }

  public function addBlog($user_id, $blog_category_id, $name, $last_modification, $creation_date) {
    if ( $this->exists($name, 'name') ) {
      return 2;
    }

    $this->user_id = $user_id;
    $this->blog_category_id = $blog_category_id;
    $this->name = str_replace(' ', '_', $name);
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
    $this->db->join('user', 'user.user_id = blog.user_id');
    $this->db->join('blog_category', 'blog_category.blog_category_id = blog.blog_category_id');
    $this->db->where('blog.name', $blog);
    $querry = $this->db->get()->result();
    return $querry;
  }

  public function getBlogs($category){
    $this->db->select('user.nick as author, blog.name, blog.creation_date, blog_category.name as category, blog.blog_id');
    $this->db->from('blog');
    $this->db->join('user', 'user.user_id = blog.user_id');
    $this->db->join('blog_category', 'blog_category.blog_category_id = blog.blog_category_id');
    if ($category > 0){
      $this->db->where('blog.blog_category_id', $category);
    }
    $this->db->order_by('blog.name', 'ASC');
    $querry = $this->db->get()->result();
    return $querry;
  }

  public function checkIfUserHasBlogAndRemove($user_id, $blog_id){
    $hasBlog = $this->userHasBlog($user_id, $blog_id);
    if ($hasBlog == true){
      return $this->removeBlog($blog_id);
    } else {
      return 7;
    }
  }

  public function removeBlog($blog_id){
    $this->removeCategoriesByBlogId($blog_id);
    return $this->db->where('blog.blog_id', $blog_id)->delete('blog') ? 1 : 0;
  }
  private function removeCategoriesByBlogId($blog_id){
    $this->load->model('BlogDB/category');
    $query = $this->db->select('category.category_id')->from('category')->where('category.blog_id', $blog_id)->get()->result();
    foreach ($query as $row) {
      $this->category->removeCategory($row->category_id);
    }
  }
}

?>
