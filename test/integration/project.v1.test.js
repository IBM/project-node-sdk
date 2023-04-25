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

const { readExternalSources } = require('ibm-cloud-sdk-core');
const ProjectV1 = require('../../dist/project/v1');
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

    // ProjectConfigInputVariable
    const projectConfigInputVariableModel = {
      name: 'configVar1',
      value: 'configValue1',
    };

    // ProjectConfigSettingCollection
    const projectConfigSettingCollectionModel = {
      name: 'setting1',
      value: 'value1',
    };

    // ProjectConfigPrototype
    const projectConfigPrototypeModel = {
      id: 'testString',
      name: 'common-variables',
      labels: ['env:stage', 'governance:test', 'build:0'],
      description: 'testString',
      locator_id:
        '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global',
      input: [projectConfigInputVariableModel],
      setting: [projectConfigSettingCollectionModel],
    };

    const params = {
      resourceGroup: 'Default',
      location: 'us-south',
      name: 'acme-microservice',
      description: 'A microservice to deploy on top of ACME infrastructure.',
      configs: [projectConfigPrototypeModel],
    };

    const res = await projectService.createProject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    projectIdLink = res.result.id;
  });

  test('createConfig()', async () => {
    // Request models needed by this operation.

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
      id: projectIdLink,
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
      op: 'add',
      path: 'testString',
      from: 'testString',
      value: 'testString',
    };

    const params = {
      id: projectIdLink,
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
      id: configIdLink,
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
      op: 'add',
      path: 'testString',
      from: 'testString',
      value: 'testString',
    };

    const params = {
      projectId: 'testString',
      id: 'testString',
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
      id: configIdLink,
    };

    const res = await projectService.getConfigDiff(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('forceApprove()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      comment: 'Approving the changes',
      complete: false,
    };

    const res = await projectService.forceApprove(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('approve()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      comment: 'Approving the changes',
      complete: false,
    };

    const res = await projectService.approve(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('checkConfig()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      xAuthRefreshToken: 'token',
      complete: false,
      version: 'active',
    };

    const res = await projectService.checkConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('installConfig()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
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
      id: configIdLink,
    };

    const res = await projectService.uninstallConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('getSchematicsJob()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      action: 'plan',
      since: 38,
    };

    const res = await projectService.getSchematicsJob(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getCostEstimate()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      version: 'active',
    };

    const res = await projectService.getCostEstimate(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('postCrnToken()', async () => {
    const params = {
      id: projectIdLink,
    };

    const res = await projectService.postCrnToken(params);
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
      id: projectIdLink,
      notifications: [notificationEventModel],
    };

    const res = await projectService.postNotification(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getNotifications()', async () => {
    const params = {
      id: 'testString',
    };

    const res = await projectService.getNotifications(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('postEventNotificationsIntegration()', async () => {
    const params = {
      id: projectIdLink,
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

  test('getEventNotificationsIntegration()', async () => {
    const params = {
      id: projectIdLink,
    };

    const res = await projectService.getEventNotificationsIntegration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('postTestEventNotification()', async () => {
    const params = {
      id: projectIdLink,
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
      id: configIdLink,
      draftOnly: false,
      destroy: false,
    };

    const res = await projectService.deleteConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteEventNotificationsIntegration()', async () => {
    const params = {
      id: projectIdLink,
    };

    const res = await projectService.deleteEventNotificationsIntegration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
  test('deleteProject()', async () => {
    const params = {
      id: projectIdLink,
      destroy: false,
    };

    const res = await projectService.deleteProject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
});
