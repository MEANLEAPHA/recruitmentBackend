import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { JobStatus } from '../../common/prisma-types';

export class PatchSalaryDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  salary?: number;

  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;
}