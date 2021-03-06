<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Token extends CI_Model {
  public function __construct(){
    parent::__construct();
    $this->load->library("jwt");
  }
  public function tokenIsValid($token){
    try {
      $encrypted = $this->jwt->decode($token, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', false);

      $loggin_time = new DateTime($encrypted->issuedAt, new DateTimeZone('Europe/Warsaw') );
      $expiries = $loggin_time->add(new DateInterval('PT' . $encrypted->ttl . 'S'));
      $timeToExpire = time() - strtotime($expiries->getTimestamp());

      if ($timeToExpire <= 0){
        return -1;
      }
      return $encrypted->user_id;
    } catch (Exception $e) {
      echo 'Caught exception: ',  $e->getMessage(), "\n";
      return -1;
    }
  }

  public function generateToken($user_id){
      $CONSUMER_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
      $CONSUMER_SECRET = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
      $CONSUMER_TTL = 86400;
      return $this->jwt->encode(array(
        'consumerKey'=>$CONSUMER_KEY,
        'user_id'=>$user_id,
        'issuedAt'=>date(DATE_ISO8601, strtotime("now")),
        'ttl'=>$CONSUMER_TTL
      ), $CONSUMER_SECRET);
  }
}
?>
