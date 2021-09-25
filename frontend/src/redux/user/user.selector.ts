import { createSelector } from "reselect";

const selectUser = (state: { user: any }) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
