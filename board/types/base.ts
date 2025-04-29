export type Theme = "light" | "dark";

export type Formation =
  | "4-4-2"
  | "4-5-1"
  | "4-3-3"
  | "3-4-3"
  | "3-5-2"
  | "5-3-2"
  | "5-4-1";

export type Position = "forward" | "midfielder" | "defender" | "goalkeeper";

export type Role = "manager" | "captain" | "vice-captain" | "player" | "none";

export type Gender = "male" | "female";

export type Dominant = "left" | "right";

export type MatchResult = "win" | "lose" | "draw";

export type WarningType = "yellow" | "red";

export type Player = {
  name: string;
  age: number;
  gender: Gender;
  Dominant: Dominant;
  position: Position;
  role: Role;
};

export type MemberList = {
  forwards: Player[];
  midfielders: Player[];
  defenders: Player[];
  goalkeeper: Player;
  reserves: Player[];
};

export type ScoreEvent = {
  principal: Player;
  time: number;
  isAlly: boolean; // 味方かどうか
};

export type Warning = {
  principal: Player;
  time: number;
  isAlly: boolean;
  type: WarningType;
};

// 選手交代
export type Substitution = {
  in: Player;
  out: Player;
  time: number;
};

export type Game = {
  id: number;
  date: number;
  formation: Formation;
  startingMembers: MemberList;
  opponent: string;
  matchTime: number;
  matchResult: MatchResult;
  Scorers: ScoreEvent[];
  Assists: ScoreEvent[];
  warnings: Warning[];
  substitutions: Substitution[];
};
