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
 * IBM OpenAPI SDK Code Generator Version: 3.72.2-2bede9d2-20230601-202845
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
   * @param {string} params.name - The name of the project.
   * @param {string} [params.description] - A brief explanation of the project's use in the configuration of a
   * deployable architecture. It is possible to create a project without providing a description.
   * @param {boolean} [params.destroyOnDelete] - The policy that indicates whether the resources are destroyed or not
   * when a project is deleted.
   * @param {ProjectConfigPrototype[]} [params.configs] - The project configurations. If configurations are not
   * included, the project resource is persisted without this property.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.Project>>}
   */
  public createProject(
    params: ProjectV1.CreateProjectParams
  ): Promise<ProjectV1.Response<ProjectV1.Project>> {
    const _params = { ...params };
    const _requiredParams = ['resourceGroup', 'location', 'name'];
    const _validParams = [
      'resourceGroup',
      'location',
      'name',
      'description',
      'destroyOnDelete',
      'configs',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'destroy_on_delete': _params.destroyOnDelete,
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
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectSummary>>}
   */
  public getProject(
    params: ProjectV1.GetProjectParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectSummary>> {
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
   * Delete a project.
   *
   * Delete a project document by the ID. A project can only be deleted after deleting all of its artifacts.
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
   * @param {string} params.name - The name of the configuration.
   * @param {string} params.locatorId - A dotted value of catalogID.versionID.
   * @param {string[]} [params.labels] - A collection of configuration labels.
   * @param {string} [params.description] - The description of the project configuration.
   * @param {ProjectConfigAuth} [params.authorizations] - The authorization for a configuration.
   * You can authorize by using a trusted profile or an API key in Secrets Manager.
   * @param {ProjectConfigComplianceProfile} [params.complianceProfile] - The profile required for compliance.
   * @param {ProjectConfigInputVariable[]} [params.input] - The inputs of a Schematics template property.
   * @param {ProjectConfigSettingCollection[]} [params.setting] - Schematics environment variables to use to deploy the
   * configuration. Settings are only available if they were specified when the configuration was initially created.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigDraftResponse>>}
   */
  public createConfig(
    params: ProjectV1.CreateConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigDraftResponse>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'name', 'locatorId'];
    const _validParams = [
      'projectId',
      'name',
      'locatorId',
      'labels',
      'description',
      'authorizations',
      'complianceProfile',
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
      'labels': _params.labels,
      'description': _params.description,
      'authorizations': _params.authorizations,
      'compliance_profile': _params.complianceProfile,
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
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigGetResponse>>}
   */
  public getConfig(
    params: ProjectV1.GetConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigGetResponse>> {
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
   * @param {string} [params.locatorId] - A dotted value of catalogID.versionID.
   * @param {ProjectConfigInputVariable[]} [params.input] - The inputs of a Schematics template property.
   * @param {ProjectConfigSettingCollection[]} [params.setting] - Schematics environment variables to use to deploy the
   * configuration. Settings are only available if they were specified when the configuration was initially created.
   * @param {string} [params.name] - The configuration name.
   * @param {string[]} [params.labels] - The configuration labels.
   * @param {string} [params.description] - A project configuration description.
   * @param {ProjectConfigAuth} [params.authorizations] - The authorization for a configuration.
   * You can authorize by using a trusted profile or an API key in Secrets Manager.
   * @param {ProjectConfigComplianceProfile} [params.complianceProfile] - The profile required for compliance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigDraftResponse>>}
   */
  public updateConfig(
    params: ProjectV1.UpdateConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigDraftResponse>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = [
      'projectId',
      'id',
      'locatorId',
      'input',
      'setting',
      'name',
      'labels',
      'description',
      'authorizations',
      'complianceProfile',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'locator_id': _params.locatorId,
      'input': _params.input,
      'setting': _params.setting,
      'name': _params.name,
      'labels': _params.labels,
      'description': _params.description,
      'authorizations': _params.authorizations,
      'compliance_profile': _params.complianceProfile,
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
   * Delete a configuration in a project. Deleting the configuration will also destroy all the resources deployed by the
   * configuration if the query parameter `destroy` is specified.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique config ID.
   * @param {boolean} [params.draftOnly] - The flag to determine if only the draft version should be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigDelete>>}
   */
  public deleteConfig(
    params: ProjectV1.DeleteConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigDelete>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'draftOnly', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'draft_only': _params.draftOnly,
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
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigGetResponse>>}
   */
  public approve(
    params: ProjectV1.ApproveParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigGetResponse>> {
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
   * @param {string} [params.xAuthRefreshToken] - The IAM refresh token.
   * @param {boolean} [params.isDraft] - To specify whether the validation check triggers against the `draft` or the
   * `active` version of the configuration.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigGetResponse>>}
   */
  public checkConfig(
    params: ProjectV1.CheckConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigGetResponse>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'id'];
    const _validParams = ['projectId', 'id', 'xAuthRefreshToken', 'isDraft', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'is_draft': _params.isDraft,
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
   * @param {string} params.id - The unique config ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigGetResponse>>}
   */
  public installConfig(
    params: ProjectV1.InstallConfigParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigGetResponse>> {
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

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'installConfig');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{id}/install',
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
   * Destroy configuration resources.
   *
   * Destroy a project's configuration resources. The operation destroys all the resources that are deployed with the
   * specific configuration. You can track it by using the get project configuration API with full metadata.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.id - The unique config ID.
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
   * Get a list of project configuration drafts.
   *
   * Returns a list of previous and current configuration drafts in a specific project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.configId - The unique configuration ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigDraftSummaryCollection>>}
   */
  public listConfigDrafts(
    params: ProjectV1.ListConfigDraftsParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigDraftSummaryCollection>> {
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

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'listConfigDrafts');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{config_id}/drafts',
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
   * Get a project configuration draft.
   *
   * Returns the specific version of a configuration draft in a specific project.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.projectId - The unique project ID.
   * @param {string} params.configId - The unique configuration ID.
   * @param {number} params.version - The configuration version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ProjectV1.Response<ProjectV1.ProjectConfigDraftResponse>>}
   */
  public getConfigDraft(
    params: ProjectV1.GetConfigDraftParams
  ): Promise<ProjectV1.Response<ProjectV1.ProjectConfigDraftResponse>> {
    const _params = { ...params };
    const _requiredParams = ['projectId', 'configId', 'version'];
    const _validParams = ['projectId', 'configId', 'version', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'project_id': _params.projectId,
      'config_id': _params.configId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(ProjectV1.DEFAULT_SERVICE_NAME, 'v1', 'getConfigDraft');

    const parameters = {
      options: {
        url: '/v1/projects/{project_id}/configs/{config_id}/drafts/{version}',
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
    /** The name of the project. */
    name: string;
    /** A brief explanation of the project's use in the configuration of a deployable architecture. It is possible
     *  to create a project without providing a description.
     */
    description?: string;
    /** The policy that indicates whether the resources are destroyed or not when a project is deleted. */
    destroyOnDelete?: boolean;
    /** The project configurations. If configurations are not included, the project resource is persisted without
     *  this property.
     */
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProject` operation. */
  export interface GetProjectParams {
    /** The unique project ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteProject` operation. */
  export interface DeleteProjectParams {
    /** The unique project ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createConfig` operation. */
  export interface CreateConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The name of the configuration. */
    name: string;
    /** A dotted value of catalogID.versionID. */
    locatorId: string;
    /** A collection of configuration labels. */
    labels?: string[];
    /** The description of the project configuration. */
    description?: string;
    /** The authorization for a configuration.
     *  You can authorize by using a trusted profile or an API key in Secrets Manager.
     */
    authorizations?: ProjectConfigAuth;
    /** The profile required for compliance. */
    complianceProfile?: ProjectConfigComplianceProfile;
    /** The inputs of a Schematics template property. */
    input?: ProjectConfigInputVariable[];
    /** Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  were specified when the configuration was initially created.
     */
    setting?: ProjectConfigSettingCollection[];
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
    /** A dotted value of catalogID.versionID. */
    locatorId?: string;
    /** The inputs of a Schematics template property. */
    input?: ProjectConfigInputVariable[];
    /** Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  were specified when the configuration was initially created.
     */
    setting?: ProjectConfigSettingCollection[];
    /** The configuration name. */
    name?: string;
    /** The configuration labels. */
    labels?: string[];
    /** A project configuration description. */
    description?: string;
    /** The authorization for a configuration.
     *  You can authorize by using a trusted profile or an API key in Secrets Manager.
     */
    authorizations?: ProjectConfigAuth;
    /** The profile required for compliance. */
    complianceProfile?: ProjectConfigComplianceProfile;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteConfig` operation. */
  export interface DeleteConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
    /** The flag to determine if only the draft version should be deleted. */
    draftOnly?: boolean;
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

  /** Parameters for the `checkConfig` operation. */
  export interface CheckConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
    /** The IAM refresh token. */
    xAuthRefreshToken?: string;
    /** To specify whether the validation check triggers against the `draft` or the `active` version of the
     *  configuration.
     */
    isDraft?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `installConfig` operation. */
  export interface InstallConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `uninstallConfig` operation. */
  export interface UninstallConfigParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique config ID. */
    id: string;
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

  /** Parameters for the `listConfigDrafts` operation. */
  export interface ListConfigDraftsParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    configId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getConfigDraft` operation. */
  export interface GetConfigDraftParams {
    /** The unique project ID. */
    projectId: string;
    /** The unique configuration ID. */
    configId: string;
    /** The configuration version. */
    version: number;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

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
    /** Can be any value - a string, number, boolean, array, or object. */
    value?: any;
    /** Whether the variable is required or not. */
    required?: boolean;
  }

  /** OutputValue. */
  export interface OutputValue {
    /** The variable name. */
    name: string;
    /** A short explanation of the output value. */
    description?: string;
    /** Can be any value - a string, number, boolean, array, or object. */
    value?: any;
  }

  /** A pagination link. */
  export interface PaginationLink {
    /** A relative URL. */
    href: string;
    /** A pagination token. */
    start?: string;
  }

  /** The project returned in the response body. */
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
    cumulative_needs_attention_view?: CumulativeNeedsAttention[];
    /** True indicates that the fetch of the needs attention items failed. It only exists if there was an error
     *  while retrieving the cumulative needs attention view.
     */
    cumulative_needs_attention_view_error?: boolean;
    /** The unique ID of a project. */
    id: string;
    /** The IBM Cloud location where a resource is deployed. */
    location: string;
    /** The resource group where the project's data and tools are created. */
    resource_group: string;
    /** The project status value. */
    state: string;
    /** The CRN of the event notifications instance if one is connected to this project. */
    event_notifications_crn?: string;
    /** The definition of the project. */
    definition?: ProjectDefinitionResponse;
    /** The project configurations. These configurations are only included in the response of creating a project if
     *  a configs array is specified in the request payload.
     */
    configs?: ProjectConfigCollectionMember[];
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

  /** The metadata of the project. */
  export interface ProjectCollectionMemberWithMetadata {
    /** An IBM Cloud resource name, which uniquely identifies a resource. */
    crn: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** The cumulative list of needs attention items for a project. If the view is successfully retrieved, an array
     *  which could be empty is returned.
     */
    cumulative_needs_attention_view?: CumulativeNeedsAttention[];
    /** True indicates that the fetch of the needs attention items failed. It only exists if there was an error
     *  while retrieving the cumulative needs attention view.
     */
    cumulative_needs_attention_view_error?: boolean;
    /** The unique ID of a project. */
    id?: string;
    /** The IBM Cloud location where a resource is deployed. */
    location: string;
    /** The resource group where the project's data and tools are created. */
    resource_group: string;
    /** The project status value. */
    state: string;
    /** The CRN of the event notifications instance if one is connected to this project. */
    event_notifications_crn?: string;
    /** The definition of the project. */
    definition?: ProjectDefinitionResponse;
  }

  /** The authorization for a configuration. You can authorize by using a trusted profile or an API key in Secrets Manager. */
  export interface ProjectConfigAuth {
    /** The trusted profile for authorizations. */
    trusted_profile?: ProjectConfigAuthTrustedProfile;
    /** The authorization for a configuration. You can authorize by using a trusted profile or an API key in Secrets
     *  Manager.
     */
    method?: string;
    /** The IBM Cloud API Key. */
    api_key?: string;
  }

  /** The trusted profile for authorizations. */
  export interface ProjectConfigAuthTrustedProfile {
    /** The unique ID of a project. */
    id?: string;
    /** The unique ID of a project. */
    target_iam_id?: string;
  }

  /** The project configuration list. */
  export interface ProjectConfigCollection {
    /** The collection list operation response schema that should define the array property with the name "configs". */
    configs?: ProjectConfigCollectionMember[];
  }

  /** The configuration metadata. */
  export interface ProjectConfigCollectionMember {
    /** The ID of the configuration. If this parameter is empty, an ID is automatically created for the
     *  configuration.
     */
    id: string;
    /** The unique ID of a project. */
    project_id: string;
    /** The version of the configuration. */
    version: number;
    /** The flag that indicates whether the version of the configuration is draft, or active. */
    is_draft: boolean;
    /** The needs attention state of a configuration. */
    needs_attention_state?: any[];
    /** The state of the configuration. */
    state: string;
    /** The pipeline state of the configuration. It only exists after the first configuration validation. */
    pipeline_state?: string;
    /** The flag that indicates whether a configuration update is available. */
    update_available: boolean;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    updated_at: string;
    /** The last approved metadata of the configuration. */
    last_approved?: ProjectConfigMetadataLastApproved;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    last_save?: string;
    /** The project configuration draft. */
    active_draft?: ProjectConfigDraftSummary;
    /** The project configuration definition. */
    definition: ProjectConfigDefinition;
    /** A relative URL. */
    href: string;
  }

  /** The profile required for compliance. */
  export interface ProjectConfigComplianceProfile {
    /** The unique ID of a project. */
    id?: string;
    /** The unique ID of a project. */
    instance_id?: string;
    /** The location of the compliance instance. */
    instance_location?: string;
    /** The unique ID of a project. */
    attachment_id?: string;
    /** The name of the compliance profile. */
    profile_name?: string;
  }

  /** The project configuration definition. */
  export interface ProjectConfigDefinition {
    /** The name of the configuration. */
    name: string;
    /** A collection of configuration labels. */
    labels?: string[];
    /** The description of the project configuration. */
    description?: string;
    /** The authorization for a configuration.
     *  You can authorize by using a trusted profile or an API key in Secrets Manager.
     */
    authorizations?: ProjectConfigAuth;
    /** The profile required for compliance. */
    compliance_profile?: ProjectConfigComplianceProfile;
    /** A dotted value of catalogID.versionID. */
    locator_id: string;
    /** The type of a project configuration manual property. */
    type: string;
    /** The outputs of a Schematics template property. */
    input?: InputVariable[];
    /** The outputs of a Schematics template property. */
    output?: OutputValue[];
    /** Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  were specified when the configuration was initially created.
     */
    setting?: ProjectConfigSettingCollection[];
  }

  /** Deletes the configuration response. */
  export interface ProjectConfigDelete {
    /** The unique ID of a project. */
    id: string;
  }

  /** The project configuration draft. */
  export interface ProjectConfigDraftResponse {
    /** The ID of the configuration. If this parameter is empty, an ID is automatically created for the
     *  configuration.
     */
    id: string;
    /** The unique ID of a project. */
    project_id: string;
    /** The version of the configuration. */
    version: number;
    /** The flag that indicates whether the version of the configuration is draft, or active. */
    is_draft: boolean;
    /** The needs attention state of a configuration. */
    needs_attention_state?: any[];
    /** The state of the configuration. */
    state: string;
    /** The pipeline state of the configuration. It only exists after the first configuration validation. */
    pipeline_state?: string;
    /** The flag that indicates whether a configuration update is available. */
    update_available: boolean;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    updated_at: string;
    /** The last approved metadata of the configuration. */
    last_approved?: ProjectConfigMetadataLastApproved;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    last_save?: string;
    /** The summaries of jobs that were performed on the configuration. */
    job_summary?: ProjectConfigMetadataJobSummary;
    /** The Code Risk Analyzer logs of the configuration. */
    cra_logs?: ProjectConfigMetadataCraLogs;
    /** The cost estimate of the configuration. It only exists after the first configuration validation. */
    cost_estimate?: ProjectConfigMetadataCostEstimate;
    /** The summaries of jobs that were performed on the configuration. */
    last_deployment_job_summary?: ProjectConfigMetadataJobSummary;
    /** The project configuration definition. */
    definition: ProjectConfigDefinition;
  }

  /** The project configuration draft. */
  export interface ProjectConfigDraftSummary {
    /** The version number of the configuration. */
    version: number;
    /** The state of the configuration draft. */
    state: string;
    /** The pipeline state of the configuration. It only exists after the first configuration validation. */
    pipeline_state?: string;
    /** A relative URL. */
    href?: string;
  }

  /** The project configuration draft list. */
  export interface ProjectConfigDraftSummaryCollection {
    /** The collection list operation response schema that defines the array property with the name `drafts`. */
    drafts?: ProjectConfigDraftSummary[];
  }

  /** The configuration metadata. */
  export interface ProjectConfigGetResponse {
    /** The ID of the configuration. If this parameter is empty, an ID is automatically created for the
     *  configuration.
     */
    id: string;
    /** The unique ID of a project. */
    project_id: string;
    /** The version of the configuration. */
    version: number;
    /** The flag that indicates whether the version of the configuration is draft, or active. */
    is_draft: boolean;
    /** The needs attention state of a configuration. */
    needs_attention_state?: any[];
    /** The state of the configuration. */
    state: string;
    /** The pipeline state of the configuration. It only exists after the first configuration validation. */
    pipeline_state?: string;
    /** The flag that indicates whether a configuration update is available. */
    update_available: boolean;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    created_at: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    updated_at: string;
    /** The last approved metadata of the configuration. */
    last_approved?: ProjectConfigMetadataLastApproved;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    last_save?: string;
    /** The summaries of jobs that were performed on the configuration. */
    job_summary?: ProjectConfigMetadataJobSummary;
    /** The Code Risk Analyzer logs of the configuration. */
    cra_logs?: ProjectConfigMetadataCraLogs;
    /** The cost estimate of the configuration. It only exists after the first configuration validation. */
    cost_estimate?: ProjectConfigMetadataCostEstimate;
    /** The summaries of jobs that were performed on the configuration. */
    last_deployment_job_summary?: ProjectConfigMetadataJobSummary;
    /** The project configuration draft. */
    active_draft?: ProjectConfigDraftSummary;
    /** The project configuration definition. */
    definition: ProjectConfigDefinition;
  }

  /** ProjectConfigInputVariable. */
  export interface ProjectConfigInputVariable {
    /** The variable name. */
    name: string;
    /** Can be any value - a string, number, boolean, array, or object. */
    value?: any;
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
    /** The unique ID of a project. */
    user_id?: string;
  }

  /** The Code Risk Analyzer logs of the configuration. */
  export interface ProjectConfigMetadataCraLogs {
    /** The version of the Code Risk Analyzer logs of the configuration. */
    cra_version?: string;
    /** The schema version of Code Risk Analyzer logs of the configuration. */
    schema_version?: string;
    /** The status of the Code Risk Analyzer logs of the configuration. */
    status?: string;
    /** The summary of the Code Risk Analyzer logs of the configuration. */
    summary?: JsonObject;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    timestamp?: string;
  }

  /** The summaries of jobs that were performed on the configuration. */
  export interface ProjectConfigMetadataJobSummary {
    /** The summary of the plan jobs on the configuration. */
    plan_summary?: JsonObject;
    /** The summary of the apply jobs on the configuration. */
    apply_summary?: JsonObject;
    /** The summary of the destroy jobs on the configuration. */
    destroy_summary?: JsonObject;
    /** The message summaries of jobs on the configuration. */
    message_summary?: JsonObject;
    /** The messages of plan jobs on the configuration. */
    plan_messages?: JsonObject;
    /** The messages of apply jobs on the configuration. */
    apply_messages?: JsonObject;
    /** The messages of destroy jobs on the configuration. */
    destroy_messages?: JsonObject;
  }

  /** The last approved metadata of the configuration. */
  export interface ProjectConfigMetadataLastApproved {
    /** The flag that indicates whether the approval was forced approved. */
    is_forced: boolean;
    /** The comment left by the user who approved the configuration. */
    comment?: string;
    /** A date and time value in the format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ, matching the date and
     *  time format as specified by RFC 3339.
     */
    timestamp: string;
    /** The unique ID of a project. */
    user_id: string;
  }

  /** The input of a project configuration. */
  export interface ProjectConfigPrototype {
    /** The name of the configuration. */
    name: string;
    /** A collection of configuration labels. */
    labels?: string[];
    /** The description of the project configuration. */
    description?: string;
    /** The authorization for a configuration.
     *  You can authorize by using a trusted profile or an API key in Secrets Manager.
     */
    authorizations?: ProjectConfigAuth;
    /** The profile required for compliance. */
    compliance_profile?: ProjectConfigComplianceProfile;
    /** A dotted value of catalogID.versionID. */
    locator_id: string;
    /** The inputs of a Schematics template property. */
    input?: ProjectConfigInputVariable[];
    /** Schematics environment variables to use to deploy the configuration. Settings are only available if they
     *  were specified when the configuration was initially created.
     */
    setting?: ProjectConfigSettingCollection[];
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
    resources?: ProjectConfigResource[];
    /** The total number of resources deployed by the configuration. */
    resources_count: number;
  }

  /** ProjectConfigSettingCollection. */
  export interface ProjectConfigSettingCollection {
    /** The name of the configuration setting. */
    name: string;
    /** The value of the configuration setting. */
    value: string;
  }

  /** The definition of the project. */
  export interface ProjectDefinitionResponse {
    /** The name of the project. */
    name: string;
    /** A brief explanation of the project's use in the configuration of a deployable architecture. It is possible
     *  to create a project without providing a description.
     */
    description: string;
    /** The policy that indicates whether the resources are destroyed or not when a project is deleted. */
    destroy_on_delete: boolean;
  }

  /** The project returned in the response body. */
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
    cumulative_needs_attention_view?: CumulativeNeedsAttention[];
    /** True indicates that the fetch of the needs attention items failed. It only exists if there was an error
     *  while retrieving the cumulative needs attention view.
     */
    cumulative_needs_attention_view_error?: boolean;
    /** The unique ID of a project. */
    id?: string;
    /** The IBM Cloud location where a resource is deployed. */
    location: string;
    /** The resource group where the project's data and tools are created. */
    resource_group: string;
    /** The project status value. */
    state: string;
    /** The CRN of the event notifications instance if one is connected to this project. */
    event_notifications_crn?: string;
    /** The definition of the project. */
    definition?: ProjectDefinitionResponse;
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
