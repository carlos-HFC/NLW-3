"use client";

import { Map as MapContainer, MapProps } from 'pigeon-maps';

export function Map(props: MapProps) {
  return (
    <MapContainer
      defaultCenter={[-23.4667111, -46.5923237]}
      defaultZoom={15}
      {...props}
    />
  );
}