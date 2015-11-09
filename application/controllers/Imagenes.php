<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";

	class Imagenes extends REST_Controller
	{
		public function __construct() {
				parent::__construct();
				//$this->load->model( 'Galeria_model' );
		}

		public function index_post() {
			if ( !$_FILES && !$_POST ) {
				$this->response( NULL , 404 );
			} else {
				var_dump($_FILES);
				var_dump($_POST);
				$file = $_FILES["file"]["name"];
				/*if(!is_dir("files/"))
					mkdir("files/", 0777);*/
				if( move_uploaded_file($_FILES["file"]["tmp_name"], $_POST["destino"].$file) ) {
					$resultado = true;
				} else {
					$resultado = false;
				}

			}
			if ( $resultado ) {
				$this->response( array( "response"=>"Imagen guardada correctamente" ) , 200) ;
			} else {
				$this->response( array( "error"=>"Ha ocurrido un error" ) , 400 );
			}
		}
	}

?>