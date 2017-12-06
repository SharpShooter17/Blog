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

  public function getCountOfArticles(){
    return $this->db->count_all_results('article');
  }

  public function addArticle($blog_id, $date, $category_id, $title, $content){
    $this->blog_id = $blog_id;
    $this->date = $date;
    $this->category_id = $category_id;
    $this->title = $title;
    $this->content = htmlspecialchars($content, ENT_HTML5);

    return $this->db->insert('article', $this) ? $this->db->insert_id('article.article_id') : 0;
  }

  public function getArticles($blog_id) {
    $this->db->select('article.date, article.category_id, article.title, article.article_id, category.name as category');
    $this->db->from('article');
    $this->db->join('category', 'article.category_id = category.category_id');
    $this->db->where('article.blog_id', $blog_id);
    $this->db->order_by('article.date', 'ASC');
    $querry = $this->db->get()->result();
    return $querry;
  }

  public function getArticlesByCategoryId($category_id){
    return $this->db->select('article.date, article.title, article.article_id')->
                      from('article')->
                      where('article.category_id', $category_id)->
                      get()->
                      result();
  }

  public function getContent($article_id){
    $this->db->select('content');
    $this->db->from('article');
    $this->db->where('article_id', $article_id);
    return $this->db->get()->result();
  }

  public function getLastArticles($count, $page){
    $this->db->select('article_id, date, title, content, blog.blog_id, blog.name as blog, category.category_id, category.name as kategoria, user.nick, user.user_id, blog_category.name as blogCategory, blog_category.blog_category_id');
    $this->db->from('article');
    $this->db->join('category', 'category.category_id = article.category_id');
    $this->db->join('blog', 'blog.blog_id = category.blog_id');
    $this->db->join('blog_category', 'blog.blog_category_id = blog_category.blog_category_id');
    $this->db->join('user', 'user.user_id = blog.user_id');
    $this->db->order_by('article.date', 'DESC');
    $this->db->limit($count, $count*$page);
    $querry = $this->db->get()->result();
    foreach ($querry as $article) {
      $article->content = htmlspecialchars_decode($article->content);
    }
    return $querry;
  }

  public function getArticle($id){
    $this->db->select('article_id, title, date, category.name as category, blog.name as blog, user.nick');
    $this->db->from('article');
    $this->db->join('category', 'article.category_id = category.category_id');
    $this->db->join('blog', 'blog.blog_id = article.blog_id');
    $this->db->join('user', 'blog.user_id = user.user_id');
    $this->db->where('article_id', $id);
    $querry = $this->db->get()->result();
    return $querry;
  }

  public function getArticleContent($id){
    $this->db->select('content');
    $this->db->where('article_id', $id);
    return htmlspecialchars_decode($this->db->get('article')->result()[0]->content, ENT_HTML5);
  }

  public function removeArticle($article_id, $user_id){
    $hasArticle = $this->userHasArticle($user_id, $article_id);
    if ($hasArticle == true){
      return $this->db->where('article.article_id', $article_id)->
                        delete('article') ? 1 : 0;
    } else {
      return 7;
    }
  }

  private function userHasArticle($user_id, $article_id){
    $query = $this->db->select('count(article.article_id) as articles')->
      from('article')->
      join('blog', 'article.blog_id = blog.blog_id')->
      join('user', 'blog.user_id = user.user_id')->
      where('article.article_id', $article_id)->
      where('user.user_id', $user_id)->
      get()->result();
    if ($query[0]->articles == 1){
      return true;
    } else {
      return false;
    }
  }

}

?>
