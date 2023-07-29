import { Station } from './stations';

// eslint-disable-next-line no-shadow
export enum SortByEnum {
  'a-z' = 'a-z',
  'z-a' = 'z-a',
  reliability = 'reliability',
  popularity = 'popularity',
}

export type SortBy = keyof typeof SortByEnum;
export type Tag = string;

export interface PlayListSettingsState {
  searchBy: string;
  sortBy: SortBy;
  filterBy: Array<Tag>;
  currentStation: string | null;
  focusedStation: string | null;
  tags: Array<Tag>;
  stationsMap: { [key: string]: Station };
  allStations: Array<Station>;
  uiStations: Array<Station>;
}
