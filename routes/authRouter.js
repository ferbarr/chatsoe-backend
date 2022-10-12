const {Router}=require('express');
const { check } = require('express-validator');
const { crearUsuario, login,renewToken} = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router=Router();


router.post('/new',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','Formato de email no valido').isEmail(),
    check('password','Minímo 6 carácteres').isLength(8),
    check('phone','Formato de teléfono incorrecto').isLength({min:10,max:10}),
    validarCampos

],crearUsuario);

router.post('/',[
    check('email','Formato de email no valido').isEmail(),
    check('password','Minímo 6 carácteres').isLength(8),
    validarCampos

],login);

router.get('/renew',validarJWT,renewToken)



module.exports=router;