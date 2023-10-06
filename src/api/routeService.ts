export const getRoutes = async (from: string, to: string) => {
  const polylines = {
    geocoded_waypoints: [
      {
        geocoder_status: "OK",
        partial_match: true,
        place_id: "ChIJgUwxwri-cUERQ0fnO9RrVCU",
        types: ["establishment", "point_of_interest"],
      },
      {
        geocoder_status: "OK",
        place_id: "ChIJjTj0JQ3KuEcRbGimndK1yrg",
        types: ["establishment", "food", "point_of_interest", "restaurant"],
      },
    ],
    routes: [
      {
        id: "1",
        accessibilityScore: 4.5,
        timeMinutes: 10,
        wheelChairAccessible: true,
        bounds: {
          northeast: {
            lat: 51.22642219999999,
            lng: 6.779293,
          },
          southwest: {
            lat: 51.2158495,
            lng: 6.7583259,
          },
        },
        copyrights: "Map data \u00a92023 GeoBasis-DE/BKG (\u00a92009)",
        legs: [
          {
            distance: {
              text: "2.2 km",
              value: 2181,
            },
            duration: {
              text: "30 mins",
              value: 1775,
            },
            end_address: "Hammer Str. 2, 40219 D\u00fcsseldorf, Germany",
            end_location: {
              lat: 51.2158495,
              lng: 6.7583259,
            },
            start_address: "K\u00f6nigsallee 2, 40212 D\u00fcsseldorf, Germany",
            start_location: {
              lat: 51.226413,
              lng: 6.779293,
            },
            steps: [
              {
                distance: {
                  text: "0.1 km",
                  value: 147,
                },
                duration: {
                  text: "2 mins",
                  value: 116,
                },
                end_location: {
                  lat: 51.22553139999999,
                  lng: 6.778510199999999,
                },
                html_instructions:
                  "Head <b>west</b> on <b>K\u00f6nigsallee</b> toward <b>Theodor-K\u00f6rner-Stra\u00dfe</b>",
                polyline: {
                  points: "adtwHqakh@A@?@?@?@?N?bB?F@??@?@@@?@@@@@@@@@f@@`B@ZB",
                },
                start_location: {
                  lat: 51.226413,
                  lng: 6.779293,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "0.1 km",
                  value: 130,
                },
                duration: {
                  text: "2 mins",
                  value: 115,
                },
                end_location: {
                  lat: 51.2257022,
                  lng: 6.7767456,
                },
                html_instructions:
                  "Turn <b>right</b> onto <b>Theodor-K\u00f6rner-Stra\u00dfe</b>",
                maneuver: "turn-right",
                polyline: {
                  points: "q~swHu|jh@AbH_@z@",
                },
                start_location: {
                  lat: 51.22553139999999,
                  lng: 6.778510199999999,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "28 m",
                  value: 28,
                },
                duration: {
                  text: "1 min",
                  value: 27,
                },
                end_location: {
                  lat: 51.2254543,
                  lng: 6.776733000000001,
                },
                html_instructions:
                  "Turn <b>left</b> onto <b>Heinrich-Heine-Allee</b>",
                maneuver: "turn-left",
                polyline: {
                  points: "s_twHuqjh@L@b@@",
                },
                start_location: {
                  lat: 51.2257022,
                  lng: 6.7767456,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "0.3 km",
                  value: 306,
                },
                duration: {
                  text: "4 mins",
                  value: 246,
                },
                end_location: {
                  lat: 51.22514169999999,
                  lng: 6.7724056,
                },
                html_instructions: "Turn <b>right</b> onto <b>Flinger Str.</b>",
                maneuver: "turn-right",
                polyline: {
                  points:
                    "a~swHqqjh@En@?FEn@FhBBLJbBFv@ThDBXFpABb@BZ@\\?Z?Z?^AV",
                },
                start_location: {
                  lat: 51.2254543,
                  lng: 6.776733000000001,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "0.2 km",
                  value: 165,
                },
                duration: {
                  text: "2 mins",
                  value: 126,
                },
                end_location: {
                  lat: 51.224939,
                  lng: 6.770141,
                },
                html_instructions: "Continue onto <b>Rheinstra\u00dfe</b>",
                polyline: {
                  points: "c|swHqvih@f@tDD\\N|@?D?F?DCb@Gv@Gv@AJ",
                },
                start_location: {
                  lat: 51.22514169999999,
                  lng: 6.7724056,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "1.0 km",
                  value: 1012,
                },
                duration: {
                  text: "14 mins",
                  value: 820,
                },
                end_location: {
                  lat: 51.21782109999999,
                  lng: 6.762529199999999,
                },
                html_instructions: "Take the pedestrian overpass",
                polyline: {
                  points:
                    "{zswHkhih@JFVLz@d@p@^DBZN^T@?x@f@FBn@^hAl@NHnAt@JF|BrADB`@T`@RNJNHf@TRJFD`@TFDVLZPDBRLf@ZDB`@V^VJFRNXTDB@@VRFFBBBBFFBBB@BD@?FHFHBBDFDFHJDFXh@BFR^FLL^LZ@HHTPp@L^FNTl@HRFZFXDXBXB\\Bl@?J@ZB\\@TEp@",
                },
                start_location: {
                  lat: 51.224939,
                  lng: 6.770141,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "0.2 km",
                  value: 163,
                },
                duration: {
                  text: "2 mins",
                  value: 131,
                },
                end_location: {
                  lat: 51.2169381,
                  lng: 6.761038,
                },
                html_instructions:
                  "Turn <b>left</b> onto <b>Stromstra\u00dfe</b>",
                maneuver: "turn-left",
                polyline: {
                  points:
                    "knrwHyxgh@D@D@F@D@D?FADAFADAD?B@D?B@B@BBBDBFBFBFBF@FDPDNBL@FDXPjAHd@DTFV",
                },
                start_location: {
                  lat: 51.21782109999999,
                  lng: 6.762529199999999,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "44 m",
                  value: 44,
                },
                duration: {
                  text: "1 min",
                  value: 36,
                },
                end_location: {
                  lat: 51.2166818,
                  lng: 6.7605742,
                },
                html_instructions:
                  "Slight <b>right</b> to stay on <b>Stromstra\u00dfe</b>",
                maneuver: "turn-slight-right",
                polyline: {
                  points: "{hrwHoogh@@PLZJPV\\",
                },
                start_location: {
                  lat: 51.2169381,
                  lng: 6.761038,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "0.2 km",
                  value: 167,
                },
                duration: {
                  text: "2 mins",
                  value: 142,
                },
                end_location: {
                  lat: 51.2159385,
                  lng: 6.758562899999999,
                },
                html_instructions:
                  "Turn <b>right</b> to stay on <b>Stromstra\u00dfe</b>",
                maneuver: "turn-right",
                polyline: {
                  points: "ggrwHqlgh@EVFl@DLFRHTPb@f@dBL\\p@jB",
                },
                start_location: {
                  lat: 51.2166818,
                  lng: 6.7605742,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "19 m",
                  value: 19,
                },
                duration: {
                  text: "1 min",
                  value: 16,
                },
                end_location: {
                  lat: 51.2158495,
                  lng: 6.7583259,
                },
                html_instructions:
                  'Continue onto <b>Hammer Str.</b><div style="font-size:0.9em">Destination will be on the left</div>',
                polyline: {
                  points: "sbrwH_`gh@J\\DN",
                },
                start_location: {
                  lat: 51.2159385,
                  lng: 6.758562899999999,
                },
                travel_mode: "WALKING",
              },
            ],
            traffic_speed_entry: [],
            via_waypoint: [],
          },
        ],
        overview_polyline: {
          points:
            "adtwHqakh@AF@zBDJj@D`B@ZBAbH_@z@p@BEv@En@FhBNpBh@lIHxB?z@AVf@tDTzA?LSxCAJJFrAr@rBhArBjA|JvFlCxA|ChBxAdAf@`@d@d@V\\l@dAv@hBj@pB\\|@Pn@PlAHrBDr@Ep@D@LBJ@ZGRBNRL^Pv@f@`DHh@Xl@V\\EVLz@jArD~@hCPl@",
        },
        summary: "Stromstra\u00dfe",
        warnings: [
          "Walking directions are in beta. Use caution \u2013 This route may be missing sidewalks or pedestrian paths.",
        ],
        waypoint_order: [],
      },
    ],
    status: "OK",
  };

  return polylines.routes;
};
