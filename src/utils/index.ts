import { Station } from '../redux/types/stations';
import { SortBy, SortByEnum, Tag } from '../redux/types/playListSettings';

export const sortEngine = (stations: Array<Station>, sortBy?: SortBy) => {
  if (sortBy === SortByEnum['z-a']) {
    return stations.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    });
  }

  if (sortBy === SortByEnum.reliability) {
    return stations.sort((a, b) => b.reliability - a.reliability);
  }

  if (sortBy === SortByEnum.popularity) {
    return stations.sort((a, b) => b.popularity - a.popularity);
  }

  // default is sort by a-z order
  return stations.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};

export const filterEngine = (stations: Array<Station>, searchBy: string, filterBy: Array<Tag>) =>
  stations.filter(
    ({ name, tags }) =>
      name.toLowerCase().includes(searchBy.toLowerCase()) &&
      (!filterBy.length || filterBy.every((tag) => tags.includes(tag)))
  );
