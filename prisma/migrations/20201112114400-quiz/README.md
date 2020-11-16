# Migration `20201112114400-quiz`

This migration has been generated at 11/12/2020, 5:14:00 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."quizes" (
"id" SERIAL,
"title" text   NOT NULL ,
"created_at" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"started" boolean   NOT NULL DEFAULT false,
"finished" boolean   NOT NULL DEFAULT false,
"candidates" jsonb   ,
"userId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."quizes" ADD FOREIGN KEY("userId")REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201109055938-init..20201112114400-quiz
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
@@ -63,4 +63,16 @@
   updatedAt  DateTime @default(now()) @map(name: "updated_at")
   @@map(name: "verification_requests")
 }
+
+model Quiz {
+  id Int @id @default(autoincrement())
+  title String
+  user User
+  createdAt DateTime @default(now()) @map(name: "created_at")
+  started Boolean @default(false)
+  finished Boolean @default(false)
+  candidates Json?
+
+  @@map(name: "quizes")
+}
```


