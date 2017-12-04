<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class User extends CI_Model {
  public $role_id;
  public $email;
  public $nick;
  public $password;

  public function addUser($role_id, $email, $nick, $password){
    if ( $this->exists($email, 'email') ){
        return 3;
    } else if ($this->exists($nick, 'nick')){
      return 4;
    }

    $this->role_id = $role_id;
    $this->email = $email;
    $this->nick = $nick;
    $this->password = $this->passwordHash($password);

    return $this->db->insert('user', $this) ? 1 : 0;
  }

  public function getUsers(){
    $this->db->select('user_id, nick, email, role.name as role');
    $this->db->from('user');
    $this->db->join('role', 'user.role_id = role.role_id');
    $this->db->order_by('nick', 'ASC');
    return $this->db->get()->result();
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
    $this->db->from('user');
    $this->db->where('email', $email);
    $querry = $this->db->get();
    return $querry->row()->password;
  }

  public function updateRole($user_id, $role_id){
    $this->db->set('role_id', $role_id);
    $this->db->where('user_id', $user_id);
    return $this->db->update('user') == 1 ? 1 : 0;
  }

  public function auth($email, $encryptedPassword){
    if ( !$this->exists($email, 'email') ){
        return 5;
    }

    $hash = $this->getPassword($email);
    $checkPassword = $this->passwordVerify($encryptedPassword, $hash);

    return $checkPassword ? 1 : 6;
  }

  private function passwordHash($password){
    return password_hash($password, PASSWORD_DEFAULT);
  }

  private function passwordVerify($password, $hash){
    return password_verify($password, $hash);
  }

  public function getUserId($email){
    $this->db->select('user_id');
    $this->db->from('user');
    $this->db->where('email', $email);
    $querry = $this->db->get()->result()[0];
    return $querry->user_id;
  }

  public function getUserRole($user_id){
    $this->db->select('role');
    $this->db->from('user');
    $this->db->where('user_id', $user_id);
    $querry = $this->db->get()->result()[0];
    return $querry;
  }

  public function getUserDetails($nick){
    $this->db->select('role.name, user.email, user.nick, user.user_id');
    $this->db->from('user');
    $this->db->join('role', 'role.role_id = user.role_id');
    $this->db->where('user.nick', $nick);
    $querry = $this->db->get()->result();
    return $querry;
  }
}

?>
