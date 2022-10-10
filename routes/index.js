const {Router}=require('express');
const router=Router();
const authRouter=require('./authRouter');
const userRouter=require('./userRouter');
const msgRouter=require('./msgRouter');
router.use('/auth',authRouter);
router.use('/user',userRouter);
router.use('/msg',msgRouter);

module.exports=router;