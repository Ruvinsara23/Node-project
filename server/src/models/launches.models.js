const launches= new Map();
const launch={
    flightnumber:100,
    mission:'Kepler Exploration x',
    rocket:'Explorer Is1',
    launchDate: new Date('December 27,2030'),
    destination:'Kepler-442 b',
    customer:['ZTM','NASA'],
    upcoming:true,
    success:true,
}

launches.set(launch.flightnumber,launch);

function getAllLaunches(){
    return Array.from(launches.values());
}

module.exports={
    getAllLaunches,
}