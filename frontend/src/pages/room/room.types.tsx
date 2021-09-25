export interface RoomType {
  code: string;
  host: string;
  guest_can_pause: boolean;
  votes_to_skip: number;
  created_at: string;
  is_host: boolean;
}

export const initial_state = {
  room: {
    code: "",
    host: "",
    guest_can_pause: false,
    votes_to_skip: 2,
    created_at: "",
    is_host: false,
  },
};
