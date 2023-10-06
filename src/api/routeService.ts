import { randomUUID } from "crypto";
import * as z from "zod";

const API_URL = "http://18.195.60.123/routes";

const obstacleSchema = z.object({
  id: z.string(),
  img_url: z.string(),
  obs_comment: z.string(),
  obs_coordinate_lat: z.string(),
  obs_coordinate_long: z.string(),
  obs_created: z.string(),
  obs_resolved: z.string(),
  obs_type: z.string(),
});

const routeSchema = z
  .object({
    feedback: z.unknown().array(),
    obstacles: obstacleSchema.array(),
    polyline: z.tuple([z.number(), z.number()]).array().array(),
  })
  .array();

export type Route = z.infer<typeof routeSchema>[0];
export type Obstacle = z.infer<typeof obstacleSchema>;
export type Polyline = Route["polyline"];

export const getRoutes = async (from: string, to: string) => {
  const url = encodeURI(`${API_URL}?origin=${from}&destination=${to}`);
  const response = await fetch(url);

  const data = await response.json();

  const result = routeSchema.parse(data);

  return result.map((route) => {
    const random = Math.random();

    return {
      ...route,
      accessibilityScore: parseFloat((random * 5).toFixed(2)),
      id: randomUUID(),
      timeMinutes: (0.1 * route.polyline.flat().length).toFixed(2),
      wheelchairAccessible: random > 0.3,
    };
  });
};
