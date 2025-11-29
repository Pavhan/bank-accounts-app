import { Label } from '@components/components/ui/label';
import type { FormFieldDefinition } from '@components/features/form/types';

interface FieldDisplayProps {
  field: FormFieldDefinition;
  value: string | number | undefined;
}

export function FieldDisplay({ field, value }: FieldDisplayProps) {
  const displayValue = value !== undefined ? String(value) : '';

  return (
    <div className="space-y-2">
      <Label>{field.label}</Label>
      <div className="text-sm text-muted-foreground">
        {displayValue || <span className="italic">Not provided</span>}
      </div>
    </div>
  );
}
