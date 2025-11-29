import { Input } from '@components/components/ui/input';
import { Label } from '@components/components/ui/label';
import type { FormFieldDefinition } from '@components/features/form/types';

interface TextFieldProps {
  field: FormFieldDefinition;
  value: string | number | undefined;
  onChange: (value: string) => void;
}

export function TextField({ field, value, onChange }: TextFieldProps) {
  const displayValue = value !== undefined ? String(value) : '';

  return (
    <div className="space-y-2">
      <Label htmlFor={field.id}>
        {field.label}
        {field.required && <span className="text-destructive"> *</span>}
      </Label>
      <Input
        id={field.id}
        value={displayValue}
        onChange={(e) => onChange(e.target.value)}
        required={field.required}
      />
    </div>
  );
}
