const http = reqire('http');
const app =reqire('./app');

const server = http.createServer(app)

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}...`)
})



const PORT=process.env.PORT || 8000;

console.log(PORT);