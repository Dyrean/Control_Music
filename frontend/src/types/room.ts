export type IRoom = {
  id?: number;
  code: string;
  host: string;
  guest_can_pause: boolean;
  votes_to_skip: number;
  created_at: string;
  is_host?: boolean;
};

export interface ISong {
  id: string;
  title: string;
  artist: string;
  duration: number;
  time: number;
  image_url: string;
  is_playing: boolean;
  votes: number;
}

export const EmptyRoom = {
  id: 0,
  code: "",
  host: "",
  guest_can_pause: false,
  votes_to_skip: 2,
  created_at: "",
  is_host: false,
};

export const EmptySong = {
  id: "",
  title: "",
  artist: "",
  duration: 0,
  time: 0,
  image_url: "",
  is_playing: false,
  votes: 2,
};
