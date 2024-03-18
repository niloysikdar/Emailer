ALTER TABLE "email_opens" ALTER COLUMN "opened_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "email_opens" ALTER COLUMN "opened_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "link_clicks" ALTER COLUMN "clicked_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "link_clicks" ALTER COLUMN "clicked_at" SET NOT NULL;