import { JobStatus } from "@prisma/client";
export const EXTERNAL_JOB =  'External Job';

export interface IJob {
    id: number;
    title: string;
    description: string;
    htmlDescription?: string;
    status: JobStatus | string; 
    email: string;
    external?: boolean;
    externalLink?: string;
}