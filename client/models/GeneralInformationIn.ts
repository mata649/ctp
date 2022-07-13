/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Administrator } from './Administrator';

export type GeneralInformationIn = {
    id?: string;
    email: string;
    telephone: string;
    address: string;
    admission_requirements: string;
    scholarship_requirements: string;
    administrators: Array<Administrator>;
    schedule_link?: string;
    teachers_link?: string;
    carousel_images: Array<string>;
};