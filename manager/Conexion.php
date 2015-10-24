<?php
    class Conexion{
        public function conectar(){
            $usuario    = 'root';
            $password   = 'kraker312';
            $host       = 'localhost';
            $db         = 'ejercicios';

            return $conexion = new PDO("mysql:host=$host;dbname=$db", $usuario, $password);
        }
    }
?>