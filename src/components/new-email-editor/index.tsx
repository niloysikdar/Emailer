"use client";

import React, { useRef, useState } from "react";

import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import sample from "./sample.json";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Save, ArrowLeft, Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { saveHTMLTemplate } from "@/actions/saveHTMLTemplate";
import { toast } from "sonner";

export function NewEmailEditor({ templateId }: { templateId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "New Template";
  const loadSampleDesign = searchParams.get("loadSampleDesign") === "true";
  const emailEditorRef = useRef<EditorRef | null>(null);
  const [preview, setPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  //   const saveDesign = () => {
  //     const unlayer = emailEditorRef.current?.editor;

  //     unlayer?.saveDesign((design: any) => {
  //       console.log("saveDesign", design);
  //       alert("Design JSON has been logged in your developer console.");
  //     });
  //   };

  const togglePreview = () => {
    const unlayer = emailEditorRef.current?.editor;

    if (preview) {
      unlayer?.hidePreview();
      setPreview(false);
    } else {
      unlayer?.showPreview({ device: "desktop" });
      setPreview(true);
    }
  };

  const onDesignLoad = (data: any) => {
    console.log("onDesignLoad", data);
  };

  const onLoad: EmailEditorProps["onLoad"] = (unlayer) => {
    console.log("onLoad", unlayer);
    unlayer.addEventListener("design:loaded", onDesignLoad);

    if (loadSampleDesign) unlayer.loadDesign(sample as any);
  };

  const onReady: EmailEditorProps["onReady"] = (unlayer) => {
    console.log("onReady", unlayer);
  };

  async function saveTemplate() {
    if (isSaving) return;

    setIsSaving(true);
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml(async (data) => {
      const { design, html } = data;

      const { success } = await saveHTMLTemplate({
        title: name,
        htmlContent: html,
        designJSON: design,
        templateId: templateId,
      });

      if (success) {
        toast.success("Template saved successfully");
        router.replace(`/dashboard/templates/${templateId}`);
      } else {
        toast.error("Failed to save template");
      }

      setIsSaving(false);
    });

    setIsSaving(false);
  }

  return (
    <div className="flex flex-col relative h-[87vh]">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-8">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <p className="text-lg font-semibold">{name}</p>
        </div>

        <div className="flex gap-4">
          {!loadSampleDesign && (
            <Button
              variant="outline"
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set("loadSampleDesign", "true");
                window.location.href = `${pathname}?${params.toString()}`;
              }}
            >
              Load Sample Design
            </Button>
          )}
          <Button variant="secondary" onClick={togglePreview}>
            {preview ? (
              <EyeOff className="h-4 w-4 mr-2" />
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            {preview ? "Hide" : "Show"} Preview
          </Button>
          <Button disabled={isSaving} onClick={() => saveTemplate()}>
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Design
          </Button>
        </div>
      </div>

      <React.StrictMode>
        <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
      </React.StrictMode>
    </div>
  );
}
