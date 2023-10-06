"use client";

import * as React from "react";
import Map, {
  GeolocateControl,
  NavigationControl,
  useControl,
} from "react-map-gl";
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox/typed";
import { useTheme } from "next-themes";
import { IconLayer, PathLayer } from "@deck.gl/layers/typed";

import "mapbox-gl/dist/mapbox-gl.css";
import { cn } from "@/lib/utils";
import { Polyline } from "@/api/routeService";
import { randomUUID } from "crypto";

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

const DeckGLOverlay = (props: MapboxOverlayProps) => {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
};

const MainMap = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    polyline?: Polyline;
    startLocation?: [number, number];
    endLocation?: [number, number];
  }
>(({ startLocation, endLocation, polyline, className, ...props }, ref) => {
  const { resolvedTheme } = useTheme();

  const pathLayers = polyline?.map(
    (segment) =>
      new PathLayer({
        id: segment.map((coord) => coord.toReversed()).join(","),
        data: [
          {
            path: segment.map((coord) => coord.toReversed()),
            name: "path",
            color: [255, 0, 0],
          },
        ],
        pickable: true,
        widthScale: 5,
        widthMinPixels: 1,
        getPath: (d) => d.path,
        getColor: (d) => d.color,
        getWidth: (d) => 2,
      }),
  );

  const iconLayer = new IconLayer({
    data: [
      {
        name: "start",
        coordinates: startLocation?.toReversed(),
      },
      {
        name: "end",
        coordinates: endLocation?.toReversed(),
      },
    ],
    pickable: true,
    iconAtlas:
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
    iconMapping: ICON_MAPPING,
    getIcon: (d) => "marker",
    sizeScale: 15,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 5,
    getColor: (d) => [Math.sqrt(d.exits), 140, 0],
  });

  const layers = pathLayers ? [...pathLayers, iconLayer] : [iconLayer];

  return (
    <div
      {...props}
      ref={ref}
      className={cn("absolute inset-0 h-full w-full", className)}
    >
      <Map
        reuseMaps={true}
        attributionControl={false}
        initialViewState={{
          longitude: startLocation ? startLocation[1] : 6.783333,
          latitude: startLocation ? startLocation[0] : 51.233334,
          zoom: 14,
        }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapStyle={
          resolvedTheme === "dark"
            ? "mapbox://styles/mapbox/dark-v11"
            : "mapbox://styles/mapbox/light-v11"
        }
      >
        <DeckGLOverlay layers={layers} />
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          position="bottom-left"
        />
        <NavigationControl position="bottom-left" />
      </Map>
    </div>
  );
});
MainMap.displayName = "MainMap";

export default MainMap;
