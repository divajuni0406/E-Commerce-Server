const request = require('supertest')
const app = require('../app')
const { signToken } = require('../helper/jwt')
jest.setTimeout(30000)
let token = signToken({id: '63317be198c3d8a39672e13b',username: 'idham',email: 'idham@mail.com',role: 'user'})
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

describe('get carts features', ()=>{
    test('success get cart', (done)=>{
         request(app)
        .get('/cart/63315a80db4fac62d606709c')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(({_body})=>{
            expect(typeof _body.carts).toBe("object")
            done()
        })
        .catch(err=>{
            console.log('masuk catch', err)
            done(err)
        })
    })
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

})

let cart = {
    productId:'63331cbba3622624405eca0c', 
    quantity:1, 
    userId:'63317be198c3d8a39672e13b', 
    size:'s'
}

describe('post carts features', ()=>{
    test('success add cart', (done)=>{
        request(app)
        .post('/cart')
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .send(cart)
        .then(({_body})=>{
            expect(_body.message).toBe('post cart berhasil')
            expect(_body.carts[_body.carts.length-1]).toHaveProperty('_id', expect.any(String))
            expect(_body.carts[_body.carts.length-1]).toHaveProperty('productId', expect.any(String))
            expect(_body.carts[_body.carts.length-1]).toHaveProperty('quantity', expect.any(Number))
            expect(_body.carts[_body.carts.length-1]).toHaveProperty('size', expect.any(String))
            expect(_body.carts[_body.carts.length-1]).toHaveProperty('cartId', expect.any(String))
            done()
        })
        .catch(err=>{
            console.log('masuk catch', err)
            done(err)
        })
    })

    test('failed add cart unauthorized', (done)=>{
        request(app)
        .post('/cart')
        .expect(401)
        .send(cart)
        .then(({_body})=>{
            done()
        })
        .catch(err=>{
            console.log('masuk catch', err)
            done(err)
        })
    })
})


describe('delete carts features', ()=>{
    test('failed delete product in cart unauthorized', (done)=>{
        request(app)
        .post('/delete-product-incart')
        .expect(401)
        .send(cart)
        .then(({_body})=>{
            done()
        })
        .catch(err=>{
            console.log('masuk catch', err)
            done(err)
        })
    })
})