const { response } = require('express');
const Usuario=require('../models/usuarioModel');
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcryptjs");

cloudinary.config({
  cloud_name: "dafdqsakr",
  api_key: "685822558245377",
  api_secret: "8wOm51wbK6zkRnqbj-IwuktQi5o",
});



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
    const { _id, password, email, photo, ...resto } = req.body;
    const userU = await Usuario.findById(_id); //Para la foto
    const verifyUser = await Usuario.findOne({ email }); //Para el correo
    let photo2 = null;
    if (req.files) {
      photo2 = req.files.photo;
    }
    if (photo2) {
      if (userU.photo) {
        //Si ya tiene una foto la eliminamos
        const nombreB = userU.photo.split("/");
        const nombre = nombreB[nombreB.length - 1];
        const [public_id] = nombre.split(".");
        await cloudinary.uploader.destroy(public_id);
      }
      const { tempFilePath } = photo2;
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
      resto.photo = secure_url;
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
      const usuario = await Usuario.findByIdAndUpdate(_id, resto);
  
      res.json(usuario);
    } catch (e) {
      res.status(500).json({
        ok: false,
        msg: "Ocurrio un error",
      });
      next(e);
    }
  };
  

module.exports={
    getUsuarios,
    update
}