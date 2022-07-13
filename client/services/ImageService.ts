/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_upload_image_image__post } from '../models/Body_upload_image_image__post';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ImageService {

    /**
     * Upload Image
     * @param formData 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static uploadImageImagePost(
formData: Body_upload_image_image__post,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/image/',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}