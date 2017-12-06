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

  public function removeCategory($user_id, $category_id){
    $res = $this->userHasCategory($user_id, $category_id);
    if ($res == true){
      $this->removeArticlesByCategoryId($category_id);
      return $this->db->where('category.category_id', $category_id)->delete('category') ? 1 : 0;
    } else {
      return 7;
    }
  }

  private function removeArticlesByCategoryId($category_id){
    $query = $this->db->select('article.article_id')->from('article')->where('article.category_id', $category_id)->get()->result();
    foreach ($query as $row) {
      $this->db->where('comments.article_id', $row->article_id)->delete('comments');
      $this->db->where('article_tags.article_id', $row->article_id)->delete('article_tags');
      $this->db->where('article.article_id', $row->article_id)->delete('article');
    }
  }

  private function userHasCategory($user_id, $category_id){
    $query = $this->db->select('count(category.category_id) as category')->
                        from('category')->
                        join('blog', 'blog.blog_id = category.blog_id')->
                        join('user', 'user.user_id = blog.user_id')->
                        where('user.user_id', $user_id)->
                        where('category.category_id', $category_id)->
                        get()->
                        result();
    if ($query[0]->category == 1){
      return true;
    } else {
      return false;
    }
  }

}

?>
