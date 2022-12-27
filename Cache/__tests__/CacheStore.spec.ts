import { AxiosResponse } from 'axios';
import { assert } from 'chai';
import { CacheStore } from '../CacheStore.class';
import { MockItem } from './MockItemType';

//setup
before(function () {
  this.getOperationResponses = [];
  this.deleteOperationResponse;
  this.cacheStore = CacheStore.getInstance();
  this.mockUrlAndResponsePairs = [
    {
      requestFullUrl: 'https://test.pl/a',
      response: {
        data: {
          keyA: 'dataForKeyA',
        },
      },
    },
    {
      requestFullUrl: 'https://test.pl/b',
      response: {
        data: {
          keyB: 'dataForKeyB',
        },
      },
    },
  ];
});

describe('CacheStore:', function () {
  it('should add HTTP response to Cache Store with use of addToCache() and should be able to return cache data using getCachedData()', function () {
    // Act
    this.mockUrlAndResponsePairs.forEach((mock: MockItem) =>
      this.getOperationResponses.push(
        this.cacheStore.addToCache(
          mock.requestFullUrl,
          mock.response as AxiosResponse
        )
      )
    );
    this.mockUrlAndResponsePairs.forEach((mock: MockItem, i: number) => {
      const cachedResponse: false | AxiosResponse =
        this.cacheStore.getCachedData(mock.requestFullUrl);
      // Assert
      assert.deepEqual(
        cachedResponse,
        this.mockUrlAndResponsePairs[i].response as AxiosResponse
      );
    });
  });

  it('Module response should be "true" on success of addToCache()', function () {
    this.getOperationResponses.forEach((resp: boolean) =>
      assert.equal(resp, true)
    );
  });

  it('Module response should be "false" on fail of addToCache() (trying to save the same key againg)', function () {
    assert.equal(
      this.cacheStore.addToCache(
        this.mockUrlAndResponsePairs[0].requestFullUrl,
        this.mockUrlAndResponsePairs[0].response as AxiosResponse
      ),
      false
    );
  });

  it('Module response should be "false" on fail of getCachedData() (after passing not existing key)', function () {
    assert.equal(
      this.cacheStore.getCachedData(
        this.mockUrlAndResponsePairs[0].requestFullUrl + 'notExisting'
      ),
      false
    );
  });

  it('should remove key-value pair from Cache Store with use of removeCachedData()', function () {
    // Act
    this.deleteOperationResponse = this.cacheStore.removeCachedData(
      this.mockUrlAndResponsePairs[0].requestFullUrl
    );
    //assert
    const cacheResponse: false | AxiosResponse = this.cacheStore.getCachedData(
      this.mockUrlAndResponsePairs[0].requestFullUrl
    );
    assert.equal(this.deleteOperationResponse, true);
    assert.equal(cacheResponse, false);
  });

  it('should return "true" on success of removeCachedData()', function () {
    //assert
    assert.equal(this.deleteOperationResponse, true);
  });

  it('should return "false" on fail of removeCachedData()', function () {
    //assert
    assert.equal(
      this.cacheStore.removeCachedData(
        this.mockUrlAndResponsePairs[0].requestFullUrl
      ),
      false
    );
  });

  it('should throw Error from getCachedData mathod when not url key passed', function () {
    // Act+assert
    assert.throws(() => this.cacheStore.getCachedData(''), 'Invalid URL');
  });

  it('should throw Error from addToCache mathod when not url key passed', function () {
    // Act+assert

    assert.throws(
      () => this.cacheStore.addToCache('', {} as AxiosResponse),
      'Invalid URL'
    );
  });

  it('should throw Error from removeCachedData mathod when not url key passed', function () {
    // Act+assert
    assert.throws(() => this.cacheStore.removeCachedData(''), 'Invalid URL');
  });
});
