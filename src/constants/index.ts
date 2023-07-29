import { SortByEnum } from '../redux/types/playListSettings';

export * from './routes';

export const sortByList = Object.keys(SortByEnum) as Array<keyof typeof SortByEnum>;
