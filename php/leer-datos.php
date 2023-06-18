<?php

error_reporting(0);
header('Content-type: application/json; charset=uft-8');
include 'db.php';
// $conexion = new mysqli('192.168.1.71','samsung','','phpajax');

if ($conexion->connect_errno) {
    // $respuesta = [
	// 	'error' => true
	// ];
    $respuesta = 'error';
} else {
    // $conexion->set_charset("utf8");
    $statement = $conexion->prepare("SELECT * FROM empleados");
    $statement->execute();
    $resultados = $statement->get_result();

    // var_dump($resultado->fetch_assoc());

    $respuesta = [];

    while($fila = $resultados->fetch_assoc()) {
        $usuario = [
            'id'        => $fila['id'],
            'nombre'    => $fila['nombre'],
            'edad'      => $fila['edad'],
            'pais'      => $fila['pais'],
            'correo'    => $fila['correo'],
        ];
        array_push($respuesta, $usuario);
    }
}

echo json_encode($respuesta);
