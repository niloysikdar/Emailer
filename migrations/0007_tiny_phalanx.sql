CREATE TABLE IF NOT EXISTS "link_clicks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"message_id" text NOT NULL,
	"click_location" text NOT NULL,
	"original_link" text NOT NULL,
	"click_client_name" text NOT NULL,
	"click_platform" text NOT NULL,
	"clicked_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "link_clicks" ADD CONSTRAINT "link_clicks_message_id_emails_message_id_fk" FOREIGN KEY ("message_id") REFERENCES "emails"("message_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
