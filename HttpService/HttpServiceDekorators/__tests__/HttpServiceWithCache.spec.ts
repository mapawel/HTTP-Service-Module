import { AxiosResponse } from 'axios';
import chai, { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nock from 'nock';
import { HttpService } from '../../../HttpService/HttpService';
import { HttpServiceWithCache } from '../../../HttpService/HttpServiceDekorators/HttpServiceWithCache';

chai.use(chaiAsPromised);

describe('Http Service with Cache:', () => {
  // arrange
  const nockServerWhBasePath: nock.Scope = nock('http://basepath.com');
  nockServerWhBasePath.get('/testrouteCache').times(1).reply(200, {
    bodyKey: 'exampleDataInBody',
  });

  const myHttpService: HttpService = HttpService.getInstance({
    baseURL: 'http://basepath.com',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'example-token',
      'Other-example-header': 'example-value1',
    },
  });
  const myDecoratedHttpService: HttpServiceWithCache = new HttpServiceWithCache(
    myHttpService
  );

  //Act
  context('GET method (cached response):', () => {
    it('should response with status 200 and data 2 times with just call to external API', async () => {
      await myDecoratedHttpService.get('/testrouteCache', {
        headers: { 'example-methodCall-header': 'example-value2' },
      });

      const res2: AxiosResponse = await myDecoratedHttpService.get(
        '/testrouteCache',
        {
          headers: { 'example-methodCall-header': 'example-value2' },
        }
      );

      //Assert
      assert.equal(res2.status, 200);
      assert.deepEqual(res2.data, { bodyKey: 'exampleDataInBody' });
    });

    it('should return Http Service Error', async () => {
      //Act+Assert
      await expect(
        myDecoratedHttpService.get('/testrouteCache', { baseURL: 'wrongURL' })
      ).to.be.rejectedWith(`Invalid URL`);
    });
  });
});
