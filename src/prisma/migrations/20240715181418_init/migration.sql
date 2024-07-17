-- DropForeignKey
ALTER TABLE "Games" DROP CONSTRAINT "Games_rateId_fkey";

-- AlterTable
ALTER TABLE "Games" ALTER COLUMN "rateId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_rateId_fkey" FOREIGN KEY ("rateId") REFERENCES "Rate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
