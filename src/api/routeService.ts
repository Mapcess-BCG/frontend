import { randomUUID } from "crypto";
import * as z from "zod";

const API_URL = "http://18.195.60.123/routes";

const obstacleSchema = z.object({
  id: z.string(),
  img: z.string(),
  img_url: z.string(),
  obs_comment: z.string(),
  obs_coordinate_lat: z.string(),
  obs_coordinate_long: z.string(),
  obs_created: z.string(),
  obs_resolved: z.string(),
  obs_type: z.enum(["construction", "rock"]),
});

const feedbackSchema = z.object({
  id: z.string(),
  path_id: z.string(),
  feed_comment: z.string(),
  feed_coordinate_lat: z.string(),
  feed_coordinate_long: z.string(),
  feed_created: z.string(),
  feed_problem: z.coerce.boolean(),
  feed_score: z.string(),
});

const routeSchema = z
  .object({
    feedback: feedbackSchema.array(),
    obstacles: obstacleSchema.array(),
    polyline: z.tuple([z.number(), z.number()]).array().array(),
    score: z.number(),
  })
  .array();

export type Route = z.infer<typeof routeSchema>[0];
export type Obstacle = z.infer<typeof obstacleSchema>;
export type Feedback = z.infer<typeof feedbackSchema>;
export type Polyline = Route["polyline"];

export const getRoutes = async (from: string, to: string) => {
  const url = encodeURI(
    `${API_URL}?origin=${from}&destination=${to}?hello=test`,
  );

  console.log("GET", url);
  const response = await fetch(url);

  // const text = await response.text();
  // console.log(text);

  if (!response.ok) {
    console.error(
      "Error fetching routes",
      response.status,
      response.statusText,
    );
    return [];
  }

  const data = await response.json();

  // console.log(JSON.stringify(data, null, 2));

  const result = routeSchema.parse(data);

  console.log(result);

  return result.map((route) => {
    const score = parseFloat(route.score.toFixed(2));
    return {
      ...route,
      accessibilityScore: score,
      id: randomUUID(),
      timeMinutes: (0.1 * route.polyline.flat().length).toFixed(2),
      wheelchairAccessible: score >= 2.8,
    };
  });
};
