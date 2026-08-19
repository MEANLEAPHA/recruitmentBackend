/*
  Warnings:

  - You are about to drop the column `companyName` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `job` table. All the data in the column will be lost.
  - The `employment_type` column on the `job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[auth_provider,provider_id]` on the table `candidate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth_provider` to the `candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_name` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `industry_id` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULLTIME', 'PARTTIME', 'CONTRACT', 'INTERNSHIP', 'TEMPORARY');

-- AlterTable
ALTER TABLE "candidate" ADD COLUMN     "auth_provider" VARCHAR(100) NOT NULL,
ADD COLUMN     "is_verified" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "pin_attempts" INTEGER,
ADD COLUMN     "pin_code" BIGINT,
ADD COLUMN     "pin_created_at" TIMESTAMPTZ,
ADD COLUMN     "provider_id" VARCHAR(100),
ADD COLUMN     "reset_verified" INTEGER;

-- AlterTable
ALTER TABLE "client" DROP COLUMN "companyName",
ADD COLUMN     "banner_url" TEXT,
ADD COLUMN     "company_detail" TEXT,
ADD COLUMN     "company_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "facebook_link" VARCHAR(255),
ADD COLUMN     "industry_id" INTEGER NOT NULL,
ADD COLUMN     "instagram_link" VARCHAR(255),
ADD COLUMN     "linkedin_link" VARCHAR(255),
ADD COLUMN     "location" VARCHAR(255),
ADD COLUMN     "logo_url" TEXT,
ADD COLUMN     "teamSize" BIGINT,
ADD COLUMN     "tiktok_link" VARCHAR(255),
ADD COLUMN     "website_link" VARCHAR(255),
ADD COLUMN     "youtube_link" VARCHAR(255);

-- AlterTable
ALTER TABLE "job" DROP COLUMN "industry",
ADD COLUMN     "industry_id" INTEGER,
ALTER COLUMN "description" DROP NOT NULL,
DROP COLUMN "employment_type",
ADD COLUMN     "employment_type" "EmploymentType" NOT NULL DEFAULT 'FULLTIME',
ALTER COLUMN "cv_cap" DROP NOT NULL;

-- AlterTable
ALTER TABLE "report" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "industry" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "industry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "reason" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "industry_name_key" ON "industry"("name");

-- CreateIndex
CREATE INDEX "application_candidate_id_idx" ON "application"("candidate_id");

-- CreateIndex
CREATE INDEX "application_status_idx" ON "application"("status");

-- CreateIndex
CREATE INDEX "application_reviewed_by_id_idx" ON "application"("reviewed_by_id");

-- CreateIndex
CREATE INDEX "candidate_phone_idx" ON "candidate"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_auth_provider_provider_id_key" ON "candidate"("auth_provider", "provider_id");

-- CreateIndex
CREATE INDEX "client_industry_id_idx" ON "client"("industry_id");

-- CreateIndex
CREATE INDEX "job_client_id_idx" ON "job"("client_id");

-- CreateIndex
CREATE INDEX "job_industry_id_idx" ON "job"("industry_id");

-- CreateIndex
CREATE INDEX "job_status_idx" ON "job"("status");

-- CreateIndex
CREATE INDEX "magic_link_token_client_id_idx" ON "magic_link_token"("client_id");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_industry_id_fkey" FOREIGN KEY ("industry_id") REFERENCES "industry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magic_link_token" ADD CONSTRAINT "magic_link_token_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_industry_id_fkey" FOREIGN KEY ("industry_id") REFERENCES "industry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_reviewed_by_id_fkey" FOREIGN KEY ("reviewed_by_id") REFERENCES "mr_staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
