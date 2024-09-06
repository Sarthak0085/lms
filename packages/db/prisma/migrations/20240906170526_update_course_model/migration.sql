/*
  Warnings:

  - You are about to drop the column `markAsCompleted` on the `Content` table. All the data in the column will be lost.
  - The `type` column on the `Content` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `categories` on the `courses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('FOLDER', 'VIDEO', 'NOTION');

-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('PUBLISHED', 'ARCHIEVED');

-- AlterEnum
ALTER TYPE "Level" ADD VALUE 'EXPERT';

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "markAsCompleted",
DROP COLUMN "type",
ADD COLUMN     "type" "ContentType" NOT NULL DEFAULT 'FOLDER';

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "categories",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MarkAsCompleted" (
    "id" TEXT NOT NULL,
    "markAsCopleted" BOOLEAN NOT NULL DEFAULT false,
    "contentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MarkAsCompleted_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MarkAsCompleted_userId_contentId_key" ON "MarkAsCompleted"("userId", "contentId");

-- CreateIndex
CREATE UNIQUE INDEX "courses_slug_key" ON "courses"("slug");

-- AddForeignKey
ALTER TABLE "MarkAsCompleted" ADD CONSTRAINT "MarkAsCompleted_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarkAsCompleted" ADD CONSTRAINT "MarkAsCompleted_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
