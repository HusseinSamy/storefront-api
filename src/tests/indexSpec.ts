import app from '../server';
import supertest from 'supertest';


const request = supertest(app);

describe('API endpoint tests suite', () => {
    describe('Status Codes tests for /users', () => {
        it('expects to return 200', async () => {
            const response = await request.post('/users')
            .set("content-type","application/json")
            .send(JSON.stringify({firstName: "test", lastName: "user", password: "test"}));
            expect(response.status).toBe(200);
        });
        it('expects to return 400', async () => {
            const response = await request.post('/users')
            .set("content-type","application/json")
            .send(JSON.stringify({firstNaame: 'test2', lastName: 'user2', password: 'test'}));
            expect(response.status).toBe(400);
        });
        it('expects to return 401', async () => {
            const response = await request.get('/users');
            expect(response.status).toBe(401);
        });
        it('expects to return 401', async () => {
            const response = await request.get('/users/1');
            expect(response.status).toBe(401);
        });
    });    

    describe('Status Codes tests for /products', () => {
        it('expects to return 401', async () => {
            const response = await request.post('/products')
            .set("content-type","application/json")
            .send(JSON.stringify({name: "test", price: 299, category: "test"}));
            expect(response.status).toBe(401);
        });
        it('expects to return 200', async () => {
            const response = await request.get('/products')
            expect(response.status).toBe(200);
        });
        it('expects to return 400', async () => {
            const response = await request.get('/products/a');
            expect(response.status).toBe(400);
        });
        it('expects to return 200', async () => {
            const response = await request.get('/products/1');
            expect(response.status).toBe(200);
        });
        it('expects to return 200', async () => {
            const response = await request.get('/products/productByCategory');
            expect(response.status).toBe(200);
        });
        it('expects to return 200', async () => {
            const response = await request.get('/products/top5');
            expect(response.status).toBe(200);
        });
    });    
    describe('Status Codes tests for /orders', () => {
        it('expects to return 401', async () => {
            const response = await request.post('/orders')
            .set("content-type","application/json")
            .send(JSON.stringify({status: "completed"}));
            expect(response.status).toBe(401);
        });
        it('expects to return 401', async () => {
            const response = await request.get('/orders/2')
                expect(response.status).toBe(401);
        });
        it('expects to return 401', async () => {
            const response = await request.get('/orders/1/products')
            expect(response.status).toBe(401);
        });
        it('expects to return 401', async () => {
            const response = await request.get('/orders/completedOrdersByUser/1')
            expect(response.status).toBe(401);
        });
    });    
});
