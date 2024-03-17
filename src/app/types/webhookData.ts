export type DeliveryWebhookData = {
  RecordType: "Delivery";
  MessageStream: "outbound";
  ServerID: number;
  MessageID: string;
  Recipient: string;
  Tag: string;
  DeliveredAt: string;
  Details: string;
  Metadata: any;
};

export type BounceWebhookData = {
  RecordType: "Bounce";
  MessageStream: "outbound";
  ID: number;
  Type: string;
  TypeCode: number;
  Tag: string;
  MessageID: string;
  Details: string;
  Email: string;
  From: string;
  BouncedAt: string;
  Inactive: boolean;
  DumpAvailable: boolean;
  CanActivate: boolean;
  Subject: string;
  ServerID: number;
  Content: string;
  Name: string;
  Description: string;
  Metadata: any;
};

export type OpenWebhookData = {
  RecordType: "Open";
  MessageStream: "outbound";
  FirstOpen: boolean;
  Client: { Name: string; Company: string; Family: string };
  OS: {
    Name: string;
    Company: string;
    Family: string;
  };
  Platform: string;
  UserAgent: string;
  ReadSeconds: number;
  Geo: any | null;
  MessageID: string;
  ReceivedAt: string;
  Tag: string;
  Recipient: string;
  Metadata: any | null;
};
