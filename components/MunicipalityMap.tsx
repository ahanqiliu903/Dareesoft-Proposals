"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Municipality } from "@/lib/types";
import { STATUS_COLORS } from "@/lib/types";

// Centered on the mid-Atlantic to frame the NY → VA outreach corridor.
const MAP_CENTER: [number, number] = [40.0, -75.5];
const MAP_ZOOM = 6;

export default function MunicipalityMap({
  municipalities,
  selectedId,
  onSelect,
}: {
  municipalities: Municipality[];
  selectedId: number | null;
  onSelect: (m: Municipality) => void;
}) {
  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      scrollWheelZoom={false}
      className="h-[420px] w-full"
      style={{ background: "#eef1f5" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {municipalities.map((m) => {
        const selected = m.id === selectedId;
        return (
          <CircleMarker
            key={m.id}
            center={[m.lat, m.lng]}
            radius={selected ? 12 : 7}
            pathOptions={{
              color: selected ? "#1B2A4A" : "#ffffff",
              weight: selected ? 3 : 1.5,
              fillColor: STATUS_COLORS[m.status],
              fillOpacity: selected ? 1 : 0.85,
            }}
            eventHandlers={{ click: () => onSelect(m) }}
          >
            <Tooltip direction="top" offset={[0, -6]}>
              <span className="text-xs font-medium">
                {m.city}, {m.state}
              </span>
              <br />
              <span className="text-xs text-gray-500">{m.status}</span>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
