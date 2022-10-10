const { response } = require('express');
const Message=require('../models/msgModel');


const obtenerChat=async(req,res=response)=>{
    const miId=req.uid;
    const mensajeTo=req.params.from;
    const last60=await Message.find({
        $or:[{from:miId,to:mensajeTo},{from:mensajeTo,to:miId}]//Para solo obtener los de la sala privada
    })
    .sort({createdAt:'desc'})
    .limit(60);

    res.json({
        ok:true,
        mensajes:last60
    })

}

module.exports={
    obtenerChat
}