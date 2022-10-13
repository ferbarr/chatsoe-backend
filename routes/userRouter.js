const {Router}=require('express');
const { check } = require('express-validator');
const { getUsuarios,update} = require('../controllers/userController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router=Router();



router.get('/get-users',validarJWT,getUsuarios)

router.put('/update',[
    validarJWT,
    check('_id', 'Id no valido').isMongoId(),
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('phone','Formato de teléfono incorrecto').isLength({min:10,max:10}),
    validarCampos

],update);


module.exports=router;