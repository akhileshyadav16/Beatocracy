-- CreateTable
CREATE TABLE "CurrentStream" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "StreamId" TEXT NOT NULL,

    CONSTRAINT "CurrentStream_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CurrentStream" ADD CONSTRAINT "CurrentStream_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentStream" ADD CONSTRAINT "CurrentStream_StreamId_fkey" FOREIGN KEY ("StreamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
