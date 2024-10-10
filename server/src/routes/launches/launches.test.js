const request=require('supertest')
const app=require('../../app')
const {  mongoConnect}=require('../../services/mongo')


describe('Launches API',()=>{
    beforeAll(async()=>{
        await mongoConnect()
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
                target:'kepler-186',
                launchDate: 'january 4, 2028'
            })
            .expect('Content-Type',/json/)
            .expect(201)
            // const response=404;
            // expect(response).toBe(404)
        })
        test('It should catch missing reqired properties',async()=>{
            const response=await request(app)
            .get('/launches')
            .expect('Content-Type',/json/)
            .expect(400);
    
            expect (response.body)
            error:'Missing required launch property'
            })
    
        
    })

})

