 
 const mongoose = require('mongoose')

 const MONGO_URL='mongodb+srv://nasa-api:nasa-api@nasacluster.bap9i.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster'

 mongoose.connection.on('open',()=>{
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error',(err)=>{
 console.error(err)
})

async function mongoConnect(){
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
                // useFindAndModify:false,
                // useCreateIndex:true,
                useUnifiedTopology: true,
            }) 
}

module.exports ={
    mongoConnect ,
}