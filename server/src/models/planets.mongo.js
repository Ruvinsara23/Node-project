const mongoose=require('mongoose');

const planetSchema=new mongoose.Schema({
    keplerName:{
        type:String,
        required:true,
    }
})

const Plantes = mongoose.model('Plantes', planetSchema, 'plantes');

module.exports = Plantes;