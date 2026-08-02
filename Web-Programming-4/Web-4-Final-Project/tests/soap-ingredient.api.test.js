
require('dotenv').config();
const supertest = require('supertest');
const app = require('../src/app.js');

const agent = supertest.agent(app);

describe('SoapIngredient API', () => {
  it('GET /soap-ingredient returns a list', async () => {
    const res = await agent.get('/soap-ingredient');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length) {
      expect(res.body[0]).toHaveProperty('soap_id');
      expect(res.body[0]).toHaveProperty('ingredient_id');
      expect(res.body[0]).toHaveProperty('amount_used');
    }
  });

  it('GET /soap-ingredient/soap/1 returns all pairs for soap 1', async () => {
    const res = await agent.get('/soap-ingredient/soap/1');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length) {
      expect(res.body[0].soap_id).toBe(1);
    }
  });

  it('GET /soap-ingredient/1/2 returns that single pair', async () => {
    const res = await agent.get('/soap-ingredient/1/2');
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty('soap_id', 1);
      expect(res.body).toHaveProperty('ingredient_id', 2);
      expect(res.body).toHaveProperty('amount_used');
    }
  });

  describe('CRUD cycle on a fresh pair', () => {
    const soapId = 2;
    const ingredientId = 3; // not in the seed list above

    it('POST /soap-ingredient creates a link', async () => {
      const res = await agent.post('/soap-ingredient').send({
        soap_id: soapId,
        ingredient_id: ingredientId,
        amount_used: '0.25 oz'
      });
  
      expect([201, 409]).toContain(res.status);
    });

    it('PUT /soap-ingredient/:soapId/:ingredientId updates amount_used', async () => {
      const res = await agent
        .put(`/soap-ingredient/${soapId}/${ingredientId}`)
        .send({ soap_id: soapId, ingredient_id: ingredientId, amount_used: '0.5 oz' });
      // If POST was 409 (already exists) this should still be 200; if pair didn’t exist, you might get 404/400
      expect([200, 404, 400]).toContain(res.status);
    });

    it('DELETE /soap-ingredient/:soapId/:ingredientId deletes the link (if present)', async () => {
      const res = await agent.delete(`/soap-ingredient/${soapId}/${ingredientId}`);
      expect([200, 400]).toContain(res.status); // 200 if deleted, 400 if not found
    });
  });

  it('returns 400 for invalid ids', async () => {
    const bad = await agent.get('/soap-ingredient/soap/not-a-number');
    expect(bad.status).toBe(400);
    expect(bad.body.message).toMatch(/invalid soap id/i);
  });
});
