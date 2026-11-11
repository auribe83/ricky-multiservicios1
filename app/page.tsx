import Image from "next/image";
import Link from "next/link";
import {
  IconBolt, IconCalendarCheck, IconDroplet, IconFlame,
  IconMapPin, IconPhone, IconPlugConnected, IconSnowflake, IconTool,
} from "@tabler/icons-react";
import { ContactForm } from "./contact-form";
import { RequestPlanner } from "./request-planner";

const services = [
  { title: "Plomería especializada", copy: "Filtraciones, destapes, piezas sanitarias y revisión de bombas de agua.", icon: IconDroplet },
  { title: "Electricidad y cableado", copy: "Cortocircuitos, tableros, luminarias, tomas de corriente y cableado.", icon: IconPlugConnected },
  { title: "Climatización", copy: "Mantenimiento, limpieza y recarga de gas para equipos de aire.", icon: IconSnowflake },
  { title: "Arreglos generales", copy: "Pintura, cerraduras, montaje y reparaciones menores en el hogar o local.", icon: IconTool }
];

const benefits = [
  ["Presupuesto antes de empezar", "Confirmamos el presupuesto antes de iniciar el trabajo."],
  ["Varios pendientes en una visita", "Indica todo lo que necesitas para revisar la atención en el mismo turno."],
  ["Reporte visual de avances", "Compartimos fotos antes, durante y después del trabajo."],
  ["Área limpia al finalizar", "El equipo deja el área atendida en orden al terminar."]
];

const reviews = [
  ["María G.", "La Candelaria", "Se me rompió un tubo un domingo y pensé que se me inundaba el apartamento. Les escribí por WhatsApp y en 40 minutos ya estaban aquí resolviendo."],
  ["Carlos M.", "Altamira", "Lo mejor es que resolvieron todo en una sola visita. No tuve que coordinar a varios técnicos distintos."],
  ["Patricia L.", "Las Mercedes", "Como administradora de condominio, valoro que nos mantengan informados y compartan fotos del trabajo realizado."]
];

export default function Home() {
  return <main>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header">
      <div className="shell nav-shell">
        <Link href="#inicio" className="brand" aria-label="Ricky Multiservicios, inicio">
          <Image src="/images/logo-ricky-multiservicios.png" alt="Ricky Multiservicios" width={186} height={52} priority />
        </Link>
        <nav aria-label="Navegación principal">
          <a href="#servicios">Servicios</a><a href="#proceso">Cómo trabajamos</a><a href="#opiniones">Opiniones</a><a href="#contacto">Contacto</a>
        </nav>
        <a className="emergency" href="tel:+582126457905"><IconPhone size={17} />Urgencias 24/7</a>
      </div>
    </header>

    <section id="inicio" className="hero"><div className="shell hero-grid">
      <div className="hero-copy">
        <p className="eyebrow"><i />Mantenimiento y reparaciones en Caracas</p>
        <h1>Tu aliado para <span>mantenimiento</span> y emergencias en Caracas.</h1>
        <p className="hero-lead">Plomería, electricidad y climatización resueltos en una sola visita.</p>
        <div className="hero-actions"><a className="button button-primary" href="#contacto"><IconCalendarCheck size={19} />Solicitar asistencia</a><a className="button button-quiet" href="#servicios">Ver servicios</a></div>
        <p className="coverage"><IconMapPin size={16} />Atendemos hogares, condominios y locales comerciales en Caracas.</p>
      </div>
      <div className="hero-media">
        <Image src="/images/equipo-reparacion-caracas.png" alt="Técnicos revisan un tablero eléctrico en un apartamento de Caracas" fill priority sizes="(max-width: 900px) 100vw, 48vw" />
        <div className="hero-status"><span className="status-icon"><IconTool size={22} /></span><div><b>Atención técnica</b><small>Coordinamos la visita según tu solicitud.</small></div></div>
      </div>
    </div></section>

    <section id="servicios" className="section surface"><div className="shell">
      <div className="section-intro"><p className="eyebrow">Catálogo especializado</p><h2>Soluciones para tu hogar y negocio</h2><p>Selecciona un área y organiza los datos de la visita.</p></div>
      <div className="service-grid">{services.map(({ title, copy, icon: Icon }, index) => <article className="service-card" key={title}>
        <div className="service-card-top"><span className={index % 2 ? "icon-box orange" : "icon-box"}><Icon size={25} strokeWidth={1.8} /></span><span className="tag">Servicio</span></div>
        <div><h3>{title}</h3><p>{copy}</p></div><a href="#solicitud">Preparar solicitud <span>→</span></a>
      </article>)}</div>
    </div></section>

    <section id="proceso" className="section"><div className="shell">
      <div className="centered-intro"><p className="eyebrow">Cómo trabajamos</p><h2>Información clara en cada visita</h2><p>Un proceso simple para conocer el trabajo antes de empezar.</p></div>
      <div className="benefit-grid">{benefits.map(([title, copy], index) => <article className="benefit-card" key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div></section>

    <section id="solicitud" className="section planner-section"><div className="shell">
      <div className="centered-intro"><p className="eyebrow">Solicitud guiada</p><h2>Organiza los datos de tu visita</h2><p>Selecciona el servicio y el tipo de espacio. El formulario se prepara con esa información.</p></div>
      <RequestPlanner />
    </div></section>

    <section id="opiniones" className="section surface"><div className="shell">
      <div className="reviews-heading"><div><p className="eyebrow">Opiniones</p><h2>Lo que dicen nuestros clientes</h2></div><span className="review-badge">★★★★★<small>Testimonios</small></span></div>
      <div className="review-grid">{reviews.map(([name, place, text]) => <figure className="review-card" key={name}><div className="stars">★★★★★</div><blockquote>“{text}”</blockquote><figcaption><b>{name}</b><span>{place}</span></figcaption></figure>)}</div>
    </div></section>

    <section id="contacto" className="section"><div className="shell contact-layout">
      <div className="contact-copy"><p className="eyebrow">Agenda tu visita</p><h2>Cuéntanos qué necesitas</h2><p>Para una visita programada, completa el formulario. En una emergencia, llama directamente a la línea de atención.</p><div className="emergency-panel"><IconFlame size={24} /><div><b>¿Es una emergencia?</b><p>Para una tubería rota, apagón o cortocircuito, llama ahora.</p></div><a className="button button-primary" href="tel:+582126457905"><IconPhone size={18} />0212-645-79-05</a></div><div className="contact-details"><p><b>Horario regular</b>Lunes a viernes de 8:00 a. m. a 5:00 p. m.<br />Sábados de 8:00 a. m. a 1:00 p. m.</p><p><b>Ubicación</b>Avenida Este 2, frente a la Plaza La Candelaria, Edificio Candelaria Centro, Planta Baja, Local 4, Caracas.</p></div></div>
      <ContactForm />
    </div></section>

    <footer><div className="shell footer-grid"><div><Image src="/images/logo-ricky-multiservicios.png" alt="Ricky Multiservicios" width={186} height={52} /><p>Mantenimiento preventivo y reparaciones de emergencia en Caracas.</p></div><div><b>Contacto</b><a href="tel:+582126457905">0212-645-79-05</a><a href="https://wa.me/584143728363">WhatsApp 0414-372-83-63</a><a href="mailto:auribe.infosoft@gmail.com">auribe.infosoft@gmail.com</a></div><div><b>Enlaces</b><a href="/aviso-legal/">Aviso legal</a><a href="/politica-de-privacidad/">Política de privacidad</a><a href="/politica-de-cookies/">Política de cookies</a></div></div></footer>
  </main>;
}
