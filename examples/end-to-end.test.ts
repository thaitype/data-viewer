import { describe, expect, test } from 'vitest';
import request from 'supertest';
import app from './end-to-end';

describe('GET /', () => {
  test('responds status should be 200', async done => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
