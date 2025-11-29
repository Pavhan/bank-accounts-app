import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RunnerRegistration } from './types';

interface RunnersState {
  items: RunnerRegistration[];
}

const initialState: RunnersState = {
  items: [
    {
      id: '1',
      createdAt: new Date('2024-01-15T10:30:00').toISOString(),
      values: {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: '1990-05-15',
        gender: 'male',
        category: '10 km',
      },
    },
    {
      id: '2',
      createdAt: new Date('2024-01-16T14:20:00').toISOString(),
      values: {
        firstName: 'Jane',
        lastName: 'Smith',
        birthDate: '1985-08-22',
        gender: 'female',
        category: 'Half marathon',
      },
    },
  ],
};

const runnersSlice = createSlice({
  name: 'runners',
  initialState,
  reducers: {
    addRunner: (state, action: PayloadAction<Record<string, string | number>>) => {
      const newRunner: RunnerRegistration = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        values: action.payload,
      };
      state.items.push(newRunner);
    },
    updateRunner: (
      state,
      action: PayloadAction<{ id: string; values: Record<string, string | number> }>
    ) => {
      const index = state.items.findIndex((runner) => runner.id === action.payload.id);
      if (index !== -1) {
        state.items[index].values = action.payload.values;
      }
    },
    deleteRunner: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((runner) => runner.id !== action.payload);
    },
  },
});

export const { addRunner, updateRunner, deleteRunner } = runnersSlice.actions;

export const runnersReducer = runnersSlice.reducer;
