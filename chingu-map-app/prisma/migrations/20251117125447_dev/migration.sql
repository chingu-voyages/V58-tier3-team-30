-- CreateTable
CREATE TABLE "chingu" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3),
    "gender" TEXT,
    "countryCode" TEXT,
    "timezone" TEXT,
    "goal" TEXT,
    "goalOther" TEXT,
    "source" TEXT,
    "sourceOther" TEXT,
    "countryName" TEXT,
    "soloProjectTier" TEXT,
    "roleType" TEXT,
    "voyageRole" TEXT,
    "voyageSignup" TEXT,
    "voyageTier" TEXT,

    CONSTRAINT "chingu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "chingu_countryCode_idx" ON "chingu"("countryCode");
