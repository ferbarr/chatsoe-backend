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
        msg: "Verifica tus datos",
      });
    }

    // Salvar datos en el modelo
    const usuario = new Usuario(req.body);
    //Encriptar contraseña
    usuario.password = bcrypt.hashSync(password, 10);
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
    const usuario = await Usuario.findOne({ email });
    // Validar correo
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Verifica tus datos",
      });
    }
    // Validar password
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Verifica tus datos",
      });
    }
    // Generar JWT

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

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const token = await generarJWT(uid);
  const usuario = await Usuario.findById(uid);
  res.json({
    ok: true,
    usuario,
    token,
  });
};


module.exports = {
  crearUsuario,
  login,
  renewToken,
  
};
