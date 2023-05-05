import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 3,
  duration: '30s',
};

export default function () {
  const prodID = Math.floor(Math.random() * 100000);
  console.log('product', prodID)

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

  sleep(1);
}
