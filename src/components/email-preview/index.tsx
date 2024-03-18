export function EmailPreview({ title, html }: { title: string; html: string }) {
  return (
    <div>
      <h2 className="text-lg font-semibold">Email Preview</h2>
      <p className="font-medium mt-1 mb-3">{title}</p>

      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="h-[80vh] border overflow-y-scroll overflow-x-hidden"
      ></div>
    </div>
  );
}
