const {Schema,model, SchemaType}=require('mongoose');

const messageSchema=Schema({
    from:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    to:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    mensaje:{
        type:String,
        required:true
    }
    
   
},{
    timestamps:true
});
messageSchema.method('toJSON',function(){
    const {__v,_id,...object}=this.toObject();
    return object;

});

module.exports=model('Message',messageSchema);

