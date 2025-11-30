'use client';

import { Badge } from '@components/components/ui/badge';
import { Button } from '@components/components/ui/button';
import { Checkbox } from '@components/components/ui/checkbox';
import { Input } from '@components/components/ui/input';
import { Label } from '@components/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/components/ui/select';
import { FIELD_TYPES } from '@components/features/form/const';
import type { FieldType, FormFieldDefinition } from '@components/features/form/types';

interface EditFieldModeProps {
  fieldId: string;
  editingField: FormFieldDefinition;
  onFieldChange: (field: FormFieldDefinition) => void;
  onSave: () => void;
  onCancel: () => void;
  onAddOption: (option: string) => void;
  onRemoveOption: (index: number) => void;
}

export function EditFieldMode({
  fieldId,
  editingField,
  onFieldChange,
  onSave,
  onCancel,
  onAddOption,
  onRemoveOption,
}: EditFieldModeProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`edit-${fieldId}-label`}>Label</Label>
          <Input
            id={`edit-${fieldId}-label`}
            value={editingField.label}
            onChange={(e) => onFieldChange({ ...editingField, label: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`edit-${fieldId}-type`}>Type</Label>
          <Select
            value={editingField.type}
            onValueChange={(value) =>
              onFieldChange({
                ...editingField,
                type: value as FieldType,
              })
            }
          >
            <SelectTrigger id={`edit-${fieldId}-type`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FIELD_TYPES.map((fieldType) => (
                <SelectItem key={fieldType.value} value={fieldType.value}>
                  {fieldType.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id={`edit-${fieldId}-required`}
          checked={editingField.required}
          onCheckedChange={(checked) =>
            onFieldChange({ ...editingField, required: checked === true })
          }
        />
        <Label htmlFor={`edit-${fieldId}-required`}>Required</Label>
      </div>
      {editingField.type === 'select' && (
        <div className="space-y-2">
          <Label>Options</Label>
          <div className="flex flex-wrap gap-2">
            {editingField.options?.map((option, index) => (
              <Badge key={index} variant="outline" className="gap-1">
                {option}
                <button
                  onClick={() => onRemoveOption(index)}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
          <div className="space-y-1">
            <Input
              placeholder="Type option and press Enter"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const option = e.currentTarget.value.trim();
                  if (option) {
                    onAddOption(option);
                    e.currentTarget.value = '';
                  }
                }
              }}
            />
            <p className="text-xs text-muted-foreground">Press Enter to add the option</p>
          </div>
        </div>
      )}
      <div className="flex gap-2">
        <Button onClick={onSave} size="sm">
          Save
        </Button>
        <Button onClick={onCancel} variant="outline" size="sm">
          Cancel
        </Button>
      </div>
    </div>
  );
}
