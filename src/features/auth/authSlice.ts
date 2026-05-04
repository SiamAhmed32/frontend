import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  phone: string;
  level: string;
  batch: string;
  group: string;
  version: string;
  password: string;
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

export interface RegisterPayload {
  name: string;
  phone: string;
  level: string;
  batch: string;
  group: string;
  version: string;
  password: string;
}

interface RegisterPreparedPayload extends RegisterPayload {
  id: string;
}

interface LoginPayload {
  phone: string;
  password: string;
}

const normalizePhone = (phone: string) => phone.trim();

const normalizeName = (name: string) => name.trim().toLowerCase();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: {
      reducer: (state, action: PayloadAction<RegisterPreparedPayload>) => {
        const phone = normalizePhone(action.payload.phone);
        const name = action.payload.name.trim();
        const existingUser = state.users.find((user) => user.phone === phone);

        if (existingUser) {
          if (normalizeName(existingUser.name) !== normalizeName(name)) {
            state.currentUserId = null;
            state.error = 'This phone number is already registered with a different name.';
            return;
          }

          existingUser.name = name;
          existingUser.level = action.payload.level;
          existingUser.batch = action.payload.batch;
          existingUser.group = action.payload.group;
          existingUser.version = action.payload.version;
          existingUser.password = action.payload.password;
          state.currentUserId = existingUser.id;
          state.error = null;
          return;
        }

        const user: User = {
          id: action.payload.id,
          name,
          phone,
          level: action.payload.level,
          batch: action.payload.batch,
          group: action.payload.group,
          version: action.payload.version,
          password: action.payload.password,
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
    loginUser: (state, action: PayloadAction<LoginPayload>) => {
      const phone = normalizePhone(action.payload.phone);
      const user = state.users.find((item) => item.phone === phone);

      if (!user) {
        state.currentUserId = null;
        state.error = 'No registered user found for this phone number.';
        return;
      }

      if (user.password !== action.payload.password) {
        state.currentUserId = null;
        state.error = 'Incorrect password.';
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
