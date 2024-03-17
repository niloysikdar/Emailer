"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function MakeActiveButton({ isActive }: { isActive: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={isActive || pending}
      variant="outline"
      className="w-28"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Make Active"}
    </Button>
  );
}
