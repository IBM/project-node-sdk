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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.70.0-7df966bf-20230419-195904
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  validateParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * This document is the **REST API specification** for the Projects Service. The Projects service provides the
 * capability to manage Infrastructure as Code in IBM Cloud.
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
   * @param {string} params.resourceGroup - The resource group where the project's data and tools are created.
   * @param {string} params.location - The location where the project's data and tools are created.
   * @param {string} params.name - The project name.
   * @param {string} [params.description] - A project's descriptive text.
   * @param {ProjectConfigPrototype[]} [params.configs] - The project configurations.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.Project>>}
   */
  public createProject(
    params: ProjectV1.CreateProjectParams
  ): Promise<ProjectV1.Response<ProjectV1.Project>> {
    const _params = { ...params };
    const _requiredParams = ['resourceGroup', 'location', 'name'];
    const _validParams = ['resourceGroup', 'location', 'name', 'description', 'configs', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'configs': _params.configs,
    };

    const query = {
      'resource_group': _params.resourceGroup,
      'location': _params.location,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'createProject');

    const parameters = {
      options: {
        url: '/v1/projects',
        method: 'POST',
        body,
        qs: query,
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
   * @param {boolean} [params.complete] - Determines whether the metadata should be returned. Only the metadata for the
   * project is returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectCollection>>}
   */
  public listProjects(
    params?: ProjectV1.ListProjectsParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['start', 'limit', 'complete', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'start': _params.start,
      'limit': _params.limit,
      'complete': _params.complete,
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
   * @param {string} params.id - The unique identifier.
   * @param {boolean} [params.excludeConfigs] - When set to true, exclude_configs returns only active configurations.
   * Draft configurations are not returned.
   * @param {boolean} [params.complete] - Determines whether the metadata should be returned. Only the metadata for the
   * project is returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.Project>>}
   */
  public getProject(
    params: ProjectV1.GetProjectParams
  ): Promise<ProjectV1.Response<ProjectV1.Project>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'excludeConfigs', 'complete', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'exclude_configs': _params.excludeConfigs,
      'complete': _params.complete,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'getProject');

    const parameters = {
      options: {
        url: '/v1/projects/{id}',
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
   * Update a project.
   *
   * Update a project by the ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The unique identifier.
   * @param {JsonPatchOperation[]} params.jsonPatchOperation - The new project definition document.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.Project>>}
   */
  public updateProject(
    params: ProjectV1.UpdateProjectParams
  ): Promise<ProjectV1.Response<ProjectV1.Project>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'jsonPatchOperation'];
    const _validParams = ['id', 'jsonPatchOperation', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.jsonPatchOperation;
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
            'Content-Type': 'application/json-patch+json',
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
   * Delete a project document by the ID. A project can only be deleted after deleting all of its artifacts.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The unique identifier.
   * @param {boolean} [params.destroy] - The flag that indicates if the resources deployed by schematics should be
   * destroyed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.EmptyObject>>}
   */
  public deleteProject(
    params: ProjectV1.DeleteProjectParams
  ): Promise<ProjectV1.Response<ProjectV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'destroy', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'destroy': _params.destroy,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteProject');

    const parameters = {
      options: {
        url: '/v1/projects/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
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
   * @param {string} params.name - The configuration name.
   * @param {string} params.locatorId - A dotted value of catalogID.versionID.
   * @param {string} [params.id] - The ID of the configuration. If this parameter is empty, an ID is automatically
   * created for the configuration.
   * @param {string[]} [params.labels] - A collection of configuration labels.
   * @param {string} [params.description] - The project configuration description.
   * @param {ProjectConfigInputVariable[]} [params.input] - The input values to use to deploy the configuration.
   * @param {ProjectConfigSettingCollection[]} [params.setting] - Schematics environment variables to use to deploy the
   * configuration.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public createConfig(
    params: ProjectV1.CreateConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name', 'locatorId'];
    const _validParams = [
      'projectId',
      'name',
      'locatorId',
      'id',
      'labels',
      'description',
      'input',
      'setting',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'locator_id': _params.locatorId,
      'id': _params.id,
      'labels': _params.labels,
      'description': _params.description,
      'input': _params.input,
      'setting': _params.setting,
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
   * @param {string} [params.version] - The version of configuration to return.
   * @param {boolean} [params.complete] - Determines whether the metadata should be returned. Only the metadata for the
   * project is returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigCollection>>}
   */
  public listConfigs(
    params: ProjectV1.ListConfigsParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigCollection>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'version', 'complete', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': _params.version,
      'complete': _params.complete,
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
   * Returns the specified project configuration in a specific project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique identifier.
   * @param {string} [params.version] - The version of the configuration to return.
   * @param {boolean} [params.complete] - Determines whether the metadata should be returned. Only the metadata for the
   * project is returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public getConfig(
    params: ProjectV1.GetConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'version', 'complete', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': _params.version,
      'complete': _params.complete,
    };

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'getConfig');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}',
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
   * Update a configuration.
   *
   * Update a configuration in a project by the ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique identifier.
   * @param {JsonPatchOperation[]} params.projectConfig - The change delta of the project configuration to update.
   * @param {boolean} [params.complete] - Determines whether the metadata should be returned. Only the metadata for the
   * project is returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public updateConfig(
    params: ProjectV1.UpdateConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id', 'projectConfig'];
    const _validParams = ['projectId', 'id', 'projectConfig', 'complete', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.projectConfig;
    const query = {
      'complete': _params.complete,
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
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json-patch+json',
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
   * Delete a configuration in a project. Deleting the configuration will also destroy all the resources deployed by the
   * configuration if the query parameter destroy is specified.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique identifier.
   * @param {boolean} [params.draftOnly] - The flag to determine if only the draft version should be deleted.
   * @param {boolean} [params.destroy] - The flag that indicates if the resources deployed by schematics should be
   * destroyed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigDelete>>}
   */
  public deleteConfig(
    params: ProjectV1.DeleteConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigDelete>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'draftOnly', 'destroy', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'draft_only': _params.draftOnly,
      'destroy': _params.destroy,
    };

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteConfig');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}',
        method: 'DELETE',
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
   * Get a diff summary of a project configuration.
   *
   * Returns a diff summary of the specified project configuration between its current draft and active version of a
   * specific project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigDiff>>}
   */
  public getConfigDiff(
    params: ProjectV1.GetConfigDiffParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigDiff>> {
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

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'getConfigDiff');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/diff',
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
   * Force approve project configuration.
   *
   * Force approve configuration edits to the main configuration with an approving comment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique identifier.
   * @param {string} [params.comment] - Notes on the project draft action.
   * @param {boolean} [params.complete] - Determines whether the metadata should be returned. Only the metadata for the
   * project is returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public forceApprove(
    params: ProjectV1.ForceApproveParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'comment', 'complete', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'comment': _params.comment,
    };

    const query = {
      'complete': _params.complete,
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
        qs: query,
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
   * @param {string} params.id - The unique identifier.
   * @param {string} [params.comment] - Notes on the project draft action.
   * @param {boolean} [params.complete] - Determines whether the metadata should be returned. Only the metadata for the
   * project is returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public approve(
    params: ProjectV1.ApproveParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'comment', 'complete', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'comment': _params.comment,
    };

    const query = {
      'complete': _params.complete,
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
        qs: query,
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
   * @param {string} params.id - The unique identifier.
   * @param {string} [params.xAuthRefreshToken] - The IAM refresh token.
   * @param {boolean} [params.complete] - Determines whether the metadata should be returned. Only the metadata for the
   * project is returned.
   * @param {string} [params.version] - The version of the configuration that the validation check should trigger
   * against.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public checkConfig(
    params: ProjectV1.CheckConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'xAuthRefreshToken', 'complete', 'version', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'complete': _params.complete,
      'version': _params.version,
    };

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'checkConfig');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/check',
        method: 'POST',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Auth-Refresh-Token': _params.xAuthRefreshToken,
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
   * @param {string} params.id - The unique identifier.
   * @param {boolean} [params.complete] - Determines whether the metadata should be returned. Only the metadata for the
   * project is returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public installConfig(
    params: ProjectV1.InstallConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'complete', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'complete': _params.complete,
    };

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'installConfig');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/install',
        method: 'POST',
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
   * Destroy configuration resources.
   *
   * Destroy a project's configuration resources. The operation destroys all the resources that are deployed with the
   * specific configuration. You can track it by using the get project configuration API with full metadata.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.EmptyObject>>}
   */
  public uninstallConfig(
    params: ProjectV1.UninstallConfigParams
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

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'uninstallConfig');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/uninstall',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * toolchain
   ************************/

  /**
   * View the latest schematics job.
   *
   * Fetch and find the latest schematics job that corresponds to a plan, deploy, or destroy configuration resource
   * action.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique identifier.
   * @param {string} params.action - The triggered action.
   * @param {number} [params.since] - The timestamp of when the action was triggered.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ActionJob>>}
   */
  public getSchematicsJob(
    params: ProjectV1.GetSchematicsJobParams
  ): Promise<ProjectV1.Response<ProjectV1.ActionJob>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id', 'action'];
    const _validParams = ['projectId', 'id', 'action', 'since', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'since': _params.since,
    };

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
      'action': _params.action,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'getSchematicsJob');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/job/{action}',
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
   * Get the cost estimate.
   *
   * Retrieve the cost estimate for a configuraton.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique identifier.
   * @param {string} [params.version] - The version of the configuration that the cost estimate will fetch.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.CostEstimate>>}
   */
  public getCostEstimate(
    params: ProjectV1.GetCostEstimateParams
  ): Promise<ProjectV1.Response<ProjectV1.CostEstimate>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'version', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': _params.version,
    };

    const path = {
      'project_id': _params.projectId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'getCostEstimate');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/cost_estimate',
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
   * Creates a project CRN token.
   *
   * Refreshes a project CRN token by creating a new one.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The unique identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectCRNTokenResponse>>}
   */
  public postCrnToken(
    params: ProjectV1.PostCrnTokenParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectCRNTokenResponse>> {
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

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'postCrnToken');

    const parameters = {
      options: {
        url: '/v1/projects/{id}/token',
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
  /*************************
   * event
   ************************/

  /**
   * Add notifications.
   *
   * Creates a notification event to be stored on the project definition.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The unique identifier.
   * @param {NotificationEvent[]} [params.notifications] - Collection of the notification events to post.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.NotificationsPrototypePostResponse>>}
   */
  public postNotification(
    params: ProjectV1.PostNotificationParams
  ): Promise<ProjectV1.Response<ProjectV1.NotificationsPrototypePostResponse>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'notifications', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'notifications': _params.notifications,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'postNotification');

    const parameters = {
      options: {
        url: '/v1/projects/{id}/event',
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
   * Get events by project ID.
   *
   * Get all the notification events from a specific project ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The unique identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.NotificationsGetResponse>>}
   */
  public getNotifications(
    params: ProjectV1.GetNotificationsParams
  ): Promise<ProjectV1.Response<ProjectV1.NotificationsGetResponse>> {
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

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'getNotifications');

    const parameters = {
      options: {
        url: '/v1/projects/{id}/event',
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
  /*************************
   * integration
   ************************/

  /**
   * Connect to a event notifications instance.
   *
   * Connects a project instance to an event notifications instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The unique identifier.
   * @param {string} params.instanceCrn - A CRN of the instance of the event.
   * @param {string} [params.description] - A description of the instance of the event.
   * @param {string} [params.eventNotificationsSourceName] - The name of the project source for the event notifications
   * instance.
   * @param {boolean} [params.enabled] - A status of the instance of the event.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.NotificationsIntegrationPostResponse>>}
   */
  public postEventNotificationsIntegration(
    params: ProjectV1.PostEventNotificationsIntegrationParams
  ): Promise<ProjectV1.Response<ProjectV1.NotificationsIntegrationPostResponse>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'instanceCrn'];
    const _validParams = [
      'id',
      'instanceCrn',
      'description',
      'eventNotificationsSourceName',
      'enabled',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'instance_crn': _params.instanceCrn,
      'description': _params.description,
      'event_notifications_source_name': _params.eventNotificationsSourceName,
      'enabled': _params.enabled,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postEventNotificationsIntegration'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{id}/event_notifications',
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
   * Get event notification source details by project ID.
   *
   * Gets the source details of the project from the connect event notifications instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The unique identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.NotificationsIntegrationGetResponse>>}
   */
  public getEventNotificationsIntegration(
    params: ProjectV1.GetEventNotificationsIntegrationParams
  ): Promise<ProjectV1.Response<ProjectV1.NotificationsIntegrationGetResponse>> {
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

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getEventNotificationsIntegration'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{id}/event_notifications',
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
   * Delete an event notifications connection.
   *
   * Deletes the event notifications integration if that is where the project was onboarded to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The unique identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.EmptyObject>>}
   */
  public deleteEventNotificationsIntegration(
    params: ProjectV1.DeleteEventNotificationsIntegrationParams
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

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteEventNotificationsIntegration'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{id}/event_notifications',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Send notification to event notifications instance.
   *
   * Sends a notification to the event notifications instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The unique identifier.
   * @param {string} [params.ibmendefaultlong] - The IBM default long message for the instance of an event.
   * @param {string} [params.ibmendefaultshort] - The IBM default long message for the instance of an event.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.NotificationsIntegrationTestPostResponse>>}
   */
  public postTestEventNotification(
    params: ProjectV1.PostTestEventNotificationParams
  ): Promise<ProjectV1.Response<ProjectV1.NotificationsIntegrationTestPostResponse>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'ibmendefaultlong', 'ibmendefaultshort', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'ibmendefaultlong': _params.ibmendefaultlong,
      'ibmendefaultshort': _params.ibmendefaultshort,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postTestEventNotification'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{id}/event_notifications/test',
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
    /** The resource group where the project's data and tools are created. */
    resourceGroup: string;
    /** The location where the project's data and tools are created. */
    location: string;
    /** The project name. */
    name: string;
    /** A project's descriptive text. */
    description?: string;
    /** The project configurations. */
    configs?: ProjectConfigPrototype[];
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
    /** Determines whether the metadata should be returned. Only the metadata for the project is returned. */
    complete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProject` operation. */
  export interface GetProjectParams {
    /** The unique identifier. */
    id: string;
    /** When set to true, exclude_configs returns only active configurations. Draft configurations are not returned. */
    excludeConfigs?: boolean;
    /** Determines whether the metadata should be returned. Only the metadata for the project is returned. */
    complete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateProject` operation. */
  export interface UpdateProjectParams {
    /** The unique identifier. */
    id: string;
    /** The new project definition document. */
    jsonPatchOperation: JsonPatchOperation[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteProject` operation. */
  export interface DeleteProjectParams {
    /** The unique identifier. */
    id: string;
    /** The flag that indicates if the resources deployed by schematics should be destroyed. */
    destroy?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createConfig` operation. */
  export interface CreateConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The configuration name. */
    name: string;
    /** A dotted value of catalogID.versionID. */
    locatorId: string;
    /** The ID of the configuration. If this parameter is empty, an ID is automatically created for the
     *  configuration.
     */
    id?: string;
    /** A collection of configuration labels. */
    labels?: string[];
    /** The project configuration description. */
    description?: string;
    /** The input values to use to deploy the configuration. */
    input?: ProjectConfigInputVariable[];
    /** Schematics environment variables to use to deploy the configuration. */
    setting?: ProjectConfigSettingCollection[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listConfigs` operation. */
  export interface ListConfigsParams {
    /** The unique project ID. */
    projectId: string;
    /** The version of configuration to return. */
    version?: ListConfigsConstants.Version | string;
    /** Determines whether the metadata should be returned. Only the metadata for the project is returned. */
    complete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listConfigs` operation. */
  export namespace ListConfigsConstants {
    /** The version of configuration to return. */
    export enum Version {
      ACTIVE = 'active',
      DRAFT = 'draft',
      MIXED = 'mixed',
    }
  }

  /** Parameters for the `getConfig` operation. */
  export interface GetConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique identifier. */
    id: string;
    /** The version of the configuration to return. */
    version?: string;
    /** Determines whether the metadata should be returned. Only the metadata for the project is returned. */
    complete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateConfig` operation. */
  export interface UpdateConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique identifier. */
    id: string;
    /** The change delta of the project configuration to update. */
    projectConfig: JsonPatchOperation[];
    /** Determines whether the metadata should be returned. Only the metadata for the project is returned. */
    complete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteConfig` operation. */
  export interface DeleteConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique identifier. */
    id: string;
    /** The flag to determine if only the draft version should be deleted. */
    draftOnly?: boolean;
    /** The flag that indicates if the resources deployed by schematics should be destroyed. */
    destroy?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getConfigDiff` operation. */
  export interface GetConfigDiffParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `forceApprove` operation. */
  export interface ForceApproveParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique identifier. */
    id: string;
    /** Notes on the project draft action. */
    comment?: string;
    /** Determines whether the metadata should be returned. Only the metadata for the project is returned. */
    complete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `approve` operation. */
  export interface ApproveParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique identifier. */
    id: string;
    /** Notes on the project draft action. */
    comment?: string;
    /** Determines whether the metadata should be returned. Only the metadata for the project is returned. */
    complete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `checkConfig` operation. */
  export interface CheckConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique identifier. */
    id: string;
    /** The IAM refresh token. */
    xAuthRefreshToken?: string;
    /** Determines whether the metadata should be returned. Only the metadata for the project is returned. */
    complete?: boolean;
    /** The version of the configuration that the validation check should trigger against. */
    version?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `installConfig` operation. */
  export interface InstallConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique identifier. */
    id: string;
    /** Determines whether the metadata should be returned. Only the metadata for the project is returned. */
    complete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `uninstallConfig` operation. */
  export interface UninstallConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSchematicsJob` operation. */
  export interface GetSchematicsJobParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique identifier. */
    id: string;
    /** The triggered action. */
    action: GetSchematicsJobConstants.Action | string;
    /** The timestamp of when the action was triggered. */
    since?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getSchematicsJob` operation. */
  export namespace GetSchematicsJobConstants {
    /** The triggered action. */
    export enum Action {
      PLAN = 'plan',
      INSTALL = 'install',
      UNINSTALL = 'uninstall',
    }
  }

  /** Parameters for the `getCostEstimate` operation. */
  export interface GetCostEstimateParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique identifier. */
    id: string;
    /** The version of the configuration that the cost estimate will fetch. */
    version?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postCrnToken` operation. */
  export interface PostCrnTokenParams {
    /** The unique identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postNotification` operation. */
  export interface PostNotificationParams {
    /** The unique identifier. */
    id: string;
    /** Collection of the notification events to post. */
    notifications?: NotificationEvent[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getNotifications` operation. */
  export interface GetNotificationsParams {
    /** The unique identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postEventNotificationsIntegration` operation. */
  export interface PostEventNotificationsIntegrationParams {
    /** The unique identifier. */
    id: string;
    /** A CRN of the instance of the event. */
    instanceCrn: string;
    /** A description of the instance of the event. */
    description?: string;
    /** The name of the project source for the event notifications instance. */
    eventNotificationsSourceName?: string;
    /** A status of the instance of the event. */
    enabled?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getEventNotificationsIntegration` operation. */
  export interface GetEventNotificationsIntegrationParams {
    /** The unique identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteEventNotificationsIntegration` operation. */
  export interface DeleteEventNotificationsIntegrationParams {
    /** The unique identifier. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postTestEventNotification` operation. */
  export interface PostTestEventNotificationParams {
    /** The unique identifier. */
    id: string;
    /** The IBM default long message for the instance of an event. */
    ibmendefaultlong?: string;
    /** The IBM default long message for the instance of an event. */
    ibmendefaultshort?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** The response of a fetching an action job. */
  export interface ActionJob {
    /** The unique ID of a project. */
    id?: string;
  }

  /** The cost estimate for the given configuration. */
  export interface CostEstimate {
    /** CostEstimate accepts additional properties. */
    [propName: string]: any;
  }

  /** CumulativeNeedsAttention. */
  export interface CumulativeNeedsAttention {
    /** The event name. */
    event?: string;
    /** The unique ID of a project. */
    event_id?: string;
    /** The unique ID of a project. */
    config_id?: string;
    /** The version number of the configuration. */
    config_version?: number;
  }

  /** InputVariable. */
  export interface InputVariable {
    /** The variable name. */
    name: string;
    /** The variable type. */
    type: string;
    /** Can be any value - string, number, boolean, array or object. */
    value?: any;
    /** Whether the variable is required or not. */
    required?: boolean;
  }

  /** This model represents an individual patch operation to be performed on a JSON document, as defined by RFC 6902. */
  export interface JsonPatchOperation {
    /** The operation to be performed. */
    op: string;
    /** The JSON Pointer that identifies the field that is the target of the operation. */
    path: string;
    /** The JSON Pointer that identifies the field that is the source of the operation. */
    from?: string;
    /** The value to be used within the operation. */
    value?: any;
  }

  /** NotificationEvent. */
  export interface NotificationEvent {
    /** The type of event. */
    event: string;
    /** The target of the event. */
    target: string;
    /** The source of the event. */
    source?: string;
    /** The user that triggered the flow that posted the event. */
    triggered_by?: string;
    /** An actionable URL that users can access in response to the event. */
    action_url?: string;
    /** Any relevant metadata to be stored. */
    data?: JsonObject;
  }

  /** NotificationEventWithId. */
  export interface NotificationEventWithId {
    /** The type of event. */
    event: string;
    /** The target of the event. */
    target: string;
    /** The source of the event. */
    source?: string;
    /** The user that triggered the flow that posted the event. */
    triggered_by?: string;
    /** An actionable URL that users can access in response to the event. */
    action_url?: string;
    /** Any relevant metadata to be stored. */
    data?: JsonObject;
    /** The unique ID of a project. */
    id: string;
  }

  /** NotificationEventWithStatus. */
  export interface NotificationEventWithStatus {
    /** The type of event. */
    event: string;
    /** The target of the event. */
    target: string;
    /** The source of the event. */
    source?: string;
    /** The user that triggered the flow that posted the event. */
    triggered_by?: string;
    /** An actionable URL that users can access in response to the event. */
    action_url?: string;
    /** Any relevant metadata to be stored. */
    data?: JsonObject;
    /** The unique ID of a project. */
    id: string;
    /** Whether or not the event successfully posted. */
    status?: string;
    /** The reasons for the status of an event. */
    reasons?: JsonObject[];
  }

  /** The response from fetching notifications. */
  export interface NotificationsGetResponse {
    /** Collection of the notification events with an ID. */
    notifications?: NotificationEventWithId[];
  }

  /** The resulting response of getting the source details of the event notifications integration. */
  export interface NotificationsIntegrationGetResponse {
    /** A description of the instance of the event. */
    description?: string;
    /** The name of the instance of the event. */
    name?: string;
    /** The status of the instance of the event. */
    enabled?: boolean;
    /** A unique ID of the instance of the event. */
    id?: string;
    /** The type of the instance of event. */
    type?: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    updated_at?: string;
    /** The topic count of the instance of the event. */
    topic_count?: number;
    /** The topic names of the instance of the event. */
    topic_names?: string[];
  }

  /** The resulting response of connecting a project to an event notifications instance. */
  export interface NotificationsIntegrationPostResponse {
    /** A description of the instance of the event. */
    description?: string;
    /** A name of the instance of the event. */
    name?: string;
    /** A status of the instance of the event. */
    enabled?: boolean;
    /** A unique ID of the instance of the event. */
    id?: string;
    /** The type of instance of the event. */
    type?: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    created_at?: string;
  }

  /** The response for posting a test notification to the event notifications instance. */
  export interface NotificationsIntegrationTestPostResponse {
    /** The data content type of the instance of the event. */
    datacontenttype?: string;
    /** The IBM default long message for the instance of the event. */
    ibmendefaultlong?: string;
    /** The IBM default short message for the instance of the event. */
    ibmendefaultshort?: string;
    /** The IBM source ID for the instance of the event. */
    ibmensourceid?: string;
    /** A unique ID of the instance of the event. */
    id: string;
    /** The source of the instance of the event. */
    source: string;
    /** The spec version of the instance of the event. */
    specversion?: string;
    /** The type of instance of the event. */
    type?: string;
  }

  /** The result of a notification post. */
  export interface NotificationsPrototypePostResponse {
    /** The collection of the notification events with status. */
    notifications?: NotificationEventWithStatus[];
  }

  /** OutputValue. */
  export interface OutputValue {
    /** The variable name. */
    name: string;
    /** A short explanation of the output value. */
    description?: string;
    /** Can be any value - string, number, boolean, array or object. */
    value?: any;
  }

  /** A pagination link. */
  export interface PaginationLink {
    /** The URL of the pull request, which uniquely identifies it. */
    href: string;
    /** A pagination token. */
    start?: string;
  }

  /** The project returned in the response body. */
  export interface Project {
    /** The project name. */
    name: string;
    /** A project descriptive text. */
    description?: string;
    /** The unique ID of a project. */
    id?: string;
    /** An IBM Cloud resource name, which uniquely identifies a resource. */
    crn?: string;
    /** The project configurations. */
    configs?: ProjectConfig[];
    /** The metadata of the project. */
    metadata?: ProjectMetadata;
  }

  /** The project CRN token. */
  export interface ProjectCRNTokenResponse {
    /** The IAM access token. */
    acces_token?: string;
    /** Number of seconds counted since January 1st, 1970, until the IAM access token will expire. */
    expiration?: number;
  }

  /** Projects list. */
  export interface ProjectCollection {
    /** A pagination limit. */
    limit: number;
    /** Get the occurrencies of the total projects. */
    total_count: number;
    /** A pagination link. */
    first: PaginationLink;
    /** A pagination link. */
    last?: PaginationLink;
    /** A pagination link. */
    previous?: PaginationLink;
    /** A pagination link. */
    next?: PaginationLink;
    /** An array of projects. */
    projects?: ProjectCollectionMemberWithMetadata[];
  }

  /** ProjectCollectionMemberWithMetadata. */
  export interface ProjectCollectionMemberWithMetadata {
    /** The unique ID of a project. */
    id?: string;
    /** The project name. */
    name?: string;
    /** The project description. */
    description?: string;
    /** The metadata of the project. */
    metadata?: ProjectMetadata;
  }

  /** The project configuration. */
  export interface ProjectConfig {
    /** The ID of the configuration. If this parameter is empty, an ID is automatically created for the
     *  configuration.
     */
    id?: string;
    /** The configuration name. */
    name: string;
    /** A collection of configuration labels. */
    labels?: string[];
    /** The project configuration description. */
    description?: string;
    /** A dotted value of catalogID.versionID. */
    locator_id: string;
    /** The type of a project configuration manual property. */
    type: string;
    /** The outputs of a Schematics template property. */
    input?: InputVariable[];
    /** The outputs of a Schematics template property. */
    output?: OutputValue[];
    /** Schematics environment variables to use to deploy the configuration. */
    setting?: ProjectConfigSettingCollection[];
  }

  /** The project configuration list. */
  export interface ProjectConfigCollection {
    /** The collection list operation response schema that should define the array property with the name "configs". */
    configs?: ProjectConfig[];
  }

  /** Deletes the configuration response. */
  export interface ProjectConfigDelete {
    /** The unique ID of a project. */
    id?: string;
    /** The name of the configuration being deleted. */
    name?: string;
  }

  /** The project configuration diff summary. */
  export interface ProjectConfigDiff {
    /** The additions to configurations in the diff summary. */
    added?: ProjectConfigDiffAdded;
    /** The changes to configurations in the diff summary. */
    changed?: ProjectConfigDiffChanged;
    /** The deletions to configurations in the diff summary. */
    removed?: ProjectConfigDiffRemoved;
  }

  /** The additions to configurations in the diff summary. */
  export interface ProjectConfigDiffAdded {
    /** The collection of additions to the configurations in the diff summary. */
    input?: ProjectConfigDiffInputVariable[];
  }

  /** The changes to configurations in the diff summary. */
  export interface ProjectConfigDiffChanged {
    /** The collection of changes to configurations in the diff summary. */
    input?: ProjectConfigDiffInputVariable[];
  }

  /** ProjectConfigDiffInputVariable. */
  export interface ProjectConfigDiffInputVariable {
    /** The variable name. */
    name: string;
    /** The variable type. */
    type: string;
    /** Can be any value - string, number, boolean, array or object. */
    value?: any;
  }

  /** The deletions to configurations in the diff summary. */
  export interface ProjectConfigDiffRemoved {
    /** The collection of deletions to configurations in the diff summary. */
    input?: ProjectConfigDiffInputVariable[];
  }

  /** ProjectConfigInputVariable. */
  export interface ProjectConfigInputVariable {
    /** The variable name. */
    name: string;
    /** Can be any value - string, number, boolean, array or object. */
    value?: any;
  }

  /** The input of a project configuration. */
  export interface ProjectConfigPrototype {
    /** The ID of the configuration. If this parameter is empty, an ID is automatically created for the
     *  configuration.
     */
    id?: string;
    /** The configuration name. */
    name: string;
    /** A collection of configuration labels. */
    labels?: string[];
    /** The project configuration description. */
    description?: string;
    /** A dotted value of catalogID.versionID. */
    locator_id: string;
    /** The input values to use to deploy the configuration. */
    input?: ProjectConfigInputVariable[];
    /** Schematics environment variables to use to deploy the configuration. */
    setting?: ProjectConfigSettingCollection[];
  }

  /** ProjectConfigSettingCollection. */
  export interface ProjectConfigSettingCollection {
    /** The name of the configuration setting. */
    name: string;
    /** The value of the configuration setting. */
    value: string;
  }

  /** The metadata of the project. */
  export interface ProjectMetadata {
    /** An IBM Cloud resource name, which uniquely identifies a resource. */
    crn?: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    created_at?: string;
    /** The cumulative list of needs attention items for a project. */
    cumulative_needs_attention_view?: CumulativeNeedsAttention[];
    /** "True" indicates that the fetch of the needs attention items failed. */
    cumulative_needs_attention_view_err?: string;
    /** The IBM Cloud location where a resource is deployed. */
    location?: string;
    /** The resource group where the project's data and tools are created. */
    resource_group?: string;
    /** The project status value. */
    state?: string;
    /** The CRN of the event notifications instance if one is connected to this project. */
    event_notifications_crn?: string;
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
     * @returns {Promise<ProjectV1.ProjectCollectionMemberWithMetadata[]>}
     */
    public async getNext(): Promise<ProjectV1.ProjectCollectionMemberWithMetadata[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listProjects(this.params);
      const { result } = response;

      let next = null;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.projects;
    }

    /**
     * Returns all results by invoking listProjects() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<ProjectV1.ProjectCollectionMemberWithMetadata[]>}
     */
    public async getAll(): Promise<ProjectV1.ProjectCollectionMemberWithMetadata[]> {
      const results: ProjectCollectionMemberWithMetadata[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = ProjectV1;
