import { DatePicker } from '@components/components/ui/date-picker';
import { Label } from '@components/components/ui/label';
import type { FormFieldDefinition } from '@components/features/form/types';

interface DateFieldProps {
  field: FormFieldDefinition;
  value: string | number | undefined;
  onChange: (value: string) => void;
}

export function DateField({ field, value, onChange }: DateFieldProps) {
  const displayValue = value !== undefined ? String(value) : '';

  return (
    <div className="space-y-2">
      <Label htmlFor={field.id}>
        {field.label}
        {field.required && <span className="text-destructive"> *</span>}
      </Label>
      <DatePicker
        id={field.id}
        value={displayValue}
        onChange={onChange}
        placeholder={`Select ${field.label.toLowerCase()}`}
        required={field.required}
      />
    </div>
  );
}
