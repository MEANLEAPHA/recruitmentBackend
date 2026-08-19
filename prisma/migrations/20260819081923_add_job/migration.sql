/*
  Warnings:

  - The values [CONTRACT,TEMPORARY] on the enum `EmploymentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EmploymentType_new" AS ENUM ('FULLTIME', 'PARTTIME', 'INTERNSHIP');
ALTER TABLE "public"."job" ALTER COLUMN "employment_type" DROP DEFAULT;
ALTER TABLE "job" ALTER COLUMN "employment_type" TYPE "EmploymentType_new" USING ("employment_type"::text::"EmploymentType_new");
ALTER TYPE "EmploymentType" RENAME TO "EmploymentType_old";
ALTER TYPE "EmploymentType_new" RENAME TO "EmploymentType";
DROP TYPE "public"."EmploymentType_old";
ALTER TABLE "job" ALTER COLUMN "employment_type" SET DEFAULT 'FULLTIME';
COMMIT;
