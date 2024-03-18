ALTER TABLE "email_opens" RENAME COLUMN "open_client_id" TO "open_client_name";--> statement-breakpoint
ALTER TABLE "email_opens" RENAME COLUMN "open_client_platform" TO "open_platform";--> statement-breakpoint
ALTER TABLE "email_opens" RENAME COLUMN "delivery_status_updated_at" TO "opened_at";