const { response } = require("express");
const Usuario = require("../models/usuarioModel");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../jwt/jwt");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar que existe email
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Correo ya registrado",
      });
    }

    // Salvar datos en el modelo
    const usuario = new Usuario(req.body);
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    // Persistir datos
    await usuario.save();

    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      ok: false,
      msg: "Ocurrio un error",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });
    // Validar correo
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Verifica el correo",
      });
    }
    // Validar password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Verifica la contraseña",
      });
    }
    // Generar JWT

    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      usuarioDB,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      ok: false,
      msg: "Ocurrio un error",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const token = await generarJWT(uid);
  const usuario=await Usuario.findById(uid);
  res.json({
    ok: true,
    usuario,
    token
  });
};

// const updateUsuario=async(req,res=response)=>{

// }

module.exports = {
  crearUsuario,
  login,
  renewToken,
};
