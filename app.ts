import dotenv from 'dotenv';
import { HttpService } from './HttpService/HttpService.js';
import { HttpServiceWithCache } from './HttpService/HttpServiceDekorators/HttpServiceWithCache.js';
dotenv.config();

if (process.env.EXAMPLE_BASEURL1) {
  (async () => {
    try {
      const myHttpService = HttpService.getInstance({
        baseURL: process.env.EXAMPLE_BASEURL1,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'example-token',
          'Other-example-header': 'example-value1',
        },
      });

      const myDecoratedHttpService = new HttpServiceWithCache(myHttpService);

      const response1 = await myDecoratedHttpService.get('/testroute', {
        headers: { 'example-methodCall-header': 'example-value2' },
      });
      console.log('response1 ----> ', response1.status);

      const response2 = await myDecoratedHttpService.get('/testroute', {
        headers: { 'example-methodCall-header': 'example-value2' },
      });
      console.log('response2 ----> ', response2.status);

      const response3 = await myDecoratedHttpService.get('/testroute', {
        headers: { 'example-methodCall-header': 'example-value2' },
      });
      console.log('response3 ----> ', response3.status);

      const response4 = await myDecoratedHttpService.post(
        '/testroute',
        { q: 'data', w: false },
        { headers: { 'example-methodCall-header': 'example-value2' } }
      );
      console.log('response4 ----> ', response4.status);

      const response5 = await myDecoratedHttpService.delete('/testroute', {
        headers: { 'example-methodCall-header': 'example-value2' },
      });
      console.log('response5 ----> ', response5.status);
    } catch (err: unknown) {
      if (err instanceof Error)
        throw new Error(
          `Error in test block in app main file. ${err?.message}`
        );
    }
  })();
} else {
  console.log('Run tests or deliver a real API endpoint to .env');
}
