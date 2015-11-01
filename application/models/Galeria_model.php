<?php
defined('BASEPATH') OR exit('No direct script access allowed');

	class Galeria_model extends CI_Model {
		public function __construct()
		{
			parent::__construct();
		}

		public function get($id = NULL)
		{
			if(! is_null($id))
			{
				$query = $this->db->select("*")->from("vst_productos")->where("id",$id)->get();
				if($query->num_rows() === 1)
				{
					return $query->row_array();
				}
				return NULL;
			}
			$query = $this->db->select("*")->from("productos")->get();
				if($query->num_rows() > 0)
				{
					return $query->result_array();
				}
				return NULL;
		}
	}

