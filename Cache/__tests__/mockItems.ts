import { MockItem } from "./MockItem.type";

export const mockUrlAndResponsePairs: MockItem[] = [
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
