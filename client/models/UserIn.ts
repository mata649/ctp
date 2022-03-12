/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';

export type UserIn = {
    id?: string;
    email: string;
    full_name: string;
    role: Role;
    password: string;
};