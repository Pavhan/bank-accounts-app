'use client';

import { useState } from 'react';
import { TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ConfirmDialog } from '@components/components/confirm-dialog';
import { SiteHeader } from '@components/components/site-header';
import { Button } from '@components/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/components/ui/table';
import { deleteRunner } from '@components/features/runners/runnersSlice';
import { useAppDispatch, useAppSelector } from '@components/store/store';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const runners = useAppSelector((state) => state.runners.items);
  const formDefinition = useAppSelector((state) => state.form.formDefinition);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [runnerToDelete, setRunnerToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleDeleteRunner = (runnerId: string, runnerName: string) => {
    setRunnerToDelete({ id: runnerId, name: runnerName });
    setDeleteDialogOpen(true);
  };

  const confirmDeleteRunner = () => {
    if (runnerToDelete) {
      dispatch(deleteRunner(runnerToDelete.id));
      toast.success('Runner deleted successfully');
      setRunnerToDelete(null);
      setDeleteDialogOpen(false);
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
                  <CardTitle>Runners</CardTitle>
                  <CardDescription>All registered runners ({runners.length} total)</CardDescription>
                </CardHeader>
                <CardContent>
                  {runners.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Gender</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {runners.map((runner) => (
                          <TableRow key={runner.id}>
                            <TableCell className="font-medium">
                              {String(runner.values.firstName)} {String(runner.values.lastName)}
                            </TableCell>
                            <TableCell>{String(runner.values.category)}</TableCell>
                            <TableCell className="capitalize">
                              {String(runner.values.gender)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button asChild variant="ghost" size="sm">
                                  <Link href={`/users/${runner.id}`}>Detail</Link>
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleDeleteRunner(
                                      runner.id,
                                      `${String(runner.values.firstName)} ${String(runner.values.lastName)}`
                                    )
                                  }
                                  variant="destructive"
                                  size="sm"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      No runners registered yet.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Runner"
        description='Are you sure you want to delete "{itemName}"? This action cannot be undone.'
        itemName={runnerToDelete?.name}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={confirmDeleteRunner}
      />
    </>
  );
}
