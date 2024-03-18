CREATE TABLE IF NOT EXISTS "email_opens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"open_client_id" text NOT NULL,
	"open_client_platform" text NOT NULL,
	"message_id" text NOT NULL,
	"delivery_status_updated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "emails" ADD PRIMARY KEY ("message_id");--> statement-breakpoint
ALTER TABLE "emails" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "email_opens" ADD CONSTRAINT "email_opens_message_id_emails_message_id_fk" FOREIGN KEY ("message_id") REFERENCES "emails"("message_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
