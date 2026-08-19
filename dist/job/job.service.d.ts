import { PrismaService } from '../common/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PatchSalaryDto } from './dto/patch-job.dto';
export declare class JobService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("generated/prisma").Prisma.PrismaPromise<({
        client: {
            id: number;
            createdAt: Date;
            companyName: string;
            contactName: string;
            email: string;
            password: string | null;
            agreementFileUrl: string | null;
            isVerified: boolean;
        };
    } & {
        clientId: number;
        title: string;
        description: string;
        employmentType: string;
        industry: string | null;
        location: string | null;
        salary: number | null;
        requestedCount: number;
        status: import("generated/prisma").$Enums.JobStatus;
        id: number;
        cvCap: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: number): Promise<{
        client: {
            id: number;
            createdAt: Date;
            companyName: string;
            contactName: string;
            email: string;
            password: string | null;
            agreementFileUrl: string | null;
            isVerified: boolean;
        };
        applications: {
            status: import("generated/prisma").$Enums.ApplicationStatus;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            jobId: number;
            candidateId: number;
            cvFileUrl: string;
            stampedCvUrl: string | null;
            reviewedById: number | null;
        }[];
    } & {
        clientId: number;
        title: string;
        description: string;
        employmentType: string;
        industry: string | null;
        location: string | null;
        salary: number | null;
        requestedCount: number;
        status: import("generated/prisma").$Enums.JobStatus;
        id: number;
        cvCap: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createJob(createJobDto: CreateJobDto): Promise<{
        clientId: number;
        title: string;
        description: string;
        employmentType: string;
        industry: string | null;
        location: string | null;
        salary: number | null;
        requestedCount: number;
        status: import("generated/prisma").$Enums.JobStatus;
        id: number;
        cvCap: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateJob(id: number, updateJobDto: UpdateJobDto): Promise<{
        clientId: number;
        title: string;
        description: string;
        employmentType: string;
        industry: string | null;
        location: string | null;
        salary: number | null;
        requestedCount: number;
        status: import("generated/prisma").$Enums.JobStatus;
        id: number;
        cvCap: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    removeJob(id: number): Promise<void>;
    updateOne(id: number, patchSalaryDto: PatchSalaryDto): Promise<{
        clientId: number;
        title: string;
        description: string;
        employmentType: string;
        industry: string | null;
        location: string | null;
        salary: number | null;
        requestedCount: number;
        status: import("generated/prisma").$Enums.JobStatus;
        id: number;
        cvCap: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    checkAndAutoClose(jobId: number): Promise<void>;
}
