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

const { readExternalSources } = require('ibm-cloud-sdk-core');
const ExampleServiceV1 = require('../../dist/example-service/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'example_service_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('ExampleServiceV1_integration', () => {
  jest.setTimeout(timeout);

  // Globlal variables to hold link values
  let getResourceLink;

  let exampleServiceService;

  test('Initialise service', async () => {
    exampleServiceService = ExampleServiceV1.newInstance({});

    expect(exampleServiceService).not.toBeNull();

    const config = readExternalSources(ExampleServiceV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    exampleServiceService.enableRetries();
  });

  test('createResource()', async () => {
    const params = {
      name: 'The Hunt for Red October',
      tag: 'Book',
    };

    const res = await exampleServiceService.createResource(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    getResourceLink = res.result.resource_id;
  });
  test('listResources()', async () => {
    const params = {
      limit: 1,
    };

    const res = await exampleServiceService.listResources(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getResource()', async () => {
    const params = {
      resourceId: getResourceLink,
    };

    const res = await exampleServiceService.getResource(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('getResourceEncoded()', async () => {
    const p0 = {
      name: 'Debt of Honor',
      tag: 'Book',
      resourceId: 'url%3encoded%3resource%3id',
    };

    await exampleServiceService.createResource(p0);

    const params = {
      urlEncodedResourceId: 'url%3encoded%3resource%3id',
    };

    const res = await exampleServiceService.getResourceEncoded(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
});
