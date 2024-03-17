import * as postmark from "postmark";

const serverToken = process.env.POSTMARK_SERVER_TOKEN!;

export const postmarkClient = new postmark.ServerClient(serverToken);
