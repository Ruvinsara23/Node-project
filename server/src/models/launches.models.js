const axios =require('axios')
const launchesDatabase = require('./launches.mongo')
const Plantes = require('./planets.mongo');
const { query } = require('express');
 

// let  latestFlightNumber=100;
const launch={
    flightNumber:100,
    mission:'Kepler Exploration x',
    rocket:'Kepler-442 b',
    launchDate: new Date('December 27,2030'),
    target:'Kepler-1652 b',
    customer:['ZTM','NASA'],
    upcoming:true,
    success:true,
}

saveLaunch(launch )

async function findLaunch(filter){
    return await launchesDatabase.findOne(filter)
}

// launches.set(launch.flightNumber,launch);

async function existsLaunchWithId(launchId){
    return await launchesDatabase.findLaunch({
        flightNumber:launchId
    });

}

async function getAllLaunches(){
    return await launchesDatabase.find({},{'_id':0,'__v':0})  ;
}

async function getLatestFlightNumber(){
    const latestLaunch=await launchesDatabase.findOne()
    .sort('-flightNumber')
    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER
    }
  return latestLaunch.flightNumber
}

async function saveLaunch(launch){
    const planet= await plantes.findOne({
        keplerName:launch.target,
    })
    if(!planet){
        throw new Error ('No matching planet found  ')

    }
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,     
    },launch,{
        upsert:true
    })
}

async function saveLaunch(launch) {
    await launchesDatabase.findOneAndUpdate(
        { flightNumber: launch.flightNumber },
        launch,
        { upsert: true }
    );
}

async function scheduleNewLaunch(launchData){
    const planet = await Plantes.findOne({ keplerName: launch.target });
    if (!planet) {
        throw new Error('No matching planet found');
    }
    const newFlightNumber= await getLatestFlightNumber()+1;

    const newLaunch=Object.assign(launchData,{
        success:true,
        upcoming:true,
        customer:['Zero to mastery','NASA'],
        flightNumber:newFlightNumber,
    })

    

}
const SPACEX_API_URL='https://api.spacexdata.com/v4/launches/query'

async function loadLaunchData(){
  const firstLaunch=await findLaunch({
    flightNumber:1,
    rocket:'Falcon 1',
    mission:'FalconSat'
  })

  if(firstLaunch){
    console.log('launch data already loaded');
    return;
  }else{
  await populateLaunches()
  }

  async function populateLaunches(){
    console.log('downloading launches data')
   const response= await axios.post(SPACEX_API_URL,{
        query:{},
        options:{
            pagination: false,
            populate:[{
                path:'rocket',
                select:{
                    name:1
                }
            },{
                path:'payloads',
                select:{
                'customer':1

                }
            }
        ]
        }
   
    })
 if(response.status!==200){
    console.log('Problem downloading the launch data');
    throw new Error('Lauch data downloading fail')
 }

    const launchDocs=response.data.docs;
    for(const launchDoc of launchDocs){
    const payloads=launchDoc['payloads'];
    const customers=payloads.flatMap((payload)=>{
        return payload['customer']
    })
    const launch={
        fighitNumber:launchDoc['flight_number'],
        mission:launchDoc['name'],
        rocket:launchDoc['date_local'],
        upcomming:launchDoc['upcominng'],
        success:launchDoc['success'],
        customers,
    
    }
    console.log(`${launch.fighitNumber} ${launch.mission}`);

    await saveLaunch(launch)
}

  }
    

  



}


// function addNewLaunch(launch){
//     latestFlightNumber++;
//     const newLaunch = {
//         ...launch,
//         flightNumber: latestFlightNumber,
//         success: true,
//         upcoming: true,
//         customer: ['ZTMN', 'NBNN'],
//     };
//     launches.set(newLaunch.flightNumber, newLaunch);

// }

async function abortLaunchById(launchId){
   return await launchesDatabase.updateOne({
        flightNumber:launchId,
    
    },{
        upcoming:false,
        success:false,
    });

    return abored.ok===1 && aborted.nModified===1;
    }


module.exports={

    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    loadLaunchData,
    abortLaunchById,

}