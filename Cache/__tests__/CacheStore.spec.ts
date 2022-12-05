import { AxiosResponse } from 'axios';
import { assert } from 'chai';
import { CacheStore } from '../CacheStore';
import { MockItem } from './MockItemType';

describe('CacheStore:', () => {
  //Arrange
  let getOperationResponses: boolean[];
  let deleteOperationResponse: boolean;
  const cacheStore: CacheStore = CacheStore.getInstance();
  const mockUrlAndResponsePairs: MockItem[] = [
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

  it('should add HTTP response to Cache Store with use of addToCache() and should be able to return cache data using getCachedData()', () => {
    // Act
    getOperationResponses = mockUrlAndResponsePairs.map((mock: MockItem) =>
      cacheStore.addToCache(mock.requestFullUrl, mock.response as AxiosResponse)
    );
    mockUrlAndResponsePairs.forEach((mock: MockItem, i: number) => {
      const cachedResponse: false | AxiosResponse = cacheStore.getCachedData(mock.requestFullUrl);
      // Assert
      assert.deepEqual(
        cachedResponse,
        mockUrlAndResponsePairs[i].response as AxiosResponse
      );
    });
  });

  it('Module response should be "true" on success of addToCache()', () => {
    getOperationResponses.forEach((resp: boolean) => assert.equal(resp, true));
  });

  it('Module response should be "false" on fail of addToCache() (trying to save the same key againg)', () => {
    assert.equal(
      cacheStore.addToCache(
        mockUrlAndResponsePairs[0].requestFullUrl,
        mockUrlAndResponsePairs[0].response as AxiosResponse
      ),
      false
    );
  });

  it('Module response should be "false" on fail of getCachedData() (after passing not existing key)', () => {
    assert.equal(
      cacheStore.getCachedData(
        mockUrlAndResponsePairs[0].requestFullUrl + 'notExisting'
      ),
      false
    );
  });

  it('should remove key-value pair from Cache Store with use of removeCachedData()', () => {
    // Act
    deleteOperationResponse = cacheStore.removeCachedData(
      mockUrlAndResponsePairs[0].requestFullUrl
    );
    //assert
    const cacheResponse: false | AxiosResponse = cacheStore.getCachedData(
      mockUrlAndResponsePairs[0].requestFullUrl
    );
    assert.equal(deleteOperationResponse, true);
    assert.equal(cacheResponse, false);
  });

  it('should return "true" on success of removeCachedData()', () => {
    //assert
    assert.equal(deleteOperationResponse, true);
  });

  it('should return "false" on fail of removeCachedData()', () => {
    //assert
    assert.equal(
      cacheStore.removeCachedData(mockUrlAndResponsePairs[0].requestFullUrl),
      false
    );
  });

  it('should throw Error from getCachedData mathod when not url key passed', () => {
    // Act+assert
    assert.throws(() => cacheStore.getCachedData(''), 'Invalid URL');
  });

  it('should throw Error from addToCache mathod when not url key passed', () => {
    // Act+assert

    assert.throws(
      () => cacheStore.addToCache('', {} as AxiosResponse),
      'Invalid URL'
    );
  });

  it('should throw Error from removeCachedData mathod when not url key passed', () => {
    // Act+assert
    assert.throws(() => cacheStore.removeCachedData(''), 'Invalid URL');
  });
});
