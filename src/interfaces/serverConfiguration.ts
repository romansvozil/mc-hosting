export enum DifficultyEnum {
  peaceful = 'Peaceful',
  easy = 'Easy',
  normal = 'Normal',
  hard = 'Hard',
}

export enum GameModeEnum {
  creative = 'Creative',
  survival = 'Survival',
  adventure = 'Adventure',
  spectator = 'Spectator',
}

export interface RconConfig {
  port: number;
  username: string;
  password: string;
}

export interface ServerConfiguration {
  maxPlayers: number;
  difficulty: DifficultyEnum;
  serverIconUrl: string;
  rconConfig: RconConfig | null;
  allowNether: boolean;
  generateStructures: boolean;
  hardcore: boolean;
  seed: string;
  gameMode: GameModeEnum;
  allowPvp: boolean;
}
