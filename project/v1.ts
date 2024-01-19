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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.80.0-29334a73-20230925-151553
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  UserOptions,
  getAuthenticatorFromEnvironment,
  getQueryParam,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * Manage infrastructure as code in IBM Cloud.
 *
 * API Version: 1.0.0
 */

class ProjectV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://projects.api.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'project';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of ProjectV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {ProjectV1}
   */

  public static newInstance(options: UserOptions): ProjectV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new ProjectV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a ProjectV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {ProjectV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(ProjectV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * projects
   ************************/

  /**
   * Create a project.
   *
   * Create a new project and asynchronously setup the tools to manage it. Add a deployable architecture by customizing
   * the configuration. After the changes are validated and approved, deploy the resources that the project configures.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {ProjectPrototypeDefinition} params.definition - The definition of the project.
   * @param {string} params.location - The IBM Cloud location where a resource is deployed.
   * @param {string} params.resourceGroup - The resource group name where the project's data and tools are created.
   * @param {ProjectConfigPrototype[]} [params.configs] - The project configurations. These configurations are only
   * included in the response of creating a project if a configs array is specified in the request payload.
   * @param {EnvironmentPrototype[]} [params.environments] - The project environments. These environments are only
   * included in the response of creating a project if a environments array is specified in the request payload.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.Project>>}
   */
  public createProject(
    params: ProjectV1.CreateProjectParams
  ): Promise<ProjectV1.Response<ProjectV1.Project>> {
    const _params = { ...params };
    const _requiredParams = ['definition', 'location', 'resourceGroup'];
    const _validParams = ['definition', 'location', 'resourceGroup', 'configs', 'environments', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'definition': _params.definition,
      'location': _params.location,
      'resource_group': _params.resourceGroup,
      'configs': _params.configs,
      'environments': _params.environments,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'createProject');

    const parameters = {
      options: {
        url: '/v1/projects',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List projects.
   *
   * List existing projects. Projects are sorted by ID.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - Marks the last entry that is returned on the page. The server uses this parameter
   * to determine the first entry that is returned on the next page. If this parameter is not specified, the logical
   * first page is returned.
   * @param {number} [params.limit] - Determine the maximum number of resources to return. The number of resources that
   * are returned is the same, with the exception of the last page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectCollection>>}
   */
  public listProjects(
    params?: ProjectV1.ListProjectsParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['start', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'start': _params.start,
      'limit': _params.limit,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'listProjects');

    const parameters = {
      options: {
        url: '/v1/projects',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a project.
   *
   * Get information about a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The unique project ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.Project>>}
   */
  public getProject(
    params: ProjectV1.GetProjectParams
  ): Promise<ProjectV1.Response<ProjectV1.Project>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'getProject');

    const parameters = {
      options: {
        url: '/v1/projects/{id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a project.
   *
   * Update a project by the ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The unique project ID.
   * @param {ProjectPatchDefinitionBlock} params.definition - The definition of the project.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.Project>>}
   */
  public updateProject(
    params: ProjectV1.UpdateProjectParams
  ): Promise<ProjectV1.Response<ProjectV1.Project>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'definition'];
    const _validParams = ['id', 'definition', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'definition': _params.definition,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'updateProject');

    const parameters = {
      options: {
        url: '/v1/projects/{id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a project.
   *
   * Delete a project document by the ID. A project can only be deleted after deleting all of its resources.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The unique project ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.EmptyObject>>}
   */
  public deleteProject(
    params: ProjectV1.DeleteProjectParams
  ): Promise<ProjectV1.Response<ProjectV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteProject');

    const parameters = {
      options: {
        url: '/v1/projects/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * environments
   ************************/

  /**
   * Create an environment.
   *
   * Create an environment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {EnvironmentDefinitionRequiredProperties} params.definition - The environment definition.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.Environment>>}
   */
  public createProjectEnvironment(
    params: ProjectV1.CreateProjectEnvironmentParams
  ): Promise<ProjectV1.Response<ProjectV1.Environment>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'definition'];
    const _validParams = ['projectId', 'definition', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'definition': _params.definition,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'createProjectEnvironment');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/environments',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List environments.
   *
   * Returns all environments.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.EnvironmentCollection>>}
   */
  public listProjectEnvironments(
    params: ProjectV1.ListProjectEnvironmentsParams
  ): Promise<ProjectV1.Response<ProjectV1.EnvironmentCollection>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'listProjectEnvironments');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/environments',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get an environment.
   *
   * Returns an environment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The environment ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.Environment>>}
   */
  public getProjectEnvironment(
    params: ProjectV1.GetProjectEnvironmentParams
  ): Promise<ProjectV1.Response<ProjectV1.Environment>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'getProjectEnvironment');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/environments/{id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update an environment.
   *
   * Update an environment by the ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The environment ID.
   * @param {EnvironmentDefinitionProperties} params.definition - The environment definition used for updates.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.Environment>>}
   */
  public updateProjectEnvironment(
    params: ProjectV1.UpdateProjectEnvironmentParams
  ): Promise<ProjectV1.Response<ProjectV1.Environment>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id', 'definition'];
    const _validParams = ['projectId', 'id', 'definition', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'definition': _params.definition,
    };

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'updateProjectEnvironment');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/environments/{id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete an environment.
   *
   * Delete an environment in a project by ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The environment ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.EnvironmentDeleteResponse>>}
   */
  public deleteProjectEnvironment(
    params: ProjectV1.DeleteProjectEnvironmentParams
  ): Promise<ProjectV1.Response<ProjectV1.EnvironmentDeleteResponse>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteProjectEnvironment');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/environments/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * configurations
   ************************/

  /**
   * Add a new configuration.
   *
   * Add a new configuration to a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {ProjectConfigPrototypeDefinitionBlock} params.definition -
   * @param {SchematicsWorkspace} [params.schematics] - A Schematics workspace to use for deploying this configuration.
   * Either schematics.workspace_crn, definition.locator_id, or both must be specified.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public createConfig(
    params: ProjectV1.CreateConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'definition'];
    const _validParams = ['projectId', 'definition', 'schematics', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'definition': _params.definition,
      'schematics': _params.schematics,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'createConfig');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List all project configurations.
   *
   * The collection of configurations that are returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigCollection>>}
   */
  public listConfigs(
    params: ProjectV1.ListConfigsParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigCollection>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'listConfigs');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a project configuration.
   *
   * Returns the specified project configuration in a specific project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique config ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public getConfig(
    params: ProjectV1.GetConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'getConfig');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a configuration.
   *
   * Update a configuration in a project by the ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique config ID.
   * @param {ProjectConfigPatchDefinitionBlock} params.definition -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public updateConfig(
    params: ProjectV1.UpdateConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id', 'definition'];
    const _validParams = ['projectId', 'id', 'definition', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'definition': _params.definition,
    };

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'updateConfig');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a configuration in a project by ID.
   *
   * Delete a configuration in a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique config ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigDelete>>}
   */
  public deleteConfig(
    params: ProjectV1.DeleteConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigDelete>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteConfig');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Force approve project configuration.
   *
   * Force approve configuration edits to the main configuration with an approving comment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique config ID.
   * @param {string} params.comment - Notes on the project draft action. If this is a forced approve on the draft
   * configuration, a non-empty comment is required.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigVersion>>}
   */
  public forceApprove(
    params: ProjectV1.ForceApproveParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigVersion>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id', 'comment'];
    const _validParams = ['projectId', 'id', 'comment', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'comment': _params.comment,
    };

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'forceApprove');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/force_approve',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Approve and merge a configuration draft.
   *
   * Approve and merge configuration edits to the main configuration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique config ID.
   * @param {string} [params.comment] - Notes on the project draft action. If this is a forced approve on the draft
   * configuration, a non-empty comment is required.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigVersion>>}
   */
  public approve(
    params: ProjectV1.ApproveParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigVersion>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'comment', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'comment': _params.comment,
    };

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'approve');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/approve',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Run a validation check.
   *
   * Run a validation check on a given configuration in project. The check includes creating or updating the associated
   * schematics workspace with a plan job, running the CRA scans, and cost estimatation.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique config ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigVersion>>}
   */
  public validateConfig(
    params: ProjectV1.ValidateConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigVersion>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'validateConfig');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/validate',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Deploy a configuration.
   *
   * Deploy a project's configuration. It's an asynchronous operation that can be tracked using the get project
   * configuration API with full metadata.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique config ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigVersion>>}
   */
  public deployConfig(
    params: ProjectV1.DeployConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigVersion>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'deployConfig');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/deploy',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Undeploy configuration resources.
   *
   * Undeploy a project's configuration resources. The operation undeploys all the resources that are deployed with the
   * specific configuration. You can track it by using the get project configuration API with full metadata.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique config ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.EmptyObject>>}
   */
  public undeployConfig(
    params: ProjectV1.UndeployConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'undeployConfig');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/undeploy',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Sync a project configuration.
   *
   * Sync a project configuration by analyzing the associated pipeline runs and schematics workspace logs to get the
   * configuration back to a working state.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique config ID.
   * @param {SchematicsWorkspace} [params.schematics] - A Schematics workspace to use for deploying this configuration.
   * Either schematics.workspace_crn, definition.locator_id, or both must be specified.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.EmptyObject>>}
   */
  public syncConfig(
    params: ProjectV1.SyncConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'schematics', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'schematics': _params.schematics,
    };

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'syncConfig');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/sync',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List the resources deployed by a configuration.
   *
   * A list of resources deployed by a configuraton.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique config ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigResourceCollection>>}
   */
  public listConfigResources(
    params: ProjectV1.ListConfigResourcesParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigResourceCollection>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'listConfigResources');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/resources',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a list of versions of a project configuration.
   *
   * Returns a list of previous and current versions of a project configuration in a specific project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique config ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigVersionSummaryCollection>>}
   */
  public listConfigVersions(
    params: ProjectV1.ListConfigVersionsParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigVersionSummaryCollection>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'listConfigVersions');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/versions',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a specific version of a project configuration.
   *
   * Returns a specific version of a project configuration in a specific project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique config ID.
   * @param {number} params.version - The configuration version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigVersion>>}
   */
  public getConfigVersion(
    params: ProjectV1.GetConfigVersionParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigVersion>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id', 'version'];
    const _validParams = ['projectId', 'id', 'version', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'getConfigVersion');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/versions/{version}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a configuration for the specified project ID and version.
   *
   * Delete a configuration in a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique config ID.
   * @param {number} params.version - The configuration version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigDelete>>}
   */
  public deleteConfigVersion(
    params: ProjectV1.DeleteConfigVersionParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigDelete>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id', 'version'];
    const _validParams = ['projectId', 'id', 'version', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteConfigVersion');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/versions/{version}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace ProjectV1 {
  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `createProject` operation. */
  export interface CreateProjectParams {
    /** The definition of the project. */
    definition: ProjectPrototypeDefinition;
    /** The IBM Cloud location where a resource is deployed. */
    location: string;
    /** The resource group name where the project's data and tools are created. */
    resourceGroup: string;
    /** The project configurations. These configurations are only included in the response of creating a project if
     *  a configs array is specified in the request payload.
     */
    configs?: ProjectConfigPrototype[];
    /** The project environments. These environments are only included in the response of creating a project if a
     *  environments array is specified in the request payload.
     */
    environments?: EnvironmentPrototype[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listProjects` operation. */
  export interface ListProjectsParams {
    /** Marks the last entry that is returned on the page. The server uses this parameter to determine the first
     *  entry that is returned on the next page. If this parameter is not specified, the logical first page is returned.
     */
    start?: string;
    /** Determine the maximum number of resources to return. The number of resources that are returned is the same,
     *  with the exception of the last page.
     */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProject` operation. */
  export interface GetProjectParams {
    /** The unique project ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateProject` operation. */
  export interface UpdateProjectParams {
    /** The unique project ID. */
    id: string;
    /** The definition of the project. */
    definition: ProjectPatchDefinitionBlock;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteProject` operation. */
  export interface DeleteProjectParams {
    /** The unique project ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createProjectEnvironment` operation. */
  export interface CreateProjectEnvironmentParams {
    /** The unique project ID. */
    projectId: string;
    /** The environment definition. */
    definition: EnvironmentDefinitionRequiredProperties;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listProjectEnvironments` operation. */
  export interface ListProjectEnvironmentsParams {
    /** The unique project ID. */
    projectId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProjectEnvironment` operation. */
  export interface GetProjectEnvironmentParams {
    /** The unique project ID. */
    projectId: string;
    /** The environment ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateProjectEnvironment` operation. */
  export interface UpdateProjectEnvironmentParams {
    /** The unique project ID. */
    projectId: string;
    /** The environment ID. */
    id: string;
    /** The environment definition used for updates. */
    definition: EnvironmentDefinitionProperties;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteProjectEnvironment` operation. */
  export interface DeleteProjectEnvironmentParams {
    /** The unique project ID. */
    projectId: string;
    /** The environment ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createConfig` operation. */
  export interface CreateConfigParams {
    /** The unique project ID. */
    projectId: string;
    definition: ProjectConfigPrototypeDefinitionBlock;
    /** A Schematics workspace to use for deploying this configuration.
     *  Either schematics.workspace_crn, definition.locator_id, or both must be specified.
     */
    schematics?: SchematicsWorkspace;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listConfigs` operation. */
  export interface ListConfigsParams {
    /** The unique project ID. */
    projectId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getConfig` operation. */
  export interface GetConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateConfig` operation. */
  export interface UpdateConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
    definition: ProjectConfigPatchDefinitionBlock;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteConfig` operation. */
  export interface DeleteConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `forceApprove` operation. */
  export interface ForceApproveParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
    /** Notes on the project draft action. If this is a forced approve on the draft configuration, a non-empty
     *  comment is required.
     */
    comment: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `approve` operation. */
  export interface ApproveParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
    /** Notes on the project draft action. If this is a forced approve on the draft configuration, a non-empty
     *  comment is required.
     */
    comment?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `validateConfig` operation. */
  export interface ValidateConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deployConfig` operation. */
  export interface DeployConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `undeployConfig` operation. */
  export interface UndeployConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `syncConfig` operation. */
  export interface SyncConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
    /** A Schematics workspace to use for deploying this configuration.
     *  Either schematics.workspace_crn, definition.locator_id, or both must be specified.
     */
    schematics?: SchematicsWorkspace;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listConfigResources` operation. */
  export interface ListConfigResourcesParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listConfigVersions` operation. */
  export interface ListConfigVersionsParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getConfigVersion` operation. */
  export interface GetConfigVersionParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
    /** The configuration version. */
    version: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteConfigVersion` operation. */
  export interface DeleteConfigVersionParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
    /** The configuration version. */
    version: number;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** The messages of apply jobs on the configuration. */
  export interface ActionJobApplyMessagesSummary {
    /** The collection of error messages. */
    error_messages?: TerraformLogAnalyzerErrorMessage[];
    /** The collection of success messages. */
    sucess_message?: TerraformLogAnalyzerSuccessMessage[];
  }

  /** The summary of the apply jobs on the configuration. */
  export interface ActionJobApplySummary {
    /** The number of applied resources. */
    success?: number;
    /** The number of failed resources. */
    failed?: number;
    /** The collection of successfully applied resources. */
    success_resources?: string[];
    /** The collection of failed applied resources. */
    failed_resources?: string[];
  }

  /** The messages of destroy jobs on the configuration. */
  export interface ActionJobDestroyMessagesSummary {
    /** The collection of error messages. */
    error_messages?: TerraformLogAnalyzerErrorMessage[];
  }

  /** The summary of the destroy jobs on the configuration. */
  export interface ActionJobDestroySummary {
    /** The number of destroyed resources. */
    success?: number;
    /** The number of failed resources. */
    failed?: number;
    /** The number of tainted resources. */
    tainted?: number;
    /** The destroy resources results from the job. */
    resources?: ActionJobDestroySummaryResources;
  }

  /** The destroy resources results from the job. */
  export interface ActionJobDestroySummaryResources {
    /** The collection of destroyed resources. */
    success?: string[];
    /** The collection of failed resources. */
    failed?: string[];
    /** The collection of tainted resources. */
    tainted?: string[];
  }

  /** The message summaries of jobs on the configuration. */
  export interface ActionJobMessageSummary {
    /** The number of info messages. */
    info?: number;
    /** The number of debug messages. */
    debug?: number;
    /** The number of error messages. */
    error?: number;
  }

  /** The plan messages on the configuration. */
  export interface ActionJobPlanMessagesSummary {
    /** The collection of error messages. */
    error_messages?: TerraformLogAnalyzerErrorMessage[];
    /** The collection of success messages. */
    sucess_message?: string[];
    /** The collection of update messages. */
    update_message?: string[];
    /** The collection of destroy messages. */
    destroy_message?: string[];
  }

  /** The summary of the plan jobs on the configuration. */
  export interface ActionJobPlanSummary {
    /** The number of resources to be added. */
    add?: number;
    /** The number of resources that failed during the plan job. */
    failed?: number;
    /** The number of resources to be updated. */
    update?: number;
    /** The number of resources to be destroyed. */
    destroy?: number;
    /** The collection of planned added resources. */
    add_resources?: string[];
    /** The collection of failed planned resources. */
    failed_resources?: string[];
    /** The collection of planned updated resources. */
    updated_resources?: string[];
    /** The collection of planned destroy resources. */
    destroy_resources?: string[];
  }

  /** The summaries of jobs that were performed on the configuration. */
  export interface ActionJobSummary {
    /** The summary of the plan jobs on the configuration. */
    plan_summary: ActionJobPlanSummary;
    /** The summary of the apply jobs on the configuration. */
    apply_summary: ActionJobApplySummary;
    /** The summary of the destroy jobs on the configuration. */
    destroy_summary: ActionJobDestroySummary;
    /** The message summaries of jobs on the configuration. */
    message_summary: ActionJobMessageSummary;
    /** The plan messages on the configuration. */
    plan_messages: ActionJobPlanMessagesSummary;
    /** The messages of apply jobs on the configuration. */
    apply_messages: ActionJobApplyMessagesSummary;
    /** The messages of destroy jobs on the configuration. */
    destroy_messages: ActionJobDestroyMessagesSummary;
  }

  /** A brief summary of an action. */
  export interface ActionJobWithIdAndSummary {
    /** The unique ID. */
    id: string;
    /** The summaries of jobs that were performed on the configuration. */
    summary: ActionJobSummary;
  }

  /** The Code Risk Analyzer logs summary of the configuration. */
  export interface CodeRiskAnalyzerLogsSummary {
    /** The total number of Code Risk Analyzer rules that were applied in the scan. */
    total?: string;
    /** The number of Code Risk Analyzer rules that passed in the scan. */
    passed?: string;
    /** The number of Code Risk Analyzer rules that failed in the scan. */
    failed?: string;
    /** The number of Code Risk Analyzer rules that were skipped in the scan. */
    skipped?: string;
  }

  /** CumulativeNeedsAttention. */
  export interface CumulativeNeedsAttention {
    /** The event name. */
    event?: string;
    /** A unique ID for that individual event. */
    event_id?: string;
    /** A unique ID for the configuration. */
    config_id?: string;
    /** The version number of the configuration. */
    config_version?: number;
  }

  /** The definition of a project environment. */
  export interface Environment {
    /** The environment id as a friendly name. */
    id: string;
    /** The project referenced by this resource. */
    project: ProjectReference;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** The target account ID derived from the authentication block values. */
    target_account?: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    modified_at: string;
    /** A URL. */
    href: string;
    /** The environment definition. */
    definition: EnvironmentDefinitionRequiredProperties;
  }

  /** The list environment response. */
  export interface EnvironmentCollection {
    /** The environments. */
    environments?: Environment[];
  }

  /** The environment definition used in the project collection. */
  export interface EnvironmentDefinitionNameDescription {
    /** The name of the environment.  It is unique within the account across projects and regions. */
    name?: string;
    /** The description of the environment. */
    description?: string;
  }

  /** The environment definition used for updates. */
  export interface EnvironmentDefinitionProperties {
    /** The name of the environment.  It is unique within the account across projects and regions. */
    name?: string;
    /** The description of the environment. */
    description?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables for configuration definition and environment. */
    inputs?: JsonObject;
    /** The profile required for compliance. */
    compliance_profile?: ProjectComplianceProfile;
  }

  /** The environment definition. */
  export interface EnvironmentDefinitionRequiredProperties {
    /** The name of the environment.  It is unique within the account across projects and regions. */
    name: string;
    /** The description of the environment. */
    description?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables for configuration definition and environment. */
    inputs?: JsonObject;
    /** The profile required for compliance. */
    compliance_profile?: ProjectComplianceProfile;
  }

  /** The delete environment response. */
  export interface EnvironmentDeleteResponse {
    /** The environment id as a friendly name. */
    id: string;
  }

  /** The definition of a project environment. */
  export interface EnvironmentPrototype {
    /** The environment definition. */
    definition: EnvironmentDefinitionRequiredProperties;
  }

  /** The action job performed on the project configuration. */
  export interface LastActionWithSummary {
    /** A URL. */
    href: string;
    /** The result of the last action. */
    result?: string;
    /** A brief summary of a pre/post action. */
    pre_job?: PrePostActionJobWithIdAndSummary;
    /** A brief summary of a pre/post action. */
    post_job?: PrePostActionJobWithIdAndSummary;
    /** A brief summary of an action. */
    job?: ActionJobWithIdAndSummary;
  }

  /** The action job performed on the project configuration. */
  export interface LastValidatedActionWithSummary {
    /** A URL. */
    href: string;
    /** The result of the last action. */
    result?: string;
    /** A brief summary of a pre/post action. */
    pre_job?: PrePostActionJobWithIdAndSummary;
    /** A brief summary of a pre/post action. */
    post_job?: PrePostActionJobWithIdAndSummary;
    /** A brief summary of an action. */
    job?: ActionJobWithIdAndSummary;
    /** The cost estimate of the configuration. It only exists after the first configuration validation. */
    cost_estimate?: ProjectConfigMetadataCostEstimate;
    /** The Code Risk Analyzer logs of the configuration. */
    cra_logs?: ProjectConfigMetadataCodeRiskAnalyzerLogs;
  }

  /** OutputValue. */
  export interface OutputValue {
    /** The variable name. */
    name: string;
    /** A short explanation of the output value. */
    description?: string;
    /** Can be any value - a string, number, boolean, array, or object. */
    value?: JsonObject;
  }

  /** A pagination link. */
  export interface PaginationLink {
    /** A URL. */
    href: string;
  }

  /** A brief summary of a pre/post action job. */
  export interface PrePostActionJobSummary {
    /** The ID of the Schematics action job that ran as part of the pre/post job. */
    job_id: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    start_time?: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    end_time?: string;
    /** The number of tasks run in the job. */
    tasks?: number;
    /** The number of tasks that successfully ran in the job. */
    ok?: number;
    /** The number of tasks that failed in the job. */
    failed?: number;
    /** The number of tasks that were skipped in the job. */
    skipped?: number;
    /** The number of tasks that were changed in the job. */
    changed?: number;
    /** A system-level error from the pipeline that ran for this specific pre- and post-job. */
    project_error?: PrePostActionJobSystemError;
  }

  /** System level error captured in the Projects Pipelines for pre/post job. */
  export interface PrePostActionJobSystemError {
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    timestamp: string;
    /** Id of user that triggered pipeline that ran pre/post job. */
    user_id: string;
    /** HTTP status code for the error. */
    status_code: string;
    /** Summary description of the error. */
    description: string;
    /** Detailed message from the source error. */
    error_response?: string;
  }

  /** A brief summary of a pre/post action. */
  export interface PrePostActionJobWithIdAndSummary {
    /** The unique ID. */
    id: string;
    /** A brief summary of a pre/post action job. */
    summary: PrePostActionJobSummary;
  }

  /** The canonical schema of a project. */
  export interface Project {
    /** An IBM Cloud resource name, which uniquely identifies a resource. */
    crn: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** The cumulative list of needs attention items for a project. If the view is successfully retrieved, an array
     *  which could be empty is returned.
     */
    cumulative_needs_attention_view: CumulativeNeedsAttention[];
    /** True indicates that the fetch of the needs attention items failed. It only exists if there was an error
     *  while retrieving the cumulative needs attention view.
     */
    cumulative_needs_attention_view_error?: boolean;
    /** The unique project ID. */
    id: string;
    /** The IBM Cloud location where a resource is deployed. */
    location: string;
    /** The resource group id where the project's data and tools are created. */
    resource_group_id: string;
    /** The project status value. */
    state: string;
    /** A URL. */
    href: string;
    /** The resource group name where the project's data and tools are created. */
    resource_group: string;
    /** The CRN of the event notifications instance if one is connected to this project. */
    event_notifications_crn?: string;
    /** The project configurations. These configurations are only included in the response of creating a project if
     *  a configs array is specified in the request payload.
     */
    configs: ProjectConfigSummary[];
    /** The project environments. These environments are only included in the response if project environments were
     *  created on the project.
     */
    environments: ProjectEnvironmentSummary[];
    /** The definition of the project. */
    definition: ProjectDefinitionProperties;
  }

  /** Projects list. */
  export interface ProjectCollection {
    /** A pagination limit. */
    limit: number;
    /** A pagination link. */
    first: PaginationLink;
    /** A pagination link. */
    next?: PaginationLink;
    /** An array of projects. */
    projects?: ProjectSummary[];
  }

  /** The profile required for compliance. */
  export interface ProjectComplianceProfile {
    /** The unique ID for that compliance profile. */
    id?: string;
    /** A unique ID for an instance of a compliance profile. */
    instance_id?: string;
    /** The location of the compliance instance. */
    instance_location?: string;
    /** A unique ID for the attachment to a compliance profile. */
    attachment_id?: string;
    /** The name of the compliance profile. */
    profile_name?: string;
  }

  /** The canonical schema of a project configuration. */
  export interface ProjectConfig {
    /** The ID of the configuration. If this parameter is empty, an ID is automatically created for the
     *  configuration.
     */
    id: string;
    /** The version of the configuration. */
    version: number;
    /** The flag that indicates whether the version of the configuration is draft, or active. */
    is_draft: boolean;
    /** The needs attention state of a configuration. */
    needs_attention_state: JsonObject[];
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    modified_at: string;
    /** The last approved metadata of the configuration. */
    last_approved?: ProjectConfigMetadataLastApproved;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    last_saved_at?: string;
    /** The action job performed on the project configuration. */
    last_validated?: LastValidatedActionWithSummary;
    /** The action job performed on the project configuration. */
    last_deployed?: LastActionWithSummary;
    /** The action job performed on the project configuration. */
    last_undeployed?: LastActionWithSummary;
    /** The outputs of a Schematics template property. */
    outputs: OutputValue[];
    /** The project referenced by this resource. */
    project: ProjectReference;
    /** The references used in the config to resolve input values. */
    references?: JsonObject;
    /** A schematics workspace associated to a project configuration, with scripts. */
    schematics?: SchematicsMetadata;
    /** The state of the configuration. */
    state: string;
    /** The flag that indicates whether a configuration update is available. */
    update_available?: boolean;
    /** A URL. */
    href: string;
    definition: ProjectConfigResponseDefinition;
    /** The project configuration version. */
    approved_version?: ProjectConfigVersionSummary;
    /** The project configuration version. */
    deployed_version?: ProjectConfigVersionSummary;
  }

  /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
  export interface ProjectConfigAuth {
    /** The trusted profile ID. */
    trusted_profile_id?: string;
    /** The authorization method. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    method?: string;
    /** The IBM Cloud API Key. */
    api_key?: string;
  }

  /** The project configuration list. */
  export interface ProjectConfigCollection {
    /** The collection list operation response schema that should define the array property with the name "configs". */
    configs?: ProjectConfigSummary[];
  }

  /** The name and description of a project configuration. */
  export interface ProjectConfigDefinitionNameDescription {
    /** The configuration name. It is unique within the account across projects and regions. */
    name?: string;
    /** A project configuration description. */
    description?: string;
  }

  /** Deletes the configuration response. */
  export interface ProjectConfigDelete {
    /** The unique configuration ID. */
    id: string;
  }

  /** The Code Risk Analyzer logs of the configuration. */
  export interface ProjectConfigMetadataCodeRiskAnalyzerLogs {
    /** The version of the Code Risk Analyzer logs of the configuration. This will change as the Code Risk Analyzer
     *  is updated.
     */
    cra_version?: string;
    /** The schema version of Code Risk Analyzer logs of the configuration. */
    schema_version?: string;
    /** The status of the Code Risk Analyzer logs of the configuration. */
    status?: string;
    /** The Code Risk Analyzer logs summary of the configuration. */
    summary?: CodeRiskAnalyzerLogsSummary;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    timestamp?: string;
  }

  /** The cost estimate of the configuration. It only exists after the first configuration validation. */
  export interface ProjectConfigMetadataCostEstimate {
    /** The version of the cost estimate of the configuration. */
    version?: string;
    /** The currency of the cost estimate of the configuration. */
    currency?: string;
    /** The total hourly cost estimate of the configuration. */
    totalHourlyCost?: string;
    /** The total monthly cost estimate of the configuration. */
    totalMonthlyCost?: string;
    /** The past total hourly cost estimate of the configuration. */
    pastTotalHourlyCost?: string;
    /** The past total monthly cost estimate of the configuration. */
    pastTotalMonthlyCost?: string;
    /** The difference between current and past total hourly cost estimates of the configuration. */
    diffTotalHourlyCost?: string;
    /** The difference between current and past total monthly cost estimates of the configuration. */
    diffTotalMonthlyCost?: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    timeGenerated?: string;
    /** The unique ID. */
    user_id?: string;
  }

  /** The last approved metadata of the configuration. */
  export interface ProjectConfigMetadataLastApproved {
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    at: string;
    /** The comment left by the user who approved the configuration. */
    comment?: string;
    /** The flag that indicates whether the approval was forced approved. */
    is_forced: boolean;
    /** The unique ID. */
    user_id: string;
  }

  /** ProjectConfigPatchDefinitionBlock. */
  export interface ProjectConfigPatchDefinitionBlock {
  }

  /** The input of a project configuration. */
  export interface ProjectConfigPrototype {
    definition: ProjectConfigPrototypeDefinitionBlock;
    /** A Schematics workspace to use for deploying this configuration.
     *  Either schematics.workspace_crn, definition.locator_id, or both must be specified.
     */
    schematics?: SchematicsWorkspace;
  }

  /** ProjectConfigPrototypeDefinitionBlock. */
  export interface ProjectConfigPrototypeDefinitionBlock {
  }

  /** ProjectConfigResource. */
  export interface ProjectConfigResource {
    /** An IBM Cloud resource name, which uniquely identifies a resource. */
    resource_crn?: string;
    /** The name of the resource. */
    resource_name?: string;
    /** The resource type. */
    resource_type?: string;
    /** The flag that indicates whether the status of the resource is tainted. */
    resource_tainted?: boolean;
    /** The resource group of the resource. */
    resource_group_name?: string;
  }

  /** The project configuration resource list. */
  export interface ProjectConfigResourceCollection {
    /** The collection list operation response schema that defines the array property with the name `resources`. */
    resources: ProjectConfigResource[];
    /** The total number of resources deployed by the configuration. */
    resources_count: number;
  }

  /** ProjectConfigResponseDefinition. */
  export interface ProjectConfigResponseDefinition {
  }

  /** ProjectConfigSummary. */
  export interface ProjectConfigSummary {
    /** The project configuration version. */
    approved_version?: ProjectConfigVersionSummary;
    /** The project configuration version. */
    deployed_version?: ProjectConfigVersionSummary;
    /** The ID of the configuration. If this parameter is empty, an ID is automatically created for the
     *  configuration.
     */
    id: string;
    /** The version of the configuration. */
    version: number;
    /** The state of the configuration. */
    state: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    modified_at: string;
    /** A URL. */
    href: string;
    /** The name and description of a project configuration. */
    definition: ProjectConfigDefinitionNameDescription;
    /** The project referenced by this resource. */
    project: ProjectReference;
    /** The configuration type. */
    deployment_model?: string;
  }

  /** A specific version of a project configuration. */
  export interface ProjectConfigVersion {
    /** The ID of the configuration. If this parameter is empty, an ID is automatically created for the
     *  configuration.
     */
    id: string;
    /** The version of the configuration. */
    version: number;
    /** The flag that indicates whether the version of the configuration is draft, or active. */
    is_draft: boolean;
    /** The needs attention state of a configuration. */
    needs_attention_state: JsonObject[];
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    modified_at: string;
    /** The last approved metadata of the configuration. */
    last_approved?: ProjectConfigMetadataLastApproved;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    last_saved_at?: string;
    /** The action job performed on the project configuration. */
    last_validated?: LastValidatedActionWithSummary;
    /** The action job performed on the project configuration. */
    last_deployed?: LastActionWithSummary;
    /** The action job performed on the project configuration. */
    last_undeployed?: LastActionWithSummary;
    /** The outputs of a Schematics template property. */
    outputs: OutputValue[];
    /** The project referenced by this resource. */
    project: ProjectReference;
    /** The references used in the config to resolve input values. */
    references?: JsonObject;
    /** A schematics workspace associated to a project configuration, with scripts. */
    schematics?: SchematicsMetadata;
    /** The state of the configuration. */
    state: string;
    /** The flag that indicates whether a configuration update is available. */
    update_available?: boolean;
    /** A URL. */
    href: string;
    definition: ProjectConfigResponseDefinition;
  }

  /** The project configuration version. */
  export interface ProjectConfigVersionSummary {
    /** The state of the configuration. */
    state: string;
    /** The version number of the configuration. */
    version: number;
    /** A URL. */
    href: string;
  }

  /** The project configuration version list. */
  export interface ProjectConfigVersionSummaryCollection {
    /** The collection list operation response schema that defines the array property with the name `versions`. */
    versions: ProjectConfigVersionSummary[];
  }

  /** The definition of the project. */
  export interface ProjectDefinitionProperties {
    /** The name of the project.  It is unique within the account across regions. */
    name: string;
    /** A brief explanation of the project's use in the configuration of a deployable architecture. It is possible
     *  to create a project without providing a description.
     */
    description?: string;
    /** The policy that indicates whether the resources are destroyed or not when a project is deleted. */
    destroy_on_delete: boolean;
  }

  /** The definition of the project reference. */
  export interface ProjectDefinitionReference {
    /** The name of the project. */
    name: string;
  }

  /** The environment metadata. */
  export interface ProjectEnvironmentSummary {
    /** The environment id as a friendly name. */
    id: string;
    /** The project referenced by this resource. */
    project: ProjectReference;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** A URL. */
    href: string;
    /** The environment definition used in the project collection. */
    definition: EnvironmentDefinitionNameDescription;
  }

  /** The definition of the project. */
  export interface ProjectPatchDefinitionBlock {
    /** The name of the project.  It is unique within the account across regions. */
    name?: string;
    /** A brief explanation of the project's use in the configuration of a deployable architecture. It is possible
     *  to create a project without providing a description.
     */
    description?: string;
    /** The policy that indicates whether the resources are destroyed or not when a project is deleted. */
    destroy_on_delete?: boolean;
  }

  /** The definition of the project. */
  export interface ProjectPrototypeDefinition {
    /** The name of the project.  It is unique within the account across regions. */
    name: string;
    /** A brief explanation of the project's use in the configuration of a deployable architecture. It is possible
     *  to create a project without providing a description.
     */
    description?: string;
    /** The policy that indicates whether the resources are undeployed or not when a project is deleted. */
    destroy_on_delete?: boolean;
  }

  /** The project referenced by this resource. */
  export interface ProjectReference {
    /** The unique ID. */
    id: string;
    /** The definition of the project reference. */
    definition: ProjectDefinitionReference;
    /** An IBM Cloud resource name, which uniquely identifies a resource. */
    crn: string;
    /** A URL. */
    href: string;
  }

  /** ProjectSummary. */
  export interface ProjectSummary {
    /** An IBM Cloud resource name, which uniquely identifies a resource. */
    crn: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** The cumulative list of needs attention items for a project. If the view is successfully retrieved, an array
     *  which could be empty is returned.
     */
    cumulative_needs_attention_view: CumulativeNeedsAttention[];
    /** True indicates that the fetch of the needs attention items failed. It only exists if there was an error
     *  while retrieving the cumulative needs attention view.
     */
    cumulative_needs_attention_view_error?: boolean;
    /** The unique project ID. */
    id: string;
    /** The IBM Cloud location where a resource is deployed. */
    location: string;
    /** The resource group id where the project's data and tools are created. */
    resource_group_id: string;
    /** The project status value. */
    state: string;
    /** A URL. */
    href: string;
    /** The definition of the project. */
    definition: ProjectDefinitionProperties;
  }

  /** A schematics workspace associated to a project configuration, with scripts. */
  export interface SchematicsMetadata {
    /** An IBM Cloud resource name, which uniquely identifies a resource. */
    workspace_crn?: string;
    /** A script to be run as part of a Project configuration, for a given stage (pre, post) and action (validate,
     *  deploy, undeploy).
     */
    validate_pre_script?: Script;
    /** A script to be run as part of a Project configuration, for a given stage (pre, post) and action (validate,
     *  deploy, undeploy).
     */
    validate_post_script?: Script;
    /** A script to be run as part of a Project configuration, for a given stage (pre, post) and action (validate,
     *  deploy, undeploy).
     */
    deploy_pre_script?: Script;
    /** A script to be run as part of a Project configuration, for a given stage (pre, post) and action (validate,
     *  deploy, undeploy).
     */
    deploy_post_script?: Script;
    /** A script to be run as part of a Project configuration, for a given stage (pre, post) and action (validate,
     *  deploy, undeploy).
     */
    undeploy_pre_script?: Script;
    /** A script to be run as part of a Project configuration, for a given stage (pre, post) and action (validate,
     *  deploy, undeploy).
     */
    undeploy_post_script?: Script;
  }

  /** A Schematics workspace to use for deploying this configuration. Either schematics.workspace_crn, definition.locator_id, or both must be specified. */
  export interface SchematicsWorkspace {
    /** An IBM Cloud resource name, which uniquely identifies a resource. */
    workspace_crn?: string;
  }

  /** A script to be run as part of a Project configuration, for a given stage (pre, post) and action (validate, deploy, undeploy). */
  export interface Script {
    /** The type of the script. */
    type?: string;
    /** The path to this script within the current version source. */
    path?: string;
    /** The short description for this script. */
    short_description?: string;
  }

  /** The error message parsed by the Terraform Log Analyzer. */
  export interface TerraformLogAnalyzerErrorMessage {
    /** TerraformLogAnalyzerErrorMessage accepts additional properties. */
    [propName: string]: any;
  }

  /** The success message parsed by the Terraform Log Analyzer. */
  export interface TerraformLogAnalyzerSuccessMessage {
    /** The resource type. */
    resource_type?: string;
    /** The time taken. */
    'time-taken'?: string;
    /** The id. */
    id?: string;
  }

  /** The name and description of a project configuration. */
  export interface ProjectConfigPatchDefinitionBlockDAConfigDefinitionProperties extends ProjectConfigPatchDefinitionBlock {
    /** The configuration name. It is unique within the account across projects and regions. */
    name?: string;
    /** A project configuration description. */
    description?: string;
    /** The ID of the project environment. */
    environment_id?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables for configuration definition and environment. */
    inputs?: JsonObject;
    /** Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  were specified when the configuration was initially created.
     */
    settings?: JsonObject;
    /** The profile required for compliance. */
    compliance_profile?: ProjectComplianceProfile;
    /** A unique concatenation of catalogID.versionID that identifies the DA in the catalog. Either
     *  schematics.workspace_crn, definition.locator_id, or both must be specified.
     */
    locator_id?: string;
  }

  /** The name and description of a project configuration. */
  export interface ProjectConfigPatchDefinitionBlockResourceConfigDefinitionProperties extends ProjectConfigPatchDefinitionBlock {
    /** The configuration name. It is unique within the account across projects and regions. */
    name?: string;
    /** A project configuration description. */
    description?: string;
    /** The ID of the project environment. */
    environment_id?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables for configuration definition and environment. */
    inputs?: JsonObject;
    /** Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  were specified when the configuration was initially created.
     */
    settings?: JsonObject;
    /** The CRNs of resources associated with this configuration. */
    resource_crns?: string[];
  }

  /** The name and description of a project configuration. */
  export interface ProjectConfigPrototypeDefinitionBlockDAConfigDefinitionProperties extends ProjectConfigPrototypeDefinitionBlock {
    /** The configuration name. It is unique within the account across projects and regions. */
    name?: string;
    /** A project configuration description. */
    description?: string;
    /** The ID of the project environment. */
    environment_id?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables for configuration definition and environment. */
    inputs?: JsonObject;
    /** Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  were specified when the configuration was initially created.
     */
    settings?: JsonObject;
    /** The profile required for compliance. */
    compliance_profile?: ProjectComplianceProfile;
    /** A unique concatenation of catalogID.versionID that identifies the DA in the catalog. Either
     *  schematics.workspace_crn, definition.locator_id, or both must be specified.
     */
    locator_id?: string;
  }

  /** The name and description of a project configuration. */
  export interface ProjectConfigPrototypeDefinitionBlockResourceConfigDefinitionProperties extends ProjectConfigPrototypeDefinitionBlock {
    /** The configuration name. It is unique within the account across projects and regions. */
    name?: string;
    /** A project configuration description. */
    description?: string;
    /** The ID of the project environment. */
    environment_id?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables for configuration definition and environment. */
    inputs?: JsonObject;
    /** Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  were specified when the configuration was initially created.
     */
    settings?: JsonObject;
    /** The CRNs of resources associated with this configuration. */
    resource_crns?: string[];
  }

  /** The name and description of a project configuration. */
  export interface ProjectConfigResponseDefinitionDAConfigDefinitionProperties extends ProjectConfigResponseDefinition {
    /** The configuration name. It is unique within the account across projects and regions. */
    name?: string;
    /** A project configuration description. */
    description?: string;
    /** The ID of the project environment. */
    environment_id?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables for configuration definition and environment. */
    inputs?: JsonObject;
    /** Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  were specified when the configuration was initially created.
     */
    settings?: JsonObject;
    /** The profile required for compliance. */
    compliance_profile?: ProjectComplianceProfile;
    /** A unique concatenation of catalogID.versionID that identifies the DA in the catalog. Either
     *  schematics.workspace_crn, definition.locator_id, or both must be specified.
     */
    locator_id?: string;
  }

  /** The name and description of a project configuration. */
  export interface ProjectConfigResponseDefinitionResourceConfigDefinitionProperties extends ProjectConfigResponseDefinition {
    /** The configuration name. It is unique within the account across projects and regions. */
    name?: string;
    /** A project configuration description. */
    description?: string;
    /** The ID of the project environment. */
    environment_id?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables for configuration definition and environment. */
    inputs?: JsonObject;
    /** Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  were specified when the configuration was initially created.
     */
    settings?: JsonObject;
    /** The CRNs of resources associated with this configuration. */
    resource_crns?: string[];
  }

  /*************************
   * pager classes
   ************************/

  /**
   * ProjectsPager can be used to simplify the use of listProjects().
   */
  export class ProjectsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: ProjectV1;

    protected params: ProjectV1.ListProjectsParams;

    /**
     * Construct a ProjectsPager object.
     *
     * @param {ProjectV1}  client - The service client instance used to invoke listProjects()
     * @param {Object} [params] - The parameters to be passed to listProjects()
     * @constructor
     * @returns {ProjectsPager}
     */
    constructor(client: ProjectV1, params?: ProjectV1.ListProjectsParams) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listProjects().
     * @returns {Promise<ProjectV1.ProjectSummary[]>}
     */
    public async getNext(): Promise<ProjectV1.ProjectSummary[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listProjects(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        if (result.next.href) {
          next = getQueryParam(result.next.href, 'start');
        }
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.projects;
    }

    /**
     * Returns all results by invoking listProjects() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<ProjectV1.ProjectSummary[]>}
     */
    public async getAll(): Promise<ProjectV1.ProjectSummary[]> {
      const results: ProjectSummary[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = ProjectV1;
