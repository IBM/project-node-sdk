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
  url: 'https://projects.api.cloud.ibm.com',
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

      // ProjectConfigAuthTrustedProfile
      const projectConfigAuthTrustedProfileModel = {
        id: 'testString',
        target_iam_id: 'testString',
      };

      // ProjectConfigAuth
      const projectConfigAuthModel = {
        trusted_profile: projectConfigAuthTrustedProfileModel,
        method: 'apikey',
        api_key: 'valid_apikey',
      };

      // ProjectConfigComplianceProfile
      const projectConfigComplianceProfileModel = {
        id: 'testString',
        instance_id: 'testString',
        instance_location: 'testString',
        attachment_id: 'testString',
        profile_name: 'testString',
      };

      // ProjectConfigInputVariable
      const projectConfigInputVariableModel = {
        name: 'testString',
        value: 'testString',
      };

      // ProjectConfigSettingCollection
      const projectConfigSettingCollectionModel = {
        name: 'testString',
        value: 'testString',
      };

      // ProjectConfigPrototype
      const projectConfigPrototypeModel = {
        name: 'common-variables',
        labels: [],
        description: 'testString',
        authorizations: projectConfigAuthModel,
        compliance_profile: projectConfigComplianceProfileModel,
        locator_id:
          '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global',
        input: [projectConfigInputVariableModel],
        setting: [projectConfigSettingCollectionModel],
      };

      function __createProjectTest() {
        // Construct the params object for operation createProject
        const resourceGroup = 'Default';
        const location = 'us-south';
        const name = 'acme-microservice';
        const description = 'A microservice to deploy on top of ACME infrastructure.';
        const destroyOnDelete = true;
        const configs = [projectConfigPrototypeModel];
        const createProjectParams = {
          resourceGroup,
          location,
          name,
          description,
          destroyOnDelete,
          configs,
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
        expect(mockRequestOptions.body.destroy_on_delete).toEqual(destroyOnDelete);
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
        const resourceGroup = 'Default';
        const location = 'us-south';
        const name = 'acme-microservice';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createProjectParams = {
          resourceGroup,
          location,
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
        const limit = 10;
        const listProjectsParams = {
          start,
          limit,
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
        '{"next":{"start":"1"},"projects":[{"crn":"crn:v1:staging:public:project:us-south:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::","created_at":"2019-01-01T12:00:00.000Z","cumulative_needs_attention_view":[{"event":"event","event_id":"event_id","config_id":"config_id","config_version":14}],"cumulative_needs_attention_view_error":false,"id":"id","location":"location","resource_group":"resource_group","state":"state","event_notifications_crn":"event_notifications_crn","definition":{"name":"name","description":"description","destroy_on_delete":true}}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"projects":[{"crn":"crn:v1:staging:public:project:us-south:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::","created_at":"2019-01-01T12:00:00.000Z","cumulative_needs_attention_view":[{"event":"event","event_id":"event_id","config_id":"config_id","config_version":14}],"cumulative_needs_attention_view_error":false,"id":"id","location":"location","resource_group":"resource_group","state":"state","event_notifications_crn":"event_notifications_crn","definition":{"name":"name","description":"description","destroy_on_delete":true}}],"total_count":2,"limit":1}';

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
        const id = 'testString';
        const getProjectParams = {
          id,
        };

        const getProjectResult = projectService.getProject(getProjectParams);

        // all methods should return a Promise
        expectToBePromise(getProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
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
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProjectParams = {
          id,
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

  describe('deleteProject', () => {
    describe('positive tests', () => {
      function __deleteProjectTest() {
        // Construct the params object for operation deleteProject
        const id = 'testString';
        const deleteProjectParams = {
          id,
        };

        const deleteProjectResult = projectService.deleteProject(deleteProjectParams);

        // all methods should return a Promise
        expectToBePromise(deleteProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
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
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteProjectParams = {
          id,
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

      // ProjectConfigAuthTrustedProfile
      const projectConfigAuthTrustedProfileModel = {
        id: 'testString',
        target_iam_id: 'testString',
      };

      // ProjectConfigAuth
      const projectConfigAuthModel = {
        trusted_profile: projectConfigAuthTrustedProfileModel,
        method: 'apikey',
        api_key: 'valid_apikey',
      };

      // ProjectConfigComplianceProfile
      const projectConfigComplianceProfileModel = {
        id: 'testString',
        instance_id: 'testString',
        instance_location: 'testString',
        attachment_id: 'testString',
        profile_name: 'testString',
      };

      // ProjectConfigInputVariable
      const projectConfigInputVariableModel = {
        name: 'account_id',
        value: '$configs[].name["account-stage"].input.account_id',
      };

      // ProjectConfigSettingCollection
      const projectConfigSettingCollectionModel = {
        name: 'IBMCLOUD_TOOLCHAIN_ENDPOINT',
        value: 'https://api.us-south.devops.dev.cloud.ibm.com',
      };

      function __createConfigTest() {
        // Construct the params object for operation createConfig
        const projectId = 'testString';
        const name = 'env-stage';
        const locatorId =
          '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global';
        const labels = ['env:stage', 'governance:test', 'build:0'];
        const description =
          'Stage environment configuration, which includes services common to all the environment regions. There must be a blueprint configuring all the services common to the stage regions. It is a terraform_template type of configuration that points to a Github repo hosting the terraform modules that can be deployed by a Schematics Workspace.';
        const authorizations = projectConfigAuthModel;
        const complianceProfile = projectConfigComplianceProfileModel;
        const input = [projectConfigInputVariableModel];
        const setting = [projectConfigSettingCollectionModel];
        const createConfigParams = {
          projectId,
          name,
          locatorId,
          labels,
          description,
          authorizations,
          complianceProfile,
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
        expect(mockRequestOptions.body.labels).toEqual(labels);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.authorizations).toEqual(authorizations);
        expect(mockRequestOptions.body.compliance_profile).toEqual(complianceProfile);
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
        const listConfigsParams = {
          projectId,
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
        const id = 'testString';
        const getConfigParams = {
          projectId,
          id,
        };

        const getConfigResult = projectService.getConfig(getConfigParams);

        // all methods should return a Promise
        expectToBePromise(getConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{project_id}/configs/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.id).toEqual(id);
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
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getConfigParams = {
          projectId,
          id,
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

      // ProjectConfigInputVariable
      const projectConfigInputVariableModel = {
        name: 'account_id',
        value: '$configs[].name["account-stage"].input.account_id',
      };

      // ProjectConfigSettingCollection
      const projectConfigSettingCollectionModel = {
        name: 'testString',
        value: 'testString',
      };

      // ProjectConfigAuthTrustedProfile
      const projectConfigAuthTrustedProfileModel = {
        id: 'testString',
        target_iam_id: 'testString',
      };

      // ProjectConfigAuth
      const projectConfigAuthModel = {
        trusted_profile: projectConfigAuthTrustedProfileModel,
        method: 'apikey',
        api_key: 'valid_apikey',
      };

      // ProjectConfigComplianceProfile
      const projectConfigComplianceProfileModel = {
        id: 'testString',
        instance_id: 'testString',
        instance_location: 'testString',
        attachment_id: 'testString',
        profile_name: 'testString',
      };

      function __updateConfigTest() {
        // Construct the params object for operation updateConfig
        const projectId = 'testString';
        const id = 'testString';
        const locatorId = 'testString';
        const input = [projectConfigInputVariableModel];
        const setting = [projectConfigSettingCollectionModel];
        const name = 'testString';
        const labels = ['testString'];
        const description = 'testString';
        const authorizations = projectConfigAuthModel;
        const complianceProfile = projectConfigComplianceProfileModel;
        const updateConfigParams = {
          projectId,
          id,
          locatorId,
          input,
          setting,
          name,
          labels,
          description,
          authorizations,
          complianceProfile,
        };

        const updateConfigResult = projectService.updateConfig(updateConfigParams);

        // all methods should return a Promise
        expectToBePromise(updateConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{project_id}/configs/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.locator_id).toEqual(locatorId);
        expect(mockRequestOptions.body.input).toEqual(input);
        expect(mockRequestOptions.body.setting).toEqual(setting);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.labels).toEqual(labels);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.authorizations).toEqual(authorizations);
        expect(mockRequestOptions.body.compliance_profile).toEqual(complianceProfile);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.id).toEqual(id);
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
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateConfigParams = {
          projectId,
          id,
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
        const id = 'testString';
        const draftOnly = false;
        const deleteConfigParams = {
          projectId,
          id,
          draftOnly,
        };

        const deleteConfigResult = projectService.deleteConfig(deleteConfigParams);

        // all methods should return a Promise
        expectToBePromise(deleteConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{project_id}/configs/{id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.draft_only).toEqual(draftOnly);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.id).toEqual(id);
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
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteConfigParams = {
          projectId,
          id,
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

  describe('approve', () => {
    describe('positive tests', () => {
      function __approveTest() {
        // Construct the params object for operation approve
        const projectId = 'testString';
        const id = 'testString';
        const comment = 'Approving the changes';
        const approveParams = {
          projectId,
          id,
          comment,
        };

        const approveResult = projectService.approve(approveParams);

        // all methods should return a Promise
        expectToBePromise(approveResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{id}/approve',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.comment).toEqual(comment);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __approveTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __approveTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __approveTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const approveParams = {
          projectId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.approve(approveParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.approve({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.approve();
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
        const id = 'testString';
        const xAuthRefreshToken = 'testString';
        const isDraft = true;
        const checkConfigParams = {
          projectId,
          id,
          xAuthRefreshToken,
          isDraft,
        };

        const checkConfigResult = projectService.checkConfig(checkConfigParams);

        // all methods should return a Promise
        expectToBePromise(checkConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{id}/check',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.qs.is_draft).toEqual(isDraft);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.id).toEqual(id);
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
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const checkConfigParams = {
          projectId,
          id,
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
        const id = 'testString';
        const installConfigParams = {
          projectId,
          id,
        };

        const installConfigResult = projectService.installConfig(installConfigParams);

        // all methods should return a Promise
        expectToBePromise(installConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{id}/install',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.id).toEqual(id);
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
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const installConfigParams = {
          projectId,
          id,
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
        const id = 'testString';
        const uninstallConfigParams = {
          projectId,
          id,
        };

        const uninstallConfigResult = projectService.uninstallConfig(uninstallConfigParams);

        // all methods should return a Promise
        expectToBePromise(uninstallConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{id}/uninstall',
          'POST'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.id).toEqual(id);
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
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const uninstallConfigParams = {
          projectId,
          id,
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

  describe('listConfigResources', () => {
    describe('positive tests', () => {
      function __listConfigResourcesTest() {
        // Construct the params object for operation listConfigResources
        const projectId = 'testString';
        const id = 'testString';
        const listConfigResourcesParams = {
          projectId,
          id,
        };

        const listConfigResourcesResult =
          projectService.listConfigResources(listConfigResourcesParams);

        // all methods should return a Promise
        expectToBePromise(listConfigResourcesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{id}/resources',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listConfigResourcesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __listConfigResourcesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __listConfigResourcesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listConfigResourcesParams = {
          projectId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.listConfigResources(listConfigResourcesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.listConfigResources({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.listConfigResources();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listConfigDrafts', () => {
    describe('positive tests', () => {
      function __listConfigDraftsTest() {
        // Construct the params object for operation listConfigDrafts
        const projectId = 'testString';
        const configId = 'testString';
        const listConfigDraftsParams = {
          projectId,
          configId,
        };

        const listConfigDraftsResult = projectService.listConfigDrafts(listConfigDraftsParams);

        // all methods should return a Promise
        expectToBePromise(listConfigDraftsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{config_id}/drafts',
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
        __listConfigDraftsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __listConfigDraftsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __listConfigDraftsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const configId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listConfigDraftsParams = {
          projectId,
          configId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.listConfigDrafts(listConfigDraftsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.listConfigDrafts({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.listConfigDrafts();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getConfigDraft', () => {
    describe('positive tests', () => {
      function __getConfigDraftTest() {
        // Construct the params object for operation getConfigDraft
        const projectId = 'testString';
        const configId = 'testString';
        const version = 38;
        const getConfigDraftParams = {
          projectId,
          configId,
          version,
        };

        const getConfigDraftResult = projectService.getConfigDraft(getConfigDraftParams);

        // all methods should return a Promise
        expectToBePromise(getConfigDraftResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{config_id}/drafts/{version}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.config_id).toEqual(configId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getConfigDraftTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __getConfigDraftTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __getConfigDraftTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const configId = 'testString';
        const version = 38;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getConfigDraftParams = {
          projectId,
          configId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.getConfigDraft(getConfigDraftParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.getConfigDraft({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.getConfigDraft();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
