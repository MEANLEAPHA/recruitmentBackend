import { EmploymentType } from '../../common/prisma-types';
export declare class CreateJobDto {
    clientId: number;
    title: string;
    description: string;
    employmentType: EmploymentType;
    industryId?: number;
    location?: string;
    salary?: number;
    requestedCount: number;
}
