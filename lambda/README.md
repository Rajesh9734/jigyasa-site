# Contact Form Lambda

This Lambda saves each contact form submission to DynamoDB and then sends an email notification through Resend.

## Required Lambda runtime

Use Node.js 18 or newer. The code uses the built-in `fetch` API.

## Environment variables

Set these in the Lambda configuration:

```text
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM=Jigyasa Website <notifications@jigyasacapital.com>
NOTIFICATION_TO=jigyasacapital@jigyasacapital.com
```

`RESEND_FROM` must use a domain or sender verified in Resend. For production, verify `jigyasacapital.com` in Resend DNS before using `notifications@jigyasacapital.com`.

## Resend setup

1. Create a Resend account.
2. Add and verify `jigyasacapital.com` in Resend.
3. Add the DNS records Resend gives you.
4. Create an API key.
5. Add the API key to Lambda as `RESEND_API_KEY`.
6. Replace the current Lambda code with `contact-handler-resend.mjs`.

The website does not need to change as long as `config/site.ts` still points to the same API Gateway endpoint.
