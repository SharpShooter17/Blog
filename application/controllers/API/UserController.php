<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
class UserController extends CI_Controller {
  public function __construct(){
    parent :: __construct();
    $this->load->model("BlogDB/user");
    $this->load->model("BlogDB/user");
    $this->load->model('BlogDB/statements');
    $this->load->library("jwt");
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

  private function generateToken($user_id){
      $CONSUMER_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
      $CONSUMER_SECRET = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
      $CONSUMER_TTL = 86400;
      return $this->jwt->encode(array(
        'consumerKey'=>$CONSUMER_KEY,
        'userId'=>$user_id,
        'issuedAt'=>date(DATE_ISO8601, strtotime("now")),
        'ttl'=>$CONSUMER_TTL
      ), $CONSUMER_SECRET);
  }

  public function auth(){
    $email = $this->input->post('email');
    $password = $this->input->post('password');
    $result = $this->user->auth($email, $password);

    $token = null;
    if ($result == 1){
      $id = $this->user->getUserId($email);
      $token = $this->generateToken($id);
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
    $administrator_id = $this->user->tokenIsValid($token);

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
}

?>
