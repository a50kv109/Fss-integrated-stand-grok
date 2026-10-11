import request from 'supertest';
import { app } from '../../server';
import assert from 'node:assert';

async function runTests() {
  console.log('Running API tests...');

  // 1. Payload too large
  const largePayload = {
    operations: Array(5000).fill({ W: [[1,0,0],[0,1,0],[0,0,1]], w: [{numerator:0,denominator:1},{numerator:0,denominator:1},{numerator:0,denominator:1}] })
  };
  const res1 = await request(app).post('/api/classify').send(largePayload);
  assert.strictEqual(res1.status, 413, 'Should return 413 for payload > 100kb');
  console.log('  ✓ T1: Payload too large handled');

  // 2. Limit exceeded
  const payload = {
    operations: Array(51).fill({ W: [[1,0,0],[0,1,0],[0,0,1]], w: [{numerator:0,denominator:1},{numerator:0,denominator:1},{numerator:0,denominator:1}] })
  };
  const res2 = await request(app).post('/api/classify').send(payload);
  assert.strictEqual(res2.status, 400, 'Should return 400 for > 50 operations');
  assert.strictEqual(res2.body.error, 'OPERATION_LIMIT_EXCEEDED');
  console.log('  ✓ T2: Limit exceeded handled');

  // 3. Valid request
  const payload3 = {
    operations: [{ W: [[1,0,0],[0,1,0],[0,0,1]], w: [{numerator:0,denominator:1},{numerator:0,denominator:1},{numerator:0,denominator:1}] }]
  };
  const res3 = await request(app).post('/api/classify').send(payload3);
  assert.strictEqual(res3.status, 200, 'Should return 200 for valid request');
  console.log('  ✓ T3: Valid request handled');
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});
