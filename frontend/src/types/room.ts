export type Room = {
  code: string;
  host: string;
  guest_can_pause: boolean;
  votes_to_skip: number;
  created_at: string;
  is_host: boolean;
};
