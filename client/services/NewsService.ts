/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NewsIn } from '../models/NewsIn';
import type { NewsOut } from '../models/NewsOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NewsService {

    /**
     * Find News
     * @param id 
     * @param title 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static findNewsNewsGet(
id?: string,
title?: string,
): CancelablePromise<(NewsOut | Array<NewsOut>)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/news/',
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
     * Create News
     * @param requestBody 
     * @returns NewsOut Successful Response
     * @throws ApiError
     */
    public static createNewsNewsPost(
requestBody: NewsIn,
): CancelablePromise<NewsOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/news/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update News
     * @param newsId 
     * @param requestBody 
     * @returns NewsOut Successful Response
     * @throws ApiError
     */
    public static updateNewsNewsNewsIdPut(
newsId: string,
requestBody: NewsIn,
): CancelablePromise<NewsOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/news/{news_id}',
            path: {
                'news_id': newsId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete News
     * @param newsId 
     * @returns NewsOut Successful Response
     * @throws ApiError
     */
    public static deleteNewsNewsNewsIdDelete(
newsId: string,
): CancelablePromise<NewsOut> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/news/{news_id}',
            path: {
                'news_id': newsId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}