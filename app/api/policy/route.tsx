import { NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { PolicyDocument } from "@/lib/policy/PolicyDocument";
import type { PolicyConfig } from "@/lib/policy/types";
import React from "react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { config: PolicyConfig };

    if (!body?.config) {
      return new Response(JSON.stringify({ error: "Brak konfiguracji polityki." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const buffer = await renderToBuffer(
      React.createElement(PolicyDocument, {
        config: body.config,
        watermark: true,
      }) as any
    );

    const safeName = (body.config.org.name || "organizacja")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="polityka-ai-${safeName || "wprawny"}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("[/api/policy] błąd generowania PDF:", e);
    return new Response(JSON.stringify({ error: "Nie udało się wygenerować polityki." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
