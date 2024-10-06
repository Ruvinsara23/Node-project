const launchesDatabase = require('./launches.mongo')

 const launches =new Map();

let  latestFlightNumber=100;
const launch={
    flightNumber:100,
    mission:'Kepler Exploration x',
    rocket:'Explorer Is1',
    launchDate: new Date('December 27,2030'),
    target:'Kepler-442 b',
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

async function saveLaunch(launch){
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,     
    },launch,{
        upsert:true
    })
}

function addNewLaunch(launch){
    latestFlightNumber++;
    const newLaunch = {
        ...launch,
        flightNumber: latestFlightNumber,
        success: true,
        upcoming: true,
        customer: ['ZTMN', 'NBNN'],
    };
    launches.set(newLaunch.flightNumber, newLaunch);

}

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
    abortLaunchById,

}