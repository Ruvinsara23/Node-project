 
 const mongoose = require('mongoose')

 const MONGO_URL='mongodb+srv://nasa-api:nasa-api@nasacluster.bap9i.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster'

 mongoose.connection.on('open',()=>{
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error',(err)=>{
 console.error(err)
})

// const planetSchema = new mongoose.Schema({
//     keplerName: {
//         type: String,
//         required: true,
//     },
// });



// async function mongoConnect() {
//     try {
//         await mongoose.connect(MONGO_URL, {
//             serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
//         });

//         console.log('Successfully connected to MongoDB');
        
        
//         // Test the connection by querying the 'plantes' collection
//         const Plantes = mongoose.model('Plantes', planetSchema, 'plantes');
//         const plantesData = await Plantes.findOne(); // Try to fetch one document

//         console.log('Query result:', plantesData);

//     } catch (err) {
//         console.error('Connection or Query Error:', err);
//     }
// }

async function mongoConnect(){
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
                // useFindAndModify:false,
                // useCreateIndex:true,
                useUnifiedTopology: true,
            }) 
}

async function mongoDisconnect() {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Failed to disconnect from MongoDB:', err);
    }
}

module.exports ={
    mongoConnect ,
    mongoDisconnect,
}