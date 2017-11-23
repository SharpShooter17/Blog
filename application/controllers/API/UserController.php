<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UserController extends CI_Controller {
  public function __construct(){
    parent :: __construct();
    $this->load->model("BlogDB/user");
    $this->load->model('BlogDB/statements');
  }

  public function addUser() {
    $email = $this->input->post('email');
    $nick = $this->input->post('nick');
    $password = $this->input->post('password');

    $result = $this->user->addUser(1, $email, $nick, $password);
    header('Content-Type: application/json');
    echo $result = $this->statements->getJson($result);
  }

  public function auth($email, $password){
    $result = $this->user->auth($email, $password);
    header('Content-Type: application/json');
    echo $result = $this->statements->getJson($result);;
  }

  public function updateRole($user_id, $role_id){
    $result = $this->user->updateRole($user_id, $role_id);
    header('Content-Type: application/json');
    echo $result = $this->statements->getJson($result);;
  }

  public function getUsers(){
    $users = $this->user->getUsers();
    header('Content-Type: application/json');
    echo json_encode($users);
  }
}

?>
