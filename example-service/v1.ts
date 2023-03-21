/**
 * (C) Copyright IBM Corp. 2022.
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
 * IBM OpenAPI SDK Code Generator Version: 99-SNAPSHOT-56dda8c5-20220127-140939
 */

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
 * The IBM SDK Squad Example Service. The Example service serves as an example of a service.
 *
 * API Version: 1.0.0
 * See: https://{invalid host}.cloud.ibm.com/apidocs/example-service
 */

class ExampleServiceV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'http://cloud.ibm.com/mysdk/v1';

  static DEFAULT_SERVICE_NAME: string = 'example_service';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of ExampleServiceV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {ExampleServiceV1}
   */

  public static newInstance(options: UserOptions): ExampleServiceV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new ExampleServiceV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a ExampleServiceV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {ExampleServiceV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(ExampleServiceV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * resources
   ************************/

  /**
   * List all resources.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.limit] - How many items to return at one time (max 100).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ExampleServiceV1.Response<ExampleServiceV1.Resources>>}
   */
  public listResources(
    params?: ExampleServiceV1.ListResourcesParams
  ): Promise<ExampleServiceV1.Response<ExampleServiceV1.Resources>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
    };

    const sdkHeaders = getSdkHeaders(ExampleServiceV1.DEFAULT_SERVICE_NAME, 'v1', 'listResources');

    const parameters = {
      options: {
        url: '/resources',
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
   * Create a resource.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name of the resource.
   * @param {string} params.tag - A tag value for the resource.
   * @param {string} [params.resourceId] - The id of the resource. If not specified, it will be assigned by the server.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ExampleServiceV1.Response<ExampleServiceV1.Resource>>}
   */
  public createResource(
    params: ExampleServiceV1.CreateResourceParams
  ): Promise<ExampleServiceV1.Response<ExampleServiceV1.Resource>> {
    const _params = { ...params };
    const _requiredParams = ['name', 'tag'];
    const _validParams = ['name', 'tag', 'resourceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'tag': _params.tag,
      'resource_id': _params.resourceId,
    };

    const sdkHeaders = getSdkHeaders(ExampleServiceV1.DEFAULT_SERVICE_NAME, 'v1', 'createResource');

    const parameters = {
      options: {
        url: '/resources',
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
   * Info for a specific resource.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.resourceId - The id of the resource to retrieve.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ExampleServiceV1.Response<ExampleServiceV1.Resource>>}
   */
  public getResource(
    params: ExampleServiceV1.GetResourceParams
  ): Promise<ExampleServiceV1.Response<ExampleServiceV1.Resource>> {
    const _params = { ...params };
    const _requiredParams = ['resourceId'];
    const _validParams = ['resourceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'resource_id': _params.resourceId,
    };

    const sdkHeaders = getSdkHeaders(ExampleServiceV1.DEFAULT_SERVICE_NAME, 'v1', 'getResource');

    const parameters = {
      options: {
        url: '/resources/{resource_id}',
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
   * Info for a specific resource.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.urlEncodedResourceId - The id of the resource to retrieve.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ExampleServiceV1.Response<ExampleServiceV1.Resource>>}
   */
  public getResourceEncoded(
    params: ExampleServiceV1.GetResourceEncodedParams
  ): Promise<ExampleServiceV1.Response<ExampleServiceV1.Resource>> {
    const _params = { ...params };
    const _requiredParams = ['urlEncodedResourceId'];
    const _validParams = ['urlEncodedResourceId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'url_encoded_resource_id': _params.urlEncodedResourceId,
    };

    const sdkHeaders = getSdkHeaders(
      ExampleServiceV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getResourceEncoded'
    );

    const parameters = {
      options: {
        url: '/resources/encoded/{url_encoded_resource_id}',
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

namespace ExampleServiceV1 {
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
  export interface Empty {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `listResources` operation. */
  export interface ListResourcesParams {
    /** How many items to return at one time (max 100). */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createResource` operation. */
  export interface CreateResourceParams {
    /** The name of the resource. */
    name: string;
    /** A tag value for the resource. */
    tag: string;
    /** The id of the resource. If not specified, it will be assigned by the server. */
    resourceId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getResource` operation. */
  export interface GetResourceParams {
    /** The id of the resource to retrieve. */
    resourceId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getResourceEncoded` operation. */
  export interface GetResourceEncodedParams {
    /** The id of the resource to retrieve. */
    urlEncodedResourceId: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** A resource. */
  export interface Resource {
    /** The id of the resource. If not specified, it will be assigned by the server. */
    resource_id?: string;
    /** The name of the resource. */
    name: string;
    /** A tag value for the resource. */
    tag: string;
    /** This is a read only string. */
    read_only?: string;
  }

  /** List of resources. */
  export interface Resources {
    /** Offset value for this portion of the resource list. */
    offset: number;
    /** Limit value specified or defaulted in the list_resources request. */
    limit: number;
    /** A list of resources. */
    resources: Resource[];
  }
}

export = ExampleServiceV1;
