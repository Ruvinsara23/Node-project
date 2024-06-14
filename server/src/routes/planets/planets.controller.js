const { getAllPlanets}=require("../../models/planets.models");

 function httpgetAllPlanets(req,res){
    return res.status(200).json(getAllPlanets());
 }

 module.exports={httpgetAllPlanets,

 }