import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Body,
  Patch,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PatchSalaryDto } from './dto/patch-job.dto';
import { SearchJobDto } from './dto/search-job.dto';

import { JobService } from './job.service';
import { JobGuard } from './job.guard';

@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}


  @Get('search')
  searchJobs(@Query() searchJobDto: SearchJobDto) {
    return this.jobService.searchJobs(searchJobDto);
  }

  @Get('alljobs')
  displayAllJob() {
    return this.jobService.findAll();
  }

  @Get('onejob/:id')
  searchOneJob(@Param('id', ParseIntPipe) id: number) {
    return this.jobService.findOne(id);
  }

  // NOTE: kept as a stub matching your original — not wired to real filtering yet.
  // Once we implement filtering, this should query prisma.job.findMany with a `where` built from these.
  @Get('jobs')
  findAllJob(
    @Query('title') title: string,
    @Query('employmentType') employmentType: string,
    @Query('industry') industry: string,
    @Query('toSalary') toSalary: number,
    @Query('location') location: string,
  ) {
    return [
      {
        search: title,
        employmentType,
        industry,
        toSalary,
        location,
      },
    ];
  }

  // @Post()
  // createJob(@Body() createJobDto: CreateJobDto) {
  //   return this.jobService.createJob(createJobDto);
  // }

  // @Put(':id')
  // updateJob(@Param('id', ParseIntPipe) id: number, @Body() updateJobDto: UpdateJobDto) {
  //   return this.jobService.updateJob(id, updateJobDto);
  // }

  @Delete(':id')
  @UseGuards(JobGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jobService.removeJob(id);
  }

  // @Patch(':id')
  // updateOnly(@Param('id', ParseIntPipe) id: number, @Body() patchSalaryDto: PatchSalaryDto) {
  //   return this.jobService.updateOne(id, patchSalaryDto);
  // }
}