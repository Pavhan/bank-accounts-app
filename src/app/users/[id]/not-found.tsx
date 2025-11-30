'use client';

import Link from 'next/link';
import { Button } from '@components/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/components/ui/card';

export default function NotFound() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Runner Not Found</CardTitle>
        <CardDescription>The runner you&apos;re looking for doesn&apos;t exist.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href="/users">Back to Runners</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
