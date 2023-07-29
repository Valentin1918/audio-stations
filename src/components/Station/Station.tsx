import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Stack, Typography } from '@mui/material';
import { UiStation } from '../../redux/types/stations';
import { setCurrentStation, setFocusedStation } from '../../redux/slices';
import styles from './Station.module.scss';

interface StationProps extends Omit<UiStation, 'streamUrl'> {
  selected?: boolean;
}

const Station: FC<StationProps> = ({ id, name, imgUrl, description, selected }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const updateStationIdInUrl = (newStationId: string) => {
    queryParams.set('stationId', newStationId);
    const newLocation = { ...location, search: queryParams.toString() };
    navigate(newLocation);
  };

  const onStationClick = () => {
    dispatch(setFocusedStation(id));
    dispatch(setCurrentStation(id));
    updateStationIdInUrl(id);
  };

  return (
    <Stack
      direction="column"
      alignItems="start"
      className={clsx(styles['station-wrap'], { [styles.selected]: selected })}
      onClick={onStationClick}
    >
      <Stack direction="row" height="inherit" gap={2} className={styles.station}>
        <img src={imgUrl} alt={name} />
        <Typography variant="h6" className={styles['station-name']}>
          {name}
        </Typography>
      </Stack>

      {selected && (
        <Typography variant="body2" className={styles['station-description']}>
          {description}
        </Typography>
      )}
    </Stack>
  );
};

export default Station;
