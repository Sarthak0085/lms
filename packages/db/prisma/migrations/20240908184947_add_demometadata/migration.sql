-- CreateTable
CREATE TABLE "DemoMetadata" (
    "id" TEXT NOT NULL,
    "muxAssetId" TEXT NOT NULL,
    "playbackUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "duration" INTEGER,
    "status" "VideoStatus" NOT NULL DEFAULT 'PROCESSING',
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DemoMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DemoMetadata_muxAssetId_key" ON "DemoMetadata"("muxAssetId");

-- CreateIndex
CREATE UNIQUE INDEX "DemoMetadata_courseId_key" ON "DemoMetadata"("courseId");

-- AddForeignKey
ALTER TABLE "DemoMetadata" ADD CONSTRAINT "DemoMetadata_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
