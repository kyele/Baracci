<?php
    require_once 'Conexion.php';
    require_once 'Login.php';
    
    if (file_get_contents("php://input")) {
        $objDatos = json_decode(file_get_contents("php://input"));

        $mensaje = 'null';
        if ( isset( $_POST['login'] ) ) {
            $model              = new Login;
            $model->email       = htmlspecialchars( $objDatos->correo );
            $model->password    = htmlspecialchars( $objDatos->password );
            $model->login();
            $mensaje            = $model->mensaje;
        }
        
        $jsondata = array();

        $jsondata['data']['correo']     = $objDatos->correo;
        $jsondata['data']['password']   = $objDatos->password;
        $jsondata['message']            = $mensaje;
        //$jsondata['data']['calle']      = $objDatos->direccion->calle;*/

        header('Content-type: application/json; charset=utf-8');
        echo json_encode($jsondata, JSON_FORCE_OBJECT);
        /*if ($_POST) {
            //die();
            //$objDatos = json_decode(file_get_contents("php://input"));
            $jsondata = array();

            $correo = $_POST["datos_form"];
            //$pass = $_POST['password'];
            //$jsondata['data']       = 100;
            $jsondata['status']      = 3;
            $jsondata['data']        = $correo;
            $jsondata['message']     = "login fallido";    
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($jsondata, JSON_FORCE_OBJECT);
            //echo $jsondata;*/
    } else {
        echo "No recibí datos por POST";
    }

?>