import { NextRequest, NextResponse } from "next/server";

type Payload = {
  text: string;
  mode: "CAPITALIZE";
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Payload> | null;
    const text = (body?.text ?? "").toString();
    const mode = body?.mode;

    if (!text.trim()) {
      return NextResponse.json(
        { error: "Teks tidak boleh kosong" },
        { status: 400 }
      );
    }
    if (mode !== "CAPITALIZE") {
      return NextResponse.json(
        { error: "Mode tidak didukung" },
        { status: 400 }
      );
    }

    // Simulate processing delay if needed
    // await new Promise((r) => setTimeout(r, 250));

    const output = text.toUpperCase();
    return NextResponse.json({ output });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
