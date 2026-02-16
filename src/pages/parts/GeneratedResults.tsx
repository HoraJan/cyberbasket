import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { STATS } from "./Stats";
import { norminv } from "../../utils/norminv";
// Gameplay simulation constants
const GAME_MINUTES = 48;
const QUARTERS = 4;
const MINUTES_PER_QUARTER = GAME_MINUTES / QUARTERS;

type ActionType = "defense" | "3pt" | "dunk" | "foul";
type Action = {
  minute: number;
  quarter: number;
  type: ActionType;
  points: number;
  description: string;
  teamWithBall: 1 | 2;
  scoreA: number;
  scoreB: number;
};

function simulateGameplay() {
  const actions: Action[] = [];
  let scoreA = 0;
  let scoreB = 0;
  let teamWithBall: 1 | 2 = Math.random() < 0.5 ? 1 : 2;
  for (let min = 1; min <= GAME_MINUTES; min += 1) {
    const quarter = Math.ceil(min / MINUTES_PER_QUARTER);
    // Randomly decide action
    const r = Math.random();
    let type: ActionType = "defense";
    let points = 0;
    let description = "";
    if (r < 0.25) {
      type = "3pt";
      points = 3;
      description = "Three-point shot";
    } else if (r < 0.45) {
      type = "dunk";
      points = 2;
      description = "Dunk";
    } else if (r < 0.6) {
      type = "foul";
      // Each free throw is 50% chance for a point
      const ft1 = Math.random() < 0.5 ? 1 : 0;
      const ft2 = Math.random() < 0.5 ? 1 : 0;
      points = ft1 + ft2;
      description = `Foul: Free throws (${ft1 + ft2}/2)`;
    } else {
      type = "defense";
      description = "Defense";
    }
    // Add points to the team with the ball
    if (teamWithBall === 1) {
      scoreA += points;
    } else {
      scoreB += points;
    }
    actions.push({
      minute: min,
      quarter,
      type,
      points,
      description,
      teamWithBall,
      scoreA,
      scoreB,
    });
    // Switch ball possession for next minute
    teamWithBall = teamWithBall === 1 ? 2 : 1;
  }
  return actions;
}

const DISTRIBUTION = [5, 10, 20, 30, 20, 10, 5];
const SUMMED_DISTRIBUTION = DISTRIBUTION.reduce((acc, curr) => {
  const last = acc.pop() || 0;
  return [...acc, last, last + curr];
}, [] as number[]);

const getIndex = () => {
  const value = Math.random() * 100;
  const index = SUMMED_DISTRIBUTION.findIndex((val, ind, arr) => {
    const next = arr[ind + 1];

    if (next) return next > value;

    return 0;
  });

  return index;
};

const getShoot = () => {
  let rawValue = Math.round(norminv(Math.random(), 50, 20));
  if (rawValue > 210) rawValue -= 10;
  if (rawValue < 25) return 25;
  if (rawValue > 75) return 75;

  return rawValue;
};

const getDunk = () => {
  let rawValue = Math.round(norminv(Math.random(), 50, 20));
  if (rawValue < 190) rawValue -= 10;
  if (rawValue < 35) return 35;
  if (rawValue > 85) return 85;

  return rawValue;
};

const getHeight = () => {
  const rawValue = Math.round(norminv(Math.random(), 200, 20));
  if (rawValue < 170) return 170;
  if (rawValue > 230) return 230;

  return rawValue;
};

