"use client";

import { cn } from "@/lib/utils";
import { Card, LineChart, List, ListItem } from "@tremor/react";

const summary = [
  {
    name: "Sent",
    statusColor: "bg-blue-500",
  },
  {
    name: "Delivered",
    statusColor: "bg-green-500",
  },
  {
    name: "Bounced",
    statusColor: "bg-red-500",
  },
] as const;

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

export function AnalyticsLineChart({
  chartData,
  totalCount,
}: {
  chartData: {
    date: string;
    sentCount: number;
    deliveredCount: number;
    bouncedCount: number;
  }[];
  totalCount: {
    Sent: number;
    Delivered: number;
    Bounced: number;
  };
}) {
  return (
    <>
      <Card className="w-full max-w-2xl">
        <LineChart
          data={chartData}
          index="date"
          categories={["sentCount", "deliveredCount", "bouncedCount"]}
          colors={["blue", "green", "red"]}
          valueFormatter={valueFormatter}
          showLegend={true}
          showYAxis={true}
          startEndOnly={false}
          className="mt-6 h-32"
        />
        <List className="mt-2">
          {summary.map((item) => (
            <ListItem key={item.name}>
              <div className="flex items-center space-x-2">
                <span
                  className={cn(item.statusColor, "h-0.5 w-3")}
                  aria-hidden={true}
                />
                <span>Total {item.name}</span>
              </div>
              <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {valueFormatter(totalCount[item.name])}
              </span>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
}
