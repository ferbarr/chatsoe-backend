const {Router}=require('express');
const { check } = require('express-validator');
const { getUsuarios} = require('../controllers/userController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router=Router();



router.get('/get-users',validarJWT,getUsuarios)



module.exports=router;