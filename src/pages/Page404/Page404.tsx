import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button as MuiButton, Typography, Stack } from '@mui/material';

const Page404: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'AUTH' });

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" gap={2} height="inherit">
      <Typography component="h1" variant="h1">
        {t('404')}
      </Typography>
      <Typography component="h2" variant="h5">
        {t('PAGE_NOT_FOUND_TITLE')}
      </Typography>
      <Typography component="h2" variant="body1">
        {t('PAGE_NOT_FOUND_TEXT')}
      </Typography>
      <MuiButton component={Link} to="/" variant="contained">
        {t('RETURN_BUTTON_TEXT')}
      </MuiButton>
    </Stack>
  );
};

export default Page404;
