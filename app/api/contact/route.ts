import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  if (!data.nombre || !data.email || !data.privacidad || data.web) {
    return NextResponse.json({ message: "Revisa los campos obligatorios." }, { status: 400 });
  }
  return NextResponse.json({ ok: true, message: "Solicitud recibida." }, { status: 201 });
}
