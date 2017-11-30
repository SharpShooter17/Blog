<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TokenController extends CI_Controller {
  public function __construct(){
    parent :: __construct();
    $this->load->model("jwt");
    $this->load->model('BlogDB/statements');
  }

  public function generateToken($user_id){
      $this->load->library("JWT");
      $CONSUMER_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
      $CONSUMER_SECRET = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
      $CONSUMER_TTL = 86400;
      echo $this->jwt->encode(array(
        'consumerKey'=>$CONSUMER_KEY,
        'userId'=>$user_id,
        'issuedAt'=>date(DATE_ISO8601, strtotime("now")),
        'ttl'=>$CONSUMER_TTL
      ), $CONSUMER_SECRET);
  }
?>
