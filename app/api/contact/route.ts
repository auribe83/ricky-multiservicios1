import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try { data = await request.json(); } catch { return NextResponse.json({ message: "Datos inválidos." }, { status: 400 }); }
  const value = (name: string) => typeof data[name] === "string" ? (data[name] as string).trim() : "";
  if (!value("nombre") || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email")) || !value("telefono") || !value("mensaje") || data.privacidad !== true || value("web")) {
    return NextResponse.json({ message: "Revisa los campos obligatorios." }, { status: 400 });
  }
  const token = process.env.AIRTABLE_TOKEN;
  const base = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_ID;
  if (!token || !base || !table) return NextResponse.json({ message: "El servicio no está configurado." }, { status: 503 });
  try {
    const response = await fetch(`https://api.airtable.com/v0/${encodeURIComponent(base)}/${encodeURIComponent(table)}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ fields: { "Nombre y apellido": value("nombre"), Email: value("email"), "Teléfono": value("telefono"), Servicio: value("servicio"), "Tipo de espacio": value("tipoEspacio"), Zona: value("zona"), Mensaje: value("mensaje"), Consentimiento: true, Estado: "Nuevo lead" } }),
      cache: "no-store",
    });
    if (!response.ok) return NextResponse.json({ message: "No se pudo guardar la solicitud." }, { status: 502 });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "No se pudo conectar con el servicio." }, { status: 503 });
  }
}
