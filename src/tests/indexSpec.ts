import app from '../server';
import supertest from 'supertest';


const request = supertest(app);

describe('API endpoint tests suite', () => {
    describe('Status Codes tests for /users', () => {
        it('expects to return 200', async () => {
            const response = await request.post('/users',).send(JSON.stringify({firstName: "test", lastName: "user", password: "test"   }));
            expect(response.status).toBe(200);
        });
        it('expects to return 404', async () => {
            const response = await request.post('/users',).send(JSON.stringify({firstNaame: 'test', lastName: 'user', password: 'test'}));
            expect(response.status).toBe(404);
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
    // });
    
});
