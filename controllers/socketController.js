const Usuario=require('../models/usuarioModel');
const Message=require('../models/msgModel');




const usuarioConectado=async(uid='')=>{
    const usuario=await Usuario.findById(uid);
    usuario.online=true;
    await usuario.save();
    return usuario;
};

const usuarioDesconectado=async(uid='')=>{
    const usuario=await Usuario.findById(uid);
    usuario.online=false;
    await usuario.save();
    return usuario;
};

const guardarMensaje=async(payload)=>{
    try {
        const mensaje=new Message(payload);
        await mensaje.save();
        return true;
        
    } catch (e) {
        console.log(e);
        return false;
        
    }

}

module.exports={
    usuarioConectado,
    usuarioDesconectado,
    guardarMensaje
}











