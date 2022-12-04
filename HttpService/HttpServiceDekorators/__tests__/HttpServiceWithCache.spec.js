import { assert } from 'chai';
import nock from 'nock';
import { HttpService } from '../../../dist/HttpService/HttpService.js';
import { HttpServiceWithCache } from '../../../dist/HttpService/HttpServiceDekorators/HttpServiceWithCache.js';

describe('Http Service with Cache:', () => {
  //arrange
  const nockServerWhBasePath = nock('http://basepath.com');
  nockServerWhBasePath.get('/testroute').times(1).reply(200, {
    bodyKey: 'exampleDataInBody',
  });

  const myHttpService = new HttpService({
    baseURL: 'http://basepath.com',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'example-token',
      'Other-example-header': 'example-value1',
    },
  });
  const myDecoratedHttpService = new HttpServiceWithCache(myHttpService);

  //Act
  context('GET method:', () => {
    it('should response with status 200 and data 2 times even if API works only 1 time.', async () => {
      await myDecoratedHttpService.get('/testroute', {
        headers: { 'example-methodCall-header': 'example-value2' },
      });
      const res2 = await myDecoratedHttpService.get('/testroute', {
        headers: { 'example-methodCall-header': 'example-value2' },
      });

      //Assert
      assert.equal(res2.status, 200);
      assert.deepEqual(res2.data, { bodyKey: 'exampleDataInBody' });
    });
  });
});
