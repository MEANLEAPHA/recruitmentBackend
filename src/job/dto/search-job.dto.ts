import { IsArray, IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { EmploymentType } from "@prisma/client";
import { Transform } from "class-transformer";

export class SearchJobDto {

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @Transform(({ value }) => (Array.isArray(value) ? value : String(value).split(',')))
    @IsArray()
    @IsEnum(EmploymentType, { each: true })
    employmentType?: EmploymentType[];

    @IsOptional()
    @Transform(
        ({value}) => {
            const arr = Array.isArray(value) ? value : String(value).split(",");
            return arr.map((v: string) => parseInt(v, 10)).filter((n: number) => !isNaN(n));
        }
    )
    @IsArray()
    industryIds?: number[];


    @IsOptional()
    @Transform(
        ({value}) => {
            const arr = Array.isArray(value) ? value : String(value).split(",");
            return arr.map((v:string) => parseInt(v, 10)).filter((n:number) => !isNaN(n));
        })
    @IsArray()
    provinceIds? : number[];


    @IsOptional()
    @Transform(
        ({value}) => {
            const arr = Array.isArray(value) ? value : String(value).split(",");
            return arr.map((v:string) => parseInt(v, 10)).filter((n:number) => !isNaN(n));
        })
    @IsArray()
    clientIds? : number[];


    @IsOptional()
    @Transform(({value})=> parseInt(value, 10))
    @IsInt()
    @Min(0)
    salaryMin? : number;


    @IsOptional()
    @Transform(({value})=> parseInt(value, 10))
    @IsInt()
    @Min(0)
    salaryMax? : number;


    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(1)
    page?: number = 1;


    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(1)
    limit?: number = 20;

}