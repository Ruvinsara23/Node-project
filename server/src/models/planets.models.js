const parse = require('csv-parse').parse;
const { rejects } = require('assert');
const { resolve } = require('dns/promises');
const fs = require('fs');
const path = require('path');
const planets=require('./planets.mongo');





function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
    
}


const filePath = path.join(__dirname,'..','..','data','kepler_data.csv');

 function loadPlanetsData(){
    return new Promise((resolve,reject)=>{
        fs.createReadStream(filePath)
  .pipe(parse({
    comment: '#',
    columns: true,
  }))
  .on('data',async (data) => {
   
    if (isHabitablePlanet(data)) {
      console.log(data ,"before pass save");
      await  savePlanet(data);
     
    }
  })
  .on('error', (err) => {
    console.error('Error reading CSV file:', err);
    reject(err)
  })
  .on('end',async () => {
    const countPlanet=await getAllPlanets()
    if (countPlanet.length === 0) {
      console.log('No habitable planets found.');
    } else {
      console.log('Habitable planets:');
      console.log(countPlanet.map((planet) => planet['kepler_name']));
      console.log(`${countPlanet.length} habitable planets found!`);
    }
    resolve()
  });

    })
}
loadPlanetsData()

async function getAllPlanets(){

  return await planets.find({});  
  
}

async function savePlanet(planet){

try{
  
  await planets.updateOne({

    keplerName:planet.kepler_name, 
   },{
    keplerName:planet.kepler_name,
   },{
    upsert: true
   }
   ,
  )
}catch(err){
console.error(`cold not save plannet ${err}`)

}
 
}





module.exports={
    loadPlanetsData,
    getAllPlanets   
    }


// const { rejects } = require('assert');
// const {parse} = require('csv-parse');
// const fs= require('fs');
// const path = require('path');
// const result =[];
// // const kepler_data=require('../data/')


// const isHabitablePlanet=(planet)=>{

// return planet['koi_disposition'] === 'CONFIRMED'
//     && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
//     && planet['koi_prad'] < 1.6;

// }
// function loadPlanetsData() {
//    return new Promise((resolve,reject)=>{
//     fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
//     .pipe(parse({
//         comment:'#',
//         columns:true,
//     }))
//     .on('data',(data)=>{
//         if (isHabitablePlanet(data)){
//             result.push(data);
//         }
       
//     })
//     .on('error',(error)=>{
//     console.log(error);
//     reject(error)
//     })
//     .on('end',()=>{
//     console.log('done');
//     resolve();
//     })
//    }) 
// }


// module.exports={
//     loadPlanetsData,
//     planets:result
// }