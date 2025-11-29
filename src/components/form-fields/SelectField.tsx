import { Label } from '@components/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/components/ui/select';
import type { FormFieldDefinition } from '@components/features/form/types';

interface SelectFieldProps {
  field: FormFieldDefinition;
  value: string | number | undefined;
  onChange: (value: string) => void;
}

export function SelectField({ field, value, onChange }: SelectFieldProps) {
  const displayValue = value !== undefined ? String(value) : '';

  return (
    <div className="space-y-2">
      <Label htmlFor={field.id}>
        {field.label}
        {field.required && <span className="text-destructive"> *</span>}
      </Label>
      <Select value={displayValue} onValueChange={onChange}>
        <SelectTrigger id={field.id}>
          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {field.options?.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
