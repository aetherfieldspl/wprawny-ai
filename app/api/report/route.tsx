import { NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { ReportDocument } from "@/lib/report/ReportDocument";
import type { AuditAnswers, ClassificationResult } from "@/lib/types";
import React from "react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      answers: AuditAnswers;
      result: ClassificationResult;
      email?: string;
    };

    if (!body?.answers || !body?.result) {
      return new Response(JSON.stringify({ error: "Brak danych audytu." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const buffer = await renderToBuffer(
      React.createElement(ReportDocument, {
        answers: body.answers,
        result: body.result,
      })
    );

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="audyt-ai-act-wprawny.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("[/api/report] błąd generowania PDF:", e);
    return new Response(JSON.stringify({ error: "Nie udało się wygenerować raportu." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}