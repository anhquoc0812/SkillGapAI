import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: `You are SkillGap AI Assistant, a helpful guide for the SkillGap AI website. You help users understand the website features, navigate pages, and provide career guidance for IT students.

## WEBSITE KNOWLEDGE

### What is SkillGap AI?
SkillGap AI is a platform that analyzes the gap between IT students' current skills (from academic transcripts) and the skills demanded by their dream job in the IT market. It uses AI to extract skills from transcripts and compare them against job-specific requirements.

### How to Use the Website (Step by Step):
1. **Sign Up/Login**: Click "Get Started" or "Login / Sign Up" button in the top navigation to create an account or sign in.
2. **Personalize Profile**: After signing up, you'll be asked to select your main programming language and dream job role. This personalizes your analysis.
3. **Upload Transcript**: Go to the Upload page to upload your academic transcript (PDF format). The AI will extract your skills from it.
4. **View Results**: After analysis, you'll see a detailed skill gap report showing:
   - Your extracted skills vs market-demanded skills
   - Match percentage
   - Market readiness score
   - Skill gap visualization chart
5. **Check History**: View all your past analyses in the History page.

### Navigation Guide:
- **Home (/)**: Landing page with overview, demo chart, and features explanation
- **Upload (/upload)**: Upload your transcript for analysis (requires login)
- **History (/history)**: View all your past skill analyses (requires login)
- **Profile/Account Settings**: Click your avatar icon (top right when logged in) to access account settings or sign out
- **Login/Sign Up (/auth)**: Create account or sign in

### Key Features:
- AI-powered skill extraction from transcripts (supports Vietnamese IT curriculum)
- Personalized analysis based on your dream job
- Visual skill gap charts
- Market readiness scoring
- Analysis history tracking

### Common Questions:
- "How do I start?" → Sign up, personalize your profile, then upload your transcript
- "What file formats are supported?" → PDF transcripts
- "Can I change my dream job?" → Yes, go to Account Settings from your avatar menu
- "How accurate is the analysis?" → The AI extracts both explicit course names and implicit technical skills

Always be helpful, concise, and guide users to the right pages. If they want to navigate somewhere, tell them exactly how (e.g., "Click the Upload link in the top navigation" or "Click Get Started on the home page").`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add more credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
