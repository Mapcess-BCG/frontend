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
import { Feedback, Obstacle, Polyline } from "@/api/routeService";
import Image from "next/image";
import {
  AlertOctagonIcon,
  CircleIcon,
  ConstructionIcon,
  LucideProps,
} from "lucide-react";
import { uniqBy } from "lodash";

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
    feedback?: Feedback[];
  }
>(
  (
    {
      startLocation,
      endLocation,
      polyline,
      obstacles,
      feedback,
      className,
      ...props
    },
    ref,
  ) => {
    const { resolvedTheme } = useTheme();

    const pathLayers = uniqBy(
      polyline?.map((segment) => ({
        id: segment.map((coord) => coord.toReversed()).join(","),
        data: segment,
      })),
      (segment) => segment.id,
    ).map(
      (segment) =>
        new PathLayer({
          id: segment.id,
          data: [
            {
              path: segment.data.map((coord) => coord.toReversed()),
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
          <DeckGLOverlay interleaved layers={layers} />
          {obstacles &&
            uniqBy(obstacles, (x) => x.id)?.map((obstacle) => (
              <Marker
                key={`obstacle-${obstacle.id}`}
                longitude={parseFloat(obstacle.obs_coordinate_long)}
                latitude={parseFloat(obstacle.obs_coordinate_lat)}
                anchor="bottom"
              >
                <div className="flex flex-col gap-4 rounded border-muted-foreground bg-muted p-2">
                  <div className="flex items-center gap-2">
                    {getObstacleIcon(obstacle.obs_type)}
                    <span className="text-lg">{obstacle.obs_comment}</span>
                  </div>
                  <img
                    src={obstacle.img_url}
                    alt={obstacle.obs_comment}
                    width={160}
                    height={160}
                  />
                </div>
              </Marker>
            ))}
          {feedback &&
            uniqBy(feedback, (x) => x.id).map((feedback) => (
              <Marker
                key={`feedback-${feedback.id}`}
                longitude={parseFloat(feedback.feed_coordinate_long)}
                latitude={parseFloat(feedback.feed_coordinate_lat)}
                anchor="bottom"
              >
                <div className="flex flex-col gap-1 rounded border-muted-foreground bg-muted p-2">
                  <span className="flex items-center gap-1 text-lg">
                    <AlertOctagonIcon className="h-6 w-6" />
                    <span className="capitalize">{feedback.feed_comment}</span>
                  </span>
                  <span className="text-muted-foreground">
                    Score {feedback.feed_score}
                  </span>
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
