const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const morgan = require('morgan')
const routes=require('./routes');
require('dotenv').config();

// DB config

require('./database/configDB').dbConnection();


// App de Express
const app = express();

//Lectura y parseo del body
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
// Lectura de archivos
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);//Crear server socket
require('./sockets/socket');




// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

// Rutas
app.use('/chatsoe',routes);


app.set('puerto', process.env.PORT || 3000);


server.listen(app.get('puerto'), ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', app.get('puerto'));

});


