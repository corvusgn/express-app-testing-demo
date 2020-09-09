const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();

// public assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use('/coverage', express.static(path.join(__dirname, '..', 'coverage')));

// ejs for view templates
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// load route
require('./route')(app);

// server
const port = process.env.PORT || 8084;
// app.server = app.listen(port);
// console.log(`listening on port ${port}`);

//Se asegura de no intentar volver a escuchar en un puerto en uso para evitar el error EADDRINUSE
// cuando se ejecutan pruebas con el servidor corriendo
if(!module.parent){
    app.server = app.listen(port);
    console.log(`listening on port ${port}`);
}

module.exports = app;
