import { describe, expect, it, test } from 'vitest';
import request from 'supertest';
import app from './main';


describe('GET /', () => {
  test('responds status should be 200', async done => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
