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
  ID: number;
  Type: string;
  RecordType: "Bounce";
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
  MessageStream: "outbound";
  Content: string;
  Name: string;
  Description: string;
  Metadata: any;
};
