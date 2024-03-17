import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh flex justify-center items-center">
      <Link href="/dashboard" passHref>
        <Button>Go to Dashboard</Button>
      </Link>
    </main>
  );
}
