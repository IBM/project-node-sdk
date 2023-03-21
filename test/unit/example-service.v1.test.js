/**
 * (C) Copyright IBM Corp. 2022.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const ExampleServiceV1 = require('../../dist/example-service/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const exampleServiceServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'http://cloud.ibm.com/mysdk/v1',
};

const exampleServiceService = new ExampleServiceV1(exampleServiceServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(exampleServiceService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('ExampleServiceV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = ExampleServiceV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(ExampleServiceV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(ExampleServiceV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(ExampleServiceV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = ExampleServiceV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(ExampleServiceV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new ExampleServiceV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new ExampleServiceV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(ExampleServiceV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('listResources', () => {
    describe('positive tests', () => {
      function __listResourcesTest() {
        // Construct the params object for operation listResources
        const limit = 1;
        const listResourcesParams = {
          limit,
        };

        const listResourcesResult = exampleServiceService.listResources(listResourcesParams);

        // all methods should return a Promise
        expectToBePromise(listResourcesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/resources', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listResourcesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        exampleServiceService.enableRetries();
        __listResourcesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        exampleServiceService.disableRetries();
        __listResourcesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listResourcesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        exampleServiceService.listResources(listResourcesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        exampleServiceService.listResources({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createResource', () => {
    describe('positive tests', () => {
      function __createResourceTest() {
        // Construct the params object for operation createResource
        const name = 'The Hunt for Red October';
        const tag = 'Book';
        const resourceId = 'testString';
        const createResourceParams = {
          name,
          tag,
          resourceId,
        };

        const createResourceResult = exampleServiceService.createResource(createResourceParams);

        // all methods should return a Promise
        expectToBePromise(createResourceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/resources', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.tag).toEqual(tag);
        expect(mockRequestOptions.body.resource_id).toEqual(resourceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createResourceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        exampleServiceService.enableRetries();
        __createResourceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        exampleServiceService.disableRetries();
        __createResourceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'The Hunt for Red October';
        const tag = 'Book';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createResourceParams = {
          name,
          tag,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        exampleServiceService.createResource(createResourceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await exampleServiceService.createResource({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await exampleServiceService.createResource();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getResource', () => {
    describe('positive tests', () => {
      function __getResourceTest() {
        // Construct the params object for operation getResource
        const resourceId = '1';
        const getResourceParams = {
          resourceId,
        };

        const getResourceResult = exampleServiceService.getResource(getResourceParams);

        // all methods should return a Promise
        expectToBePromise(getResourceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/resources/{resource_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.resource_id).toEqual(resourceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getResourceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        exampleServiceService.enableRetries();
        __getResourceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        exampleServiceService.disableRetries();
        __getResourceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const resourceId = '1';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getResourceParams = {
          resourceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        exampleServiceService.getResource(getResourceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await exampleServiceService.getResource({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await exampleServiceService.getResource();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getResourceEncoded', () => {
    describe('positive tests', () => {
      function __getResourceEncodedTest() {
        // Construct the params object for operation getResourceEncoded
        const urlEncodedResourceId = 'url%3encoded%3resource%3id';
        const getResourceEncodedParams = {
          urlEncodedResourceId,
        };

        const getResourceEncodedResult =
          exampleServiceService.getResourceEncoded(getResourceEncodedParams);

        // all methods should return a Promise
        expectToBePromise(getResourceEncodedResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/resources/encoded/{url_encoded_resource_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.url_encoded_resource_id).toEqual(urlEncodedResourceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getResourceEncodedTest();

        // enable retries and test again
        createRequestMock.mockClear();
        exampleServiceService.enableRetries();
        __getResourceEncodedTest();

        // disable retries and test again
        createRequestMock.mockClear();
        exampleServiceService.disableRetries();
        __getResourceEncodedTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const urlEncodedResourceId = 'url%3encoded%3resource%3id';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getResourceEncodedParams = {
          urlEncodedResourceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        exampleServiceService.getResourceEncoded(getResourceEncodedParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await exampleServiceService.getResourceEncoded({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await exampleServiceService.getResourceEncoded();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
