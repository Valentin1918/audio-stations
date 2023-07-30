import React, { forwardRef, useEffect, useRef, useState, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Typography, IconButton, CircularProgress } from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import { UiStation } from '../../redux/types/stations';
import { resetCurrentStation } from '../../redux/slices';
import { useQueryParameters } from '../../hooks';
import styles from './Player.module.scss';

interface PlayerProps extends Omit<UiStation, 'id' | 'description'> {}

const Player = forwardRef<HTMLDivElement, PlayerProps>(({ name, imgUrl, streamUrl }, ref) => {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const { updateStationIdInUrl } = useQueryParameters();
  const [loadingAudio, setLoadingAudio] = useState(false);
  const progressListener = () => setLoadingAudio(true);
  const loadedDataListener = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setLoadingAudio(false);
        })
        .catch((err) => {
          setLoadingAudio(false);
          // eslint-disable-next-line no-console
          console.warn(err);
        });
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadstart', progressListener);
      audioRef.current.addEventListener('canplay', loadedDataListener);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadstart', progressListener);
        audioRef.current.removeEventListener('canplay', loadedDataListener);
      }
    };
  }, []);

  const onCrossClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(resetCurrentStation());
    updateStationIdInUrl('');
  };

  return (
    <Stack
      direction="row"
      justifyContent="start"
      alignItems="center"
      gap={4}
      className={styles['player-wrap']}
      ref={ref}
    >
      <Stack direction="row" height="inherit" gap={2} className={styles.station}>
        <Stack height="inherit" alignItems="center" justifyContent="center">
          <img src={imgUrl} alt={name} />
          {loadingAudio && (
            <Stack position="absolute">
              <CircularProgress color="primary" />
            </Stack>
          )}
        </Stack>

        <Typography variant="h6" className={styles['station-name']}>
          {name}
        </Typography>
      </Stack>

      <audio controls src={streamUrl} className={styles['audio-controller']} ref={audioRef}>
        <track src="" kind="captions" srcLang="en" label="english_captions" />
      </audio>

      <IconButton aria-label="delete" size="medium" onClick={onCrossClick}>
        <ClearIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  );
});

export default Player;
