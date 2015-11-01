<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";

	class Galeria extends REST_Controller
	{
		public function __construct()
		{
				parent::__construct();
				$this->load->model('Galeria_model');
		}
		public function index_get()
		{
			$galeria = $this->Galeria_model->get();
			if(! is_null($galeria))
			{
				$this->response(array("response"=>$galeria),200);
			}
			else{
				$this->response(array("response"=>"no hay  productos"),400);
			}
		}
	}
?>