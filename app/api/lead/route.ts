// app/api/lead/route.ts
// POST { email, level, sector, role } → zapis leada do Supabase.
import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const EMAIL_RE = /\S+@\S+\.\S+/;

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Brak zmiennych SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, key);
}

export async function POST(req: NextRequest) {
  try {
    const { email, level, sector, role } = (await req.json()) as {
      email?: string;
      level?: string;
      sector?: string | null;
      role?: string | null;
    };

    if (!email || !EMAIL_RE.test(email)) {
      return Response.json({ error: "Nieprawidłowy e-mail." }, { status: 400 });
    }

    const supabase = getSupabase();

    const { error } = await supabase.from("leads").insert({
      email,
      risk_level: level ?? null,
      sector: sector ?? null,
      role: role ?? null,
    });

    if (error) {
      console.error("[/api/lead] Supabase error:", error.message);
      return Response.json({ error: "Błąd zapisu." }, { status: 500 });
    }

    console.log("[lead] zapisano:", email, level);
    return Response.json({ ok: true });

  } catch (e) {
    console.error("[/api/lead] błąd:", e);
    return Response.json({ error: "Błąd serwera." }, { status: 500 });
  }
}
