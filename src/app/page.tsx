import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { users } from "@/schema/auth";

export default async function Home() {
  const allUsers = await db.select().from(users);

  return (
    <main className="min-h-dvh">
      <pre>{JSON.stringify(allUsers, null, 2)}</pre>
      <Button>Click me</Button>
    </main>
  );
}
