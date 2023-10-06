"use client";

import * as React from "react";
import Map from "react-map-gl";
import DeckGL from "@deck.gl/react/typed";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";

export const INITIAL_VIEW_STATE = {
  latitude: 51.233334,
  longitude: 6.783333,
  zoom: 10,
  minZoom: 5,
  maxZoom: 15,
};

const MainMap = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>((props, ref) => {
  const { resolvedTheme } = useTheme();

  return (
    <div {...props} ref={ref}>
      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true}>
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          mapStyle={
            resolvedTheme === "dark"
              ? "mapbox://styles/mapbox/dark-v11"
              : "mapbox://styles/mapbox/light-v11"
          }
        ></Map>
      </DeckGL>
    </div>
  );
});
MainMap.displayName = "MainMap";

export { MainMap };
