<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tag extends CI_Model {
  public $name;

  public function getTags(){
    return $this->db->get('tag')->result();
  }

  public function addTag($name){
    $this->name = $name;
    $exist = $this->getIfExists($name);
    if ($exist != false){
      return $exist;
    } else {
      $this->db->insert('tag', $this);
      return $this->db->insert_id('tag.tag_id');
    }
  }

  private function getIfExists($name){
    $this->db->select('*');
    $this->db->from("tag");
    $this->db->where('name', $name);
    $querry = $this->db->get()->result();

    if (count($querry) != 0 ) {
      return $querry[0]->tag_id;
    }

    return false;
  }
}

?>
