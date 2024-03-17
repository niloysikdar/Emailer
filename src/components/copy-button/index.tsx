"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import copy from "copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
};

export function CopyButton({ text }: { text: string }) {
  const [copying, setCopying] = useState<number>(0);

  const onCopy = useCallback(() => {
    if (!!copying) return;
    copy(text);
    toast.success("Copied to clipboard");
    setCopying((c) => c + 1);
    setTimeout(() => {
      setCopying((c) => c - 1);
    }, 2000);
  }, [text, copying]);

  return (
    <Button
      size="icon"
      variant="outline"
      aria-label="Copy code"
      onClick={onCopy}
      disabled={!!copying}
    >
      <MotionConfig transition={{ duration: 0.15 }}>
        <AnimatePresence initial={false} mode="wait">
          {copying ? (
            <motion.div
              animate="visible"
              exit="hidden"
              initial="hidden"
              key="check"
              variants={variants}
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                shapeRendering="geometricPrecision"
              >
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </motion.div>
          ) : (
            <motion.div
              animate="visible"
              exit="hidden"
              initial="hidden"
              key="copy"
              variants={variants}
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                shapeRendering="geometricPrecision"
              >
                <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"></path>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </Button>
  );
}
