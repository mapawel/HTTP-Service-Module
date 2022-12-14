import { AxiosResponse } from 'axios';
import chai, { assert, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nock from 'nock';
import { HttpService } from '../HttpService';

chai.use(chaiAsPromised);

describe('Http Service:', () => {
  //arrange
  const nockServerWhBasePath: nock.Scope = nock('http://basepath.com');
  nockServerWhBasePath.get('/testroute').times(2).reply(200, {
    bodyKey: 'exampleDataInBody',
  });
  nockServerWhBasePath.post('/testroute').times(2).reply(201);
  nockServerWhBasePath.delete('/testroute').reply(202);

  const myHttpService: HttpService = HttpService.getInstance({
    baseURL: 'http://basepath.com',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'example-token',
      'Other-example-header': 'example-value1',
    },
  });

  context('GET method:', () => {
    it('should response with status 200 and data', async () => {
      //Act
      const res: AxiosResponse = await myHttpService.get(
        '/testroute',
        {
          headers: { 'example-methodCall-header': 'example-value2' },
        }
      );

      //Assert
      assert.equal(res.status, 200);
      assert.deepEqual(res.data, { bodyKey: 'exampleDataInBody' });
    });

    it('should return Http Service Error', async () => {
      //Act+Assert
      await expect(
        myHttpService.get('/testroute', { baseURL: 'wrongURL' })
      ).to.be.rejectedWith(`Invalid URL`);
    });
  });

  context('POST method:', () => {
    it('should response with status 201', async () => {
      //Act
      const res: AxiosResponse = await myHttpService.post(
        '/testroute',
        { q: 'data' },
        {
          headers: { 'example-methodCall-header': 'example-value2' },
        }
      );
      //Assert
      assert.equal(res.status, 201);
    });

    it('should return Http Service Error', async () => {
      //Act+assert
      await expect(
        myHttpService.post('/testroute', {}, { baseURL: 'wrongURL' })
      ).to.be.rejectedWith(`Invalid URL`);
    });
  });

  context('DELETE method:', () => {
    it('should response with status 202', async () => {
      //Act
      const res: AxiosResponse = await myHttpService.delete(
        '/testroute',
        {
          headers: { 'example-methodCall-header': 'example-value2' },
        }
      );
      //Assert
      assert.equal(res.status, 202);
    });
    it('should return Http Service Error', async () => {
      //Act+assert
      await expect(
        myHttpService.delete('/testroute', { baseURL: 'wrongURL' })
      ).to.be.rejectedWith(`Invalid URL`);
    });
  });
});
