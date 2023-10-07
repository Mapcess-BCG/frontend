"use client";

import * as React from "react";
import { MapProvider as MapGLMapProvider } from "react-map-gl";

export function MapProvider({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof MapGLMapProvider>) {
  return <MapGLMapProvider {...props}>{children}</MapGLMapProvider>;
}
