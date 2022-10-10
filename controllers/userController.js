const { response } = require('express');
const Usuario=require('../models/usuarioModel');
const getUsuarios=async(req,res=response)=>{

    const desde=Number(req.query.desde)||0;

    const usuarios=await Usuario
    .find({_id:{$ne:req.uid}})//Quitar el usuario actual
    .sort('-online')
    .skip(desde)
    .limit(20);
    return res.status(404).json({
        ok: false,
        usuarios: usuarios,
     
      });

}

module.exports={
    getUsuarios
}