import React, { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Stack, CircularProgress, Typography } from '@mui/material';
import { useGetStationsQuery } from '../../redux/api';
import {
  setAllStations,
  setUiStations,
  setStationsMap,
  setTags,
  getAllStations,
  getUiStations,
  getCurrentStation,
  getStationsMap,
  resetFocusedStation,
  getFocusedStation,
  setCurrentStation,
} from '../../redux/slices';
import { Station as StationType } from '../../redux/types/stations';
import { Station, Navigation } from '../../components';
import { sortEngine } from '../../utils';
import Player from '../../components/Player/Player';
import useQueryParameters from '../../hooks/useQueryParameters';
import styles from './Stations.module.scss';

const Stations: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'STATIONS' });
  const { stationIdInUrl } = useQueryParameters();
  const { data: stationsData, isLoading } = useGetStationsQuery();
  const stationsMap = useSelector(getStationsMap);
  const allStations = useSelector(getAllStations);
  const uiStations = useSelector(getUiStations);
  const currentStation = useSelector(getCurrentStation);
  const focusedStation = useSelector(getFocusedStation);

  const stationsRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentStation && stationIdInUrl) {
      dispatch(setCurrentStation(stationIdInUrl));
    }
  }, [stationIdInUrl, currentStation]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        currentStation &&
        !stationsRef?.current?.contains(event.target as Node) &&
        !playerRef?.current?.contains(event.target as Node)
      ) {
        dispatch(resetFocusedStation());
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [currentStation]);

  useEffect(() => {
    if (!isLoading && stationsData?.data.length && !allStations.length) {
      const { map, tags } = stationsData.data.reduce(
        (acc: { map: { [key: string]: StationType }; tags: Array<string> }, station) => {
          acc.map[station.id] = station;
          acc.tags = [...acc.tags, ...station.tags];
          return acc;
        },
        { map: {}, tags: [] }
      );

      dispatch(setStationsMap(map));
      dispatch(setTags(Array.from(new Set(tags))));
      dispatch(setAllStations(stationsData.data));
      dispatch(setUiStations(sortEngine([...stationsData.data])));
    }
  }, [stationsData, isLoading, allStations]);

  if (isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center" height="inherit">
        <CircularProgress color="primary" />
      </Stack>
    );
  }

  return (
    <>
      <Navigation />
      <Stack
        direction="column"
        alignItems="start"
        gap={2}
        className={clsx(styles['stations-list-wrap'], { [styles['with-active-station']]: currentStation })}
      >
        <Typography variant="h4" className={styles['stations-title']}>
          {t('TITLE')}
        </Typography>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={1}
          className={clsx(styles['stations-list'], { [styles['no-results']]: !uiStations.length })}
          ref={stationsRef}
        >
          {uiStations.length ? (
            uiStations.map(({ id, name, description, imgUrl }) => (
              <Station key={id} {...{ id, name, description, imgUrl }} selected={id === focusedStation} />
            ))
          ) : (
            <Typography variant="h5">{t('NO_RESULTS')}</Typography>
          )}
        </Stack>
      </Stack>
      {currentStation && <Player {...stationsMap[currentStation]} ref={playerRef} />}
    </>
  );
};

export default Stations;
