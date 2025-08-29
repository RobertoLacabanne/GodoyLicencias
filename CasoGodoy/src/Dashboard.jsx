import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

const BASE_DATA = [
  { start: "2016-01-18", end: "2016-02-06", days: 19, dest: "Brasil (Paso de los Libres)", coverage: "No", coveredDays: 0, types: [], detail: "—", obs: "Viaje terrestre sin licencia.", risk: "Medio" },
  { start: "2016-06-21", end: "2016-08-22", days: 62, dest: "Panamá", coverage: "No", coveredDays: 0, types: [], detail: "—", obs: "Ausencia prolongada sin licencia consignada.", risk: "Alto" },
  { start: "2016-08-27", end: "2016-09-05", days: 9, dest: "Brasil", coverage: "No", coveredDays: 0, types: [], detail: "—", obs: "Sin licencia consignada.", risk: "Medio" },
  { start: "2017-01-29", end: "2017-02-13", days: 15, dest: "Nueva Zelanda", coverage: "No", coveredDays: 0, types: [], detail: "—", obs: "Sin licencia consignada.", risk: "Medio" },
  { start: "2017-07-03", end: "2017-08-22", days: 50, dest: "Estados Unidos", coverage: "Parcial", coveredDays: 8, types: ["DEPORTIVA"], detail: "Deportiva 2017-07-03→2017-07-10", obs: "Resto del período (~43 días) sin cobertura.", risk: "Alto" },
  { start: "2017-09-13", end: "2017-09-27", days: 14, dest: "Panamá", coverage: "Parcial", coveredDays: 8, types: ["DEPORTIVA"], detail: "Deportiva 2017-09-13→2017-09-20", obs: "Quedan ~7 días sin cobertura.", risk: "Medio" },
  { start: "2019-05-30", end: "2019-09-08", days: 101, dest: "Alemania → EE.UU. → España", coverage: "No", coveredDays: 0, types: [], detail: "—", obs: "Tramo continuo por múltiples cruces sin licencias.", risk: "Alto" },
  { start: "2021-06-18", end: "2021-08-24", days: 67, dest: "Estados Unidos", coverage: "No", coveredDays: 0, types: [], detail: "—", obs: "Ausencia prolongada sin licencia consignada.", risk: "Alto" },
  { start: "2022-06-23", end: "2022-08-29", days: 68, dest: "Estados Unidos → Colombia", coverage: "No", coveredDays: 0, types: [], detail: "—", obs: "Ausencia prolongada sin licencia consignada.", risk: "Alto" },
  { start: "2023-02-09", end: "2023-02-16", days: 7, dest: "Uruguay", coverage: "No", coveredDays: 0, types: [], detail: "—", obs: "Cruce corto sin licencia.", risk: "Bajo/Medio" },
  { start: "2023-02-27", end: "2023-03-08", days: 9, dest: "Panamá", coverage: "No", coveredDays: 0, types: [], detail: "—", obs: "Sin licencia consignada.", risk: "Medio" },
  { start: "2023-06-20", end: "2023-08-21", days: 62, dest: "Estados Unidos", coverage: "No", coveredDays: 0, types: [], detail: "—", obs: "Ausencia prolongada sin licencia consignada.", risk: "Alto" },
  { start: "2024-01-14", end: "2024-01-30", days: 16, dest: "Estados Unidos", coverage: "No", coveredDays: 0, types: [], detail: "—", obs: "Sin licencia superpuesta.", risk: "Medio/Alto" },
  { start: "2024-03-11", end: "2024-03-19", days: 8, dest: "Panamá", coverage: "No", coveredDays: 0, types: [], detail: "—", obs: "Cruce corto sin licencia.", risk: "Medio" },
  { start: "2024-04-04", end: "2024-04-16", days: 12, dest: "Perú", coverage: "Incompatible", coveredDays: 1, types: ["CUIDADO ESPOSO/A"], detail: "Cuidado de cónyuge 2024-04-13", obs: "Incompatibilidad material: cuidado de cónyuge mientras estaba en el exterior.", risk: "Alto" },
  { start: "2024-06-16", end: "2024-08-22", days: 67, dest: "Estados Unidos", coverage: "No", coveredDays: 0, types: [], detail: "—", obs: "Ausencia prolongada sin licencia consignada.", risk: "Alto" },
  { start: "2025-01-06", end: "2025-01-18", days: 12, dest: "Brasil", coverage: "No", coveredDays: 0, types: [], detail: "—", obs: "Viaje sin licencia superpuesta.", risk: "Medio" },
  { start: "2025-06-02", end: "2025-08-13", days: 72, dest: "Estados Unidos", coverage: "No", coveredDays: 0, types: [], detail: "—", obs: "Ausencia prolongada sin licencia consignada.", risk: "Alto" }
];

const fmtDate = (iso) => new Date(iso + "T00:00:00Z").toLocaleDateString("es-AR");

function ItemCard({ item }) {
  return (
    <Card className="rounded-2xl shadow-sm border p-4 grid gap-2">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-700">{fmtDate(item.start)} → {fmtDate(item.end)}</div>
        <div className="flex gap-2">
          <Badge variant="outline">{item.coverage}</Badge>
          <Badge variant="outline">{item.risk}</Badge>
        </div>
      </div>
      <div className="text-sm text-slate-700"><MapPin className="w-4 h-4 inline"/> {item.dest}</div>
      <div className="text-xs text-slate-600"><b>Obs:</b> {item.obs}</div>
    </Card>
  );
}

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const items = useMemo(() => {
    return BASE_DATA.filter(r =>
      r.dest.toLowerCase().includes(query.toLowerCase()) ||
      r.obs.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="p-6 max-w-5xl mx-auto grid gap-4">
      <h1 className="text-2xl font-bold">Godoy – Viajes vs Licencias</h1>
      <div className="flex gap-2">
        <Search className="w-4 h-4 text-slate-500"/>
        <Input placeholder="Buscar destino u observación..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, idx) => <ItemCard key={idx} item={it}/>)}
      </div>
    </div>
  );
}