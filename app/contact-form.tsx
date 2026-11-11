"use client";

import { FormEvent, useState } from "react";
import { useRequestDetails } from "./request-context";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const { service, space, zone, confirmed, reset } = useRequestDetails();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setSending(true); setStatus("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...Object.fromEntries(form), ...(confirmed ? { servicio: service, tipoEspacio: space, zona: zone } : {}) }) });
      if (response.ok) {
        formElement.reset();
        reset();
        setStatus("Formulario validado. Para coordinar tu visita, contáctanos por teléfono o WhatsApp.");
      } else {
        setStatus("Revisa los campos obligatorios e inténtalo de nuevo.");
      }
    } catch {
      setStatus("No se pudo conectar. Inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  }
  return <form id="formulario" className="contact-form" onSubmit={submit}><h3>Solicita una visita</h3><p>Déjanos tus datos y cuéntanos qué necesitas.</p>{confirmed && <div className="request-summary" aria-live="polite"><span>Datos de tu visita</span><p><b>{service}</b><br />{space} en {zone}</p><a href="#solicitud">Cambiar selección</a></div>}<div className="form-grid"><label>Nombre y Apellido<input name="nombre" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Teléfono<input name="telefono" type="tel" autoComplete="tel" /></label>{!confirmed && <label>Servicio<select name="servicio"><option>Plomería</option><option>Electricidad</option><option>Climatización</option><option>Arreglos generales</option><option>Otro</option></select></label>}<label className="span-all">¿Qué necesitas?<textarea name="mensaje" placeholder="Cuéntanos qué sucede y dónde necesitas la visita." /></label></div><label className="privacy"><input name="privacidad" type="checkbox" required />He leído y acepto la Política de privacidad.</label><input className="honeypot" name="web" tabIndex={-1} autoComplete="off" /><button className="button button-primary" disabled={sending}>{sending ? "Enviando..." : "Solicitar visita"}</button><p className="form-status" aria-live="polite">{status}</p></form>;
}
