import { JobStatus } from '../../common/prisma-types';
export declare class PatchSalaryDto {
    salary?: number;
    status?: JobStatus;
}
