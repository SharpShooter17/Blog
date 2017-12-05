<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Articletags extends CI_Model {
  public function __construct(){
    parent::__construct();
    $this->load->model('BlogDB/tag');
  }

  public function getArticleTags($article){
    $this->db->select('article_tags.tag_id, tag.name as tag');
    $this->db->from('article_tags');
    $this->db->join('tag', 'article_tags.tag_id = tag.tag_id');
    $this->db->where('article_tags.article_id', $article);
    return $this->db->get()->result();
  }

  public function addTagsToArticle($article, $tags){
    foreach ($tags as $tag) {
      $tag_id = $this->tag->addTag($tag);
      $this->addArticleTag($article, $tag_id);
    }
  }

  private function addArticleTag($article_id, $tag_id){
    $sql = "INSERT INTO article_tags (tag_id, article_id) VALUES (".$this->db->escape($tag_id).", ".$this->db->escape($article_id).")";
    $this->db->query($sql);
  }
}

?>
