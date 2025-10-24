const request = require('supertest');
const { app, resetStore } = require('./app');

beforeEach(() => resetStore());

describe('Calculator API', () => {
  test('POST /add returns correct sum', async () => {
    const res = await request(app).post('/add').send({ a: 5, b: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(8);
  });

  test('POST /subtract returns correct difference', async () => {
    const res = await request(app).post('/subtract').send({ a: 10, b: 6 });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(4);
  });

  test('POST /multiply returns correct product', async () => {
    const res = await request(app).post('/multiply').send({ a: 2, b: 4 });
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(8);
  });

  test('POST /calculations stores and returns calculation', async () => {
    const res = await request(app).post('/calculations').send({ op: 'add', a: 2, b: 3 });
    expect(res.statusCode).toBe(201);
    expect(res.body.result).toBe(5);
    expect(res.body.id).toBe(1);
  });

  test('DELETE /calculations/:id deletes a calculation', async () => {
    await request(app).post('/calculations').send({ op: 'multiply', a: 3, b: 3 });
    const del = await request(app).delete('/calculations/1');
    expect(del.statusCode).toBe(204);
  });

  test('returns 400 for invalid numbers', async () => {
    const res = await request(app).post('/add').send({ a: 'abc', b: 3 });
    expect(res.statusCode).toBe(400);
  });
});

test('POST /modulus returns correct remainder', async () => {
  const res = await request(app).post('/modulus').send({ a: 10, b: 3 });
  expect(res.statusCode).toBe(200);
  expect(res.body.result).toBe(1);
});
