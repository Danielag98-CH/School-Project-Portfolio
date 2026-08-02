require("dotenv").config();
const supertest = require("supertest");
const app = require("../src/app.js");

const agent = supertest.agent(app);

describe('Soap API Tests', () => {
    
    let newId;

    describe('GET /soap', () => {
        it('returns 200 and list', async () => {
            const res = await agent.get('/soap');
            expect(res.status).toBe(200);
            const list = res.body;
            expect(Array.isArray(list)).toBe(true);
            if (list.length) {
                expect(list[0]).toHaveProperty('soap_id');
                expect(list[0]).toHaveProperty('soap_name');
                expect(list[0]).toHaveProperty('description');
                expect(list[0]).toHaveProperty('created_by');
            }
        });
    });

    describe('GET /soap/:id', () => {
        it('returns soap by id', async () => {
            const res = await agent.get('/soap/2');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('soap_id', 2);
            expect(res.body).toHaveProperty('soap_name', 'Rose Radiance');
            expect(res.body).toHaveProperty('created_by', 3);
        });

        it('returns 404 if not found', async () => {
            const res = await agent.get('/soap/999999');
            expect(res.status).toBe(404);
        });
    });

    describe('POST /soap', () => {
        it('inserts and returns 201 with id', async () => {
            const payload = {
                soap_name: 'API Test Soap',
                description: 'gentle',
                created_by: 1
        };
            const res = await agent.post('/soap').send(payload);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
            newId = res.body.id;
            expect(newId).toBeGreaterThan(0);
        });

        it('returns 400 if invalid', async () => {
            const bad = { soap_name: '', description: 'x'.repeat(200), created_by: 0 };
            const res = await agent.post('/soap').send(bad);
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('message', 'failed - invalid');
            expect(res.body).toHaveProperty('errors');
        });
    });

    describe('PUT /soap/:id', () => {
        it('updates and returns 200', async () => {
            const update = { soap_id: newId, soap_name: 'Updated Soap', description: 'updated', created_by: 1 };
            const res = await agent.put(`/soap/${newId}`).send(update);
            expect(res.status).toBe(200);
            expect(res.body.message).toBe('success');
        });

        it('returns 400 on id mismatch', async () => {
            const bad = { soap_id: newId + 1, soap_name: 'Mismatch', description: 'no', created_by: 1 };
            const res = await agent.put(`/soap/${newId}`).send(bad);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('failed - id mismatch');
        });
    });

    describe('DELETE /soap/:id', () => {
        it('deletes and returns 200', async () => {
            const res = await agent.delete(`/soap/${newId}`);
            expect(res.status).toBe(200);
            expect(res.body.message).toBe('success');
        });

        it('returns 400 for non-existing id', async () => {
            const res = await agent.delete('/soap/999999');
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('failed');
        });
    });
});
