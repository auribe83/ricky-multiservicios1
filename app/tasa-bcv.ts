type RateResponse = { USD?: unknown; date?: unknown; effective_date?: unknown; updated_at?: unknown };

export async function getRateContext(knowledge: string): Promise<string> {
  const unavailable = "TASA BCV NO DISPONIBLE O NO VERIFICADA. No calcules ni indiques importes en bolívares. Explica que la conversión está pendiente de confirmación y ofrece el teléfono 0212-645-79-05.";
  try {
    const response = await fetch("https://bcv.today/api/v1/rate.json", { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!response.ok) return unavailable;
    const data: RateResponse = await response.json();
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Caracas", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    const updated = typeof data.updated_at === "string" ? Date.parse(data.updated_at) : NaN;
    const age = Date.now() - updated;
    if (typeof data.USD !== "number" || !Number.isFinite(data.USD) || data.USD <= 0 || data.date !== today || typeof data.effective_date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.effective_date) || data.effective_date > today || !Number.isFinite(updated) || age < -5 * 60 * 1000 || age > 96 * 60 * 60 * 1000) return unavailable;
    const section = knowledge.split("### Tarifas de Ricky Multiservicios aprobadas")[1]?.split("### Referencias orientativas de mercado")[0] ?? "";
    const rows = section.split("\n").map(line => line.match(/^\|\s*(.+?)\s*\|\s*(\d+(?:\.\d+)?)\s*\|\s*(.+?)\s*\|\s*$/)).filter((row): row is RegExpMatchArray => !!row);
    if (!rows.length) return unavailable;
    const number = new Intl.NumberFormat("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const prices = rows.map(row => `${row[1]}: ${row[2]} USD ${row[3]} = ${number.format(Number(row[2]) * (data.USD as number))} Bs ${row[3]}`).join("\n");
    return `Tasa USD de referencia publicada por un servicio independiente basado en el BCV: ${data.USD} Bs por USD; fecha de vigencia ${data.effective_date}; fecha de consulta ${today}. Usa únicamente los equivalentes calculados a continuación, sin hacer conversiones adicionales. No inventes ni calcules importes para trabajos no listados o cantidades distintas; pide contactar al equipo. Aclara fecha de vigencia y condiciones de mano de obra.\n${prices}`;
  } catch { return unavailable; }
}
