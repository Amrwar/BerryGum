import { NextRequest, NextResponse } from "next/server";
import { validateContactForm, type ContactFormValues } from "@/lib/validation/contactSchema";

// Contact form submission handler
type ContactFormData = ContactFormValues;

// Send email using Resend API
async function sendEmailWithResend(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "BerryGumStudio@yahoo.com";
  // Use verified domain email or Resend's test email for development
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
        subject: `🍬 New Lead: ${data.name} - BerryGum Contact Form`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; border-radius: 16px; overflow: hidden;">
            <!-- Header with gradient -->
            <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">🍬 BerryGum</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">New Contact Form Submission</p>
            </div>

            <!-- Content -->
            <div style="padding: 30px; background: white;">
              <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; border-left: 4px solid #f59e0b; padding-left: 12px;">
                Contact Details
              </h2>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 30%; font-weight: 500;">Name</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 500;">Email</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
                    <a href="mailto:${data.email}" style="color: #f59e0b; text-decoration: none; font-weight: 600;">${data.email}</a>
                  </td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 500;">Phone</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
                    <a href="tel:${data.phone}" style="color: #f59e0b; text-decoration: none; font-weight: 600;">${data.phone}</a>
                  </td>
                </tr>
                ` : ""}
                ${data.company ? `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 500;">Company</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.company}</td>
                </tr>
                ` : ""}
                ${data.budget ? `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: 500;">Budget</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
                    <span style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600;">${data.budget}</span>
                  </td>
                </tr>
                ` : ""}
              </table>

              <div style="margin-top: 24px;">
                <h3 style="color: #1e293b; margin: 0 0 12px 0; font-size: 16px; border-left: 4px solid #f59e0b; padding-left: 12px;">Message</h3>
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; color: #334155; line-height: 1.7; border: 1px solid #e2e8f0;">
                  ${data.message.replace(/\n/g, "<br>")}
                </div>
              </div>

              <!-- Quick Actions -->
              <div style="margin-top: 24px; padding: 20px; background: #fef3c7; border-radius: 12px;">
                <p style="margin: 0 0 12px 0; color: #92400e; font-weight: 600; font-size: 14px;">⚡ Quick Actions</p>
                <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin-right: 8px;">Reply via Email</a>
                ${data.phone ? `<a href="https://wa.me/${data.phone.replace(/[^0-9]/g, "")}" style="display: inline-block; background: #25D366; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">WhatsApp</a>` : ""}
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #0f172a; padding: 20px; text-align: center;">
              <p style="color: #64748b; margin: 0; font-size: 12px;">
                Submitted on ${new Date().toLocaleString("en-EG", { timeZone: "Africa/Cairo", dateStyle: "full", timeStyle: "short" })}
              </p>
              <p style="color: #475569; margin: 8px 0 0 0; font-size: 11px;">
                BerryGum Website Contact Form
              </p>
            </div>
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

// Fallback: Log to console (for development)
function logContactSubmission(data: ContactFormData): void {
  console.log("=".repeat(50));
  console.log("NEW CONTACT FORM SUBMISSION");
  console.log("=".repeat(50));
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`Name: ${data.name}`);
  console.log(`Email: ${data.email}`);
  if (data.phone) console.log(`Phone: ${data.phone}`);
  if (data.company) console.log(`Company: ${data.company}`);
  if (data.budget) console.log(`Budget: ${data.budget}`);
  console.log(`Message: ${data.message}`);
  console.log("=".repeat(50));
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate against the same schema the contact form uses client-side
    const validation = validateContactForm(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.errors.join(", ") },
        { status: 400 }
      );
    }
    const formData: ContactFormData = validation.data;

    // Check if Resend API key is configured
    const hasResendKey = !!process.env.RESEND_API_KEY;

    if (hasResendKey) {
      // Send email using Resend
      const emailResult = await sendEmailWithResend(formData);
      
      if (!emailResult.success) {
        // Fallback to console logging if email fails
        logContactSubmission(formData);
        console.warn("Email failed, logged to console instead:", emailResult.error);
      }
    } else {
      // No Resend API key - log to console
      logContactSubmission(formData);
      console.log("RESEND_API_KEY not configured - contact logged to console");
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    });

  } catch (error) {
    console.error("Contact form error:", error);
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Invalid request format" },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
