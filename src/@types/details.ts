export interface IStats {
  base_stat: number;
  name: string;
}

type TypeResponse = {
  name: string;
  url: string;
};

export interface ITypesResponse {
  slot: number;
  type: TypeResponse;
}

type StatResponse = {
  name: string;
  hp: string;
};

export interface IStatsResponse {
  base_stat: number;
  effort: 0;
  stat: StatResponse;
}
