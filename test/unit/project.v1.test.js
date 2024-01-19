/**
 * (C) Copyright IBM Corp. 2024.
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

/* eslint-disable no-await-in-loop */

const nock = require('nock');

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = sdkCorePackage;
const ProjectV1 = require('../../dist/project/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
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

      // ProjectPrototypeDefinition
      const projectPrototypeDefinitionModel = {
        name: 'acme-microservice',
        description: 'A microservice to deploy on top of ACME infrastructure.',
        destroy_on_delete: true,
      };

      // ProjectConfigAuth
      const projectConfigAuthModel = {
        trusted_profile_id: 'testString',
        method: 'api_key',
        api_key: 'testString',
      };

      // ProjectComplianceProfile
      const projectComplianceProfileModel = {
        id: 'testString',
        instance_id: 'testString',
        instance_location: 'testString',
        attachment_id: 'testString',
        profile_name: 'testString',
      };

      // ProjectConfigPrototypeDefinitionBlockDAConfigDefinitionProperties
      const projectConfigPrototypeDefinitionBlockModel = {
        name: 'testString',
        description: 'testString',
        environment_id: 'testString',
        authorizations: projectConfigAuthModel,
        inputs: { anyKey: 'anyValue' },
        settings: { anyKey: 'anyValue' },
        compliance_profile: projectComplianceProfileModel,
        locator_id: 'testString',
      };

      // SchematicsWorkspace
      const schematicsWorkspaceModel = {
        workspace_crn:
          'crn:v1:staging:public:project:us-south:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::',
      };

      // ProjectConfigPrototype
      const projectConfigPrototypeModel = {
        definition: projectConfigPrototypeDefinitionBlockModel,
        schematics: schematicsWorkspaceModel,
      };

      // EnvironmentDefinitionRequiredProperties
      const environmentDefinitionRequiredPropertiesModel = {
        name: 'testString',
        description: 'testString',
        authorizations: projectConfigAuthModel,
        inputs: { anyKey: 'anyValue' },
        compliance_profile: projectComplianceProfileModel,
      };

      // EnvironmentPrototype
      const environmentPrototypeModel = {
        definition: environmentDefinitionRequiredPropertiesModel,
      };

      function __createProjectTest() {
        // Construct the params object for operation createProject
        const definition = projectPrototypeDefinitionModel;
        const location = 'us-south';
        const resourceGroup = 'Default';
        const configs = [projectConfigPrototypeModel];
        const environments = [environmentPrototypeModel];
        const createProjectParams = {
          definition,
          location,
          resourceGroup,
          configs,
          environments,
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
        expect(mockRequestOptions.body.definition).toEqual(definition);
        expect(mockRequestOptions.body.location).toEqual(location);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.body.configs).toEqual(configs);
        expect(mockRequestOptions.body.environments).toEqual(environments);
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
        const definition = projectPrototypeDefinitionModel;
        const location = 'us-south';
        const resourceGroup = 'Default';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createProjectParams = {
          definition,
          location,
          resourceGroup,
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
        '{"next":{"href":"https://myhost.com/somePath?start=1"},"projects":[{"crn":"crn:v1:staging:public:project:us-south:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::","created_at":"2019-01-01T12:00:00.000Z","cumulative_needs_attention_view":[{"event":"event","event_id":"event_id","config_id":"config_id","config_version":14}],"cumulative_needs_attention_view_error":false,"id":"id","location":"location","resource_group_id":"resource_group_id","state":"ready","href":"href","definition":{"name":"name","description":"description","destroy_on_delete":false}}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"projects":[{"crn":"crn:v1:staging:public:project:us-south:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::","created_at":"2019-01-01T12:00:00.000Z","cumulative_needs_attention_view":[{"event":"event","event_id":"event_id","config_id":"config_id","config_version":14}],"cumulative_needs_attention_view_error":false,"id":"id","location":"location","resource_group_id":"resource_group_id","state":"ready","href":"href","definition":{"name":"name","description":"description","destroy_on_delete":false}}],"total_count":2,"limit":1}';

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

  describe('updateProject', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProjectPatchDefinitionBlock
      const projectPatchDefinitionBlockModel = {
        name: 'acme-microservice',
        description: 'A microservice to deploy on top of ACME infrastructure.',
        destroy_on_delete: true,
      };

      function __updateProjectTest() {
        // Construct the params object for operation updateProject
        const id = 'testString';
        const definition = projectPatchDefinitionBlockModel;
        const updateProjectParams = {
          id,
          definition,
        };

        const updateProjectResult = projectService.updateProject(updateProjectParams);

        // all methods should return a Promise
        expectToBePromise(updateProjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.definition).toEqual(definition);
        expect(mockRequestOptions.path.id).toEqual(id);
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
        const id = 'testString';
        const definition = projectPatchDefinitionBlockModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateProjectParams = {
          id,
          definition,
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

  describe('createProjectEnvironment', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProjectConfigAuth
      const projectConfigAuthModel = {
        trusted_profile_id: 'testString',
        method: 'api_key',
        api_key: 'TbcdlprpFODhkpns9e0daOWnAwd2tXwSYtPn8rpEd8d9',
      };

      // ProjectComplianceProfile
      const projectComplianceProfileModel = {
        id: 'some-profile-id',
        instance_id: 'some-instance-id',
        instance_location: 'us-south',
        attachment_id: 'some-attachment-id',
        profile_name: 'some-profile-name',
      };

      // EnvironmentDefinitionRequiredProperties
      const environmentDefinitionRequiredPropertiesModel = {
        name: 'development',
        description: "The environment 'development'",
        authorizations: projectConfigAuthModel,
        inputs: { resource_group: 'stage', region: 'us-south' },
        compliance_profile: projectComplianceProfileModel,
      };

      function __createProjectEnvironmentTest() {
        // Construct the params object for operation createProjectEnvironment
        const projectId = 'testString';
        const definition = environmentDefinitionRequiredPropertiesModel;
        const createProjectEnvironmentParams = {
          projectId,
          definition,
        };

        const createProjectEnvironmentResult = projectService.createProjectEnvironment(
          createProjectEnvironmentParams
        );

        // all methods should return a Promise
        expectToBePromise(createProjectEnvironmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{project_id}/environments', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.definition).toEqual(definition);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createProjectEnvironmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __createProjectEnvironmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __createProjectEnvironmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const definition = environmentDefinitionRequiredPropertiesModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createProjectEnvironmentParams = {
          projectId,
          definition,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.createProjectEnvironment(createProjectEnvironmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.createProjectEnvironment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.createProjectEnvironment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listProjectEnvironments', () => {
    describe('positive tests', () => {
      function __listProjectEnvironmentsTest() {
        // Construct the params object for operation listProjectEnvironments
        const projectId = 'testString';
        const listProjectEnvironmentsParams = {
          projectId,
        };

        const listProjectEnvironmentsResult = projectService.listProjectEnvironments(
          listProjectEnvironmentsParams
        );

        // all methods should return a Promise
        expectToBePromise(listProjectEnvironmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{project_id}/environments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listProjectEnvironmentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __listProjectEnvironmentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __listProjectEnvironmentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listProjectEnvironmentsParams = {
          projectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.listProjectEnvironments(listProjectEnvironmentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.listProjectEnvironments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.listProjectEnvironments();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getProjectEnvironment', () => {
    describe('positive tests', () => {
      function __getProjectEnvironmentTest() {
        // Construct the params object for operation getProjectEnvironment
        const projectId = 'testString';
        const id = 'testString';
        const getProjectEnvironmentParams = {
          projectId,
          id,
        };

        const getProjectEnvironmentResult = projectService.getProjectEnvironment(
          getProjectEnvironmentParams
        );

        // all methods should return a Promise
        expectToBePromise(getProjectEnvironmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/projects/{project_id}/environments/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProjectEnvironmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __getProjectEnvironmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __getProjectEnvironmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProjectEnvironmentParams = {
          projectId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.getProjectEnvironment(getProjectEnvironmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.getProjectEnvironment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.getProjectEnvironment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateProjectEnvironment', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProjectConfigAuth
      const projectConfigAuthModel = {
        trusted_profile_id: 'testString',
        method: 'api_key',
        api_key: 'TbcdlprpFODhkpns9e0daOWnAwd2tXwSYtPn8rpEd8d9',
      };

      // ProjectComplianceProfile
      const projectComplianceProfileModel = {
        id: 'some-profile-id',
        instance_id: 'some-instance-id',
        instance_location: 'us-south',
        attachment_id: 'some-attachment-id',
        profile_name: 'some-profile-name',
      };

      // EnvironmentDefinitionProperties
      const environmentDefinitionPropertiesModel = {
        name: 'development',
        description: "The environment 'development'",
        authorizations: projectConfigAuthModel,
        inputs: { resource_group: 'stage', region: 'us-south' },
        compliance_profile: projectComplianceProfileModel,
      };

      function __updateProjectEnvironmentTest() {
        // Construct the params object for operation updateProjectEnvironment
        const projectId = 'testString';
        const id = 'testString';
        const definition = environmentDefinitionPropertiesModel;
        const updateProjectEnvironmentParams = {
          projectId,
          id,
          definition,
        };

        const updateProjectEnvironmentResult = projectService.updateProjectEnvironment(
          updateProjectEnvironmentParams
        );

        // all methods should return a Promise
        expectToBePromise(updateProjectEnvironmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/environments/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.definition).toEqual(definition);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateProjectEnvironmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __updateProjectEnvironmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __updateProjectEnvironmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const id = 'testString';
        const definition = environmentDefinitionPropertiesModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateProjectEnvironmentParams = {
          projectId,
          id,
          definition,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.updateProjectEnvironment(updateProjectEnvironmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.updateProjectEnvironment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.updateProjectEnvironment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteProjectEnvironment', () => {
    describe('positive tests', () => {
      function __deleteProjectEnvironmentTest() {
        // Construct the params object for operation deleteProjectEnvironment
        const projectId = 'testString';
        const id = 'testString';
        const deleteProjectEnvironmentParams = {
          projectId,
          id,
        };

        const deleteProjectEnvironmentResult = projectService.deleteProjectEnvironment(
          deleteProjectEnvironmentParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteProjectEnvironmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/environments/{id}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteProjectEnvironmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __deleteProjectEnvironmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __deleteProjectEnvironmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteProjectEnvironmentParams = {
          projectId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.deleteProjectEnvironment(deleteProjectEnvironmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.deleteProjectEnvironment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.deleteProjectEnvironment();
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

      // ProjectConfigAuth
      const projectConfigAuthModel = {
        trusted_profile_id: 'testString',
        method: 'api_key',
        api_key: 'testString',
      };

      // ProjectComplianceProfile
      const projectComplianceProfileModel = {
        id: 'testString',
        instance_id: 'testString',
        instance_location: 'testString',
        attachment_id: 'testString',
        profile_name: 'testString',
      };

      // ProjectConfigPrototypeDefinitionBlockDAConfigDefinitionProperties
      const projectConfigPrototypeDefinitionBlockModel = {
        name: 'env-stage',
        description: 'Stage environment configuration.',
        environment_id: 'testString',
        authorizations: projectConfigAuthModel,
        inputs: {
          account_id: 'account_id',
          resource_group: 'stage',
          access_tags: ['env:stage'],
          logdna_name: 'LogDNA_stage_service',
          sysdig_name: 'SysDig_stage_service',
        },
        settings: { IBMCLOUD_TOOLCHAIN_ENDPOINT: 'https://api.us-south.devops.dev.cloud.ibm.com' },
        compliance_profile: projectComplianceProfileModel,
        locator_id:
          '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global',
      };

      // SchematicsWorkspace
      const schematicsWorkspaceModel = {
        workspace_crn:
          'crn:v1:staging:public:project:us-south:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::',
      };

      function __createConfigTest() {
        // Construct the params object for operation createConfig
        const projectId = 'testString';
        const definition = projectConfigPrototypeDefinitionBlockModel;
        const schematics = schematicsWorkspaceModel;
        const createConfigParams = {
          projectId,
          definition,
          schematics,
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
        expect(mockRequestOptions.body.definition).toEqual(definition);
        expect(mockRequestOptions.body.schematics).toEqual(schematics);
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
        const definition = projectConfigPrototypeDefinitionBlockModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createConfigParams = {
          projectId,
          definition,
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

      // ProjectConfigAuth
      const projectConfigAuthModel = {
        trusted_profile_id: 'testString',
        method: 'api_key',
        api_key: 'testString',
      };

      // ProjectComplianceProfile
      const projectComplianceProfileModel = {
        id: 'testString',
        instance_id: 'testString',
        instance_location: 'testString',
        attachment_id: 'testString',
        profile_name: 'testString',
      };

      // ProjectConfigPatchDefinitionBlockDAConfigDefinitionProperties
      const projectConfigPatchDefinitionBlockModel = {
        name: 'env-stage',
        description: 'testString',
        environment_id: 'testString',
        authorizations: projectConfigAuthModel,
        inputs: {
          account_id: 'account_id',
          resource_group: 'stage',
          access_tags: ['env:stage'],
          logdna_name: 'LogDNA_stage_service',
          sysdig_name: 'SysDig_stage_service',
        },
        settings: { anyKey: 'anyValue' },
        compliance_profile: projectComplianceProfileModel,
        locator_id: 'testString',
      };

      function __updateConfigTest() {
        // Construct the params object for operation updateConfig
        const projectId = 'testString';
        const id = 'testString';
        const definition = projectConfigPatchDefinitionBlockModel;
        const updateConfigParams = {
          projectId,
          id,
          definition,
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
        expect(mockRequestOptions.body.definition).toEqual(definition);
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
        const definition = projectConfigPatchDefinitionBlockModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateConfigParams = {
          projectId,
          id,
          definition,
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
        const deleteConfigParams = {
          projectId,
          id,
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

  describe('forceApprove', () => {
    describe('positive tests', () => {
      function __forceApproveTest() {
        // Construct the params object for operation forceApprove
        const projectId = 'testString';
        const id = 'testString';
        const comment = 'Approving the changes';
        const forceApproveParams = {
          projectId,
          id,
          comment,
        };

        const forceApproveResult = projectService.forceApprove(forceApproveParams);

        // all methods should return a Promise
        expectToBePromise(forceApproveResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{id}/force_approve',
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
        __forceApproveTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __forceApproveTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __forceApproveTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const id = 'testString';
        const comment = 'Approving the changes';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const forceApproveParams = {
          projectId,
          id,
          comment,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.forceApprove(forceApproveParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.forceApprove({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.forceApprove();
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

  describe('validateConfig', () => {
    describe('positive tests', () => {
      function __validateConfigTest() {
        // Construct the params object for operation validateConfig
        const projectId = 'testString';
        const id = 'testString';
        const validateConfigParams = {
          projectId,
          id,
        };

        const validateConfigResult = projectService.validateConfig(validateConfigParams);

        // all methods should return a Promise
        expectToBePromise(validateConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{id}/validate',
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
        __validateConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __validateConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __validateConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const validateConfigParams = {
          projectId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.validateConfig(validateConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.validateConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.validateConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deployConfig', () => {
    describe('positive tests', () => {
      function __deployConfigTest() {
        // Construct the params object for operation deployConfig
        const projectId = 'testString';
        const id = 'testString';
        const deployConfigParams = {
          projectId,
          id,
        };

        const deployConfigResult = projectService.deployConfig(deployConfigParams);

        // all methods should return a Promise
        expectToBePromise(deployConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{id}/deploy',
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
        __deployConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __deployConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __deployConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deployConfigParams = {
          projectId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.deployConfig(deployConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.deployConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.deployConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('undeployConfig', () => {
    describe('positive tests', () => {
      function __undeployConfigTest() {
        // Construct the params object for operation undeployConfig
        const projectId = 'testString';
        const id = 'testString';
        const undeployConfigParams = {
          projectId,
          id,
        };

        const undeployConfigResult = projectService.undeployConfig(undeployConfigParams);

        // all methods should return a Promise
        expectToBePromise(undeployConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{id}/undeploy',
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
        __undeployConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __undeployConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __undeployConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const undeployConfigParams = {
          projectId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.undeployConfig(undeployConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.undeployConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.undeployConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('syncConfig', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SchematicsWorkspace
      const schematicsWorkspaceModel = {
        workspace_crn:
          'crn:v1:staging:public:schematics:us-south:a/38acaf4469814090a4e675dc0c317a0d:95ad49de-ab96-4e7d-a08c-45c38aa448e6:workspace:us-south.workspace.service.e0106139',
      };

      function __syncConfigTest() {
        // Construct the params object for operation syncConfig
        const projectId = 'testString';
        const id = 'testString';
        const schematics = schematicsWorkspaceModel;
        const syncConfigParams = {
          projectId,
          id,
          schematics,
        };

        const syncConfigResult = projectService.syncConfig(syncConfigParams);

        // all methods should return a Promise
        expectToBePromise(syncConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{id}/sync',
          'POST'
        );
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.schematics).toEqual(schematics);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __syncConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __syncConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __syncConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const syncConfigParams = {
          projectId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.syncConfig(syncConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.syncConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.syncConfig();
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

  describe('listConfigVersions', () => {
    describe('positive tests', () => {
      function __listConfigVersionsTest() {
        // Construct the params object for operation listConfigVersions
        const projectId = 'testString';
        const id = 'testString';
        const listConfigVersionsParams = {
          projectId,
          id,
        };

        const listConfigVersionsResult =
          projectService.listConfigVersions(listConfigVersionsParams);

        // all methods should return a Promise
        expectToBePromise(listConfigVersionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{id}/versions',
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
        __listConfigVersionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __listConfigVersionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __listConfigVersionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listConfigVersionsParams = {
          projectId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.listConfigVersions(listConfigVersionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.listConfigVersions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.listConfigVersions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getConfigVersion', () => {
    describe('positive tests', () => {
      function __getConfigVersionTest() {
        // Construct the params object for operation getConfigVersion
        const projectId = 'testString';
        const id = 'testString';
        const version = 38;
        const getConfigVersionParams = {
          projectId,
          id,
          version,
        };

        const getConfigVersionResult = projectService.getConfigVersion(getConfigVersionParams);

        // all methods should return a Promise
        expectToBePromise(getConfigVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{id}/versions/{version}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getConfigVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __getConfigVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __getConfigVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const id = 'testString';
        const version = 38;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getConfigVersionParams = {
          projectId,
          id,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.getConfigVersion(getConfigVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.getConfigVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.getConfigVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteConfigVersion', () => {
    describe('positive tests', () => {
      function __deleteConfigVersionTest() {
        // Construct the params object for operation deleteConfigVersion
        const projectId = 'testString';
        const id = 'testString';
        const version = 38;
        const deleteConfigVersionParams = {
          projectId,
          id,
          version,
        };

        const deleteConfigVersionResult =
          projectService.deleteConfigVersion(deleteConfigVersionParams);

        // all methods should return a Promise
        expectToBePromise(deleteConfigVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/projects/{project_id}/configs/{id}/versions/{version}',
          'DELETE'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.project_id).toEqual(projectId);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteConfigVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        projectService.enableRetries();
        __deleteConfigVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        projectService.disableRetries();
        __deleteConfigVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const projectId = 'testString';
        const id = 'testString';
        const version = 38;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteConfigVersionParams = {
          projectId,
          id,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        projectService.deleteConfigVersion(deleteConfigVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await projectService.deleteConfigVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await projectService.deleteConfigVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
