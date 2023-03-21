/**
 * (C) Copyright IBM Corp. 2023.
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
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = sdkCorePackage;

const nock = require('nock');
const ProjectV1 = require('../../dist/project/v1');

/* eslint-disable no-await-in-loop */

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const projectServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://projects.api.test.cloud.ibm.com',
};

const projectService = new ProjectV1(projectServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(projectService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}
function unmock_createRequest() {
  if (createRequestMock) {
    createRequestMock.mockRestore();
    createRequestMock = null;
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('ProjectV1', () => {
  beforeEach(() => {
    mock_createRequest();
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = ProjectV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(ProjectV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(ProjectV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(ProjectV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = ProjectV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(ProjectV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new ProjectV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new ProjectV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(ProjectV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('createProject', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // InputVariableInput
      const inputVariableInputModel = {
        name: 'testString',
      };

      // ConfigSettingItems
      const configSettingItemsModel = {
        name: 'testString',
        value: 'testString',
      };

      // ProjectConfigInput
      const projectConfigInputModel = {
        id: 'testString',
        name: 'common-variables',
        labels: ['testString'],
        description: 'testString',
        locator_id:
          '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global',
        input: [inputVariableInputModel],
        setting: [configSettingItemsModel],
      };

      function __createProjectTest() {
        // Construct the params object for operation createProject
        const name = 'acme-microservice';
        const description = 'A microservice to deploy on top of ACME infrastructure.';
        const configs = [projectConfigInputModel];
        const resourceGroup = 'Default';
        const location = 'us-south';
        const createProjectParams = {
          name,
          description,
          configs,
          resourceGroup,
          location,
        };

        const createProjectResult = projectService.createProject(createProjectParams);

        // all methods should return a Promise
        expectToBePromise(createProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.configs).toEqual(configs);
        expect(mockRequestOptions.qs.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.qs.location).toEqual(location);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createProjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __createProjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __createProjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'acme-microservice';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createProjectParams = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.createProject(createProjectParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.createProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.createProject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listProjects', () => {
    describe('positive tests', () => {
      function __listProjectsTest() {
        // Construct the params object for operation listProjects
        const start = 'testString';
        const limit = 1;
        const complete = false;
        const listProjectsParams = {
          start,
          limit,
          complete,
        };

        const listProjectsResult = projectService.listProjects(listProjectsParams);

        // all methods should return a Promise
        expectToBePromise(listProjectsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.complete).toEqual(complete);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listProjectsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __listProjectsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __listProjectsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listProjectsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.listProjects(listProjectsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        projectService.listProjects({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('ProjectsPager tests', () => {
      const serviceUrl = projectServiceOptions.url;
      const path = '/v1/projects';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"projects":[{"id":"id","name":"name","description":"description","metadata":{"crn":"crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::","created_at":"2019-01-01T12:00:00.000Z","cumulative_needs_attention_view":[{"event":"event","event_id":"event_id","config_id":"config_id","config_version":14}],"cumulative_needs_attention_view_err":"cumulative_needs_attention_view_err","location":"location","resource_group":"resource_group","state":"state","event_notifications_crn":"event_notifications_crn"}}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"projects":[{"id":"id","name":"name","description":"description","metadata":{"crn":"crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::","created_at":"2019-01-01T12:00:00.000Z","cumulative_needs_attention_view":[{"event":"event","event_id":"event_id","config_id":"config_id","config_version":14}],"cumulative_needs_attention_view_err":"cumulative_needs_attention_view_err","location":"location","resource_group":"resource_group","state":"state","event_notifications_crn":"event_notifications_crn"}}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          limit: 10,
          complete: false,
        };
        const allResults = [];
        const pager = new ProjectV1.ProjectsPager(projectService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          limit: 10,
          complete: false,
        };
        const pager = new ProjectV1.ProjectsPager(projectService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getProject', () => {
    describe('positive tests', () => {
      function __getProjectTest() {
        // Construct the params object for operation getProject
        const projectId = 'testString';
        const excludeConfigs = false;
        const complete = false;
        const getProjectParams = {
          projectId,
          excludeConfigs,
          complete,
        };

        const getProjectResult = projectService.getProject(getProjectParams);

        // all methods should return a Promise
        expectToBePromise(getProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{project_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.exclude_configs).toEqual(excludeConfigs);
        expect(mockRequestOptions.qs.complete).toEqual(complete);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __getProjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __getProjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProjectParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.getProject(getProjectParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.getProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.getProject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateProject', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateProjectTest() {
        // Construct the params object for operation updateProject
        const projectId = 'testString';
        const jsonPatchOperation = [jsonPatchOperationModel];
        const updateProjectParams = {
          projectId,
          jsonPatchOperation,
        };

        const updateProjectResult = projectService.updateProject(updateProjectParams);

        // all methods should return a Promise
        expectToBePromise(updateProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{project_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(jsonPatchOperation);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateProjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __updateProjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __updateProjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const jsonPatchOperation = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateProjectParams = {
          projectId,
          jsonPatchOperation,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.updateProject(updateProjectParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.updateProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.updateProject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteProject', () => {
    describe('positive tests', () => {
      function __deleteProjectTest() {
        // Construct the params object for operation deleteProject
        const projectId = 'testString';
        const destroy = false;
        const deleteProjectParams = {
          projectId,
          destroy,
        };

        const deleteProjectResult = projectService.deleteProject(deleteProjectParams);

        // all methods should return a Promise
        expectToBePromise(deleteProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{project_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.destroy).toEqual(destroy);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteProjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __deleteProjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __deleteProjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteProjectParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.deleteProject(deleteProjectParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.deleteProject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.deleteProject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createConfig', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // InputVariableInput
      const inputVariableInputModel = {
        name: 'account_id',
      };

      // ConfigSettingItems
      const configSettingItemsModel = {
        name: 'IBMCLOUD_TOOLCHAIN_ENDPOINT',
        value: 'https://api.us-south.devops.dev.cloud.ibm.com',
      };

      function __createConfigTest() {
        // Construct the params object for operation createConfig
        const projectId = 'testString';
        const name = 'env-stage';
        const locatorId =
          '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global';
        const id = 'testString';
        const labels = ['env:stage', 'governance:test', 'build:0'];
        const description =
          'Stage environment configuration, which includes services common to all the environment regions. There must be a blueprint configuring all the services common to the stage regions. It is a terraform_template type of configuration that points to a Github repo hosting the terraform modules that can be deployed by a Schematics Workspace.';
        const input = [inputVariableInputModel];
        const setting = [configSettingItemsModel];
        const createConfigParams = {
          projectId,
          name,
          locatorId,
          id,
          labels,
          description,
          input,
          setting,
        };

        const createConfigResult = projectService.createConfig(createConfigParams);

        // all methods should return a Promise
        expectToBePromise(createConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{project_id}/configs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.locator_id).toEqual(locatorId);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.labels).toEqual(labels);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.input).toEqual(input);
        expect(mockRequestOptions.body.setting).toEqual(setting);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __createConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __createConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const name = 'env-stage';
        const locatorId =
          '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createConfigParams = {
          projectId,
          name,
          locatorId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.createConfig(createConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.createConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.createConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listConfigs', () => {
    describe('positive tests', () => {
      function __listConfigsTest() {
        // Construct the params object for operation listConfigs
        const projectId = 'testString';
        const version = 'active';
        const complete = false;
        const listConfigsParams = {
          projectId,
          version,
          complete,
        };

        const listConfigsResult = projectService.listConfigs(listConfigsParams);

        // all methods should return a Promise
        expectToBePromise(listConfigsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{project_id}/configs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(version);
        expect(mockRequestOptions.qs.complete).toEqual(complete);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listConfigsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __listConfigsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __listConfigsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listConfigsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.listConfigs(listConfigsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.listConfigs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.listConfigs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getConfig', () => {
    describe('positive tests', () => {
      function __getConfigTest() {
        // Construct the params object for operation getConfig
        const projectId = 'testString';
        const configId = 'testString';
        const version = 'active';
        const complete = false;
        const getConfigParams = {
          projectId,
          configId,
          version,
          complete,
        };

        const getConfigResult = projectService.getConfig(getConfigParams);

        // all methods should return a Promise
        expectToBePromise(getConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{config_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(version);
        expect(mockRequestOptions.qs.complete).toEqual(complete);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.config_id).toEqual(configId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __getConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __getConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const configId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getConfigParams = {
          projectId,
          configId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.getConfig(getConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.getConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.getConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateConfig', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateConfigTest() {
        // Construct the params object for operation updateConfig
        const projectId = 'testString';
        const configId = 'testString';
        const projectConfig = [jsonPatchOperationModel];
        const complete = false;
        const updateConfigParams = {
          projectId,
          configId,
          projectConfig,
          complete,
        };

        const updateConfigResult = projectService.updateConfig(updateConfigParams);

        // all methods should return a Promise
        expectToBePromise(updateConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{config_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(projectConfig);
        expect(mockRequestOptions.qs.complete).toEqual(complete);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.config_id).toEqual(configId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __updateConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __updateConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const configId = 'testString';
        const projectConfig = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateConfigParams = {
          projectId,
          configId,
          projectConfig,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.updateConfig(updateConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.updateConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.updateConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteConfig', () => {
    describe('positive tests', () => {
      function __deleteConfigTest() {
        // Construct the params object for operation deleteConfig
        const projectId = 'testString';
        const configId = 'testString';
        const draftOnly = false;
        const destroy = false;
        const deleteConfigParams = {
          projectId,
          configId,
          draftOnly,
          destroy,
        };

        const deleteConfigResult = projectService.deleteConfig(deleteConfigParams);

        // all methods should return a Promise
        expectToBePromise(deleteConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{config_id}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.draft_only).toEqual(draftOnly);
        expect(mockRequestOptions.qs.destroy).toEqual(destroy);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.config_id).toEqual(configId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __deleteConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __deleteConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const configId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteConfigParams = {
          projectId,
          configId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.deleteConfig(deleteConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.deleteConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.deleteConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getConfigDiff', () => {
    describe('positive tests', () => {
      function __getConfigDiffTest() {
        // Construct the params object for operation getConfigDiff
        const projectId = 'testString';
        const configId = 'testString';
        const getConfigDiffParams = {
          projectId,
          configId,
        };

        const getConfigDiffResult = projectService.getConfigDiff(getConfigDiffParams);

        // all methods should return a Promise
        expectToBePromise(getConfigDiffResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{config_id}/diff',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.config_id).toEqual(configId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getConfigDiffTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __getConfigDiffTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __getConfigDiffTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const configId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getConfigDiffParams = {
          projectId,
          configId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.getConfigDiff(getConfigDiffParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.getConfigDiff({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.getConfigDiff();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('forceMerge', () => {
    describe('positive tests', () => {
      function __forceMergeTest() {
        // Construct the params object for operation forceMerge
        const projectId = 'testString';
        const configId = 'testString';
        const comment = 'Approving the changes';
        const complete = false;
        const forceMergeParams = {
          projectId,
          configId,
          comment,
          complete,
        };

        const forceMergeResult = projectService.forceMerge(forceMergeParams);

        // all methods should return a Promise
        expectToBePromise(forceMergeResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{config_id}/draft/force_merge',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.comment).toEqual(comment);
        expect(mockRequestOptions.qs.complete).toEqual(complete);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.config_id).toEqual(configId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __forceMergeTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __forceMergeTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __forceMergeTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const configId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const forceMergeParams = {
          projectId,
          configId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.forceMerge(forceMergeParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.forceMerge({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.forceMerge();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createDraftAction', () => {
    describe('positive tests', () => {
      function __createDraftActionTest() {
        // Construct the params object for operation createDraftAction
        const projectId = 'testString';
        const configId = 'testString';
        const action = 'merge';
        const comment = 'Approving the changes';
        const complete = false;
        const createDraftActionParams = {
          projectId,
          configId,
          action,
          comment,
          complete,
        };

        const createDraftActionResult = projectService.createDraftAction(createDraftActionParams);

        // all methods should return a Promise
        expectToBePromise(createDraftActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{config_id}/draft/{action}',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.comment).toEqual(comment);
        expect(mockRequestOptions.qs.complete).toEqual(complete);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.config_id).toEqual(configId);
        expect(mockRequestOptions.path.action).toEqual(action);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDraftActionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __createDraftActionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __createDraftActionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const configId = 'testString';
        const action = 'merge';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDraftActionParams = {
          projectId,
          configId,
          action,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.createDraftAction(createDraftActionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.createDraftAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.createDraftAction();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('checkConfig', () => {
    describe('positive tests', () => {
      function __checkConfigTest() {
        // Construct the params object for operation checkConfig
        const projectId = 'testString';
        const configId = 'testString';
        const xAuthRefreshToken = 'testString';
        const version = 'active';
        const complete = false;
        const checkConfigParams = {
          projectId,
          configId,
          xAuthRefreshToken,
          version,
          complete,
        };

        const checkConfigResult = projectService.checkConfig(checkConfigParams);

        // all methods should return a Promise
        expectToBePromise(checkConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{config_id}/check',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.qs.version).toEqual(version);
        expect(mockRequestOptions.qs.complete).toEqual(complete);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.config_id).toEqual(configId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __checkConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __checkConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __checkConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const configId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const checkConfigParams = {
          projectId,
          configId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.checkConfig(checkConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.checkConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.checkConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('installConfig', () => {
    describe('positive tests', () => {
      function __installConfigTest() {
        // Construct the params object for operation installConfig
        const projectId = 'testString';
        const configId = 'testString';
        const complete = false;
        const installConfigParams = {
          projectId,
          configId,
          complete,
        };

        const installConfigResult = projectService.installConfig(installConfigParams);

        // all methods should return a Promise
        expectToBePromise(installConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{config_id}/install',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.complete).toEqual(complete);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.config_id).toEqual(configId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __installConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __installConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __installConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const configId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const installConfigParams = {
          projectId,
          configId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.installConfig(installConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.installConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.installConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('uninstallConfig', () => {
    describe('positive tests', () => {
      function __uninstallConfigTest() {
        // Construct the params object for operation uninstallConfig
        const projectId = 'testString';
        const configId = 'testString';
        const uninstallConfigParams = {
          projectId,
          configId,
        };

        const uninstallConfigResult = projectService.uninstallConfig(uninstallConfigParams);

        // all methods should return a Promise
        expectToBePromise(uninstallConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{config_id}/uninstall',
          'POST'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.config_id).toEqual(configId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __uninstallConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __uninstallConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __uninstallConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const configId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const uninstallConfigParams = {
          projectId,
          configId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.uninstallConfig(uninstallConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.uninstallConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.uninstallConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSchematicsJob', () => {
    describe('positive tests', () => {
      function __getSchematicsJobTest() {
        // Construct the params object for operation getSchematicsJob
        const projectId = 'testString';
        const configId = 'testString';
        const action = 'plan';
        const since = 38;
        const getSchematicsJobParams = {
          projectId,
          configId,
          action,
          since,
        };

        const getSchematicsJobResult = projectService.getSchematicsJob(getSchematicsJobParams);

        // all methods should return a Promise
        expectToBePromise(getSchematicsJobResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{config_id}/job/{action}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.since).toEqual(since);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.config_id).toEqual(configId);
        expect(mockRequestOptions.path.action).toEqual(action);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSchematicsJobTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __getSchematicsJobTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __getSchematicsJobTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const configId = 'testString';
        const action = 'plan';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSchematicsJobParams = {
          projectId,
          configId,
          action,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.getSchematicsJob(getSchematicsJobParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.getSchematicsJob({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.getSchematicsJob();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getCostEstimate', () => {
    describe('positive tests', () => {
      function __getCostEstimateTest() {
        // Construct the params object for operation getCostEstimate
        const projectId = 'testString';
        const configId = 'testString';
        const version = 'active';
        const getCostEstimateParams = {
          projectId,
          configId,
          version,
        };

        const getCostEstimateResult = projectService.getCostEstimate(getCostEstimateParams);

        // all methods should return a Promise
        expectToBePromise(getCostEstimateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{config_id}/cost_estimate',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(version);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.config_id).toEqual(configId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCostEstimateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __getCostEstimateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __getCostEstimateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const configId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCostEstimateParams = {
          projectId,
          configId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.getCostEstimate(getCostEstimateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.getCostEstimate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.getCostEstimate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postNotification', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NotificationEvent
      const notificationEventModel = {
        event: 'project.create.failed',
        target: '234234324-3444-4556-224232432',
        source: 'id.of.project.service.instance',
        triggered_by: 'user-iam-id',
        action_url: 'actionable/url',
        data: { foo: 'bar' },
      };

      function __postNotificationTest() {
        // Construct the params object for operation postNotification
        const projectId = 'testString';
        const notifications = [notificationEventModel];
        const postNotificationParams = {
          projectId,
          notifications,
        };

        const postNotificationResult = projectService.postNotification(postNotificationParams);

        // all methods should return a Promise
        expectToBePromise(postNotificationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{project_id}/event', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.notifications).toEqual(notifications);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postNotificationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __postNotificationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __postNotificationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postNotificationParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.postNotification(postNotificationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.postNotification({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.postNotification();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getNotifications', () => {
    describe('positive tests', () => {
      function __getNotificationsTest() {
        // Construct the params object for operation getNotifications
        const projectId = 'testString';
        const getNotificationsParams = {
          projectId,
        };

        const getNotificationsResult = projectService.getNotifications(getNotificationsParams);

        // all methods should return a Promise
        expectToBePromise(getNotificationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{project_id}/event', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getNotificationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __getNotificationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __getNotificationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getNotificationsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.getNotifications(getNotificationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.getNotifications({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.getNotifications();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteNotification', () => {
    describe('positive tests', () => {
      function __deleteNotificationTest() {
        // Construct the params object for operation deleteNotification
        const projectId = 'testString';
        const deleteNotificationParams = {
          projectId,
        };

        const deleteNotificationResult =
          projectService.deleteNotification(deleteNotificationParams);

        // all methods should return a Promise
        expectToBePromise(deleteNotificationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{project_id}/event', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteNotificationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __deleteNotificationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __deleteNotificationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteNotificationParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.deleteNotification(deleteNotificationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.deleteNotification({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.deleteNotification();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('receivePulsarCatalogEvents', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PulsarEventItems
      const pulsarEventItemsModel = {
        event_type: 'testString',
        timestamp: '2019-01-01T12:00:00.000Z',
        publisher: 'testString',
        account_id: 'testString',
        version: 'testString',
        event_properties: { foo: 'bar' },
        event_id: 'testString',
        foo: 'testString',
      };

      function __receivePulsarCatalogEventsTest() {
        // Construct the params object for operation receivePulsarCatalogEvents
        const pulsarCatalogEvents = [pulsarEventItemsModel];
        const receivePulsarCatalogEventsParams = {
          pulsarCatalogEvents,
        };

        const receivePulsarCatalogEventsResult = projectService.receivePulsarCatalogEvents(
          receivePulsarCatalogEventsParams
        );

        // all methods should return a Promise
        expectToBePromise(receivePulsarCatalogEventsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/pulsar/catalog_events', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(pulsarCatalogEvents);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __receivePulsarCatalogEventsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __receivePulsarCatalogEventsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __receivePulsarCatalogEventsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const pulsarCatalogEvents = [pulsarEventItemsModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const receivePulsarCatalogEventsParams = {
          pulsarCatalogEvents,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.receivePulsarCatalogEvents(receivePulsarCatalogEventsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.receivePulsarCatalogEvents({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.receivePulsarCatalogEvents();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getHealth', () => {
    describe('positive tests', () => {
      function __getHealthTest() {
        // Construct the params object for operation getHealth
        const info = false;
        const getHealthParams = {
          info,
        };

        const getHealthResult = projectService.getHealth(getHealthParams);

        // all methods should return a Promise
        expectToBePromise(getHealthResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/health', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.info).toEqual(info);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getHealthTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __getHealthTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __getHealthTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getHealthParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.getHealth(getHealthParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        projectService.getHealth({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('replaceServiceInstance', () => {
    describe('positive tests', () => {
      function __replaceServiceInstanceTest() {
        // Construct the params object for operation replaceServiceInstance
        const instanceId =
          'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::';
        const serviceId = 'testString';
        const planId = 'testString';
        const context = ['testString'];
        const parameters = { foo: 'bar' };
        const previousValues = ['testString'];
        const xBrokerApiVersion = '1.0';
        const xBrokerApiOriginatingIdentity = 'ibmcloud eyJpYW1fbWQiOiJJQk2pZC03MEdOUjcxN2lFIn0=';
        const acceptsIncomplete = false;
        const replaceServiceInstanceParams = {
          instanceId,
          serviceId,
          planId,
          context,
          parameters,
          previousValues,
          xBrokerApiVersion,
          xBrokerApiOriginatingIdentity,
          acceptsIncomplete,
        };

        const replaceServiceInstanceResult = projectService.replaceServiceInstance(
          replaceServiceInstanceParams
        );

        // all methods should return a Promise
        expectToBePromise(replaceServiceInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/service_instances/{instance_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Broker-Api-Version', xBrokerApiVersion);
        checkUserHeader(
          createRequestMock,
          'X-Broker-Api-Originating-Identity',
          xBrokerApiOriginatingIdentity
        );
        expect(mockRequestOptions.body.service_id).toEqual(serviceId);
        expect(mockRequestOptions.body.plan_id).toEqual(planId);
        expect(mockRequestOptions.body.context).toEqual(context);
        expect(mockRequestOptions.body.parameters).toEqual(parameters);
        expect(mockRequestOptions.body.previous_values).toEqual(previousValues);
        expect(mockRequestOptions.qs.accepts_incomplete).toEqual(acceptsIncomplete);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceServiceInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __replaceServiceInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __replaceServiceInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId =
          'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::';
        const serviceId = 'testString';
        const planId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceServiceInstanceParams = {
          instanceId,
          serviceId,
          planId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.replaceServiceInstance(replaceServiceInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.replaceServiceInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.replaceServiceInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteServiceInstance', () => {
    describe('positive tests', () => {
      function __deleteServiceInstanceTest() {
        // Construct the params object for operation deleteServiceInstance
        const instanceId =
          'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::';
        const planId = 'cb54391b-3316-4943-a5a6-a541678c1924';
        const serviceId = 'cb54391b-3316-4943-a5a6-a541678c1924';
        const xBrokerApiVersion = '1.0';
        const xBrokerApiOriginatingIdentity = 'ibmcloud eyJpYW1fbWQiOiJJQk2pZC03MEdOUjcxN2lFIn0=';
        const acceptsIncomplete = false;
        const deleteServiceInstanceParams = {
          instanceId,
          planId,
          serviceId,
          xBrokerApiVersion,
          xBrokerApiOriginatingIdentity,
          acceptsIncomplete,
        };

        const deleteServiceInstanceResult = projectService.deleteServiceInstance(
          deleteServiceInstanceParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteServiceInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/service_instances/{instance_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Broker-Api-Version', xBrokerApiVersion);
        checkUserHeader(
          createRequestMock,
          'X-Broker-Api-Originating-Identity',
          xBrokerApiOriginatingIdentity
        );
        expect(mockRequestOptions.qs.plan_id).toEqual(planId);
        expect(mockRequestOptions.qs.service_id).toEqual(serviceId);
        expect(mockRequestOptions.qs.accepts_incomplete).toEqual(acceptsIncomplete);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteServiceInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __deleteServiceInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __deleteServiceInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId =
          'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::';
        const planId = 'cb54391b-3316-4943-a5a6-a541678c1924';
        const serviceId = 'cb54391b-3316-4943-a5a6-a541678c1924';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteServiceInstanceParams = {
          instanceId,
          planId,
          serviceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.deleteServiceInstance(deleteServiceInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.deleteServiceInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.deleteServiceInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateServiceInstance', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        from: 'testString',
        value: 'testString',
      };

      function __updateServiceInstanceTest() {
        // Construct the params object for operation updateServiceInstance
        const instanceId =
          'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::';
        const jsonPatchOperation = [jsonPatchOperationModel];
        const xBrokerApiVersion = '1.0';
        const xBrokerApiOriginatingIdentity = 'ibmcloud eyJpYW1fbWQiOiJJQk2pZC03MEdOUjcxN2lFIn0=';
        const acceptsIncomplete = false;
        const updateServiceInstanceParams = {
          instanceId,
          jsonPatchOperation,
          xBrokerApiVersion,
          xBrokerApiOriginatingIdentity,
          acceptsIncomplete,
        };

        const updateServiceInstanceResult = projectService.updateServiceInstance(
          updateServiceInstanceParams
        );

        // all methods should return a Promise
        expectToBePromise(updateServiceInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/service_instances/{instance_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Broker-Api-Version', xBrokerApiVersion);
        checkUserHeader(
          createRequestMock,
          'X-Broker-Api-Originating-Identity',
          xBrokerApiOriginatingIdentity
        );
        expect(mockRequestOptions.body).toEqual(jsonPatchOperation);
        expect(mockRequestOptions.qs.accepts_incomplete).toEqual(acceptsIncomplete);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateServiceInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __updateServiceInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __updateServiceInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId =
          'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::';
        const jsonPatchOperation = [jsonPatchOperationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateServiceInstanceParams = {
          instanceId,
          jsonPatchOperation,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.updateServiceInstance(updateServiceInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.updateServiceInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.updateServiceInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getLastOperation', () => {
    describe('positive tests', () => {
      function __getLastOperationTest() {
        // Construct the params object for operation getLastOperation
        const instanceId =
          'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::';
        const xBrokerApiVersion = '1.0';
        const operation = 'ABCD';
        const planId = 'cb54391b-3316-4943-a5a6-a541678c1924';
        const serviceId = 'cb54391b-3316-4943-a5a6-a541678c1924';
        const getLastOperationParams = {
          instanceId,
          xBrokerApiVersion,
          operation,
          planId,
          serviceId,
        };

        const getLastOperationResult = projectService.getLastOperation(getLastOperationParams);

        // all methods should return a Promise
        expectToBePromise(getLastOperationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v2/service_instances/{instance_id}/last_operation',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Broker-Api-Version', xBrokerApiVersion);
        expect(mockRequestOptions.qs.operation).toEqual(operation);
        expect(mockRequestOptions.qs.plan_id).toEqual(planId);
        expect(mockRequestOptions.qs.service_id).toEqual(serviceId);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLastOperationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __getLastOperationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __getLastOperationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId =
          'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLastOperationParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.getLastOperation(getLastOperationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.getLastOperation({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.getLastOperation();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceServiceInstanceState', () => {
    describe('positive tests', () => {
      function __replaceServiceInstanceStateTest() {
        // Construct the params object for operation replaceServiceInstanceState
        const instanceId =
          'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::';
        const enabled = true;
        const initiatorId = 'testString';
        const reasonCode = { foo: 'bar' };
        const planId = 'testString';
        const previousValues = ['testString'];
        const xBrokerApiVersion = '1.0';
        const replaceServiceInstanceStateParams = {
          instanceId,
          enabled,
          initiatorId,
          reasonCode,
          planId,
          previousValues,
          xBrokerApiVersion,
        };

        const replaceServiceInstanceStateResult = projectService.replaceServiceInstanceState(
          replaceServiceInstanceStateParams
        );

        // all methods should return a Promise
        expectToBePromise(replaceServiceInstanceStateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bluemix_v1/service_instances/{instance_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Broker-Api-Version', xBrokerApiVersion);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.body.initiator_id).toEqual(initiatorId);
        expect(mockRequestOptions.body.reason_code).toEqual(reasonCode);
        expect(mockRequestOptions.body.plan_id).toEqual(planId);
        expect(mockRequestOptions.body.previous_values).toEqual(previousValues);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceServiceInstanceStateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __replaceServiceInstanceStateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __replaceServiceInstanceStateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId =
          'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::';
        const enabled = true;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceServiceInstanceStateParams = {
          instanceId,
          enabled,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.replaceServiceInstanceState(replaceServiceInstanceStateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.replaceServiceInstanceState({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.replaceServiceInstanceState();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getServiceInstance', () => {
    describe('positive tests', () => {
      function __getServiceInstanceTest() {
        // Construct the params object for operation getServiceInstance
        const instanceId =
          'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::';
        const xBrokerApiVersion = '1.0';
        const getServiceInstanceParams = {
          instanceId,
          xBrokerApiVersion,
        };

        const getServiceInstanceResult =
          projectService.getServiceInstance(getServiceInstanceParams);

        // all methods should return a Promise
        expectToBePromise(getServiceInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/bluemix_v1/service_instances/{instance_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Broker-Api-Version', xBrokerApiVersion);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getServiceInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __getServiceInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __getServiceInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId =
          'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getServiceInstanceParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.getServiceInstance(getServiceInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.getServiceInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.getServiceInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getCatalog', () => {
    describe('positive tests', () => {
      function __getCatalogTest() {
        // Construct the params object for operation getCatalog
        const xBrokerApiVersion = '1.0';
        const getCatalogParams = {
          xBrokerApiVersion,
        };

        const getCatalogResult = projectService.getCatalog(getCatalogParams);

        // all methods should return a Promise
        expectToBePromise(getCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/catalog', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Broker-Api-Version', xBrokerApiVersion);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCatalogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __getCatalogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __getCatalogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCatalogParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.getCatalog(getCatalogParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        projectService.getCatalog({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('postEventNotificationsIntegration', () => {
    describe('positive tests', () => {
      function __postEventNotificationsIntegrationTest() {
        // Construct the params object for operation postEventNotificationsIntegration
        const projectId = 'testString';
        const instanceCrn = 'CRN of event notifications instance';
        const description = 'A sample project source.';
        const eventNotificationsSourceName = 'project 1 source name for event notifications';
        const enabled = true;
        const postEventNotificationsIntegrationParams = {
          projectId,
          instanceCrn,
          description,
          eventNotificationsSourceName,
          enabled,
        };

        const postEventNotificationsIntegrationResult =
          projectService.postEventNotificationsIntegration(postEventNotificationsIntegrationParams);

        // all methods should return a Promise
        expectToBePromise(postEventNotificationsIntegrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/integrations/event_notifications',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.instance_crn).toEqual(instanceCrn);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.event_notifications_source_name).toEqual(
          eventNotificationsSourceName
        );
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postEventNotificationsIntegrationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __postEventNotificationsIntegrationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __postEventNotificationsIntegrationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const instanceCrn = 'CRN of event notifications instance';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postEventNotificationsIntegrationParams = {
          projectId,
          instanceCrn,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.postEventNotificationsIntegration(postEventNotificationsIntegrationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.postEventNotificationsIntegration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.postEventNotificationsIntegration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getEventNotificationsIntegration', () => {
    describe('positive tests', () => {
      function __getEventNotificationsIntegrationTest() {
        // Construct the params object for operation getEventNotificationsIntegration
        const projectId = 'testString';
        const getEventNotificationsIntegrationParams = {
          projectId,
        };

        const getEventNotificationsIntegrationResult =
          projectService.getEventNotificationsIntegration(getEventNotificationsIntegrationParams);

        // all methods should return a Promise
        expectToBePromise(getEventNotificationsIntegrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/integrations/event_notifications',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getEventNotificationsIntegrationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __getEventNotificationsIntegrationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __getEventNotificationsIntegrationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getEventNotificationsIntegrationParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.getEventNotificationsIntegration(getEventNotificationsIntegrationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.getEventNotificationsIntegration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.getEventNotificationsIntegration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteEventNotificationsIntegration', () => {
    describe('positive tests', () => {
      function __deleteEventNotificationsIntegrationTest() {
        // Construct the params object for operation deleteEventNotificationsIntegration
        const projectId = 'testString';
        const deleteEventNotificationsIntegrationParams = {
          projectId,
        };

        const deleteEventNotificationsIntegrationResult =
          projectService.deleteEventNotificationsIntegration(
            deleteEventNotificationsIntegrationParams
          );

        // all methods should return a Promise
        expectToBePromise(deleteEventNotificationsIntegrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/integrations/event_notifications',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteEventNotificationsIntegrationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __deleteEventNotificationsIntegrationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __deleteEventNotificationsIntegrationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteEventNotificationsIntegrationParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.deleteEventNotificationsIntegration(
          deleteEventNotificationsIntegrationParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.deleteEventNotificationsIntegration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.deleteEventNotificationsIntegration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('postTestEventNotification', () => {
    describe('positive tests', () => {
      function __postTestEventNotificationTest() {
        // Construct the params object for operation postTestEventNotification
        const projectId = 'testString';
        const ibmendefaultlong = 'long test notification message';
        const ibmendefaultshort = 'Test notification';
        const postTestEventNotificationParams = {
          projectId,
          ibmendefaultlong,
          ibmendefaultshort,
        };

        const postTestEventNotificationResult = projectService.postTestEventNotification(
          postTestEventNotificationParams
        );

        // all methods should return a Promise
        expectToBePromise(postTestEventNotificationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/integrations/event_notifications/test',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.ibmendefaultlong).toEqual(ibmendefaultlong);
        expect(mockRequestOptions.body.ibmendefaultshort).toEqual(ibmendefaultshort);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __postTestEventNotificationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __postTestEventNotificationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __postTestEventNotificationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const postTestEventNotificationParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.postTestEventNotification(postTestEventNotificationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.postTestEventNotification({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.postTestEventNotification();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
