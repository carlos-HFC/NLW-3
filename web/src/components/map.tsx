"use client";
import { Map as MapContainer, Point } from 'pigeon-maps';

const position = [-23.4668839, -46.5924590] as Point;

export function Map() {
  return (
    <MapContainer
      center={position}
      zoom={15}
    />
  );
}