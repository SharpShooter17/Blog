<?php

class Tag extends CI_Model {
  public $name;

  public function addTag($name){
    $this->name = $name;
    $this->db->insert('tag', $this);
  }
}

?>
