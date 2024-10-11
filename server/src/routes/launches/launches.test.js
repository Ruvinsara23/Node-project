const request=require('supertest')
const app=require('../../app')
const {  mongoConnect,mongoDisconnect}=require('../../services/mongo')


describe('Launches API',()=>{
    beforeAll(async()=>{
        await mongoConnect()
    });
    afterAll(async()=>{
        await mongoDisconnect()
    })
    describe('Test GET/launchers',()=>{
        test('It shoud response with 200 sucess', async()=>{
            const response=await request(app)
            .get('/launches')
            .expect('Content-Type',/json/)
            .expect(200);
        })
       
    });
    
    
    describe ('Test POST/launchers',()=>{
        test('It should response with 201 created',async()=>{
            const response= await request(app)
            .post ('/launches')
            .send({
                mission: 'USS Enterprise',
                rocket:'NCC 170-D',
                target:'kepler-62 f',
                launchDate: 'january 4, 2028'
            })
            .expect('Content-Type',/json/)
            .expect(201)
            // const response=404;
            // expect(response).toBe(404)
        })
        test('It should catch missing required properties', async () => {
    const response = await request(app)
        .post('/launches') // Change this to POST
        .send({
            // Intentionally missing some required properties
            mission: 'USS Enterprise',
            rocket: 'NCC 170-D',
            // Missing target and launchDate
        })
        .expect('Content-Type', /json/)
        .expect(400); // Expecting a 400 Bad Request for missing properties

    expect(response.body).toEqual({
        error: 'Missing required launch property'
    });
});
    
        
    })

})

