// app/api/lead/route.ts
// POST { email, level, sector } → zapis leada.
//
// MVP: logujemy do konsoli serwera. Produkcyjnie podłącz Supabase (Frankfurt)
// + Resend (wysyłka raportu). Miejsca podłączenia oznaczone jako TODO poniżej.
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /\S+@\S+\.\S+/;

export async function POST(req: NextRequest) {
  try {
    const { email, level, sector } = (await req.json()) as {
      email?: string;
      level?: string;
      sector?: string | null;
    };

    if (!email || !EMAIL_RE.test(email)) {
      return Response.json({ error: "Nieprawidłowy e-mail." }, { status: 400 });
    }

    const lead = {
      email,
      level: level ?? null,
      sector: sector ?? null,
      createdAt: new Date().toISOString(),
    };

    // TODO (produkcja): zapis do Supabase
    //   const { error } = await supabase.from("leads").insert(lead);
    // TODO (produkcja): wysyłka raportu e-mailem przez Resend
    //   await resend.emails.send({ ... });
    console.log("[lead]", lead);

    return Response.json({ ok: true });
  } catch (e) {
    console.error("[/api/lead] błąd:", e);
    return Response.json({ error: "Błąd serwera." }, { status: 500 });
  }
}
