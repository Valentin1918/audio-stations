import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StationsResponse } from '../types/stations';
import { validStreamUrls } from './mocks';

export const stationsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/' }),
  tagTypes: ['Stations'],
  endpoints: (builder) => ({
    getStations: builder.query<StationsResponse, void>({
      query: () => 'stations.json',
      // transformed response because all provided streamUrl fields were corrupted
      transformResponse: (response: StationsResponse, meta, arg) => ({
        data: response.data.map((args, i) => ({ ...args, streamUrl: validStreamUrls[i] || validStreamUrls[0] })),
      }),
      providesTags: ['Stations'],
    }),
  }),
});

export const { useGetStationsQuery } = stationsApi;
