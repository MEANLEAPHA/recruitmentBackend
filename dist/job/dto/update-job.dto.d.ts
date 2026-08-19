import { EmploymentType } from '@prisma/client';
export declare class UpdateJobDto {
    title: string;
    description: string;
    employmentType: EmploymentType;
    industryId?: number;
    location?: string;
    salary?: number;
    requestedCount: number;
}
