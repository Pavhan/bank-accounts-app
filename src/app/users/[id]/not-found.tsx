'use client';

import Link from 'next/link';
import { SiteHeader } from '@components/components/site-header';
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
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <Card>
                <CardHeader>
                  <CardTitle>Runner Not Found</CardTitle>
                  <CardDescription>The runner you're looking for doesn't exist.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link href="/users">Back to Runners</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
