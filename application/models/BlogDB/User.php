<?php

class User extends CI_Model {
  public $role_id;
  public $email;
  public $nick;
  public $password;

  public function addUser($role_id, $email, $nick, $password){
    if ( $this->exists($email, 'email') ){
        return json_encode(array('result' => 'Email exists in database' ));
    } else if ($this->exists($nick, 'nick')){
      return json_encode(array('result' => 'Nick exists in database' ));
    }

    $this->role_id = $role_id;
    $this->email = $email;
    $this->nick = $nick;
    $this->password = $this->passwordHash($password);
    $this->db->insert('user', $this);

    return json_encode(array('result' => 'true' ));
  }

  private function exists($var, $collumn){
    $this->db->select($collumn);
    $this->db->from("user");
    $this->db->where($collumn, $var);
    $querry = $this->db->get()->result();

    if (count($querry) != 0 ) {
      return true;
    }
    return false;
  }

  private function getPassword($email){
    $this->db->select('password');
    $this->db->from('users');
    $querry = $this->db->where('email', $email)->result();
    return $querry;
  }

  public function auth($email, $encryptedPassword){
    $hash = $this->getPassword($email);
    $checkPassword = passwordVerify($encryptedPassword, $hash);
    $result = array("result" =>  $checkPassword ? "true" : "false");
    return json_encode($result);
  }

  private function passwordHash($password){
    return password_hash($password, PASSWORD_DEFAULT);
  }

  private function passwordVerify($password, $hash){
    return password_hash($password, $hash);
  }

}

?>
