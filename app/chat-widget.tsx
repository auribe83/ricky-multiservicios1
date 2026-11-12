"use client";

import { FormEvent, useState } from "react";
import { IconMessageCircle, IconX } from "@tabler/icons-react";
import "./chat-widget.css";

type Message = { role: "user" | "assistant"; content: string };
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();
    if (!content || busy) return;
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next); setInput(""); setBusy(true); setError("");
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next.slice(-20) }) });
      const data = await response.json();
      if (!response.ok) { setError(data.error || "No pude responder. Llama al 0212-645-79-05."); return; }
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch { setError("No pude conectar. Llama al 0212-645-79-05."); }
    finally { setBusy(false); }
  }
  return <div className="chat-widget">
    {open && <section className="chat-panel" aria-label="Chat de Ricky Multiservicios">
      <header className="chat-header"><div><strong>Asistente de Ricky</strong><span>Consultas sobre nuestros servicios</span></div><button type="button" onClick={() => setOpen(false)} aria-label="Cerrar chat"><IconX size={20}/></button></header>
      <div className="chat-body" role="log" aria-live="polite"><p className="chat-bubble assistant">Hola, soy el asistente de Ricky Multiservicios. ¿En qué puedo ayudarte?</p><p className="chat-notice">Tus mensajes se envían a un proveedor de IA. Evita compartir datos sensibles. Este chat no registra solicitudes; usa el <a href="#formulario" onClick={() => setOpen(false)}>formulario de visita</a>.</p>{messages.map((message, index) => <p className={`chat-bubble ${message.role}`} key={index}>{message.content}</p>)}{busy && <p className="chat-bubble assistant">Escribiendo...</p>}{error && <p className="chat-error" role="alert">{error} <a href="tel:+582126457905">Llamar</a></p>}</div>
      <form className="chat-input" onSubmit={send}><label className="chat-sr-only" htmlFor="chat-message">Escribe tu pregunta</label><input id="chat-message" value={input} onChange={event => setInput(event.target.value)} maxLength={1000} placeholder="Escribe tu pregunta" disabled={busy}/><button type="submit" disabled={busy || !input.trim()}>Enviar</button></form>
    </section>}
    <button className="chat-toggle" type="button" aria-expanded={open} aria-label={open ? "Cerrar chat" : "Abrir chat de Ricky"} onClick={() => setOpen(!open)}><IconMessageCircle size={23}/><span>¿Necesitas ayuda?</span></button>
  </div>;
}
