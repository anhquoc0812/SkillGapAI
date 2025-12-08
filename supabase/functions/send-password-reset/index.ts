import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PasswordResetRequest {
  email: string;
}

// Generate a 6-digit OTP
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: PasswordResetRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Processing password reset for:", email);

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Check if user exists
    const { data: users, error: userError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (userError) {
      console.error("Error checking user:", userError);
      // Don't reveal if user exists or not for security
      return new Response(
        JSON.stringify({ success: true, message: "If the email exists, an OTP will be sent" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const user = users.users.find(u => u.email === email);
    
    if (!user) {
      console.log("User not found, returning success anyway for security");
      return new Response(
        JSON.stringify({ success: true, message: "If the email exists, an OTP will be sent" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Generate a 6-digit OTP
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Invalidate any existing unused tokens for this email
    await supabaseAdmin
      .from("password_reset_tokens")
      .update({ used: true })
      .eq("email", email)
      .eq("used", false);

    // Store OTP in database
    const { error: insertError } = await supabaseAdmin
      .from("password_reset_tokens")
      .insert({
        user_id: user.id,
        email: email,
        token: otp,
        expires_at: expiresAt.toISOString()
      });

    if (insertError) {
      console.error("Error storing OTP:", insertError);
      throw new Error("Failed to generate OTP");
    }

    console.log("Generated OTP for user:", user.id);

    // Send OTP email via Resend API
    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #1a1a2e 0%, #0a0a0a 100%); border-radius: 16px; border: 1px solid #333;">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center;">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #8b5cf6, #06b6d4); border-radius: 12px; margin: 0 auto 20px;"></div>
                    <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">Skill Gap AI</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 20px 40px 40px;">
                    <h2 style="margin: 0 0 16px; font-size: 22px; font-weight: 600; color: #ffffff; text-align: center;">Your Verification Code</h2>
                    <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #a1a1aa; text-align: center;">
                      Use the following code to reset your password:
                    </p>
                    
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td align="center" style="padding: 24px 0;">
                          <div style="display: inline-block; padding: 20px 40px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2)); border: 2px solid #8b5cf6; border-radius: 12px;">
                            <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #ffffff;">${otp}</span>
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 24px 0 0; font-size: 14px; line-height: 1.6; color: #71717a; text-align: center;">
                      This code will expire in <strong style="color: #a1a1aa;">10 minutes</strong>. If you didn't request a password reset, you can safely ignore this email.
                    </p>
                    
                    <hr style="margin: 32px 0; border: none; border-top: 1px solid #333;">
                    
                    <p style="margin: 0; font-size: 12px; color: #52525b; text-align: center;">
                      Do not share this code with anyone. Our team will never ask for your code.
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 40px; border-top: 1px solid #333; text-align: center;">
                    <p style="margin: 0; font-size: 12px; color: #52525b;">
                      © ${new Date().getFullYear()} Skill Gap AI. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Skill Gap AI <onboarding@resend.dev>",
        to: [email],
        subject: "Your Password Reset Code - Skill Gap AI",
        html: emailHtml,
      }),
    });

    const emailData = await emailResponse.json();

    console.log("OTP email sent successfully:", emailData);

    return new Response(
      JSON.stringify({ success: true, message: "OTP sent to your email" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-password-reset function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
