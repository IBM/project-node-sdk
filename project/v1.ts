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
 * IBM OpenAPI SDK Code Generator Version: 3.87.0-91c7c775-20240320-213027
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
   * @param {string} [options.serviceUrl] - The base URL for the service
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
   * @param {string} [options.serviceUrl] - The base URL for the service
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
   * For more information, see [Creating a
   * project](/docs/secure-enterprise?topic=secure-enterprise-setup-project&interface=ui/docs-draft/secure-enterprise?topic=secure-enterprise-setup-project).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {ProjectPrototypeDefinition} params.definition - The definition of the project.
   * @param {string} params.location - The IBM Cloud location where a resource is deployed.
   * @param {string} params.resourceGroup - The resource group name where the project's data and tools are created.
   * @param {ProjectConfigPrototype[]} [params.configs] - The project configurations. These configurations are included
   * in the response of creating a project only if a configuration array is specified in the request payload.
   * @param {EnvironmentPrototype[]} [params.environments] - The project environment. These environments are included in
   * the response of creating a project only if an environment array is specified in the request payload.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.Project>>}
   */
  public createProject(
    params: ProjectV1.CreateProjectParams
  ): Promise<ProjectV1.Response<ProjectV1.Project>> {
    const _params = { ...params };
    const _requiredParams = ['definition', 'location', 'resourceGroup'];
    const _validParams = [
      'definition',
      'location',
      'resourceGroup',
      'configs',
      'environments',
      'headers',
    ];
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
   * @param {string} [params.token] - The server uses this parameter to determine the first entry that is returned on
   * the next page. If this parameter is not specified, the logical first page is returned.
   * @param {number} [params.limit] - The maximum number of resources to return. The number of resources that are
   * returned is the same, except for the last page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectCollection>>}
   */
  public listProjects(
    params?: ProjectV1.ListProjectsParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['token', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'token': _params.token,
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
   * Update a project by specifying its ID.
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
   * Delete a project document by specifying the ID. A project can be deleted only after you delete all of its
   * resources.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The unique project ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectDeleteResponse>>}
   */
  public deleteProject(
    params: ProjectV1.DeleteProjectParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectDeleteResponse>> {
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
            'Accept': 'application/json',
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
   * Create an environment to group related configurations together and share values across them for easier deployment.
   * For more information, see [Creating an environment](/docs/secure-enterprise?topic=secure-enterprise-create-env).
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

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createProjectEnvironment'
    );

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
   * List all available environments. For more information, see [Creating an
   * environment](/docs/secure-enterprise?topic=secure-enterprise-create-env).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} [params.token] - The server uses this parameter to determine the first entry that is returned on
   * the next page. If this parameter is not specified, the logical first page is returned.
   * @param {number} [params.limit] - The maximum number of resources to return. The number of resources that are
   * returned is the same, except for the last page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.EnvironmentCollection>>}
   */
  public listProjectEnvironments(
    params: ProjectV1.ListProjectEnvironmentsParams
  ): Promise<ProjectV1.Response<ProjectV1.EnvironmentCollection>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'token', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'token': _params.token,
      'limit': _params.limit,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listProjectEnvironments'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/environments',
        method: 'GET',
        qs: query,
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
   * Get an environment. [Learn more](/docs/secure-enterprise?topic=secure-enterprise-create-env).
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
   * Update an environment by specifying its ID. [Learn
   * more](/docs/secure-enterprise?topic=secure-enterprise-create-env).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The environment ID.
   * @param {EnvironmentDefinitionPropertiesPatch} params.definition - The environment definition that is used for
   * updates.
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

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateProjectEnvironment'
    );

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
   * Delete an environment in a project by specifying its ID.
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

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteProjectEnvironment'
    );

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
   * @param {ProjectConfigDefinitionPrototype} params.definition -
   * @param {SchematicsWorkspace} [params.schematics] - A Schematics workspace to use for deploying this deployable
   * architecture.
   * > If you are importing data from an existing Schematics workspace that is not backed by cart, then you must provide
   * a `locator_id`. If you are using a Schematics workspace that is backed by cart, a `locator_id` is not required
   * because the Schematics workspace has one.
   * >
   * There are 3 scenarios:
   * > 1. If only a `locator_id` is specified, a new Schematics workspace is instantiated with that `locator_id`.
   * > 2. If only a schematics `workspace_crn` is specified, a `400` is returned if a `locator_id` is not found in the
   * existing schematics workspace.
   * > 3. If both a Schematics `workspace_crn` and a `locator_id` are specified, a `400`code  is returned if the
   * specified `locator_id` does not agree with the `locator_id` in the existing Schematics workspace.
   * >
   * For more information, see [Creating workspaces and importing your Terraform
   * template](/docs/schematics?topic=schematics-sch-create-wks).
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
   * Retrieve the collection of configurations.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} [params.token] - The server uses this parameter to determine the first entry that is returned on
   * the next page. If this parameter is not specified, the logical first page is returned.
   * @param {number} [params.limit] - The maximum number of resources to return. The number of resources that are
   * returned is the same, except for the last page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigCollection>>}
   */
  public listConfigs(
    params: ProjectV1.ListConfigsParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigCollection>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'token', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'token': _params.token,
      'limit': _params.limit,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'listConfigs');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs',
        method: 'GET',
        qs: query,
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
   * Retrieve the specified project configuration in a specific project. For more information about project
   * configurations, see [Monitoring the status of a configuration and its
   * resources](/docs/secure-enterprise?topic=secure-enterprise-monitor-status-projects).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique configuration ID.
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
   * Update a configuration in a project by specifying the ID. [Learn
   * more](/docs/secure-enterprise?topic=secure-enterprise-config-project).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique configuration ID.
   * @param {ProjectConfigDefinitionPatch} params.definition -
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
   * Delete a configuration.
   *
   * Delete a configuration in a project by specifying its ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique configuration ID.
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
   * Force approve a project configuration.
   *
   * Force approve configuration edits to the main configuration with an approving comment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique configuration ID.
   * @param {string} params.comment - Notes on the project draft action. If this action is a force approve on the draft
   * configuration, you must include a nonempty comment.
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
   * @param {string} params.id - The unique configuration ID.
   * @param {string} [params.comment] - Notes on the project draft action. If this action is a force approve on the
   * draft configuration, you must include a nonempty comment.
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
   * Run a validation check on a specific configuration in the project. The check includes creating or updating the
   * associated Schematics workspace with a plan job, running the CRA scans, and cost estimation.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique configuration ID.
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
   * Deploy a project's configuration. This operation is asynchronous and can be tracked by using the get project
   * configuration API with full metadata.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique configuration ID.
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
   * @param {string} params.id - The unique configuration ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigVersion>>}
   */
  public undeployConfig(
    params: ProjectV1.UndeployConfigParams
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
            'Accept': 'application/json',
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
   * Sync a project configuration by analyzing the associated pipeline runs and Schematics workspace logs to get the
   * configuration back to a working state.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique configuration ID.
   * @param {SchematicsWorkspace} [params.schematics] - A Schematics workspace to use for deploying this deployable
   * architecture.
   * > If you are importing data from an existing Schematics workspace that is not backed by cart, then you must provide
   * a `locator_id`. If you are using a Schematics workspace that is backed by cart, a `locator_id` is not required
   * because the Schematics workspace has one.
   * >
   * There are 3 scenarios:
   * > 1. If only a `locator_id` is specified, a new Schematics workspace is instantiated with that `locator_id`.
   * > 2. If only a schematics `workspace_crn` is specified, a `400` is returned if a `locator_id` is not found in the
   * existing schematics workspace.
   * > 3. If both a Schematics `workspace_crn` and a `locator_id` are specified, a `400`code  is returned if the
   * specified `locator_id` does not agree with the `locator_id` in the existing Schematics workspace.
   * >
   * For more information, see [Creating workspaces and importing your Terraform
   * template](/docs/schematics?topic=schematics-sch-create-wks).
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
   * List all deployed resources.
   *
   * List resources that are deployed by a configuration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique configuration ID.
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
   * Create a stack definition.
   *
   * Defines inputs at the stack level that users need to configure along with input values at the member level. These
   * values are included in the catalog entry when the deployable architecture stack is exported to a private catalog
   * and are required for the deployable architecture stack to deploy. You can add a reference to a value, or add the
   * value explicitly at the member level.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique configuration ID.
   * @param {StackDefinitionBlockPrototype} params.stackDefinition - The definition block for a stack definition.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.StackDefinition>>}
   */
  public createStackDefinition(
    params: ProjectV1.CreateStackDefinitionParams
  ): Promise<ProjectV1.Response<ProjectV1.StackDefinition>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id', 'stackDefinition'];
    const _validParams = ['projectId', 'id', 'stackDefinition', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'stack_definition': _params.stackDefinition,
    };

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'createStackDefinition');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/stack_definition',
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
   * Get a stack definition.
   *
   * Retrieve the stack definition that is associated to the configuration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique configuration ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.StackDefinition>>}
   */
  public getStackDefinition(
    params: ProjectV1.GetStackDefinitionParams
  ): Promise<ProjectV1.Response<ProjectV1.StackDefinition>> {
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

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'getStackDefinition');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/stack_definition',
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
   * Update a stack definition.
   *
   * Update the stack definition that is associated with the configuration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique configuration ID.
   * @param {StackDefinitionBlockPrototype} params.stackDefinition - The definition block for a stack definition.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.StackDefinition>>}
   */
  public updateStackDefinition(
    params: ProjectV1.UpdateStackDefinitionParams
  ): Promise<ProjectV1.Response<ProjectV1.StackDefinition>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id', 'stackDefinition'];
    const _validParams = ['projectId', 'id', 'stackDefinition', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'stack_definition': _params.stackDefinition,
    };

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'updateStackDefinition');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/stack_definition',
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
   * Export a deployable architecture stack to the private catalog.
   *
   * Exports the deployable architecture stack to a private catalog. All member deployable architectures within the
   * stack must be validated and deployed before the stack is exported. The stack definition must also exist before the
   * stack is exported. You can export the stack as a new product, or as a new version of an existing product.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique configuration ID.
   * @param {StackDefinitionExportRequest} params.settings - The payload for the private catalog export request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.StackDefinitionExportResponse>>}
   */
  public exportStackDefinition(
    params: ProjectV1.ExportStackDefinitionParams
  ): Promise<ProjectV1.Response<ProjectV1.StackDefinitionExportResponse>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id', 'settings'];
    const _validParams = ['projectId', 'id', 'settings', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.settings;
    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'exportStackDefinition');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/stack_definition/export',
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
   * Get a list of project configuration versions.
   *
   * Retrieve a list of previous and current versions of a project configuration in a specific project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique configuration ID.
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
   * Get a specific project configuration version.
   *
   * Retrieve a specific version of a configuration in a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique configuration ID.
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
   * Delete a project configuration version.
   *
   * Delete a configuration version by specifying the project ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique configuration ID.
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
    location: CreateProjectConstants.Location | string;
    /** The resource group name where the project's data and tools are created. */
    resourceGroup: string;
    /** The project configurations. These configurations are included in the response of creating a project only if
     *  a configuration array is specified in the request payload.
     */
    configs?: ProjectConfigPrototype[];
    /** The project environment. These environments are included in the response of creating a project only if an
     *  environment array is specified in the request payload.
     */
    environments?: EnvironmentPrototype[];
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createProject` operation. */
  export namespace CreateProjectConstants {
    /** The IBM Cloud location where a resource is deployed. */
    export enum Location {
      US_SOUTH = 'us-south',
      US_EAST = 'us-east',
      EU_GB = 'eu-gb',
      EU_DE = 'eu-de',
      CA_TOR = 'ca-tor',
    }
  }

  /** Parameters for the `listProjects` operation. */
  export interface ListProjectsParams {
    /** The server uses this parameter to determine the first entry that is returned on the next page. If this
     *  parameter is not specified, the logical first page is returned.
     */
    token?: string;
    /** The maximum number of resources to return. The number of resources that are returned is the same, except for
     *  the last page.
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
    /** The server uses this parameter to determine the first entry that is returned on the next page. If this
     *  parameter is not specified, the logical first page is returned.
     */
    token?: string;
    /** The maximum number of resources to return. The number of resources that are returned is the same, except for
     *  the last page.
     */
    limit?: number;
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
    /** The environment definition that is used for updates. */
    definition: EnvironmentDefinitionPropertiesPatch;
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
    definition: ProjectConfigDefinitionPrototype;
    /** A Schematics workspace to use for deploying this deployable architecture.
     *  > If you are importing data from an existing Schematics workspace that is not backed by cart, then you must
     *  provide a `locator_id`. If you are using a Schematics workspace that is backed by cart, a `locator_id` is not
     *  required because the Schematics workspace has one.
     *  >
     *  There are 3 scenarios:
     *  > 1. If only a `locator_id` is specified, a new Schematics workspace is instantiated with that `locator_id`.
     *  > 2. If only a schematics `workspace_crn` is specified, a `400` is returned if a `locator_id` is not found in
     *  the existing schematics workspace.
     *  > 3. If both a Schematics `workspace_crn` and a `locator_id` are specified, a `400`code  is returned if the
     *  specified `locator_id` does not agree with the `locator_id` in the existing Schematics workspace.
     *  >
     *  For more information, see [Creating workspaces and importing your Terraform
     *  template](/docs/schematics?topic=schematics-sch-create-wks).
     */
    schematics?: SchematicsWorkspace;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listConfigs` operation. */
  export interface ListConfigsParams {
    /** The unique project ID. */
    projectId: string;
    /** The server uses this parameter to determine the first entry that is returned on the next page. If this
     *  parameter is not specified, the logical first page is returned.
     */
    token?: string;
    /** The maximum number of resources to return. The number of resources that are returned is the same, except for
     *  the last page.
     */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getConfig` operation. */
  export interface GetConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateConfig` operation. */
  export interface UpdateConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    id: string;
    definition: ProjectConfigDefinitionPatch;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteConfig` operation. */
  export interface DeleteConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `forceApprove` operation. */
  export interface ForceApproveParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    id: string;
    /** Notes on the project draft action. If this action is a force approve on the draft configuration, you must
     *  include a nonempty comment.
     */
    comment: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `approve` operation. */
  export interface ApproveParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    id: string;
    /** Notes on the project draft action. If this action is a force approve on the draft configuration, you must
     *  include a nonempty comment.
     */
    comment?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `validateConfig` operation. */
  export interface ValidateConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deployConfig` operation. */
  export interface DeployConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `undeployConfig` operation. */
  export interface UndeployConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `syncConfig` operation. */
  export interface SyncConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    id: string;
    /** A Schematics workspace to use for deploying this deployable architecture.
     *  > If you are importing data from an existing Schematics workspace that is not backed by cart, then you must
     *  provide a `locator_id`. If you are using a Schematics workspace that is backed by cart, a `locator_id` is not
     *  required because the Schematics workspace has one.
     *  >
     *  There are 3 scenarios:
     *  > 1. If only a `locator_id` is specified, a new Schematics workspace is instantiated with that `locator_id`.
     *  > 2. If only a schematics `workspace_crn` is specified, a `400` is returned if a `locator_id` is not found in
     *  the existing schematics workspace.
     *  > 3. If both a Schematics `workspace_crn` and a `locator_id` are specified, a `400`code  is returned if the
     *  specified `locator_id` does not agree with the `locator_id` in the existing Schematics workspace.
     *  >
     *  For more information, see [Creating workspaces and importing your Terraform
     *  template](/docs/schematics?topic=schematics-sch-create-wks).
     */
    schematics?: SchematicsWorkspace;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listConfigResources` operation. */
  export interface ListConfigResourcesParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createStackDefinition` operation. */
  export interface CreateStackDefinitionParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    id: string;
    /** The definition block for a stack definition. */
    stackDefinition: StackDefinitionBlockPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getStackDefinition` operation. */
  export interface GetStackDefinitionParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateStackDefinition` operation. */
  export interface UpdateStackDefinitionParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    id: string;
    /** The definition block for a stack definition. */
    stackDefinition: StackDefinitionBlockPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `exportStackDefinition` operation. */
  export interface ExportStackDefinitionParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    id: string;
    /** The payload for the private catalog export request. */
    settings: StackDefinitionExportRequest;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listConfigVersions` operation. */
  export interface ListConfigVersionsParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getConfigVersion` operation. */
  export interface GetConfigVersionParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    id: string;
    /** The configuration version. */
    version: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteConfigVersion` operation. */
  export interface DeleteConfigVersionParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
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
    /** The collection of error messages. This property is reported only if Schematics triggered a Terraform apply
     *  job.
     */
    error_messages?: TerraformLogAnalyzerErrorMessage[];
    /** The collection of success messages. This property is reported only if Schematics triggered a Terraform apply
     *  job.
     */
    success_messages?: TerraformLogAnalyzerSuccessMessage[];
  }

  /** The summary of the apply jobs on the configuration. */
  export interface ActionJobApplySummary {
    /** The number of applied resources. This property is reported only if Schematics triggered a Terraform apply
     *  job.
     */
    success?: number;
    /** The number of failed applied resources. This property is reported only if Schematics triggered a Terraform
     *  apply job.
     */
    failed?: number;
    /** The collection of successfully applied resources. This property is reported only if Schematics triggered a
     *  Terraform apply job.
     */
    success_resources?: string[];
    /** The collection of failed applied resources. This property is reported only if Schematics triggered a
     *  Terraform apply job.
     */
    failed_resources?: string[];
  }

  /** The messages of destroy jobs on the configuration. */
  export interface ActionJobDestroyMessagesSummary {
    /** The collection of error messages. This property is reported only if Schematics triggered a Terraform destroy
     *  job.
     */
    error_messages?: TerraformLogAnalyzerErrorMessage[];
  }

  /** The summary of the destroy jobs on the configuration. */
  export interface ActionJobDestroySummary {
    /** The number of destroyed resources. This property is reported only if Schematics triggered a Terraform
     *  destroy job.
     */
    success?: number;
    /** The number of failed resources. This property is reported only if Schematics triggered a Terraform destroy
     *  job.
     */
    failed?: number;
    /** The number of tainted resources. This property is reported only if Schematics triggered a Terraform destroy
     *  job.
     */
    tainted?: number;
    /** The summary of results from destroyed resources from the job. This property is reported only if Schematics
     *  triggered a Terraform destroy job.
     */
    resources?: ActionJobDestroySummaryResources;
  }

  /** The summary of results from destroyed resources from the job. This property is reported only if Schematics triggered a Terraform destroy job. */
  export interface ActionJobDestroySummaryResources {
    /** The collection of destroyed resources. This property is reported only if Schematics triggered a Terraform
     *  destroy job.
     */
    success?: string[];
    /** The collection of failed resources. This property is reported only if Schematics triggered a Terraform
     *  destroy job.
     */
    failed?: string[];
    /** The collection of tainted resources. This property is reported only if Schematics triggered a Terraform
     *  destroy job.
     */
    tainted?: string[];
  }

  /** The message summaries of jobs on the configuration. */
  export interface ActionJobMessageSummary {
    /** The number of information messages. This property is reported only if Schematics triggered a Terraform job. */
    info?: number;
    /** The number of debug messages. This property is reported only if Schematics triggered a Terraform job. */
    debug?: number;
    /** The number of error messages. This property is reported only if Schematics triggered a Terraform job. */
    error?: number;
  }

  /** The plan messages on the configuration. */
  export interface ActionJobPlanMessagesSummary {
    /** The collection of error messages. This property is reported only if Schematics triggered a Terraform plan
     *  job.
     */
    error_messages?: TerraformLogAnalyzerErrorMessage[];
    /** The collection of success messages. This property is reported only if Schematics triggered a Terraform plan
     *  job.
     */
    success_messages?: string[];
    /** The collection of update messages. This property is reported only if Schematics triggered a Terraform plan
     *  job.
     */
    update_messages?: string[];
    /** The collection of destroy messages. This property is reported only if Schematics triggered a Terraform plan
     *  job.
     */
    destroy_messages?: string[];
  }

  /** The summary of the plan jobs on the configuration. */
  export interface ActionJobPlanSummary {
    /** The number of resources to be added. This property is reported only if Schematics triggered a terraform plan
     *  job.
     */
    add?: number;
    /** The number of resources that failed during the plan job. This property is reported only if Schematics
     *  triggered a Terraform plan job.
     */
    failed?: number;
    /** The number of resources to be updated. This property is reported only if Schematics triggered a Terraform
     *  plan job.
     */
    update?: number;
    /** The number of resources to be destroyed. This property is reported only if Schematics triggered a Terraform
     *  plan job.
     */
    destroy?: number;
    /** The collection of planned added resources. This property is reported only if Schematics triggered a
     *  Terraform plan job.
     */
    add_resources?: string[];
    /** The collection of failed planned resources. This property is reported only if Schematics triggered a
     *  Terraform plan job.
     */
    failed_resources?: string[];
    /** The collection of planned updated resources. This property is reported only if Schematics triggered a
     *  Terraform plan job.
     */
    updated_resources?: string[];
    /** The collection of planned destroy resources. This property is reported only if Schematics triggered a
     *  Terraform plan job.
     */
    destroy_resources?: string[];
  }

  /** The summaries of jobs that were performed on the configuration. */
  export interface ActionJobSummary {
    /** The version of the job summary. */
    version: string;
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

  /** The Code Risk Analyzer logs a summary of the configuration. */
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

  /** The definition of the config reference. */
  export interface ConfigDefinitionReference {
    /** The name of the configuration. */
    name: string;
  }

  /** CumulativeNeedsAttention. */
  export interface CumulativeNeedsAttention {
    /** The event name. */
    event?: string;
    /** A unique ID for this individual event. */
    event_id?: string;
    /** A unique ID for the configuration. */
    config_id?: string;
    /** The version number of the configuration. */
    config_version?: number;
  }

  /** The definition of a project environment. */
  export interface Environment {
    /** The environment ID as a friendly name. */
    id: string;
    /** The project that is referenced by this resource. */
    project: ProjectReference;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** The target account ID derived from the authentication block values. The target account exists only if the
     *  environment currently has an authorization block.
     */
    target_account?: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    modified_at: string;
    /** A URL. */
    href: string;
    /** The environment definition. */
    definition: EnvironmentDefinitionRequiredPropertiesResponse;
  }

  /** The list environment response. */
  export interface EnvironmentCollection {
    /** A pagination limit. */
    limit: number;
    /** A pagination link. */
    first: PaginationLink;
    /** A pagination link. */
    next?: PaginationLink;
    /** The environment. */
    environments?: Environment[];
  }

  /** The environment definition that is used for updates. */
  export interface EnvironmentDefinitionPropertiesPatch {
    /** The description of the environment. */
    description?: string;
    /** The name of the environment. It's unique within the account across projects and regions. */
    name?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables that are used for configuration definition and environment. */
    inputs?: JsonObject;
    /** The profile that is required for compliance. */
    compliance_profile?: ProjectComplianceProfile;
  }

  /** The environment definition. */
  export interface EnvironmentDefinitionRequiredProperties {
    /** The description of the environment. */
    description?: string;
    /** The name of the environment. It's unique within the account across projects and regions. */
    name: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables that are used for configuration definition and environment. */
    inputs?: JsonObject;
    /** The profile that is required for compliance. */
    compliance_profile?: ProjectComplianceProfile;
  }

  /** The environment definition. */
  export interface EnvironmentDefinitionRequiredPropertiesResponse {
    /** The description of the environment. */
    description: string;
    /** The name of the environment. It's unique within the account across projects and regions. */
    name: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables that are used for configuration definition and environment. */
    inputs?: JsonObject;
    /** The profile that is required for compliance. */
    compliance_profile?: ProjectComplianceProfile;
  }

  /** The response to a request to delete an environment. */
  export interface EnvironmentDeleteResponse {
    /** The environment ID as a friendly name. */
    id: string;
  }

  /** The definition of a project environment. */
  export interface EnvironmentPrototype {
    /** The environment definition. */
    definition: EnvironmentDefinitionRequiredProperties;
  }

  /** The href and results from the last action job that is performed on the project configuration. */
  export interface LastActionWithSummary {
    /** A URL. */
    href: string;
    /** The result of the last action. */
    result?: LastActionWithSummary.Constants.Result | string;
    /** A brief summary of an action. */
    job?: ActionJobWithIdAndSummary;
    /** A brief summary of a pre- and post-action. */
    pre_job?: PrePostActionJobWithIdAndSummary;
    /** A brief summary of a pre- and post-action. */
    post_job?: PrePostActionJobWithIdAndSummary;
  }
  export namespace LastActionWithSummary {
    export namespace Constants {
      /** The result of the last action. */
      export enum Result {
        FAILED = 'failed',
        PASSED = 'passed',
      }
    }
  }

  /** The summary for drift detection jobs that are performed as part of the last monitoring action. */
  export interface LastDriftDetectionJobSummary {
    /** A brief summary of an action. */
    job?: ActionJobWithIdAndSummary;
  }

  /** The summary from the last monitoring action job that is performed on the project configuration. */
  export interface LastMonitoringActionWithSummary {
    /** A URL. */
    href: string;
    /** The result of the last action. */
    result?: LastMonitoringActionWithSummary.Constants.Result | string;
    /** The summary for drift detection jobs that are performed as part of the last monitoring action. */
    drift_detection?: LastDriftDetectionJobSummary;
  }
  export namespace LastMonitoringActionWithSummary {
    export namespace Constants {
      /** The result of the last action. */
      export enum Result {
        FAILED = 'failed',
        PASSED = 'passed',
      }
    }
  }

  /** The href and results from the last action job that is performed on the project configuration. */
  export interface LastValidatedActionWithSummary {
    /** A URL. */
    href: string;
    /** The result of the last action. */
    result?: LastValidatedActionWithSummary.Constants.Result | string;
    /** A brief summary of an action. */
    job?: ActionJobWithIdAndSummary;
    /** A brief summary of a pre- and post-action. */
    pre_job?: PrePostActionJobWithIdAndSummary;
    /** A brief summary of a pre- and post-action. */
    post_job?: PrePostActionJobWithIdAndSummary;
    /** The cost estimate of the configuration. This property exists only after the first configuration validation. */
    cost_estimate?: ProjectConfigMetadataCostEstimate;
    /** The Code Risk Analyzer logs of the configuration. This property is populated only after the validation step
     *  when the Code Risk Analyzer is run. Note: `cra` is the abbreviated form of Code Risk Analyzer.
     */
    cra_logs?: ProjectConfigMetadataCodeRiskAnalyzerLogs;
  }
  export namespace LastValidatedActionWithSummary {
    export namespace Constants {
      /** The result of the last action. */
      export enum Result {
        FAILED = 'failed',
        PASSED = 'passed',
      }
    }
  }

  /** The stack config parent of which this configuration is a member of. */
  export interface MemberOfDefinition {
    /** The unique ID. */
    id: string;
    /** The definition summary of the stack configuration. */
    definition: StackConfigDefinitionSummary;
    /** The version of the stack configuration. */
    version: number;
    /** A URL. */
    href: string;
  }

  /** OutputValue. */
  export interface OutputValue {
    /** The variable name. */
    name: string;
    /** A short explanation of the output value. */
    description?: string;
    /** This property can be any value - a string, number, boolean, array, or object. */
    value?: any;
  }

  /** A pagination link. */
  export interface PaginationLink {
    /** A URL. */
    href: string;
  }

  /** A brief summary of a pre- and post-action job. This property is populated only after an action is run as part of a validation, deployment, or undeployment. */
  export interface PrePostActionJobSummary {
    /** The ID of the Schematics action job that ran as part of the pre- and post-job. */
    job_id: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    start_time?: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    end_time?: string;
    /** The number of tasks that were run in the job. */
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

  /** The system-level error that OS captured in the project pipelines for the pre- and post-job. */
  export interface PrePostActionJobSystemError {
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    timestamp: string;
    /** The ID of the user that triggered the pipeline that ran the pre- and post-job. */
    user_id: string;
    /** The HTTP status code for the error. */
    status_code: string;
    /** The summary description of the error. */
    description: string;
    /** The detailed message from the source error. */
    error_response?: string;
  }

  /** A brief summary of a pre- and post-action. */
  export interface PrePostActionJobWithIdAndSummary {
    /** The unique ID. */
    id: string;
    /** A brief summary of a pre- and post-action job. This property is populated only after an action is run as
     *  part of a validation, deployment, or undeployment.
     */
    summary: PrePostActionJobSummary;
  }

  /** The standard schema of a project. */
  export interface Project {
    /** An IBM Cloud resource name that uniquely identifies a resource. */
    crn: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** The cumulative list of needs attention items for a project. If the view is successfully retrieved, an empty
     *  or nonempty array is returned.
     */
    cumulative_needs_attention_view: CumulativeNeedsAttention[];
    /** A value of `true` indicates that the fetch of the needs attention items failed. This property only exists if
     *  there was an error when you retrieved the cumulative needs attention view.
     */
    cumulative_needs_attention_view_error?: boolean;
    /** The unique project ID. */
    id: string;
    /** The IBM Cloud location where a resource is deployed. */
    location: string;
    /** The resource group ID where the project's data and tools are created. */
    resource_group_id: string;
    /** The project status value. */
    state: Project.Constants.State | string;
    /** A URL. */
    href: string;
    /** The resource group name where the project's data and tools are created. */
    resource_group: string;
    /** The CRN of the Event Notifications instance if one is connected to this project. */
    event_notifications_crn?: string;
    /** The project configurations. These configurations are only included in the response of creating a project if
     *  a configuration array is specified in the request payload.
     */
    configs: ProjectConfigSummary[];
    /** The project environment. These environments are only included in the response if project environments were
     *  created on the project.
     */
    environments: ProjectEnvironmentSummary[];
    /** The definition of the project. */
    definition: ProjectDefinitionProperties;
  }
  export namespace Project {
    export namespace Constants {
      /** The project status value. */
      export enum State {
        READY = 'ready',
        DELETING = 'deleting',
        DELETING_FAILED = 'deleting_failed',
      }
    }
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

  /** The profile that is required for compliance. */
  export interface ProjectComplianceProfile {
    /** The unique ID for the compliance profile. */
    id?: string;
    /** A unique ID for the instance of a compliance profile. */
    instance_id?: string;
    /** The location of the compliance instance. */
    instance_location?: ProjectComplianceProfile.Constants.InstanceLocation | string;
    /** A unique ID for the attachment to a compliance profile. */
    attachment_id?: string;
    /** The name of the compliance profile. */
    profile_name?: string;
  }
  export namespace ProjectComplianceProfile {
    export namespace Constants {
      /** The location of the compliance instance. */
      export enum InstanceLocation {
        US_SOUTH = 'us-south',
        US_EAST = 'us-east',
        EU_GB = 'eu-gb',
        EU_DE = 'eu-de',
        CA_TOR = 'ca-tor',
      }
    }
  }

  /** The standard schema of a project configuration. */
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
    needs_attention_state: ProjectConfigNeedsAttentionState[];
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    modified_at: string;
    /** The last approved metadata of the configuration. */
    last_approved?: ProjectConfigMetadataLastApproved;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    last_saved_at?: string;
    /** The href and results from the last action job that is performed on the project configuration. */
    last_validated?: LastValidatedActionWithSummary;
    /** The href and results from the last action job that is performed on the project configuration. */
    last_deployed?: LastActionWithSummary;
    /** The href and results from the last action job that is performed on the project configuration. */
    last_undeployed?: LastActionWithSummary;
    /** The summary from the last monitoring action job that is performed on the project configuration. */
    last_monitoring?: LastMonitoringActionWithSummary;
    /** The outputs of a Schematics template property. */
    outputs: OutputValue[];
    /** The project that is referenced by this resource. */
    project: ProjectReference;
    /** The references that are used in the configuration to resolve input values. */
    references?: JsonObject;
    /** A Schematics workspace that is associated to a project configuration, with scripts. */
    schematics?: SchematicsMetadata;
    /** The state of the configuration. */
    state: ProjectConfig.Constants.State | string;
    /** The flag that indicates whether a configuration update is available. */
    update_available?: boolean;
    /** The stack definition identifier. */
    template_id?: string;
    /** The stack config parent of which this configuration is a member of. */
    member_of?: MemberOfDefinition;
    /** A URL. */
    href: string;
    /** The configuration type. */
    deployment_model?: ProjectConfig.Constants.DeploymentModel | string;
    /** Computed state code clarifying the prerequisites for validation for the configuration. */
    state_code?: ProjectConfig.Constants.StateCode | string;
    definition: ProjectConfigDefinitionResponse;
    /** A summary of a project configuration version. */
    approved_version?: ProjectConfigVersionSummary;
    /** A summary of a project configuration version. */
    deployed_version?: ProjectConfigVersionSummary;
  }
  export namespace ProjectConfig {
    export namespace Constants {
      /** The state of the configuration. */
      export enum State {
        APPROVED = 'approved',
        DELETED = 'deleted',
        DELETING = 'deleting',
        DELETING_FAILED = 'deleting_failed',
        DISCARDED = 'discarded',
        DRAFT = 'draft',
        DEPLOYED = 'deployed',
        DEPLOYING_FAILED = 'deploying_failed',
        DEPLOYING = 'deploying',
        SUPERSEDED = 'superseded',
        UNDEPLOYING = 'undeploying',
        UNDEPLOYING_FAILED = 'undeploying_failed',
        VALIDATED = 'validated',
        VALIDATING = 'validating',
        VALIDATING_FAILED = 'validating_failed',
        APPLIED = 'applied',
        APPLY_FAILED = 'apply_failed',
      }
      /** The configuration type. */
      export enum DeploymentModel {
        PROJECT_DEPLOYED = 'project_deployed',
        USER_DEPLOYED = 'user_deployed',
        STACK = 'stack',
      }
      /** Computed state code clarifying the prerequisites for validation for the configuration. */
      export enum StateCode {
        AWAITING_INPUT = 'awaiting_input',
        AWAITING_PREREQUISITE = 'awaiting_prerequisite',
        AWAITING_VALIDATION = 'awaiting_validation',
        AWAITING_MEMBER_DEPLOYMENT = 'awaiting_member_deployment',
        AWAITING_STACK_SETUP = 'awaiting_stack_setup',
      }
    }
  }

  /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
  export interface ProjectConfigAuth {
    /** The trusted profile ID. */
    trusted_profile_id?: string;
    /** The authorization method. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    method?: ProjectConfigAuth.Constants.Method | string;
    /** The IBM Cloud API Key. It can be either raw or pulled from the catalog via a `CRN` or `JSON` blob. */
    api_key?: string;
  }
  export namespace ProjectConfigAuth {
    export namespace Constants {
      /** The authorization method. You can authorize by using a trusted profile or an API key in Secrets Manager. */
      export enum Method {
        API_KEY = 'api_key',
        TRUSTED_PROFILE = 'trusted_profile',
      }
    }
  }

  /** The project configuration list. */
  export interface ProjectConfigCollection {
    /** A pagination limit. */
    limit: number;
    /** A pagination link. */
    first: PaginationLink;
    /** A pagination link. */
    next?: PaginationLink;
    /** The response schema of the collection list operation that defines the array property with the name
     *  `configs`.
     */
    configs?: ProjectConfigSummary[];
  }

  /** ProjectConfigDefinitionPatch. */
  export interface ProjectConfigDefinitionPatch {}

  /** ProjectConfigDefinitionPrototype. */
  export interface ProjectConfigDefinitionPrototype {}

  /** ProjectConfigDefinitionResponse. */
  export interface ProjectConfigDefinitionResponse {}

  /** The ID of the deleted configuration. */
  export interface ProjectConfigDelete {
    /** The ID of the deleted project or configuration. */
    id: string;
  }

  /** The Code Risk Analyzer logs of the configuration. This property is populated only after the validation step when the Code Risk Analyzer is run. Note: `cra` is the abbreviated form of Code Risk Analyzer. */
  export interface ProjectConfigMetadataCodeRiskAnalyzerLogs {}

  /** The cost estimate of the configuration. This property exists only after the first configuration validation. */
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
    /** The difference between the current and past total hourly cost estimates of the configuration. */
    diffTotalHourlyCost?: string;
    /** The difference between the current and past total monthly cost estimates of the configuration. */
    diffTotalMonthlyCost?: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    timeGenerated?: string;
    /** The unique ID. */
    user_id?: string;
  }

  /** The last approved metadata of the configuration. */
  export interface ProjectConfigMetadataLastApproved {
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    at: string;
    /** The comment that is left by the user who approved the configuration. */
    comment?: string;
    /** The flag that indicates whether the approval was forced approved. */
    is_forced: boolean;
    /** The unique ID. */
    user_id: string;
  }

  /** A needs attention state item shown to users is a specific actionable event that occurs during the lifecycle of a configuration. */
  export interface ProjectConfigNeedsAttentionState {
    /** The id of the event. */
    event_id: string;
    /** The name of the event. */
    event: string;
    /** The severity of the event. This is a system generated field. For user triggered events the field is not
     *  present.
     */
    severity?: ProjectConfigNeedsAttentionState.Constants.Severity | string;
    /** An actionable URL that users can access in response to the event. This is a system generated field. For user
     *  triggered events the field is not present.
     */
    action_url?: string;
    /** The configuration id and version for which the event occurred. This field is only available for user
     *  generated events. For system triggered events the field is not present.
     */
    target?: string;
    /** The IAM id of the user that triggered the event. This field is only available for user generated events. For
     *  system triggered events the field is not present.
     */
    triggered_by?: string;
    /** The timestamp of the event. */
    timestamp: string;
  }
  export namespace ProjectConfigNeedsAttentionState {
    export namespace Constants {
      /** The severity of the event. This is a system generated field. For user triggered events the field is not present. */
      export enum Severity {
        INFO = 'INFO',
        WARNING = 'WARNING',
        ERROR = 'ERROR',
      }
    }
  }

  /** The input of a project configuration. */
  export interface ProjectConfigPrototype {
    definition: ProjectConfigDefinitionPrototype;
    /** A Schematics workspace to use for deploying this deployable architecture.
     *  > If you are importing data from an existing Schematics workspace that is not backed by cart, then you must
     *  provide a `locator_id`. If you are using a Schematics workspace that is backed by cart, a `locator_id` is not
     *  required because the Schematics workspace has one.
     *  >
     *  There are 3 scenarios:
     *  > 1. If only a `locator_id` is specified, a new Schematics workspace is instantiated with that `locator_id`.
     *  > 2. If only a schematics `workspace_crn` is specified, a `400` is returned if a `locator_id` is not found in
     *  the existing schematics workspace.
     *  > 3. If both a Schematics `workspace_crn` and a `locator_id` are specified, a `400`code  is returned if the
     *  specified `locator_id` does not agree with the `locator_id` in the existing Schematics workspace.
     *  >
     *  For more information, see [Creating workspaces and importing your Terraform
     *  template](/docs/schematics?topic=schematics-sch-create-wks).
     */
    schematics?: SchematicsWorkspace;
  }

  /** ProjectConfigResource. */
  export interface ProjectConfigResource {
    /** An IBM Cloud resource name that uniquely identifies a resource. */
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
    /** The total number of resources that are deployed by the configuration. */
    resources_count: number;
  }

  /** ProjectConfigSummary. */
  export interface ProjectConfigSummary {
    /** A summary of a project configuration version. */
    approved_version?: ProjectConfigVersionSummary;
    /** A summary of a project configuration version. */
    deployed_version?: ProjectConfigVersionSummary;
    /** The ID of the configuration. If this parameter is empty, an ID is automatically created for the
     *  configuration.
     */
    id: string;
    /** The version of the configuration. */
    version: number;
    /** The state of the configuration. */
    state: ProjectConfigSummary.Constants.State | string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    modified_at: string;
    /** A URL. */
    href: string;
    /** The description of a project configuration. */
    definition: ProjectConfigSummaryDefinition;
    /** The project that is referenced by this resource. */
    project: ProjectReference;
    /** The configuration type. */
    deployment_model?: ProjectConfigSummary.Constants.DeploymentModel | string;
  }
  export namespace ProjectConfigSummary {
    export namespace Constants {
      /** The state of the configuration. */
      export enum State {
        APPROVED = 'approved',
        DELETED = 'deleted',
        DELETING = 'deleting',
        DELETING_FAILED = 'deleting_failed',
        DISCARDED = 'discarded',
        DRAFT = 'draft',
        DEPLOYED = 'deployed',
        DEPLOYING_FAILED = 'deploying_failed',
        DEPLOYING = 'deploying',
        SUPERSEDED = 'superseded',
        UNDEPLOYING = 'undeploying',
        UNDEPLOYING_FAILED = 'undeploying_failed',
        VALIDATED = 'validated',
        VALIDATING = 'validating',
        VALIDATING_FAILED = 'validating_failed',
        APPLIED = 'applied',
        APPLY_FAILED = 'apply_failed',
      }
      /** The configuration type. */
      export enum DeploymentModel {
        PROJECT_DEPLOYED = 'project_deployed',
        USER_DEPLOYED = 'user_deployed',
        STACK = 'stack',
      }
    }
  }

  /** The description of a project configuration. */
  export interface ProjectConfigSummaryDefinition {
    /** A project configuration description. */
    description: string;
    /** The configuration name. It's unique within the account across projects and regions. */
    name: string;
    /** A unique concatenation of the catalog ID and the version ID that identify the deployable architecture in the
     *  catalog. I you're importing from an existing Schematics workspace that is not backed by cart, a `locator_id` is
     *  required. If you're using a Schematics workspace that is backed by cart, a `locator_id` is not necessary because
     *  the Schematics workspace has one.
     *  > There are 3 scenarios:
     *  > 1. If only a `locator_id` is specified, a new Schematics workspace is instantiated with that `locator_id`.
     *  > 2. If only a schematics `workspace_crn` is specified, a `400` is returned if a `locator_id` is not found in
     *  the existing schematics workspace.
     *  > 3. If both a Schematics `workspace_crn` and a `locator_id` are specified, a `400` message is returned if the
     *  specified `locator_id` does not agree with the `locator_id` in the existing Schematics workspace.
     *  > For more information of creating a Schematics workspace, see [Creating workspaces and importing your Terraform
     *  template](/docs/schematics?topic=schematics-sch-create-wks).
     */
    locator_id?: string;
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
    needs_attention_state: ProjectConfigNeedsAttentionState[];
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    modified_at: string;
    /** The last approved metadata of the configuration. */
    last_approved?: ProjectConfigMetadataLastApproved;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    last_saved_at?: string;
    /** The href and results from the last action job that is performed on the project configuration. */
    last_validated?: LastValidatedActionWithSummary;
    /** The href and results from the last action job that is performed on the project configuration. */
    last_deployed?: LastActionWithSummary;
    /** The href and results from the last action job that is performed on the project configuration. */
    last_undeployed?: LastActionWithSummary;
    /** The summary from the last monitoring action job that is performed on the project configuration. */
    last_monitoring?: LastMonitoringActionWithSummary;
    /** The outputs of a Schematics template property. */
    outputs: OutputValue[];
    /** The project that is referenced by this resource. */
    project: ProjectReference;
    /** The references that are used in the configuration to resolve input values. */
    references?: JsonObject;
    /** A Schematics workspace that is associated to a project configuration, with scripts. */
    schematics?: SchematicsMetadata;
    /** The state of the configuration. */
    state: ProjectConfigVersion.Constants.State | string;
    /** The flag that indicates whether a configuration update is available. */
    update_available?: boolean;
    /** The stack definition identifier. */
    template_id?: string;
    /** The stack config parent of which this configuration is a member of. */
    member_of?: MemberOfDefinition;
    /** A URL. */
    href: string;
    /** The configuration type. */
    deployment_model?: ProjectConfigVersion.Constants.DeploymentModel | string;
    /** Computed state code clarifying the prerequisites for validation for the configuration. */
    state_code?: ProjectConfigVersion.Constants.StateCode | string;
    definition: ProjectConfigDefinitionResponse;
  }
  export namespace ProjectConfigVersion {
    export namespace Constants {
      /** The state of the configuration. */
      export enum State {
        APPROVED = 'approved',
        DELETED = 'deleted',
        DELETING = 'deleting',
        DELETING_FAILED = 'deleting_failed',
        DISCARDED = 'discarded',
        DRAFT = 'draft',
        DEPLOYED = 'deployed',
        DEPLOYING_FAILED = 'deploying_failed',
        DEPLOYING = 'deploying',
        SUPERSEDED = 'superseded',
        UNDEPLOYING = 'undeploying',
        UNDEPLOYING_FAILED = 'undeploying_failed',
        VALIDATED = 'validated',
        VALIDATING = 'validating',
        VALIDATING_FAILED = 'validating_failed',
        APPLIED = 'applied',
        APPLY_FAILED = 'apply_failed',
      }
      /** The configuration type. */
      export enum DeploymentModel {
        PROJECT_DEPLOYED = 'project_deployed',
        USER_DEPLOYED = 'user_deployed',
        STACK = 'stack',
      }
      /** Computed state code clarifying the prerequisites for validation for the configuration. */
      export enum StateCode {
        AWAITING_INPUT = 'awaiting_input',
        AWAITING_PREREQUISITE = 'awaiting_prerequisite',
        AWAITING_VALIDATION = 'awaiting_validation',
        AWAITING_MEMBER_DEPLOYMENT = 'awaiting_member_deployment',
        AWAITING_STACK_SETUP = 'awaiting_stack_setup',
      }
    }
  }

  /** A summary of the definition in a project configuration version. */
  export interface ProjectConfigVersionDefinitionSummary {
    /** The ID of the project environment. */
    environment_id?: string;
    /** A unique concatenation of the catalog ID and the version ID that identify the deployable architecture in the
     *  catalog. I you're importing from an existing Schematics workspace that is not backed by cart, a `locator_id` is
     *  required. If you're using a Schematics workspace that is backed by cart, a `locator_id` is not necessary because
     *  the Schematics workspace has one.
     *  > There are 3 scenarios:
     *  > 1. If only a `locator_id` is specified, a new Schematics workspace is instantiated with that `locator_id`.
     *  > 2. If only a schematics `workspace_crn` is specified, a `400` is returned if a `locator_id` is not found in
     *  the existing schematics workspace.
     *  > 3. If both a Schematics `workspace_crn` and a `locator_id` are specified, a `400` message is returned if the
     *  specified `locator_id` does not agree with the `locator_id` in the existing Schematics workspace.
     *  > For more information of creating a Schematics workspace, see [Creating workspaces and importing your Terraform
     *  template](/docs/schematics?topic=schematics-sch-create-wks).
     */
    locator_id?: string;
  }

  /** A summary of a project configuration version. */
  export interface ProjectConfigVersionSummary {
    /** A summary of the definition in a project configuration version. */
    definition: ProjectConfigVersionDefinitionSummary;
    /** The state of the configuration. */
    state: ProjectConfigVersionSummary.Constants.State | string;
    /** Computed state code clarifying the prerequisites for validation for the configuration. */
    state_code?: ProjectConfigVersionSummary.Constants.StateCode | string;
    /** The version number of the configuration. */
    version: number;
    /** A URL. */
    href: string;
  }
  export namespace ProjectConfigVersionSummary {
    export namespace Constants {
      /** The state of the configuration. */
      export enum State {
        APPROVED = 'approved',
        DELETED = 'deleted',
        DELETING = 'deleting',
        DELETING_FAILED = 'deleting_failed',
        DISCARDED = 'discarded',
        DRAFT = 'draft',
        DEPLOYED = 'deployed',
        DEPLOYING_FAILED = 'deploying_failed',
        DEPLOYING = 'deploying',
        SUPERSEDED = 'superseded',
        UNDEPLOYING = 'undeploying',
        UNDEPLOYING_FAILED = 'undeploying_failed',
        VALIDATED = 'validated',
        VALIDATING = 'validating',
        VALIDATING_FAILED = 'validating_failed',
        APPLIED = 'applied',
        APPLY_FAILED = 'apply_failed',
      }
      /** Computed state code clarifying the prerequisites for validation for the configuration. */
      export enum StateCode {
        AWAITING_INPUT = 'awaiting_input',
        AWAITING_PREREQUISITE = 'awaiting_prerequisite',
        AWAITING_VALIDATION = 'awaiting_validation',
        AWAITING_MEMBER_DEPLOYMENT = 'awaiting_member_deployment',
        AWAITING_STACK_SETUP = 'awaiting_stack_setup',
      }
    }
  }

  /** The project configuration version list. */
  export interface ProjectConfigVersionSummaryCollection {
    /** The collection list operation response schema that defines the array property with the name `versions`. */
    versions: ProjectConfigVersionSummary[];
  }

  /** The definition of the project. */
  export interface ProjectDefinitionProperties {
    /** The name of the project.  It's unique within the account across regions. */
    name: string;
    /** The policy that indicates whether the resources are destroyed or not when a project is deleted. */
    destroy_on_delete: boolean;
    /** A brief explanation of the project's use in the configuration of a deployable architecture. You can create a
     *  project without providing a description.
     */
    description: string;
    /** A boolean flag to enable auto deploy. */
    auto_deploy: boolean;
    /** A boolean flag to enable automatic drift detection. Use this field to run a daily check to compare your
     *  configurations to your deployed resources to detect any difference.
     */
    monitoring_enabled?: boolean;
  }

  /** The definition of the project reference. */
  export interface ProjectDefinitionReference {
    /** The name of the project. */
    name: string;
  }

  /** The definition of the project. */
  export interface ProjectDefinitionSummary {
    /** The name of the project.  It's unique within the account across regions. */
    name: string;
    /** The policy that indicates whether the resources are destroyed or not when a project is deleted. */
    destroy_on_delete: boolean;
    /** A brief explanation of the project's use in the configuration of a deployable architecture. You can create a
     *  project without providing a description.
     */
    description: string;
  }

  /** The ID of the deleted project. */
  export interface ProjectDeleteResponse {
    /** The ID of the deleted project or configuration. */
    id: string;
  }

  /** The environment metadata. */
  export interface ProjectEnvironmentSummary {
    /** The environment ID as a friendly name. */
    id: string;
    /** The project that is referenced by this resource. */
    project: ProjectReference;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** A URL. */
    href: string;
    /** The environment definition that is used in the project collection. */
    definition: ProjectEnvironmentSummaryDefinition;
  }

  /** The environment definition that is used in the project collection. */
  export interface ProjectEnvironmentSummaryDefinition {
    /** The description of the environment. */
    description: string;
    /** The name of the environment. It's unique within the account across projects and regions. */
    name: string;
  }

  /** The definition of the project. */
  export interface ProjectPatchDefinitionBlock {
    /** The name of the project.  It's unique within the account across regions. */
    name?: string;
    /** The policy that indicates whether the resources are destroyed or not when a project is deleted. */
    destroy_on_delete?: boolean;
    /** A boolean flag to enable auto deploy. */
    auto_deploy?: boolean;
    /** A brief explanation of the project's use in the configuration of a deployable architecture. You can create a
     *  project without providing a description.
     */
    description?: string;
    /** A boolean flag to enable automatic drift detection. Use this field to run a daily check to compare your
     *  configurations to your deployed resources to detect any difference.
     */
    monitoring_enabled?: boolean;
  }

  /** The definition of the project. */
  export interface ProjectPrototypeDefinition {
    /** The name of the project.  It's unique within the account across regions. */
    name: string;
    /** The policy that indicates whether the resources are undeployed or not when a project is deleted. */
    destroy_on_delete?: boolean;
    /** A brief explanation of the project's use in the configuration of a deployable architecture. You can create a
     *  project without providing a description.
     */
    description?: string;
    /** A boolean flag to enable auto deploy. */
    auto_deploy?: boolean;
    /** A boolean flag to enable automatic drift detection. Use this field to run a daily check to compare your
     *  configurations to your deployed resources to detect any difference.
     */
    monitoring_enabled?: boolean;
  }

  /** The project that is referenced by this resource. */
  export interface ProjectReference {
    /** The unique ID. */
    id: string;
    /** A URL. */
    href: string;
    /** The definition of the project reference. */
    definition: ProjectDefinitionReference;
    /** An IBM Cloud resource name that uniquely identifies a resource. */
    crn: string;
  }

  /** ProjectSummary. */
  export interface ProjectSummary {
    /** An IBM Cloud resource name that uniquely identifies a resource. */
    crn: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** The cumulative list of needs attention items for a project. If the view is successfully retrieved, an empty
     *  or nonempty array is returned.
     */
    cumulative_needs_attention_view: CumulativeNeedsAttention[];
    /** A value of `true` indicates that the fetch of the needs attention items failed. This property only exists if
     *  there was an error when you retrieved the cumulative needs attention view.
     */
    cumulative_needs_attention_view_error?: boolean;
    /** The unique project ID. */
    id: string;
    /** The IBM Cloud location where a resource is deployed. */
    location: string;
    /** The resource group ID where the project's data and tools are created. */
    resource_group_id: string;
    /** The project status value. */
    state: ProjectSummary.Constants.State | string;
    /** A URL. */
    href: string;
    /** The definition of the project. */
    definition: ProjectDefinitionSummary;
  }
  export namespace ProjectSummary {
    export namespace Constants {
      /** The project status value. */
      export enum State {
        READY = 'ready',
        DELETING = 'deleting',
        DELETING_FAILED = 'deleting_failed',
      }
    }
  }

  /** A Schematics workspace that is associated to a project configuration, with scripts. */
  export interface SchematicsMetadata {
    /** An IBM Cloud resource name that uniquely identifies a resource. */
    workspace_crn?: string;
    /** A script to be run as part of a project configuration for a specific stage (pre or post) and action
     *  (validate, deploy, or undeploy).
     */
    validate_pre_script?: Script;
    /** A script to be run as part of a project configuration for a specific stage (pre or post) and action
     *  (validate, deploy, or undeploy).
     */
    validate_post_script?: Script;
    /** A script to be run as part of a project configuration for a specific stage (pre or post) and action
     *  (validate, deploy, or undeploy).
     */
    deploy_pre_script?: Script;
    /** A script to be run as part of a project configuration for a specific stage (pre or post) and action
     *  (validate, deploy, or undeploy).
     */
    deploy_post_script?: Script;
    /** A script to be run as part of a project configuration for a specific stage (pre or post) and action
     *  (validate, deploy, or undeploy).
     */
    undeploy_pre_script?: Script;
    /** A script to be run as part of a project configuration for a specific stage (pre or post) and action
     *  (validate, deploy, or undeploy).
     */
    undeploy_post_script?: Script;
  }

  /** A Schematics workspace to use for deploying this deployable architecture. > If you are importing data from an existing Schematics workspace that is not backed by cart, then you must provide a `locator_id`. If you are using a Schematics workspace that is backed by cart, a `locator_id` is not required because the Schematics workspace has one. > There are 3 scenarios: > 1. If only a `locator_id` is specified, a new Schematics workspace is instantiated with that `locator_id`. > 2. If only a schematics `workspace_crn` is specified, a `400` is returned if a `locator_id` is not found in the existing schematics workspace. > 3. If both a Schematics `workspace_crn` and a `locator_id` are specified, a `400`code  is returned if the specified `locator_id` does not agree with the `locator_id` in the existing Schematics workspace. > For more information, see [Creating workspaces and importing your Terraform template](/docs/schematics?topic=schematics-sch-create-wks). */
  export interface SchematicsWorkspace {
    /** An IBM Cloud resource name that uniquely identifies a resource. */
    workspace_crn?: string;
  }

  /** A script to be run as part of a project configuration for a specific stage (pre or post) and action (validate, deploy, or undeploy). */
  export interface Script {
    /** The type of the script. */
    type?: string;
    /** The path to this script is within the current version source. */
    path?: string;
    /** The short description for this script. */
    short_description?: string;
  }

  /** The definition summary of the stack configuration. */
  export interface StackConfigDefinitionSummary {
    /** The configuration name. It's unique within the account across projects and regions. */
    name: string;
    /** The member deployabe architectures that are included in your stack. */
    members: StackConfigMember[];
  }

  /** A member deployable architecture that is included in your stack. */
  export interface StackConfigMember {
    /** The name matching the alias in the stack definition. */
    name: string;
    /** The unique ID. */
    config_id: string;
  }

  /** The stack definition. */
  export interface StackDefinition {
    /** The ID of the stack definition. */
    id: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    modified_at: string;
    /** The state for the stack definition. */
    state: StackDefinition.Constants.State | string;
    /** The configuration reference. */
    configuration: StackDefinitionMetadataConfiguration;
    /** A URL. */
    href: string;
    /** The definition block for a stack definition. */
    stack_definition: StackDefinitionBlock;
  }
  export namespace StackDefinition {
    export namespace Constants {
      /** The state for the stack definition. */
      export enum State {
        DRAFT = 'draft',
        PUBLISHED = 'published',
      }
    }
  }

  /** The definition block for a stack definition. */
  export interface StackDefinitionBlock {
    /** Defines the inputs that users need to configure at the stack level. These inputs are included in the catalog
     *  entry when the deployable architecture stack is exported to a private catalog.
     */
    inputs?: StackDefinitionInputVariable[];
    /** The outputs associated with this stack definition. */
    outputs?: StackDefinitionOutputVariable[];
    /** The member deployabe architectures that are included in your stack. */
    members?: StackDefinitionMember[];
  }

  /** The definition block for a stack definition. */
  export interface StackDefinitionBlockPrototype {
    /** Defines the inputs that users need to configure at the stack level. These inputs are included in the catalog
     *  entry when the deployable architecture stack is exported to a private catalog.
     */
    inputs?: StackDefinitionInputVariable[];
    /** The outputs associated with this stack definition. */
    outputs?: StackDefinitionOutputVariable[];
  }

  /** The payload for the stack definition export request. */
  export interface StackDefinitionExportRequest {}

  /** The payload for the stack definition export response. */
  export interface StackDefinitionExportResponse {
    /** The catalog ID to publish. */
    catalog_id?: string;
    /** The product ID to publish. */
    product_id?: string;
    /** The version locator of the created deployable architecture. */
    version_locator?: string;
    /** The product target kind value. */
    kind?: string;
    /** The product format kind value. */
    format?: string;
  }

  /** The input variables for a stack definition. */
  export interface StackDefinitionInputVariable {
    /** The stack definition input name. */
    name: string;
    /** The variable type. */
    type: StackDefinitionInputVariable.Constants.Type | string;
    /** The description of the variable. */
    description?: string;
    /** This property can be any value - a string, number, boolean, array, or object. */
    default: any;
    /** A boolean value to denote if the property is required. */
    required?: boolean;
    /** A boolean value to denote whether the property is hidden, as in not exposed to the user. */
    hidden?: boolean;
  }
  export namespace StackDefinitionInputVariable {
    export namespace Constants {
      /** The variable type. */
      export enum Type {
        ARRAY = 'array',
        BOOLEAN = 'boolean',
        FLOAT = 'float',
        INT = 'int',
        NUMBER = 'number',
        PASSWORD = 'password',
        STRING = 'string',
        OBJECT = 'object',
      }
    }
  }

  /** The member definition associated with this stack definition. */
  export interface StackDefinitionMember {
    /** The name matching the alias in the stack definition. */
    name: string;
    /** The version locator of the member deployable architecture. */
    version_locator: string;
    /** The member inputs to use for the stack definition. */
    inputs?: StackDefinitionMemberInput[];
  }

  /** StackDefinitionMemberInput. */
  export interface StackDefinitionMemberInput {
    /** The member input name to use. */
    name: string;
    /** The value of the stack definition output. */
    value: any;
  }

  /** The configuration reference. */
  export interface StackDefinitionMetadataConfiguration {
    /** The unique ID. */
    id: string;
    /** A URL. */
    href: string;
    /** The definition of the config reference. */
    definition: ConfigDefinitionReference;
  }

  /** The output variables for a stack definition. */
  export interface StackDefinitionOutputVariable {
    /** The stack definition output name. */
    name: string;
    /** The value of the stack definition output. */
    value: any;
  }

  /** The error message that is parsed by the Terraform log analyzer. */
  export interface TerraformLogAnalyzerErrorMessage {
    /** TerraformLogAnalyzerErrorMessage accepts additional properties. */
    [propName: string]: any;
  }

  /** The success message that is parsed by the terraform log analyzer. */
  export interface TerraformLogAnalyzerSuccessMessage {
    /** The resource type. */
    resource_type?: string;
    /** The time that is taken. */
    'time-taken'?: string;
    /** The ID. */
    id?: string;
  }

  /** The name and description of a project configuration. */
  export interface ProjectConfigDefinitionPatchDAConfigDefinitionPropertiesPatch
    extends ProjectConfigDefinitionPatch {
    /** The profile that is required for compliance. */
    compliance_profile?: ProjectComplianceProfile;
    /** A unique concatenation of the catalog ID and the version ID that identify the deployable architecture in the
     *  catalog. I you're importing from an existing Schematics workspace that is not backed by cart, a `locator_id` is
     *  required. If you're using a Schematics workspace that is backed by cart, a `locator_id` is not necessary because
     *  the Schematics workspace has one.
     *  > There are 3 scenarios:
     *  > 1. If only a `locator_id` is specified, a new Schematics workspace is instantiated with that `locator_id`.
     *  > 2. If only a schematics `workspace_crn` is specified, a `400` is returned if a `locator_id` is not found in
     *  the existing schematics workspace.
     *  > 3. If both a Schematics `workspace_crn` and a `locator_id` are specified, a `400` message is returned if the
     *  specified `locator_id` does not agree with the `locator_id` in the existing Schematics workspace.
     *  > For more information of creating a Schematics workspace, see [Creating workspaces and importing your Terraform
     *  template](/docs/schematics?topic=schematics-sch-create-wks).
     */
    locator_id?: string;
    /** A project configuration description. */
    description?: string;
    /** The configuration name. It's unique within the account across projects and regions. */
    name?: string;
    /** The ID of the project environment. */
    environment_id?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables that are used for configuration definition and environment. */
    inputs?: JsonObject;
    /** The Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  are specified when the configuration is initially created.
     */
    settings?: JsonObject;
  }

  /** The name and description of a project configuration. */
  export interface ProjectConfigDefinitionPatchResourceConfigDefinitionPropertiesPatch
    extends ProjectConfigDefinitionPatch {
    /** The CRNs of the resources that are associated with this configuration. */
    resource_crns?: string[];
    /** A project configuration description. */
    description?: string;
    /** The configuration name. It's unique within the account across projects and regions. */
    name?: string;
    /** The ID of the project environment. */
    environment_id?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables that are used for configuration definition and environment. */
    inputs?: JsonObject;
    /** The Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  are specified when the configuration is initially created.
     */
    settings?: JsonObject;
  }

  /** The name and description of a project configuration. */
  export interface ProjectConfigDefinitionPatchStackConfigDefinitionPropertiesPatch
    extends ProjectConfigDefinitionPatch {
    /** The profile that is required for compliance. */
    compliance_profile?: ProjectComplianceProfile;
    /** A unique concatenation of the catalog ID and the version ID that identify the deployable architecture in the
     *  catalog. I you're importing from an existing Schematics workspace that is not backed by cart, a `locator_id` is
     *  required. If you're using a Schematics workspace that is backed by cart, a `locator_id` is not necessary because
     *  the Schematics workspace has one.
     *  > There are 3 scenarios:
     *  > 1. If only a `locator_id` is specified, a new Schematics workspace is instantiated with that `locator_id`.
     *  > 2. If only a schematics `workspace_crn` is specified, a `400` is returned if a `locator_id` is not found in
     *  the existing schematics workspace.
     *  > 3. If both a Schematics `workspace_crn` and a `locator_id` are specified, a `400` message is returned if the
     *  specified `locator_id` does not agree with the `locator_id` in the existing Schematics workspace.
     *  > For more information of creating a Schematics workspace, see [Creating workspaces and importing your Terraform
     *  template](/docs/schematics?topic=schematics-sch-create-wks).
     */
    locator_id?: string;
    /** The member deployabe architectures that are included in your stack. */
    members?: StackConfigMember[];
    /** A project configuration description. */
    description?: string;
    /** The configuration name. It's unique within the account across projects and regions. */
    name?: string;
    /** The ID of the project environment. */
    environment_id?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables that are used for configuration definition and environment. */
    inputs?: JsonObject;
    /** The Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  are specified when the configuration is initially created.
     */
    settings?: JsonObject;
  }

  /** The description of a project configuration. */
  export interface ProjectConfigDefinitionPrototypeDAConfigDefinitionPropertiesPrototype
    extends ProjectConfigDefinitionPrototype {
    /** The profile that is required for compliance. */
    compliance_profile?: ProjectComplianceProfile;
    /** A unique concatenation of the catalog ID and the version ID that identify the deployable architecture in the
     *  catalog. I you're importing from an existing Schematics workspace that is not backed by cart, a `locator_id` is
     *  required. If you're using a Schematics workspace that is backed by cart, a `locator_id` is not necessary because
     *  the Schematics workspace has one.
     *  > There are 3 scenarios:
     *  > 1. If only a `locator_id` is specified, a new Schematics workspace is instantiated with that `locator_id`.
     *  > 2. If only a schematics `workspace_crn` is specified, a `400` is returned if a `locator_id` is not found in
     *  the existing schematics workspace.
     *  > 3. If both a Schematics `workspace_crn` and a `locator_id` are specified, a `400` message is returned if the
     *  specified `locator_id` does not agree with the `locator_id` in the existing Schematics workspace.
     *  > For more information of creating a Schematics workspace, see [Creating workspaces and importing your Terraform
     *  template](/docs/schematics?topic=schematics-sch-create-wks).
     */
    locator_id?: string;
    /** A project configuration description. */
    description?: string;
    /** The configuration name. It's unique within the account across projects and regions. */
    name: string;
    /** The ID of the project environment. */
    environment_id?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables that are used for configuration definition and environment. */
    inputs?: JsonObject;
    /** The Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  are specified when the configuration is initially created.
     */
    settings?: JsonObject;
  }

  /** The description of a project configuration. */
  export interface ProjectConfigDefinitionPrototypeResourceConfigDefinitionPropertiesPrototype
    extends ProjectConfigDefinitionPrototype {
    /** The CRNs of the resources that are associated with this configuration. */
    resource_crns?: string[];
    /** A project configuration description. */
    description?: string;
    /** The configuration name. It's unique within the account across projects and regions. */
    name: string;
    /** The ID of the project environment. */
    environment_id?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables that are used for configuration definition and environment. */
    inputs?: JsonObject;
    /** The Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  are specified when the configuration is initially created.
     */
    settings?: JsonObject;
  }

  /** The description of a project configuration. */
  export interface ProjectConfigDefinitionPrototypeStackConfigDefinitionProperties
    extends ProjectConfigDefinitionPrototype {
    /** The profile that is required for compliance. */
    compliance_profile?: ProjectComplianceProfile;
    /** A unique concatenation of the catalog ID and the version ID that identify the deployable architecture in the
     *  catalog. I you're importing from an existing Schematics workspace that is not backed by cart, a `locator_id` is
     *  required. If you're using a Schematics workspace that is backed by cart, a `locator_id` is not necessary because
     *  the Schematics workspace has one.
     *  > There are 3 scenarios:
     *  > 1. If only a `locator_id` is specified, a new Schematics workspace is instantiated with that `locator_id`.
     *  > 2. If only a schematics `workspace_crn` is specified, a `400` is returned if a `locator_id` is not found in
     *  the existing schematics workspace.
     *  > 3. If both a Schematics `workspace_crn` and a `locator_id` are specified, a `400` message is returned if the
     *  specified `locator_id` does not agree with the `locator_id` in the existing Schematics workspace.
     *  > For more information of creating a Schematics workspace, see [Creating workspaces and importing your Terraform
     *  template](/docs/schematics?topic=schematics-sch-create-wks).
     */
    locator_id?: string;
    /** The member deployabe architectures that are included in your stack. */
    members?: StackConfigMember[];
    /** A project configuration description. */
    description?: string;
    /** The configuration name. It's unique within the account across projects and regions. */
    name: string;
    /** The ID of the project environment. */
    environment_id?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables that are used for configuration definition and environment. */
    inputs?: JsonObject;
    /** The Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  are specified when the configuration is initially created.
     */
    settings?: JsonObject;
  }

  /** The description of a project configuration. */
  export interface ProjectConfigDefinitionResponseDAConfigDefinitionPropertiesResponse
    extends ProjectConfigDefinitionResponse {
    /** The profile that is required for compliance. */
    compliance_profile?: ProjectComplianceProfile;
    /** A unique concatenation of the catalog ID and the version ID that identify the deployable architecture in the
     *  catalog. I you're importing from an existing Schematics workspace that is not backed by cart, a `locator_id` is
     *  required. If you're using a Schematics workspace that is backed by cart, a `locator_id` is not necessary because
     *  the Schematics workspace has one.
     *  > There are 3 scenarios:
     *  > 1. If only a `locator_id` is specified, a new Schematics workspace is instantiated with that `locator_id`.
     *  > 2. If only a schematics `workspace_crn` is specified, a `400` is returned if a `locator_id` is not found in
     *  the existing schematics workspace.
     *  > 3. If both a Schematics `workspace_crn` and a `locator_id` are specified, a `400` message is returned if the
     *  specified `locator_id` does not agree with the `locator_id` in the existing Schematics workspace.
     *  > For more information of creating a Schematics workspace, see [Creating workspaces and importing your Terraform
     *  template](/docs/schematics?topic=schematics-sch-create-wks).
     */
    locator_id?: string;
    /** A project configuration description. */
    description: string;
    /** The configuration name. It's unique within the account across projects and regions. */
    name: string;
    /** The ID of the project environment. */
    environment_id?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables that are used for configuration definition and environment. */
    inputs?: JsonObject;
    /** The Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  are specified when the configuration is initially created.
     */
    settings?: JsonObject;
  }

  /** The description of a project configuration. */
  export interface ProjectConfigDefinitionResponseResourceConfigDefinitionPropertiesResponse
    extends ProjectConfigDefinitionResponse {
    /** The CRNs of the resources that are associated with this configuration. */
    resource_crns?: string[];
    /** A project configuration description. */
    description: string;
    /** The configuration name. It's unique within the account across projects and regions. */
    name: string;
    /** The ID of the project environment. */
    environment_id?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables that are used for configuration definition and environment. */
    inputs?: JsonObject;
    /** The Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  are specified when the configuration is initially created.
     */
    settings?: JsonObject;
  }

  /** The description of a project configuration. */
  export interface ProjectConfigDefinitionResponseStackConfigDefinitionProperties
    extends ProjectConfigDefinitionResponse {
    /** The profile that is required for compliance. */
    compliance_profile?: ProjectComplianceProfile;
    /** A unique concatenation of the catalog ID and the version ID that identify the deployable architecture in the
     *  catalog. I you're importing from an existing Schematics workspace that is not backed by cart, a `locator_id` is
     *  required. If you're using a Schematics workspace that is backed by cart, a `locator_id` is not necessary because
     *  the Schematics workspace has one.
     *  > There are 3 scenarios:
     *  > 1. If only a `locator_id` is specified, a new Schematics workspace is instantiated with that `locator_id`.
     *  > 2. If only a schematics `workspace_crn` is specified, a `400` is returned if a `locator_id` is not found in
     *  the existing schematics workspace.
     *  > 3. If both a Schematics `workspace_crn` and a `locator_id` are specified, a `400` message is returned if the
     *  specified `locator_id` does not agree with the `locator_id` in the existing Schematics workspace.
     *  > For more information of creating a Schematics workspace, see [Creating workspaces and importing your Terraform
     *  template](/docs/schematics?topic=schematics-sch-create-wks).
     */
    locator_id?: string;
    /** The member deployabe architectures that are included in your stack. */
    members?: StackConfigMember[];
    /** A project configuration description. */
    description?: string;
    /** The configuration name. It's unique within the account across projects and regions. */
    name: string;
    /** The ID of the project environment. */
    environment_id?: string;
    /** The authorization details. You can authorize by using a trusted profile or an API key in Secrets Manager. */
    authorizations?: ProjectConfigAuth;
    /** The input variables that are used for configuration definition and environment. */
    inputs?: JsonObject;
    /** The Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  are specified when the configuration is initially created.
     */
    settings?: JsonObject;
  }

  /** The Code Risk Analyzer logs of the configuration based on Code Risk Analyzer version 2.0.4. */
  export interface ProjectConfigMetadataCodeRiskAnalyzerLogsVersion204
    extends ProjectConfigMetadataCodeRiskAnalyzerLogs {
    /** The version of the Code Risk Analyzer logs of the configuration. The metadata for this schema is specific to
     *  Code Risk Analyzer version 2.0.4.
     */
    cra_version?: string;
    /** The schema version of Code Risk Analyzer logs of the configuration. */
    schema_version?: string;
    /** The status of the Code Risk Analyzer logs of the configuration. */
    status?: ProjectConfigMetadataCodeRiskAnalyzerLogsVersion204.Constants.Status | string;
    /** The Code Risk Analyzer logs a summary of the configuration. */
    summary?: CodeRiskAnalyzerLogsSummary;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ to match the date and
     *  time format as specified by RFC 3339.
     */
    timestamp?: string;
  }
  export namespace ProjectConfigMetadataCodeRiskAnalyzerLogsVersion204 {
    export namespace Constants {
      /** The status of the Code Risk Analyzer logs of the configuration. */
      export enum Status {
        PASSED = 'passed',
        FAILED = 'failed',
      }
    }
  }

  /** The payload for the stack definition export request to create a product. */
  export interface StackDefinitionExportRequestStackDefinitionExportCatalogRequest
    extends StackDefinitionExportRequest {
    /** The catalog ID to publish. */
    catalog_id: string;
    /** The semver value of this new version of the product. */
    target_version?: string;
    /** The variation of this new version of the product. */
    variation?: string;
    /** The product label. */
    label: string;
    /** Tags associated with the catalog product. */
    tags?: string[];
  }

  /** The payload for the stack definition export request to create a new product version. */
  export interface StackDefinitionExportRequestStackDefinitionExportProductRequest
    extends StackDefinitionExportRequest {
    /** The catalog ID to publish. */
    catalog_id: string;
    /** The semver value of this new version of the product. */
    target_version: string;
    /** The variation of this new version of the product. */
    variation?: string;
    /** The product ID to publish. */
    product_id: string;
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
      if (params && params.token) {
        throw new Error(`the params.token field should not be set`);
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
        this.params.token = this.pageContext.next;
      }
      const response = await this.client.listProjects(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        if (result.next.href) {
          next = getQueryParam(result.next.href, 'token');
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

  /**
   * ProjectEnvironmentsPager can be used to simplify the use of listProjectEnvironments().
   */
  export class ProjectEnvironmentsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: ProjectV1;

    protected params: ProjectV1.ListProjectEnvironmentsParams;

    /**
     * Construct a ProjectEnvironmentsPager object.
     *
     * @param {ProjectV1}  client - The service client instance used to invoke listProjectEnvironments()
     * @param {Object} params - The parameters to be passed to listProjectEnvironments()
     * @constructor
     * @returns {ProjectEnvironmentsPager}
     */
    constructor(client: ProjectV1, params: ProjectV1.ListProjectEnvironmentsParams) {
      if (params && params.token) {
        throw new Error(`the params.token field should not be set`);
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
     * Returns the next page of results by invoking listProjectEnvironments().
     * @returns {Promise<ProjectV1.Environment[]>}
     */
    public async getNext(): Promise<ProjectV1.Environment[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.token = this.pageContext.next;
      }
      const response = await this.client.listProjectEnvironments(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        if (result.next.href) {
          next = getQueryParam(result.next.href, 'token');
        }
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.environments;
    }

    /**
     * Returns all results by invoking listProjectEnvironments() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<ProjectV1.Environment[]>}
     */
    public async getAll(): Promise<ProjectV1.Environment[]> {
      const results: Environment[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ConfigsPager can be used to simplify the use of listConfigs().
   */
  export class ConfigsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: ProjectV1;

    protected params: ProjectV1.ListConfigsParams;

    /**
     * Construct a ConfigsPager object.
     *
     * @param {ProjectV1}  client - The service client instance used to invoke listConfigs()
     * @param {Object} params - The parameters to be passed to listConfigs()
     * @constructor
     * @returns {ConfigsPager}
     */
    constructor(client: ProjectV1, params: ProjectV1.ListConfigsParams) {
      if (params && params.token) {
        throw new Error(`the params.token field should not be set`);
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
     * Returns the next page of results by invoking listConfigs().
     * @returns {Promise<ProjectV1.ProjectConfigSummary[]>}
     */
    public async getNext(): Promise<ProjectV1.ProjectConfigSummary[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.token = this.pageContext.next;
      }
      const response = await this.client.listConfigs(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        if (result.next.href) {
          next = getQueryParam(result.next.href, 'token');
        }
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.configs;
    }

    /**
     * Returns all results by invoking listConfigs() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<ProjectV1.ProjectConfigSummary[]>}
     */
    public async getAll(): Promise<ProjectV1.ProjectConfigSummary[]> {
      const results: ProjectConfigSummary[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = ProjectV1;
