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
exports.SearchJobDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
class SearchJobDto {
    search;
    employmentType;
    industryIds;
    provinceIds;
    clientIds;
    salaryMin;
    salaryMax;
    page = 1;
    limit = 20;
}
exports.SearchJobDto = SearchJobDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchJobDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value : String(value).split(','))),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(client_1.EmploymentType, { each: true }),
    __metadata("design:type", Array)
], SearchJobDto.prototype, "employmentType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const arr = Array.isArray(value) ? value : String(value).split(",");
        return arr.map((v) => parseInt(v, 10)).filter((n) => !isNaN(n));
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SearchJobDto.prototype, "industryIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const arr = Array.isArray(value) ? value : String(value).split(",");
        return arr.map((v) => parseInt(v, 10)).filter((n) => !isNaN(n));
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SearchJobDto.prototype, "provinceIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        const arr = Array.isArray(value) ? value : String(value).split(",");
        return arr.map((v) => parseInt(v, 10)).filter((n) => !isNaN(n));
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SearchJobDto.prototype, "clientIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SearchJobDto.prototype, "salaryMin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SearchJobDto.prototype, "salaryMax", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], SearchJobDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], SearchJobDto.prototype, "limit", void 0);
//# sourceMappingURL=search-job.dto.js.map