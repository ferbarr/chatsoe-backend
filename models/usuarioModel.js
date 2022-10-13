const {Schema,model}=require('mongoose');

const usuarioSchema=Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:[8,'Minimo 6 letras']
    },
    photo:{
        type:String,
        default:null
    },
    phone:{
        type:String,
        required:true
    },
    online:{
        type:Boolean,
        default:false
    },
    lic:{
        type:Boolean,
        default:false
    }
});
usuarioSchema.method('toJSON',function(){
    const {__v,_id,password,...object}=this.toObject();
    object.uid=_id;
    return object;

});

module.exports=model('Usuario',usuarioSchema);

