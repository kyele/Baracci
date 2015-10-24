<?php
    class Login {

        public $email;
        public $password;
        public $mensaje;

        public function login() {
            $model      = new Conexion;
            $conexion   = $model->conectar();
            $sql        = 'SELECT * FROM usuarios WHERE ';
            $sql       .= 'email=:email AND password=:password';

            $consulta   = $conexion->prepare($sql);
            $consulta->bindParam(':email',      $this->email, PDO::PARAM_STR);
            $consulta->bindParam(':password',   $this->password, PDO::PARAM_STR);
            $consulta->execute();
            $total      = $consulta->rowCount();

            if($total == 0) {
                $this->mensaje  = 'Error al iniciar session';
            } else {
                $fila = $consulta->fetch();
                session_start();
                $_SESSION['login']      = true;
                $_SESSION['usuario']    = $fila['id_usuario'];
                $_SESSION['nombre']    = $fila['nombre'];
                header('location: views/inicio.php');
            }
        }
    }
?>