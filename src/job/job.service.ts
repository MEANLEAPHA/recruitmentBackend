import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PatchSalaryDto } from './dto/patch-job.dto';
import { JobStatus } from '@prisma/client';
import { SearchJobDto } from './dto/search-job.dto';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

async searchJobs(dto: SearchJobDto) {

  // search logic
  if (dto.search) {
    
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 20;
    const skip = (page - 1) * limit;

    const where = {
      OR: [
        { title: { contains: dto.search, mode: 'insensitive' as const } },
        { client: { companyName: { contains: dto.search, mode: 'insensitive' as const } } },
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
  const skip = (page -1) * limit;

  const where: any = {
    status: 'OPEN',
  };

  if(dto.employmentType?.length){
    where.employmentType = {in: dto.employmentType};
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

  async findOne(id: number) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: { client: true, applications: true },
    });

    if (!job) throw new NotFoundException(`Job with id ${id} not found`);
    return job;
  }

  // async createJob(createJobDto: CreateJobDto) {
  //   return this.prisma.job.create({
  //     data: {
  //       clientId: createJobDto.clientId,
  //       title: createJobDto.title,
  //       description: createJobDto.description,
  //       employmentType: createJobDto.employmentType,
  //       industryId: createJobDto.industryId,
  //       location: createJobDto.location,
  //       salary: createJobDto.salary,
  //       requestedCount: createJobDto.requestedCount,
  //       // rule confirmed: cap auto-calculated as 2x requested, staff can override later via patch/update
  //       cvCap: createJobDto.requestedCount * 2,
  //     },
  //   });
  // }

  // async updateJob(id: number, updateJobDto: UpdateJobDto) {
  //   await this.findOne(id); // throws 404 if missing, same behavior style as your original

  //   return this.prisma.job.update({
  //     where: { id },
  //     data: {
  //       title: updateJobDto.title,
  //       description: updateJobDto.description,
  //       employmentType: updateJobDto.employmentType,
  //       industryId: updateJobDto.industryId,
  //       location: updateJobDto.location,
  //       salary: updateJobDto.salary,
  //       requestedCount: updateJobDto.requestedCount,
  //       cvCap: updateJobDto.requestedCount * 2,
  //     },
  //   });
  // }

  async removeJob(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.job.delete({ where: { id } });
  }

  // async updateOne(id: number, patchSalaryDto: PatchSalaryDto) {
  //   await this.findOne(id);

  //   return this.prisma.job.update({
  //     where: { id },
  //     data: {
  //       ...(patchSalaryDto.salary !== undefined && { salary: patchSalaryDto.salary }),
  //       ...(patchSalaryDto.status !== undefined && { status: patchSalaryDto.status }),
  //     },
  //   });
  // }

  /**
   * Called after every new application is created (job.controller for Application module will call this).
   * Auto-closes job once cvCap is hit — staff can still manually PATCH status back to OPEN.
   */
  async checkAndAutoClose(jobId: number) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: { _count: { select: { applications: true } } },
    });

    if (job && job._count.applications >= (job.cvCap ?? 0) && job.status === JobStatus.OPEN) {
      await this.prisma.job.update({
        where: { id: jobId },
        data: { status: JobStatus.CLOSED },
      });
    }
  }
}