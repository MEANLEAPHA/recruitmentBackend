import { EmploymentType } from '@prisma/client';
export declare class CreateJobDto {
    clientId: number;
    title: string;
    description: string;
    employmentType: EmploymentType;
    industryId?: number;
    location?: string;
    requestedCount: number;
}
