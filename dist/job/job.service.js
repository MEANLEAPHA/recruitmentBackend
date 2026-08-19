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
const client_1 = require("@prisma/client");
let JobService = class JobService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchJobs(dto) {
        if (dto.search) {
            const page = dto.page ?? 1;
            const limit = dto.limit ?? 20;
            const skip = (page - 1) * limit;
            const where = {
                OR: [
                    { title: { contains: dto.search, mode: 'insensitive' } },
                    { client: { companyName: { contains: dto.search, mode: 'insensitive' } } },
                ],
            };
            const [jobs, total] = await Promise.all([
                this.prisma.job.findMany({
                    where,
                    include: { client: true },
                    orderBy: { createdAt: 'desc' },
                    skip: Number(skip),
                    take: Number(limit),
                }),
                this.prisma.job.count({ where }),
            ]);
            return { jobs, total, page, limit, totalPages: Math.ceil(total / limit) };
        }
        const page = dto.page ?? 1;
        const limit = dto.limit ?? 20;
        const skip = (page - 1) * limit;
        const where = {
            status: 'OPEN',
        };
        if (dto.employmentType?.length) {
            where.employmentType = { in: dto.employmentType };
        }
        if (dto.industryIds?.length) {
            where.industryId = { in: dto.industryIds };
        }
        if (dto.provinceIds?.length) {
            where.provinceId = { in: dto.provinceIds };
        }
        if (dto.clientIds?.length) {
            where.clientId = { in: dto.clientIds };
        }
        if (dto.salaryMin !== undefined || dto.salaryMax !== undefined) {
            const min = dto.salaryMin ?? 0;
            const max = dto.salaryMax ?? 2147483647;
            where.OR = [
                { salaryType: 'FIXED', salaryFixed: { gte: min, lte: max } },
                { salaryType: 'RANGE', salaryMin: { lte: max }, salaryMax: { gte: min } },
            ];
        }
        const [jobs, total] = await Promise.all([
            this.prisma.job.findMany({
                where,
                include: { client: true, industry: true, province: true },
                orderBy: { createdAt: 'desc' },
                skip: Number(skip),
                take: Number(limit),
            }),
            this.prisma.job.count({ where }),
        ]);
        return {
            jobs,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
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
    async removeJob(id) {
        await this.findOne(id);
        await this.prisma.job.delete({ where: { id } });
    }
    async checkAndAutoClose(jobId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
            include: { _count: { select: { applications: true } } },
        });
        if (job && job._count.applications >= (job.cvCap ?? 0) && job.status === client_1.JobStatus.OPEN) {
            await this.prisma.job.update({
                where: { id: jobId },
                data: { status: client_1.JobStatus.CLOSED },
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