import { AllSentEmails } from "@/components/all-sent-emails";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Send } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function EmailsPage() {
  return (
    <div>
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold">All Sent Emails</h2>

        <Link href="/dashboard/send-email" passHref>
          <Button>
            Send New Email
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="flex flex-col gap-3 mt-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        }
      >
        <AllSentEmails />
      </Suspense>
    </div>
  );
}
