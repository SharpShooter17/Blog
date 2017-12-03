<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Category extends CI_Model {
  public $blog_id;
  public $name;

  public function getBlogCategories($blog_id){
    $this->db->select('category_id, name');
    $this->db->from('category');
    $this->db->where('blog_id', $blog_id);
    return $this->db->get()->result();
  }

  public function addCategory($blog_id, $name) {
    $name = trim($name);
    $this->blog_id = $blog_id;
    $this->name = $name;

    if ( $this->checkIfCategoryInBlogExist($blog_id, $name) ){
      return 8;
    }

    return $this->db->insert('category', $this) ? 1 : 0;
  }

  private function checkIfCategoryInBlogExist($blog_id, $name){
    $this->db->select('*');
    $this->db->from('category');
    $this->db->where('blog_id', $blog_id);
    $this->db->where('name', $name);
    $querry = $this->db->get()->result();
    if (count($querry) > 0 ){
      return true;
    }
    return false;
  }
}

?>
