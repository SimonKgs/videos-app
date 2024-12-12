-- CreateEnum
CREATE TYPE "AccessMode" AS ENUM ('public', 'private');

-- CreateEnum
CREATE TYPE "VideoType" AS ENUM ('upload');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "accessMode" "AccessMode" NOT NULL,
    "assetId" TEXT NOT NULL,
    "bytes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "folder" TEXT,
    "format" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT,
    "publicId" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "secureUrl" TEXT NOT NULL,
    "timesWatched" INTEGER NOT NULL DEFAULT 0,
    "type" "VideoType" NOT NULL,
    "url" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Video_assetId_key" ON "Video"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "Video_publicId_key" ON "Video"("publicId");

-- CreateIndex
CREATE INDEX "Video_accessMode_idx" ON "Video"("accessMode");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
