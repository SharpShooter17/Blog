<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class RoleController extends CI_Controller {
  public function __construct(){
    parent :: __construct();
    $this->load->model("BlogDB/role");
  }
  public function addRole($id, $name){
    echo $this->role->insert($id, $name);
  }

  public function getRole($id){
    echo $this->role->get($id);
  }
}

?>
