/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Role } from './Role';

export type UserUpdateIn = {
    email: string;
    full_name: string;
    role: Role;
};