# Migration `20201112131448-quiz-4`

This migration has been generated at 11/12/2020, 6:44:48 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "quizes" DROP COLUMN "questions",
ADD COLUMN     "questions" JSONB NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201112131313-quiz-3..20201112131448-quiz-4
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -68,9 +68,9 @@
 model Quiz {
   id         Int      @id @default(autoincrement())
   userId     Int      @map(name: "user_id")
   title      String
-  questions  String[]
+  questions  Json
   createdAt  DateTime @default(now()) @map(name: "created_at")
   started    Boolean  @default(false)
   finished   Boolean  @default(false)
   candidates Json?
```


