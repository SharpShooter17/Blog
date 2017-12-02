<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Article extends CI_Model
{
  public $blog_id;
  public $date;
  public $category_id;
  public $title;
  public $content;

  public function getFormat(){
    return '%Y-%m-%d %h:%i:%s';
  }

  public function addArticle($blog_id, $date, $category_id, $title, $content){
    $this->blog_id = $blog_id;
    $this->date = $date;
    $this->category_id = $category_id;
    $this->title = $title;
    $this->content = $content;

    return $this->db->insert('article', $this) ? 1 : 0;
  }

  public function getArticles($blog_id) {
    $this->db->select('date, category_id, title');
    $this->db->from('article');
    $this->db->where('blog_id', $blog_id);
    return $this->db->get()->result();
  }

  public function getContent($article_id){
    $this->db->select('content');
    $this->db->from('article');
    $this->db->where('article_id', $article_id);
    return $this->db->get()->result();
  }

  public function getLastArticles($count, $page){
    $this->db->select('date, title, content, blog.name as blog, category.name as kategoria');
    $this->db->from('article');
    $this->db->join('category', 'category.category_id = article.article_id');
    $this->db->join('blog', 'blog.blog_id = category.blog_id');

    $querry = $this->db->get()->result();
    return $querry;
  }

}

?>