export const GeneratedResults = () => {
  const { t } = useTranslation();
  // Always 12 players per team
  const teamSize = 12;
  // Crazy ecstatic player names
  const crazyNames = [
    "Blaze Thunderpants",
    "Rocket McBuckets",
    "Slammin’ Jamal",
    "Turbo Vortex",
    "Flash “The Dash”",
    "Ziggy Boom",
    "Laser McSwagger",
    "Dizzy Dunkatron",
    "Maverick Wildfire",
    "Juke Skywalker",
    "Crash Lightning",
    "Bam-Bam Bigshot",
    "Viper Spinmaster",
    "Funky Jetstream",
    "Razzle Dazzle",
    "Whizbang McFly",
    "Snazzy Slamurai",
    "Twister Blitz",
    "Groovy Slamjam",
    "Buzz “The Tower”",
    "Frenzy Fireball",
    "Slick Trickster",
    "Rumble Rooster",
    "Zappy Zinger",
  ];
  // Generate 24 players
  const players = Array(teamSize * 2)
    .fill(0)
    .map((_, i) => ({
      id: i + 1,
      name: crazyNames[i % crazyNames.length],
      stats: STATS.map(() => getIndex()),
      shoot: getShoot(),
      dunk: getDunk(),
      height: getHeight(),
    }));
  const teamA = players.slice(0, teamSize);
  const teamB = players.slice(teamSize);

  const columnStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    maxHeight: 600,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  };
  // Simulate gameplay actions
  const actions = React.useMemo(() => simulateGameplay(), []);

  return (
    <div style={{ display: "flex", gap: 16, width: "100%" }}>
      {/* Team 1 */}
      <div style={columnStyle}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="team-a-table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={STATS.length + 4} align="center">
                  {t("generatedResults")} – Team 1
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell
                  key="A"
                  sx={{ width: 32, p: 0.5, textAlign: "center" }}
                >
                  A
                </TableCell>
                <TableCell
                  key="D"
                  sx={{ width: 32, p: 0.5, textAlign: "center" }}
                >
                  D
                </TableCell>
                <TableCell
                  key="P"
                  sx={{ width: 32, p: 0.5, textAlign: "center" }}
                >
                  P
                </TableCell>
                <TableCell
                  key="S"
                  sx={{ width: 32, p: 0.5, textAlign: "center" }}
                >
                  S
                </TableCell>
                <TableCell
                  key="M"
                  sx={{ width: 32, p: 0.5, textAlign: "center" }}
                >
                  M
                </TableCell>
                <TableCell sx={{ width: 48, p: 0.5, textAlign: "center" }}>
                  D
                </TableCell>
                <TableCell sx={{ width: 48, p: 0.5, textAlign: "center" }}>
                  H
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamA.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.name}</TableCell>
                  {/* A, D, P, S, M order, then D (dunk), H (height) */}
                  <TableCell key={`teamA-${player.id}-attack`}>
                    {player.stats[0]}
                  </TableCell>
                  <TableCell key={`teamA-${player.id}-defense`}>
                    {player.stats[1]}
                  </TableCell>
                  <TableCell key={`teamA-${player.id}-pass`}>
                    {player.stats[2]}
                  </TableCell>
                  <TableCell key={`teamA-${player.id}-shoot`}>
                    {player.shoot}
                  </TableCell>
                  <TableCell key={`teamA-${player.id}-muscles`}>
                    {player.stats[3]}
                  </TableCell>
                  <TableCell key={`teamA-${player.id}-dunk`}>
                    {player.dunk}
                  </TableCell>
                  <TableCell key={`teamA-${player.id}-height`}>
                    {player.height}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* Gameplay placeholder */}
      <div
        style={{
          ...columnStyle,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            width: "100%",
            minHeight: 400,
            maxHeight: 600,
            overflowY: "auto",
            p: 2,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
            Gameplay Simulation
          </div>
          {[1, 2, 3, 4].map((quarter) => (
            <React.Fragment key={quarter}>
              <div style={{ fontWeight: 600, margin: "12px 0 4px 0" }}>
                Quarter {quarter}
              </div>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Minute</TableCell>
                    <TableCell align="right">Team 1</TableCell>
                    <TableCell align="center">Score</TableCell>
                    <TableCell align="left">Team 2</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {actions
                    .filter((action) => action.quarter === quarter)
                    .map((action) => {
                      const isTeam1 = action.teamWithBall === 1;
                      let left = "";
                      let right = "";
                      if (action.type === "defense") {
                        // Defense is shown on the other team
                        if (isTeam1) {
                          right = action.description;
                        } else {
                          left = action.description;
                        }
                      } else {
                        if (isTeam1) {
                          left = action.description;
                        } else {
                          right = action.description;
                        }
                      }
                      return (
                        <TableRow
                          key={action.minute}
                          style={{
                            opacity: action.type === "defense" ? 0.5 : 1,
                          }}
                        >
                          <TableCell>{action.minute}</TableCell>
                          <TableCell align="right">{left}</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 600 }}>
                            {action.scoreA}:{action.scoreB}
                          </TableCell>
                          <TableCell align="left">{right}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </React.Fragment>
          ))}
        </Paper>
      </div>
      {/* Team 2 */}
      <div style={columnStyle}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="team-b-table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={STATS.length + 4} align="center">
                  {t("generatedResults")} – Team 2
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell
                  key="A"
                  sx={{ width: 32, p: 0.5, textAlign: "center" }}
                >
                  A
                </TableCell>
                <TableCell
                  key="D"
                  sx={{ width: 32, p: 0.5, textAlign: "center" }}
                >
                  D
                </TableCell>
                <TableCell
                  key="P"
                  sx={{ width: 32, p: 0.5, textAlign: "center" }}
                >
                  P
                </TableCell>
                <TableCell
                  key="S"
                  sx={{ width: 32, p: 0.5, textAlign: "center" }}
                >
                  S
                </TableCell>
                <TableCell
                  key="M"
                  sx={{ width: 32, p: 0.5, textAlign: "center" }}
                >
                  M
                </TableCell>
                <TableCell sx={{ width: 48, p: 0.5, textAlign: "center" }}>
                  D
                </TableCell>
                <TableCell sx={{ width: 48, p: 0.5, textAlign: "center" }}>
                  H
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamB.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.name}</TableCell>
                  {/* A, D, P, S, M order, then D (dunk), H (height) */}
                  <TableCell key={`teamB-${player.id}-attack`}>
                    {player.stats[0]}
                  </TableCell>
                  <TableCell key={`teamB-${player.id}-defense`}>
                    {player.stats[1]}
                  </TableCell>
                  <TableCell key={`teamB-${player.id}-pass`}>
                    {player.stats[2]}
                  </TableCell>
                  <TableCell key={`teamB-${player.id}-shoot`}>
                    {player.shoot}
                  </TableCell>
                  <TableCell key={`teamB-${player.id}-muscles`}>
                    {player.stats[3]}
                  </TableCell>
                  <TableCell key={`teamB-${player.id}-dunk`}>
                    {player.dunk}
                  </TableCell>
                  <TableCell key={`teamB-${player.id}-height`}>
                    {player.height}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
