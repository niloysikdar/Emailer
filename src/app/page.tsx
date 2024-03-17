import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh flex justify-center items-center">
      <Link href="/dashboard" passHref>
        <Button size="lg">
          Go to Dashboard
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </Link>
    </main>
  );
}
