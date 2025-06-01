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
  name: string;
  date: number;
  memo: string;
  formation: Formation;
  starting_members: MemberList; // 専用の中間テーブル必要
  opponent: string;
  match_time: number;
  match_result: MatchResult;
  scorers: ScoreEvent[]; // 専用の中間テーブル必要
  assists: ScoreEvent[]; // 専用の中間テーブル必要
  warnings: Warning[]; // 専用の中間テーブル必要
  substitutions: Substitution[]; // 専用の中間テーブル必要
};
