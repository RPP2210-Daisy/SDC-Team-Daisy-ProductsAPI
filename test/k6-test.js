import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Trend } from 'k6/metrics';

const r1Latency = new Trend('R1 Latency');
const r2Latency = new Trend('R2 Latency');
const r3Latency = new Trend('R3 Latency');
const r4Latency = new Trend('R4 Latency');

const errorRate = new Counter('Error Rate');

function checkStatus(res, routeName) {
  const isSuccess = res.status === 200;
  if (!isSuccess) {
    errorRate.add(1);
  }
  check(res, {
    [`${routeName} status is 200`]: () => isSuccess,
  });
}

export const options = {
  vus: 500,
  duration: '30s',
};

export default function () {
  const prodID = Math.floor(Math.random() * 100000);

  const res1 = http.get('http://localhost:3000/products');
  const res2 = http.get(`http://localhost:3000/products/${prodID}`);
  const res3 = http.get(`http://localhost:3000/products/${prodID}/styles`);
  const res4 = http.get(`http://localhost:3000/products/${prodID}/related`);

  check(res1, {
    'route1 status is 200': (r) => r.status === 200,
  });
  check(res2, {
    'route2 status is 200': (r) => r.status === 200,
  });
  check(res3, {
    'route3 status is 200': (r) => r.status === 200,
  });
  check(res4, {
    'route4 status is 200': (r) => r.status === 200,
  });

  // Check status and track error rate
  checkStatus(res1, 'route1');
  checkStatus(res2, 'route2');
  checkStatus(res3, 'route3');
  checkStatus(res4, 'route4');

  // Track query latency
  r1Latency.add(res1.timings.waiting);
  r2Latency.add(res2.timings.waiting);
  r3Latency.add(res3.timings.waiting);
  r4Latency.add(res4.timings.waiting);

  sleep(1);
}
