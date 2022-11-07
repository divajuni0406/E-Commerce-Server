const request = require("supertest");
const app = require("../app");
jest.setTimeout(30000);

const mongoose = require("mongoose");
require("dotenv").config();

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGQwMzNiYTVkNjgzMzEwZWYwMzA5YSIsInVzZXJuYW1lIjoienhjenhjIiwiZW1haWwiOiJ6eGN6eGNAenhjIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY3NDA3ODkzLCJleHAiOjE2Njc0OTQyOTN9.WHlE-Jr9uLoI0FWM0AfJIFt0tHRfRZ1DRraLZcTPhIY`
const id = `63638b73bd4b05f0f854d098`

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

describe('CRUD blog', () => {
	describe('get all articles', () => {
		test('should return 200 and get all blogs data', async () => {
			const response = await request(app).get('/api/blog/articles')

			// console.log(response._body.result.length)
			expect(response.statusCode).toBe(200)
			expect(response._body.result.length).toBeGreaterThan(5)
		})

		test('should return 200 and get blogs data by page', async () => {
			const response = await request(app).get('/api/blog/articles?page=1')

			expect(response.statusCode).toBe(200)
			expect(response._body.result.length).toBe(5)
		})

		// test('should return 500', async () => {
		// 	// const asyncMock = 
		// 	jest
		// 		.fn()
		// 		.mockRejectedValue(new Error('Async error message'))
		// 	// await asyncMock()

		// 	await request(app)
		// 		.get('/api/blog/articles?page=1')
		// 		.expect(500)

		// 	// expect(response.statusCode).toBe(500)
		// })




	})

	describe('get article by id', () => {
		test('should return 200 and get article by id', async () => {
			const response = await request(app).get(`/api/blog/articles/${id}`)
			expect(response.statusCode).toBe(200)
			expect(response._body.result._id).toBe(`${id}`)
		})

		test('should return 404 and not get article', async () => {
			const response = await request(app).get(`/api/blog/articles/123`)
			expect(response.statusCode).toBe(404)
		})
	})

	describe('create articles', () => {
		test('should return 200 and create article if user is admin', async () => {
			const response = await request(app)
				.post('/api/blog/create-article')
				.send({
					"content": "Test Create Jest",
					"category": "Photography",
					"tag": [
						"Trends",
						"Photography"
					],
					"image": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_750,h_480/https://demo.uix.store/sober/wp-content/uploads/sites/2/2012/11/4-750x480.jpg",
					"title": "2017 Fashion Trends for Jewelry"
				})
				.set("Authorization", `Bearer ${token}`)
			expect(response.statusCode).toBe(200);
		})

		test('should return 200 and create article with empty data if user is admin', async () => {
			const response = await request(app)
				.post('/api/blog/create-article')
				.set("Authorization", `Bearer ${token}`)
			expect(response.statusCode).toBe(200);
		})


		test('should return 200 and failed to create article if user is not admin and token not set', async () => {
			const response = await request(app)
				.post('/api/blog/create-article')
				.send({
					"content": "Test Create Jest",
					"category": "Photography",
					"tag": [
						"Trends",
						"Photography"
					],
					"image": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_750,h_480/https://demo.uix.store/sober/wp-content/uploads/sites/2/2012/11/4-750x480.jpg",
					"title": "2017 Fashion Trends for Jewelry"
				})
			expect(response.statusCode).toBe(302);
		})

		test('should return 200 and failed to create article if token is wrong', async () => {
			const response = await request(app)
				.post('/api/blog/create-article')
				.send({
					"content": "Test Create Jest",
					"category": "Photography",
					"tag": [
						"Trends",
						"Photography"
					],
					"image": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_750,h_480/https://demo.uix.store/sober/wp-content/uploads/sites/2/2012/11/4-750x480.jpg",
					"title": "2017 Fashion Trends for Jewelry"
				})
				.set("Authorization", `Bearer 3g3rg3r`)
			expect(response.statusCode).toBe(302);
		})
	});

	describe('edit article', () => {
		test('should return 200 and edit article if user is admin', async () => {
			const response = await request(app)
				.patch(`/api/blog/articles/update/${id}`)
				.send({
					"content": "Test Edit Jest",
					"category": "Photography",
					"tag": [
						"Trends",
						"Photography"
					],
					"image": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_750,h_480/https://demo.uix.store/sober/wp-content/uploads/sites/2/2012/11/4-750x480.jpg",
					"title": "2017 Fashion Trends for Jewelry"
				})
				.set("Authorization", `Bearer ${token}`)
			expect(response.statusCode).toBe(200);
		});

		test('should return 200 and edit article if user is not admin and token not set', async () => {
			const response = await request(app)
				.patch(`/api/blog/articles/update/${id}`)
				.send({
					"content": "Test Edit Jest",
					"category": "Photography",
					"tag": [
						"Trends",
						"Photography"
					],
					"image": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_750,h_480/https://demo.uix.store/sober/wp-content/uploads/sites/2/2012/11/4-750x480.jpg",
					"title": "2017 Fashion Trends for Jewelry"
				})
			expect(response.statusCode).toBe(302);
		});

		test('should return 200 and edit article if token is wrong', async () => {
			const response = await request(app)
				.patch(`/api/blog/articles/update/${id}`)
				.send({
					"content": "Test Edit Jest",
					"category": "Photography",
					"tag": [
						"Trends",
						"Photography"
					],
					"image": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_750,h_480/https://demo.uix.store/sober/wp-content/uploads/sites/2/2012/11/4-750x480.jpg",
					"title": "2017 Fashion Trends for Jewelry"
				})
				.set("Authorization", `Bearer 34g34`)
			expect(response.statusCode).toBe(302);
		});
	});

	describe('delete article', () => {
		test('should return 200 and delete article is user is admin', async () => {
			const response = await request(app)
				.delete(`/api/blog/articles/delete/${id}`)
				.set("Authorization", `Bearer ${token}`)
			expect(response.statusCode).toBe(200);
		})

		test('should return 404 if article not exist', async () => {
			const response = await request(app)
				.delete(`/api/blog/articles/delete/123`)
				.set("Authorization", `Bearer ${token}`)
			expect(response.statusCode).toBe(404);
		})

		test('should return 302 and should not delete article if user is not admin', async () => {
			const response = await request(app)
				.delete(`/api/blog/articles/delete/${id}`)
			expect(response.statusCode).toBe(302);
		})
	})
});