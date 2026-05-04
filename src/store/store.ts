import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '@/features/auth/authSlice';
import examReducer from '@/features/exam/examSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
};

/** Dummy exam catalogue must always match `examData.ts`; do not hydrate stale copies from disk. */
const examPersistConfig = {
  key: 'panjeri-exam-v2',
  storage,
  blacklist: ['subjects', 'listCards'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  exam: persistReducer(examPersistConfig, examReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
