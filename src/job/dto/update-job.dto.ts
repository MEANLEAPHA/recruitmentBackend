import { IsEnum, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';
import { EmploymentType } from '../../common/prisma-types';

export class UpdateJobDto {
  @IsString()
  @Length(3, 150)
  title: string;

  @IsString()
  @Length(10, 5000)
  description: string;

  @IsEnum(EmploymentType)
  employmentType: EmploymentType;

  @IsOptional()
  @IsInt()
  industryId?: number;

  @IsOptional()
  @IsString()
  @Length(2, 150)
  location?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  salary?: number;

  @IsInt()
  @Min(1)
  requestedCount: number;
}