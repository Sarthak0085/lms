/*
  Warnings:

  - You are about to drop the column `name` on the `courses` table. All the data in the column will be lost.
  - Added the required column `subTitle` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "CourseStatus" ADD VALUE 'DRAFT';

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "name",
ADD COLUMN     "subTitle" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
