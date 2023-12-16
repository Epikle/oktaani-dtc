-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "dtc";

-- CreateEnum
CREATE TYPE "dtc"."Systems" AS ENUM ('Powertrain', 'Network', 'Body', 'Chassis');

-- CreateTable
CREATE TABLE "dtc"."Dtc" (
    "id" TEXT NOT NULL,
    "codeTitle" TEXT NOT NULL,
    "codeDescription" TEXT NOT NULL,
    "codeLocation" TEXT,
    "systemCode" TEXT NOT NULL,
    "systemTitle" "dtc"."Systems" NOT NULL,
    "systemName" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "gptInfo" TEXT,

    CONSTRAINT "Dtc_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dtc_codeTitle_key" ON "dtc"."Dtc"("codeTitle");
