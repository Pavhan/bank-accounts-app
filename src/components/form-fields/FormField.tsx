import type { FormFieldDefinition } from '@components/features/form/types';
import { DateField } from './DateField';
import { FieldDisplay } from './FieldDisplay';
import { NumberField } from './NumberField';
import { SelectField } from './SelectField';
import { TextField } from './TextField';

interface FormFieldProps {
  field: FormFieldDefinition;
  value: string | number | undefined;
  isEditing: boolean;
  onChange: (fieldId: string, value: string | number) => void;
}

export function FormField({ field, value, isEditing, onChange }: FormFieldProps) {
  if (!isEditing) {
    return <FieldDisplay field={field} value={value} />;
  }

  switch (field.type) {
    case 'text':
      return (
        <TextField
          field={field}
          value={value}
          onChange={(newValue) => onChange(field.id, newValue)}
        />
      );

    case 'number':
      return (
        <NumberField
          field={field}
          value={value}
          onChange={(newValue) => onChange(field.id, newValue)}
        />
      );

    case 'date':
      return (
        <DateField
          field={field}
          value={value}
          onChange={(newValue) => onChange(field.id, newValue)}
        />
      );

    case 'select':
      return (
        <SelectField
          field={field}
          value={value}
          onChange={(newValue) => onChange(field.id, newValue)}
        />
      );

    default:
      return null;
  }
}
