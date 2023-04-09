-- CreateEnum
CREATE TYPE "programming_languages" AS ENUM ('cpp', 'java', 'python3', 'nodejs', 'c');

-- CreateEnum
CREATE TYPE "submission_status" AS ENUM ('created', 'queued_for_execution', 'executing', 'something_went_wrong', 'task_completed');

-- CreateEnum
CREATE TYPE "execution_status" AS ENUM ('memory_limit_exceeded', 'runtime_error', 'successful_execution', 'unknown_status');

-- CreateTable
CREATE TABLE "execution_submissions" (
    "submission_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "programming_language" "programming_languages" NOT NULL,
    "submission_status" "submission_status" NOT NULL DEFAULT 'created',
    "typed_code" TEXT NOT NULL,
    "data_input" TEXT[],
    "compilation_error" TEXT,
    "execution_status" "execution_status"[],
    "execution_output" TEXT[],
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3) NOT NULL,
    "metadata" TEXT,

    CONSTRAINT "execution_submissions_pkey" PRIMARY KEY ("submission_id")
);
