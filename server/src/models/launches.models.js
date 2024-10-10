const launchesDatabase = require('./launches.mongo')
const planets=require('./planets.mongo')



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

// launches.set(launch.flightNumber,launch);

async function existsLaunchWithId(launchId){
    return await launchesDatabase.findOne({
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
    const planet = await planets.findOne({
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

async function scheduleNewLaunch(){
    const newFlightNumber= await getLatestFlightNumber()+1;

    const newLaunch=Object.assign(launch,{
        success:true,
        upcoming:true,
        customer:['Zero to mastery','NASA'],
        flightNumber:newFlightNumber,
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
    abortLaunchById,

}