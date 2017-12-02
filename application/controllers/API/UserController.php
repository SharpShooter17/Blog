<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
class UserController extends CI_Controller {
  public function __construct(){
    parent :: __construct();
    $this->load->model("BlogDB/user");
    $this->load->model("BlogDB/user");
    $this->load->model('BlogDB/statements');
    $this->load->model('token');
  }

  public function addUser() {
    $email = $this->input->post('email');
    $nick = $this->input->post('nick');
    $password = $this->input->post('password');
    $token = $this->input->post('token');

    $result = $this->user->addUser(1, $email, $nick, $password);
    header('Content-Type: application/json');
    echo $result = $this->statements->getJson($result);
  }

  public function auth(){
    $email = $this->input->post('email');
    $password = $this->input->post('password');
    $result = $this->user->auth($email, $password);

    $token = null;
    if ($result == 1){
      $id = $this->user->getUserId($email);
      $token = $this->token->generateToken($id);
    }

    header('Content-Type: application/json');
    $result = array('response' => $this->statements->get($result));

    if ( $token != null ) {
      $result['token'] = $token;
    }
      echo json_encode($result);
  }

  public function updateRole($user_id, $role_id){
    $token = $this->input->post('token');
    $administrator_id = $this->token->tokenIsValid($token);

    header('Content-Type: application/json');
    if ($administrator_id == -1) {
      echo $this->statements->getJson($result);
      return;
    }
    $result = null;
    if ( $this->user->getUserRole($administrator_id) == 3){
      $result = $this->user->updateRole($user_id, $role_id);
    } else {
      $result = 0;
    }

    echo $this->statements->getJson($result);
  }

  public function getUsers(){
    $users = $this->user->getUsers();
    header('Content-Type: application/json');
    echo json_encode($users);
  }

  public function getUserDetails($nick){
    header('Content-Type: application/json');
    $result = $this->user->getUserDetails($nick);
    if (count($result) == 1){
      $result = $result[0];
    } else {
      $result = $this->statements->get(0);
    }
    echo json_encode( array('results' => $result ));
    return;
  }
}

?>
