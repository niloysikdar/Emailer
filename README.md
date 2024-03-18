# Emailer ✉️

Version Controlled Transactional Email Service with Sending, tracking, managing templates and versions, and analytics features. Built on a Single Day (Sunday) 💻 🚀

## Features

- Create Email Templates with Drag-and-Drop Email Editor and save them
- Manage different formats/versions of it and mark anyone active
- Send Transactional Emails by selecting the Templates
- Track Delivery status, Email open and Link Clicks
- Dashboard for emails and detailed view with useful data
- Useful Sending Analytics with numbers and Charts

## Tech Stack Used

- Next.js v14 for the entire application
- TypeScript for type safety
- Tailwind CSS for styling
- Radix UI (Shadcn UI) for components
- PostgreSQL for the database
- Drizzle ORM for managing DB schema and migrations
- Route Handlers, Server Actions, and React Server Components (RSC) for data fetching and mutations
- `@tanstack/react-query` for client-side data fetching and caching
- React-hook-form for form handling and Zod for form validation
- Postmark APIs for sending and tracking emails
- `react-email-editor` by Unlayer for editing email templates

## DB Schema

![DB Schema](/images/schema.png)

## Local Dev

I used a Vercel Serverless Postgres DB for this project. You can use any other Postgres DB as well. Just update the connection string or the database credentials in the `.env` file.

Create an account on [Postmark](https://postmarkapp.com) and get the server token. You can use it for sending emails.

Create `.env` and `.env.local` files with the following content

```bash
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NO_SSL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""

POSTMARK_SERVER_TOKEN=""
```

Install packages:

```bash
pnpm install
```

Run the existing migrations from the `migrations` folder and sync the DB with the DB schema.:

```bash
pnpm migrate
```

Open Drizzle Studio, create a new User, get the ID and use it in the `.env` file.

```bash
pnpm studio
```

Update the `.env` and `.env.local` files:

```bash
TESTUSER_ID=""
TESTUSER_NAME=""
TESTUSER_EMAIL=""
```

Run dev server:

```bash
pnpm dev
```

Reverse Proxy for tunnelling the webhook requests:

```bash
ngrok  http  3000
```

Update the webhook URL in the Postmark account settings.

```bash
https://<ngrok-url>/api/webhook
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Screenshots

### Dashboard and Detailed View

<p align="left">
<img src="https://imgur.com/Ec1Kvey.png" width="400">
<img src="https://imgur.com/iuzqY2m.png" width="400">
</p>

### Send Email and Sending Analytics

<p align="left">
<img src="https://imgur.com/RyHxMa6.png" width="400">
<img src="https://imgur.com/MDQlAPP.png" width="400">
</p>

### Email Templates and Create a New Template

<p align="left">
<img src="https://imgur.com/tm7sC2M.png" width="400">
<img src="https://imgur.com/b3VcYV0.png" width="400">
</p>

### Template Versions and Email Editor

<p align="left">
<img src="https://imgur.com/Sf1oZKg.png" width="400">
<img src="https://imgur.com/K08T4vP.png" width="400">
</p>

### Useful Metadata

<p align="left">
<img src="https://imgur.com/3mZIdZ4.png" width="400">
</p>

## Happy Building and Hacking! 💻 🚀
