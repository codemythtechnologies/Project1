import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } }
    );

    const url = new URL(req.url);
    const path = url.pathname.replace("/functions/v1/admin-api", "");
    const body = req.method !== "GET" ? await req.json().catch(() => ({})) : {};
    const { action, admin_password, table, record } = body;

    // Verify admin password for mutations
    if (req.method !== "GET") {
      const { data: config } = await supabase
        .from("site_config")
        .select("value")
        .eq("key", "admin_password")
        .maybeSingle();

      if (!config || config.value !== admin_password) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // ── Jobs ────────────────────────────────────────────────────
    if (table === "job_openings") {
      if (action === "insert") {
        const { data, error } = await supabase.from("job_openings").insert({
          title: record.title,
          department: record.department,
          location: record.location,
          type: record.type || "Full-time",
          experience: record.experience,
          description: record.description,
          is_active: true,
        }).select().maybeSingle();
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (action === "delete") {
        const { error } = await supabase.from("job_openings").delete().eq("id", record.id);
        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (action === "toggle") {
        const { data, error } = await supabase.from("job_openings")
          .update({ is_active: !record.is_active })
          .eq("id", record.id).select().maybeSingle();
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // ── Testimonials ────────────────────────────────────────────
    if (table === "testimonials") {
      if (action === "insert") {
        const { data, error } = await supabase.from("testimonials").insert({
          name: record.name,
          role: record.role,
          company: record.company,
          rating: record.rating || 5,
          message: record.message,
          avatar_initials: record.avatar_initials || record.name.substring(0, 2).toUpperCase(),
          is_published: true,
          category: record.category || "client",
          source: record.source || "website",
          reviewer_link: record.reviewer_link || null,
        }).select().maybeSingle();
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (action === "delete") {
        const { error } = await supabase.from("testimonials").delete().eq("id", record.id);
        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (action === "toggle") {
        const { data, error } = await supabase.from("testimonials")
          .update({ is_published: !record.is_published })
          .eq("id", record.id).select().maybeSingle();
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // ── Partner Companies ───────────────────────────────────────
    if (table === "partner_companies") {
      if (action === "insert") {
        const { data, error } = await supabase.from("partner_companies").insert({
          name: record.name,
          industry: record.industry || "",
          is_active: true,
          display_order: record.display_order || 0,
        }).select().maybeSingle();
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (action === "delete") {
        const { error } = await supabase.from("partner_companies").delete().eq("id", record.id);
        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      if (action === "toggle") {
        const { data, error } = await supabase.from("partner_companies")
          .update({ is_active: !record.is_active })
          .eq("id", record.id).select().maybeSingle();
        if (error) throw error;
        return new Response(JSON.stringify({ success: true, data }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    return new Response(
      JSON.stringify({ error: "Unknown action or table" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Request failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
