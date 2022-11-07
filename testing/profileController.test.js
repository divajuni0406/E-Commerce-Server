const request = require("supertest");
const app = require("../app");
jest.setTimeout(30000);

const mongoose = require("mongoose");
require("dotenv").config();

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjhiM2VkMmIzYWVkNWU5MGU0YTM2NyIsInVzZXJuYW1lIjoibWl5YWJpIiwiZW1haWwiOiJtaXlhYmlAaGFoYS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY2NzgwNjIwOCwiZXhwIjoxNjY3ODkyNjA4fQ.k3_ZeBKePxUxKErCRAv7An9_VVojR_ArdNzntLSZErM`
const id = `6368b3ed2b3aed5e90e4a367`

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

describe('Profile API', () => {
	describe('get user data byId', () => {
		test('should return 200 and get userData by id', async () => {
            const response = await request(app).get(`/api/profile/${id}`)
            .set("Authorization", `Bearer ${token}`)

			// console.log(response._body.result.length)
			expect(response.statusCode).toBe(200)
		})

		test('should return 500 and failed get data ', async () => {
			const response = await request(app).get('/api/profile/a32423idj')
            .set("Authorization", `Bearer ${token}`)
			expect(response.statusCode).toBe(400)
		})

    })
    
	describe('update user data byId', () => {
		test('should return 200 and get userData by id', async () => {
            const response = await request(app).post(`/api/profile/update/${id}`)
            .send({
                username: "nana",
                name: "gusion"
            })
            .set("Authorization", `Bearer ${token}`)

			// console.log(response._body.result.length)
			expect(response.statusCode).toBe(200)
		})

		test('should return 500 and failed get data ', async () => {
            const response = await request(app).post(`/api/profile/update/5565asdsd`)
            .send({
                usernamed: "nana",
                namex: "gusion"
            })
            .set("Authorization", `Bearer ${token}`)
			expect(response.statusCode).toBe(400)
		})

	})
	describe('Change user password byId', () => {
		test('should return 200 and change pw by id', async () => {
            const response = await request(app).post(`/api/profile/settings/${id}`)
            .send({
                oldPassword: "miyabi123123",
                newPassword: "chou123123"
            })
            .set("Authorization", `Bearer ${token}`)

			// console.log(response._body.result.length)
			expect(response.statusCode).toBe(200)
		})

		test('should return 500 and failed get data ', async () => {
            const response = await request(app).post(`/api/profile/settings/${id}`)
            .send({
                oldPassword: "miyabi123123",
                newPassword: "chou123123"
            })
            .set("Authorization", `Bearer ${token}`)
			expect(response.statusCode).toBe(400)
		})

	})

});
