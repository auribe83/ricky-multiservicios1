"use client";

import { FormEvent, useState } from "react";
import { useRequestDetails } from "./request-context";
import "./form-validation.css";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { service, space, zone, confirmed, reset } = useRequestDetails();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setStatus("");
    const nextErrors: Record<string, string> = {};
    if (!String(form.get("nombre") || "").trim()) nextErrors.nombre = "Escribe tu nombre y apellido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(form.get("email") || "").trim())) nextErrors.email = "Escribe un correo válido, por ejemplo nombre@correo.com.";
    if (!String(form.get("telefono") || "").trim()) nextErrors.telefono = "Escribe tu número de teléfono.";
    if (!String(form.get("mensaje") || "").trim()) nextErrors.mensaje = "Describe la falla o el trabajo que necesitas.";
    if (form.get("privacidad") !== "on") nextErrors.privacidad = "Acepta la política de privacidad para continuar.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      formElement.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    setSending(true);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...Object.fromEntries(form), privacidad: form.get("privacidad") === "on", ...(confirmed ? { servicio: service, tipoEspacio: space, zona: zone } : {}) }) });
      if (response.ok) {
        formElement.reset();
        reset();
        setErrors({});
        setStatus("Solicitud recibida. Te contactaremos para coordinar la visita.");
      } else {
        setStatus(response.status === 400 ? "Revisa los campos obligatorios e inténtalo de nuevo." : "No pudimos guardar tu solicitud. Inténtalo de nuevo o contáctanos por teléfono o WhatsApp.");
      }
    } catch {
      setStatus("No se pudo conectar. Inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  }
  return <form id="formulario" className="contact-form" onSubmit={submit} noValidate><h3>Solicita una visita</h3><p>Déjanos tus datos y cuéntanos qué necesitas. Los campos marcados con * son obligatorios.</p>{confirmed && <div className="request-summary" aria-live="polite"><span>Datos de tu visita</span><p><b>{service}</b><br />{space} en {zone}</p><a href="#solicitud">Cambiar selección</a></div>}<div className="form-grid"><label>Nombre y Apellido *<input name="nombre" autoComplete="name" required aria-invalid={!!errors.nombre} aria-describedby={errors.nombre ? "error-nombre" : undefined} />{errors.nombre && <span className="field-error" id="error-nombre">{errors.nombre}</span>}</label><label>Email *<input name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "error-email" : undefined} />{errors.email && <span className="field-error" id="error-email">{errors.email}</span>}</label><label>Teléfono *<input name="telefono" type="tel" autoComplete="tel" required aria-invalid={!!errors.telefono} aria-describedby={errors.telefono ? "error-telefono" : undefined} />{errors.telefono && <span className="field-error" id="error-telefono">{errors.telefono}</span>}</label>{!confirmed && <label>Servicio<select name="servicio"><option>Plomería</option><option>Electricidad</option><option>Climatización</option><option>Arreglos generales</option><option>Otro</option></select></label>}<label className="span-all">¿Qué necesitas? *<textarea name="mensaje" required aria-invalid={!!errors.mensaje} aria-describedby={errors.mensaje ? "error-mensaje" : undefined} placeholder="Cuéntanos qué sucede y dónde necesitas la visita." />{errors.mensaje && <span className="field-error" id="error-mensaje">{errors.mensaje}</span>}</label></div><label className="privacy"><input name="privacidad" type="checkbox" required aria-invalid={!!errors.privacidad} aria-describedby={errors.privacidad ? "error-privacidad" : undefined} />He leído y acepto la Política de privacidad. *</label>{errors.privacidad && <span className="field-error" id="error-privacidad">{errors.privacidad}</span>}<input className="honeypot" name="web" tabIndex={-1} autoComplete="off" /><button className="button button-primary" disabled={sending}>{sending ? "Enviando..." : "Solicitar visita"}</button><p className="form-status" aria-live="polite">{status}</p></form>;
}
