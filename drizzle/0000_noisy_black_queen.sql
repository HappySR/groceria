CREATE TYPE "public"."role" AS ENUM('admin', 'vendor', 'user');--> statement-breakpoint
CREATE TYPE "public"."weekday" AS ENUM('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun');--> statement-breakpoint
CREATE TABLE "category" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"user_id" varchar(64) NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"properties" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "item" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"vendor_id" varchar(64) NOT NULL,
	"category_id" varchar(64) NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(1000) NOT NULL,
	"price" numeric NOT NULL,
	"properties" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"user_id" varchar(64) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"email" varchar(254) NOT NULL,
	"username" varchar(32) NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"password_hash" varchar(98) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vendor" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"user_id" varchar(64) NOT NULL,
	"name" varchar(64) NOT NULL,
	"start_at" time with time zone NOT NULL,
	"close_at" time with time zone NOT NULL,
	"weekday" "weekday"[] NOT NULL,
	"description" varchar(1000) NOT NULL,
	"address" varchar(256) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"email" varchar(254) NOT NULL,
	"social_media" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item" ADD CONSTRAINT "item_vendor_id_vendor_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."vendor"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item" ADD CONSTRAINT "item_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor" ADD CONSTRAINT "vendor_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_category_name" ON "category" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_item_vendor_id" ON "item" USING btree ("vendor_id");--> statement-breakpoint
CREATE INDEX "idx_item_category_id" ON "item" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "idx_item_name_search" ON "item" USING gin (to_tsvector('english', "name"));--> statement-breakpoint
CREATE INDEX "idx_session_user_id" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_email" ON "user" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_username" ON "user" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_vendor_user_id" ON "vendor" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_vendor_vendorname_search" ON "vendor" USING gin (to_tsvector('english', "name"));--> statement-breakpoint
CREATE INDEX "idx_vendor_email" ON "vendor" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_vendor_phone" ON "vendor" USING btree ("phone");--> statement-breakpoint
CREATE INDEX "idx_vendor_address_search" ON "vendor" USING gin (to_tsvector('english', "address"));