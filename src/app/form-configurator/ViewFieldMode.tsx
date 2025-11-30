'use client';

import { PencilIcon, TrashIcon } from 'lucide-react';
import { Button } from '@components/components/ui/button';
import type { FormFieldDefinition } from '@components/features/form/types';

interface ViewFieldModeProps {
  field: FormFieldDefinition;
  onEdit: () => void;
  onDelete: () => void;
}

export function ViewFieldMode({ field, onEdit, onDelete }: ViewFieldModeProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 md:flex-nowrap">
      <div>
        <div className="font-medium">{field.label}</div>
        <div className="text-sm text-muted-foreground">
          Type: {field.type} | Required: {field.required ? 'Yes' : 'No'}
          {field.options && field.options.length > 0 && <> | Options: {field.options.join(', ')}</>}
        </div>
      </div>
      <div className="flex w-full gap-2 md:w-auto">
        <Button onClick={onEdit} variant="outline" size="sm" className="w-full">
          <PencilIcon className="h-4 w-4" />
        </Button>
        <Button onClick={onDelete} variant="destructive" size="sm" className="w-full">
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
