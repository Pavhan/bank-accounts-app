export type FieldType = 'text' | 'number' | 'date' | 'select' | 'gender' | 'category';

export interface FormFieldDefinition {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
}

export type FormStatus = 'draft' | 'published';

export interface FormDefinition {
  id: string;
  name: string;
  fields: FormFieldDefinition[];
  status: FormStatus;
}
