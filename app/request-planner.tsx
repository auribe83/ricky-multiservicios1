"use client";

import { useState } from "react";
import { IconBolt, IconDroplet, IconSnowflake, IconTool } from "@tabler/icons-react";
import { useRequestDetails } from "./request-context";

const choices = [
  { name: "Plomería", icon: IconDroplet }, { name: "Electricidad", icon: IconBolt },
  { name: "Climatización", icon: IconSnowflake }, { name: "Arreglos generales", icon: IconTool }
];

export function RequestPlanner() {
  const [service, setService] = useState("Plomería");
  const [space, setSpace] = useState("Apartamento");
  const [zone, setZone] = useState("La Candelaria y alrededores");
  const { update } = useRequestDetails();
  function continueToForm() {
    update({ service, space, zone });
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return <div className="planner-card">
    <div className="planner-controls"><label>Selecciona el servicio</label><div className="choice-grid">{choices.map(({ name, icon: Icon }) => <button key={name} type="button" className={service === name ? "choice active" : "choice"} onClick={() => setService(name)}><Icon size={23} />{name}</button>)}</div>
      <div className="select-grid"><label>Tipo de espacio<select value={space} onChange={(event) => setSpace(event.target.value)}><option>Apartamento</option><option>Casa</option><option>Condominio</option><option>Local comercial</option></select></label><label>Zona de atención<select value={zone} onChange={(event) => setZone(event.target.value)}><option>La Candelaria y alrededores</option><option>Otra zona de Caracas</option></select></label></div>
    </div>
    <aside className="planner-summary"><p className="eyebrow">Resumen</p><strong>{service}</strong><p>Visita para {space.toLowerCase()} en {zone}.</p><button className="button button-primary" type="button" onClick={continueToForm}>Continuar al formulario</button></aside>
  </div>;
}
