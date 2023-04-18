/*
  Warnings:

  - The values [nodejs] on the enum `programming_languages` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "programming_languages_new" AS ENUM ('cpp', 'java', 'python3', 'c');
ALTER TABLE "execution_submissions" ALTER COLUMN "programming_language" TYPE "programming_languages_new" USING ("programming_language"::text::"programming_languages_new");
ALTER TYPE "programming_languages" RENAME TO "programming_languages_old";
ALTER TYPE "programming_languages_new" RENAME TO "programming_languages";
DROP TYPE "programming_languages_old";
COMMIT;
