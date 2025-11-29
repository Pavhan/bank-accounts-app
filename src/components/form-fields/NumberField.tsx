import { Input } from '@components/components/ui/input';
import { Label } from '@components/components/ui/label';
import type { FormFieldDefinition } from '@components/features/form/types';

interface NumberFieldProps {
  field: FormFieldDefinition;
  value: string | number | undefined;
  onChange: (value: number) => void;
}

export function NumberField({ field, value, onChange }: NumberFieldProps) {
  const displayValue = value !== undefined ? String(value) : '';

  return (
    <div className="space-y-2">
      <Label htmlFor={field.id}>
        {field.label}
        {field.required && <span className="text-destructive"> *</span>}
      </Label>
      <Input
        id={field.id}
        type="number"
        value={displayValue}
        onChange={(e) => onChange(Number(e.target.value))}
        required={field.required}
      />
    </div>
  );
}
