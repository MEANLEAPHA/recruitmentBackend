import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PatchSalaryDto } from './dto/patch-job.dto';
import { JobStatus } from '../../generated/prisma/client';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

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

  async createJob(createJobDto: CreateJobDto) {
    return this.prisma.job.create({
      data: {
        clientId: createJobDto.clientId,
        title: createJobDto.title,
        description: createJobDto.description,
        employmentType: createJobDto.employmentType,
        industry: createJobDto.industry,
        location: createJobDto.location,
        salary: createJobDto.salary,
        requestedCount: createJobDto.requestedCount,
        // rule confirmed: cap auto-calculated as 2x requested, staff can override later via patch/update
        cvCap: createJobDto.requestedCount * 2,
      },
    });
  }

  async updateJob(id: number, updateJobDto: UpdateJobDto) {
    await this.findOne(id); // throws 404 if missing, same behavior style as your original

    return this.prisma.job.update({
      where: { id },
      data: {
        title: updateJobDto.title,
        description: updateJobDto.description,
        employmentType: updateJobDto.employmentType,
        industry: updateJobDto.industry,
        location: updateJobDto.location,
        salary: updateJobDto.salary,
        requestedCount: updateJobDto.requestedCount,
        cvCap: updateJobDto.requestedCount * 2,
      },
    });
  }

  async removeJob(id: number): Promise<void> {
    await this.findOne(id);
    await this.prisma.job.delete({ where: { id } });
  }

  async updateOne(id: number, patchSalaryDto: PatchSalaryDto) {
    await this.findOne(id);

    return this.prisma.job.update({
      where: { id },
      data: {
        ...(patchSalaryDto.salary !== undefined && { salary: patchSalaryDto.salary }),
        ...(patchSalaryDto.status !== undefined && { status: patchSalaryDto.status }),
      },
    });
  }

  /**
   * Called after every new application is created (job.controller for Application module will call this).
   * Auto-closes job once cvCap is hit — staff can still manually PATCH status back to OPEN.
   */
  async checkAndAutoClose(jobId: number) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: { _count: { select: { applications: true } } },
    });

    if (job && job._count.applications >= job.cvCap && job.status === JobStatus.OPEN) {
      await this.prisma.job.update({
        where: { id: jobId },
        data: { status: JobStatus.CLOSED },
      });
    }
  }
}