import { SendEmailForm } from "@/components/send-email/send-form";

export default function Page() {
  return (
    <main className="min-h-dvh flex justify-center items-center">
      <div className="w-full max-w-md">
        <SendEmailForm />
      </div>
    </main>
  );
}
