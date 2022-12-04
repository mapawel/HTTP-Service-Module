import { AxiosResponse } from 'axios';
import { assert } from 'chai';
import { CacheStore } from '../CacheStore';

describe('CacheStore:', () => {
  //Arrange
  const cacheStore = CacheStore.getInstance();
  const mockUrlAndResponsePairs = [
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

  it('should add Response to Cache Store with use of addToCache() and should be able to return cache data using getCachedData()', () => {
    // Act
    mockUrlAndResponsePairs.forEach((mock) =>
      cacheStore.addToCache(mock.requestFullUrl, mock.response as AxiosResponse)
    );
    mockUrlAndResponsePairs.forEach((mock, i) => {
      const cachedResponse = cacheStore.getCachedData(mock.requestFullUrl);
      // Assert
      assert.deepEqual(
        cachedResponse,
        mockUrlAndResponsePairs[i].response as AxiosResponse
      );
    });
  });

  it('should return validator error while passing empty path as a key', () => {
    // Act+assert

    assert.throws(
      () => cacheStore.addToCache('', {} as AxiosResponse),
      'Empty string as a key for cache not accepted.'
    );
  });

  it('should remove key-value pair from Cache Store with use of removeCachedData()', () => {
    // Act
    cacheStore.removeCachedData('https://test.pl/a');
    //assert
    const cacheResponse = cacheStore.getCachedData('https://test.pl/a');
    assert.equal(cacheResponse, undefined);
  });
});
