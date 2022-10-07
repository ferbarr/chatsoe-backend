const mongoose=require('mongoose');

const dbConnection=async()=>{
    mongoose.Promise=global.Promise;

  
    mongoose.connect(process.env.DB_CNN,{useNewUrlParser:true}).
    then(mongoose=>console.log('Conectado a la DB')).
    catch(e=>console.log(e));
}

module.exports={
    dbConnection
}