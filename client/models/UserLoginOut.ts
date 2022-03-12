/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';

export type UserLoginOut = {
    id?: string;
    email: string;
    full_name: string;
    role: Role;
    jwt?: string;
};