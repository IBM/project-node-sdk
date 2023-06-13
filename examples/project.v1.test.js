/**
 * @jest-environment node
 */
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

    // ProjectConfigPrototype
    const projectConfigPrototypeModel = {
      name: 'common-variables',
      locator_id:
        '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global',
    };

    const params = {
      resourceGroup: 'Default',
      location: 'us-south',
      name: 'acme-microservice',
      description: 'A microservice to deploy on top of ACME infrastructure.',
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

    // ProjectConfigInputVariable
    const projectConfigInputVariableModel = {
      name: 'account_id',
      value: 'account_id',
    };

    // ProjectConfigSettingCollection
    const projectConfigSettingCollectionModel = {
      name: 'IBMCLOUD_TOOLCHAIN_ENDPOINT',
      value: 'https://api.us-south.devops.dev.cloud.ibm.com',
    };

    const params = {
      projectId: projectIdLink,
      name: 'env-stage',
      locatorId: '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global',
      labels: ['env:stage', 'governance:test', 'build:0'],
      description:
        'Stage environment configuration, which includes services common to all the environment regions. There must be a blueprint configuring all the services common to the stage regions. It is a terraform_template type of configuration that points to a Github repo hosting the terraform modules that can be deployed by a Schematics Workspace.',
      input: [projectConfigInputVariableModel],
      setting: [projectConfigSettingCollectionModel],
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
    };

    let res;
    try {
      res = await projectService.listConfigs(params);
      console.log(JSON.stringify(res.result, null, 2));
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

    // ProjectConfigInputVariable
    const projectConfigInputVariableModel = {
      name: 'account_id',
      value: 'account_id',
    };

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      input: [projectConfigInputVariableModel],
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

  test('checkConfig request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('checkConfig() result:');
    // begin-check_config

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    let res;
    try {
      res = await projectService.checkConfig(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-check_config
  });

  test('installConfig request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('installConfig() result:');
    // begin-install_config

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    let res;
    try {
      res = await projectService.installConfig(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-install_config
  });

  test('uninstallConfig request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-uninstall_config

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    try {
      await projectService.uninstallConfig(params);
    } catch (err) {
      console.warn(err);
    }

    // end-uninstall_config
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

  test('listConfigDrafts request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listConfigDrafts() result:');
    // begin-list_config_drafts

    const params = {
      projectId: projectIdLink,
      configId: 'testString',
    };

    let res;
    try {
      res = await projectService.listConfigDrafts(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_config_drafts
  });

  test('getConfigDraft request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getConfigDraft() result:');
    // begin-get_config_draft

    const params = {
      projectId: projectIdLink,
      configId: 'testString',
      version: 38,
    };

    let res;
    try {
      res = await projectService.getConfigDraft(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_config_draft
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

  test('deleteProject request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_project

    const params = {
      id: projectIdLink,
    };

    try {
      await projectService.deleteProject(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_project
  });
});
