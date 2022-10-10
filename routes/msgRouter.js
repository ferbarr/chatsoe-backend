const {Router}=require('express');
const { obtenerChat } = require('../controllers/msgController');
const { validarJWT } = require('../middlewares/validar-jwt');
const router=Router();



router.get('/get-msg/:from',validarJWT,obtenerChat)



module.exports=router;