<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
class RoleController extends CI_Controller {
  public function __construct(){
    parent :: __construct();
    $this->load->model("BlogDB/role");
    $this->load->model('BlogDB/statements');
  }
  public function addRole($id, $name){
    $result = $this->role->insert($id, $name);
    header('Content-Type: application/json');
    echo $this->statements->getJson($result);
  }

  public function getRole($id){
    header('Content-Type: application/json');
    echo json_encode(array( 'role' => $this->role->get($id)));
  }
}

?>
