const { response } = require('express');
const Usuario=require('../models/usuarioModel');
// const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcryptjs");

// cloudinary.config({
//   cloud_name: "dafdqsakr",
//   api_key: "685822558245377",
//   api_secret: "8wOm51wbK6zkRnqbj-IwuktQi5o",
// });



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

const update = async (req, res, next) => {
    const {  _id,password, email,photo, ...resto } = req.body;
  
    const userU = await Usuario.findById(_id); //Para la foto
    const verifyUser = await Usuario.findOne({ email }); //Para el correo
 
 
    if(photo!=''){
      resto.photo=photo;
    }
    if (userU.email !== email && !verifyUser) {
      //Actualizar user
      resto.email = email;
    }
  
    if (password) {
      //Actualizar password
      resto.password = bcrypt.hashSync(password, 10);
    }
    try {
      const usuario = await Usuario.findByIdAndUpdate(_id, resto,{new: true});
  
      res.json({
        ok: true,
        usuario,
        token:'',
      });
    } catch (e) {
      res.status(500).json({
        ok: false,
        msg: "Algo salio mal",
      });
      next(e);
    }
  };
  

module.exports={
    getUsuarios,
    update
}