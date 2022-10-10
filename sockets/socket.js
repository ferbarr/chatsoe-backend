const { io } = require('../index');
const { comprobarJWT } = require('../jwt/jwt');
const { usuarioConectado, usuarioDesconectado, guardarMensaje }=require('../controllers/socketController');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    // Validar token
    const [valido,uid]=comprobarJWT(client.handshake.headers['x-token']);
//    Verificar autenticacion
    if(!valido){return client.disconnect()}//Desconectar del socket
    // Cliente autenticado
    usuarioConectado(uid);

    // Ingresar a una sala
    client.join(uid);//Unir al cliente una sala con ese uid

    // Escuchar evento del front
    client.on('mensaje-personal',async(chat)=>{
        // Inmediatamente retornamos un evento al destinatario
        await guardarMensaje(chat);
        io.to(chat.to).emit('mensaje-personal',chat)
    });
    


    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

   


});
