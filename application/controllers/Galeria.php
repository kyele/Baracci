<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";

	class Galeria extends REST_Controller
	{
		public function __construct() {
				parent::__construct();
				$this->load->model( 'Galeria_model' );
		}

		public function index_get() {

			$galeria = $this->Galeria_model->get( );

			if( ! is_null( $galeria ) )	{
				$this->response( array( "response"=>$galeria ) , 200 );
			} else {
				$this->response( array( "response"=>"no hay  productos" ) , 400);
			}
		}

		public function index_post() {
			//$array = array( 1 , 2 , 3 , 4 );
			if ( ! $this->post( "producto" ) ) {
				$this->response( NULL , 404 );
			} else {

			}
			$id_producto = $this->Galeria_model->save_producto( $this->post( "producto" ) );
			if ( ! is_null( $id_producto ) ) {
				//$this->Galeria_model->save_categoria_producto(  $array , $id_producto );
				$this->response( array( "response"=>$id_producto ) , 200) ;
			} else {
				$this->response( array( "error"=>"Ha ocurrido un error" ) , 400 );
			}
		}
	}

?>