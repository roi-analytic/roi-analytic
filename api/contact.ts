import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const TO_EMAIL = "info@roianalytic.es";
const fromEmailRaw = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const fromEmail = fromEmailRaw.includes("<") ? fromEmailRaw : `ROI Analytic <${fromEmailRaw}>`;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

type ContactBody = {
  company?: string;
  email?: string;
  phone?: string;
  sector?: string;
  message?: string;
};

function validateBody(body: unknown): body is ContactBody {
  return (
    typeof body === "object" &&
    body !== null &&
    "company" in body &&
    "email" in body &&
    "phone" in body &&
    "sector" in body &&
    typeof (body as ContactBody).company === "string" &&
    typeof (body as ContactBody).email === "string" &&
    typeof (body as ContactBody).phone === "string" &&
    typeof (body as ContactBody).sector === "string"
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonResponse(data: object, status: number, headers?: Record<string, string>) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      ...headers,
    },
  });
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" } });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed." }, 405);
    }

    if (!resend) {
      return jsonResponse(
        { error: "Email service not configured (RESEND_API_KEY missing)." },
        503
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body." }, 400);
    }

    if (!validateBody(body)) {
      return jsonResponse(
        { error: "Invalid request: company, email, phone and sector are required." },
        400
      );
    }

    const { company, email, phone, sector, message } = body;
    const safeCompany = String(company).slice(0, 200);
    const safeEmail = String(email).slice(0, 255);
    const safePhone = String(phone).slice(0, 30);
    const safeSector = String(sector).slice(0, 100);
    const safeMessage = message != null ? String(message).slice(0, 2000) : "";

    const html = `
    <h2>Nuevo contacto desde la web</h2>
    <p><strong>Empresa:</strong> ${escapeHtml(safeCompany)}</p>
    <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(safePhone)}</p>
    <p><strong>Sector:</strong> ${escapeHtml(safeSector)}</p>
    ${safeMessage ? `<p><strong>Mensaje:</strong></p><pre>${escapeHtml(safeMessage)}</pre>` : ""}
  `;

    const text = [
      `Empresa: ${safeCompany}`,
      `Email: ${safeEmail}`,
      `Teléfono: ${safePhone}`,
      `Sector: ${safeSector}`,
      safeMessage ? `Mensaje:\n${safeMessage}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: TO_EMAIL,
      subject: `Contacto: ${safeCompany} - ${safeSector}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return jsonResponse(
        { error: error.message ?? "Failed to send email." },
        500
      );
    }

    return jsonResponse({ success: true, id: data?.id }, 200);
  },
};
