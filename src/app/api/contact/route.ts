import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const data = await req.json();
  const { firstName, lastName, email, phoneNumber, message } = data;

  const transporter = nodemailer.createTransport({
    host: "127.0.0.1",
    port: 25,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <noreply@relax-time.nl.nl>`,
      to: "marcowammes@outlook.com", // ← Zet hier je echte ontvangstadres
      replyTo: email,
      subject: "Nieuw bericht via contactformulier",
      html: `
        <h2>Nieuw bericht via je website</h2>
        <p><strong>Naam:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefoonnummer:</strong> ${phoneNumber || "–"}</p>
        <p><strong>Bericht:</strong><br>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mailfout:", error);
    return NextResponse.json({ error: "Verzenden mislukt" }, { status: 500 });
  }
}
