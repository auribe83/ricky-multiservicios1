"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSending(true); setStatus("");
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
    setSending(false); setStatus(response.ok ? "Solicitud recibida. Te contactaremos para coordinar la visita." : "Revisa los campos obligatorios e inténtalo de nuevo.");
  }
  return <form id="formulario" className="contact-form" onSubmit={submit}><h3>Solicita una visita</h3><p>Déjanos tus datos y cuéntanos qué necesitas.</p><div className="form-grid"><label>Nombre<input name="nombre" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Teléfono<input name="telefono" type="tel" autoComplete="tel" /></label><label>Servicio<select name="servicio"><option>Plomería</option><option>Electricidad</option><option>Climatización</option><option>Arreglos generales</option><option>Otro</option></select></label><label className="span-all">¿Qué necesitas?<textarea name="mensaje" placeholder="Cuéntanos qué sucede y dónde necesitas la visita." /></label></div><label className="privacy"><input name="privacidad" type="checkbox" required />He leído y acepto la Política de privacidad.</label><input className="honeypot" name="web" tabIndex={-1} autoComplete="off" /><button className="button button-primary" disabled={sending}>{sending ? "Enviando..." : "Solicitar visita"}</button><p className="form-status" aria-live="polite">{status}</p></form>;
}
