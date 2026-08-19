import { JobStatus } from '@prisma/client';
export declare class PatchSalaryDto {
    salary?: number;
    status?: JobStatus;
}
