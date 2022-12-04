import { assert } from 'chai';
import nock from 'nock';
import { HttpService } from '../HttpService';

describe('Http Service:', () => {
  //arrange
  const nockServerWhBasePath = nock('http://basepath.com');
  nockServerWhBasePath.get('/testroute').reply(200, {
    bodyKey: 'exampleDataInBody',
  });
  nockServerWhBasePath.post('/testroute').reply(201);
  nockServerWhBasePath.delete('/testroute').reply(202);

  const myHttpService = HttpService.getInstance({
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
      const res = await myHttpService.get('/testroute', {
        headers: { 'example-methodCall-header': 'example-value2' },
      });

      //Assert
      assert.equal(res.status, 200);
      assert.deepEqual(res.data, { bodyKey: 'exampleDataInBody' });
    });
    it('should return Http Service Error', async () => {
      //Act+Assert
      assert.throws(() => {})
    });
  });

  context('POST method:', () => {
    it('should response with status 201', async () => {
      //Act
      const res = await myHttpService.post(
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
      //Act
      try {
        const res = await myHttpService.post('', {});
        //Assert
        assert.equal(res.status, 200);
        assert.deepEqual(res.data, { bodyKey: 'exampleDataInBody' });
      } catch (err: unknown) {
        if (err instanceof Error) {
          return assert.equal('Provide the method with an URL...', err.message);
        }
      }
    });
  });

  context('DELETE method:', () => {
    it('should response with status 202', async () => {
      //Act
      const res = await myHttpService.delete('/testroute', {
        headers: { 'example-methodCall-header': 'example-value2' },
      });
      //Assert
      assert.equal(res.status, 202);
    });
    it('should return Http Service Error', async () => {
      //Act
      try {
        const res = await myHttpService.delete('');
        //Assert
        assert.equal(res.status, 200);
        assert.deepEqual(res.data, { bodyKey: 'exampleDataInBody' });
      } catch (err: unknown) {
        if (err instanceof Error) {
          return assert.equal('Provide the method with an URL...', err.message);
        }
      }
    });
  });
});
