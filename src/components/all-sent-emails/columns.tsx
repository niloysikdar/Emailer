"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, CheckCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Email } from "@/schema/emails";
import { DeliveryStatusIndicator } from "../delivery-status-indicator";
import { cn } from "@/lib/utils";

function getFormattedDateTime(dateTime: string) {
  const date = new Date(dateTime);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return { date: formattedDate, time: formattedTime };
}

export const columns: ColumnDef<Email>[] = [
  {
    id: "subject",
    header: () => <p className="pl-2">Subject</p>,
    cell: ({ row }) => (
      <p className="max-w-40 truncate pl-2">{row.original.subject}</p>
    ),
  },
  {
    accessorKey: "from",
    header: "From",
  },
  {
    accessorKey: "to",
    header: "To",
  },
  {
    accessorKey: "sentAt",
    header: () => <p className="text-center">Sent At</p>,
    cell: ({ row }) => {
      const val = row.original.sentAt;
      if (!val) return null;
      const { date, time } = getFormattedDateTime(val);

      return (
        <div className="text-center">
          <p>{date}</p>
          <p>{time}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "deliveryStatus",
    header: () => <p className="text-center">Delivery Status</p>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2 min-h-4">
        <DeliveryStatusIndicator status={row.original.deliveryStatus} />
        <span className="capitalize">
          {row.original.deliveryStatus.toLowerCase()}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "deliveryStatusUpdatedAt",
    header: () => <p className="text-center">Status Updated At</p>,
    cell: ({ row }) => {
      const val = row.original.deliveryStatusUpdatedAt;
      if (!val) return null;
      const { date, time } = getFormattedDateTime(val);

      return (
        <div className="text-center">
          <p>{date}</p>
          <p>{time}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "opened",
    header: () => <p className="text-center">Opened</p>,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger>
              <CheckCheck
                className={cn(
                  "h-6 w-6",
                  row.original.opened ? "text-green-500" : "text-gray-500",
                )}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {row.original.opened
                  ? "This email has been opened"
                  : "This email has not been opened yet"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return <Actions data={data} />;
    },
  },
];

function Actions({ data }: { data: Email }) {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={async () => {
              await navigator.clipboard.writeText(data.messageId);
              toast.success("Message Id copied to clipboard");
            }}
          >
            Copy Message Id
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/emails/${data.messageId}`)}
          >
            View Email Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
