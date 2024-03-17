DO $$ BEGIN
 CREATE TYPE "delivery_status" AS ENUM('SENDING', 'DELIVERED', 'BOUNCED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "emails" ALTER COLUMN "sent_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "emails" ADD COLUMN "delivery_status" "delivery_status" DEFAULT 'SENDING' NOT NULL;--> statement-breakpoint
ALTER TABLE "emails" ADD COLUMN "delivery_status_updated_at" timestamp with time zone;