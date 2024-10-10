const express =require('express');

const http = require('http');
const app =require('./app');
const {mongoConnect}=require('../src/services/mongo')
const PORT=process.env.PORT || 8000;
const MONGO_URL='mongodb+srv://nasa-api:nasa-api@nasacluster.bap9i.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster'
const server = http.createServer(app)
const { loadPlanetsData } =require('./models/planets.models');


// mongoose.connection.on('open',()=>{
//     console.log('MongoDB connection ready!');
// });

// mongoose.connection.on('error',(err)=>{
//  console.error(err)
// })
async function startServer() {
   await  mongoConnect()
    await loadPlanetsData();
    server.listen(PORT,()=>{
        console.log(`Listening on PORT ${PORT}...`)
    }) 
}


startServer();

console.log(PORT);