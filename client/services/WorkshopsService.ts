/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WorkshopIn } from '../models/WorkshopIn';
import type { WorkshopOut } from '../models/WorkshopOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WorkshopsService {

    /**
     * Find Workshop
     * @param id 
     * @param title 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static findWorkshopWorkshopsGet(
id?: string,
title?: string,
): CancelablePromise<(Array<WorkshopOut> | WorkshopOut)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/workshops/',
            query: {
                'id': id,
                'title': title,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Workshop
     * @param requestBody 
     * @returns WorkshopOut Successful Response
     * @throws ApiError
     */
    public static createWorkshopWorkshopsPost(
requestBody: WorkshopIn,
): CancelablePromise<WorkshopOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/workshops/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Workshop
     * @param idWorkshop 
     * @param requestBody 
     * @returns WorkshopOut Successful Response
     * @throws ApiError
     */
    public static updateWorkshopWorkshopsIdWorkshopPut(
idWorkshop: string,
requestBody: WorkshopIn,
): CancelablePromise<WorkshopOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/workshops/{id_workshop}',
            path: {
                'id_workshop': idWorkshop,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Workshop
     * @param idWorkshop 
     * @returns WorkshopOut Successful Response
     * @throws ApiError
     */
    public static deleteWorkshopWorkshopsIdWorkshopDelete(
idWorkshop: string,
): CancelablePromise<WorkshopOut> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/workshops/{id_workshop}',
            path: {
                'id_workshop': idWorkshop,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}