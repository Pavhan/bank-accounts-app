'use client';

import { CheckCircleIcon, ClockIcon } from 'lucide-react';
import { Badge } from '@components/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@components/components/ui/card';
import { useAppSelector } from '@components/store/store';

export default function Page() {
  const runners = useAppSelector((state) => state.runners.items);
  const formDefinition = useAppSelector((state) => state.form.formDefinition);

  const totalRunners = runners.length;

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="grid grid-cols-1 gap-4 px-4 @lg/main:grid-cols-2 @4xl/main:grid-cols-3 lg:px-6">
        <Card className="flex flex-row items-center justify-between p-6">
          <CardHeader className="p-0">
            <CardTitle className="font-medium">Total Runners</CardTitle>
            <p className="text-xs text-muted-foreground">Registered participants</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-4xl font-bold">{totalRunners}</div>
          </CardContent>
        </Card>
        <Card className="flex flex-row items-center justify-between p-6">
          <CardHeader className="p-0">
            <CardTitle className="font-medium">Form Status</CardTitle>
            <p className="mt-2 text-xs text-muted-foreground">Registration form</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex items-center gap-2">
              {formDefinition.status === 'published' ? (
                <>
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <Badge variant="default">Published</Badge>
                </>
              ) : (
                <>
                  <ClockIcon className="h-5 w-5 text-yellow-500" />
                  <Badge variant="secondary">Draft</Badge>
                </>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-row items-center justify-between p-6">
          <CardHeader className="p-0">
            <CardTitle className="font-medium">Form Fields</CardTitle>
            <p className="text-xs text-muted-foreground">Configured fields</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-4xl font-bold">{formDefinition.fields.length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
