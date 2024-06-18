const {getAllLaunches,addNewLaunch}=require('../../models/launches.models');



function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch. rocket
        || !launch. launchDate
        || !launch.destination) {
       return res.status(400).json({
        error:'Missing something'
       })
    }
    launch.launchDate = new Date(launch.launchDate);
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

// function httpGetAllLaunches(req,res) {
//     return res.status(200).json(getAllLaunches());
     
// }

// function httpAddNewLaunch(req,res){
//     const launch=req.body;
//     launch.launchDate=new Date(launch.launchDate);
//     addNewLaunch(launch)
//    return res.status(201);
// }


module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch
}