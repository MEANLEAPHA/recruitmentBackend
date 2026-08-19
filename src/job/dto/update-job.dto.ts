import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class UpdateJobDto {
  @IsString()
  @Length(3, 150)
  title: string;

  @IsString()
  @Length(10, 5000)
  description: string;

  @IsString()
  @Length(2, 50)
  employmentType: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  industry?: string;

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