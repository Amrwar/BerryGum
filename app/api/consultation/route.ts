import { NextRequest, NextResponse } from "next/server";
import { validateConsultationForm, type ConsultationFormValues } from "@/lib/validation/consultationSchema";

type ConsultationFormData = ConsultationFormValues;

async function sendEmailWithResend(data: ConsultationFormData): Promise<{ success: boolean; error?: string }> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "BerryGumStudio@yahoo.com";
  const FROM_EMAIL = process.env.FROM_EMAIL || "BerryGum <onboarding@resend.dev>";

  if (!RESEND_API_KEY) {
    return { success: false, error: "Email service not configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [CONTACT_EMAIL],
        reply_to: data.email,
        subject: `New Consultation Request: ${data.name} - ${data.dateKey} ${data.time}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Consultation Request</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
            <p><strong>Requested slot:</strong> ${data.dateKey} at ${data.time}</p>
            <p><strong>Topic:</strong> ${data.topic.replace(/\n/g, "<br>")}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend API error:", errorData);
      return { success: false, error: "Failed to send email" };
    }

    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error: "Failed to send email" };
  }
}

function logConsultationSubmission(data: ConsultationFormData): void {
  console.log("=".repeat(50));
  console.log("NEW CONSULTATION REQUEST");
  console.log("=".repeat(50));
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`Name: ${data.name}`);
  console.log(`Email: ${data.email}`);
  if (data.phone) console.log(`Phone: ${data.phone}`);
  console.log(`Requested slot: ${data.dateKey} at ${data.time}`);
  console.log(`Topic: ${data.topic}`);
  console.log("=".repeat(50));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = validateConsultationForm(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.errors.join(", ") },
        { status: 400 }
      );
    }
    const formData: ConsultationFormData = validation.data;

    const hasResendKey = !!process.env.RESEND_API_KEY;

    if (hasResendKey) {
      const emailResult = await sendEmailWithResend(formData);
      if (!emailResult.success) {
        logConsultationSubmission(formData);
        console.warn("Email failed, logged to console instead:", emailResult.error);
      }
    } else {
      logConsultationSubmission(formData);
      console.log("RESEND_API_KEY not configured - consultation request logged to console");
    }

    return NextResponse.json({
      success: true,
      message: "Thanks! We'll confirm your slot shortly.",
    });
  } catch (error) {
    console.error("Consultation request error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Invalid request format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
