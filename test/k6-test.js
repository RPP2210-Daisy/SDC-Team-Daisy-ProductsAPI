import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '30s',
};

export default function () {
  const response = http.get('http://localhost:3000/products');
  sleep(1);
}
