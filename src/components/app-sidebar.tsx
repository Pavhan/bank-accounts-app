'use client';

import * as React from 'react';
import { ArrowUpCircleIcon, ClipboardListIcon, LayoutDashboardIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { NavMain } from '@components/components/nav-main';
import { NavUser } from '@components/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@components/components/ui/sidebar';

const data = {
  user: {
    name: 'Event Organizer',
    email: 'organizer@example.com',
    avatar: '/avatars/organizer.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboardIcon,
    },
    {
      title: 'Runners',
      url: '/users',
      icon: UsersIcon,
    },
    {
      title: 'Form Configurator',
      url: '/form-configurator',
      icon: ClipboardListIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/">
                <span className="text-base text-lg font-semibold">Event Organizer</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
