import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTranslation } from "react-i18next";
import { STATS } from "./Stats";
import { norminv } from "../../utils/norminv";
// Gameplay simulation constants
const GAME_MINUTES = 48;
const QUARTERS = 4;
const SECONDS_PER_GAME = GAME_MINUTES * 60;
const MINUTES_PER_QUARTER = GAME_MINUTES / QUARTERS;

type ActionType = "defense" | "3pt" | "dunk" | "foul";
type Action = {
  time: number; // seconds elapsed
  minute: number;
  quarter: number;
  type: ActionType;
  points: number;
  description: string;
  teamWithBall: 1 | 2;
  scoreA: number;
  scoreB: number;
};

function simulateGameplay(teamA?: any[], teamB?: any[]) {
  const actions: Action[] = [];
  let scoreA = 0;
  let scoreB = 0;
  let teamWithBall: 1 | 2 = Math.random() < 0.5 ? 1 : 2;
  let time = 0;
  const teamAPlayers = teamA && teamA.length ? teamA : undefined;
  const teamBPlayers = teamB && teamB.length ? teamB : undefined;
  while (time < SECONDS_PER_GAME) {
    // Random turn duration between 5 and 24 seconds
    const turnDuration = Math.floor(Math.random() * 20) + 5;
    time += turnDuration;
    if (time > SECONDS_PER_GAME) break;
    const min = Math.floor(time / 60) + 1;
    const quarter = Math.ceil(min / MINUTES_PER_QUARTER);
    // Randomly decide action
    const r = Math.random();
    let type: ActionType = "defense";
    let points = 0;
    let description = "";
    // Pick a random player from each team (if available)
    const playerA = teamAPlayers
      ? teamAPlayers[Math.floor(Math.random() * teamAPlayers.length)]?.name
      : undefined;
    const playerB = teamBPlayers
      ? teamBPlayers[Math.floor(Math.random() * teamBPlayers.length)]?.name
      : undefined;
    if (r < 0.25) {
      type = "3pt";
      points = 3;
      if (teamWithBall === 1 && playerA) {
        description = `${playerA} scores 3 points!`;
      } else if (teamWithBall === 2 && playerB) {
        description = `${playerB} scores 3 points!`;
      } else {
        description = "Scores 3 points!";
      }
    } else if (r < 0.45) {
      type = "dunk";
      points = 2;
      if (teamWithBall === 1 && playerA) {
        description = `Awesome dunk by ${playerA}!`;
      } else if (teamWithBall === 2 && playerB) {
        description = `Awesome dunk by ${playerB}!`;
      } else {
        description = "Awesome dunk!";
      }
    } else if (r < 0.6) {
      type = "foul";
      // Each free throw is 50% chance for a point
      const ft1 = Math.random() < 0.5 ? 1 : 0;
      const ft2 = Math.random() < 0.5 ? 1 : 0;
      points = ft1 + ft2;
      if (teamWithBall === 1 && playerA && playerB) {
        description = `Foul by ${playerA}, ${playerB} made ${points}/2 free throws`;
      } else if (teamWithBall === 2 && playerA && playerB) {
        description = `Foul by ${playerB}, ${playerA} made ${points}/2 free throws`;
      } else {
        description = `Foul: made ${points}/2 free throws`;
      }
    } else {
      type = "defense";
      if (teamWithBall === 1 && playerB) {
        description = `Great defense by ${playerB}`;
      } else if (teamWithBall === 2 && playerA) {
        description = `Great defense by ${playerA}`;
      } else {
        description = "Great defense!";
      }
    }
    // Add points to the team with the ball
    if (teamWithBall === 1) {
      scoreA += points;
    } else {
      scoreB += points;
    }
    actions.push({
      time,
      minute: min,
      quarter,
      type,
      points,
      description,
      teamWithBall,
      scoreA,
      scoreB,
    });
    // Switch ball possession for next turn
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
  const teamSize = 12;
  const [teamAName, setTeamAName] = useState("Team 1");
  const [teamBName, setTeamBName] = useState("Team 2");
  const firstNames = [
    "Blaze",
    "Rocket",
    "Jamal",
    "Turbo",
    "Flash",
    "Ziggy",
    "Laser",
    "Dizzy",
    "Maverick",
    "Juke",
    "Crash",
    "Bam-Bam",
    "Viper",
    "Funky",
    "Razzle",
    "Whizbang",
    "Snazzy",
    "Twister",
    "Groovy",
    "Buzz",
    "Frenzy",
    "Slick",
    "Rumble",
    "Zappy",
    "Ace",
    "Sky",
    "Storm",
    "Lucky",
    "Jazz",
    "Spike",
    "Dash",
    "Mondo",
    "Rex",
    "Chase",
    "Rip",
    "Slam",
    "Max",
    "Bolt",
    "Duke",
    "Jet",
  ];
  const lastNames = [
    "Thunderpants",
    "McBuckets",
    "Wildfire",
    "Vortex",
    "McSwagger",
    "Dunkatron",
    "Spinmaster",
    "Jetstream",
    "Dazzle",
    "McFly",
    "Slamurai",
    "Blitz",
    "Slamjam",
    "The Tower",
    "Fireball",
    "Trickster",
    "Rooster",
    "Zinger",
    "Lightning",
    "Bigshot",
    "Skywalker",
    "Boom",
    "Dash",
    "Flash",
    "Storm",
    "Razzle",
    "Frenzy",
    "Crash",
    "Rumble",
    "Ace",
    "Rip",
    "Max",
    "Bolt",
    "Duke",
    "Jet",
    "Mondo",
    "Rex",
    "Chase",
    "Slam",
    "Lucky",
  ];
  // Helper to generate unique names
  const generateUniqueNames = (count: number) => {
    const combinations = [];
    for (let f = 0; f < firstNames.length; f++) {
      for (let l = 0; l < lastNames.length; l++) {
        combinations.push(`${firstNames[f]} ${lastNames[l]}`);
      }
    }
    // Shuffle
    for (let i = combinations.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = combinations[i] as string;
      combinations[i] = combinations[j] as string;
      combinations[j] = temp;
    }
    return combinations.slice(0, count);
  };

  // Team state
  const [teamA, setTeamA] = useState<any[] | null>(null);
  const [teamB, setTeamB] = useState<any[] | null>(null);

  // Drag and drop logic for reordering players
  function movePlayer(team: "A" | "B", dragIndex: number, hoverIndex: number) {
    if (team === "A" && teamA) {
      const updated = [...teamA];
      const [removed] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, removed);
      setTeamA(updated);
    } else if (team === "B" && teamB) {
      const updated = [...teamB];
      const [removed] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, removed);
      setTeamB(updated);
    }
  }

  type DragItem = { index: number };

  // Move DraggablePlayerRow outside GeneratedResults
  type DraggablePlayerRowProps = {
    player: any;
    index: number;
    team: "A" | "B";
    movePlayer: (team: "A" | "B", from: number, to: number) => void;
    isLastOfFive: boolean;
  };
  const DraggablePlayerRow: React.FC<DraggablePlayerRowProps> = ({
    player,
    index,
    team,
    movePlayer,
    isLastOfFive,
  }) => {
    const ref = React.useRef<HTMLTableRowElement>(null);
    const isDnDEnabled = true; // DnD enabled state should be passed as prop if needed
    const [, drop] = useDrop<DragItem>({
      accept: `PLAYER_${team}`,
      hover: (item: any) => {
        if (!isDnDEnabled) return;
        if (!ref.current || item.index === index) return;
        movePlayer(team, item.index, index);
        item.index = index;
      },
    });
    const [{ isDragging }, drag] = useDrag<
      DragItem,
      void,
      { isDragging: boolean }
    >({
      type: `PLAYER_${team}`,
      canDrag: isDnDEnabled,
      item: { index },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
    if (isDnDEnabled) drag(drop(ref));
    return (
      <TableRow
        ref={ref}
        style={{
          opacity: isDragging ? 0.5 : 1,
          borderBottom: isLastOfFive ? "4px solid #333" : undefined,
          cursor: isDnDEnabled ? "grab" : "not-allowed",
        }}
      >
        <TableCell style={{ width: 32, textAlign: "center", padding: 0 }}>
          <DragIndicatorIcon
            style={{
              color: isDnDEnabled ? "#888" : "#ccc",
              verticalAlign: "middle",
            }}
          />
        </TableCell>
        <TableCell>{player.name}</TableCell>
        {/* A, D, P, S, M order, then D (dunk), H (height) */}
        <TableCell key={`team${team}-${player.id}-attack`}>
          {player.stats[0]}
        </TableCell>
        <TableCell key={`team${team}-${player.id}-defense`}>
          {player.stats[1]}
        </TableCell>
        <TableCell key={`team${team}-${player.id}-pass`}>
          {player.stats[2]}
        </TableCell>
        <TableCell key={`team${team}-${player.id}-shoot`}>
          {player.shoot}
        </TableCell>
        <TableCell key={`team${team}-${player.id}-muscles`}>
          {player.stats[3]}
        </TableCell>
        <TableCell key={`team${team}-${player.id}-dunk`}>
          {player.dunk}
        </TableCell>
        <TableCell key={`team${team}-${player.id}-height`}>
          {player.height}
        </TableCell>
      </TableRow>
    );
  };

  // Generate a team
  // Generate both teams with unique names across all players
  const generateTeams = () => {
    const totalPlayers = teamSize * 2;
    const uniqueNames = generateUniqueNames(totalPlayers);
    const teamAPlayers = Array(teamSize)
      .fill(0)
      .map((_, i) => ({
        id: i + 1,
        name: uniqueNames[i],
        stats: STATS.map(() => getIndex()),
        shoot: getShoot(),
        dunk: getDunk(),
        height: getHeight(),
      }));
    const teamBPlayers = Array(teamSize)
      .fill(0)
      .map((_, i) => ({
        id: i + 1,
        name: uniqueNames[teamSize + i],
        stats: STATS.map(() => getIndex()),
        shoot: getShoot(),
        dunk: getDunk(),
        height: getHeight(),
      }));
    return { teamAPlayers, teamBPlayers };
  };

  const columnStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    maxHeight: 600,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  };

  // State for step-by-step gameplay
  const [started, setStarted] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(0);
  const allActions = React.useMemo(
    () => simulateGameplay(teamA ?? undefined, teamB ?? undefined),
    [teamA, teamB],
  );
  const [actions, setActions] = useState<Action[]>([]);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start simulation
  const handleStart = () => {
    setStarted(true);
    setCurrentTurn(0);
    setActions([]);
  };

  const handleStop = () => {
    setStarted(false);
    setCurrentTurn(0);
    setActions([]);
    if (intervalRef.current) clearTimeout(intervalRef.current);
  };

  // Step through gameplay by random seconds per turn, 60x speed
  useEffect(() => {
    if (!started) {
      setStarted(false);
      return;
    }
    if (currentTurn >= allActions.length) {
      setStarted(false);
      return;
    }
    // 60x speed: 1 real second = 60 simulated seconds
    // So, real delay = turnDuration / 60 (in seconds)
    let turnDuration = 5;
    if (
      currentTurn < allActions.length &&
      allActions[currentTurn] !== undefined &&
      (currentTurn === 0 || allActions[currentTurn - 1] !== undefined)
    ) {
      const currentAction = allActions[currentTurn];
      const prevAction =
        currentTurn > 0 ? allActions[currentTurn - 1] : undefined;
      if (currentAction) {
        turnDuration = currentAction.time - (prevAction ? prevAction.time : 0);
      }
    }
    const ms = Math.max(50, (turnDuration * 1000) / 60); // minimum 50ms for UI
    intervalRef.current = setTimeout(() => {
      if (allActions[currentTurn]) {
        setActions((prev) => [...prev, allActions[currentTurn] as Action]);
      }
      setCurrentTurn((t) => t + 1);
    }, ms);
    return () => clearTimeout(intervalRef.current!);
  }, [started, currentTurn, allActions]);

  return (
    <div style={{ display: "flex", gap: 16, width: "100%" }}>
      {/* Team 1 */}
      <div style={columnStyle}>
        <div style={{ display: "flex", alignItems: "center", margin: 16 }}>
          <input
            type="text"
            value={teamAName}
            onChange={(e) => setTeamAName(e.target.value)}
            placeholder="Enter team name"
            style={{
              fontSize: 16,
              padding: "4px 8px",
              marginRight: 8,
              flex: 1,
            }}
            disabled={!!teamA}
          />
          {!teamA && (
            <button
              style={{ fontSize: 16, padding: "8px 24px" }}
              onClick={() => {
                const { teamAPlayers, teamBPlayers } = generateTeams();
                setTeamA(teamAPlayers);
                setTeamB(teamBPlayers);
              }}
            >
              Generate
            </button>
          )}
        </div>
        {teamA && (
          <DndProvider backend={HTML5Backend}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400 }} aria-label="team-a-table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={STATS.length + 4} align="center">
                      {teamAName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell />
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
                  {teamA.map((player, idx) => (
                    <DraggablePlayerRow
                      key={player.id}
                      player={player}
                      index={idx}
                      team="A"
                      movePlayer={movePlayer}
                      isLastOfFive={idx === 4}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DndProvider>
        )}
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            style={{ fontSize: 20, padding: "12px 32px", marginBottom: 16 }}
            onClick={
              started
                ? handleStop
                : currentTurn >= allActions.length
                  ? handleStart
                  : handleStart
            }
          >
            {started
              ? "Stop"
              : currentTurn >= allActions.length &&
                  actions.length === allActions.length
                ? "Run Again"
                : "Start Play"}
          </button>
          {(started || actions.length === allActions.length) && (
            <>
              <Table
                sx={{ minWidth: 400, width: "100%" }}
                aria-label="gameplay-log"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Minute</TableCell>
                    <TableCell align="right">Team 1</TableCell>
                    <TableCell align="center">Score</TableCell>
                    <TableCell align="left">Team 2</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[4, 3, 2, 1].map((quarter) =>
                    actions
                      .filter((action) => action.quarter === quarter)
                      .slice()
                      .reverse()
                      .map((action) => {
                        const isTeam1 = action.teamWithBall === 1;
                        let left = "";
                        let right = "";
                        if (action.type === "defense") {
                          if (isTeam1) {
                            right = action.description;
                          } else {
                            left = action.description;
                          }
                        } else if (isTeam1) {
                          left = action.description;
                        } else {
                          right = action.description;
                        }
                        return (
                          <TableRow
                            key={action.time}
                            style={{
                              opacity: action.type === "defense" ? 0.5 : 1,
                            }}
                          >
                            <TableCell>{`${String(Math.floor(action.time / 60)).padStart(2, "0")}:${String(action.time % 60).padStart(2, "0")}`}</TableCell>
                            <TableCell align="right">{left}</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600 }}>
                              {action.scoreA}:{action.scoreB}
                            </TableCell>
                            <TableCell align="left">{right}</TableCell>
                          </TableRow>
                        );
                      }),
                  )}
                </TableBody>
              </Table>
              {actions.length === allActions.length && (
                <div
                  style={{
                    marginTop: 16,
                    fontWeight: 600,
                    fontSize: 18,
                    color: "#388e3c",
                  }}
                >
                  Game finished
                </div>
              )}
            </>
          )}
        </Paper>
      </div>
      {/* Team 2 */}
      <div style={columnStyle}>
        <div style={{ display: "flex", alignItems: "center", margin: 16 }}>
          <input
            type="text"
            value={teamBName}
            onChange={(e) => setTeamBName(e.target.value)}
            placeholder="Enter team name"
            style={{
              fontSize: 16,
              padding: "4px 8px",
              marginRight: 8,
              flex: 1,
            }}
            disabled={!!teamB}
          />
          {/* Remove Team 2 generate button, since both teams are generated together */}
        </div>
        {teamB && (
          <DndProvider backend={HTML5Backend}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400 }} aria-label="team-b-table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={STATS.length + 4} align="center">
                      {teamBName}
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
                  {teamB.map((player, idx) => (
                    <DraggablePlayerRow
                      key={player.id}
                      player={player}
                      index={idx}
                      team="B"
                      movePlayer={movePlayer}
                      isLastOfFive={idx === 4}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DndProvider>
        )}
      </div>
    </div>
  );
};
