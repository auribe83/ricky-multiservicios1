"use client";

import { createContext, useContext, useState } from "react";

type RequestDetails = { service: string; space: string; zone: string; confirmed: boolean };
type RequestContextValue = RequestDetails & { update: (details: Omit<RequestDetails, "confirmed">) => void; reset: () => void };
const RequestContext = createContext<RequestContextValue | null>(null);

export function RequestProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [details, setDetails] = useState<RequestDetails>({ service: "Plomería", space: "Apartamento", zone: "La Candelaria y alrededores", confirmed: false });
  const update = (nextDetails: Omit<RequestDetails, "confirmed">) => setDetails({ ...nextDetails, confirmed: true });
  const reset = () => setDetails({ service: "Plomería", space: "Apartamento", zone: "La Candelaria y alrededores", confirmed: false });
  return <RequestContext.Provider value={{ ...details, update, reset }}>{children}</RequestContext.Provider>;
}

export function useRequestDetails() {
  const context = useContext(RequestContext);
  if (!context) throw new Error("useRequestDetails debe usarse dentro de RequestProvider");
  return context;
}
