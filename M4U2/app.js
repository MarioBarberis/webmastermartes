var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var nosotrosRouter =  require('./routes/nosotros');
var contactoRouter =  require('./routes/contacto');
      /* Agregariamos a la carpeta routes, estos archivos .js*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/nosotros', nosotrosRouter)
app.use('/contacto', contactoRouter)

/* ------------------------------------------------------------------- */


app.get('/prueba', function(req,res){   
  res.send('hola soy la pagina de prueba')
})
/* req captura y res responde */

app.get('/galeria', function(req,res){   
  res.send('hola soy la pagina de galeria')
})

app.get('/servicios', function(req,res){   
  res.render('servicios')
})
/* En este caso el "render" pide que crees un views hbs y ahi se pone el contenido a ver*/

/* ------------------------------------------------------------------------- */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
