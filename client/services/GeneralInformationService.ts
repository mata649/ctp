/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeneralInformationIn } from '../models/GeneralInformationIn';
import type { GeneralInformationOut } from '../models/GeneralInformationOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GeneralInformationService {

    /**
     * Get General Information
     * @returns GeneralInformationOut Successful Response
     * @throws ApiError
     */
    public static getGeneralInformationGeneralInformationGet(): CancelablePromise<GeneralInformationOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/general_information/',
        });
    }

    /**
     * Update General Information
     * @param requestBody 
     * @returns GeneralInformationOut Successful Response
     * @throws ApiError
     */
    public static updateGeneralInformationGeneralInformationPut(
requestBody: GeneralInformationIn,
): CancelablePromise<GeneralInformationOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/general_information/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create General Information
     * @param requestBody 
     * @returns GeneralInformationOut Successful Response
     * @throws ApiError
     */
    public static createGeneralInformationGeneralInformationPost(
requestBody: GeneralInformationIn,
): CancelablePromise<GeneralInformationOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/general_information/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}