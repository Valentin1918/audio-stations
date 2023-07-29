import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Stack,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  SelectChangeEvent,
  Autocomplete,
  Chip,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { TuneInLogo } from '../../assets';
import { setSearchBy, setSortBy, setFilterBy, getSearchBy, getSortBy, getFilterBy, getTags } from '../../redux/slices';
import { SortBy } from '../../redux/types/playListSettings';
import styles from './Navigation.module.scss';
import { sortByList } from '../../constants';

const Navigation = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'NAVIGATION' });
  const searchBy = useSelector(getSearchBy);
  const sortBy = useSelector(getSortBy);
  const filterBy = useSelector(getFilterBy);
  const tags = useSelector(getTags);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setSearchBy(e.target.value));
  const handleSortChange = (e: SelectChangeEvent) => dispatch(setSortBy(e.target.value as SortBy));
  const handleFilterChange = (event: any, newValue: Array<string>) => dispatch(setFilterBy(newValue));

  return (
    <Stack direction="row" justifyContent="start" alignItems="center" gap={3} className={styles.navigation}>
      <TuneInLogo className={styles['main-logo']} />

      <Stack direction="row" justifyContent="start" alignItems="center" gap={2} width="inherit">
        <TextField
          className={styles['search-field']}
          value={searchBy}
          onChange={handleSearchChange}
          label={t('SEARCH_LABEL')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <FormControl>
          <InputLabel>{t('SORT_LABEL')}</InputLabel>
          <Select className={styles['sort-field']} value={sortBy} onChange={handleSortChange} label={t('SORT_LABEL')}>
            {sortByList.map((value) => (
              <MenuItem key={value} value={value}>
                {t(`SORT_OPTIONS.${value}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Autocomplete
          className={styles['filter-field']}
          multiple
          options={tags}
          onChange={handleFilterChange}
          value={filterBy}
          freeSolo
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => <TextField {...params} variant="outlined" label={t('FILTER_LABEL')} />}
        />
      </Stack>
    </Stack>
  );
};

export default Navigation;
