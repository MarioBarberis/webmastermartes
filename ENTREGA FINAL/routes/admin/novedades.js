var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

/* Para listar novedades */
router.get('/', async function (req, res, next) {

  var novedades = await novedadesModel.getNovedades();

  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades
  });
});
/* Fin listar */


/* Para eliminar novedades */
router.get('/eliminar/:id', async (req, res, next) => {

  var id = req.params.id;

  await novedadesModel.deleteNovedadesById(id);
  res.redirect('/admin/novedades');
});
/* Fin eliminar */


/* Vista para agregar novedades */
router.get('/agregar', (req, res, next) => {

  res.render('admin/agregar', {
    layout: 'admin/layout'
  })
});

/* Insertar las novedades en la vista */
router.post('/agregar', async (req, res, next) => {
  try {
    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades')           //confirma campos llenos, que no este vacio ninguno
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos.'  //sino avisa que hay que llenarlos
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargo la novedad.'
    });
  }
});

//Para listar la modificacion de una novedad

router.get('/modificar/:id', async (req, res, next) => {
   /* console.log(req.params.id); */
  var id = req.params.id;
  var novedad = await novedadesModel.getNovedadById(id);

  res.render('admin/modificar',{
    layout: 'admin/layout',
    novedad
  });
});


//modificar una novedad

router.post('/modificar', async (req, res, next) => {
  try {
  
    /* console.log(obj) */

   var obj = {
    titulo: req.body.titulo,
    subtitulo: req.body.subtitulo,
    cuerpo: req.body.cuerpo
   }
   
   await novedadesModel.modificarNovedadById(obj, req.body.id);
   res.redirect('/admin/novedades');

  } catch (error) {
    console.log(error)
    res.render('admin/modificar',{
      layout: 'admin/layout',
      error: true,
      message: 'No se modifico la novedad.'
    })
  }
});


module.exports = router;
