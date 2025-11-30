'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@components/components/confirm-dialog';
import { Badge } from '@components/components/ui/badge';
import { Button } from '@components/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/components/ui/card';
import { Input } from '@components/components/ui/input';
import { Label } from '@components/components/ui/label';
import { Separator } from '@components/components/ui/separator';
import {
  addField,
  publishForm,
  removeField,
  saveDraft,
  setFormName,
  updateField,
} from '@components/features/form/formSlice';
import type { FormFieldDefinition } from '@components/features/form/types';
import { useAppDispatch, useAppSelector } from '@components/store/store';
import { AddNewField } from './AddNewField';
import { EditFieldMode } from './EditFieldMode';
import { ViewFieldMode } from './ViewFieldMode';

export default function FormConfigPage() {
  const dispatch = useAppDispatch();
  const formDefinition = useAppSelector((state) => state.form.formDefinition);

  const [formName, setFormNameLocal] = useState(formDefinition.name);
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<FormFieldDefinition | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState<{ id: string; label: string } | null>(null);

  const handleSaveFormName = () => {
    dispatch(setFormName(formName));
  };

  const handleAddField = (field: FormFieldDefinition) => {
    dispatch(addField(field));
  };

  const handleStartEditField = (field: FormFieldDefinition) => {
    setEditingFieldId(field.id);
    setEditingField({ ...field });
  };

  const handleSaveField = () => {
    // Use functional update to ensure we get the latest editingField state
    setEditingField((currentField) => {
      if (!currentField) return null;

      // Dispatch Redux action with the current field state (including any newly added options)
      dispatch(updateField(currentField));

      return null; // Clear editing state
    });
    setEditingFieldId(null);
  };

  const handleCancelEdit = () => {
    setEditingFieldId(null);
    setEditingField(null);
  };

  const handleDeleteField = (fieldId: string, fieldLabel: string) => {
    setFieldToDelete({ id: fieldId, label: fieldLabel });
    setDeleteDialogOpen(true);
  };

  const confirmDeleteField = () => {
    if (fieldToDelete) {
      dispatch(removeField(fieldToDelete.id));
      toast.success('Field deleted successfully');
      setFieldToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleAddOption = (option: string) => {
    if (!option.trim() || !editingField) return;
    setEditingField((prev) => {
      if (!prev) return prev;
      const updatedOptions = [...(prev.options || []), option.trim()];
      return { ...prev, options: updatedOptions };
    });
  };

  const handleRemoveOption = (index: number) => {
    if (!editingField || !editingField.options) return;
    setEditingField((prev) => {
      if (!prev || !prev.options) return prev;
      const updatedOptions = prev.options.filter((_, i) => i !== index);
      return { ...prev, options: updatedOptions };
    });
  };

  return (
    <>
      <div className="mx-auto w-full max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Form Configurator</CardTitle>
                <CardDescription>Configure your registration form</CardDescription>
              </div>
              <Badge variant={formDefinition.status === 'published' ? 'default' : 'secondary'}>
                {formDefinition.status === 'published' ? 'Published' : 'Draft'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="form-name">Form Name</Label>
              <div className="flex gap-2">
                <Input
                  id="form-name"
                  value={formName}
                  onChange={(e) => setFormNameLocal(e.target.value)}
                  onBlur={handleSaveFormName}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveFormName();
                    }
                  }}
                />
                <Button onClick={handleSaveFormName} variant="default">
                  Save
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Fields</Label>

              {formDefinition.fields.map((field) => (
                <Card key={field.id}>
                  <CardContent className="p-4">
                    {editingFieldId === field.id && editingField ? (
                      <EditFieldMode
                        fieldId={field.id}
                        editingField={editingField}
                        onFieldChange={setEditingField}
                        onSave={handleSaveField}
                        onCancel={handleCancelEdit}
                        onAddOption={handleAddOption}
                        onRemoveOption={handleRemoveOption}
                      />
                    ) : (
                      <ViewFieldMode
                        field={field}
                        onEdit={() => handleStartEditField(field)}
                        onDelete={() => handleDeleteField(field.id, field.label)}
                      />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />

            <AddNewField onAddField={handleAddField} />

            <Separator />

            <div className="flex gap-2">
              <Button onClick={() => dispatch(saveDraft())} variant="outline">
                Save Draft
              </Button>
              <Button onClick={() => dispatch(publishForm())}>Publish Form</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Field"
        description='Are you sure you want to delete "{itemName}"? This action cannot be undone.'
        itemName={fieldToDelete?.label}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={confirmDeleteField}
      />
    </>
  );
}
