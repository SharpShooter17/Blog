<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UserController extends CI_Controller {
  public function __construct(){
    parent :: __construct();
    $this->load->model("BlogDB/user");
  }

  public function addUser($email, $nick, $password) {
    echo $this->user->addUser(1, $email, $nick, $password);
  }
}

?>
