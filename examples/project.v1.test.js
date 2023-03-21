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
  let projectIdLink;
  let configIdLink;

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

    // ProjectConfigInput
    const projectConfigInputModel = {
      name: 'common-variables',
      locator_id: '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global',
    };

    const params = {
      name: 'acme-microservice',
      description: 'A microservice to deploy on top of ACME infrastructure.',
      configs: [projectConfigInputModel],
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
      complete: false,
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
      projectId: projectIdLink,
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

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      Labels: ['env:stage', 'governance:test', 'build:0'],
      Description: 'new',
      Input: [inputVariableInputModel],
      Setting: [configSettingItemsModel],
    };

    const params = {
      projectId: projectIdLink,
      jsonPatchOperation: [jsonPatchOperationModel],
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

    // InputVariableInput
    const inputVariableInputModel = {
      name: 'account_id',
    };

    // ConfigSettingItems
    const configSettingItemsModel = {
      name: 'IBMCLOUD_TOOLCHAIN_ENDPOINT',
      value: 'https://api.us-south.devops.dev.cloud.ibm.com',
    };

    const params = {
      projectId: projectIdLink,
      name: 'env-stage',
      locatorId: '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global',
      labels: ['env:stage', 'governance:test', 'build:0'],
      description: 'Stage environment configuration, which includes services common to all the environment regions. There must be a blueprint configuring all the services common to the stage regions. It is a terraform_template type of configuration that points to a Github repo hosting the terraform modules that can be deployed by a Schematics Workspace.',
      input: [inputVariableInputModel],
      setting: [configSettingItemsModel],
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
      configId: configIdLink,
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

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      "name": "new-config-name",
      "type": "terraform_templatef",
    };

    const params = {
      projectId: projectIdLink,
      configId: configIdLink,
      projectConfig: [jsonPatchOperationModel],
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

  test('getConfigDiff request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getConfigDiff() result:');
    // begin-get_config_diff

    const params = {
      projectId: projectIdLink,
      configId: configIdLink,
    };

    let res;
    try {
      res = await projectService.getConfigDiff(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_config_diff
  });

  test('forceMerge request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('forceMerge() result:');
    // begin-force_merge

    const params = {
      projectId: projectIdLink,
      configId: configIdLink,
      comment: 'Approving the changes',
    };

    let res;
    try {
      res = await projectService.forceMerge(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-force_merge
  });

  test('createDraftAction request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createDraftAction() result:');
    // begin-create_draft_action

    const params = {
      projectId: projectIdLink,
      configId: configIdLink,
      action: 'merge',
      comment: 'Approving the changes',
    };

    let res;
    try {
      res = await projectService.createDraftAction(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_draft_action
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
      configId: configIdLink,
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
      configId: configIdLink,
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
      configId: configIdLink,
    };

    try {
      await projectService.uninstallConfig(params);
    } catch (err) {
      console.warn(err);
    }

    // end-uninstall_config
  });

  test('getSchematicsJob request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getSchematicsJob() result:');
    // begin-get_schematics_job

    const params = {
      projectId: projectIdLink,
      configId: configIdLink,
      action: 'plan',
    };

    let res;
    try {
      res = await projectService.getSchematicsJob(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_schematics_job
  });

  test('getCostEstimate request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getCostEstimate() result:');
    // begin-get_cost_estimate

    const params = {
      projectId: projectIdLink,
      configId: configIdLink,
    };

    let res;
    try {
      res = await projectService.getCostEstimate(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_cost_estimate
  });

  test('postNotification request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('postNotification() result:');
    // begin-post_notification

    // Request models needed by this operation.

    // NotificationEvent
    const notificationEventModel = {
      event: 'project.create.failed',
      target: '234234324-3444-4556-224232432',
      source: 'id.of.project.service.instance',
      triggered_by: 'user-iam-id',
      action_url: 'actionable/url',
      data: { field1: 1 },
    };

    const params = {
      projectId: projectIdLink,
      notifications: [notificationEventModel],
    };

    let res;
    try {
      res = await projectService.postNotification(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-post_notification
  });

  test('getNotifications request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getNotifications() result:');
    // begin-get_notifications

    const params = {
      projectId: projectIdLink,
    };

    let res;
    try {
      res = await projectService.getNotifications(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_notifications
  });

  test('receivePulsarCatalogEvents request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-receive_pulsar_catalog_events

    // Request models needed by this operation.

    // PulsarEventItems
    const pulsarEventItemsModel = {
      event_type: 'testString',
      timestamp: '2019-01-01T12:00:00.000Z',
      publisher: 'testString',
      account_id: 'testString',
      version: 'testString',
      foo: 'testString',
    };

    const params = {
      pulsarCatalogEvents: [pulsarEventItemsModel],
    };

    try {
      await projectService.receivePulsarCatalogEvents(params);
    } catch (err) {
      console.warn(err);
    }

    // end-receive_pulsar_catalog_events
  });

  test('getHealth request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getHealth() result:');
    // begin-get_health

    let res;
    try {
      res = await projectService.getHealth({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_health
  });

  test('replaceServiceInstance request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceServiceInstance() result:');
    // begin-replace_service_instance

    const params = {
      instanceId: 'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::',
      serviceId: 'testString',
      planId: 'testString',
      xBrokerApiVersion: '1.0',
      xBrokerApiOriginatingIdentity: 'ibmcloud eyJpYW1fbWQiOiJJQk2pZC03MEdOUjcxN2lFIn0=',
      acceptsIncomplete: false,
    };

    let res;
    try {
      res = await projectService.replaceServiceInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_service_instance
  });

  test('updateServiceInstance request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateServiceInstance() result:');
    // begin-update_service_instance

    // Request models needed by this operation.

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      "name": "new-instance-name",
      "type": "terraform_templatef",
    };

    const params = {
      instanceId: 'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::',
      jsonPatchOperation: [jsonPatchOperationModel],
      xBrokerApiVersion: '1.0',
      xBrokerApiOriginatingIdentity: 'ibmcloud eyJpYW1fbWQiOiJJQk2pZC03MEdOUjcxN2lFIn0=',
      acceptsIncomplete: false,
    };

    let res;
    try {
      res = await projectService.updateServiceInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_service_instance
  });

  test('getLastOperation request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getLastOperation() result:');
    // begin-get_last_operation

    const params = {
      instanceId: 'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::',
      xBrokerApiVersion: '1.0',
      operation: 'ABCD',
      planId: 'cb54391b-3316-4943-a5a6-a541678c1924',
      serviceId: 'cb54391b-3316-4943-a5a6-a541678c1924',
    };

    let res;
    try {
      res = await projectService.getLastOperation(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_last_operation
  });

  test('replaceServiceInstanceState request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceServiceInstanceState() result:');
    // begin-replace_service_instance_state

    const params = {
      instanceId: 'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::',
      enabled: true,
      xBrokerApiVersion: '1.0',
    };

    let res;
    try {
      res = await projectService.replaceServiceInstanceState(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_service_instance_state
  });

  test('getServiceInstance request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getServiceInstance() result:');
    // begin-get_service_instance

    const params = {
      instanceId: 'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::',
      xBrokerApiVersion: '1.0',
    };

    let res;
    try {
      res = await projectService.getServiceInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_service_instance
  });

  test('getCatalog request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getCatalog() result:');
    // begin-get_catalog

    const params = {
      xBrokerApiVersion: '1.0',
    };

    let res;
    try {
      res = await projectService.getCatalog(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_catalog
  });

  test('postEventNotificationsIntegration request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('postEventNotificationsIntegration() result:');
    // begin-post_event_notifications_integration

    const params = {
      projectId: projectIdLink,
      instanceCrn: 'CRN of event notifications instance',
      description: 'A sample project source.',
      eventNotificationsSourceName: 'project 1 source name for event notifications',
      enabled: true,
    };

    let res;
    try {
      res = await projectService.postEventNotificationsIntegration(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-post_event_notifications_integration
  });

  test('getEventNotificationsIntegration request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getEventNotificationsIntegration() result:');
    // begin-get_event_notifications_integration

    const params = {
      projectId: projectIdLink,
    };

    let res;
    try {
      res = await projectService.getEventNotificationsIntegration(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_event_notifications_integration
  });

  test('postTestEventNotification request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('postTestEventNotification() result:');
    // begin-post_test_event_notification

    const params = {
      projectId: projectIdLink,
      ibmendefaultlong: 'long test notification message',
      ibmendefaultshort: 'Test notification',
    };

    let res;
    try {
      res = await projectService.postTestEventNotification(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-post_test_event_notification
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
      configId: configIdLink,
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

  test('deleteNotification request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_notification

    const params = {
      projectId: projectIdLink,
    };

    try {
      await projectService.deleteNotification(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_notification
  });

  test('deleteEventNotificationsIntegration request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_event_notifications_integration

    const params = {
      projectId: projectIdLink,
    };

    try {
      await projectService.deleteEventNotificationsIntegration(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_event_notifications_integration
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
      projectId: projectIdLink,
    };

    try {
      await projectService.deleteProject(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_project
  });

  test('deleteServiceInstance request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteServiceInstance() result:');
    // begin-delete_service_instance

    const params = {
      instanceId: 'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::',
      planId: 'cb54391b-3316-4943-a5a6-a541678c1924',
      serviceId: 'cb54391b-3316-4943-a5a6-a541678c1924',
      xBrokerApiVersion: '1.0',
      xBrokerApiOriginatingIdentity: 'ibmcloud eyJpYW1fbWQiOiJJQk2pZC03MEdOUjcxN2lFIn0=',
      acceptsIncomplete: false,
    };

    let res;
    try {
      res = await projectService.deleteServiceInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_service_instance
  });
});
