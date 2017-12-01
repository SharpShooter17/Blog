<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blog_category extends CI_Model {

  public function getCategories(){
    //$this->db->orderby('name', 'DESC');
    return $this->db->get('blog_category')->result();
  }

}
?>
