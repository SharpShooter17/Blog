<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blog_category extends CI_Model {

  public function getCategories(){
    $this->db->select('*');
    $this->db->from('blog_category');
    $this->db->order_by('name', 'ASC');
    return $this->db->get()->result();
  }

}
?>
