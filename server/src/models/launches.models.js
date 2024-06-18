const launches= new Map();
let  latestFlightNumber=100;
const launch={
    flightNumber:100,
    mission:'Kepler Exploration x',
    rocket:'Explorer Is1',
    launchDate: new Date('December 27,2030'),
    destination:'Kepler-442 b',
    customer:['ZTM','NASA'],
    upcoming:true,
    success:true,
}

launches.set(launch.flightNumber,launch);

function getAllLaunches(){
    return Array.from(launches.values());
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


module.exports={ 
    getAllLaunches,
    addNewLaunch
}