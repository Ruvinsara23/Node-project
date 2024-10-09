const launchesDatabase = require('./launches.mongo')
const planets=require('./planets.mongo')

 const launches =new Map();

let  latestFlightNumber=100;
const launch={
    flightNumber:100,
    mission:'Kepler Exploration x',
    rocket:'Explorer Is1',
    launchDate: new Date('December 27,2030'),
    target:'Kepler',
    customer:['ZTM','NASA'],
    upcoming:true,
    success:true,
}

saveLaunch(launch )

launches.set(launch.flightNumber,launch);

function existsLaunchWithId(launchId){
    return launches.has(launchId);

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
    const planet = await planets.findOne({
        keplerName:launch.target,
    })
    if(!planet){
        throw new Error ('No matching planet found  ')

    }
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,     
    },launch,{
        upsert:true
    })
}

async function scheduleNewLaunch(){
    const newFlightNumber= await getLatestFlightNumber()+1;

    const newLaunch=Object.assign(launch,{
        success:true,
        upcoming:true,
        customer:['Zero to mastery','NASA'],
        flightnumber:newFlightNumber,
    })

    await saveLaunch(newLaunch)
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

function abortLaunchById(launchId){
     const aborted= launches.get(launchId);
     aborted.upcoming=false;
     aborted.success=false; 
     return aborted;
}


module.exports={ 
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    scheduleNewLaunch,
    abortLaunchById,

}