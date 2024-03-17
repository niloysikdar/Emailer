"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function CreateTemplateButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Create Template
    </Button>
  );
}
