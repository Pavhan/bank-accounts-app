import { configureStore } from '@reduxjs/toolkit';
import { formReducer } from '../features/form/formSlice';
import { runnersReducer } from '../features/runners/runnersSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    runners: runnersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
