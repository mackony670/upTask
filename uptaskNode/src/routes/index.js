const express = require('express');
const router = express.Router();
// importar el controlador de la vista
const proyectoController = require('../controller/proyectosController')
const validator = require('express-validator')
module.exports = function() {
   //vistas para el home
    router.get(
        '/',
        proyectoController.Home 
    );
    
    router.get(
        '/nuevo-proyecto', 
        proyectoController.formulario_proyecto
    );
    
    router.post(
        '/nuevo-proyecto', 
        validator.body('nombre').not().isEmpty().trim().escape(),
        proyectoController.nuevoProyecto
    );

    //listar proyectos
    router.get(
        '/proyectos/:url', 
        proyectoController.proyectoUrl
    );
    
    //Actualizaar el proyecto
    router.get(
        '/proyecto/editar/:id',
        proyectoController.formularioEditar


    )
    router.post(
        '/nuevo-proyecto/:id', 
        validator.body('nombre').not().isEmpty().trim().escape(),
        proyectoController.actualizarProyecto
    );
    //eliminar el proyecto
    router.delete(
        '/proyectos/:url',
        proyectoController.proyectoEliminar


    )

    return router;
}