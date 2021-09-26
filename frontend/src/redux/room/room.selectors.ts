import { createSelector } from "reselect";

export const selectRoom = (state: { room: any }) => state.room;

// export const selectCurrentRoom = createSelector(
//   [selectRoom],
//   (room) => user.currentUser
// );
