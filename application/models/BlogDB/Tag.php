<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tag extends CI_Model {
  public $name;

  public function getTags(){
    return $this->db->get('tag')->result();
  }

  public function addTag($name){
    $this->name = $name;
    $this->db->insert('tag', $this);
  }
}

?>
