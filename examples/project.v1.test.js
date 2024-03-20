/**
 * @jest-environment node
 */
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

/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */

const ProjectV1 = require('../dist/project/v1');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the project service.
//
// The following configuration properties are assumed to be defined:
// PROJECT_URL=<service base url>
// PROJECT_AUTH_TYPE=iam
// PROJECT_APIKEY=<IAM apikey>
// PROJECT_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'project_v1.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('ProjectV1', () => {
  // Service instance
  let projectService;

  // Variables to hold link values
  let configIdLink;
  let projectIdLink;

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(ProjectV1.DEFAULT_SERVICE_NAME);

  test('Initialize service', async () => {
    // begin-common

    projectService = ProjectV1.newInstance();

    // end-common
  });

  test('createProject request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createProject() result:');
    // begin-create_project

    // Request models needed by this operation.

    // ProjectPrototypeDefinition
    const projectPrototypeDefinitionModel = {
      name: 'acme-microservice',
      description: 'A microservice to deploy on top of ACME infrastructure.',
    };

    // ProjectConfigDefinitionPrototypeDAConfigDefinitionPropertiesPrototype
    const projectConfigDefinitionPrototypeModel = {
      locator_id:
        '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global',
      description: 'The stage account configuration.',
      name: 'account-stage',
    };

    // ProjectConfigPrototype
    const projectConfigPrototypeModel = {
      definition: projectConfigDefinitionPrototypeModel,
    };

    const params = {
      definition: projectPrototypeDefinitionModel,
      location: 'us-south',
      resourceGroup: 'Default',
      configs: [projectConfigPrototypeModel],
    };

    let res;
    try {
      res = await projectService.createProject(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_project
    const responseBody = res.result;
    projectIdLink = responseBody.id;
  });

  test('createConfig request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createConfig() result:');
    // begin-create_config

    // Request models needed by this operation.

    // ProjectConfigDefinitionPrototypeDAConfigDefinitionPropertiesPrototype
    const projectConfigDefinitionPrototypeModel = {
      locator_id:
        '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global',
      description: 'The stage environment configuration.',
      name: 'env-stage',
      inputs: {
        account_id: 'account_id',
        resource_group: 'stage',
        access_tags: ['env:stage'],
        logdna_name: 'LogDNA_stage_service',
        sysdig_name: 'SysDig_stage_service',
      },
    };

    const params = {
      projectId: projectIdLink,
      definition: projectConfigDefinitionPrototypeModel,
    };

    let res;
    try {
      res = await projectService.createConfig(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_config
    const responseBody = res.result;
    configIdLink = responseBody.id;
  });

  test('listProjects request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listProjects() result:');
    // begin-list_projects

    const params = {
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new ProjectV1.ProjectsPager(projectService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_projects
  });

  test('getProject request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getProject() result:');
    // begin-get_project

    const params = {
      id: projectIdLink,
    };

    let res;
    try {
      res = await projectService.getProject(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_project
  });

  test('updateProject request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateProject() result:');
    // begin-update_project

    // Request models needed by this operation.

    // ProjectPatchDefinitionBlock
    const projectPatchDefinitionBlockModel = {
      name: 'acme-microservice',
      description: 'A microservice to deploy on top of ACME infrastructure.',
    };

    const params = {
      id: projectIdLink,
      definition: projectPatchDefinitionBlockModel,
    };

    let res;
    try {
      res = await projectService.updateProject(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_project
  });

  test('listProjectResources request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listProjectResources() result:');
    // begin-list_project_resources

    const params = {
      id: projectIdLink,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new ProjectV1.ProjectResourcesPager(projectService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_project_resources
  });

  test('createProjectEnvironment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createProjectEnvironment() result:');
    // begin-create_project_environment

    // Request models needed by this operation.

    // ProjectConfigAuth
    const projectConfigAuthModel = {
      trusted_profile_id: 'Profile-9ac10c5c-195c-41ef-b465-68a6b6dg5f12',
      method: 'trusted_profile',
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
      description: 'The environment development.',
      name: 'development',
      authorizations: projectConfigAuthModel,
      inputs: { resource_group: 'stage', region: 'us-south' },
      compliance_profile: projectComplianceProfileModel,
    };

    const params = {
      projectId: projectIdLink,
      definition: environmentDefinitionRequiredPropertiesModel,
    };

    let res;
    try {
      res = await projectService.createProjectEnvironment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_project_environment
  });

  test('listProjectEnvironments request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listProjectEnvironments() result:');
    // begin-list_project_environments

    const params = {
      projectId: projectIdLink,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new ProjectV1.ProjectEnvironmentsPager(projectService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_project_environments
  });

  test('getProjectEnvironment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getProjectEnvironment() result:');
    // begin-get_project_environment

    const params = {
      projectId: projectIdLink,
      id: projectIdLink,
    };

    let res;
    try {
      res = await projectService.getProjectEnvironment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_project_environment
  });

  test('updateProjectEnvironment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateProjectEnvironment() result:');
    // begin-update_project_environment

    // Request models needed by this operation.

    // ProjectConfigAuth
    const projectConfigAuthModel = {
      trusted_profile_id: 'Profile-9ac10c5c-195c-41ef-b465-68a6b6dg5f12',
      method: 'trusted_profile',
    };

    // ProjectComplianceProfile
    const projectComplianceProfileModel = {
      id: 'some-profile-id',
      instance_id: 'some-instance-id',
      instance_location: 'us-south',
      attachment_id: 'some-attachment-id',
      profile_name: 'some-profile-name',
    };

    // EnvironmentDefinitionPropertiesPatch
    const environmentDefinitionPropertiesPatchModel = {
      description: 'The environment development.',
      name: 'development',
      authorizations: projectConfigAuthModel,
      inputs: { resource_group: 'stage', region: 'us-south' },
      compliance_profile: projectComplianceProfileModel,
    };

    const params = {
      projectId: projectIdLink,
      id: projectIdLink,
      definition: environmentDefinitionPropertiesPatchModel,
    };

    let res;
    try {
      res = await projectService.updateProjectEnvironment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_project_environment
  });

  test('listConfigs request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listConfigs() result:');
    // begin-list_configs

    const params = {
      projectId: projectIdLink,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new ProjectV1.ConfigsPager(projectService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_configs
  });

  test('getConfig request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getConfig() result:');
    // begin-get_config

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    let res;
    try {
      res = await projectService.getConfig(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_config
  });

  test('updateConfig request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateConfig() result:');
    // begin-update_config

    // Request models needed by this operation.

    // ProjectConfigDefinitionPatchDAConfigDefinitionPropertiesPatch
    const projectConfigDefinitionPatchModel = {
      name: 'env-stage',
      inputs: {
        account_id: 'account_id',
        resource_group: 'stage',
        access_tags: ['env:stage'],
        logdna_name: 'LogDNA_stage_service',
        sysdig_name: 'SysDig_stage_service',
      },
    };

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      definition: projectConfigDefinitionPatchModel,
    };

    let res;
    try {
      res = await projectService.updateConfig(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_config
  });

  test('forceApprove request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('forceApprove() result:');
    // begin-force_approve

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      comment: 'Approving the changes',
    };

    let res;
    try {
      res = await projectService.forceApprove(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-force_approve
  });

  test('approve request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('approve() result:');
    // begin-approve

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      comment: 'Approving the changes',
    };

    let res;
    try {
      res = await projectService.approve(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-approve
  });

  test('validateConfig request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('validateConfig() result:');
    // begin-validate_config

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    let res;
    try {
      res = await projectService.validateConfig(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-validate_config
  });

  test('deployConfig request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deployConfig() result:');
    // begin-deploy_config

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    let res;
    try {
      res = await projectService.deployConfig(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-deploy_config
  });

  test('undeployConfig request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('undeployConfig() result:');
    // begin-undeploy_config

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    let res;
    try {
      res = await projectService.undeployConfig(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-undeploy_config
  });

  test('syncConfig request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-sync_config

    // Request models needed by this operation.

    // SchematicsWorkspace
    const schematicsWorkspaceModel = {
      workspace_crn:
        'crn:v1:staging:public:schematics:us-south:a/38acaf4469814090a4e675dc0c317a0d:95ad49de-ab96-4e7d-a08c-45c38aa448e6:workspace:us-south.workspace.service.e0106139',
    };

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      schematics: schematicsWorkspaceModel,
    };

    try {
      await projectService.syncConfig(params);
    } catch (err) {
      console.warn(err);
    }

    // end-sync_config
  });

  test('listConfigResources request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listConfigResources() result:');
    // begin-list_config_resources

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    let res;
    try {
      res = await projectService.listConfigResources(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_config_resources
  });

  test('listConfigVersions request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listConfigVersions() result:');
    // begin-list_config_versions

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    let res;
    try {
      res = await projectService.listConfigVersions(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_config_versions
  });

  test('getConfigVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getConfigVersion() result:');
    // begin-get_config_version

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      version: 38,
    };

    let res;
    try {
      res = await projectService.getConfigVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_config_version
  });

  test('deleteProjectEnvironment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteProjectEnvironment() result:');
    // begin-delete_project_environment

    const params = {
      projectId: projectIdLink,
      id: projectIdLink,
    };

    let res;
    try {
      res = await projectService.deleteProjectEnvironment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_project_environment
  });

  test('deleteConfig request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteConfig() result:');
    // begin-delete_config

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    let res;
    try {
      res = await projectService.deleteConfig(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_config
  });

  test('deleteConfigVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteConfigVersion() result:');
    // begin-delete_config_version

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      version: 38,
    };

    let res;
    try {
      res = await projectService.deleteConfigVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_config_version
  });

  test('deleteProject request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteProject() result:');
    // begin-delete_project

    const params = {
      id: projectIdLink,
    };

    let res;
    try {
      res = await projectService.deleteProject(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_project
  });
});
