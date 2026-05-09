import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const sendNotificationEmail = async (submission) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY environment variable");
  }

  const from =
    process.env.RESEND_FROM || "Jigyasa Website <notifications@jigyasacapital.com>";
  const to = process.env.NOTIFICATION_TO || "jigyasacapital@jigyasacapital.com";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: submission.email,
      subject: `New website inquiry from ${submission.name}`,
      text: [
        "New contact form submission",
        "",
        `Name: ${submission.name}`,
        `Phone: ${submission.phone || "Not provided"}`,
        `Email: ${submission.email}`,
        "",
        "Message:",
        submission.message,
      ].join("\n"),
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(submission.phone || "Not provided")}</p>
        <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(submission.message).replaceAll("\n", "<br>")}</p>
      `,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Resend API failed: ${response.status} ${errorBody}`);
  }
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS" || event.requestContext?.http?.method === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const submission = {
      id: randomUUID(),
      name: body.name,
      phone: body.phone,
      email: body.email,
      message: body.message,
      timestamp: new Date().toISOString(),
    };

    if (!submission.name || !submission.email || !submission.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Name, email, and message are required." }),
      };
    }

    await dynamo.send(
      new PutCommand({
        TableName: "JigyasaContactSubmissions",
        Item: submission,
      }),
    );

    await sendNotificationEmail(submission);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Form submitted successfully!" }),
    };
  } catch (error) {
    console.error("Error handling contact submission:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Failed to submit form." }),
    };
  }
};
