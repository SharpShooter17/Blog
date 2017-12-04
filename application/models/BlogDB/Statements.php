<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Statements extends CI_Model {
  private $statements = array(
    -1 => 'Token is not valid',
    0 => 'false',
    1 => 'true',
    2 => 'Blog name exists',
    3 => 'Email exists in database',
    4 => 'Nick exists in database',
    5 => 'Email does not exists in database',
    6 => 'Wrong password',
    7 => 'Unauthorized action',
    8 => 'Category exists',
    9 => 'Too many characters',
    10 => 'Comment is too short'
  );

  public function getJson($index) {
    if (!is_array($this->statements)) {
      die('var statements is not array');
    } else if ($index < 0 || $index > count($this->statements)) {
      die('index is out of range');
    }

    return json_encode(array('response' => $this->statements[$index]));
  }
  public function get($index){
    if (!is_array($this->statements)) {
      die('var statements is not array');
    } else if ($index < 0 || $index > count($this->statements)) {
      die('index is out of range');
    }
    return $this->statements[$index];
  }
}
?>
