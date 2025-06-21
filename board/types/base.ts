export type AuthMode = 'signup' | 'signin';

export type Theme = 'light' | 'dark';

export type Formation = '4-4-2' | '4-5-1' | '4-3-3' | '3-4-3' | '3-5-2' | '5-3-2' | '5-4-1' | 'not-set';

export type Position = 'forward' | 'midfielder' | 'defender' | 'goalkeeper' | 'not set';

export type Role = 'manager' | 'captain' | 'vice-captain' | 'player' | 'none' | 'not set';

export type Gender = 'male' | 'female' | 'not set';

export type Dominant = 'left' | 'right' | 'not set';

export type MatchResult = 'win' | 'lose' | 'draw';

export type WarningType = 'yellow' | 'red';

export type Message = {
  text: string;
  color: string;
};

export type Account = {
  id: number;
  name: string;
  created_at: Date;
};

export type Team = {
  id: number;
  user_uuid: number;
  name: string;
  is_public: boolean;
  created_at: string;
  description: string;
};

export type Player = {
  id: number;
  created_at: string;
  team_id: number;
  name: string;
  birthdate: Date;
  gender: Gender;
  dominant: Dominant;
  position: Position;
  role: Role;
};

export type PlayerTeam = {
  team_id: number;
  player_id: number;
};

// export type MemberList = {
//   forwards: Player[];
//   midfielders: Player[];
//   defenders: Player[];
//   goalkeeper: Player;
//   reserves: Player[];
// };

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

export type GameStartingMembers = {
  id: number;
  created_at: string;
  game_id: number;
  team_id: number;
  position: Position;
};

export type Game = {
  id: number;
  created_at: string;
  team_id: number;
  name: string;
  memo: string;
  date: number;
  formation: Formation;
  opponent: string;
  match_time: number;
  match_result: MatchResult;
  starting_members?: GameStartingMembers; // 別の中間テーブルに保存
  scorers?: ScoreEvent[]; // 別の中間テーブルに保存
  assists?: ScoreEvent[]; // 別の中間テーブルに保存
  warnings?: Warning[]; // 別の中間テーブルに保存
  substitutions?: Substitution[]; // 別の中間テーブルに保存
};
