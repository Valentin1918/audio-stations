import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { playListSettingsReducer } from './slices';
import { stationsApi } from './api';

export const store = configureStore({
  reducer: {
    playListSettings: playListSettingsReducer,
    [stationsApi.reducerPath]: stationsApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([stationsApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
