<?php

error_reporting(0);
header('Content-type: application/json; charset=uft-8');

include 'db.php';

$nombre = $_POST['nombre'];
$edad = $_POST['edad'];
$pais = $_POST['pais'];
$correo = $_POST['correo'];

// (empty($edad) || !ctype_digit($edad))
function validarDatos($nombre, $edad, $pais, $correo) {
    if ($nombre == '') {
        return false;
    } elseif ($edad == '' || is_int($edad)) {
        return false;
    } elseif ($pais == '') {
        return false;
    } elseif ($correo == '') {
        return false;
    }

    return true; // All validations passed
}

if (validarDatos($nombre, $edad, $pais, $correo)) {
    
    if ($conexion->connect_errno) {
        $respuesta = 'error';
    } else {
        $statement = $conexion->prepare("
            INSERT INTO empleados(nombre, edad, pais, correo) VALUES (?,?,?,?)
        ");
        $statement->bind_param("siss", $nombre, $edad, $pais, $correo);
        $statement->execute();

        if($conexion->affected_rows <= 0) {
            $respuesta = "error";
        }

        $respuesta = [];
    }

} else {
    $respuesta = "error";
}

echo json_encode($respuesta);

?>