const request = require("supertest");
const app = require("../app");
const fs = require('fs');
const path = require('path');
jest.setTimeout(30000);

const mongoose = require("mongoose");
require("dotenv").config();

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNmOTY3NDJiMTRhNTRmZjNjYzlmZCIsInVzZXJuYW1lIjoiaGFsbGFuZCIsImVtYWlsIjoiaGFsbGFuZG1vbnN0ZXJAY2l0eS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Njc3MzYwNDEsImV4cCI6MTY2NzgyMjQ0MX0.EO8CKj_E6zZtVVbRz69LJtxsyxR6f2gQT15e8pWs93Y`
const id = `6367d9ec5f030236b67428bc`
const active = false
const fileimg = fs.createReadStream(path.join(__dirname, 'imagesTesting', 'mobile_1666231874_GRLTBANNER.jpg'))
const imgLink = 'https://asset-3s.3second.co.id/p/banner/mobile_1664760511_NEW%20BANNER-01.jpg?width=1500'
const deleteId = '6367ff21ab9dfd98ff7ab4b1'
/* Connecting to the database before each test. */
beforeEach(async () => {
	await mongoose.connect(
		`mongodb+srv://fsw23c9t1:${process.env.MONGOPASS}@fsw23c9t1.09vmpg5.mongodb.net/?retryWrites=true&w=majority`
	);
});

/* Closing database connection after each test. */
afterEach(async () => {
	await mongoose.disconnect()
	await mongoose.connection.close();
});

describe('CRUD Banner', () => {
	// Get all banner
	describe('get all banner', () => {
		test('should return 200 and get all banner data', async () => {
			const response = await request(app).get('/api/banners/all')

			
			expect(response.statusCode).toBe(200)
			expect(response._body.message).toBe("successfully get data")
		})
	})

	// find banner by id
	// describe('Find banner by id', () => {
	// 	test('should return 200 and get data banner by id', async () => {
	// 		const response = await request(app).get(`/api/banner/${id}`)

	// 		expect(response.statusCode).toBe(200)
	// 		expect(response._body.message).toBe("successfully get data")
	// 	})


	// 	test('should return status code 500', async () => {
	// 		const response = await request(app).get(`/api/banner/123sad`)
			
	// 		expect(response.statusCode).toBe(500)
	// 		expect(response._body.message).toBe("failed to get data")
	// 	})
	// })

	// create banner
	// describe('Create Banner', () => {
	// 	test('should return 200 and create data banner', async () => {
	// 		const response = await request(app).post(`/api/banner/create-banner`)
	// 		.field('active', active)
	// 		.attach('image', fileimg)
	// 		.set("Authorization", `Bearer ${token}`)
			
			
	// 		expect(response.statusCode).toBe(200)
	// 		expect(response._body.message).toBe("succes create")
	// 	})
	// 	test('should return 200 and create data banner with link', async () => {
	// 		const response = await request(app).post(`/api/banner/create-banner`)
	// 		.field('active', active)
	// 		.field('image', imgLink)
	// 		.set("Authorization", `Bearer ${token}`)
			
			
	// 		expect(response.statusCode).toBe(200)
	// 		expect(response._body.message).toBe("succes create")
	// 	})
	// 	test('should return 500 and failed to create data', async () => {
	// 		const response = await request(app).post(`/api/banner/create-banner`)
	// 		.field('actives', active)
	// 		.field('imagesdfdsg', imgLink)
	// 		.set("Authorization", `Bearer ${token}`)
			
	// 		console.log(response.data);
	// 		expect(response.statusCode).toBe(500)
	// 		// expect(response._body.message).toBe("succes create")
	// 	})
	// })
	//update Banner
	// describe('Update Banner', () => {
	// 	test('should return 200 and update data banner', async () => {
	// 		const response = await request(app).patch(`/api/banner/update-banner/${id}`)
	// 		.field('active', active)
	// 		.attach('image', fileimg)
	// 		.set("Authorization", `Bearer ${token}`)
	// 		console.log(response)
			
	// 		expect(response.statusCode).toBe(200)
	// 	})


	// 	test('should return 200 and update data banner with link', async () => {
	// 		const response = await request(app).patch(`/api/banner/update-banner/${id}`)
	// 		.field('active', active)
	// 		.field('image', imgLink)
	// 		.set("Authorization", `Bearer ${token}`)
			
			
	// 		expect(response.statusCode).toBe(200)
	// 	})
	// 	test('should return 500 and failed to update data', async () => {
	// 		const response = await request(app).patch(`/api/banner/update-banner/${id}`)
	// 		.field('actives', active)
	// 		.field('imagesdfdsg', imgLink)
	// 		.set("Authorization", `Bearer ${token}`)
			
	// 		expect(response.statusCode).toBe(500)
	// 		expect(response._body.message).toBe("failed Update Banner")
	// 	})
	// })

	// delete banner byId
	// describe('Delete Banner', () => {
	// 	test('should return 200 and delete data banner by Id', async () => {
	// 		const response = await request(app).delete(`/api/banner/delete/${deleteId}`)
			
	// 		expect(response.statusCode).toBe(200)
	// 	})
		
	// 	test('should return 500 and failed to update data', async () => {
	// 		const response = await request(app).delete(`/api/banner/delete/sd5865`)
			
	// 		expect(response.statusCode).toBe(500)
	// 	})
	// })

});