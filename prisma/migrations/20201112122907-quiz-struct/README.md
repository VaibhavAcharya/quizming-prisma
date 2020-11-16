# Migration `20201112122907-quiz-struct`

This migration has been generated at 11/12/2020, 5:59:07 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "quizes" ADD COLUMN     "user_id" INTEGER NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201112114643-quizcorrection..20201112122907-quiz-struct
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
@@ -65,13 +65,14 @@
   @@map(name: "verification_requests")
 }
 model Quiz {
-  id Int @id @default(autoincrement())
-  title String
-  createdAt DateTime @default(now()) @map(name: "created_at")
-  started Boolean @default(false)
-  finished Boolean @default(false)
+  id         Int      @id @default(autoincrement())
+  userId     Int      @map(name: "user_id")
+  title      String
+  createdAt  DateTime @default(now()) @map(name: "created_at")
+  started    Boolean  @default(false)
+  finished   Boolean  @default(false)
   candidates Json?
   @@map(name: "quizes")
 }
```


