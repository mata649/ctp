/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserChangePasswordIn } from '../models/UserChangePasswordIn';
import type { UserChangePasswordOut } from '../models/UserChangePasswordOut';
import type { UserIn } from '../models/UserIn';
import type { UserLoginIn } from '../models/UserLoginIn';
import type { UserLoginOut } from '../models/UserLoginOut';
import type { UserOut } from '../models/UserOut';
import type { UserUpdateIn } from '../models/UserUpdateIn';
import type { UserUpdateOut } from '../models/UserUpdateOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Login User
     * @param requestBody 
     * @returns UserLoginOut Successful Response
     * @throws ApiError
     */
    public static loginUserUsersLoginPost(
requestBody: UserLoginIn,
): CancelablePromise<UserLoginOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Users
     * @param email 
     * @param id 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getUsersUsersGet(
email?: string,
id?: string,
): CancelablePromise<(Array<UserOut> | UserOut)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/',
            query: {
                'email': email,
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create User
     * @param requestBody 
     * @returns UserOut Successful Response
     * @throws ApiError
     */
    public static createUserUsersPost(
requestBody: UserIn,
): CancelablePromise<UserOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update User
     * @param userId 
     * @param requestBody 
     * @returns UserUpdateOut Successful Response
     * @throws ApiError
     */
    public static updateUserUsersUserIdPut(
userId: string,
requestBody: UserUpdateIn,
): CancelablePromise<UserUpdateOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete User
     * @param userId 
     * @returns UserOut Successful Response
     * @throws ApiError
     */
    public static deleteUserUsersUserIdDelete(
userId: string,
): CancelablePromise<UserOut> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Change Password User
     * @param userId 
     * @param requestBody 
     * @returns UserChangePasswordOut Successful Response
     * @throws ApiError
     */
    public static changePasswordUserUsersChangePasswordUserIdPut(
userId: string,
requestBody: UserChangePasswordIn,
): CancelablePromise<UserChangePasswordOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users/change_password/{user_id}',
            path: {
                'user_id': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}