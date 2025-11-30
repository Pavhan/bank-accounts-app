'use client';

import { useState } from 'react';
import { Badge } from '@components/components/ui/badge';
import { Button } from '@components/components/ui/button';
import { Card, CardContent } from '@components/components/ui/card';
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

interface AddNewFieldProps {
  onAddField: (field: FormFieldDefinition) => void;
}

export function AddNewField({ onAddField }: AddNewFieldProps) {
  const [newField, setNewField] = useState<Partial<FormFieldDefinition>>({
    id: '',
    label: '',
    type: 'text',
    required: false,
    options: [],
  });

  const handleAddField = () => {
    if (!newField.id || !newField.label || !newField.type) {
      alert('Please fill in id, label, and type');
      return;
    }

    if (newField.type === 'select' && (!newField.options || newField.options.length === 0)) {
      alert('Please add at least one option for select fields');
      return;
    }

    onAddField({
      id: newField.id,
      label: newField.label,
      type: newField.type as FieldType,
      required: newField.required || false,
      options: newField.options && newField.options.length > 0 ? newField.options : undefined,
    });

    setNewField({
      id: '',
      label: '',
      type: 'text',
      required: false,
      options: [],
    });
  };

  const handleAddOption = (option: string) => {
    if (!option.trim()) return;
    setNewField({
      ...newField,
      options: [...(newField.options || []), option.trim()],
    });
  };

  const handleRemoveOption = (index: number) => {
    if (!newField.options) return;
    const updatedOptions = newField.options.filter((_, i) => i !== index);
    setNewField({ ...newField, options: updatedOptions });
  };

  return (
    <div className="space-y-4">
      <Label>Add New Field</Label>
      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-field-id">Field ID</Label>
              <Input
                id="new-field-id"
                value={newField.id}
                onChange={(e) => setNewField({ ...newField, id: e.target.value })}
                placeholder="e.g., email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-field-label">Label</Label>
              <Input
                id="new-field-label"
                value={newField.label}
                onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                placeholder="e.g., Email Address"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-field-type">Type</Label>
              <Select
                value={newField.type}
                onValueChange={(value) => setNewField({ ...newField, type: value as FieldType })}
              >
                <SelectTrigger id="new-field-type">
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
            <div className="space-y-2">
              <Label htmlFor="new-field-type">Is required?</Label>
              <div className="flex items-center gap-2 pt-2">
                <Checkbox
                  id="new-field-required"
                  checked={newField.required}
                  onCheckedChange={(checked) =>
                    setNewField({ ...newField, required: checked === true })
                  }
                />
                <Label htmlFor="new-field-required">Required</Label>
              </div>
            </div>
          </div>
          {newField.type === 'select' && (
            <div className="space-y-2">
              <Label>Options</Label>
              <div className="flex flex-wrap gap-2">
                {newField.options?.map((option, index) => (
                  <Badge key={index} variant="outline" className="gap-1">
                    {option}
                    <button
                      onClick={() => handleRemoveOption(index)}
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
                        handleAddOption(option);
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground">Press Enter to add the option</p>
              </div>
            </div>
          )}
          <Button onClick={handleAddField}>Add Field</Button>
        </CardContent>
      </Card>
    </div>
  );
}
