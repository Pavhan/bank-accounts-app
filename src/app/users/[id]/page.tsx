'use client';

import { useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { SiteHeader } from '@components/components/site-header';
import { Button } from '@components/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import type { FormFieldDefinition } from '@components/features/form/types';
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

  if (!runner) {
    notFound();
  }

  const handleSave = () => {
    dispatch(updateRunner({ id: runnerId, values: formValues }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this runner?')) {
      dispatch(deleteRunner(runnerId));
      router.push('/users');
    }
  };

  const renderField = (field: FormFieldDefinition) => {
    const value = formValues[field.id];
    const displayValue = value !== undefined ? String(value) : '';

    if (!isEditing) {
      return (
        <div key={field.id} className="space-y-2">
          <Label>{field.label}</Label>
          <div className="text-sm text-muted-foreground">
            {displayValue || <span className="italic">Not provided</span>}
          </div>
        </div>
      );
    }

    switch (field.type) {
      case 'text':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive"> *</span>}
            </Label>
            <Input
              id={field.id}
              value={displayValue}
              onChange={(e) => setFormValues({ ...formValues, [field.id]: e.target.value })}
              required={field.required}
            />
          </div>
        );

      case 'number':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive"> *</span>}
            </Label>
            <Input
              id={field.id}
              type="number"
              value={displayValue}
              onChange={(e) => setFormValues({ ...formValues, [field.id]: Number(e.target.value) })}
              required={field.required}
            />
          </div>
        );

      case 'date':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive"> *</span>}
            </Label>
            <Input
              id={field.id}
              type="date"
              value={displayValue}
              onChange={(e) => setFormValues({ ...formValues, [field.id]: e.target.value })}
              required={field.required}
            />
          </div>
        );

      case 'select':
      case 'gender':
      case 'category':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive"> *</span>}
            </Label>
            <Select
              value={displayValue}
              onValueChange={(value) => setFormValues({ ...formValues, [field.id]: value })}
            >
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

      default:
        return null;
    }
  };

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
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
                    {formDefinition.fields.map((field) => renderField(field))}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
