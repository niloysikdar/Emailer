import { SendEmailForm } from "@/components/send-email/send-form";

export default function SendEmailPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold">Send a New Email</h2>

      <div className="w-full max-w-lg mt-10">
        <SendEmailForm />
      </div>
    </div>
  );
}
