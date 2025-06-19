import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const data = await req.json();
  const { firstName, lastName, email, phoneNumber, message } = data;

  const transporter = nodemailer.createTransport({
    host: "smtp.strato.com",
    port: 465,
    secure: true, // TLS
    auth: {
      user: "contact@pafb.nl",
      pass: process.env.SMTP_PASS!, // zie hieronder
    },
  });

  try {
    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <contact@pafb.nl>`,
      to: "marcowammes@outlook.com", // jouw eigen ontvangstadres
      replyTo: email,
      subject: "Nieuw bericht via contactformulier",
      html: `
        <h2>Nieuw bericht via de website</h2>
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
