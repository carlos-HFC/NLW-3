"use client";

import { Map as MapContainer, MapProps } from 'pigeon-maps';

export function Map(props: MapProps) {
  return (
    <MapContainer
      center={[-23.4667111, -46.5923237]}
      {...props}
      attribution={false}
    />
  );
}