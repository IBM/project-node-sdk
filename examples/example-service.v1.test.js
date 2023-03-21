/**
 * @jest-environment node
 */
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

/* eslint-disable no-console */

const ExampleServiceV1 = require('../dist/example-service/v1');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the ExampleService service.
//
// The following configuration properties are assumed to be defined:
// EXAMPLE_SERVICE_URL=<service base url>
// EXAMPLE_SERVICE_AUTH_TYPE=iam
// EXAMPLE_SERVICE_APIKEY=<IAM apikey>
// EXAMPLE_SERVICE_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'example_service_v1.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('ExampleServiceV1', () => {
  // Global variables to hold link values
  let getResourceLink;

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(ExampleServiceV1.DEFAULT_SERVICE_NAME);

  let exampleServiceService;

  test('Initialize services', async () => {
    // begin-common

    exampleServiceService = ExampleServiceV1.newInstance({});

    // end-common
  });

  test('createResource request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createResource() result:');
    // begin-create_resource

    const params = {
      name: 'The Hunt for Red October',
      tag: 'Book',
    };

    let res;
    try {
      res = await exampleServiceService.createResource(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_resource
    const responseBody = res.result;
    getResourceLink = responseBody.resource_id;
  });

  test('listResources request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listResources() result:');
    // begin-list_resources

    const params = {
      limit: 1,
    };

    let res;
    try {
      res = await exampleServiceService.listResources(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_resources
  });

  test('getResource request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getResource() result:');
    // begin-get_resource

    const params = {
      resourceId: getResourceLink,
    };

    let res;
    try {
      res = await exampleServiceService.getResource(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_resource
  });

  test('getResourceEncoded request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getResourceEncoded() result:');
    // begin-get_resource_encoded

    const params = {
      urlEncodedResourceId: 'url%3encoded%3resource%3id',
    };

    let res;
    try {
      res = await exampleServiceService.getResourceEncoded(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_resource_encoded
  });
});
