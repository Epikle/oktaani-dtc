-- CreateEnum
CREATE TYPE "Systems" AS ENUM ('Powertrain', 'Network', 'Body', 'Chassis');

-- CreateTable
CREATE TABLE "Dtc" (
    "id" TEXT NOT NULL,
    "codeTitle" TEXT NOT NULL,
    "codeDescription" TEXT NOT NULL,
    "codeLocation" TEXT,
    "systemCode" TEXT NOT NULL,
    "systemTitle" "Systems" NOT NULL,
    "systemName" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "gptInfo" TEXT,

    CONSTRAINT "Dtc_pkey" PRIMARY KEY ("id")
);
