"use client";

import * as React from "react";
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  useControl,
} from "react-map-gl";
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox/typed";
import { useTheme } from "next-themes";
import { IconLayer, PathLayer } from "@deck.gl/layers/typed";

import "mapbox-gl/dist/mapbox-gl.css";
import "./mapbox.css";
import { cn } from "@/lib/utils";
import { Obstacle, Polyline } from "@/api/routeService";
import Image from "next/image";
import { CircleIcon, ConstructionIcon, LucideProps } from "lucide-react";

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

type ObstacleType = Obstacle["obs_type"];

const obstacleIcons: Record<
  ObstacleType,
  React.ForwardRefExoticComponent<LucideProps>
> = {
  construction: ConstructionIcon,
  rock: CircleIcon,
};

const getObstacleIcon = (type: ObstacleType) => {
  const Icon = obstacleIcons[type];
  return <Icon className="h-6 w-6" />;
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
    obstacles?: Obstacle[];
  }
>(
  (
    { startLocation, endLocation, polyline, obstacles, className, ...props },
    ref,
  ) => {
    const { resolvedTheme } = useTheme();

    const pathLayers = polyline?.map(
      (segment) =>
        new PathLayer({
          id: segment.map((coord) => coord.toReversed()).join(","),
          data: [
            {
              path: segment.map((coord) => coord.toReversed()),
              name: "path",
              color: [20, 20, 200],
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
          name: "end",
          coordinates: endLocation?.toReversed(),
        },
      ],
      iconAtlas:
        "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
      iconMapping: ICON_MAPPING,
      getIcon: (d) => "marker",
      sizeScale: 15,
      getPosition: (d) => d.coordinates,
      getSize: (d) => 5,
      getColor: (d) => [200, 20, 20],
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
          {obstacles?.map((obstacle) => (
            <Marker
              key={obstacle.id}
              longitude={parseFloat(obstacle.obs_coordinate_long)}
              latitude={parseFloat(obstacle.obs_coordinate_lat)}
            >
              <div className="rounded border-muted-foreground bg-muted p-2">
                <div className="flex items-center gap-2">
                  {getObstacleIcon(obstacle.obs_type)}
                  <span className="text-lg">{obstacle.obs_comment}</span>
                </div>
                <img
                  src={obstacle.img_url}
                  alt={obstacle.obs_comment}
                  width={32}
                  height={32}
                />
              </div>
            </Marker>
          ))}
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            position="bottom-left"
          />
          <NavigationControl position="bottom-left" />
        </Map>
      </div>
    );
  },
);
MainMap.displayName = "MainMap";

export default MainMap;
