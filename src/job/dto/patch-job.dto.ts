import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { JobStatus } from '@prisma/client';

export class PatchSalaryDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  salary?: number;

  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;
}