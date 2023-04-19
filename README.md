# HTTP Module

### Description:
- Typescript, Object Oriented Programming.
- Abstraction of a simple Http module with axios, which allows for executing a get, post, and delete request to a specific URL with the possibility of adding headers and request body.
- Responses from get requests are stored in cache so that they can be returned for subsequent requests to the same URL.
- The Decorator pattern was used to separate two responsibilities of a single class (SOLID).
- A basic cache implementation was utilized using memory (with the goal of eventually switching to Redis or similar).
- Basic unit tests were conducted.
