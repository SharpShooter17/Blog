<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Statements extends CI_Model {
  private $statements = array(
    0 => 'false',
    1 => 'true',
    2 => 'Blog name exists',
    3 => 'Email exists in database',
    4 => 'Nick exists in database',
    5 => 'Email does not exists in database',
    6 => 'Wrong password'
  );

  public function getJson($index) {
    if (!is_array($this->statements)) {
      echo 'var statements is not array!';
      die();
    }
    return json_encode($this->statements[$index]);
  }
}
?>
