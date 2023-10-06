import { randomUUID } from "crypto";
import * as z from "zod";

const API_URL = "http://18.195.60.123/routes";

const routeSchema = z
  .object({
    feedback: z.unknown().array(),
    obstacles: z.unknown().array(),
    polyline: z.tuple([z.number(), z.number()]).array().array(),
  })
  .array();

export type Route = z.infer<typeof routeSchema>[0];
export type Polyline = Route["polyline"];

export const getRoutes = async (from: string, to: string) => {
  const url = encodeURI(`${API_URL}?origin=${from}&destination=${to}`);
  const response = await fetch(url);

  console.log(url);
  const data = await response.json();
  console.log(data);

  const result = routeSchema.parse(data);
  console.log(result);

  return result.map((route) => ({
    ...route,
    accessibilityScore: 2.5,
    id: randomUUID(),
    timeMinutes: 10,
    wheelchairAccessible: true,
  }));
};
