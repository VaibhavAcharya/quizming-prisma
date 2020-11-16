# Migration `20201112114643-quizcorrection`

This migration has been generated at 11/12/2020, 5:16:43 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."quizes" DROP CONSTRAINT "quizes_userId_fkey"

ALTER TABLE "public"."quizes" DROP COLUMN "userId"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201112114400-quiz..20201112114643-quizcorrection
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
@@ -67,9 +67,8 @@
 model Quiz {
   id Int @id @default(autoincrement())
   title String
-  user User
   createdAt DateTime @default(now()) @map(name: "created_at")
   started Boolean @default(false)
   finished Boolean @default(false)
   candidates Json?
```


