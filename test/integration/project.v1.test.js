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

const { readExternalSources } = require('ibm-cloud-sdk-core');
const ProjectV1 = require('../../dist/project/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

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

    // ProjectPrototypeDefinition
    const projectPrototypeDefinitionModel = {
      name: 'acme-microservice',
      destroy_on_delete: true,
      description: 'A microservice to deploy on top of ACME infrastructure.',
      monitoring_enabled: false,
    };

    // ProjectComplianceProfile
    const projectComplianceProfileModel = {
      id: 'testString',
      instance_id: 'testString',
      instance_location: 'testString',
      attachment_id: 'testString',
      profile_name: 'testString',
    };

    // ProjectConfigAuth
    const projectConfigAuthModel = {
      trusted_profile_id: 'testString',
      method: 'api_key',
      api_key: 'testString',
    };

    // ProjectConfigDefinitionPrototypeDAConfigDefinitionPropertiesPrototype
    const projectConfigDefinitionPrototypeModel = {
      compliance_profile: projectComplianceProfileModel,
      locator_id: '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global',
      description: 'The stage account configuration.',
      name: 'account-stage',
      environment_id: 'testString',
      authorizations: projectConfigAuthModel,
      inputs: { anyKey: 'anyValue' },
      settings: { anyKey: 'anyValue' },
    };

    // SchematicsWorkspace
    const schematicsWorkspaceModel = {
      workspace_crn: 'crn:v1:staging:public:project:us-south:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::',
    };

    // ProjectConfigPrototype
    const projectConfigPrototypeModel = {
      definition: projectConfigDefinitionPrototypeModel,
      schematics: schematicsWorkspaceModel,
    };

    // EnvironmentDefinitionRequiredProperties
    const environmentDefinitionRequiredPropertiesModel = {
      description: 'testString',
      name: 'testString',
      authorizations: projectConfigAuthModel,
      inputs: { anyKey: 'anyValue' },
      compliance_profile: projectComplianceProfileModel,
    };

    // EnvironmentPrototype
    const environmentPrototypeModel = {
      definition: environmentDefinitionRequiredPropertiesModel,
    };

    const params = {
      definition: projectPrototypeDefinitionModel,
      location: 'us-south',
      resourceGroup: 'Default',
      configs: [projectConfigPrototypeModel],
      environments: [environmentPrototypeModel],
    };

    const res = await projectService.createProject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    projectIdLink = res.result.id;
  });

  test('createConfig()', async () => {
    // Request models needed by this operation.

    // ProjectComplianceProfile
    const projectComplianceProfileModel = {
      id: 'testString',
      instance_id: 'testString',
      instance_location: 'testString',
      attachment_id: 'testString',
      profile_name: 'testString',
    };

    // ProjectConfigAuth
    const projectConfigAuthModel = {
      trusted_profile_id: 'testString',
      method: 'api_key',
      api_key: 'testString',
    };

    // ProjectConfigDefinitionPrototypeDAConfigDefinitionPropertiesPrototype
    const projectConfigDefinitionPrototypeModel = {
      compliance_profile: projectComplianceProfileModel,
      locator_id: '1082e7d2-5e2f-0a11-a3bc-f88a8e1931fc.018edf04-e772-4ca2-9785-03e8e03bef72-global',
      description: 'The stage environment configuration.',
      name: 'env-stage',
      environment_id: 'testString',
      authorizations: projectConfigAuthModel,
      inputs: { account_id: 'account_id', resource_group: 'stage', access_tags: ['env:stage'], logdna_name: 'LogDNA_stage_service', sysdig_name: 'SysDig_stage_service' },
      settings: { anyKey: 'anyValue' },
    };

    // SchematicsWorkspace
    const schematicsWorkspaceModel = {
      workspace_crn: 'crn:v1:staging:public:project:us-south:a/4e1c48fcf8ac33c0a2441e4139f189ae:bf40ad13-b107-446a-8286-c6d576183bb1::',
    };

    const params = {
      projectId: projectIdLink,
      definition: projectConfigDefinitionPrototypeModel,
      schematics: schematicsWorkspaceModel,
    };

    const res = await projectService.createConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    configIdLink = res.result.id;
  });

  test('listProjects()', async () => {
    const params = {
      token: 'testString',
      limit: 10,
    };

    const res = await projectService.listProjects(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listProjects() via ProjectsPager', async () => {
    const params = {
      limit: 10,
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
    };

    const res = await projectService.getProject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateProject()', async () => {
    // Request models needed by this operation.

    // ProjectPatchDefinitionBlock
    const projectPatchDefinitionBlockModel = {
      name: 'acme-microservice',
      destroy_on_delete: true,
      description: 'A microservice to deploy on top of ACME infrastructure.',
      monitoring_enabled: true,
    };

    const params = {
      id: projectIdLink,
      definition: projectPatchDefinitionBlockModel,
    };

    const res = await projectService.updateProject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listProjectResources()', async () => {
    const params = {
      id: projectIdLink,
      start: 'testString',
      limit: 10,
    };

    const res = await projectService.listProjectResources(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listProjectResources() via ProjectResourcesPager', async () => {
    const params = {
      id: projectIdLink,
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new ProjectV1.ProjectResourcesPager(projectService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new ProjectV1.ProjectResourcesPager(projectService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('createProjectEnvironment()', async () => {
    // Request models needed by this operation.

    // ProjectConfigAuth
    const projectConfigAuthModel = {
      trusted_profile_id: 'Profile-9ac10c5c-195c-41ef-b465-68a6b6dg5f12',
      method: 'trusted_profile',
      api_key: 'testString',
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

    const res = await projectService.createProjectEnvironment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('listProjectEnvironments()', async () => {
    const params = {
      projectId: projectIdLink,
      token: 'testString',
      limit: 10,
    };

    const res = await projectService.listProjectEnvironments(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listProjectEnvironments() via ProjectEnvironmentsPager', async () => {
    const params = {
      projectId: projectIdLink,
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new ProjectV1.ProjectEnvironmentsPager(projectService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new ProjectV1.ProjectEnvironmentsPager(projectService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getProjectEnvironment()', async () => {
    const params = {
      projectId: projectIdLink,
      id: projectIdLink,
    };

    const res = await projectService.getProjectEnvironment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateProjectEnvironment()', async () => {
    // Request models needed by this operation.

    // ProjectConfigAuth
    const projectConfigAuthModel = {
      trusted_profile_id: 'Profile-9ac10c5c-195c-41ef-b465-68a6b6dg5f12',
      method: 'trusted_profile',
      api_key: 'testString',
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

    const res = await projectService.updateProjectEnvironment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listConfigs()', async () => {
    const params = {
      projectId: projectIdLink,
      token: 'testString',
      limit: 10,
    };

    const res = await projectService.listConfigs(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listConfigs() via ConfigsPager', async () => {
    const params = {
      projectId: projectIdLink,
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new ProjectV1.ConfigsPager(projectService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new ProjectV1.ConfigsPager(projectService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getConfig()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    const res = await projectService.getConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateConfig()', async () => {
    // Request models needed by this operation.

    // ProjectComplianceProfile
    const projectComplianceProfileModel = {
      id: 'testString',
      instance_id: 'testString',
      instance_location: 'testString',
      attachment_id: 'testString',
      profile_name: 'testString',
    };

    // ProjectConfigAuth
    const projectConfigAuthModel = {
      trusted_profile_id: 'testString',
      method: 'api_key',
      api_key: 'testString',
    };

    // ProjectConfigDefinitionPatchDAConfigDefinitionPropertiesPatch
    const projectConfigDefinitionPatchModel = {
      compliance_profile: projectComplianceProfileModel,
      locator_id: 'testString',
      description: 'testString',
      name: 'env-stage',
      environment_id: 'testString',
      authorizations: projectConfigAuthModel,
      inputs: { account_id: 'account_id', resource_group: 'stage', access_tags: ['env:stage'], logdna_name: 'LogDNA_stage_service', sysdig_name: 'SysDig_stage_service' },
      settings: { anyKey: 'anyValue' },
    };

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      definition: projectConfigDefinitionPatchModel,
    };

    const res = await projectService.updateConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('forceApprove()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      comment: 'Approving the changes',
    };

    const res = await projectService.forceApprove(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('approve()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      comment: 'Approving the changes',
    };

    const res = await projectService.approve(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('validateConfig()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    const res = await projectService.validateConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('deployConfig()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    const res = await projectService.deployConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('undeployConfig()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    const res = await projectService.undeployConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('syncConfig()', async () => {
    // Request models needed by this operation.

    // SchematicsWorkspace
    const schematicsWorkspaceModel = {
      workspace_crn: 'crn:v1:staging:public:schematics:us-south:a/38acaf4469814090a4e675dc0c317a0d:95ad49de-ab96-4e7d-a08c-45c38aa448e6:workspace:us-south.workspace.service.e0106139',
    };

    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      schematics: schematicsWorkspaceModel,
    };

    const res = await projectService.syncConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('listConfigResources()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    const res = await projectService.listConfigResources(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listConfigVersions()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    const res = await projectService.listConfigVersions(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getConfigVersion()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      version: 38,
    };

    const res = await projectService.getConfigVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteProjectEnvironment()', async () => {
    const params = {
      projectId: projectIdLink,
      id: projectIdLink,
    };

    const res = await projectService.deleteProjectEnvironment(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteConfig()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
    };

    const res = await projectService.deleteConfig(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteConfigVersion()', async () => {
    const params = {
      projectId: projectIdLink,
      id: configIdLink,
      version: 38,
    };

    const res = await projectService.deleteConfigVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteProject()', async () => {
    const params = {
      id: projectIdLink,
    };

    const res = await projectService.deleteProject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });
});
