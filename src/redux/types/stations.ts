export interface UiStation {
  id: string;
  description: string;
  name: string;
  imgUrl: string;
  streamUrl: string;
}

export interface Station extends UiStation {
  reliability: number;
  popularity: number;
  tags: Array<string>;
}

export interface StationsResponse {
  data: Array<Station>;
}
