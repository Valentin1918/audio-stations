import React from 'react';
import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';
import styles from './Layout.module.scss';

const Layout = () => (
  <Stack className={styles.layout}>
    <Outlet />
  </Stack>
);

export default Layout;
