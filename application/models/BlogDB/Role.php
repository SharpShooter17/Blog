<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Role extends CI_Model {
  public $role_id;
  public $name;

  public function get($id){
    $querry = $this->db->get('role')->result()[$id - 1];
    return $querry;
  }

  public function insert($id, $name){
    $this->role_id = $id;
    $this->name = $name;
    $result = $this->db->insert('role', $this);
    return $result ? 1 : 0;
  }
}
?>
