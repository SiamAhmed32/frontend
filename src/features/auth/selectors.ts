import type { RootState } from '@/store/store';

export const selectAuthError = (state: RootState) => state.auth.error;
export const selectCurrentUser = (state: RootState) =>
  state.auth.users.find((user) => user.id === state.auth.currentUserId) ?? null;
export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.currentUserId);
