import { EmploymentType } from "@prisma/client";
export declare class SearchJobDto {
    search?: string;
    employmentType?: EmploymentType[];
    industryIds?: number[];
    provinceIds?: number[];
    clientIds?: number[];
    salaryMin?: number;
    salaryMax?: number;
    page?: number;
    limit?: number;
}
