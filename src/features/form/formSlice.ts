import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormDefinition, FormFieldDefinition } from './types';

const defaultFormDefinition: FormDefinition = {
  id: 'default',
  name: 'Registration for Sample Run 2025',
  status: 'draft',
  fields: [
    {
      id: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
    },
    {
      id: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
    },
    {
      id: 'birthDate',
      label: 'Birth Date',
      type: 'date',
      required: true,
    },
    {
      id: 'gender',
      label: 'Gender',
      type: 'select',
      required: true,
      options: ['male', 'female'],
    },
    {
      id: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: ['5 km', '10 km', 'Half marathon'],
    },
  ],
};

interface FormState {
  formDefinition: FormDefinition;
}

const initialState: FormState = {
  formDefinition: defaultFormDefinition,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormName: (state, action: PayloadAction<string>) => {
      state.formDefinition.name = action.payload;
    },
    addField: (state, action: PayloadAction<FormFieldDefinition>) => {
      state.formDefinition.fields.push(action.payload);
    },
    updateField: (state, action: PayloadAction<FormFieldDefinition>) => {
      const index = state.formDefinition.fields.findIndex(
        (field) => field.id === action.payload.id
      );
      if (index !== -1) {
        state.formDefinition.fields[index] = action.payload;
      }
    },
    removeField: (state, action: PayloadAction<string>) => {
      state.formDefinition.fields = state.formDefinition.fields.filter(
        (field) => field.id !== action.payload
      );
    },
    saveDraft: (state) => {
      state.formDefinition.status = 'draft';
    },
    publishForm: (state) => {
      state.formDefinition.status = 'published';
    },
  },
});

export const { setFormName, addField, updateField, removeField, saveDraft, publishForm } =
  formSlice.actions;

export const formReducer = formSlice.reducer;
