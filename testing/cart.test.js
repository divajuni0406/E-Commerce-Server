const request = require('supertest')
const app = require('../app')
let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzE1YTgwZGI0ZmFjNjJkNjA2NzA5YyIsInVzZXJuYW1lIjoiZGl2YWp1bmkiLCJlbWFpbCI6ImRpdmFqdW5pIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY2OTU3MTQwLCJleHAiOjE2NjcwNDM1NDB9.ywnKrSRINKeOqXKV8f3G9v_ZTeXY7uKTAm3hyixiNiY`
jest.setTimeout(30000)
// positive case

const mongoose = require('mongoose')
require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(`mongodb+srv://fsw23c9t1:${process.env.MONGOPASS}@fsw23c9t1.09vmpg5.mongodb.net/?retryWrites=true&w=majority`);
  });
  
/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe('create carts features', ()=>{
    test('invalid token, failed to get cart', (done)=>{
        request(app)
        .get('/cart/63317be198c3d8a39672e13b')
        .expect(401)
        .then((resp)=>{
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    test('success get cart', (done)=>{
         request(app)
        .get('/cart/63315a80db4fac62d606709c')
        .expect(200)
        .set('Authorization', `Bearer ${token}`)
        .then((resp)=>{
            console.log('masuk then')
            done()
        })
        .catch(err=>{
            console.log('masuk catch', err)
            done(err)
        })
    })
})