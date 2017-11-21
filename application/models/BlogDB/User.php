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

  public function getUsers(){
    return json_encode( $this->db->get('user')->result() );
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
    return json_encode( array( "result" => ($this->db->update('user') == 1 ? 'true' : 'false') ) );
  }

  public function auth($email, $encryptedPassword){
    if ( !$this->exists($email, 'email') ){
        return json_encode(array('result' => 'Email does not exists in database' ));
    }

    $hash = $this->getPassword($email);
    $checkPassword = $this->passwordVerify($encryptedPassword, $hash);

    $result = array("result" =>  $checkPassword ? "true" : "Wrong password");
    return json_encode($result);
  }

  private function passwordHash($password){
    return password_hash($password, PASSWORD_DEFAULT);
  }

  private function passwordVerify($password, $hash){
    return password_verify($password, $hash);
  }

}

?>
