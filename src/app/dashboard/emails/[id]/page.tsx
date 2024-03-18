import { EmailDetails } from "@/components/email-details";
import { EmailLinkClickDetails } from "@/components/email-link-clicks";
import { EmailOpensDetails } from "@/components/email-open-details";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function EmailDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const emailId = params.id;

  return (
    <div className="space-y-4">
      <Suspense fallback={<Skeleton className="h-60 w-[80vw]" />}>
        <EmailDetails emailId={emailId} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-60 w-[80vw]" />}>
        <EmailOpensDetails emailId={emailId} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-60 w-[80vw]" />}>
        <EmailLinkClickDetails emailId={emailId} />
      </Suspense>
    </div>
  );
}
