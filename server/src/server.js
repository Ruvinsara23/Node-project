const express =require('express');
const http = require('http');
const app =require('./app');
const PORT=process.env.PORT || 8000;
const server = http.createServer(app)
const { loadPlanetsData } =require('./models/planets.models');

async function startServer() {
    await loadPlanetsData;
    server.listen(PORT,()=>{
        console.log(`Listening on PORT ${PORT}...`)
    }) 
}


startServer();

console.log(PORT);