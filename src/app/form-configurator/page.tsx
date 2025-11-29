'use client';

import { useState } from 'react';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@components/components/confirm-dialog';
import { SiteHeader } from '@components/components/site-header';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/components/ui/select';
import { Separator } from '@components/components/ui/separator';
import {
  addField,
  publishForm,
  removeField,
  saveDraft,
  setFormName,
  updateField,
} from '@components/features/form/formSlice';
import type { FieldType, FormFieldDefinition } from '@components/features/form/types';
import { useAppDispatch, useAppSelector } from '@components/store/store';

export default function FormConfigPage() {
  const dispatch = useAppDispatch();
  const formDefinition = useAppSelector((state) => state.form.formDefinition);

  const [formName, setFormNameLocal] = useState(formDefinition.name);
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [newField, setNewField] = useState<Partial<FormFieldDefinition>>({
    id: '',
    label: '',
    type: 'text',
    required: false,
    options: [],
  });
  const [editingField, setEditingField] = useState<FormFieldDefinition | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fieldToDelete, setFieldToDelete] = useState<{ id: string; label: string } | null>(null);

  const handleSaveFormName = () => {
    dispatch(setFormName(formName));
  };

  const handleAddField = () => {
    if (!newField.id || !newField.label || !newField.type) {
      alert('Please fill in id, label, and type');
      return;
    }

    if (newField.type === 'select' && (!newField.options || newField.options.length === 0)) {
      alert('Please add at least one option for select fields');
      return;
    }

    dispatch(
      addField({
        id: newField.id,
        label: newField.label,
        type: newField.type as FieldType,
        required: newField.required || false,
        options: newField.options && newField.options.length > 0 ? newField.options : undefined,
      })
    );

    setNewField({
      id: '',
      label: '',
      type: 'text',
      required: false,
      options: [],
    });
  };

  const handleStartEditField = (field: FormFieldDefinition) => {
    setEditingFieldId(field.id);
    setEditingField({ ...field });
  };

  const handleSaveField = () => {
    // Use functional update to ensure we get the latest editingField state
    setEditingField((currentField) => {
      if (!currentField) return null;

      console.log('currentField', currentField);

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
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="mx-auto max-w-5xl px-4 lg:px-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Form Configurator</CardTitle>
                      <CardDescription>Configure your registration form</CardDescription>
                    </div>
                    <Badge
                      variant={formDefinition.status === 'published' ? 'default' : 'secondary'}
                    >
                      {formDefinition.status === 'published' ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Form Name */}
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

                  {/* Existing Fields */}
                  <div className="space-y-4">
                    <Label>Fields</Label>

                    {formDefinition.fields.map((field) => (
                      <Card key={field.id}>
                        <CardContent className="pt-6">
                          {editingFieldId === field.id && editingField ? (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`edit-${field.id}-label`}>Label</Label>
                                  <Input
                                    id={`edit-${field.id}-label`}
                                    value={editingField.label}
                                    onChange={(e) =>
                                      setEditingField({ ...editingField, label: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`edit-${field.id}-type`}>Type</Label>
                                  <Select
                                    value={editingField.type}
                                    onValueChange={(value) =>
                                      setEditingField({
                                        ...editingField,
                                        type: value as FieldType,
                                      })
                                    }
                                  >
                                    <SelectTrigger id={`edit-${field.id}-type`}>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="text">Text</SelectItem>
                                      <SelectItem value="number">Number</SelectItem>
                                      <SelectItem value="date">Date</SelectItem>
                                      <SelectItem value="select">Select</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id={`edit-${field.id}-required`}
                                  checked={editingField.required}
                                  onChange={(e) =>
                                    setEditingField({ ...editingField, required: e.target.checked })
                                  }
                                  className="h-4 w-4"
                                />
                                <Label htmlFor={`edit-${field.id}-required`}>Required</Label>
                              </div>
                              {editingField.type === 'select' && (
                                <div className="space-y-2">
                                  <Label>Options</Label>
                                  <div className="flex flex-wrap gap-2">
                                    {editingField.options?.map((option, index) => (
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
                                    <p className="text-xs text-muted-foreground">
                                      Press Enter to add the option
                                    </p>
                                  </div>
                                </div>
                              )}
                              <div className="flex gap-2">
                                <Button onClick={handleSaveField} size="sm">
                                  Save
                                </Button>
                                <Button onClick={handleCancelEdit} variant="outline" size="sm">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <div className="font-medium">{field.label}</div>
                                <div className="text-sm text-muted-foreground">
                                  Type: {field.type} | Required: {field.required ? 'Yes' : 'No'}
                                  {field.options && field.options.length > 0 && (
                                    <> | Options: {field.options.join(', ')}</>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleStartEditField(field)}
                                  variant="outline"
                                  size="sm"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                  onClick={() => handleDeleteField(field.id, field.label)}
                                  variant="destructive"
                                  size="sm"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Separator />

                  {/* Add New Field */}
                  <div className="space-y-4">
                    <Label>Add New Field</Label>
                    <Card>
                      <CardContent className="space-y-4 pt-6">
                        <div className="grid grid-cols-2 gap-4">
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
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="new-field-type">Type</Label>
                            <Select
                              value={newField.type}
                              onValueChange={(value) =>
                                setNewField({ ...newField, type: value as FieldType })
                              }
                            >
                              <SelectTrigger id="new-field-type">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="number">Number</SelectItem>
                                <SelectItem value="date">Date</SelectItem>
                                <SelectItem value="select">Select</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center gap-2 pt-8">
                            <input
                              type="checkbox"
                              id="new-field-required"
                              checked={newField.required}
                              onChange={(e) =>
                                setNewField({ ...newField, required: e.target.checked })
                              }
                              className="h-4 w-4"
                            />
                            <Label htmlFor="new-field-required">Required</Label>
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
                                    onClick={() => {
                                      const updatedOptions = newField.options?.filter(
                                        (_, i) => i !== index
                                      );
                                      setNewField({ ...newField, options: updatedOptions });
                                    }}
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
                                      setNewField({
                                        ...newField,
                                        options: [...(newField.options || []), option],
                                      });
                                      e.currentTarget.value = '';
                                    }
                                  }
                                }}
                              />
                              <p className="text-xs text-muted-foreground">
                                Press Enter to add the option
                              </p>
                            </div>
                          </div>
                        )}
                        <Button onClick={handleAddField}>Add Field</Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Separator />

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button onClick={() => dispatch(saveDraft())} variant="outline">
                      Save Draft
                    </Button>
                    <Button onClick={() => dispatch(publishForm())}>Publish Form</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
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
