/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SpecialtyIn } from '../models/SpecialtyIn';
import type { SpecialtyOut } from '../models/SpecialtyOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SpecialtiesService {

    /**
     * Find Specialty
     * @param id 
     * @param title 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static findSpecialtySpecialtiesGet(
id?: string,
title?: string,
): CancelablePromise<(Array<SpecialtyOut> | SpecialtyOut)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/specialties/',
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
     * Create Specialty
     * @param requestBody 
     * @returns SpecialtyOut Successful Response
     * @throws ApiError
     */
    public static createSpecialtySpecialtiesPost(
requestBody: SpecialtyIn,
): CancelablePromise<SpecialtyOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/specialties/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Speciality
     * @param idSpecialty 
     * @param requestBody 
     * @returns SpecialtyOut Successful Response
     * @throws ApiError
     */
    public static updateSpecialitySpecialtiesIdSpecialtyPut(
idSpecialty: string,
requestBody: SpecialtyIn,
): CancelablePromise<SpecialtyOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/specialties/{id_specialty}',
            path: {
                'id_specialty': idSpecialty,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Speciality
     * @param idSpecialty 
     * @returns SpecialtyOut Successful Response
     * @throws ApiError
     */
    public static deleteSpecialitySpecialtiesIdSpecialtyDelete(
idSpecialty: string,
): CancelablePromise<SpecialtyOut> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/specialties/{id_specialty}',
            path: {
                'id_specialty': idSpecialty,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}