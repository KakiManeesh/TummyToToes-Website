import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  sessionType: string;
  date: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    // Get API key at runtime, not module load time
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured in environment");
      return NextResponse.json(
        { success: false, error: "Email service configuration error. Please contact the administrator." },
        { status: 500 }
      );
    }

    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.sessionType) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields (name, email, and session type)." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Build HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #d4a574; padding-bottom: 10px;">
          New Photography Enquiry
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555; width: 140px;">
              Name
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #1a1a1a;">
              ${escapeHtml(data.name)}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">
              Email
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #1a1a1a;">
              <a href="mailto:${escapeHtml(data.email)}" style="color: #d4a574;">${escapeHtml(data.email)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">
              Phone
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #1a1a1a;">
              ${data.phone ? escapeHtml(data.phone) : "Not provided"}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">
              Package Type
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #1a1a1a; text-transform: capitalize;">
              ${escapeHtml(data.sessionType)}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">
              Preferred Date
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #1a1a1a;">
              ${data.date ? escapeHtml(data.date) : "Not specified"}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555; vertical-align: top;">
              Message
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #1a1a1a; white-space: pre-wrap;">
              ${data.message ? escapeHtml(data.message) : "No message provided"}
            </td>
          </tr>
        </table>
        
        <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            This enquiry was submitted through the TummyToToes website contact form.
          </p>
        </div>
      </div>
    `;

    // Initialize Resend inside the function (not at module level)
    const resend = new Resend(apiKey);

    // Send email via Resend
    const { data: result, error } = await resend.emails.send({
      from: "bookings@tummytotoesphotography.com",
      to: "tummy.to.toes@gmail.com",
      subject: "New Photography Enquiry",
      html: htmlContent,
      replyTo: data.email,
    });

    if (error) {
      console.error("Resend API Error:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        { success: false, error: "Failed to send email. Please try again or contact us directly." },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", result?.id);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

// Helper function to prevent XSS
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
