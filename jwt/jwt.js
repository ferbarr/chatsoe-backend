const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
            reject('No se puedo generar el token');
        } else {
            resolve(token);
        }
      }
    );
  });
};

const comprobarJWT=(token='')=>{//Comprobar que el token sea valido socket
  try {
    const {uid}=jwt.verify(token,process.env.JWT_KEY);
    return [true,uid];

  } catch (e) {
    console.log(e)
    return [false,null];
  }
}

module.exports = {
  generarJWT,
  comprobarJWT
};
