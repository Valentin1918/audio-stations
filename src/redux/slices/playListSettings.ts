import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayListSettingsState, SortBy, Tag } from '../types/playListSettings';
import { Station } from '../types/stations';
import { filterEngine, sortEngine } from '../../utils';

const initialState: PlayListSettingsState = {
  searchBy: '',
  sortBy: 'a-z',
  filterBy: [],
  currentStation: null,
  focusedStation: null,
  tags: [],
  stationsMap: {},
  allStations: [],
  uiStations: [],
};

export const playListSettingsSlice = createSlice({
  name: 'playListSettings',
  initialState,
  reducers: {
    setSearchBy: (state, action: PayloadAction<string>) => {
      Object.assign(state, {
        searchBy: action.payload,
        uiStations: sortEngine(filterEngine(state.allStations, action.payload, state.filterBy), state.sortBy),
      });
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      Object.assign(state, {
        sortBy: action.payload,
        uiStations: sortEngine(filterEngine(state.allStations, state.searchBy, state.filterBy), action.payload),
      });
    },
    setFilterBy: (state, action: PayloadAction<Array<Tag>>) => {
      Object.assign(state, {
        filterBy: action.payload,
        uiStations: sortEngine(filterEngine(state.allStations, state.searchBy, action.payload), state.sortBy),
      });
    },
    setCurrentStation: (state, action: PayloadAction<string>) => {
      Object.assign(state, {
        currentStation: action.payload,
      });
    },
    resetCurrentStation: (state) => {
      Object.assign(state, {
        currentStation: null,
      });
    },
    setFocusedStation: (state, action: PayloadAction<string>) => {
      Object.assign(state, {
        focusedStation: action.payload,
      });
    },
    resetFocusedStation: (state) => {
      Object.assign(state, {
        focusedStation: null,
      });
    },
    setTags: (state, action: PayloadAction<Array<Tag>>) => {
      Object.assign(state, {
        tags: action.payload,
      });
    },
    setStationsMap: (state, action: PayloadAction<{ [key: string]: Station }>) => {
      Object.assign(state, {
        stationsMap: action.payload,
      });
    },
    setAllStations: (state, action: PayloadAction<Array<Station>>) => {
      Object.assign(state, {
        allStations: action.payload,
      });
    },
    setUiStations: (state, action: PayloadAction<Array<Station>>) => {
      Object.assign(state, {
        uiStations: action.payload,
      });
    },
  },
});

export const {
  setSearchBy,
  setSortBy,
  setFilterBy,
  setCurrentStation,
  resetCurrentStation,
  setFocusedStation,
  resetFocusedStation,
  setTags,
  setStationsMap,
  setAllStations,
  setUiStations,
} = playListSettingsSlice.actions;

interface State {
  playListSettings: PlayListSettingsState;
}

export const getPlayListSettings = ({ playListSettings }: State) => playListSettings;
export const getSearchBy = ({ playListSettings }: State) => getPlayListSettings({ playListSettings }).searchBy;
export const getSortBy = ({ playListSettings }: State) => getPlayListSettings({ playListSettings }).sortBy;
export const getFilterBy = ({ playListSettings }: State) => getPlayListSettings({ playListSettings }).filterBy;
export const getCurrentStation = ({ playListSettings }: State) =>
  getPlayListSettings({ playListSettings }).currentStation;
export const getFocusedStation = ({ playListSettings }: State) =>
  getPlayListSettings({ playListSettings }).focusedStation;
export const getTags = ({ playListSettings }: State) => getPlayListSettings({ playListSettings }).tags;
export const getStationsMap = ({ playListSettings }: State) => getPlayListSettings({ playListSettings }).stationsMap;
export const getAllStations = ({ playListSettings }: State) => getPlayListSettings({ playListSettings }).allStations;
export const getUiStations = ({ playListSettings }: State) => getPlayListSettings({ playListSettings }).uiStations;

export const { reducer: playListSettingsReducer } = playListSettingsSlice;
