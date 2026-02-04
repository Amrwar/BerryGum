import { NextRequest, NextResponse } from "next/server";

// Contact form submission handler
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  message: string;
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation function
function validateFormData(data: ContactFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("Please provide a valid email address");
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters long");
  }

  // Optional phone validation (Egyptian phone format)
  if (data.phone && data.phone.trim()) {
    const phoneClean = data.phone.replace(/[\s\-\(\)]/g, "");
    if (!/^(\+20|0)?1[0125]\d{8}$/.test(phoneClean)) {
      errors.push("Please provide a valid Egyptian phone number");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Send email using Resend API
async function sendEmailWithResend(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "hello@BerryGumstudio.com";

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
        from: "BerryGum Developments <noreply@BerryGumstudio.com>",
        to: [CONTACT_EMAIL],
        reply_to: data.email,
        subject: `New Contact Form Submission from ${data.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e293b; border-bottom: 2px solid #f43f5e; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #475569; margin-bottom: 5px;">Contact Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 30%;">Name:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #64748b;">Email:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                    <a href="mailto:${data.email}" style="color: #f43f5e;">${data.email}</a>
                  </td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #64748b;">Phone:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                    <a href="tel:${data.phone}" style="color: #f43f5e;">${data.phone}</a>
                  </td>
                </tr>
                ` : ""}
                ${data.company ? `
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #64748b;">Company:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.company}</td>
                </tr>
                ` : ""}
                ${data.budget ? `
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #64748b;">Budget:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.budget}</td>
                </tr>
                ` : ""}
              </table>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #475569; margin-bottom: 10px;">Message</h3>
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; color: #334155; line-height: 1.6;">
                ${data.message.replace(/\n/g, "<br>")}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px;">
              <p>This email was sent from the BerryGum Developments website contact form.</p>
              <p>Submitted at: ${new Date().toLocaleString("en-EG", { timeZone: "Africa/Cairo" })}</p>
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
    
    const formData: ContactFormData = {
      name: body.name?.trim() || "",
      email: body.email?.trim().toLowerCase() || "",
      phone: body.phone?.trim() || undefined,
      company: body.company?.trim() || undefined,
      budget: body.budget?.trim() || undefined,
      message: body.message?.trim() || "",
    };

    // Validate form data
    const validation = validateFormData(formData);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.errors.join(", ") },
        { status: 400 }
      );
    }

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
