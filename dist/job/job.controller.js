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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const common_1 = require("@nestjs/common");
const create_job_dto_1 = require("./dto/create-job.dto");
const update_job_dto_1 = require("./dto/update-job.dto");
const patch_job_dto_1 = require("./dto/patch-job.dto");
const job_service_1 = require("./job.service");
const job_guard_1 = require("./job.guard");
let JobController = class JobController {
    jobService;
    constructor(jobService) {
        this.jobService = jobService;
    }
    displayAllJob() {
        return this.jobService.findAll();
    }
    searchOneJob(id) {
        return this.jobService.findOne(id);
    }
    findAllJob(title, employmentType, industry, toSalary, location) {
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
    createJob(createJobDto) {
        return this.jobService.createJob(createJobDto);
    }
    updateJob(id, updateJobDto) {
        return this.jobService.updateJob(id, updateJobDto);
    }
    remove(id) {
        return this.jobService.removeJob(id);
    }
    updateOnly(id, patchSalaryDto) {
        return this.jobService.updateOne(id, patchSalaryDto);
    }
};
exports.JobController = JobController;
__decorate([
    (0, common_1.Get)('alljobs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JobController.prototype, "displayAllJob", null);
__decorate([
    (0, common_1.Get)('onejob/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "searchOneJob", null);
__decorate([
    (0, common_1.Get)('jobs'),
    __param(0, (0, common_1.Query)('title')),
    __param(1, (0, common_1.Query)('employmentType')),
    __param(2, (0, common_1.Query)('industry')),
    __param(3, (0, common_1.Query)('toSalary')),
    __param(4, (0, common_1.Query)('location')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, String]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "findAllJob", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_dto_1.CreateJobDto]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "createJob", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_job_dto_1.UpdateJobDto]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "updateJob", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(job_guard_1.JobGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, patch_job_dto_1.PatchSalaryDto]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "updateOnly", null);
exports.JobController = JobController = __decorate([
    (0, common_1.Controller)('job'),
    __metadata("design:paramtypes", [job_service_1.JobService])
], JobController);
//# sourceMappingURL=job.controller.js.map