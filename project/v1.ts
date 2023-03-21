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
 * IBM OpenAPI SDK Code Generator Version: 3.67.0-df2073a1-20230222-221157
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
 * capability to manage infrastructure as code in IBM Cloud.
 *
 * API Version: 1.0.0
 */

class ProjectV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://projects.api.test.cloud.ibm.com';

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
   * Create a new project and asynchronously setup the tools to manage it. An initial pull request is created on the
   * project Git repo. After approving the pull request, the user can deploy the resources that the project configures.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The project name.
   * @param {string} [params.description] - A project's descriptive text.
   * @param {ProjectConfigInput[]} [params.configs] - The project configurations.
   * @param {string} [params.resourceGroup] - Group name of the customized collection of resources.
   * @param {string} [params.location] - Data center locations for resource deployment.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.GetProjectResponse>>}
   */
  public createProject(
    params: ProjectV1.CreateProjectParams
  ): Promise<ProjectV1.Response<ProjectV1.GetProjectResponse>> {
    const _params = { ...params };
    const _requiredParams = ['name'];
    const _validParams = ['name', 'description', 'configs', 'resourceGroup', 'location', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createProject'
    );

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
   * @param {string} [params.start] - Page token query parameter that is used to determine what resource to start the
   * page after. If not specified, the logical first page is returned.
   * @param {number} [params.limit] - Determine the maximum number of resources to return. The number of resources
   * returned is the same, with exception of the last page.
   * @param {boolean} [params.complete] - The flag to determine if full metadata should be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectListResponseSchema>>}
   */
  public listProjects(
    params?: ProjectV1.ListProjectsParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectListResponseSchema>> {
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

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listProjects'
    );

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
   * Get project by ID.
   *
   * Get a project definition document by the ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {boolean} [params.excludeConfigs] - Only return with the active configuration, no drafts.
   * @param {boolean} [params.complete] - The flag to determine if full metadata should be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.GetProjectResponse>>}
   */
  public getProject(
    params: ProjectV1.GetProjectParams
  ): Promise<ProjectV1.Response<ProjectV1.GetProjectResponse>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'excludeConfigs', 'complete', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'exclude_configs': _params.excludeConfigs,
      'complete': _params.complete,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getProject'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}',
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
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {JsonPatchOperation[]} params.jsonPatchOperation - The new project definition document.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectUpdate>>}
   */
  public updateProject(
    params: ProjectV1.UpdateProjectParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectUpdate>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'jsonPatchOperation'];
    const _validParams = ['projectId', 'jsonPatchOperation', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.jsonPatchOperation;
    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateProject'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}',
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
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {boolean} [params.destroy] - The flag that indicates if the resources deployed by schematics should be
   * destroyed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.EmptyObject>>}
   */
  public deleteProject(
    params: ProjectV1.DeleteProjectParams
  ): Promise<ProjectV1.Response<ProjectV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'destroy', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'destroy': _params.destroy,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteProject'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}',
        method: 'DELETE',
        qs: query,
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
   * configurations
   ************************/

  /**
   * Add a new configuration.
   *
   * Add a new configuration to a project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {string} params.name - The configuration name.
   * @param {string} params.locatorId - The location ID of a project configuration manual property.
   * @param {string} [params.id] - The unique ID of a project.
   * @param {string[]} [params.labels] - A collection of configuration labels.
   * @param {string} [params.description] - A project configuration description.
   * @param {InputVariableInput[]} [params.input] - The inputs of a Schematics template property.
   * @param {ConfigSettingItems[]} [params.setting] - An optional setting object That is passed to the cart API.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public createConfig(
    params: ProjectV1.CreateConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name', 'locatorId'];
    const _validParams = ['projectId', 'name', 'locatorId', 'id', 'labels', 'description', 'input', 'setting', 'headers'];
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

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createConfig'
    );

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
   * Lists all of the project configurations for a specific project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {string} [params.version] - The version of configuration to return.
   * @param {boolean} [params.complete] - The flag to determine if full metadata should be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigList>>}
   */
  public listConfigs(
    params: ProjectV1.ListConfigsParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigList>> {
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

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listConfigs'
    );

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
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {string} params.configId - The ID of the configuration, which uniquely identifies it.
   * @param {string} [params.version] - The version of the configuration to return.
   * @param {boolean} [params.complete] - The flag to determine if full metadata should be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public getConfig(
    params: ProjectV1.GetConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'configId'];
    const _validParams = ['projectId', 'configId', 'version', 'complete', 'headers'];
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
      'config_id': _params.configId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getConfig'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{config_id}',
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
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {string} params.configId - The ID of the configuration, which uniquely identifies it.
   * @param {JsonPatchOperation[]} params.projectConfig - The change delta of the project configuration to update.
   * @param {boolean} [params.complete] - The flag to determine if full metadata should be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public updateConfig(
    params: ProjectV1.UpdateConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'configId', 'projectConfig'];
    const _validParams = ['projectId', 'configId', 'projectConfig', 'complete', 'headers'];
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
      'config_id': _params.configId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateConfig'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{config_id}',
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
   * configuration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {string} params.configId - The ID of the configuration, which uniquely identifies it.
   * @param {boolean} [params.draftOnly] - The flag to determine if only the draft version should be deleted.
   * @param {boolean} [params.destroy] - The flag that indicates if the resources deployed by schematics should be
   * destroyed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.DeleteProjectConfigResponse>>}
   */
  public deleteConfig(
    params: ProjectV1.DeleteConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.DeleteProjectConfigResponse>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'configId'];
    const _validParams = ['projectId', 'configId', 'draftOnly', 'destroy', 'headers'];
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
      'config_id': _params.configId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteConfig'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{config_id}',
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
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {string} params.configId - The ID of the configuration, which uniquely identifies it.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigDiff>>}
   */
  public getConfigDiff(
    params: ProjectV1.GetConfigDiffParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigDiff>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'configId'];
    const _validParams = ['projectId', 'configId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'config_id': _params.configId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getConfigDiff'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{config_id}/diff',
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
   * Force merge a project configuration draft.
   *
   * Force the merge of the changes from the current active draft to the active configuration with an approving comment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {string} params.configId - The ID of the configuration, which uniquely identifies it.
   * @param {string} [params.comment] - Notes on the project draft action.
   * @param {boolean} [params.complete] - The flag to determine if full metadata should be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public forceMerge(
    params: ProjectV1.ForceMergeParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'configId'];
    const _validParams = ['projectId', 'configId', 'comment', 'complete', 'headers'];
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
      'config_id': _params.configId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'forceMerge'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{config_id}/draft/force_merge',
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
   * Merge or discard a configuration draft.
   *
   * If a merge action is requested, the changes from the current active draft are merged to the active configuration.
   * If a discard action is requested, the current draft is set to the discarded state.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {string} params.configId - The ID of the configuration, which uniquely identifies it.
   * @param {string} params.action - The action to the draft.
   * @param {string} [params.comment] - Notes on the project draft action.
   * @param {boolean} [params.complete] - The flag to determine if full metadata should be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public createDraftAction(
    params: ProjectV1.CreateDraftActionParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'configId', 'action'];
    const _validParams = ['projectId', 'configId', 'action', 'comment', 'complete', 'headers'];
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
      'config_id': _params.configId,
      'action': _params.action,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createDraftAction'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{config_id}/draft/{action}',
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
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {string} params.configId - The ID of the configuration, which uniquely identifies it.
   * @param {string} [params.xAuthRefreshToken] - The IAM refresh token.
   * @param {string} [params.version] - The version of the configuration that the validation check should trigger
   * against.
   * @param {boolean} [params.complete] - The flag to determine if full metadata should be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public checkConfig(
    params: ProjectV1.CheckConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'configId'];
    const _validParams = ['projectId', 'configId', 'xAuthRefreshToken', 'version', 'complete', 'headers'];
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
      'config_id': _params.configId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'checkConfig'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{config_id}/check',
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
   * Deploy a project's configuration. It is an asynchronous operation that can be tracked using the project status API.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {string} params.configId - The ID of the configuration, which uniquely identifies it.
   * @param {boolean} [params.complete] - The flag to determine if full metadata should be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfig>>}
   */
  public installConfig(
    params: ProjectV1.InstallConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfig>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'configId'];
    const _validParams = ['projectId', 'configId', 'complete', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'complete': _params.complete,
    };

    const path = {
      'project_id': _params.projectId,
      'config_id': _params.configId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'installConfig'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{config_id}/install',
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
   * specific configuration. You can track it by using the project status API.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {string} params.configId - The ID of the configuration, which uniquely identifies it.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.EmptyObject>>}
   */
  public uninstallConfig(
    params: ProjectV1.UninstallConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'configId'];
    const _validParams = ['projectId', 'configId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'config_id': _params.configId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'uninstallConfig'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{config_id}/uninstall',
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
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {string} params.configId - The ID of the configuration, which uniquely identifies it.
   * @param {string} params.action - The triggered action.
   * @param {number} [params.since] - The timestamp of when the action was triggered.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.GetActionJobResponse>>}
   */
  public getSchematicsJob(
    params: ProjectV1.GetSchematicsJobParams
  ): Promise<ProjectV1.Response<ProjectV1.GetActionJobResponse>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'configId', 'action'];
    const _validParams = ['projectId', 'configId', 'action', 'since', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'since': _params.since,
    };

    const path = {
      'project_id': _params.projectId,
      'config_id': _params.configId,
      'action': _params.action,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSchematicsJob'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{config_id}/job/{action}',
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
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {string} params.configId - The ID of the configuration, which uniquely identifies it.
   * @param {string} [params.version] - The version of the configuration that the cost estimate will fetch.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.GetCostEstimateResponse>>}
   */
  public getCostEstimate(
    params: ProjectV1.GetCostEstimateParams
  ): Promise<ProjectV1.Response<ProjectV1.GetCostEstimateResponse>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'configId'];
    const _validParams = ['projectId', 'configId', 'version', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': _params.version,
    };

    const path = {
      'project_id': _params.projectId,
      'config_id': _params.configId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getCostEstimate'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{config_id}/cost_estimate',
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
  /*************************
   * event
   ************************/

  /**
   * Add notifications.
   *
   * Creates a notification event to be stored on the project definition.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {NotificationEvent[]} [params.notifications] - Collection of the notification events to post.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.PostNotificationsResponse>>}
   */
  public postNotification(
    params: ProjectV1.PostNotificationParams
  ): Promise<ProjectV1.Response<ProjectV1.PostNotificationsResponse>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'notifications', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'notifications': _params.notifications,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postNotification'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/event',
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
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.GetNotificationsResponse>>}
   */
  public getNotifications(
    params: ProjectV1.GetNotificationsParams
  ): Promise<ProjectV1.Response<ProjectV1.GetNotificationsResponse>> {
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

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getNotifications'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/event',
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
   * Delete a notification.
   *
   * Delete a notification from a project.
   * - in: query
   *   name: notification_id
   *   description: The ID of the project, which uniquely identifies it.
   *   required: true
   *   schema:
   *     $ref: "#/components/schemas/Identifier".
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.EmptyObject>>}
   */
  public deleteNotification(
    params: ProjectV1.DeleteNotificationParams
  ): Promise<ProjectV1.Response<ProjectV1.EmptyObject>> {
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

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteNotification'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/event',
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
   * webhook
   ************************/

  /**
   * Webhook for catalog events.
   *
   * This is a webhook for pulsar catalog events.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {PulsarEventItems[]} params.pulsarCatalogEvents - A pulsar event.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.EmptyObject>>}
   */
  public receivePulsarCatalogEvents(
    params: ProjectV1.ReceivePulsarCatalogEventsParams
  ): Promise<ProjectV1.Response<ProjectV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['pulsarCatalogEvents'];
    const _validParams = ['pulsarCatalogEvents', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.pulsarCatalogEvents;
    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'receivePulsarCatalogEvents'
    );

    const parameters = {
      options: {
        url: '/v1/pulsar/catalog_events',
        method: 'POST',
        body,
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
  /*************************
   * healthcheck
   ************************/

  /**
   * Get service health information.
   *
   * Get service health information.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.info] - Set this parameter if you want to get the version information in the output
   * response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.Health>>}
   */
  public getHealth(
    params?: ProjectV1.GetHealthParams
  ): Promise<ProjectV1.Response<ProjectV1.Health>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['info', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'info': _params.info,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getHealth'
    );

    const parameters = {
      options: {
        url: '/v1/health',
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
  /*************************
   * serviceBrokerAPIs
   ************************/

  /**
   * Create a new service instance.
   *
   * Create a new service instance Create a service instance. When the service broker receives a provision request from
   * the IBM Cloud platform, it MUST take whatever action is necessary to create a new resource. When a user creates a
   * service instance from the IBM Cloud console or the IBM Cloud CLI, the IBM Cloud platform validates that the user
   * has permission to create the service instance by using IBM Cloud IAM. After this validation occurs, your service
   * broker's provision endpoint (PUT /v2/resource_instances/:instance_id) will be invoked. When provisioning occurs,
   * the IBM Cloud platform provides the following values:
   * - The IBM Cloud context is included in the context variable - The X-Broker-API-Originating-Identity will have the
   * IBM IAM ID of the user that initiated the request - The parameters section will include the requested location (and
   * additional parameters required by your service).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique instance ID generated during provisioning by the IBM Cloud platform.
   * @param {string} params.serviceId - The ID of the service stored in the catalog.j-son of your broker. This value
   * should be a GUID and it MUST be a non-empty string.
   * @param {string} params.planId - The ID of the plan for which the service instance has been requested, which is
   * stored in the catalog.j-son of your broker.
   * @param {string[]} [params.context] - Platform specific contextual information under which the service instance is
   * to be provisioned.
   * @param {JsonObject} [params.parameters] - Configuration options for the service instance. An opaque object,
   * controller treats this as a blob. Brokers should ensure that the client has provided valid configuration parameters
   * and values for the operation. If this field is not present in the request message, then the broker MUST NOT change
   * the parameters of the instance as a result of this request.
   * @param {string[]} [params.previousValues] - Information about the service instance prior to the update.
   * @param {string} [params.xBrokerApiVersion] - Broker Api Version.
   * @param {string} [params.xBrokerApiOriginatingIdentity] - Broker Api Originating Identity.
   * @param {boolean} [params.acceptsIncomplete] - A value of true indicates that both the IBM Cloud platform and the
   * requesting client support asynchronous deprovisioning. If this parameter is not included in the request, and the
   * broker can only deprovision a service instance of the requested plan asynchronously, the broker MUST reject the
   * request with a 422 Unprocessable Entity.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.CreateResult>>}
   */
  public replaceServiceInstance(
    params: ProjectV1.ReplaceServiceInstanceParams
  ): Promise<ProjectV1.Response<ProjectV1.CreateResult>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'serviceId', 'planId'];
    const _validParams = ['instanceId', 'serviceId', 'planId', 'context', 'parameters', 'previousValues', 'xBrokerApiVersion', 'xBrokerApiOriginatingIdentity', 'acceptsIncomplete', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'service_id': _params.serviceId,
      'plan_id': _params.planId,
      'context': _params.context,
      'parameters': _params.parameters,
      'previous_values': _params.previousValues,
    };

    const query = {
      'accepts_incomplete': _params.acceptsIncomplete,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'replaceServiceInstance'
    );

    const parameters = {
      options: {
        url: '/v2/service_instances/{instance_id}',
        method: 'PUT',
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
            'X-Broker-Api-Version': _params.xBrokerApiVersion,
            'X-Broker-Api-Originating-Identity': _params.xBrokerApiOriginatingIdentity,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a project service instance.
   *
   * Delete (deprovision) a project service instance by GUID. When a service broker receives a delete request from the
   * IBM Cloud platform, it MUST delete any resources it created during the provision. Usually this means that all
   * resources are immediately reclaimed for future provisions.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique instance ID generated during provisioning by the IBM Cloud platform.
   * @param {string} params.planId - The ID of the plan for which the service instance has been requested, which is
   * stored in the catalog.json of your broker. This value should be a GUID. It MUST be a non-empty string.
   * @param {string} params.serviceId - The ID of the service stored in the catalog.json of your broker. This value
   * should be a GUID. It MUST be a non-empty string.
   * @param {string} [params.xBrokerApiVersion] - Broker Api Version.
   * @param {string} [params.xBrokerApiOriginatingIdentity] - Broker Api Originating Identity.
   * @param {boolean} [params.acceptsIncomplete] - A value of true indicates that both the IBM Cloud platform and the
   * requesting client support asynchronous deprovisioning. If this parameter is not included in the request, and the
   * broker can only deprovision a service instance of the requested plan asynchronously, the broker MUST reject the
   * request with a 422 Unprocessable Entity.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.DeleteResult>>}
   */
  public deleteServiceInstance(
    params: ProjectV1.DeleteServiceInstanceParams
  ): Promise<ProjectV1.Response<ProjectV1.DeleteResult>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'planId', 'serviceId'];
    const _validParams = ['instanceId', 'planId', 'serviceId', 'xBrokerApiVersion', 'xBrokerApiOriginatingIdentity', 'acceptsIncomplete', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'plan_id': _params.planId,
      'service_id': _params.serviceId,
      'accepts_incomplete': _params.acceptsIncomplete,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteServiceInstance'
    );

    const parameters = {
      options: {
        url: '/v2/service_instances/{instance_id}',
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
            'X-Broker-Api-Version': _params.xBrokerApiVersion,
            'X-Broker-Api-Originating-Identity': _params.xBrokerApiOriginatingIdentity,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Change of plans and service parameters in a provisioned service instance.
   *
   * Allows an update to the plans and service parameters in a provisioned service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique instance ID generated during provisioning by the IBM Cloud platform.
   * @param {JsonPatchOperation[]} params.jsonPatchOperation - It contains the query filters and the search token that
   * is initally set to null or undefined.
   * @param {string} [params.xBrokerApiVersion] - Broker API Version.
   * @param {string} [params.xBrokerApiOriginatingIdentity] - Broker Api Originating Identity.
   * @param {boolean} [params.acceptsIncomplete] - A value of true indicates that both the IBM Cloud platform and the
   * requesting client support asynchronous deprovisioning. If this parameter is not included in the request, and the
   * broker can only deprovision a service instance of the requested plan asynchronously, the broker MUST reject the
   * request with a 422 Unprocessable Entity.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.UpdateResult>>}
   */
  public updateServiceInstance(
    params: ProjectV1.UpdateServiceInstanceParams
  ): Promise<ProjectV1.Response<ProjectV1.UpdateResult>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'jsonPatchOperation'];
    const _validParams = ['instanceId', 'jsonPatchOperation', 'xBrokerApiVersion', 'xBrokerApiOriginatingIdentity', 'acceptsIncomplete', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.jsonPatchOperation;
    const query = {
      'accepts_incomplete': _params.acceptsIncomplete,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateServiceInstance'
    );

    const parameters = {
      options: {
        url: '/v2/service_instances/{instance_id}',
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
            'X-Broker-Api-Version': _params.xBrokerApiVersion,
            'X-Broker-Api-Originating-Identity': _params.xBrokerApiOriginatingIdentity,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get last_operation for instance by GUID.
   *
   * Retrieve previous operation for service instance by GUID (for asynchronous provision calls).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique instance ID generated during provisioning by the IBM Cloud platform.
   * @param {string} [params.xBrokerApiVersion] - Broker Api Version.
   * @param {string} [params.operation] - A broker-provided identifier for the operation.
   * @param {string} [params.planId] - ID of the plan from the catalog.json in your broker.
   * @param {string} [params.serviceId] - ID of the service from the catalog.json in your service broker.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.GetLastOperationResult>>}
   */
  public getLastOperation(
    params: ProjectV1.GetLastOperationParams
  ): Promise<ProjectV1.Response<ProjectV1.GetLastOperationResult>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'xBrokerApiVersion', 'operation', 'planId', 'serviceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'operation': _params.operation,
      'plan_id': _params.planId,
      'service_id': _params.serviceId,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getLastOperation'
    );

    const parameters = {
      options: {
        url: '/v2/service_instances/{instance_id}/last_operation',
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
            'X-Broker-Api-Version': _params.xBrokerApiVersion,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update the state of a provisioned service instance.
   *
   * Update (disable or enable) the state of a provisioned service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique instance ID generated during provisioning by the IBM Cloud platform.
   * @param {boolean} params.enabled - The ID of the service stored in the catalog.j-son of your broker. This value
   * should be a GUID. It MUST be a non-empty string.
   * @param {string} [params.initiatorId] - Optional string that shows the user ID that is initiating the call.
   * @param {JsonObject} [params.reasonCode] - Optional string that states the reason code for the service instance
   * state change. Valid values are IBMCLOUD_ACCT_ACTIVATE, IBMCLOUD_RECLAMATION_RESTORE, or
   * IBMCLOUD_SERVICE_INSTANCE_BELOW_CAP for enable calls; IBMCLOUD_ACCT_SUSPEND, IBMCLOUD_RECLAMATION_SCHEDULE, or
   * IBMCLOUD_SERVICE_INSTANCE_ABOVE_CAP for disable calls; and IBMCLOUD_ADMIN_REQUEST for enable and disable calls.
   * @param {string} [params.planId] - The ID of the plan for which the service instance has been requested, which is
   * stored in the catalog.j-son of your broker.
   * @param {string[]} [params.previousValues] - Information about the service instance prior to the update.
   * @param {string} [params.xBrokerApiVersion] - Broker Api Version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.BrokerResult>>}
   */
  public replaceServiceInstanceState(
    params: ProjectV1.ReplaceServiceInstanceStateParams
  ): Promise<ProjectV1.Response<ProjectV1.BrokerResult>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId', 'enabled'];
    const _validParams = ['instanceId', 'enabled', 'initiatorId', 'reasonCode', 'planId', 'previousValues', 'xBrokerApiVersion', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'enabled': _params.enabled,
      'initiator_id': _params.initiatorId,
      'reason_code': _params.reasonCode,
      'plan_id': _params.planId,
      'previous_values': _params.previousValues,
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'replaceServiceInstanceState'
    );

    const parameters = {
      options: {
        url: '/bluemix_v1/service_instances/{instance_id}',
        method: 'PUT',
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
            'X-Broker-Api-Version': _params.xBrokerApiVersion,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get the current state information.
   *
   * Retrieve the current state for the specified service instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - The unique instance ID generated during provisioning by the IBM Cloud platform.
   * @param {string} [params.xBrokerApiVersion] - Broker API Version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.BrokerResult>>}
   */
  public getServiceInstance(
    params: ProjectV1.GetServiceInstanceParams
  ): Promise<ProjectV1.Response<ProjectV1.BrokerResult>> {
    const _params = { ...params };
    const _requiredParams = ['instanceId'];
    const _validParams = ['instanceId', 'xBrokerApiVersion', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getServiceInstance'
    );

    const parameters = {
      options: {
        url: '/bluemix_v1/service_instances/{instance_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Broker-Api-Version': _params.xBrokerApiVersion,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get the catalog metadata.
   *
   * Fetch the catalog metadata that's stored within the broker.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xBrokerApiVersion] - Broker API Version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.CatalogResponse>>}
   */
  public getCatalog(
    params?: ProjectV1.GetCatalogParams
  ): Promise<ProjectV1.Response<ProjectV1.CatalogResponse>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['xBrokerApiVersion', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getCatalog'
    );

    const parameters = {
      options: {
        url: '/v2/catalog',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Broker-Api-Version': _params.xBrokerApiVersion,
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
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {string} params.instanceCrn - A CRN of the instance of the event.
   * @param {string} [params.description] - A description of the instance of the event.
   * @param {string} [params.eventNotificationsSourceName] - The name of the source this project is on the event
   * notifications instance.
   * @param {boolean} [params.enabled] - A status of the instance of the event.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.PostEventNotificationsIntegrationResponse>>}
   */
  public postEventNotificationsIntegration(
    params: ProjectV1.PostEventNotificationsIntegrationParams
  ): Promise<ProjectV1.Response<ProjectV1.PostEventNotificationsIntegrationResponse>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'instanceCrn'];
    const _validParams = ['projectId', 'instanceCrn', 'description', 'eventNotificationsSourceName', 'enabled', 'headers'];
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
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postEventNotificationsIntegration'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/integrations/event_notifications',
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
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.GetEventNotificationsIntegrationResponse>>}
   */
  public getEventNotificationsIntegration(
    params: ProjectV1.GetEventNotificationsIntegrationParams
  ): Promise<ProjectV1.Response<ProjectV1.GetEventNotificationsIntegrationResponse>> {
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

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getEventNotificationsIntegration'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/integrations/event_notifications',
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
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.EmptyObject>>}
   */
  public deleteEventNotificationsIntegration(
    params: ProjectV1.DeleteEventNotificationsIntegrationParams
  ): Promise<ProjectV1.Response<ProjectV1.EmptyObject>> {
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

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteEventNotificationsIntegration'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/integrations/event_notifications',
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

  /**
   * Send notification to event notifications instance.
   *
   * Sends a notification to the event notifications instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The ID of the project, which uniquely identifies it.
   * @param {string} [params.ibmendefaultlong] - IBM default long message of the instance of the event.
   * @param {string} [params.ibmendefaultshort] - IBM default short message of the instance of the event.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.PostTestEventNotificationResponse>>}
   */
  public postTestEventNotification(
    params: ProjectV1.PostTestEventNotificationParams
  ): Promise<ProjectV1.Response<ProjectV1.PostTestEventNotificationResponse>> {
    const _params = { ...params };
    const _requiredParams = ['projectId'];
    const _validParams = ['projectId', 'ibmendefaultlong', 'ibmendefaultshort', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'ibmendefaultlong': _params.ibmendefaultlong,
      'ibmendefaultshort': _params.ibmendefaultshort,
    };

    const path = {
      'project_id': _params.projectId,
    };

    const sdkHeaders = getSdkHeaders(
      ProjectV1.DEFAULT_SERVICE_NAME,
      'v1',
      'postTestEventNotification'
    );

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/integrations/event_notifications/test',
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
    /** The project name. */
    name: string;
    /** A project's descriptive text. */
    description?: string;
    /** The project configurations. */
    configs?: ProjectConfigInput[];
    /** Group name of the customized collection of resources. */
    resourceGroup?: string;
    /** Data center locations for resource deployment. */
    location?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listProjects` operation. */
  export interface ListProjectsParams {
    /** Page token query parameter that is used to determine what resource to start the page after. If not
     *  specified, the logical first page is returned.
     */
    start?: string;
    /** Determine the maximum number of resources to return. The number of resources returned is the same, with
     *  exception of the last page.
     */
    limit?: number;
    /** The flag to determine if full metadata should be returned. */
    complete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProject` operation. */
  export interface GetProjectParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** Only return with the active configuration, no drafts. */
    excludeConfigs?: boolean;
    /** The flag to determine if full metadata should be returned. */
    complete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateProject` operation. */
  export interface UpdateProjectParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** The new project definition document. */
    jsonPatchOperation: JsonPatchOperation[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteProject` operation. */
  export interface DeleteProjectParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** The flag that indicates if the resources deployed by schematics should be destroyed. */
    destroy?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createConfig` operation. */
  export interface CreateConfigParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** The configuration name. */
    name: string;
    /** The location ID of a project configuration manual property. */
    locatorId: string;
    /** The unique ID of a project. */
    id?: string;
    /** A collection of configuration labels. */
    labels?: string[];
    /** A project configuration description. */
    description?: string;
    /** The inputs of a Schematics template property. */
    input?: InputVariableInput[];
    /** An optional setting object That is passed to the cart API. */
    setting?: ConfigSettingItems[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listConfigs` operation. */
  export interface ListConfigsParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** The version of configuration to return. */
    version?: ListConfigsConstants.Version | string;
    /** The flag to determine if full metadata should be returned. */
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
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** The ID of the configuration, which uniquely identifies it. */
    configId: string;
    /** The version of the configuration to return. */
    version?: string;
    /** The flag to determine if full metadata should be returned. */
    complete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateConfig` operation. */
  export interface UpdateConfigParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** The ID of the configuration, which uniquely identifies it. */
    configId: string;
    /** The change delta of the project configuration to update. */
    projectConfig: JsonPatchOperation[];
    /** The flag to determine if full metadata should be returned. */
    complete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteConfig` operation. */
  export interface DeleteConfigParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** The ID of the configuration, which uniquely identifies it. */
    configId: string;
    /** The flag to determine if only the draft version should be deleted. */
    draftOnly?: boolean;
    /** The flag that indicates if the resources deployed by schematics should be destroyed. */
    destroy?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getConfigDiff` operation. */
  export interface GetConfigDiffParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** The ID of the configuration, which uniquely identifies it. */
    configId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `forceMerge` operation. */
  export interface ForceMergeParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** The ID of the configuration, which uniquely identifies it. */
    configId: string;
    /** Notes on the project draft action. */
    comment?: string;
    /** The flag to determine if full metadata should be returned. */
    complete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createDraftAction` operation. */
  export interface CreateDraftActionParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** The ID of the configuration, which uniquely identifies it. */
    configId: string;
    /** The action to the draft. */
    action: CreateDraftActionConstants.Action | string;
    /** Notes on the project draft action. */
    comment?: string;
    /** The flag to determine if full metadata should be returned. */
    complete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createDraftAction` operation. */
  export namespace CreateDraftActionConstants {
    /** The action to the draft. */
    export enum Action {
      MERGE = 'merge',
      DISCARD = 'discard',
    }
  }

  /** Parameters for the `checkConfig` operation. */
  export interface CheckConfigParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** The ID of the configuration, which uniquely identifies it. */
    configId: string;
    /** The IAM refresh token. */
    xAuthRefreshToken?: string;
    /** The version of the configuration that the validation check should trigger against. */
    version?: string;
    /** The flag to determine if full metadata should be returned. */
    complete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `installConfig` operation. */
  export interface InstallConfigParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** The ID of the configuration, which uniquely identifies it. */
    configId: string;
    /** The flag to determine if full metadata should be returned. */
    complete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `uninstallConfig` operation. */
  export interface UninstallConfigParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** The ID of the configuration, which uniquely identifies it. */
    configId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSchematicsJob` operation. */
  export interface GetSchematicsJobParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** The ID of the configuration, which uniquely identifies it. */
    configId: string;
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
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** The ID of the configuration, which uniquely identifies it. */
    configId: string;
    /** The version of the configuration that the cost estimate will fetch. */
    version?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postNotification` operation. */
  export interface PostNotificationParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** Collection of the notification events to post. */
    notifications?: NotificationEvent[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getNotifications` operation. */
  export interface GetNotificationsParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteNotification` operation. */
  export interface DeleteNotificationParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `receivePulsarCatalogEvents` operation. */
  export interface ReceivePulsarCatalogEventsParams {
    /** A pulsar event. */
    pulsarCatalogEvents: PulsarEventItems[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getHealth` operation. */
  export interface GetHealthParams {
    /** Set this parameter if you want to get the version information in the output response. */
    info?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceServiceInstance` operation. */
  export interface ReplaceServiceInstanceParams {
    /** The unique instance ID generated during provisioning by the IBM Cloud platform. */
    instanceId: string;
    /** The ID of the service stored in the catalog.j-son of your broker. This value should be a GUID and it MUST be
     *  a non-empty string.
     */
    serviceId: string;
    /** The ID of the plan for which the service instance has been requested, which is stored in the catalog.j-son
     *  of your broker.
     */
    planId: string;
    /** Platform specific contextual information under which the service instance is to be provisioned. */
    context?: string[];
    /** Configuration options for the service instance. An opaque object, controller treats this as a blob. Brokers
     *  should ensure that the client has provided valid configuration parameters and values for the operation. If this
     *  field is not present in the request message, then the broker MUST NOT change the parameters of the instance as a
     *  result of this request.
     */
    parameters?: JsonObject;
    /** Information about the service instance prior to the update. */
    previousValues?: string[];
    /** Broker Api Version. */
    xBrokerApiVersion?: string;
    /** Broker Api Originating Identity. */
    xBrokerApiOriginatingIdentity?: string;
    /** A value of true indicates that both the IBM Cloud platform and the requesting client support asynchronous
     *  deprovisioning. If this parameter is not included in the request, and the broker can only deprovision a service
     *  instance of the requested plan asynchronously, the broker MUST reject the request with a 422 Unprocessable
     *  Entity.
     */
    acceptsIncomplete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteServiceInstance` operation. */
  export interface DeleteServiceInstanceParams {
    /** The unique instance ID generated during provisioning by the IBM Cloud platform. */
    instanceId: string;
    /** The ID of the plan for which the service instance has been requested, which is stored in the catalog.json of
     *  your broker. This value should be a GUID. It MUST be a non-empty string.
     */
    planId: string;
    /** The ID of the service stored in the catalog.json of your broker. This value should be a GUID. It MUST be a
     *  non-empty string.
     */
    serviceId: string;
    /** Broker Api Version. */
    xBrokerApiVersion?: string;
    /** Broker Api Originating Identity. */
    xBrokerApiOriginatingIdentity?: string;
    /** A value of true indicates that both the IBM Cloud platform and the requesting client support asynchronous
     *  deprovisioning. If this parameter is not included in the request, and the broker can only deprovision a service
     *  instance of the requested plan asynchronously, the broker MUST reject the request with a 422 Unprocessable
     *  Entity.
     */
    acceptsIncomplete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateServiceInstance` operation. */
  export interface UpdateServiceInstanceParams {
    /** The unique instance ID generated during provisioning by the IBM Cloud platform. */
    instanceId: string;
    /** It contains the query filters and the search token that is initally set to null or undefined. */
    jsonPatchOperation: JsonPatchOperation[];
    /** Broker API Version. */
    xBrokerApiVersion?: string;
    /** Broker Api Originating Identity. */
    xBrokerApiOriginatingIdentity?: string;
    /** A value of true indicates that both the IBM Cloud platform and the requesting client support asynchronous
     *  deprovisioning. If this parameter is not included in the request, and the broker can only deprovision a service
     *  instance of the requested plan asynchronously, the broker MUST reject the request with a 422 Unprocessable
     *  Entity.
     */
    acceptsIncomplete?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLastOperation` operation. */
  export interface GetLastOperationParams {
    /** The unique instance ID generated during provisioning by the IBM Cloud platform. */
    instanceId: string;
    /** Broker Api Version. */
    xBrokerApiVersion?: string;
    /** A broker-provided identifier for the operation. */
    operation?: string;
    /** ID of the plan from the catalog.json in your broker. */
    planId?: string;
    /** ID of the service from the catalog.json in your service broker. */
    serviceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceServiceInstanceState` operation. */
  export interface ReplaceServiceInstanceStateParams {
    /** The unique instance ID generated during provisioning by the IBM Cloud platform. */
    instanceId: string;
    /** The ID of the service stored in the catalog.j-son of your broker. This value should be a GUID. It MUST be a
     *  non-empty string.
     */
    enabled: boolean;
    /** Optional string that shows the user ID that is initiating the call. */
    initiatorId?: string;
    /** Optional string that states the reason code for the service instance state change. Valid values are
     *  IBMCLOUD_ACCT_ACTIVATE, IBMCLOUD_RECLAMATION_RESTORE, or IBMCLOUD_SERVICE_INSTANCE_BELOW_CAP for enable calls;
     *  IBMCLOUD_ACCT_SUSPEND, IBMCLOUD_RECLAMATION_SCHEDULE, or IBMCLOUD_SERVICE_INSTANCE_ABOVE_CAP for disable calls;
     *  and IBMCLOUD_ADMIN_REQUEST for enable and disable calls.
     */
    reasonCode?: JsonObject;
    /** The ID of the plan for which the service instance has been requested, which is stored in the catalog.j-son
     *  of your broker.
     */
    planId?: string;
    /** Information about the service instance prior to the update. */
    previousValues?: string[];
    /** Broker Api Version. */
    xBrokerApiVersion?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getServiceInstance` operation. */
  export interface GetServiceInstanceParams {
    /** The unique instance ID generated during provisioning by the IBM Cloud platform. */
    instanceId: string;
    /** Broker API Version. */
    xBrokerApiVersion?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCatalog` operation. */
  export interface GetCatalogParams {
    /** Broker API Version. */
    xBrokerApiVersion?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postEventNotificationsIntegration` operation. */
  export interface PostEventNotificationsIntegrationParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** A CRN of the instance of the event. */
    instanceCrn: string;
    /** A description of the instance of the event. */
    description?: string;
    /** The name of the source this project is on the event notifications instance. */
    eventNotificationsSourceName?: string;
    /** A status of the instance of the event. */
    enabled?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getEventNotificationsIntegration` operation. */
  export interface GetEventNotificationsIntegrationParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteEventNotificationsIntegration` operation. */
  export interface DeleteEventNotificationsIntegrationParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `postTestEventNotification` operation. */
  export interface PostTestEventNotificationParams {
    /** The ID of the project, which uniquely identifies it. */
    projectId: string;
    /** IBM default long message of the instance of the event. */
    ibmendefaultlong?: string;
    /** IBM default short message of the instance of the event. */
    ibmendefaultshort?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** The result of Get instance status call. */
  export interface BrokerResult {
    /** Indicates whether the service instance is active and is meaningful if enabled is true. The default value is
     *  true if not specified.
     */
    active?: string;
    /** Indicates the current state of the service instance. */
    enabled?: string;
    /** Indicates when the service instance was last accessed/modified/etc., and it is meaningful if enabled is true
     *  and active is false. Represented as milliseconds since the epoch, but does not need to be accurate to the
     *  second/hour.
     */
    last_active?: string;
  }

  /** Response from fetching the catalog metadata stored within the broker. */
  export interface CatalogResponse {
    /** collection of catalog services. */
    services?: CatalogResponseServices[];
  }

  /** Catalog service structure. */
  export interface CatalogResponseServices {
    /** Specifies whether or not your service can be bound to applications in IBM Cloud. If bindable, it must be
     *  able to return API endpoints and credentials to your service consumers.
     */
    bindable?: boolean;
    /** A short description of the service. It MUST be a non-empty string. Note that this description is not
     *  displayed by the the IBM Cloud console or IBM Cloud CLI.
     */
    description?: string;
    /** An identifier used to correlate this service in future requests to the broker. This MUST be globally unique
     *  within the IBM Cloud platform. It MUST be a non-empty string, and using a GUID is recommended. Recommended: If
     *  you define your service in the RMC, the RMC will generate a globally unique GUID service ID that you can use in
     *  your service broker.
     */
    id?: string;
    /** catalog service metadata. */
    metadata?: CatalogResponseServicesMetadata;
    /** The service name is not your display name. Your service name must follow the follow these rules: It must be
     *  all lowercase. It can't include spaces but may include hyphens (-). It must be less than 32 characters. Your
     *  service name should include your company name. If your company has more then one offering your service name
     *  should include both company and offering as part of the name. For example, the Compose company has offerings for
     *  Redis and Elasticsearch. Sample service names on IBM Cloud for these offerings would be compose-redis and
     *  compose-elasticsearch. Each of these service names have associated display names that are shown in the IBM Cloud
     *  catalog: Compose Redis and Compose Elasticsearch. Another company (e.g. FastJetMail) may only have the single
     *  JetMail offering, in which case the service name should be fastjetmail. Recommended: If you define your service
     *  in RMC, you can export a catalog.j-son that will include the service name you defined within the RMC.
     */
    name?: string;
    /** The Default is false. This specifices whether or not you support plan changes for provisioned instances. If
     *  your offering supports multiple plans, and you want users to be able to change plans for a provisioned instance,
     *  you will need to enable the ability for users to update their service instance by using
     *  /v2/service_instances/{instance_id} PATCH.
     */
    plan_updateable?: boolean;
    /** collection of catalog service tags. */
    tags?: string[];
    /** A list of plans for this service that must contain at least one plan. */
    plans?: CatalogResponseServicesPlans[];
  }

  /** catalog service metadata. */
  export interface CatalogResponseServicesMetadata {
    /** catalog service name. */
    display_name?: string;
    /** catalog service documentation url. */
    documentation_url?: string;
    /** catalog service image url. */
    image_url?: string;
    /** catalog service instructions url. */
    instructions_url?: string;
    /** catalog service long description. */
    long_description?: string;
    /** catalog service provider display name. */
    provider_display_name?: string;
    /** catalog service support url. */
    support_url?: string;
    /** catalog service terms url. */
    terms_url?: string;
  }

  /** catalog service plan. */
  export interface CatalogResponseServicesPlans {
    /** catalog service plan description. */
    description?: string;
    /** catalog service plan subscription level. */
    free?: boolean;
    /** catalog service plan subscription id. */
    id?: string;
    /** catalog service plan metadata. */
    metadata?: CatalogResponseServicesPlansMetadata;
    /** catalog service plan name. */
    name?: string;
  }

  /** catalog service plan metadata. */
  export interface CatalogResponseServicesPlansMetadata {
    /** catalog service plan metadata bullets. */
    bullets?: string[];
    /** catalog service plan metadata name. */
    display_name?: string;
  }

  /** ConfigSettingItems. */
  export interface ConfigSettingItems {
    /** The name of the configuration setting. */
    name: string;
    /** The value of a the configuration setting. */
    value: string;
  }

  /** Result of the provision call. */
  export interface CreateResult {
    /** The URL of a web-based management user interface for the service instance. The URL MUST contain enough
     *  information for the dashboard to identify the resource being accessed.
     */
    dashboard_url?: string;
    /** For asynchronous responses, service brokers can return an identifier representing the operation. The value
     *  of this field MUST be provided by the platform with requests to the last_operation endpoint in a URL encoded
     *  query parameter. If present, it MUST be a non-empty string.
     */
    operation?: string;
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

  /** Delete configuration response. */
  export interface DeleteProjectConfigResponse {
    /** The unique ID of a project. */
    id?: string;
    /** The name of the configuration being deleted. */
    name?: string;
  }

  /** The result of deprovisioning a service instance. */
  export interface DeleteResult {
    /** DeleteResult accepts additional properties. */
    [propName: string]: any;
  }

  /** The response of a fetching an action job. */
  export interface GetActionJobResponse {
    /** The unique ID of a project. */
    id?: string;
  }

  /** The cost estimate for the given configuration. */
  export interface GetCostEstimateResponse {
    /** GetCostEstimateResponse accepts additional properties. */
    [propName: string]: any;
  }

  /** The resulting response of getting the source details of the event notifications integration. */
  export interface GetEventNotificationsIntegrationResponse {
    /** A description of the instance of the event. */
    description?: string;
    /** The name of the instance of the event. */
    name?: string;
    /** The status of instance of the event. */
    enabled?: boolean;
    /** A unique ID of the instance of the event. */
    id?: string;
    /** The type of the instance of event. */
    type?: string;
    /** A date/time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date-time
     *  format as specified by RFC 3339.
     */
    updated_at?: string;
    /** The topic count of the instance of the event. */
    topic_count?: number;
    /** The topic names of the instance of the event. */
    topic_names?: string[];
  }

  /** The result of get_last_operation call. */
  export interface GetLastOperationResult {
    /** Valid values are in progress, succeeded, and failed. */
    state?: string;
    /** A user-facing message displayed to the platform API client. Can be used to tell the user details about the
     *  status of the operation.
     */
    description?: string;
  }

  /** The response from fetching notifications. */
  export interface GetNotificationsResponse {
    /** Collection of the notification events with an ID. */
    notifications?: NotificationEventWithId[];
  }

  /** The project returned in the response body. */
  export interface GetProjectResponse {
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
    /** Metadata of the project. */
    metadata?: ProjectMetadata;
  }

  /** Response data from a health check request. */
  export interface Health {
    /** The name of the service. */
    name?: string;
    /** The running version of the service. */
    version?: string;
    /** The status of service dependencies. */
    dependencies?: JsonObject;
  }

  /** InputVariable. */
  export interface InputVariable {
    /** The variable name. */
    name: string;
    /** The variable type. */
    type: string;
    /** Whether the variable is required or not. */
    required?: boolean;
  }

  /** InputVariableInput. */
  export interface InputVariableInput {
    /** The variable name. */
    name: string;
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
    /** Who triggered the flow that posted the event. */
    triggered_by?: string;
    /** Actionable URL that users can go to as a response to the event. */
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
    /** Who triggered the flow that posted the event. */
    triggered_by?: string;
    /** Actionable URL that users can go to as a response to the event. */
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
    /** Who triggered the flow that posted the event. */
    triggered_by?: string;
    /** Actionable URL that users can go to as a response to the event. */
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

  /** OutputValue. */
  export interface OutputValue {
    /** The variable name. */
    name: string;
    /** A short explanation of the output value. */
    description?: string;
    /** The output value. */
    value?: string[];
  }

  /** A pagination link. */
  export interface PaginationLink {
    /** The url of the pull request, which uniquely identifies it. */
    href: string;
    /** A pagination token. */
    start?: string;
  }

  /** The resulting response of connecting a project to a event notifications instance. */
  export interface PostEventNotificationsIntegrationResponse {
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
    /** A date/time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date-time
     *  format as specified by RFC 3339.
     */
    created_at?: string;
  }

  /** The result of a notification post. */
  export interface PostNotificationsResponse {
    /** The collection of the notification events with status. */
    notifications?: NotificationEventWithStatus[];
  }

  /** The response for posting a test notification to the event notifications instance. */
  export interface PostTestEventNotificationResponse {
    /** The data content type of the instance of the event. */
    datacontenttype?: string;
    /** IBM default long message of the instance of the event. */
    ibmendefaultlong?: string;
    /** IBM default short message of the instance of the event. */
    ibmendefaultshort?: string;
    /** IBM source ID of the instance of the event. */
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

  /** The project configuration. */
  export interface ProjectConfig {
    /** The unique ID of a project. */
    id?: string;
    /** The configuration name. */
    name: string;
    /** A collection of configuration labels. */
    labels?: string[];
    /** A project configuration description. */
    description?: string;
    /** The location ID of a Project configuration manual property. */
    locator_id: string;
    /** The type of a Project Config Manual Property. */
    type: string;
    /** The outputs of a Schematics template property. */
    input?: InputVariable[];
    /** The outputs of a Schematics template property. */
    output?: OutputValue[];
    /** An optional setting object That is passed to the cart API. */
    setting?: ConfigSettingItems[];
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
    /** Collection of additions to configurations in the diff summary. */
    input?: ProjectConfigDiffInputVariable[];
  }

  /** The changes to configurations in the diff summary. */
  export interface ProjectConfigDiffChanged {
    /** Collection of changes to configurations in the diff summary. */
    input?: ProjectConfigDiffInputVariable[];
  }

  /** ProjectConfigDiffInputVariable. */
  export interface ProjectConfigDiffInputVariable {
    /** The variable name. */
    name: string;
    /** The variable type. */
    type: string;
  }

  /** The deletions to configurations in the diff summary. */
  export interface ProjectConfigDiffRemoved {
    /** Collection of deletions to configurations in the diff summary. */
    input?: ProjectConfigDiffInputVariable[];
  }

  /** The input of a project configuration. */
  export interface ProjectConfigInput {
    /** The unique ID of a project. */
    id?: string;
    /** The configuration name. */
    name: string;
    /** A collection of configuration labels. */
    labels?: string[];
    /** A project configuration description. */
    description?: string;
    /** The location ID of a project configuration manual property. */
    locator_id: string;
    /** The inputs of a Schematics template property. */
    input?: InputVariableInput[];
    /** An optional setting object That is passed to the cart API. */
    setting?: ConfigSettingItems[];
  }

  /** The project configuration list. */
  export interface ProjectConfigList {
    /** Collection list operation response schema should define array property with name "configs". */
    configs?: ProjectConfig[];
  }

  /** ProjectListItem. */
  export interface ProjectListItem {
    /** The unique ID of a project. */
    id?: string;
    /** The project name. */
    name?: string;
    /** The project description. */
    description?: string;
    /** Metadata of the project. */
    metadata?: ProjectMetadata;
  }

  /** Projects list. */
  export interface ProjectListResponseSchema {
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
    projects?: ProjectListItem[];
  }

  /** Metadata of the project. */
  export interface ProjectMetadata {
    /** An IBM Cloud resource name, which uniquely identifies a resource. */
    crn?: string;
    /** A date/time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date-time
     *  format as specified by RFC 3339.
     */
    created_at?: string;
    /** The cumulative list of needs attention items of a project. */
    cumulative_needs_attention_view?: CumulativeNeedsAttention[];
    /** True to indicate the fetch of needs attention items that failed. */
    cumulative_needs_attention_view_err?: string;
    /** The location of where the project was created. */
    location?: string;
    /** The resource group of where the project was created. */
    resource_group?: string;
    /** The project status value. */
    state?: string;
    /** The CRN of the event notifications instance if one is connected to this project. */
    event_notifications_crn?: string;
  }

  /** The project update request. */
  export interface ProjectUpdate {
    /** The project name. */
    name?: string;
    /** A project descriptive text. */
    description?: string;
  }

  /** PulsarEventItems. */
  export interface PulsarEventItems {
    /** The type of the event that is published and written in dot notation. */
    event_type: string;
    /** A date/time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date-time
     *  format as specified by RFC 3339.
     */
    timestamp: string;
    /** The publisher of the events, preferably written as the service's CRN. */
    publisher: string;
    /** The IBM Cloud ID that the event is scoped to. */
    account_id: string;
    /** The version of the payload. */
    version: string;
    /** Custom event properties for a specific event. */
    event_properties?: JsonObject;
    /** A unique identifier for that individual event. */
    event_id?: string;
    /** PulsarEventItems accepts additional properties. */
    [propName: string]: any;
  }

  /** The result of deprovisioning service instance. */
  export interface UpdateResult {
    /** UpdateResult accepts additional properties. */
    [propName: string]: any;
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
    constructor(
      client: ProjectV1,
      params?: ProjectV1.ListProjectsParams
    ) {
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
     * @returns {Promise<ProjectV1.ProjectListItem[]>}
     */
    public async getNext(): Promise<ProjectV1.ProjectListItem[]> {
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
        next = result.next.start
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.projects;
    }

    /**
     * Returns all results by invoking listProjects() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<ProjectV1.ProjectListItem[]>}
     */
    public async getAll(): Promise<ProjectV1.ProjectListItem[]> {
      const results: ProjectListItem[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = ProjectV1;
