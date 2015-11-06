<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";

	class Categorias extends REST_Controller
	{
		public function __construct() {
				parent::__construct();
				$this->load->model( 'Galeria_model' );
		}

		public function index_get() {

			$categorias = $this->Galeria_model->get_categorias( );

			if( ! is_null( $categorias ) )	{
				$this->response( array( "response"=>$categorias ) , 200 );
			} else {
				$this->response( array( "response"=>"no hay  categorias" ) , 400);
			}
		}

		public function index_post() {
			if ( ! $this->post( "categoria" ) ) {
				$this->response( NULL , 404 );
			}
			$id_categoria_producto = $this->Galeria_model->save_categoria( $this->post( "categoria" ) );
			if ( ! is_null( $id_categoria_producto ) ) {
				$this->response( array( "response"=>$id_categoria_producto ) , 200) ;
			} else {
				$this->response( array( "error"=>"Ha ocurrido un error" ) , 400 );
			}
		}
	}
?>