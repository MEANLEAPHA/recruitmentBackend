"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const prisma_types_1 = require("../common/prisma-types");
let JobService = class JobService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.job.findMany({
            include: { client: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const job = await this.prisma.job.findUnique({
            where: { id },
            include: { client: true, applications: true },
        });
        if (!job)
            throw new common_1.NotFoundException(`Job with id ${id} not found`);
        return job;
    }
    async createJob(createJobDto) {
        return this.prisma.job.create({
            data: {
                clientId: createJobDto.clientId,
                title: createJobDto.title,
                description: createJobDto.description,
                employmentType: createJobDto.employmentType,
                industryId: createJobDto.industryId,
                location: createJobDto.location,
                salary: createJobDto.salary,
                requestedCount: createJobDto.requestedCount,
                cvCap: createJobDto.requestedCount * 2,
            },
        });
    }
    async updateJob(id, updateJobDto) {
        await this.findOne(id);
        return this.prisma.job.update({
            where: { id },
            data: {
                title: updateJobDto.title,
                description: updateJobDto.description,
                employmentType: updateJobDto.employmentType,
                industryId: updateJobDto.industryId,
                location: updateJobDto.location,
                salary: updateJobDto.salary,
                requestedCount: updateJobDto.requestedCount,
                cvCap: updateJobDto.requestedCount * 2,
            },
        });
    }
    async removeJob(id) {
        await this.findOne(id);
        await this.prisma.job.delete({ where: { id } });
    }
    async updateOne(id, patchSalaryDto) {
        await this.findOne(id);
        return this.prisma.job.update({
            where: { id },
            data: {
                ...(patchSalaryDto.salary !== undefined && { salary: patchSalaryDto.salary }),
                ...(patchSalaryDto.status !== undefined && { status: patchSalaryDto.status }),
            },
        });
    }
    async checkAndAutoClose(jobId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
            include: { _count: { select: { applications: true } } },
        });
        if (job && job._count.applications >= (job.cvCap ?? 0) && job.status === prisma_types_1.JobStatus.OPEN) {
            await this.prisma.job.update({
                where: { id: jobId },
                data: { status: prisma_types_1.JobStatus.CLOSED },
            });
        }
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JobService);
//# sourceMappingURL=job.service.js.map