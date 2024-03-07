"use client";

import { CircleIcon } from "lucide-react";
import { Map as MapContainer, MapProps, Point } from 'pigeon-maps';
import { useEffect, useState } from "react";

import { Marker } from "./marker";

const INITIAL_STATE_LOCATION = [-23.4667111, -46.5923237] as Point;

export function Map(props: MapProps) {
  const [location, setLocation] = useState<Point>(INITIAL_STATE_LOCATION);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  return (
    <MapContainer
      center={location}
      {...props}
      defaultZoom={15}
      attribution={false}
    >
      <Marker anchor={location}>
        <CircleIcon className="size-5 stroke-2 fill-blue-500" />
      </Marker>
      {props.children}
    </MapContainer>
  );
}