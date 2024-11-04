import { JobStatus } from "@prisma/client";
export interface IJob {
    id: number;
    title: string;
    description: string;
    status: JobStatus; 
    email: string;
}