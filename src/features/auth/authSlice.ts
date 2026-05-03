import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  contact: string;
}

interface AuthState {
  users: User[];
  currentUserId: string | null;
  error: string | null;
}

const initialState: AuthState = {
  users: [],
  currentUserId: null,
  error: null,
};

interface RegisterPayload {
  name: string;
  contact: string;
}

interface RegisterPreparedPayload extends RegisterPayload {
  id: string;
}

const normalizeContact = (contact: string) => contact.trim().toLowerCase();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: {
      reducer: (state, action: PayloadAction<RegisterPreparedPayload>) => {
        const contact = normalizeContact(action.payload.contact);
        const existingUser = state.users.find((user) => user.contact === contact);

        if (existingUser) {
          state.currentUserId = existingUser.id;
          state.error = null;
          return;
        }

        const user: User = {
          id: action.payload.id,
          name: action.payload.name.trim(),
          contact,
        };

        state.users.push(user);
        state.currentUserId = user.id;
        state.error = null;
      },
      prepare: (payload: RegisterPayload) => ({
        payload: {
          ...payload,
          id: nanoid(),
        },
      }),
    },
    loginUser: (state, action: PayloadAction<string>) => {
      const contact = normalizeContact(action.payload);
      const user = state.users.find((item) => item.contact === contact);

      if (!user) {
        state.currentUserId = null;
        state.error = 'No registered user found for this email or phone.';
        return;
      }

      state.currentUserId = user.id;
      state.error = null;
    },
    logoutUser: (state) => {
      state.currentUserId = null;
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { clearAuthError, loginUser, logoutUser, registerUser } = authSlice.actions;
export default authSlice.reducer;
