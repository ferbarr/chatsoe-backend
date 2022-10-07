const express = require('express');
const path = require('path');
const routes=require('./routes');
require('dotenv').config();

// DB config

require('./database/configDB').dbConnection();


// App de Express
const app = express();

//Lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);//Crear server socket
require('./sockets/socket');




// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

// Rutas
app.use('/chatsoe',routes);





server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});


