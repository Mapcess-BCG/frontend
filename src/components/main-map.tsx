"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import Map, {
  GeolocateControl,
  Layer,
  NavigationControl,
  Source,
} from "react-map-gl";
import { useTheme } from "next-themes";
import { IconLayer, PathLayer, TextLayer } from "@deck.gl/layers/typed";
import { DeckGL } from "@deck.gl/react/typed";

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

const MainMap = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    paths?: [number, number][];
    startLocation?: {
      lat: number;
      lng: number;
    };
    endLocation?: {
      lat: number;
      lng: number;
    };
  }
>(({ startLocation, endLocation, paths, ...props }, ref) => {
  const { resolvedTheme } = useTheme();

  const pathLayer = new PathLayer({
    id: "path-layer",
    data: [{ path: paths, name: "path", color: [255, 0, 0] }],
    pickable: true,
    widthScale: 20,
    widthMinPixels: 2,
    getPath: (d) => d.path,
    getColor: (d) => d.color,
    getWidth: (d) => 5,
  });

  const iconLayer = new IconLayer({
    id: "icon-layer",
    data: [
      {
        name: "start",
        coordinates: [startLocation?.lng, startLocation?.lat],
      },
      {
        name: "end",
        coordinates: [endLocation?.lng, endLocation?.lat],
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

  const layers = [pathLayer, iconLayer];

  return (
    <div {...props} ref={ref}>
      <DeckGL
        layers={layers}
        initialViewState={{
          latitude: startLocation ? startLocation.lat : 51.233334,
          longitude: startLocation ? startLocation.lng : 6.783333,
          zoom: 10,
          minZoom: 5,
          maxZoom: 15,
          pitch: 40.5,
          bearing: -27.396674584323023,
        }}
        controller
      >
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          mapStyle={
            resolvedTheme === "dark"
              ? "mapbox://styles/mapbox/dark-v11"
              : "mapbox://styles/mapbox/light-v11"
          }
        >
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          <NavigationControl position="bottom-left" />
        </Map>
      </DeckGL>
    </div>
  );
});
MainMap.displayName = "MainMap";

export default MainMap;
