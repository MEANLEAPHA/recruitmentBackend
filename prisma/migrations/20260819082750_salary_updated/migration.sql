/*
  Warnings:

  - You are about to drop the column `salary` on the `job` table. All the data in the column will be lost.
  - Made the column `salary_type` on table `job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "job" DROP COLUMN "salary",
ADD COLUMN     "salary_fixed" INTEGER,
ADD COLUMN     "salary_max" INTEGER,
ADD COLUMN     "salary_min" INTEGER,
ALTER COLUMN "salary_type" SET NOT NULL,
ALTER COLUMN "salary_type" SET DEFAULT 'NEGOTIABLE';
