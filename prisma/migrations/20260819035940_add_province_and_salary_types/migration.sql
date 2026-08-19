-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('FIXED', 'RANGE', 'NEGOTIABLE');

-- AlterTable
ALTER TABLE "job" ADD COLUMN     "province_id" INTEGER;

-- CreateTable
CREATE TABLE "province" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "province_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "province_name_key" ON "province"("name");

-- CreateIndex
CREATE INDEX "job_province_id_idx" ON "job"("province_id");

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "province"("id") ON DELETE SET NULL ON UPDATE CASCADE;
