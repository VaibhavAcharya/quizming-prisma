# Migration `20201112131313-quiz-3`

This migration has been generated at 11/12/2020, 6:43:13 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "quizes" DROP COLUMN "options",
DROP COLUMN "answer",
ADD COLUMN     "questions" TEXT[]
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201112123052-quiz-struct-2..20201112131313-quiz-3
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
@@ -68,10 +68,9 @@
 model Quiz {
   id         Int      @id @default(autoincrement())
   userId     Int      @map(name: "user_id")
   title      String
-  options    String[]
-  answer     String
+  questions  String[]
   createdAt  DateTime @default(now()) @map(name: "created_at")
   started    Boolean  @default(false)
   finished   Boolean  @default(false)
   candidates Json?
```


