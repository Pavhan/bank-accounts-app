'use client';

import { useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ConfirmDialog } from '@components/components/confirm-dialog';
import { FormField } from '@components/components/form-fields';
import { Button } from '@components/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/components/ui/card';
import { deleteRunner, updateRunner } from '@components/features/runners/runnersSlice';
import { useAppDispatch, useAppSelector } from '@components/store/store';

export default function RunnerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const runners = useAppSelector((state) => state.runners.items);
  const formDefinition = useAppSelector((state) => state.form.formDefinition);

  const runnerId = params.id as string;
  const runner = runners.find((r) => r.id === runnerId);

  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string | number>>(
    runner?.values || {}
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (!runner) {
    notFound();
  }

  const handleSave = () => {
    dispatch(updateRunner({ id: runnerId, values: formValues }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDeleteRunner = () => {
    dispatch(deleteRunner(runnerId));
    toast.success('Runner deleted successfully');
    router.push('/users');
  };

  const handleFieldChange = (fieldId: string, value: string | number) => {
    setFormValues({ ...formValues, [fieldId]: value });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {String(formValues.firstName)} {String(formValues.lastName)}
              </CardTitle>
              <CardDescription>
                Registered on {new Date(runner.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {formDefinition.fields.map((field) => (
              <FormField
                key={field.id}
                field={field}
                value={formValues[field.id]}
                isEditing={isEditing}
                onChange={handleFieldChange}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  Edit
                </Button>
                <Button onClick={handleDelete} variant="destructive">
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsEditing(false)} variant="outline">
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save changes</Button>
              </>
            )}
          </div>
        </CardFooter>
      </Card>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Runner"
        description='Are you sure you want to delete "{itemName}"? This action cannot be undone.'
        itemName={`${String(formValues.firstName)} ${String(formValues.lastName)}`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={confirmDeleteRunner}
      />
    </>
  );
}
