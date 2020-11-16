# Migration `20201112144901-user-1`

This migration has been generated at 11/12/2020, 8:19:01 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "users" ADD COLUMN     "quizes" INTEGER[]
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201112131448-quiz-4..20201112144901-user-1
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
@@ -50,8 +50,10 @@
   image         String?
   createdAt     DateTime  @default(now()) @map(name: "created_at")
   updatedAt     DateTime  @default(now()) @map(name: "updated_at")
+  quizes        Int[]
+
   @@map(name: "users")
 }
 model VerificationRequest {
```


