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

const ProjectV1 = require('../../dist/project/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 35000;

// Location of our config file.
const configFile = 'project_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('ProjectV1_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let projectService;

  // Variables to hold link values
  let configIdLink;
  let projectIdLink;

  test('Initialize service', async () => {
    projectService = ProjectV1.newInstance();

    expect(projectService).not.toBeNull();

    const config = readExternalSources(ProjectV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();
  
    projectService.enableRetries();
  });

  test('createProject()', async () => {
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
      labels: ['env:stage', 'governance:test', 'build:0'],
      description: 'testString',
      locator_id: '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global',
      input: [inputVariableInputModel],
      setting: [configSettingItemsModel],
    };

    const params = {
      name: 'acme-microservice',
      description: 'A microservice to deploy on top of ACME infrastructure.',
      configs: [projectConfigInputModel],
      resourceGroup: 'Default',
      location: 'us-south',
    };

    const res = await projectService.createProject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    projectIdLink = res.result.id;
  });

  test('createConfig()', async () => {
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
      locatorId:
        '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global',
      labels: ['env:stage', 'governance:test', 'build:0'],
      description:
        'Stage environment configuration, which includes services common to all the environment regions. There must be a blueprint configuring all the services common to the stage regions. It is a terraform_template type of configuration that points to a Github repo hosting the terraform modules that can be deployed by a Schematics Workspace.',
      input: [inputVariableInputModel],
      setting: [configSettingItemsModel],
    };

    const res = await projectService.createConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    configIdLink = res.result.id;
  });

  test('listProjects()', async () => {
    const params = {
      start: 'testString',
      limit: 1,
      complete: false,
    };

    const res = await projectService.listProjects(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listProjects() via ProjectsPager', async () => {
    const params = {
      limit: 10,
      complete: false,
    };

    const allResults = [];

    // Test getNext().
    let pager = new ProjectV1.ProjectsPager(projectService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new ProjectV1.ProjectsPager(projectService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getProject()', async () => {
    const params = {
      projectId: projectIdLink,
      excludeConfigs: false,
      complete: false,
    };

    const res = await projectService.getProject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateProject()', async () => {
    // Request models needed by this operation.

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      name: 'newName',
    };

    const params = {
      projectId: projectIdLink,
      jsonPatchOperation: [jsonPatchOperationModel],
    };

    const res = await projectService.updateProject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });


  test('listConfigs()', async () => {
    const params = {
      projectId: projectIdLink,
      version: 'active',
      complete: false,
    };

    const res = await projectService.listConfigs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getConfig()', async () => {
    const params = {
      projectId: projectIdLink,
      configId: configIdLink,
      version: 'draft',
      complete: false,
    };

    const res = await projectService.getConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateConfig()', async () => {
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
      complete: false,
    };

    const res = await projectService.updateConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getConfigDiff()', async () => {
    const params = {
      projectId: projectIdLink,
      configId: configIdLink,
    };

    const res = await projectService.getConfigDiff(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('forceMerge()', async () => {
    const params = {
      projectId: projectIdLink,
      configId: configIdLink,
      comment: 'Approving the changes',
      complete: false,
    };

    const res = await projectService.forceMerge(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('createDraftAction()', async () => {
    const params = {
      projectId: projectIdLink,
      configId: configIdLink,
      action: 'merge',
      comment: 'Approving the changes',
      complete: false,
    };

    const res = await projectService.createDraftAction(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('checkConfig()', async () => {
    const params = {
      projectId: projectIdLink,
      configId: configIdLink,
      xAuthRefreshToken: 'testString',
      version: 'active',
      complete: false,
    };

    const res = await projectService.checkConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('installConfig()', async () => {
    const params = {
      projectId: projectIdLink,
      configId: configIdLink,
      complete: false,
    };

    const res = await projectService.installConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('uninstallConfig()', async () => {
    const params = {
      projectId: projectIdLink,
      configId: configIdLink,
    };

    const res = await projectService.uninstallConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test.skip('getSchematicsJob()', async () => {
    const params = {
      projectId: projectIdLink,
      configId: configIdLink,
      action: 'plan',
      since: 38,
    };

    const res = await projectService.getSchematicsJob(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test.skip('getCostEstimate()', async () => {
    const params = {
      projectId: projectIdLink,
      configId: configIdLink,
      version: 'active',
    };

    const res = await projectService.getCostEstimate(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('postNotification()', async () => {
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

    const res = await projectService.postNotification(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getNotifications()', async () => {
    const params = {
      projectId: projectIdLink,
    };

    const res = await projectService.getNotifications(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('receivePulsarCatalogEvents()', async () => {
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

    const params = {
      pulsarCatalogEvents: [pulsarEventItemsModel],
    };

    const res = await projectService.receivePulsarCatalogEvents(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('getHealth()', async () => {
    const params = {
      info: false,
    };

    const res = await projectService.getHealth(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test.skip('replaceServiceInstance()', async () => {
    const params = {
      instanceId: 'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::',
      serviceId: 'testString',
      planId: 'testString',
      context: ['testString'],
      parameters: { foo: 'bar' },
      previousValues: ['testString'],
      xBrokerApiVersion: '1.0',
      xBrokerApiOriginatingIdentity: 'ibmcloud eyJpYW1fbWQiOiJJQk2pZC03MEdOUjcxN2lFIn0=',
      acceptsIncomplete: false,
    };

    const res = await projectService.replaceServiceInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test.skip('updateServiceInstance()', async () => {
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

    const res = await projectService.updateServiceInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test.skip('getLastOperation()', async () => {
    const params = {
      instanceId: 'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::',
      xBrokerApiVersion: '1.0',
      operation: 'ABCD',
      planId: 'cb54391b-3316-4943-a5a6-a541678c1924',
      serviceId: 'cb54391b-3316-4943-a5a6-a541678c1924',
    };

    const res = await projectService.getLastOperation(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test.skip('replaceServiceInstanceState()', async () => {
    const params = {
      instanceId: 'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::',
      enabled: true,
      initiatorId: 'testString',
      reasonCode: { foo: 'bar' },
      planId: 'testString',
      previousValues: ['testString'],
      xBrokerApiVersion: '1.0',
    };

    const res = await projectService.replaceServiceInstanceState(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test.skip('getServiceInstance()', async () => {
    const params = {
      instanceId: 'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::',
      xBrokerApiVersion: '1.0',
    };

    const res = await projectService.getServiceInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test.skip('getCatalog()', async () => {
    const params = {
      xBrokerApiVersion: '1.0',
    };

    const res = await projectService.getCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test.skip('postEventNotificationsIntegration()', async () => {
    const params = {
      projectId: projectIdLink,
      instanceCrn: 'CRN of event notifications instance',
      description: 'A sample project source.',
      eventNotificationsSourceName: 'project 1 source name for event notifications',
      enabled: true,
    };

    const res = await projectService.postEventNotificationsIntegration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test.skip('getEventNotificationsIntegration()', async () => {
    const params = {
      projectId: projectIdLink,
    };

    const res = await projectService.getEventNotificationsIntegration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test.skip('postTestEventNotification()', async () => {
    const params = {
      projectId: projectIdLink,
      ibmendefaultlong: 'long test notification message',
      ibmendefaultshort: 'Test notification',
    };

    const res = await projectService.postTestEventNotification(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteConfig()', async () => {
    const params = {
      projectId: projectIdLink,
      configId: configIdLink,
      draftOnly: false,
      destroy: false,
    };

    const res = await projectService.deleteConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test.skip('deleteNotification()', async () => {
    const params = {
      projectId: projectIdLink,
    };

    const res = await projectService.deleteNotification(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test.skip('deleteEventNotificationsIntegration()', async () => {
    const params = {
      projectId: projectIdLink,
    };

    const res = await projectService.deleteEventNotificationsIntegration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteProject()', async () => {
    const params = {
      projectId: projectIdLink,
      destroy: false,
    };

    const res = await projectService.deleteProject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test.skip('deleteServiceInstance()', async () => {
    const params = {
      instanceId: 'crn:v1:staging:public:project:global:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::',
      planId: 'cb54391b-3316-4943-a5a6-a541678c1924',
      serviceId: 'cb54391b-3316-4943-a5a6-a541678c1924',
      xBrokerApiVersion: '1.0',
      xBrokerApiOriginatingIdentity: 'ibmcloud eyJpYW1fbWQiOiJJQk2pZC03MEdOUjcxN2lFIn0=',
      acceptsIncomplete: false,
    };

    const res = await projectService.deleteServiceInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
});
