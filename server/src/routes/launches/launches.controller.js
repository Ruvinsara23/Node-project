const {getAllLaunches,scheduleNewLaunch,existsLaunchWithId,abortLaunchById}=require('../../models/launches.models');
const {getPagination}= require('../../services/query.js')


async function httpGetAllLaunches(req, res) {
    console.log(req.query);
    const {skip,limit}=getPagination(req.query);
    const launches=await getAllLaunches(skip,limit)
    return res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch. rocket
        || !launch. launchDate
        || !launch.target) {
       return res.status(400).json({
        error:'Missing something'
       })
    }
    launch.launchDate = new Date(launch.launchDate);
  if(isNaN(launch.launchDate)){
    return res.status(400).json({
        error:'Invalid launch date'
    })
  }

   await scheduleNewLaunch(launch);
   console.log(launch)
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req,res){
    const launchId=Number(req.params.id);

  const existLaunch=await existsLaunchWithId(launchId)
    if (!existLaunch) {
        return res.status(404).json({
        error: 'Launch not found',})}

const aborted =abortLaunchById(launchId);
if(!aborted){
    return res.status(400).json({
        error:'Launch not aborted',
    })
}


return res.status(200).json({ok: true})

}






module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch 
}