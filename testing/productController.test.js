const request = require('supertest');
const app = require('../app');
const router = require('../app.js');
jest.setTimeout(30000);

const mongoose = require('mongoose');
require('dotenv').config();

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGQwMzNiYTVkNjgzMzEwZWYwMzA5YSIsInVzZXJuYW1lIjoienhjenhjIiwiZW1haWwiOiJ6eGN6eGNAenhjIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY3NDA3ODkzLCJleHAiOjE2Njc0OTQyOTN9.WHlE-Jr9uLoI0FWM0AfJIFt0tHRfRZ1DRraLZcTPhIY`;
const id = '6362a95dacc9efb70dd2707b';

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(
        `mongodb+srv://fsw23c9t1:${process.env.MONGOPASS}@fsw23c9t1.09vmpg5.mongodb.net/?retryWrites=true&w=majority`
    );
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
});

describe('CRUD Product', () => {
    describe('get data products', () => {
        test('should return 200 and get all products', async () => {
            const response = await request(app).get('/api/product');
            expect(response.statusCode).toBe(200);
            expect(response._body.result.length).toBeGreaterThan(16);
        });

        test('should return 200 and get products by page', async () => {
            const response = await request(app).get('/api/product?page=1');
            // console.log(response._body.statusCode)
            expect(response.statusCode).toBe(200);
            // console.log(response._body.result.length)
            expect(response._body.result.length).toBeGreaterThan(0);
        });

        test('should return 200 and get empty products if page does not exist', async () => {
            const response = await request(app).get('/api/product?page=10');
            // console.log(response._body.statusCode)
            expect(response.statusCode).toBe(200);
            // console.log(response._body.result.length)
            expect(response._body.result.length).toBe(0);
        });
    });

    describe('get product by id', () => {
        test('should return 200 and get the product by id', async () => {
            const response = await request(app).get(`/api/product/${id}`);
            expect(response.statusCode).toBe(200);
            // console.log(response._body.product)
            expect(response._body.product._id).toBe(`${id}`);
            // expect(response.result.length).toBeGreaterThan(16)
        });

        test('should return 500', async () => {
            const response = await request(app).get('/api/product/123');
            expect(response.statusCode).toBe(500);
        });
    });

    describe('create product', () => {
        test('should return 200 and create product with data product if user is admin', async () => {
            const response = await request(app)
                .post('/api/create-product')
                .send({
                    name: 'Test Jest',
                    detail: 'Shirt in Oxford cotton with a button-down collar, classic front, yoke at the back and an open chest pocket. Long sleeves with buttoned cuffs and a sleeve placket with a link button. Gently rounded hem. Regular Fit – a classic fit with good room for movement and a gently tapered waist to create a comfortable, tailored silhouette.',
                    thumbnail:
                        'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/6e113ad614097a06fc8af5b797f4cb393ef2b03f_xxl-1.jpg',
                    price: 429900,
                    images: [
                        'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/6e113ad614097a06fc8af5b797f4cb393ef2b03f_xxl-1.jpg',
                        'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/07b86dff1dcbcd9002fdc1d81d33546ab89da7a7_xxl-1.jpg',
                    ],
                    category: 'baju',
                    size: {
                        S: '23',
                    },
                })
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });

        test('should return 200 and create product with empty data if user is admin', async () => {
            const response = await request(app)
                .post('/api/create-product')
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });

        test('should return 302 and failed to create product if user is not admin and token not set', async () => {
            const response = await request(app)
                .post('/api/create-product')
                .send({
                    name: 'Test Jest',
                    detail: 'Shirt in Oxford cotton with a button-down collar, classic front, yoke at the back and an open chest pocket. Long sleeves with buttoned cuffs and a sleeve placket with a link button. Gently rounded hem. Regular Fit – a classic fit with good room for movement and a gently tapered waist to create a comfortable, tailored silhouette.',
                    thumbnail:
                        'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/6e113ad614097a06fc8af5b797f4cb393ef2b03f_xxl-1.jpg',
                    price: 429900,
                    images: [
                        'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/6e113ad614097a06fc8af5b797f4cb393ef2b03f_xxl-1.jpg',
                        'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/07b86dff1dcbcd9002fdc1d81d33546ab89da7a7_xxl-1.jpg',
                    ],
                    category: 'baju',
                    size: {
                        S: '23',
                    },
                });
            expect(response.statusCode).toBe(302);
        });

        test('should return 302 and failed to create product if token is wrong', async () => {
            const response = await request(app)
                .post('/api/create-product')
                .send({
                    name: 'Test Jest',
                    detail: 'Shirt in Oxford cotton with a button-down collar, classic front, yoke at the back and an open chest pocket. Long sleeves with buttoned cuffs and a sleeve placket with a link button. Gently rounded hem. Regular Fit – a classic fit with good room for movement and a gently tapered waist to create a comfortable, tailored silhouette.',
                    thumbnail:
                        'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/6e113ad614097a06fc8af5b797f4cb393ef2b03f_xxl-1.jpg',
                    price: 429900,
                    images: [
                        'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/6e113ad614097a06fc8af5b797f4cb393ef2b03f_xxl-1.jpg',
                        'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/07b86dff1dcbcd9002fdc1d81d33546ab89da7a7_xxl-1.jpg',
                    ],
                    category: 'baju',
                    size: {
                        S: '23',
                    },
                })
                .set(
                    'Authorization',
                    `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzE3MzNiYzhjNjVmZTkxMDY2MmZlMyIsInVzZXJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjY3NDA3MjUyLCJleHAiOjE2Njc0OTM2NTJ9.IDft7Z9iUc_9ay3Srtpt7Xx9lWaMaqtelmM2hFUS7GE}`
                );
            expect(response.statusCode).toBe(302);
        });
    });

    describe('edit product', () => {
        test('should edit the product if user is admin', async () => {
            const response = await request(app)
                .patch(`/api/edit-data/${id}`)
                .send({
                    name: 'Edited Test Jest',
                    detail: 'Edited',
                })
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(201);
        });

        test('should not edit the product if user is not admin and token not set', async () => {
            const response = await request(app).patch(`/api/edit-data/${id}`).send({
                name: 'Edited Test Jest',
                detail: 'Edited',
            });
            expect(response.statusCode).toBe(302);
        });

        test('should not edit the product if token is wrong', async () => {
            const response = await request(app)
                .patch(`/api/edit-data/${id}`)
                .send({
                    name: 'Edited Test Jest',
                    detail: 'Edited',
                })
                .set('Authorization', `Bearer fdgherher`);
            expect(response.statusCode).toBe(302);
        });
    });

    describe('delete product', () => {
        test('should delete a product if admin', async () => {
            const response = await request(app)
                .delete(`/api/delete-product/${id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });

        test('should not delete a product if token not set', async () => {
            const response = await request(app).delete(`/api/delete-product/${id}`);
            // .set("Authorization", `Bearer ${token}`)
            expect(response.statusCode).toBe(302);
        });

        test('should not delete a product if not admin', async () => {
            const response = await request(app)
                .delete(`/api/delete-product/${id}`)
                .set('Authorization', `Bearer we4gfweg`);
            expect(response.statusCode).toBe(302);
        });
    });
});

describe('search by category', () => {
    // success
    it('should success to search products by category if user choose any category and products available', async () => {
        const response = await request(router).get('/api/productCategory').send({
            category: 'baju',
        });
        console.log(response._body.result.length, 'alllllllllllllllllllllllllll');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(response._body.result.length).toBeGreaterThan(0);
    });

    // wrong
    it('should no products available to search by category if there is something wrong from user or developer', async () => {
        const response = await request(router).get('/api/productCategory').send({
            category: '/',
        });
        console.log(response._body, 'alllllllllllllllllllllllllll');
        expect(response.statusCode).toBe(404);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });
    it('should error to search by category if there is something wrong else', async () => {
        const response = await request(router).get('/api/productCategory').send({
            a: '/',
        });
        console.log(response._body, 'alllllllllllllllllllllllllll');
        expect(response.statusCode).toBe(500);
    });
});

describe('search products', () => {
    // success
    it('should success to search products if user type any words and products available', async () => {
        const response = await request(router).post('/api/searchProduct').send({
            search: 'baju',
        });
        console.log(response._body.result.length, 'alllllllllllllllllllllllllll');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        expect(response._body.result.length).toBeGreaterThan(0);
    });

    // wrong
    it('should be no product available to search if there is something wrong from user or developer', async () => {
        const response = await request(router).post('/api/searchProduct').send({
            search: '//',
        });
        console.log(response._body, 'alllllllllllllllllllllllllll');
        expect(response.statusCode).toBe(404);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('should error to search by category if there is something wrong else', async () => {
        const response = await request(router).post('/api/searchProduct').send({});
        console.log(response._body, 'alllllllllllllllllllllllllll');
        expect(response.statusCode).toBe(400);
    });
});
